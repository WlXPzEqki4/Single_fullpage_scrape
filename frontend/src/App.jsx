// import { useState } from 'react';



// function App() {
//   // State
//   const [url, setUrl] = useState('');
//   const [selectedMethods, setSelectedMethods] = useState({
//     crawl4ai: false,
//     scrapy: false,
//     beautifulSoup: false,
//     crawl4aiFile: false,
//     firecrawl: false,
//   });
//   const [apiKey, setApiKey] = useState('');
//   const [results, setResults] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);


//   // For LOCAL DEV, point to your local FastAPI server:
//   // If your FastAPI runs on "http://127.0.0.1:8000", set it below:
//   const BASE_URL = 'http://127.0.0.1:8000';

//   const scrapingMethods = [
//     { id: 'crawl4ai', label: 'crawl4ai with AsyncWebCrawler' },
//     { id: 'scrapy', label: 'Scrapy (Full Web Crawling Framework)' },
//     { id: 'beautifulSoup', label: 'BeautifulSoup + Requests' },
//     { id: 'crawl4aiFile', label: 'crawl4ai + Saving to File' },
//     { id: 'firecrawl', label: 'Firecrawl', requiresApiKey: true },
//   ];

//   const handleMethodToggle = (methodId) => {
//     setSelectedMethods((prev) => ({
//       ...prev,
//       [methodId]: !prev[methodId],
//     }));
//   };

//   const handleScrape = async () => {
//     if (!url) {
//       setError('Please enter a URL');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       // 1) crawl4ai
//       if (selectedMethods.crawl4ai) {
//         const response = await fetch(`${BASE_URL}/api/crawl4ai`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, crawl4ai: data }));
//       }

//       // 2) scrapy
//       if (selectedMethods.scrapy) {
//         const response = await fetch(`${BASE_URL}/api/scrapy`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, scrapy: data }));
//       }

//       // 3) beautifulSoup
//       if (selectedMethods.beautifulSoup) {
//         const response = await fetch(`${BASE_URL}/api/beautifulSoup`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, beautifulSoup: data }));
//       }

//       // 4) crawl4aiFile
//       if (selectedMethods.crawl4aiFile) {
//         const response = await fetch(`${BASE_URL}/api/crawl4aiFile`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, crawl4aiFile: data }));
//       }

//       // 5) firecrawl
//       if (selectedMethods.firecrawl) {
//         const response = await fetch(`${BASE_URL}/api/firecrawl`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url, apiKey }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, firecrawl: data }));
//       }
//     } catch (err) {
//       console.error('Error details:', err);
//       setError('Failed to fetch results: ' + err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Clear only URL, results, and error (keep the checkboxes and API key)
//   const handleClear = () => {
//     setUrl('');
//     setResults({});
//     setError(null);
//     setIsLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-blue-600 mb-6">Local Web Scraper</h1>

//         {/* URL Input */}
//         <div className="mb-6">
//           <input
//             type="url"
//             placeholder="Enter URL to scrape"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Scraping Methods */}
//         <div className="mb-6">
//           <h2 className="text-lg font-medium mb-3">Select Scraping Methods</h2>
//           <div className="space-y-3">
//             {scrapingMethods.map((method) => (
//               <div key={method.id} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id={method.id}
//                   checked={selectedMethods[method.id]}
//                   onChange={() => handleMethodToggle(method.id)}
//                   className="mr-3"
//                 />
//                 <label htmlFor={method.id} className="text-gray-700">
//                   {method.label}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* API Key (for Firecrawl) */}
//         {selectedMethods.firecrawl && (
//           <div className="mb-6">
//             <input
//               type="password"
//               placeholder="Enter Firecrawl API Key"
//               value={apiKey}
//               onChange={(e) => setApiKey(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         )}

//         {/* Error Display */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
//             {error}
//           </div>
//         )}

//         {/* Action Buttons: Scrape & Clear */}
//         <div className="flex space-x-2">
//           <button
//             onClick={handleScrape}
//             disabled={isLoading || !Object.values(selectedMethods).some(Boolean)}
//             className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? 'Scraping...' : 'Start Scraping'}
//           </button>

//           <button
//             onClick={handleClear}
//             disabled={isLoading}
//             className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Clear
//           </button>
//         </div>

//         {/* Results Display */}
//         {Object.entries(results).map(([method, data]) => (
//           <div key={method} className="mt-6">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-lg font-medium">{method} Results</h3>
//               <button
//                 onClick={() => {
//                   const blob = new Blob(
//                     [JSON.stringify(data, null, 2)],
//                     { type: 'application/json' }
//                   );
//                   const url = window.URL.createObjectURL(blob);
//                   const a = document.createElement('a');
//                   a.href = url;
//                   a.download = `${method}-results.json`;
//                   document.body.appendChild(a);
//                   a.click();
//                   document.body.removeChild(a);
//                   window.URL.revokeObjectURL(url);
//                 }}
//                 className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
//               >
//                 Download
//               </button>
//             </div>
//             <div className="bg-gray-50 p-4 rounded-md max-h-48 overflow-auto">
//               <pre className="text-sm">
//                 {JSON.stringify(data, null, 2)}
//               </pre>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;







































// import { useState } from 'react';
// import LLMProcessor from './LLMProcessor';  // <-- Make sure this file exists

// function App() {
//   // State
//   const [url, setUrl] = useState('');
//   const [selectedMethods, setSelectedMethods] = useState({
//     crawl4ai: false,
//     scrapy: false,
//     beautifulSoup: false,
//     crawl4aiFile: false,
//     firecrawl: false,
//   });
//   const [apiKey, setApiKey] = useState('');
//   const [results, setResults] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // NEW: Toggle for LLM Processor
//   const [showProcessor, setShowProcessor] = useState(false);

