// // src/LLMProcessor.jsx

// import { useState } from 'react';

// function LLMProcessor() {
//   const [apiKey, setApiKey] = useState('');      // user enters their ChatGPT key
//   const [rawData, setRawData] = useState('');    // user pastes raw JSON or text
//   const [processedData, setProcessedData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Change this to your local or deployed backend URL
//   const BASE_URL = 'http://127.0.0.1:8000';

//   const handleSubmit = async () => {
//     // Basic validation
//     if (!apiKey || !rawData) {
//       setError('Please provide both an API key and some data');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setProcessedData(null);

//     try {
//       const response = await fetch(`${BASE_URL}/api/llm-process`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           apiKey,
//           rawData,      // the user’s raw JSON / text
//           model: 'gpt-4' // for now, let’s default to GPT-4
//         }),
//       });

//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.detail || 'LLM processing error');
//       }

//       const data = await response.json();
//       setProcessedData(data.data); // "data" field from our backend response
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//       <h2>LLM Processing (GPT-4)</h2>

//       {error && (
//         <div style={{ color: 'red', marginBottom: '1rem' }}>
//           Error: {error}
//         </div>
//       )}

//       <label>
//         OpenAI API Key:
//         <input
//           type="password"
//           placeholder="sk-..."
//           value={apiKey}
//           onChange={(e) => setApiKey(e.target.value)}
//           style={{ display: 'block', width: '100%', margin: '0.5rem 0' }}
//         />
//       </label>

//       <label>
//         Raw Data (JSON or text):
//         <textarea
//           placeholder="Paste raw JSON or text..."
//           value={rawData}
//           onChange={(e) => setRawData(e.target.value)}
//           rows={8}
//           style={{ width: '100%', margin: '0.5rem 0' }}
//         />
//       </label>

//       <button
//         onClick={handleSubmit}
//         disabled={isLoading}
//         style={{ marginRight: '1rem' }}
//       >
//         {isLoading ? 'Processing...' : 'Process with GPT-4'}
//       </button>

//       {processedData && (
//         <div style={{ marginTop: '1rem' }}>
//           <h3>Processed Output</h3>
//           <pre style={{ background: '#f9f9f9', padding: '1rem' }}>
//             {JSON.stringify(processedData, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LLMProcessor;
















// import { useState } from 'react';

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
//           rawData,  // changed from userText
//           model: 'gpt-4',
//         }),
//       });
//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.detail || 'LLM processing error');
//       }
//       const data = await response.json();
//       setProcessedData(data.data);
//     } catch (err) {
//       console.error(err);
//       setError(err.message || JSON.stringify(err));
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // New: copy to clipboard
//   const handleCopy = () => {
//     if (!processedData) return;
//     navigator.clipboard.writeText(JSON.stringify(processedData, null, 2))
//       .catch(err => {
//         console.error('Failed to copy:', err);
//         setError('Failed to copy to clipboard');
//       });
//   };

//   // New: download as JSON
//   const handleDownload = () => {
//     if (!processedData) return;
//     const blob = new Blob([JSON.stringify(processedData, null, 2)], { type: 'application/json' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `llm-processed.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
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
//           <div className="flex space-x-2 mb-2">
//             <button
//               onClick={handleCopy}
//               className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
//             >
//               Copy
//             </button>
//             <button
//               onClick={handleDownload}
//               className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
//             >
//               Download
//             </button>
//           </div>

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

// export default LLMProcessor;















// import { useState } from 'react';

// function LLMProcessor({ llmApiKey, BASE_URL, projectName }) {
//   const [rawData, setRawData] = useState('');
//   const [processedData, setProcessedData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleProcess = async () => {
//     if (!llmApiKey) {
//       setError('No LLM API key provided.');
//       return;
//     }
//     if (!rawData.trim()) {
//       setError('No data to process. Paste or copy some JSON/text first.');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setProcessedData(null);

//     try {
//       const response = await fetch(`${BASE_URL}/api/llm-process`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           apiKey: llmApiKey,
//           rawData,
//           model: 'gpt-4',
//           projectName,  // pass the project name
//         }),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'LLM processing error');
//       }
//       const data = await response.json();
//       setProcessedData(data.data);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded-xl shadow-lg">
//       <h2 className="text-xl font-bold text-green-700 mb-4">LLM Processor</h2>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       <label className="block mb-2 font-medium text-gray-700">
//         Raw Data (JSON or text):
//       </label>
//       <textarea
//         rows={6}
//         className="w-full p-2 border border-gray-300 rounded-md 
//                    focus:outline-none focus:ring-2 focus:ring-green-500"
//         value={rawData}
//         onChange={(e) => setRawData(e.target.value)}
//         placeholder="Paste or copy text to clean..."
//       />

