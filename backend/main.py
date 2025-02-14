# from fastapi import FastAPI, Response, HTTPException
# from pydantic import BaseModel
# from fastapi.middleware.cors import CORSMiddleware
# import asyncio
# import logging
# import json
# import openai
# import nltk
# from nltk import word_tokenize
# from collections import Counter
# from pydantic import BaseModel
# import io
# from wordcloud import WordCloud


# # IMPORT YOUR SCRAPERS
# from crawler import NewsCrawler
# from scraper_scrapy import ScrapyNewsCrawler
# from scraper_beautifulsoup import BeautifulSoupScraper
# from scraper_crawl4ai_file import Crawl4AICSVFileScraper
# from scraper_firecrawl import FirecrawlScraper

# # Set up logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# # Create the FastAPI app
# app = FastAPI()

# # For LOCAL DEV, allow local origins on port 5173, etc.
# origins = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Define request models
# class CrawlRequest(BaseModel):
#     url: str

# class FirecrawlRequest(BaseModel):
#     url: str
#     apiKey: str

# class LLMRequest(BaseModel):
#     apiKey: str
#     rawData: str
#     model: str = "gpt-4"   # default to gpt-4 if not provided

# # Define a new Pydantic model for text analysis requests
# class AnalysisRequest(BaseModel):
#     text: str  # the fully cleaned article text

# class WordcloudData(BaseModel):
#     words: list



# # ------------------ ENDPOINTS ------------------ #

# @app.post("/api/crawl4ai")
# async def crawl_endpoint(request: CrawlRequest):
#     """
#     Async crawler using aiohttp + BeautifulSoup (from crawler.py).
#     """
#     try:
#         crawler = NewsCrawler()
#         results = await crawler.crawl_site(request.url)
#         return {"status": "success", "data": results}
#     except Exception as e:
#         logger.error(f"Error during crawl4ai: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))







# @app.post("/api/scrapy")
# async def scrapy_endpoint(request: CrawlRequest):
#     """
#     Scrapy-based crawler using a separate process (scraper_scrapy.py).
#     """
#     try:
#         crawler = ScrapyNewsCrawler()
#         results = await crawler.crawl_site(request.url)
#         return {"status": "success", "data": results}
#     except Exception as e:
#         logger.error(f"Error during Scrapy crawl: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))







# @app.post("/api/beautifulSoup")
# async def beautiful_soup_endpoint(request: CrawlRequest):
#     """
#     A synchronous requests + BeautifulSoup approach (scraper_beautifulsoup.py)
#     wrapped with asyncio.to_thread() for concurrency.
#     """
#     try:
#         logger.info(f"Handling BeautifulSoup scrape for URL: {request.url}")
#         scraper = BeautifulSoupScraper()
#         results = await asyncio.to_thread(scraper.scrape_site, request.url)

#         if results.get('status') == 'failed':
#             raise HTTPException(status_code=500, detail=results.get('error'))

#         return {"status": "success", "data": results}

#     except Exception as e:
#         logger.error(f"Error during BeautifulSoup scrape: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))






# @app.post("/api/crawl4aiFile")
# async def crawl4ai_file_endpoint(request: CrawlRequest):
#     """
#     Reuses the Async crawler but also saves the output to a file
#     (scraper_crawl4ai_file.py).
#     """
#     try:
#         scraper = Crawl4AICSVFileScraper(output_dir="outputs")
#         results = await scraper.scrape_and_save(request.url)

#         if results.get('status') == 'failed':
#             raise HTTPException(status_code=500, detail=results.get('error'))

#         return {"status": "success", "data": results}

#     except Exception as e:
#         logger.error(f"Error during crawl4aiFile: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))







# @app.post("/api/firecrawl")
# async def firecrawl_endpoint(request: FirecrawlRequest):
#     """
#     Scraper for Firecrawl, requiring an API key (scraper_firecrawl.py).
#     Also uses asyncio.to_thread for concurrency.
#     """
#     try:
#         logger.info(f"Handling Firecrawl for URL: {request.url}")
#         scraper = FirecrawlScraper(api_key=request.apiKey)
#         results = await asyncio.to_thread(scraper.scrape_site, request.url)