//   // For LOCAL DEV, point to your local FastAPI server:
//   // If your FastAPI runs on "http://127.0.0.1:8000", set it below:
//   const BASE_URL = 'http://127.0.0.1:8000';

//   const scrapingMethods = [
//     { id: 'crawl4ai', label: 'crawl4ai with AsyncWebCrawler' },
//     { id: 'scrapy', label: 'Scrapy (Full Web Crawling Framework)' },
//     { id: 'beautifulSoup', label: 'BeautifulSoup + Requests' },
//     { id: 'crawl4aiFile', label: 'crawl4ai + Saving to File' },
//     { id: 'firecrawl', label: 'Firecrawl', requiresApiKey: true },
//   ];

//   const handleMethodToggle = (methodId) => {
//     setSelectedMethods((prev) => ({
//       ...prev,
//       [methodId]: !prev[methodId],
//     }));
//   };

//   const handleScrape = async () => {
//     if (!url) {
//       setError('Please enter a URL');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       // 1) crawl4ai
//       if (selectedMethods.crawl4ai) {
//         const response = await fetch(`${BASE_URL}/api/crawl4ai`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, crawl4ai: data }));
//       }

//       // 2) scrapy
//       if (selectedMethods.scrapy) {
//         const response = await fetch(`${BASE_URL}/api/scrapy`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, scrapy: data }));
//       }

//       // 3) beautifulSoup
//       if (selectedMethods.beautifulSoup) {
//         const response = await fetch(`${BASE_URL}/api/beautifulSoup`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, beautifulSoup: data }));
//       }

//       // 4) crawl4aiFile
//       if (selectedMethods.crawl4aiFile) {
//         const response = await fetch(`${BASE_URL}/api/crawl4aiFile`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, crawl4aiFile: data }));
//       }

//       // 5) firecrawl
//       if (selectedMethods.firecrawl) {
//         const response = await fetch(`${BASE_URL}/api/firecrawl`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url, apiKey }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, firecrawl: data }));
//       }
//     } catch (err) {
//       console.error('Error details:', err);
//       setError('Failed to fetch results: ' + err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Clear only URL, results, and error (keep the checkboxes and API key)
//   const handleClear = () => {
//     setUrl('');
//     setResults({});
//     setError(null);
//     setIsLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-blue-600 mb-6">Local Web Scraper</h1>

//         {/* URL Input */}
//         <div className="mb-6">
//           <input
//             type="url"
//             placeholder="Enter URL to scrape"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Scraping Methods */}
//         <div className="mb-6">
//           <h2 className="text-lg font-medium mb-3">Select Scraping Methods</h2>
//           <div className="space-y-3">
//             {scrapingMethods.map((method) => (
//               <div key={method.id} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id={method.id}
//                   checked={selectedMethods[method.id]}
//                   onChange={() => handleMethodToggle(method.id)}
//                   className="mr-3"
//                 />
//                 <label htmlFor={method.id} className="text-gray-700">
//                   {method.label}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* API Key (for Firecrawl) */}
//         {selectedMethods.firecrawl && (
//           <div className="mb-6">
//             <input
//               type="password"
//               placeholder="Enter Firecrawl API Key"
//               value={apiKey}
//               onChange={(e) => setApiKey(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         )}

//         {/* Error Display */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
//             {error}
//           </div>
//         )}

//         {/* Action Buttons: Scrape & Clear */}
//         <div className="flex space-x-2">
//           <button
//             onClick={handleScrape}
//             disabled={isLoading || !Object.values(selectedMethods).some(Boolean)}
//             className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? 'Scraping...' : 'Start Scraping'}
//           </button>

//           <button
//             onClick={handleClear}
//             disabled={isLoading}
//             className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Clear
//           </button>
//         </div>

//         {/* Results Display */}
//         {Object.entries(results).map(([method, data]) => (
//           <div key={method} className="mt-6">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-lg font-medium">{method} Results</h3>
//               <button
//                 onClick={() => {
//                   const blob = new Blob([JSON.stringify(data, null, 2)], {
//                     type: 'application/json',
//                   });
//                   const url = window.URL.createObjectURL(blob);
//                   const a = document.createElement('a');
//                   a.href = url;
//                   a.download = `${method}-results.json`;
//                   document.body.appendChild(a);
//                   a.click();
//                   document.body.removeChild(a);
//                   window.URL.revokeObjectURL(url);
//                 }}
//                 className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
//               >
//                 Download
//               </button>
//             </div>
//             <div className="bg-gray-50 p-4 rounded-md max-h-48 overflow-auto">
//               <pre className="text-sm">
//                 {JSON.stringify(data, null, 2)}
//               </pre>
//             </div>
//           </div>
//         ))}

//         {/* Toggle for LLM Processor */}
//         <div className="mt-8">
//           <button
//             onClick={() => setShowProcessor(!showProcessor)}
//             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//           >
//             {showProcessor ? 'Hide LLM Processor' : 'Show LLM Processor'}
//           </button>

//           {showProcessor && (
//             <div className="mt-4">
//               <LLMProcessor />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;



























// import { useState } from 'react';
// import TextAnalysis from './TextAnalysis';  // <-- new component



// /**
//  * The LLMProcessor component
//  * - Receives the llmApiKey (OpenAI key) and rawData from the parent.
//  * - Allows the user to modify the raw data, then call your backend's /api/llm-process endpoint.
//  */
// function LLMProcessor({ llmApiKey, rawData, setRawData, BASE_URL }) {
//   const [processedData, setProcessedData] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState(null);

