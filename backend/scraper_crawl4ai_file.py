# scraper_crawl4ai_file.py

import logging
import os
import uuid
from crawler import NewsCrawler

logger = logging.getLogger(__name__)

class Crawl4AICSVFileScraper:
    def __init__(self, output_dir="outputs"):
        self.output_dir = output_dir
        os.makedirs(self.output_dir, exist_ok=True)
        self.crawler = NewsCrawler()
        logger.info("Crawl4AICSVFileScraper initialized")

    async def scrape_and_save(self, url: str):
        logger.info(f"Scraping (and saving) URL: {url}")
        result = await self.crawler.crawl_site(url)

        # If it failed, just return the error
        if result.get('status') == 'failed':
            return result

        # Otherwise, write the result to a file
        # e.g. a unique ID or a timestamp for the filename
        filename = f"crawl4ai_{uuid.uuid4().hex}.json"
        filepath = os.path.join(self.output_dir, filename)

        try:
            import json
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(result, f, ensure_ascii=False, indent=2)

            # You could also save as CSV or any format you prefer
            # For now, let's do JSON.

            # Return success with file info
            return {
                "url": url,
                "status": "success",
                "file_saved": filepath,
                "data": result
            }
        except Exception as e:
            logger.error(f"Error saving to file: {str(e)}")
            return {
                "url": url,
                "status": "failed",
                "error": f"Failed to save file: {str(e)}"
            }