#         if results.get('status') == 'failed':
#             raise HTTPException(status_code=500, detail=results.get('error'))

#         return {"status": "success", "data": results}

#     except Exception as e:
#         logger.error(f"Error during Firecrawl: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))







# @app.post("/api/llm-process")
# def llm_process(payload: LLMRequest):
#     """
#     Example endpoint that calls GPT-4 to process the raw data
#     into some structured output.
#     """
#     openai.api_key = payload.apiKey  # Not recommended for production

#     # The user’s raw data is a string. Possibly JSON or plain text.
#     # If we assume it’s JSON, we can parse it. If not, just treat it as text.
#     # For demonstration, let’s just pass it to GPT-4 as is.
#     user_input = payload.rawData

#     prompt = f"""
#     You are an advanced assistant for extracting content and metadata from JSON.

#     GIVEN the following JSON input:

#     {user_input}

#     1. Do not omit or abbreviate any fields or paragraphs unless absolutely necessary.
#     2. Extract the full text content if available (paragraphs, markdown, etc.).
#     3. Include any metadata (e.g. title, date, authors, or links) in a structured manner.
#     4. Return a single valid JSON object with keys that reflect the structure and content, e.g.:
#     - "title"
#     - "fullText" (the combined paragraphs)
#     - "metadata" (authors, datePublished, etc., if present)
#     - "links" (array of extracted links)
#     - ...whatever else is relevant from the input

#     Ensure the JSON is valid, does not contain extra markdown formatting, 
#     and is not truncated. Return all the textual content from the original input.

#     Begin now.
#     """


#     try:
#         response = openai.ChatCompletion.create(
#             model=payload.model,  # e.g. gpt-4
#             messages=[
#                 {"role": "system", "content": "You are an expert data formatter."},
#                 {"role": "user", "content": prompt},
#             ],
#             temperature=0,
#         )
#         # The LLM's reply
#         content = response.choices[0].message["content"].strip()

#         # Attempt to parse the content as JSON
#         # If it fails, we just return the raw text
#         try:
#             cleaned_data = json.loads(content)
#         except json.JSONDecodeError:
#             cleaned_data = {"raw_output": content}

#         return {"status": "success", "data": cleaned_data}

#     except Exception as e:
#         logger.error(f"LLM processing error: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))





# @app.post("/api/analyse-text")
# def analyse_text(payload: AnalysisRequest):
#     """
#     Takes the 'text' field from the payload,
#     returns frequency distributions and n-grams.
#     """
#     try:
#         tokens = word_tokenize(payload.text)  # basic tokenizing
#         tokens = [t.lower() for t in tokens if t.isalpha()]  # keep only alphabetic tokens

#         # Most frequent single words
#         word_counts = Counter(tokens).most_common(10)

#         # Bigrams
#         bigrams = list(nltk.bigrams(tokens))
#         bigram_counts = Counter(bigrams).most_common(10)

#         # Trigrams
#         trigrams = list(nltk.trigrams(tokens))
#         trigram_counts = Counter(trigrams).most_common(10)

#         return {
#             "status": "success",
#             "data": {
#                 "topWords": word_counts,
#                 "topBigrams": bigram_counts,
#                 "topTrigrams": trigram_counts
#             }
#         }
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))








# @app.post("/api/wordcloud-image")
# def wordcloud_image(payload: WordcloudData):
#     try:
#         freq_dict = {w: c for (w, c) in payload.words}
#         wc = WordCloud(width=600, height=400, background_color="white")
#         wc.generate_from_frequencies(freq_dict)

#         img_buffer = io.BytesIO()
#         wc.to_image().save(img_buffer, format='PNG')
#         img_buffer.seek(0)
#         return Response(content=img_buffer.getvalue(), media_type="image/png")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))








# @app.get("/health")
# async def health_check():
#     """
#     Simple health check endpoint.
#     """
#     return {"status": "healthy", "message": "Server is running"}







































# from fastapi import FastAPI, HTTPException, Response
# from pydantic import BaseModel
# from fastapi.middleware.cors import CORSMiddleware
# import asyncio
# import logging
# import os
# import io
# import json
# import time
# import openai  # for LLM endpoint, if used
# from wordcloud import WordCloud
# from nltk import word_tokenize
# from collections import Counter

