from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from crawler import NewsCrawler
from scraper_scrapy import ScrapyNewsCrawler
from scraper_beautifulsoup import BeautifulSoupScraper  # <-- NEW IMPORT
import asyncio
import logging
from scraper_crawl4ai_file import Crawl4AICSVFileScraper
from scraper_firecrawl import FirecrawlScraper  # <-- NEW IMPORT






# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS settings remain the same
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CrawlRequest(BaseModel):
    url: str


# New request model for Firecrawl, which also needs an apiKey
class FirecrawlRequest(BaseModel):
    url: str
    apiKey: str



@app.post("/api/crawl4ai")
async def crawl_endpoint(request: CrawlRequest):
    try:
        crawler = NewsCrawler()
        results = await crawler.crawl_site(request.url)
        return {"status": "success", "data": results}
    except Exception as e:
        logger.error(f"Error during crawl4ai: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/scrapy")
async def scrapy_endpoint(request: CrawlRequest):
    try:
        crawler = ScrapyNewsCrawler()
        results = await crawler.crawl_site(request.url)
        return {"status": "success", "data": results}
    except Exception as e:
        logger.error(f"Error during Scrapy crawl: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))




@app.post("/api/beautifulSoup")
async def beautiful_soup_endpoint(request: CrawlRequest):
    """
    Endpoint for scraping a URL with requests + BeautifulSoup in a synchronous manner.
    We wrap it using asyncio.to_thread() for concurrency.
    """
    try:
        logger.info(f"Handling BeautifulSoup scrape for URL: {request.url}")
        scraper = BeautifulSoupScraper()
        # Run the synchronous scrape in a thread
        results = await asyncio.to_thread(scraper.scrape_site, request.url)
        if results.get('status') == 'failed':
            # Return a 500 if scraping failed
            raise HTTPException(status_code=500, detail=results.get('error'))

        return {"status": "success", "data": results}
    except Exception as e:
        logger.error(f"Error during BeautifulSoup scrape: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))




@app.post("/api/crawl4aiFile")
async def crawl4ai_file_endpoint(request: CrawlRequest):
    try:
        scraper = Crawl4AICSVFileScraper(output_dir="outputs")
        results = await scraper.scrape_and_save(request.url)
        
        if results.get('status') == 'failed':
            raise HTTPException(status_code=500, detail=results.get('error'))

        return {"status": "success", "data": results}
    except Exception as e:
        logger.error(f"Error during crawl4aiFile: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))




@app.post("/api/firecrawl")
async def firecrawl_endpoint(request: FirecrawlRequest):
    """
    Endpoint that calls FirecrawlScraper, passing the user's API key
    for authentication. We'll run the synchronous requests code in
    a thread so it doesn't block the FastAPI event loop.
    """
    try:
        logger.info(f"Handling Firecrawl for URL: {request.url}")
        
        # Initialize the scraper with the user's API key
        scraper = FirecrawlScraper(api_key=request.apiKey)
        
        # Because FirecrawlScraper uses requests (synchronous),
        # we run it in a thread for concurrency
        results = await asyncio.to_thread(scraper.scrape_site, request.url)
        
        if results.get('status') == 'failed':
            raise HTTPException(status_code=500, detail=results.get('error'))

        return {"status": "success", "data": results}
    except Exception as e:
        logger.error(f"Error during Firecrawl: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Server is running"}