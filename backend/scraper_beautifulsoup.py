# scraper_beautifulsoup.py

import logging
import requests
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

class BeautifulSoupScraper:
    def __init__(self):
        # You can define any default headers or config here
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        logger.info("BeautifulSoupScraper initialized with default headers")

    def scrape_site(self, url: str):
        """
        Fetch the web page using requests, parse with BeautifulSoup,
        and return data in a dict similar to other scrapers.
        """
        logger.info(f"Scraping URL with BeautifulSoup: {url}")

        try:
            # Fetch the web page
            response = requests.get(url, headers=self.headers, timeout=10)
            if response.status_code != 200:
                return {
                    'url': url,
                    'error': f'Status code {response.status_code}',
                    'status': 'failed'
                }

            # Parse HTML
            soup = BeautifulSoup(response.text, 'html.parser')

            # Extract title, paragraphs, links
            title = soup.find('h1').text if soup.find('h1') else 'No title found'
            paragraphs = [p.get_text(strip=True) for p in soup.find_all('p')]
            links = [a['href'] for a in soup.find_all('a', href=True)]

            # Create markdown content
            markdown_content = f"""
# {title}

{''.join(f'\n{p}\n' for p in paragraphs)}

### Links found:
{''.join(f'- {link}\n' for link in links[:5])}
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

        except requests.exceptions.RequestException as re:
            logger.error(f"Requests error: {re}")
            return {
                'url': url,
                'error': str(re),
                'status': 'failed'
            }
        except Exception as e:
            logger.error(f"General scraping error: {e}")
            return {
                'url': url,
                'error': str(e),
                'status': 'failed'
            }