//   const handleProcess = async () => {
//     setError(null);
//     setProcessedData(null);

//     if (!llmApiKey) {
//       setError('Please enter your LLM (OpenAI) API key at the top.');
//       return;
//     }
//     if (!rawData.trim()) {
//       setError('No data to process. Paste or copy some JSON first.');
//       return;
//     }

//     setIsProcessing(true);
//     try {
//       const response = await fetch(`${BASE_URL}/api/llm-process`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           apiKey: llmApiKey,
//           // userText: rawData,
//           rawData,          // matches the server's model exactly
//           model: 'gpt-4', // Hard-coded for now
//         }),
//       });
//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.detail || 'LLM processing error');
//       }
//       const data = await response.json();
//       setProcessedData(data.data);
//     } catch (err) {
//       console.error(err); // logs the full object
//       setError(err?.message || JSON.stringify(err));
//       setIsProcessing(false);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-xl font-bold text-green-700 mb-4">LLM Processor (GPT-4)</h2>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       <label className="block mb-2 font-medium text-gray-700">
//         Raw Data (JSON or text):
//       </label>
//       <textarea
//         rows={8}
//         className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//         value={rawData}
//         onChange={(e) => setRawData(e.target.value)}
//         placeholder="Paste or copy any JSON/text here..."
//       />

//       <button
//         onClick={handleProcess}
//         disabled={isProcessing}
//         className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isProcessing ? 'Processing...' : 'Process with GPT-4'}
//       </button>

//       {processedData && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Processed Output</h3>
//           <div className="bg-gray-50 p-4 rounded-md">
//             <pre className="text-sm break-words whitespace-pre-wrap">
//               {JSON.stringify(processedData, null, 2)}
//             </pre>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /**
//  * Main App component
//  * - Lets users enter a URL and choose from multiple scraping methods.
//  * - Provides two API key fields at the top (one for Firecrawl, one for GPT).
//  * - Displays scraped results, each with a "Copy to LLM" button.
//  * - Toggles the LLMProcessor section, which can process the JSON via GPT-4.
//  */
// function App() {
//   // Core states
//   const [url, setUrl] = useState('');
//   const [selectedMethods, setSelectedMethods] = useState({
//     crawl4ai: false,
//     scrapy: false,
//     beautifulSoup: false,
//     crawl4aiFile: false,
//     firecrawl: false,
//   });

//   // Assume you have some state that holds the final cleaned text from LLM
//   const [fullArticleText, setFullArticleText] = useState('');


//   // Two API keys at the top
//   const [firecrawlApiKey, setFirecrawlApiKey] = useState('');
//   const [llmApiKey, setLlmApiKey] = useState('');

//   // Storing scraped results
//   const [results, setResults] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // LLM processor UI states
//   const [showProcessor, setShowProcessor] = useState(false);
//   const [llmRawData, setLlmRawData] = useState('');

//   // For local dev
//   const BASE_URL = 'http://127.0.0.1:8000';

//   const scrapingMethods = [
//     { id: 'crawl4ai', label: 'crawl4ai with AsyncWebCrawler' },
//     { id: 'scrapy', label: 'Scrapy (Full Web Crawling Framework)' },
//     { id: 'beautifulSoup', label: 'BeautifulSoup + Requests' },
//     { id: 'crawl4aiFile', label: 'crawl4ai + Saving to File' },
//     { id: 'firecrawl', label: 'Firecrawl', requiresApiKey: true },
//   ];



  

//   const handleMethodToggle = (methodId) => {
//     setSelectedMethods((prev) => ({
//       ...prev,
//       [methodId]: !prev[methodId],
//     }));
//   };

//   // Main scraping function
//   const handleScrape = async () => {
//     if (!url.trim()) {
//       setError('Please enter a URL');
//       return;
//     }
//     setIsLoading(true);
//     setError(null);

//     try {
//       // 1) crawl4ai
//       if (selectedMethods.crawl4ai) {
//         const response = await fetch(`${BASE_URL}/api/crawl4ai`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, crawl4ai: data }));
//       }

//       // 2) scrapy
//       if (selectedMethods.scrapy) {
//         const response = await fetch(`${BASE_URL}/api/scrapy`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, scrapy: data }));
//       }

//       // 3) beautifulSoup
//       if (selectedMethods.beautifulSoup) {
//         const response = await fetch(`${BASE_URL}/api/beautifulSoup`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, beautifulSoup: data }));
//       }

//       // 4) crawl4aiFile
//       if (selectedMethods.crawl4aiFile) {
//         const response = await fetch(`${BASE_URL}/api/crawl4aiFile`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, crawl4aiFile: data }));
//       }

//       // 5) firecrawl
//       if (selectedMethods.firecrawl) {
//         // Use the top-level Firecrawl key
//         if (!firecrawlApiKey.trim()) {
//           throw new Error('Firecrawl requires an API key (see top).');
//         }
//         const response = await fetch(`${BASE_URL}/api/firecrawl`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url, apiKey: firecrawlApiKey }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, firecrawl: data }));
//       }

//     } catch (err) {
//       console.error('Error details:', err);
//       setError('Failed to fetch results: ' + err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Clear only URL, results, and error
//   const handleClear = () => {
//     setUrl('');
//     setResults({});
//     setError(null);
//     setIsLoading(false);
//     setLlmRawData('');
//   };

//   // Copy a given method's results into the LLM raw data
//   const handleCopyToLLM = (method) => {
//     if (!results[method]) return;
//     setLlmRawData(JSON.stringify(results[method], null, 2));
//     setShowProcessor(true); // auto-show the LLM processor
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-blue-600 mb-6">Web Scraper & LLM</h1>