//       <button
//         onClick={handleProcess}
//         disabled={isLoading}
//         className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md 
//                    hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? 'Processing...' : 'Process with GPT-4'}
//       </button>

//       {processedData && (
//         <div className="mt-4 bg-gray-50 p-3 rounded-md">
//           <h3 className="text-lg font-semibold mb-2">Processed Output</h3>
//           <pre className="text-sm whitespace-pre-wrap break-words">
//             {JSON.stringify(processedData, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LLMProcessor;


























// import { useState, useEffect } from 'react';

// function LLMProcessor({ llmApiKey, BASE_URL, projectName, defaultRaw = '' }) {
//   const [rawData, setRawData] = useState('');

//   const [processedData, setProcessedData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setRawData(defaultRaw);
//   }, [defaultRaw]);

//   const handleProcess = async () => {
//     if (!llmApiKey) {
//       setError('No LLM API key provided.');
//       return;
//     }
//     if (!rawData.trim()) {
//       setError('No data to process.');
//       return;
//     }
//     setIsLoading(true);
//     setError(null);
//     setProcessedData(null);

//     try {
//       const resp = await fetch(`${BASE_URL}/api/llm-process`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           apiKey: llmApiKey,
//           rawData,
//           model: 'gpt-4',
//           projectName
//         }),
//       });
//       if (!resp.ok) {
//         const errData = await resp.json();
//         throw new Error(errData.detail || 'LLM processing error');
//       }
//       const data = await resp.json();
//       setProcessedData(data.data);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded-xl shadow-lg">
//       <h2 className="text-xl font-bold text-green-700 mb-4">LLM Processor</h2>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       <label className="block mb-2 font-medium text-gray-700">
//         Raw Data (JSON or text):
//       </label>
//       <textarea
//         rows={6}
//         className="w-full p-2 border border-gray-300 rounded-md 
//                    focus:outline-none focus:ring-2 focus:ring-green-500"
//         value={rawData}
//         onChange={(e) => setRawData(e.target.value)}
//       />

//       <button
//         onClick={handleProcess}
//         disabled={isLoading}
//         className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md 
//                    hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? 'Processing...' : 'Process with GPT-4'}
//       </button>

//       {processedData && (
//         <div className="mt-4 bg-gray-50 p-3 rounded-md">
//           <h3 className="text-lg font-semibold mb-2">Processed Output</h3>
//           <pre className="text-sm whitespace-pre-wrap break-words">
//             {JSON.stringify(processedData, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LLMProcessor;













import { useState, useEffect } from 'react';

function LLMProcessor({ llmApiKey, BASE_URL, projectName, defaultRaw = '' }) {
  const [rawData, setRawData] = useState('');
  const [processedData, setProcessedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setRawData(defaultRaw);
  }, [defaultRaw]);

  const handleProcess = async () => {
    if (!llmApiKey) {
      setError('No LLM API key provided.');
      return;
    }
    if (!rawData.trim()) {
      setError('No data to process.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setProcessedData(null);

    try {
      const resp = await fetch(`${BASE_URL}/api/llm-process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: llmApiKey,
          rawData,
          model: 'gpt-4',
          projectName
        }),
      });
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.detail || 'LLM processing error');
      }
      const data = await resp.json();
      setProcessedData(data.data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-green-700 mb-4">LLM Processor</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <label className="block mb-2 font-medium text-gray-700">
        Raw Data (JSON or text):
      </label>
      <textarea
        rows={6}
        className="w-full p-2 border border-gray-300 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-green-500"
        value={rawData}
        onChange={(e) => setRawData(e.target.value)}
      />

      <button
        onClick={handleProcess}
        disabled={isLoading}
        className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md 
                   hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : 'Process with GPT-4'}
      </button>

      {processedData && (
        <div className="mt-4 bg-gray-50 p-3 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Processed Output</h3>
          <pre className="text-sm whitespace-pre-wrap break-words">
            {JSON.stringify(processedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default LLMProcessor;






