# # IMPORT YOUR SCRAPERS
# from crawler import NewsCrawler           # The async crawler
# from scraper_scrapy import ScrapyNewsCrawler
# from scraper_beautifulsoup import BeautifulSoupScraper
# from scraper_crawl4ai_file import Crawl4AICSVFileScraper
# from scraper_firecrawl import FirecrawlScraper

# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# app = FastAPI()

# # CORS settings
# origins = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",
#     # Add your frontend domain if deployed
#     # "https://myapp.vercel.app",
# ]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # -------------------- Pydantic Models --------------------

# class CrawlRequest(BaseModel):
#     url: str
#     projectName: str = None  # optional project name

# class FirecrawlRequest(BaseModel):
#     url: str
#     apiKey: str
#     projectName: str = None

# class LLMRequest(BaseModel):
#     apiKey: str
#     rawData: str
#     model: str = "gpt-4"
#     projectName: str = None

# class AnalysisRequest(BaseModel):
#     text: str
#     projectName: str = None

# class WordcloudData(BaseModel):
#     words: list  # expecting [ [word, count], ... ]
#     projectName: str = None

# # -------------------- Utility Function --------------------

# def get_output_dir(project_name: str = None) -> str:
#     """
#     If projectName is provided, create a subfolder in outputs/.
#     Otherwise, return "outputs" as default.
#     """
#     if project_name:
#         folder_path = os.path.join("outputs", project_name)
#         os.makedirs(folder_path, exist_ok=True)
#         return folder_path
#     else:
#         return "outputs"

# # -------------------- Endpoints ---------------------------

# @app.post("/api/crawl4ai")
# async def crawl_endpoint(request: CrawlRequest):
#     """
#     Async crawler using aiohttp + BeautifulSoup (crawler.py).
#     Does NOT save to file automatically.
#     """
#     try:
#         crawler = NewsCrawler()
#         results = await crawler.crawl_site(request.url)
#         return {"status": "success", "data": results}
#     except Exception as e:
#         logger.error(f"Error during crawl4ai: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/scrapy")
# async def scrapy_endpoint(request: CrawlRequest):
#     """
#     Scrapy-based crawler using a separate process (scraper_scrapy.py).
#     Does NOT save to file automatically.
#     """
#     try:
#         crawler = ScrapyNewsCrawler()
#         results = await crawler.crawl_site(request.url)
#         return {"status": "success", "data": results}
#     except Exception as e:
#         logger.error(f"Error during Scrapy crawl: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/beautifulSoup")
# async def beautiful_soup_endpoint(request: CrawlRequest):
#     """
#     Synchronous requests + BeautifulSoup approach (scraper_beautifulsoup.py).
#     Also does not save automatically.
#     """
#     try:
#         logger.info(f"Handling BeautifulSoup scrape for URL: {request.url}")
#         scraper = BeautifulSoupScraper()
#         # run synchronous in a thread
#         loop = asyncio.get_event_loop()
#         results = await loop.run_in_executor(None, scraper.scrape_site, request.url)
        
#         if results.get('status') == 'failed':
#             raise HTTPException(status_code=500, detail=results.get('error'))

#         return {"status": "success", "data": results}
#     except Exception as e:
#         logger.error(f"Error during BeautifulSoup scrape: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/crawl4aiFile")
# async def crawl4ai_file_endpoint(request: CrawlRequest):
#     """
#     Reuses the Async crawler but also saves the output to a file
#     (scraper_crawl4ai_file.py).
#     If projectName is set, we create outputs/{projectName}.
#     """
#     try:
#         # Decide output dir
#         output_dir = get_output_dir(request.projectName)

#         scraper = Crawl4AICSVFileScraper(output_dir=output_dir)
#         results = await scraper.scrape_and_save(request.url)

#         if results.get('status') == 'failed':
#             raise HTTPException(status_code=500, detail=results.get('error'))