//         {/* Section for BOTH API Keys at the top */}
//         <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">Firecrawl API Key:</label>
//             <input
//               type="password"
//               placeholder="Enter Firecrawl key..."
//               value={firecrawlApiKey}
//               onChange={(e) => setFirecrawlApiKey(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium text-gray-700">LLM (OpenAI) API Key:</label>
//             <input
//               type="password"
//               placeholder="Enter OpenAI key..."
//               value={llmApiKey}
//               onChange={(e) => setLlmApiKey(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//         </div>

//         {/* URL Input */}
//         <div className="mb-6">
//           <label className="block mb-1 font-medium text-gray-700">URL to Scrape:</label>
//           <input
//             type="url"
//             placeholder="https://example.com"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Scraping Methods */}
//         <div className="mb-6">
//           <h2 className="text-lg font-medium mb-3">Select Scraping Methods</h2>
//           <div className="space-y-3">
//             {scrapingMethods.map((method) => (
//               <div key={method.id} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id={method.id}
//                   checked={selectedMethods[method.id]}
//                   onChange={() => handleMethodToggle(method.id)}
//                   className="mr-3"
//                 />
//                 <label htmlFor={method.id} className="text-gray-700">
//                   {method.label}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
//             {error}
//           </div>
//         )}

//         {/* Action Buttons: Scrape & Clear */}
//         <div className="flex space-x-2 mb-6">
//           <button
//             onClick={handleScrape}
//             disabled={isLoading || !Object.values(selectedMethods).some(Boolean)}
//             className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? 'Scraping...' : 'Start Scraping'}
//           </button>

//           <button
//             onClick={handleClear}
//             disabled={isLoading}
//             className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Clear
//           </button>
//         </div>

//         {/* Results Display */}
//         {Object.entries(results).map(([method, data]) => (
//           <div key={method} className="mt-4">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-lg font-medium">{method} Results</h3>
//               <div className="space-x-2">
//                 {/* Download Button */}
//                 <button
//                   onClick={() => {
//                     const blob = new Blob(
//                       [JSON.stringify(data, null, 2)],
//                       { type: 'application/json' }
//                     );
//                     const url = window.URL.createObjectURL(blob);
//                     const a = document.createElement('a');
//                     a.href = url;
//                     a.download = `${method}-results.json`;
//                     document.body.appendChild(a);
//                     a.click();
//                     document.body.removeChild(a);
//                     window.URL.revokeObjectURL(url);
//                   }}
//                   className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
//                 >
//                   Download
//                 </button>

//                 {/* Copy to LLM Button */}
//                 <button
//                   onClick={() => handleCopyToLLM(method)}
//                   className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
//                 >
//                   Copy to LLM
//                 </button>
//               </div>
//             </div>
//             <div className="bg-gray-50 p-4 rounded-md max-h-48 overflow-auto">
//               <pre className="text-sm">
//                 {JSON.stringify(data, null, 2)}
//               </pre>
//             </div>
//           </div>
//         ))}

//         {/* LLM Processor Toggle */}
//         <div className="mt-8">
//           <button
//             onClick={() => setShowProcessor(!showProcessor)}
//             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//           >
//             {showProcessor ? 'Hide LLM Processor' : 'Show LLM Processor'}
//           </button>
//         </div>

//         {/* LLM Processor Section */}
//         {showProcessor && (
//           <LLMProcessor
//             llmApiKey={llmApiKey}
//             rawData={llmRawData}
//             setRawData={setLlmRawData}
//             BASE_URL={BASE_URL}
//           />
//         )}

//           <TextAnalysis
//                   BASE_URL={BASE_URL}
//                   cleanedText={fullArticleText}
//                 />


//       </div>
//     </div>
//   );
// }

// export default App;













// import { useState } from 'react';
// import LLMProcessor from './LLMProcessor';
// import TextAnalysis from './TextAnalysis';

// function App() {
//   // Project Name (new)
//   const [projectName, setProjectName] = useState('');

//   // Firecrawl + LLM API keys
//   const [firecrawlApiKey, setFirecrawlApiKey] = useState('');
//   const [llmApiKey, setLlmApiKey] = useState('');

//   // URL to scrape
//   const [url, setUrl] = useState('');

//   // Scraping method checkboxes
//   const [selectedMethods, setSelectedMethods] = useState({
//     crawl4ai: false,
//     scrapy: false,
//     beautifulSoup: false,
//     crawl4aiFile: false,
//     firecrawl: false,
//   });

//   // Storing results
//   const [results, setResults] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // LLM processor toggle
//   const [showProcessor, setShowProcessor] = useState(false);

//   // For local dev
//   const BASE_URL = 'http://127.0.0.1:8000';

//   const handleMethodToggle = (methodId) => {
//     setSelectedMethods((prev) => ({
//       ...prev,
//       [methodId]: !prev[methodId],
//     }));
//   };

//   const handleScrape = async () => {
//     if (!url) {
//       setError('Please enter a URL');
//       return;
//     }
//     setIsLoading(true);
//     setError(null);
//     setResults({});

//     try {
//       // 1) crawl4ai
//       if (selectedMethods.crawl4ai) {
//         const response = await fetch(`${BASE_URL}/api/crawl4ai`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url, projectName }),
//         });
//         if (!response.ok) {
//           const errData = await response.json();
//           throw new Error(errData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, crawl4ai: data }));
//       }

