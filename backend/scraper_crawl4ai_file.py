# # scraper_crawl4ai_file.py

# import logging
# import os
# import uuid
# from crawler import NewsCrawler

# logger = logging.getLogger(__name__)

# class Crawl4AICSVFileScraper:
#     def __init__(self, output_dir="outputs"):
#         self.output_dir = output_dir
#         os.makedirs(self.output_dir, exist_ok=True)
#         self.crawler = NewsCrawler()
#         logger.info("Crawl4AICSVFileScraper initialized")

#     async def scrape_and_save(self, url: str):
#         logger.info(f"Scraping (and saving) URL: {url}")
#         result = await self.crawler.crawl_site(url)

#         # If it failed, just return the error
#         if result.get('status') == 'failed':
#             return result

#         # Otherwise, write the result to a file
#         # e.g. a unique ID or a timestamp for the filename
#         filename = f"crawl4ai_{uuid.uuid4().hex}.json"
#         filepath = os.path.join(self.output_dir, filename)

#         try:
#             import json
#             with open(filepath, 'w', encoding='utf-8') as f:
#                 json.dump(result, f, ensure_ascii=False, indent=2)

#             # You could also save as CSV or any format you prefer
#             # For now, let's do JSON.

#             # Return success with file info
#             return {
#                 "url": url,
#                 "status": "success",
#                 "file_saved": filepath,
#                 "data": result
#             }
#         except Exception as e:
#             logger.error(f"Error saving to file: {str(e)}")
#             return {
#                 "url": url,
#                 "status": "failed",
#                 "error": f"Failed to save file: {str(e)}"
#             }











# import asyncio
# import os
# import csv
# import json
# import time
# from crawler import NewsCrawler

# class Crawl4AICSVFileScraper:
#     """
#     A scraper that uses the asynchronous NewsCrawler to scrape a URL,
#     then saves the resulting data to a CSV (or JSON) file in a specified output_dir.
#     """

#     def __init__(self, output_dir="outputs"):
#         # Where to save the files
#         self.output_dir = output_dir
#         # Make sure the folder exists
#         os.makedirs(self.output_dir, exist_ok=True)

#     async def scrape_and_save(self, url: str):
#         """
#         1. Uses NewsCrawler to asynchronously fetch and process the URL.
#         2. Saves the results to a CSV/JSON in the output_dir.
#         3. Returns the same results as a dict.
#         """
#         try:
#             crawler = NewsCrawler()
#             results = await crawler.crawl_site(url)

#             if results.get('status') == 'failed':
#                 return results  # e.g. {"status": "failed", "error": "..."}
            
#             # For demonstration, let's save the entire results as JSON.
#             timestamp = int(time.time())
#             filename = f"crawl4ai_{timestamp}.json"
#             filepath = os.path.join(self.output_dir, filename)

#             with open(filepath, "w", encoding="utf-8") as f:
#                 json.dump(results, f, indent=2, ensure_ascii=False)
            
#             # Optionally, you could also create a CSV, but JSON is simpler
#             # for storing structured data.

#             return {
#                 "status": "success",
#                 "file_saved": filepath,
#                 "article": results  # same data from crawler
#             }

#         except Exception as e:
#             return {
#                 "status": "failed",
#                 "error": str(e)
#             }






import asyncio
import os
import csv
import json
import time
from crawler import NewsCrawler

class Crawl4AICSVFileScraper:
    """
    A scraper that uses the asynchronous NewsCrawler to scrape a URL,
    then saves the resulting data to a CSV (or JSON) file in a specified output_dir.
    """

    def __init__(self, output_dir="outputs"):
        self.output_dir = output_dir
        os.makedirs(self.output_dir, exist_ok=True)

    async def scrape_and_save(self, url: str):
        try:
            crawler = NewsCrawler()
            results = await crawler.crawl_site(url)

            if results.get('status') == 'failed':
                return results

            timestamp = int(time.time())
            filename = f"crawl4ai_{timestamp}.json"
            filepath = os.path.join(self.output_dir, filename)

            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(results, f, indent=2, ensure_ascii=False)

            return {
                "status": "success",
                "file_saved": filepath,
                "article": results
            }

        except Exception as e:
            return {
                "status": "failed",
                "error": str(e)
            }