#         return {"status": "success", "data": results}
#     except Exception as e:
#         logger.error(f"Error during crawl4aiFile: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/firecrawl")
# async def firecrawl_endpoint(request: FirecrawlRequest):
#     """
#     FirecrawlScraper usage, also can specify a projectName for subfolder saving if needed.
#     """
#     try:
#         logger.info(f"Handling Firecrawl for URL: {request.url}")
#         scraper = FirecrawlScraper(api_key=request.apiKey)
        
#         # run synchronous in a thread
#         loop = asyncio.get_event_loop()
#         results = await loop.run_in_executor(None, scraper.scrape_site, request.url)
        
#         if results.get('status') == 'failed':
#             raise HTTPException(status_code=500, detail=results.get('error'))

#         # If you want to save the result to a file, do so here:
#         if request.projectName:
#             folder_path = get_output_dir(request.projectName)
#             timestamp = int(time.time())
#             filename = f"firecrawl_{timestamp}.json"
#             filepath = os.path.join(folder_path, filename)
#             with open(filepath, "w", encoding="utf-8") as f:
#                 json.dump(results, f, indent=2, ensure_ascii=False)

#         return {"status": "success", "data": results}
#     except Exception as e:
#         logger.error(f"Error during Firecrawl: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/llm-process")
# def llm_process(payload: LLMRequest):
#     """
#     Example endpoint calling GPT-4 (or model) to process raw data -> structured output.
#     Saves the JSON to outputs/{projectName} if provided.
#     """
#     openai.api_key = payload.apiKey

#     user_input = payload.rawData
#     prompt = f"""
# You are a data-cleaning assistant.
# Given the following input data:

# {user_input}

# Please return clean, valid JSON describing it in a structured way.
# """
#     try:
#         response = openai.ChatCompletion.create(
#             model=payload.model,
#             messages=[
#                 {"role": "system", "content": "You are an expert data formatter."},
#                 {"role": "user", "content": prompt}
#             ],
#             temperature=0,
#         )
#         content = response.choices[0].message["content"].strip()

#         # Attempt to parse as JSON
#         try:
#             cleaned_data = json.loads(content)
#         except json.JSONDecodeError:
#             cleaned_data = {"raw_output": content}

#         # If projectName is set, save to subfolder
#         folder_path = get_output_dir(payload.projectName)
#         timestamp = int(time.time())
#         filename = f"llm_{timestamp}.json"
#         filepath = os.path.join(folder_path, filename)
#         with open(filepath, "w", encoding="utf-8") as f:
#             json.dump(cleaned_data, f, indent=2, ensure_ascii=False)

#         return {"status": "success", "data": cleaned_data}
#     except Exception as e:
#         logger.error(f"LLM processing error: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/analyse-text")
# def analyse_text(payload: AnalysisRequest):
#     """
#     Simple text analysis: topWords, bigrams, trigrams. Could also remove stopwords, etc.
#     Saves results to outputs/{projectName} if present.
#     """
#     try:
#         text = payload.text
#         # Basic tokenization
#         tokens = word_tokenize(text)
#         # Keep only alphabetic, lowercase
#         tokens = [t.lower() for t in tokens if t.isalpha()]

#         # frequency
#         word_counts = Counter(tokens).most_common(10)

#         # bigrams
#         bigrams_list = list(zip(tokens, tokens[1:]))
#         bigram_counts = Counter(bigrams_list).most_common(10)

#         # trigrams
#         trigrams_list = list(zip(tokens, tokens[1:], tokens[2:]))
#         trigram_counts = Counter(trigrams_list).most_common(10)

#         analysis_results = {
#             "topWords": word_counts,
#             "topBigrams": bigram_counts,
#             "topTrigrams": trigram_counts
#         }

#         # If projectName is set, save to a JSON
#         folder_path = get_output_dir(payload.projectName)
#         timestamp = int(time.time())
#         filename = f"analysis_{timestamp}.json"
#         filepath = os.path.join(folder_path, filename)
#         with open(filepath, "w", encoding="utf-8") as f:
#             json.dump(analysis_results, f, indent=2, ensure_ascii=False)

