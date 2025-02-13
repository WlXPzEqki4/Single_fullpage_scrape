import aiohttp
from bs4 import BeautifulSoup
import asyncio
import json
import logging

logger = logging.getLogger(__name__)

class NewsCrawler:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        logger.info("NewsCrawler initialized with headers")
        
    async def fetch_page(self, url):
        logger.info(f"Attempting to fetch page: {url}")
        async with aiohttp.ClientSession(headers=self.headers) as session:
            try:
                async with session.get(url) as response:
                    if response.status == 200:
                        logger.info(f"Successfully fetched page: {url}")
                        html = await response.text()
                        return html
                    logger.warning(f"Failed to fetch page: {url}, Status: {response.status}")
                    return None
            except Exception as e:
                logger.error(f"Error fetching {url}: {str(e)}")
                return None


    async def process_page(self, url, html):
        if not html:
            return {
                'url': url,
                'error': 'Failed to fetch page',
                'status': 'failed'
            }
        
        try:
            soup = BeautifulSoup(html, 'html.parser')
            
            # Extract content
            title = soup.find('h1').text if soup.find('h1') else 'No title found'
            paragraphs = [p.text for p in soup.find_all('p')]
            links = [a['href'] for a in soup.find_all('a', href=True)]
            
            # Create markdown content
            markdown_content = f"""
# {title}

{''.join([f'\n{p}\n' for p in paragraphs])}

### Links found:
{''.join([f'- {link}\n' for link in links[:5]])}
"""
            
            return {
                'url': url,
                'markdown': markdown_content,
                'raw_data': {
                    'title': title,
                    'paragraphs': paragraphs,
                    'links': links[:5]
                }
            }
            
        except Exception as e:
            return {
                'url': url,
                'error': str(e),
                'status': 'failed'
            }

    async def crawl_site(self, start_url):
        html = await self.fetch_page(start_url)
        results = await self.process_page(start_url, html)
        return results