//       // 2) scrapy
//       if (selectedMethods.scrapy) {
//         const response = await fetch(`${BASE_URL}/api/scrapy`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url, projectName }),
//         });
//         if (!response.ok) {
//           const errData = await response.json();
//           throw new Error(errData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, scrapy: data }));
//       }

//       // 3) beautifulSoup
//       if (selectedMethods.beautifulSoup) {
//         const response = await fetch(`${BASE_URL}/api/beautifulSoup`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url, projectName }),
//         });
//         if (!response.ok) {
//           const errData = await response.json();
//           throw new Error(errorData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, beautifulSoup: data }));
//       }

//       // 4) crawl4aiFile
//       if (selectedMethods.crawl4aiFile) {
//         const response = await fetch(`${BASE_URL}/api/crawl4aiFile`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url, projectName }),
//         });
//         if (!response.ok) {
//           const errData = await response.json();
//           throw new Error(errData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, crawl4aiFile: data }));
//       }

//       // 5) firecrawl
//       if (selectedMethods.firecrawl) {
//         if (!firecrawlApiKey) {
//           throw new Error('Firecrawl requires an API key.');
//         }
//         const response = await fetch(`${BASE_URL}/api/firecrawl`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url, apiKey: firecrawlApiKey, projectName }),
//         });
//         if (!response.ok) {
//           const errData = await response.json();
//           throw new Error(errData.detail || 'Server error');
//         }
//         const data = await response.json();
//         setResults((prev) => ({ ...prev, firecrawl: data }));
//       }

//     } catch (err) {
//       console.error('Error details:', err);
//       setError('Failed to fetch results: ' + err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setUrl('');
//     setResults({});
//     setError(null);
//     setIsLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-blue-600 mb-6">Web Scraper & LLM</h1>

//         {/* Top row: Firecrawl + LLM keys */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">Firecrawl API Key:</label>
//             <input
//               type="password"
//               placeholder="Enter Firecrawl key..."
//               value={firecrawlApiKey}
//               onChange={(e) => setFirecrawlApiKey(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium text-gray-700">LLM (OpenAI) API Key:</label>
//             <input
//               type="password"
//               placeholder="Enter OpenAI key..."
//               value={llmApiKey}
//               onChange={(e) => setLlmApiKey(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         {/* Project Name */}
//         <div className="mb-6">
//           <label className="block mb-1 font-medium text-gray-700">Project Name (optional):</label>
//           <input
//             type="text"
//             placeholder="e.g. MyProject1"
//             value={projectName}
//             onChange={(e) => setProjectName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* URL Input */}
//         <div className="mb-6">
//           <label className="block mb-1 font-medium text-gray-700">URL to Scrape:</label>
//           <input
//             type="url"
//             placeholder="https://example.com"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Scraping Methods */}
//         <div className="mb-6">
//           <h2 className="text-lg font-medium mb-3">Select Scraping Methods</h2>
//           <div className="space-y-3">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="crawl4ai"
//                 checked={selectedMethods.crawl4ai}
//                 onChange={() => handleMethodToggle('crawl4ai')}
//                 className="mr-3"
//               />
//               <label htmlFor="crawl4ai" className="text-gray-700">
//                 crawl4ai with AsyncWebCrawler
//               </label>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="scrapy"
//                 checked={selectedMethods.scrapy}
//                 onChange={() => handleMethodToggle('scrapy')}
//                 className="mr-3"
//               />
//               <label htmlFor="scrapy" className="text-gray-700">
//                 Scrapy (Full Web Crawling Framework)
//               </label>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="beautifulSoup"
//                 checked={selectedMethods.beautifulSoup}
//                 onChange={() => handleMethodToggle('beautifulSoup')}
//                 className="mr-3"
//               />
//               <label htmlFor="beautifulSoup" className="text-gray-700">
//                 BeautifulSoup + Requests
//               </label>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="crawl4aiFile"
//                 checked={selectedMethods.crawl4aiFile}
//                 onChange={() => handleMethodToggle('crawl4aiFile')}
//                 className="mr-3"
//               />
//               <label htmlFor="crawl4aiFile" className="text-gray-700">
//                 crawl4ai + Saving to File
//               </label>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="firecrawl"
//                 checked={selectedMethods.firecrawl}
//                 onChange={() => handleMethodToggle('firecrawl')}
//                 className="mr-3"
//               />
//               <label htmlFor="firecrawl" className="text-gray-700">
//                 Firecrawl
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
//             {error}
//           </div>
//         )}

//         {/* Scrape + Clear Buttons */}
//         <div className="flex space-x-2 mb-6">
//           <button
//             onClick={handleScrape}
//             disabled={isLoading || !Object.values(selectedMethods).some(Boolean)}
//             className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
//                        hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? 'Scraping...' : 'Start Scraping'}
//           </button>

//           <button
//             onClick={handleClear}
//             disabled={isLoading}
//             className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md 
//                        hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Clear
//           </button>
//         </div>

//         {/* Toggle LLM Processor */}
//         <button
//           onClick={() => setShowProcessor(!showProcessor)}
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//         >
//           {showProcessor ? 'Hide LLM Processor' : 'Show LLM Processor'}
//         </button>

//         {showProcessor && (
//           <div className="mt-4">
//             <LLMProcessor
//               llmApiKey={llmApiKey}
//               // rawData can come from one of the scrape results if you want
//               BASE_URL={BASE_URL}
//               projectName={projectName}
//             />
//           </div>
//         )}

//         {/* Results of scraping if you want to show them, optional */}
//         {/* For instance: */}
//         {/* Object.entries(results).map(...) */}
//       </div>