#         return {"status": "success", "data": analysis_results}
#     except Exception as e:
#         logger.error(f"Error in analyse-text: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/wordcloud-image")
# def generate_wordcloud(payload: WordcloudData):
#     """
#     Creates a PNG word cloud from [ [word, count], ... ].
#     If projectName is set, saves the PNG in outputs/{projectName}.
#     """
#     try:
#         freq_dict = {w: c for (w, c) in payload.words}
#         wc = WordCloud(width=600, height=400, background_color="white")
#         wc.generate_from_frequencies(freq_dict)

#         img_buffer = io.BytesIO()
#         wc.to_image().save(img_buffer, format='PNG')
#         img_buffer.seek(0)
        
#         # Save to disk if projectName
#         folder_path = get_output_dir(payload.projectName)
#         timestamp = int(time.time())
#         filename = f"wordcloud_{timestamp}.png"
#         filepath = os.path.join(folder_path, filename)
#         with open(filepath, "wb") as f:
#             f.write(img_buffer.getvalue())

#         return Response(content=img_buffer.getvalue(), media_type="image/png")
#     except Exception as e:
#         logger.error(f"Error generating word cloud: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.get("/health")
# async def health_check():
#     return {"status": "healthy", "message": "Server is running"}





































# from fastapi import FastAPI, HTTPException, Response
# from pydantic import BaseModel
# from fastapi.middleware.cors import CORSMiddleware
# import asyncio
# import logging
# import os
# import io
# import json
# import time

# import openai
# from wordcloud import WordCloud
# from nltk import word_tokenize
# from collections import Counter

# from crawler import NewsCrawler
# from scraper_scrapy import ScrapyNewsCrawler
# from scraper_beautifulsoup import BeautifulSoupScraper
# from scraper_crawl4ai_file import Crawl4AICSVFileScraper
# from scraper_firecrawl import FirecrawlScraper

# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# app = FastAPI()

# origins = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",
# ]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ---------------------- Models ----------------------
# class CrawlRequest(BaseModel):
#     url: str
#     projectName: str = None

# class FirecrawlRequest(BaseModel):
#     url: str
#     apiKey: str
#     projectName: str = None

# class LLMRequest(BaseModel):
#     apiKey: str
#     rawData: str
#     model: str = "gpt-4"
#     projectName: str = None

# class AnalysisRequest(BaseModel):
#     text: str
#     projectName: str = None

# class WordcloudData(BaseModel):
#     words: list  # e.g. [ [word, count], ... ]
#     projectName: str = None

# # -------------- Utility for subfolder ---------------
# def get_output_dir(project_name: str = None) -> str:
#     if project_name:
#         folder_path = os.path.join("outputs", project_name)
#         os.makedirs(folder_path, exist_ok=True)
#         return folder_path
#     else:
#         return "outputs"

# # -------------- Endpoints ---------------------------
# @app.post("/api/crawl4ai")
# async def crawl_endpoint(request: CrawlRequest):
#     try:
#         crawler = NewsCrawler()
#         results = await crawler.crawl_site(request.url)
#         return {"status": "success", "data": results}
#     except Exception as e:
#         logger.error(f"Error crawl4ai: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/scrapy")
# async def scrapy_endpoint(request: CrawlRequest):
#     try:
#         crawler = ScrapyNewsCrawler()
#         results = await crawler.crawl_site(request.url)
#         return {"status": "success", "data": results}
#     except Exception as e:
#         logger.error(f"Error scrapy: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/beautifulSoup")
# async def beautiful_soup_endpoint(request: CrawlRequest):
#     try:
#         scraper = BeautifulSoupScraper()
#         loop = asyncio.get_event_loop()
#         results = await loop.run_in_executor(None, scraper.scrape_site, request.url)
#         if results.get('status') == 'failed':
#             raise HTTPException(status_code=500, detail=results.get('error'))
#         return {"status": "success", "data": results}
#     except Exception as e:
#         logger.error(f"Error beautifulSoup: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/crawl4aiFile")
# async def crawl4ai_file_endpoint(request: CrawlRequest):
#     try:
#         output_dir = get_output_dir(request.projectName)
#         scraper = Crawl4AICSVFileScraper(output_dir=output_dir)
#         results = await scraper.scrape_and_save(request.url)

#         if results.get('status') == 'failed':
#             raise HTTPException(status_code=500, detail=results.get('error'))

