from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import logging

# IMPORT YOUR SCRAPERS
from crawler import NewsCrawler
from scraper_scrapy import ScrapyNewsCrawler
from scraper_beautifulsoup import BeautifulSoupScraper
from scraper_crawl4ai_file import Crawl4AICSVFileScraper
from scraper_firecrawl import FirecrawlScraper

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create the FastAPI app
app = FastAPI()

# For LOCAL DEV, allow local origins on port 5173, etc.
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request models
class CrawlRequest(BaseModel):
    url: str

class FirecrawlRequest(BaseModel):
    url: str
    apiKey: str

# ------------------ ENDPOINTS ------------------ #

@app.post("/api/crawl4ai")
async def crawl_endpoint(request: CrawlRequest):
    """
    Async crawler using aiohttp + BeautifulSoup (from crawler.py).
    """
    try:
        crawler = NewsCrawler()
        results = await crawler.crawl_site(request.url)
        return {"status": "success", "data": results}
    except Exception as e:
        logger.error(f"Error during crawl4ai: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/scrapy")
async def scrapy_endpoint(request: CrawlRequest):
    """
    Scrapy-based crawler using a separate process (scraper_scrapy.py).
    """
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
    A synchronous requests + BeautifulSoup approach (scraper_beautifulsoup.py)
    wrapped with asyncio.to_thread() for concurrency.
    """
    try:
        logger.info(f"Handling BeautifulSoup scrape for URL: {request.url}")
        scraper = BeautifulSoupScraper()
        results = await asyncio.to_thread(scraper.scrape_site, request.url)

        if results.get('status') == 'failed':
            raise HTTPException(status_code=500, detail=results.get('error'))

        return {"status": "success", "data": results}

    except Exception as e:
        logger.error(f"Error during BeautifulSoup scrape: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/crawl4aiFile")
async def crawl4ai_file_endpoint(request: CrawlRequest):
    """
    Reuses the Async crawler but also saves the output to a file
    (scraper_crawl4ai_file.py).
    """
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
    Scraper for Firecrawl, requiring an API key (scraper_firecrawl.py).
    Also uses asyncio.to_thread for concurrency.
    """
    try:
        logger.info(f"Handling Firecrawl for URL: {request.url}")
        scraper = FirecrawlScraper(api_key=request.apiKey)
        results = await asyncio.to_thread(scraper.scrape_site, request.url)

        if results.get('status') == 'failed':
            raise HTTPException(status_code=500, detail=results.get('error'))

        return {"status": "success", "data": results}

    except Exception as e:
        logger.error(f"Error during Firecrawl: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health_check():
    """
    Simple health check endpoint.
    """
    return {"status": "healthy", "message": "Server is running"}