//       {/* Next section: Text Analysis */}
//       <TextAnalysis BASE_URL={BASE_URL} cleanedText="" />
//       {/* Pass some text in `cleanedText` if you want. */}
//     </div>
//   );
// }

// export default App;































// import { useState } from 'react';
// import LLMProcessor from './LLMProcessor';
// import TextAnalysis from './TextAnalysis';

// function App() {
//   const [projectName, setProjectName] = useState('');
//   const [firecrawlApiKey, setFirecrawlApiKey] = useState('');
//   const [llmApiKey, setLlmApiKey] = useState('');
//   const [url, setUrl] = useState('');

//   const [selectedMethods, setSelectedMethods] = useState({
//     crawl4ai: false,
//     scrapy: false,
//     beautifulSoup: false,
//     crawl4aiFile: false,
//     firecrawl: false,
//   });

//   const [results, setResults] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [showProcessor, setShowProcessor] = useState(false);
//   const [llmRawData, setLlmRawData] = useState('');

//   const BASE_URL = 'http://127.0.0.1:8000';

//   const handleMethodToggle = (methodId) => {
//     setSelectedMethods((prev) => ({
//       ...prev,
//       [methodId]: !prev[methodId],
//     }));
//   };

//   const handleScrape = async () => {
//     if (!url) {
//       setError('Please enter a URL');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setResults({});

//     try {
//       // 1) crawl4ai
//       if (selectedMethods.crawl4ai) {
//         const resp = await fetch(`${BASE_URL}/api/crawl4ai`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url, projectName }),
//         });
//         if (!resp.ok) {
//           const errData = await resp.json();
//           throw new Error(errData.detail || 'Server error');
//         }
//         const data = await resp.json();
//         setResults((prev) => ({ ...prev, crawl4ai: data }));
//       }

//       // 2) scrapy
//       if (selectedMethods.scrapy) {
//         const resp = await fetch(`${BASE_URL}/api/scrapy`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url, projectName }),
//         });
//         if (!resp.ok) {
//           const errData = await resp.json();
//           throw new Error(errData.detail || 'Server error');
//         }
//         const data = await resp.json();
//         setResults((prev) => ({ ...prev, scrapy: data }));
//       }

//       // 3) beautifulSoup
//       if (selectedMethods.beautifulSoup) {
//         const resp = await fetch(`${BASE_URL}/api/beautifulSoup`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url, projectName }),
//         });
//         if (!resp.ok) {
//           const errData = await resp.json();
//           throw new Error(errData.detail || 'Server error');
//         }
//         const data = await resp.json();
//         setResults((prev) => ({ ...prev, beautifulSoup: data }));
//       }

//       // 4) crawl4aiFile
//       if (selectedMethods.crawl4aiFile) {
//         const resp = await fetch(`${BASE_URL}/api/crawl4aiFile`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url, projectName }),
//         });
//         if (!resp.ok) {
//           const errData = await resp.json();
//           throw new Error(errData.detail || 'Server error');
//         }
//         const data = await resp.json();
//         setResults((prev) => ({ ...prev, crawl4aiFile: data }));
//       }

//       // 5) firecrawl
//       if (selectedMethods.firecrawl) {
//         if (!firecrawlApiKey.trim()) {
//           throw new Error('Firecrawl requires an API key.');
//         }
//         const resp = await fetch(`${BASE_URL}/api/firecrawl`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url, apiKey: firecrawlApiKey, projectName }),
//         });
//         if (!resp.ok) {
//           const errData = await resp.json();
//           throw new Error(errData.detail || 'Server error');
//         }
//         const data = await resp.json();
//         setResults((prev) => ({ ...prev, firecrawl: data }));
//       }

//     } catch (err) {
//       console.error('Error details:', err);
//       setError('Failed to fetch results: ' + err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setUrl('');
//     setResults({});
//     setError(null);
//     setIsLoading(false);
//     setLlmRawData('');
//   };

//   const handleCopyToLLM = (method) => {
//     if (!results[method]) return;
//     // Typically, data is at results[method].data
//     const fullData = results[method]?.data;
//     setLlmRawData(JSON.stringify(fullData, null, 2));
//     setShowProcessor(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-blue-600 mb-6">Web Scraper & LLM</h1>

//         {/* Row for Firecrawl + LLM keys */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">Firecrawl API Key:</label>
//             <input
//               type="password"
//               placeholder="Enter Firecrawl key..."
//               value={firecrawlApiKey}
//               onChange={(e) => setFirecrawlApiKey(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium text-gray-700">LLM (OpenAI) API Key:</label>
//             <input
//               type="password"
//               placeholder="Enter OpenAI key..."
//               value={llmApiKey}
//               onChange={(e) => setLlmApiKey(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         {/* Project Name */}
//         <div className="mb-6">
//           <label className="block mb-1 font-medium text-gray-700">Project Name (optional):</label>
//           <input
//             type="text"
//             placeholder="e.g. MyProject1"
//             value={projectName}
//             onChange={(e) => setProjectName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* URL Input */}
//         <div className="mb-6">
//           <label className="block mb-1 font-medium text-gray-700">URL to Scrape:</label>
//           <input
//             type="url"
//             placeholder="https://example.com"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Scraping Methods */}
//         <div className="mb-6">
//           <h2 className="text-lg font-medium mb-3">Select Scraping Methods</h2>
//           <div className="space-y-3">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="crawl4ai"
//                 checked={selectedMethods.crawl4ai}
//                 onChange={() => handleMethodToggle('crawl4ai')}
//                 className="mr-3"
//               />
//               <label htmlFor="crawl4ai" className="text-gray-700">
//                 crawl4ai with AsyncWebCrawler
//               </label>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="scrapy"
//                 checked={selectedMethods.scrapy}
//                 onChange={() => handleMethodToggle('scrapy')}
//                 className="mr-3"
//               />
//               <label htmlFor="scrapy" className="text-gray-700">
//                 Scrapy (Full Web Crawling Framework)
//               </label>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="beautifulSoup"
//                 checked={selectedMethods.beautifulSoup}
//                 onChange={() => handleMethodToggle('beautifulSoup')}
//                 className="mr-3"
//               />
//               <label htmlFor="beautifulSoup" className="text-gray-700">
//                 BeautifulSoup + Requests
//               </label>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="crawl4aiFile"
//                 checked={selectedMethods.crawl4aiFile}
//                 onChange={() => handleMethodToggle('crawl4aiFile')}
//                 className="mr-3"
//               />
//               <label htmlFor="crawl4aiFile" className="text-gray-700">
//                 crawl4ai + Saving to File
//               </label>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="firecrawl"
//                 checked={selectedMethods.firecrawl}
//                 onChange={() => handleMethodToggle('firecrawl')}
//                 className="mr-3"
//               />
//               <label htmlFor="firecrawl" className="text-gray-700">
//                 Firecrawl
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
//             {error}
//           </div>
//         )}