#         return {"status": "success", "data": results}
#     except Exception as e:
#         logger.error(f"Error crawl4aiFile: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/firecrawl")
# async def firecrawl_endpoint(request: FirecrawlRequest):
#     try:
#         logger.info(f"Handling Firecrawl for URL: {request.url}")
#         scraper = FirecrawlScraper(api_key=request.apiKey)
#         loop = asyncio.get_event_loop()
#         results = await loop.run_in_executor(None, scraper.scrape_site, request.url)

#         if results.get('status') == 'failed':
#             raise HTTPException(status_code=500, detail=results.get('error'))

#         # Save if projectName
#         if request.projectName:
#             folder_path = get_output_dir(request.projectName)
#             ts = int(time.time())
#             filepath = os.path.join(folder_path, f"firecrawl_{ts}.json")
#             with open(filepath, "w", encoding="utf-8") as f:
#                 json.dump(results, f, indent=2, ensure_ascii=False)

#         return {"status": "success", "data": results}
#     except Exception as e:
#         logger.error(f"Error firecrawl: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/llm-process")
# def llm_process(payload: LLMRequest):
#     openai.api_key = payload.apiKey
#     user_input = payload.rawData

#     prompt = f"""
# You are a data-cleaning assistant.
# Given the following input data:

# {user_input}

# Please return clean, valid JSON describing it in a structured way.
# """
#     try:
#         response = openai.ChatCompletion.create(
#             model=payload.model,
#             messages=[
#                 {"role": "system", "content": "You are an expert data formatter."},
#                 {"role": "user", "content": prompt}
#             ],
#             temperature=0,
#         )
#         content = response.choices[0].message["content"].strip()

#         try:
#             cleaned_data = json.loads(content)
#         except json.JSONDecodeError:
#             cleaned_data = {"raw_output": content}

#         folder_path = get_output_dir(payload.projectName)
#         ts = int(time.time())
#         filepath = os.path.join(folder_path, f"llm_{ts}.json")
#         with open(filepath, "w", encoding="utf-8") as f:
#             json.dump(cleaned_data, f, indent=2, ensure_ascii=False)

#         return {"status": "success", "data": cleaned_data}
#     except Exception as e:
#         logger.error(f"LLM processing error: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/analyse-text")
# def analyse_text(payload: AnalysisRequest):
#     try:
#         text = payload.text
#         tokens = word_tokenize(text)
#         tokens = [t.lower() for t in tokens if t.isalpha()]

#         word_counts = Counter(tokens).most_common(50)  # let's get top 50
#         bigrams_list = list(zip(tokens, tokens[1:]))
#         bigram_counts = Counter(bigrams_list).most_common(20)
#         trigrams_list = list(zip(tokens, tokens[1:], tokens[2:]))
#         trigram_counts = Counter(trigrams_list).most_common(20)

#         analysis_results = {
#             "topWords": word_counts,      # up to 50
#             "topBigrams": bigram_counts,  # up to 20
#             "topTrigrams": trigram_counts # up to 20
#         }

#         folder_path = get_output_dir(payload.projectName)
#         ts = int(time.time())
#         filepath = os.path.join(folder_path, f"analysis_{ts}.json")
#         with open(filepath, "w", encoding="utf-8") as f:
#             json.dump(analysis_results, f, indent=2, ensure_ascii=False)

#         return {"status": "success", "data": analysis_results}
#     except Exception as e:
#         logger.error(f"Error in analyse-text: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/wordcloud-image")
# def generate_wordcloud(payload: WordcloudData):
#     try:
#         freq_dict = {w: c for (w, c) in payload.words}
#         wc = WordCloud(width=600, height=400, background_color="white")
#         wc.generate_from_frequencies(freq_dict)

#         img_buffer = io.BytesIO()
#         wc.to_image().save(img_buffer, format='PNG')
#         img_buffer.seek(0)

#         folder_path = get_output_dir(payload.projectName)
#         ts = int(time.time())
#         png_path = os.path.join(folder_path, f"wordcloud_{ts}.png")
#         with open(png_path, "wb") as f:
#             f.write(img_buffer.getvalue())

#         return Response(content=img_buffer.getvalue(), media_type="image/png")
#     except Exception as e:
#         logger.error(f"Error generating word cloud: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

