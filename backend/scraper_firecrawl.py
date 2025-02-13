import logging
import requests
import json

logger = logging.getLogger(__name__)

class FirecrawlScraper:
    def __init__(self, api_key: str):
        """
        Initialize the scraper with the user's API key.
        """
        self.api_key = api_key
        self.headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
        logger.info("FirecrawlScraper initialized with provided API key.")

    def scrape_site(self, url: str, formats: list = ["markdown"]):
        """
        Calls the Firecrawl API to scrape web page content in the specified formats.
        """
        logger.info(f"Attempting Firecrawl scrape for URL: {url} with formats: {formats}")

        # Firecrawl API endpoint for scraping
        firecrawl_endpoint = "https://api.firecrawl.dev/v1/scrape"

        try:
            # Payload specifying the URL and desired output formats
            payload = {
                "url": url,
                "formats": formats  # Specify desired formats, e.g., ["markdown", "html"]
            }

            response = requests.post(
                firecrawl_endpoint,
                headers=self.headers,
                json=payload,
                timeout=15
            )

            # Log raw response for debugging
            logger.info(f"Raw Firecrawl Response: {response.status_code} - {response.text}")

            # Handle HTTP errors
            if response.status_code != 200:
                logger.warning(f"Firecrawl returned status {response.status_code}: {response.text}")
                return {
                    "url": url,
                    "error": f"Firecrawl API error: {response.status_code} - {response.text}",
                    "status": "failed"
                }

            # Parse response JSON
            data = response.json()
            logger.info(f"API Response JSON: {json.dumps(data, indent=2)}")

            if not data.get("data"):
                return {
                    "url": url,
                    "error": f"Unexpected API response format: {data}",
                    "status": "failed"
                }

            # Extract the desired formats from the response
            result = data["data"]
            extracted_content = {fmt: result.get(fmt, f"No {fmt} content available") for fmt in formats}

            # Return structured output
            return {
                "url": url,
                "extracted_content": extracted_content,
                "raw_data": result
            }

        except requests.exceptions.RequestException as e:
            logger.error(f"Requests error with Firecrawl: {str(e)}")
            return {
                "url": url,
                "error": str(e),
                "status": "failed"
            }
        except Exception as e:
            logger.error(f"Unexpected error with Firecrawl: {str(e)}")
            return {
                "url": url,
                "error": str(e),
                "status": "failed"
            }