//         {/* Scrape + Clear Buttons */}
//         <div className="flex space-x-2 mb-6">
//           <button
//             onClick={handleScrape}
//             disabled={isLoading || !Object.values(selectedMethods).some(Boolean)}
//             className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
//                        hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? 'Scraping...' : 'Start Scraping'}
//           </button>

//           <button
//             onClick={handleClear}
//             disabled={isLoading}
//             className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md 
//                        hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Clear
//           </button>
//         </div>

//         {/* Results Display */}
//         {Object.entries(results).map(([method, dataObj]) => (
//           <div key={method} className="mt-6">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-lg font-medium capitalize">{method} Results</h3>
//               <div className="space-x-2">
//                 {/* Download Button */}
//                 <button
//                   onClick={() => {
//                     const blob = new Blob(
//                       [JSON.stringify(dataObj, null, 2)],
//                       { type: 'application/json' }
//                     );
//                     const url = window.URL.createObjectURL(blob);
//                     const a = document.createElement('a');
//                     a.href = url;
//                     a.download = `${method}-results.json`;
//                     document.body.appendChild(a);
//                     a.click();
//                     document.body.removeChild(a);
//                     window.URL.revokeObjectURL(url);
//                   }}
//                   className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
//                 >
//                   Download
//                 </button>

//                 {/* Copy to LLM */}
//                 <button
//                   onClick={() => {
//                     // data is at dataObj.data typically
//                     const fullData = dataObj.data;
//                     setLlmRawData(JSON.stringify(fullData, null, 2));
//                     setShowProcessor(true);
//                   }}
//                   className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
//                 >
//                   Copy to LLM
//                 </button>
//               </div>
//             </div>
//             <div className="bg-gray-50 p-4 rounded-md max-h-48 overflow-auto">
//               <pre className="text-sm">
//                 {JSON.stringify(dataObj, null, 2)}
//               </pre>
//             </div>
//           </div>
//         ))}

//         {/* Toggle LLM Processor */}
//         <div className="mt-6">
//           <button
//             onClick={() => setShowProcessor(!showProcessor)}
//             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//           >
//             {showProcessor ? 'Hide LLM Processor' : 'Show LLM Processor'}
//           </button>
//         </div>

//         {showProcessor && (
//           <div className="mt-4">
//             <LLMProcessor
//               llmApiKey={llmApiKey}
//               BASE_URL={BASE_URL}
//               projectName={projectName}
//               defaultRaw={llmRawData}
//             />
//           </div>
//         )}
//       </div>

//       {/* Text Analysis in same max-w-4xl for alignment */}
//       <div className="max-w-4xl mx-auto mt-8">
//         <TextAnalysis 
//           BASE_URL={BASE_URL} 
//           cleanedText="" 
//           projectName={projectName} 
//         />
//       </div>
//     </div>
//   );
// }

// export default App;
































import { useState } from 'react';
import LLMProcessor from './LLMProcessor';
import TextAnalysis from './TextAnalysis';