# @app.get("/health")
# async def health_check():
#     return {"status": "healthy", "message": "Server is running"}

























from fastapi import FastAPI, HTTPException, Response
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import logging
import os
import io
import json
import time

import openai
from wordcloud import WordCloud
from nltk import word_tokenize
from collections import Counter

from crawler import NewsCrawler
from scraper_scrapy import ScrapyNewsCrawler
from scraper_beautifulsoup import BeautifulSoupScraper
from scraper_crawl4ai_file import Crawl4AICSVFileScraper
from scraper_firecrawl import FirecrawlScraper

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

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

# ---------------------- Models ----------------------
class CrawlRequest(BaseModel):
    url: str
    projectName: str = None

class FirecrawlRequest(BaseModel):
    url: str
    apiKey: str
    projectName: str = None

class LLMRequest(BaseModel):
    apiKey: str
    rawData: str
    model: str = "gpt-4"
    projectName: str = None

class AnalysisRequest(BaseModel):
    text: str
    projectName: str = None

class WordcloudData(BaseModel):
    words: list  # e.g. [ [word, count], ... ]
    projectName: str = None

# -------------- Utility for subfolder ---------------
def get_output_dir(project_name: str = None) -> str:
    if project_name:
        folder_path = os.path.join("outputs", project_name)
        os.makedirs(folder_path, exist_ok=True)
        return folder_path
    else:
        return "outputs"

# -------------- Endpoints ---------------------------
@app.post("/api/crawl4ai")
async def crawl_endpoint(request: CrawlRequest):
    """
    Async crawler using NewsCrawler.
    Now automatically saves JSON if projectName is set.
    """
    try:
        crawler = NewsCrawler()
        results = await crawler.crawl_site(request.url)

        # If projectName is set, save to subfolder
        if request.projectName:
            folder_path = get_output_dir(request.projectName)
            ts = int(time.time())
            filename = f"crawl4ai_{ts}.json"
            filepath = os.path.join(folder_path, filename)
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(results, f, indent=2, ensure_ascii=False)

        return {"status": "success", "data": results}
    except Exception as e:
        logger.error(f"Error in crawl4ai: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/scrapy")
async def scrapy_endpoint(request: CrawlRequest):
    """
    Scrapy-based crawler. Also now saves JSON if projectName is set.
    """
    try:
        crawler = ScrapyNewsCrawler()
        results = await crawler.crawl_site(request.url)

        if request.projectName:
            folder_path = get_output_dir(request.projectName)
            ts = int(time.time())
            filename = f"scrapy_{ts}.json"
            filepath = os.path.join(folder_path, filename)
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(results, f, indent=2, ensure_ascii=False)

        return {"status": "success", "data": results}
    except Exception as e:
        logger.error(f"Error in Scrapy: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/beautifulSoup")
async def beautiful_soup_endpoint(request: CrawlRequest):
    """
    Synchronous requests + BeautifulSoup approach.
    Also saves JSON if projectName is set.
    """
    try:
        scraper = BeautifulSoupScraper()
        loop = asyncio.get_event_loop()
        results = await loop.run_in_executor(None, scraper.scrape_site, request.url)

        if results.get('status') == 'failed':
            raise HTTPException(status_code=500, detail=results.get('error'))

        if request.projectName:
            folder_path = get_output_dir(request.projectName)
            ts = int(time.time())
            filename = f"beautifulsoup_{ts}.json"
            filepath = os.path.join(folder_path, filename)
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(results, f, indent=2, ensure_ascii=False)

        return {"status": "success", "data": results}
    except Exception as e:
        logger.error(f"Error in beautifulSoup: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/crawl4aiFile")
async def crawl4ai_file_endpoint(request: CrawlRequest):
    """
    Reuses the Async crawler but also saves the output to a file
    (scraper_crawl4ai_file.py).
    """
    try:
        output_dir = get_output_dir(request.projectName)
        scraper = Crawl4AICSVFileScraper(output_dir=output_dir)
        results = await scraper.scrape_and_save(request.url)

        if results.get('status') == 'failed':
            raise HTTPException(status_code=500, detail=results.get('error'))

        return {"status": "success", "data": results}
    except Exception as e:
        logger.error(f"Error in crawl4aiFile: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/firecrawl")
