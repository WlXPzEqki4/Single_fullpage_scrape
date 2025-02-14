import { useState } from 'react';

function App() {
  // State
  const [url, setUrl] = useState('');
  const [selectedMethods, setSelectedMethods] = useState({
    crawl4ai: false,
    scrapy: false,
    beautifulSoup: false,
    crawl4aiFile: false,
    firecrawl: false,
  });
  const [apiKey, setApiKey] = useState('');
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // For LOCAL DEV, point to your local FastAPI server:
  // If your FastAPI runs on "http://127.0.0.1:8000", set it below:
  const BASE_URL = 'http://127.0.0.1:8000';

  const scrapingMethods = [
    { id: 'crawl4ai', label: 'crawl4ai with AsyncWebCrawler' },
    { id: 'scrapy', label: 'Scrapy (Full Web Crawling Framework)' },
    { id: 'beautifulSoup', label: 'BeautifulSoup + Requests' },
    { id: 'crawl4aiFile', label: 'crawl4ai + Saving to File' },
    { id: 'firecrawl', label: 'Firecrawl', requiresApiKey: true },
  ];

  const handleMethodToggle = (methodId) => {
    setSelectedMethods((prev) => ({
      ...prev,
      [methodId]: !prev[methodId],
    }));
  };

  const handleScrape = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1) crawl4ai
      if (selectedMethods.crawl4ai) {
        const response = await fetch(`${BASE_URL}/api/crawl4ai`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Server error');
        }
        const data = await response.json();
        setResults((prev) => ({ ...prev, crawl4ai: data }));
      }

      // 2) scrapy
      if (selectedMethods.scrapy) {
        const response = await fetch(`${BASE_URL}/api/scrapy`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Server error');
        }
        const data = await response.json();
        setResults((prev) => ({ ...prev, scrapy: data }));
      }

      // 3) beautifulSoup
      if (selectedMethods.beautifulSoup) {
        const response = await fetch(`${BASE_URL}/api/beautifulSoup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Server error');
        }
        const data = await response.json();
        setResults((prev) => ({ ...prev, beautifulSoup: data }));
      }

      // 4) crawl4aiFile
      if (selectedMethods.crawl4aiFile) {
        const response = await fetch(`${BASE_URL}/api/crawl4aiFile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Server error');
        }
        const data = await response.json();
        setResults((prev) => ({ ...prev, crawl4aiFile: data }));
      }

      // 5) firecrawl
      if (selectedMethods.firecrawl) {
        const response = await fetch(`${BASE_URL}/api/firecrawl`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, apiKey }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Server error');
        }
        const data = await response.json();
        setResults((prev) => ({ ...prev, firecrawl: data }));
      }
    } catch (err) {
      console.error('Error details:', err);
      setError('Failed to fetch results: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear only URL, results, and error (keep the checkboxes and API key)
  const handleClear = () => {
    setUrl('');
    setResults({});
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Local Web Scraper</h1>

        {/* URL Input */}
        <div className="mb-6">
          <input
            type="url"
            placeholder="Enter URL to scrape"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Scraping Methods */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Select Scraping Methods</h2>
          <div className="space-y-3">
            {scrapingMethods.map((method) => (
              <div key={method.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={method.id}
                  checked={selectedMethods[method.id]}
                  onChange={() => handleMethodToggle(method.id)}
                  className="mr-3"
                />
                <label htmlFor={method.id} className="text-gray-700">
                  {method.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* API Key (for Firecrawl) */}
        {selectedMethods.firecrawl && (
          <div className="mb-6">
            <input
              type="password"
              placeholder="Enter Firecrawl API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        {/* Action Buttons: Scrape & Clear */}
        <div className="flex space-x-2">
          <button
            onClick={handleScrape}
            disabled={isLoading || !Object.values(selectedMethods).some(Boolean)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Scraping...' : 'Start Scraping'}
          </button>

          <button
            onClick={handleClear}
            disabled={isLoading}
            className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>

        {/* Results Display */}
        {Object.entries(results).map(([method, data]) => (
          <div key={method} className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">{method} Results</h3>
              <button
                onClick={() => {
                  const blob = new Blob(
                    [JSON.stringify(data, null, 2)],
                    { type: 'application/json' }
                  );
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${method}-results.json`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
                }}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Download
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-md max-h-48 overflow-auto">
              <pre className="text-sm">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