function App() {
  const [projectName, setProjectName] = useState('');
  const [firecrawlApiKey, setFirecrawlApiKey] = useState('');
  const [llmApiKey, setLlmApiKey] = useState('');
  const [url, setUrl] = useState('');

  const [selectedMethods, setSelectedMethods] = useState({
    crawl4ai: false,
    scrapy: false,
    beautifulSoup: false,
    crawl4aiFile: false,
    firecrawl: false,
  });

  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showProcessor, setShowProcessor] = useState(false);
  const [llmRawData, setLlmRawData] = useState('');

  const BASE_URL = 'http://127.0.0.1:8000';

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
    setResults({});

    try {
      // 1) crawl4ai
      if (selectedMethods.crawl4ai) {
        const resp = await fetch(`${BASE_URL}/api/crawl4ai`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, projectName }),
        });
        if (!resp.ok) {
          const errData = await resp.json();
          throw new Error(errData.detail || 'Server error');
        }
        const data = await resp.json();
        setResults((prev) => ({ ...prev, crawl4ai: data }));
      }

      // 2) scrapy
      if (selectedMethods.scrapy) {
        const resp = await fetch(`${BASE_URL}/api/scrapy`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, projectName }),
        });
        if (!resp.ok) {
          const errData = await resp.json();
          throw new Error(errData.detail || 'Server error');
        }
        const data = await resp.json();
        setResults((prev) => ({ ...prev, scrapy: data }));
      }

      // 3) beautifulSoup
      if (selectedMethods.beautifulSoup) {
        const resp = await fetch(`${BASE_URL}/api/beautifulSoup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, projectName }),
        });
        if (!resp.ok) {
          const errData = await resp.json();
          throw new Error(errData.detail || 'Server error');
        }
        const data = await resp.json();
        setResults((prev) => ({ ...prev, beautifulSoup: data }));
      }

      // 4) crawl4aiFile
      if (selectedMethods.crawl4aiFile) {
        const resp = await fetch(`${BASE_URL}/api/crawl4aiFile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, projectName }),
        });
        if (!resp.ok) {
          const errData = await resp.json();
          throw new Error(errData.detail || 'Server error');
        }
        const data = await resp.json();
        setResults((prev) => ({ ...prev, crawl4aiFile: data }));
      }

      // 5) firecrawl
      if (selectedMethods.firecrawl) {
        if (!firecrawlApiKey.trim()) {
          throw new Error('Firecrawl requires an API key.');
        }
        const resp = await fetch(`${BASE_URL}/api/firecrawl`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, apiKey: firecrawlApiKey, projectName }),
        });
        if (!resp.ok) {
          const errData = await resp.json();
          throw new Error(errData.detail || 'Server error');
        }
        const data = await resp.json();
        setResults((prev) => ({ ...prev, firecrawl: data }));
      }

    } catch (err) {
      console.error('Error details:', err);
      setError('Failed to fetch results: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setUrl('');
    setResults({});
    setError(null);
    setIsLoading(false);
    setLlmRawData('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Web Scraper & LLM</h1>

        {/* Row for Firecrawl + LLM keys */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Firecrawl API Key:</label>
            <input
              type="password"
              placeholder="Enter Firecrawl key..."
              value={firecrawlApiKey}
              onChange={(e) => setFirecrawlApiKey(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">LLM (OpenAI) API Key:</label>
            <input
              type="password"
              placeholder="Enter OpenAI key..."
              value={llmApiKey}
              onChange={(e) => setLlmApiKey(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Project Name */}
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Project Name (optional):</label>
          <input
            type="text"
            placeholder="e.g. MyProject1"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* URL Input */}
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">URL to Scrape:</label>
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Scraping Methods */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Select Scraping Methods</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="crawl4ai"
                checked={selectedMethods.crawl4ai}
                onChange={() => handleMethodToggle('crawl4ai')}
                className="mr-3"
              />
              <label htmlFor="crawl4ai" className="text-gray-700">
                crawl4ai with AsyncWebCrawler
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="scrapy"
                checked={selectedMethods.scrapy}
                onChange={() => handleMethodToggle('scrapy')}
                className="mr-3"
              />
              <label htmlFor="scrapy" className="text-gray-700">
                Scrapy (Full Web Crawling Framework)
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="beautifulSoup"
                checked={selectedMethods.beautifulSoup}
                onChange={() => handleMethodToggle('beautifulSoup')}
                className="mr-3"
              />
              <label htmlFor="beautifulSoup" className="text-gray-700">
                BeautifulSoup + Requests
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="crawl4aiFile"
                checked={selectedMethods.crawl4aiFile}
                onChange={() => handleMethodToggle('crawl4aiFile')}
                className="mr-3"
              />
              <label htmlFor="crawl4aiFile" className="text-gray-700">
                crawl4ai + Saving to File
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="firecrawl"
                checked={selectedMethods.firecrawl}
                onChange={() => handleMethodToggle('firecrawl')}
                className="mr-3"
              />
              <label htmlFor="firecrawl" className="text-gray-700">
                Firecrawl
              </label>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        {/* Scrape + Clear Buttons */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={handleScrape}
            disabled={isLoading || !Object.values(selectedMethods).some(Boolean)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                       hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Scraping...' : 'Start Scraping'}
          </button>

          <button
            onClick={handleClear}
            disabled={isLoading}
            className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md 
                       hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>

        {/* Show results for each scraper */}
        {Object.entries(results).map(([method, dataObj]) => (
          <div key={method} className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium capitalize">{method} Results</h3>
              <div className="space-x-2">
                {/* Download Button */}
                <button
                  onClick={() => {
                    const blob = new Blob(
                      [JSON.stringify(dataObj, null, 2)],
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

                {/* Copy to LLM */}
                <button
                  onClick={() => {
                    const fullData = dataObj.data;
                    setLlmRawData(JSON.stringify(fullData, null, 2));
                    setShowProcessor(true);
                  }}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                >
                  Copy to LLM
                </button>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md max-h-48 overflow-auto">
              <pre className="text-sm">
                {JSON.stringify(dataObj, null, 2)}
              </pre>
            </div>
          </div>
        ))}

        {/* Toggle LLM Processor */}
        <div className="mt-6">
          <button
            onClick={() => setShowProcessor(!showProcessor)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {showProcessor ? 'Hide LLM Processor' : 'Show LLM Processor'}
          </button>
        </div>

        {showProcessor && (
          <div className="mt-4">
            <LLMProcessor
              llmApiKey={llmApiKey}
              BASE_URL={BASE_URL}
              projectName={projectName}
              defaultRaw={llmRawData}
            />
          </div>
        )}
      </div>

      {/* Text Analysis in same max-w-4xl container */}
      <div className="max-w-4xl mx-auto mt-8">
        <TextAnalysis 
          BASE_URL={BASE_URL} 
          cleanedText="" 
          projectName={projectName} 
        />
      </div>
    </div>
  );
}

export default App;







