async def firecrawl_endpoint(request: FirecrawlRequest):
    """
    FirecrawlScraper usage, also saves if projectName is set.
    """
    try:
        logger.info(f"Handling Firecrawl for URL: {request.url}")
        scraper = FirecrawlScraper(api_key=request.apiKey)
        loop = asyncio.get_event_loop()
        results = await loop.run_in_executor(None, scraper.scrape_site, request.url)

        if results.get('status') == 'failed':
            raise HTTPException(status_code=500, detail=results.get('error'))

        if request.projectName:
            folder_path = get_output_dir(request.projectName)
            ts = int(time.time())
            filename = f"firecrawl_{ts}.json"
            filepath = os.path.join(folder_path, filename)
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(results, f, indent=2, ensure_ascii=False)

        return {"status": "success", "data": results}
    except Exception as e:
        logger.error(f"Error in Firecrawl: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/llm-process")
def llm_process(payload: LLMRequest):
    """
    Calls GPT-4 to process raw data. Saves JSON if projectName is set.
    """
    openai.api_key = payload.apiKey
    user_input = payload.rawData

    prompt = f"""
You are a data-cleaning assistant.
Given the following input data:

{user_input}

Please return clean, valid JSON describing it in a structured way.
"""
    try:
        response = openai.ChatCompletion.create(
            model=payload.model,
            messages=[
                {"role": "system", "content": "You are an expert data formatter."},
                {"role": "user", "content": prompt}
            ],
            temperature=0,
        )
        content = response.choices[0].message["content"].strip()

        try:
            cleaned_data = json.loads(content)
        except json.JSONDecodeError:
            cleaned_data = {"raw_output": content}

        folder_path = get_output_dir(payload.projectName)
        ts = int(time.time())
        filepath = os.path.join(folder_path, f"llm_{ts}.json")
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(cleaned_data, f, indent=2, ensure_ascii=False)

        return {"status": "success", "data": cleaned_data}
    except Exception as e:
        logger.error(f"LLM processing error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyse-text")
def analyse_text(payload: AnalysisRequest):
    """
    Basic text analysis of up to 50 top words, 20 bigrams, 20 trigrams.
    Saves JSON if projectName is set.
    """
    try:
        text = payload.text
        tokens = word_tokenize(text)
        tokens = [t.lower() for t in tokens if t.isalpha()]

        word_counts = Counter(tokens).most_common(50)
        bigrams_list = list(zip(tokens, tokens[1:]))
        bigram_counts = Counter(bigrams_list).most_common(20)
        trigrams_list = list(zip(tokens, tokens[1:], tokens[2:]))
        trigram_counts = Counter(trigrams_list).most_common(20)

        analysis_results = {
            "topWords": word_counts,
            "topBigrams": bigram_counts,
            "topTrigrams": trigram_counts
        }

        folder_path = get_output_dir(payload.projectName)
        ts = int(time.time())
        filepath = os.path.join(folder_path, f"analysis_{ts}.json")
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(analysis_results, f, indent=2, ensure_ascii=False)

        return {"status": "success", "data": analysis_results}
    except Exception as e:
        logger.error(f"Error in analyse-text: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/wordcloud-image")
def generate_wordcloud(payload: WordcloudData):
    """
    Creates a PNG from word frequencies, saves if projectName is set.
    """
    try:
        freq_dict = {w: c for (w, c) in payload.words}
        wc = WordCloud(width=600, height=400, background_color="white")
        wc.generate_from_frequencies(freq_dict)

        img_buffer = io.BytesIO()
        wc.to_image().save(img_buffer, format='PNG')
        img_buffer.seek(0)

        folder_path = get_output_dir(payload.projectName)
        ts = int(time.time())
        png_path = os.path.join(folder_path, f"wordcloud_{ts}.png")
        with open(png_path, "wb") as f:
            f.write(img_buffer.getvalue())

        return Response(content=img_buffer.getvalue(), media_type="image/png")
    except Exception as e:
        logger.error(f"Error generating word cloud: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Server is running"}
