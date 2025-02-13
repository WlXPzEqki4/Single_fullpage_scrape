import scrapy
import logging
import multiprocessing
from queue import Empty
from scrapy import signals
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

logger = logging.getLogger(__name__)

class NewsSpider(scrapy.Spider):
    name = "news_spider"

    def __init__(self, url=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.result_data = None
        if url:
            self.start_urls = [url]

    def parse(self, response):
        try:
            title = response.css('h1::text').get() or 'No title found'
            paragraphs = response.css('p::text').getall()
            links = response.css('a::attr(href)').getall()

            markdown_content = f"""
# {title}

{''.join(f'\n{p}\n' for p in paragraphs)}

### Links found:
{''.join(f'- {link}\n' for link in links[:5])}
"""

            self.result_data = {
                'url': response.url,
                'markdown': markdown_content,
                'raw_data': {
                    'title': title,
                    'paragraphs': paragraphs,
                    'links': links[:5]
                }
            }
        except Exception as e:
            self.result_data = {
                'url': response.url if response else None,
                'error': str(e),
                'status': 'failed'
            }

def run_spider(url, queue):
    """Run the spider in a subprocess, storing the result in a queue."""
    try:
        settings = get_project_settings()
        process = CrawlerProcess(settings=settings)

        # Create a Crawler for the NewsSpider, passing url to __init__
        crawler = process.create_crawler(NewsSpider)

        # Signal handler for when the spider finishes
        def spider_finished(spider, reason):
            # If the spider has set result_data, use it
            if hasattr(spider, 'result_data') and spider.result_data:
                queue.put(spider.result_data)
            else:
                # Default fallback if nothing was collected
                queue.put({
                    'url': url,
                    'error': 'No data collected',
                    'status': 'failed'
                })

        # Connect the handler to the crawler's signals, not the process
        crawler.signals.connect(spider_finished, signal=signals.spider_closed)

        # Now schedule this crawler to run
        process.crawl(crawler, url=url)
        # This blocks until the spider is done
        process.start()

    except Exception as e:
        queue.put({
            'url': url,
            'error': str(e),
            'status': 'failed'
        })

class ScrapyNewsCrawler:
    def __init__(self):
        logger.info("ScrapyNewsCrawler initialized")

    async def crawl_site(self, start_url):
        logger.info(f"Starting Scrapy crawl for URL: {start_url}")
        
        queue = multiprocessing.Queue()
        process = multiprocessing.Process(
            target=run_spider,
            args=(start_url, queue)
        )
        
        try:
            process.start()
            # Wait up to 30 seconds for the process to finish
            process.join(timeout=30)
            
            if process.is_alive():
                logger.warning("Terminating Scrapy process due to timeout.")
                process.terminate()
                return {
                    'url': start_url,
                    'error': 'Timeout reached',
                    'status': 'failed'
                }

            # Retrieve the results
            try:
                result = queue.get_nowait()
            except Empty:
                result = {
                    'url': start_url,
                    'error': 'No data collected',
                    'status': 'failed'
                }
            
            return result
        
        except Exception as e:
            logger.error(f"Error in Scrapy crawler: {str(e)}")
            return {
                'url': start_url,
                'error': str(e),
                'status': 'failed'
            }
        finally:
            if process.is_alive():
                process.terminate()
