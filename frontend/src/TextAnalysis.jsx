// // src/TextAnalysis.jsx

// import { useState } from 'react';

// function TextAnalysis({ BASE_URL, cleanedText }) {
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // This function calls the Python endpoint /api/analyse-text
//   const handleAnalyze = async () => {
//     if (!cleanedText.trim()) {
//       setError('No text provided. Please paste or select some text first.');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setAnalysisResult(null);

//     try {
//       const response = await fetch(`${BASE_URL}/api/analyse-text`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: cleanedText }),
//       });
//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.detail || 'Analysis error');
//       }
//       const data = await response.json();
//       setAnalysisResult(data.data);
//     } catch (err) {
//       console.error(err);
//       setError(err.message || JSON.stringify(err));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-xl font-bold text-indigo-700 mb-4">Text Analysis</h2>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       <div className="mb-4">
//         <label className="block mb-2 font-medium text-gray-700">
//           Text to Analyze:
//         </label>
//         <textarea
//           rows={8}
//           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           value={cleanedText}
//           onChange={(e) => setCleanedText(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={handleAnalyze}
//         disabled={isLoading}
//         className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? 'Analyzing...' : 'Analyze Text'}
//       </button>

//       {analysisResult && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Analysis Result</h3>
//           <div className="bg-gray-50 p-4 rounded-md">
//             <pre className="text-sm break-words whitespace-pre-wrap">
//               {JSON.stringify(analysisResult, null, 2)}
//             </pre>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TextAnalysis;























// // src/TextAnalysis.jsx

// import { useState, useEffect } from 'react';

// function TextAnalysis({ BASE_URL, cleanedText }) {
//   const [analysisText, setAnalysisText] = useState('');
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // On component mount (or whenever cleanedText changes), 
//   // initialise our local analysisText to cleanedText
//   useEffect(() => {
//     setAnalysisText(cleanedText);
//   }, [cleanedText]);

//   // This function calls the Python endpoint /api/analyse-text
//   const handleAnalyze = async () => {
//     if (!analysisText.trim()) {
//       setError('No text provided. Please paste or select some text first.');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setAnalysisResult(null);

//     try {
//       const response = await fetch(`${BASE_URL}/api/analyse-text`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: analysisText }),
//       });
//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.detail || 'Analysis error');
//       }
//       const data = await response.json();
//       setAnalysisResult(data.data);
//     } catch (err) {
//       console.error(err);
//       setError(err.message || JSON.stringify(err));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-xl font-bold text-indigo-700 mb-4">Text Analysis</h2>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       <div className="mb-4">
//         <label className="block mb-2 font-medium text-gray-700">
//           Text to Analyze:
//         </label>
//         <textarea
//           rows={8}
//           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           value={analysisText}
//           onChange={(e) => setAnalysisText(e.target.value)}
//           placeholder="Paste or edit the text here..."
//         />
//       </div>

//       <button
//         onClick={handleAnalyze}
//         disabled={isLoading}
//         className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? 'Analyzing...' : 'Analyze Text'}
//       </button>

//       {analysisResult && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Analysis Result</h3>
//           <div className="bg-gray-50 p-4 rounded-md">
//             <pre className="text-sm break-words whitespace-pre-wrap">
//               {JSON.stringify(analysisResult, null, 2)}
//             </pre>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TextAnalysis;

































// import { useState, useEffect } from 'react';
// import WordCloud from 'react-d3-cloud';

// function TextAnalysis({ BASE_URL, cleanedText }) {
//   const [analysisText, setAnalysisText] = useState('');
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Collapsible toggles
//   const [showWords, setShowWords] = useState(false);
//   const [showBigrams, setShowBigrams] = useState(false);
//   const [showTrigrams, setShowTrigrams] = useState(false);
//   const [showCloud, setShowCloud] = useState(false);

//   // On mount or when cleanedText changes, load it into local state
//   useEffect(() => {
//     setAnalysisText(cleanedText);
//   }, [cleanedText]);

//   const handleAnalyze = async () => {
//     if (!analysisText.trim()) {
//       setError('No text provided. Please paste or select some text first.');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setAnalysisResult(null);

//     try {
//       const response = await fetch(`${BASE_URL}/api/analyse-text`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: analysisText }),
//       });
//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.detail || 'Analysis error');
//       }
//       const data = await response.json();
//       setAnalysisResult(data.data); // topWords, topBigrams, topTrigrams
//     } catch (err) {
//       console.error(err);
//       setError(err.message || JSON.stringify(err));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Build word cloud data from topWords once we have analysisResult
//   // The library wants an array of {text: string, value: number}
//   let wordCloudData = [];
//   if (analysisResult?.topWords) {
//     wordCloudData = analysisResult.topWords.map(([word, count]) => ({
//       text: word,
//       value: count,
//     }));
//   }

//   const fontSizeMapper = (word) => Math.log2(word.value) * 10;
//   const rotate = 0; // keep all words horizontal

//   return (
//     <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-xl font-bold text-indigo-700 mb-4">Text Analysis</h2>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       <div className="mb-4">
//         <label className="block mb-2 font-medium text-gray-700">
//           Text to Analyze:
//         </label>
//         <textarea
//           rows={8}
//           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           value={analysisText}
//           onChange={(e) => setAnalysisText(e.target.value)}
//           placeholder="Paste or edit the text here..."
//         />
//       </div>

//       <button
//         onClick={handleAnalyze}
//         disabled={isLoading}
//         className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? 'Analyzing...' : 'Analyze Text'}
//       </button>

//       {/* Results */}
//       {analysisResult && (
//         <div className="mt-6 space-y-4">
//           {/* Collapsible: Top Words */}
//           <div>
//             <button
//               onClick={() => setShowWords(!showWords)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//             >
//               {showWords ? 'Hide' : 'Show'} Top Words
//             </button>
//             {showWords && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md max-h-48 overflow-auto">
//                 <pre className="text-sm">
//                   {JSON.stringify(analysisResult.topWords, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>

//           {/* Collapsible: Bigrams */}
//           <div>
//             <button
//               onClick={() => setShowBigrams(!showBigrams)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//             >
//               {showBigrams ? 'Hide' : 'Show'} Bigrams
//             </button>
//             {showBigrams && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md max-h-48 overflow-auto">
//                 <pre className="text-sm">
//                   {JSON.stringify(analysisResult.topBigrams, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>

//           {/* Collapsible: Trigrams */}
//           <div>
//             <button
//               onClick={() => setShowTrigrams(!showTrigrams)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//             >
//               {showTrigrams ? 'Hide' : 'Show'} Trigrams
//             </button>
//             {showTrigrams && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md max-h-48 overflow-auto">
//                 <pre className="text-sm">
//                   {JSON.stringify(analysisResult.topTrigrams, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>

//           {/* Collapsible: Word Cloud */}
//           <div>
//             <button
//               onClick={() => setShowCloud(!showCloud)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//             >
//               {showCloud ? 'Hide' : 'Show'} Word Cloud
//             </button>



//             {/* {showCloud && wordCloudData.length > 0 && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md">
//                 <div style={{ width: '400px', height: '300px' }}>
//                   <WordCloud
//                     data={wordCloudData}
//                     fontSizeMapper={fontSizeMapper}
//                     rotate={rotate}
//                     padding={2}
//                   />
//                 </div>
//               </div>
//             )}
//             {showCloud && wordCloudData.length === 0 && (
//               <p className="mt-2 text-sm text-gray-600">
//                 No data available for word cloud.
//               </p>
//             )} */}


//             {wordCloudData.length > 0 ? (
//                 <div style={{ width: '400px', height: '300px', background: '#eee' }}>
//                     {console.log('wordCloudData:', wordCloudData)}
//                     <WordCloud
//                     data={wordCloudData}
//                     width={400}
//                     height={300}
//                     fontSizeMapper={(w) => {
//                         const size = Math.log2(w.value) * 10;
//                         return size < 10 ? 10 : size;
//                     }}
//                     rotate={0}
//                     padding={2}
//                     />
//                 </div>
//                 ) : (
//                 <p className="mt-2 text-sm text-gray-600">
//                     No data available for word cloud.
//                 </p>
//                 )}


//           </div>
//         </div>
//       )}
      
//     </div>
//   );
// }

// export default TextAnalysis;






















// import React, { useState, useEffect } from 'react';
// import WordCloud from 'react-d3-cloud';

// function TextAnalysis({ BASE_URL, cleanedText }) {
//   const [analysisText, setAnalysisText] = useState('');
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Collapsible toggles, for example
//   const [showCloud, setShowCloud] = useState(false);

//   useEffect(() => {
//     setAnalysisText(cleanedText);
//   }, [cleanedText]);

//   const handleAnalyze = async () => {
//     if (!analysisText.trim()) {
//       setError('No text provided. Please paste or select some text first.');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setAnalysisResult(null);

//     try {
//       const response = await fetch(`${BASE_URL}/api/analyse-text`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: analysisText }),
//       });
//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.detail || 'Analysis error');
//       }
//       const data = await response.json();
//       setAnalysisResult(data.data);
//     } catch (err) {
//       console.error(err);
//       setError(err.message || JSON.stringify(err));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Transform your topWords array ([word, count]) into react-d3-cloud format
//   let wordCloudData = [];
//   if (analysisResult?.topWords) {
//     wordCloudData = analysisResult.topWords.map(([word, count]) => ({
//       text: word,
//       value: count,
//     }));
//   }

//   // Increase font size, ensure a minimum
//   const fontSizeMapper = (word) => {
//     // Example: multiply by 25 for bigger words
//     const size = Math.log2(word.value) * 25;
//     return size < 15 ? 15 : size; 
//   };

//   // All words horizontal
//   const rotate = 0;

//   return (
//     <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-xl font-bold text-indigo-700 mb-4">Text Analysis</h2>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       <div className="mb-4">
//         <label className="block mb-2 font-medium text-gray-700">
//           Text to Analyze:
//         </label>
//         <textarea
//           rows={8}
//           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           value={analysisText}
//           onChange={(e) => setAnalysisText(e.target.value)}
//           placeholder="Paste or edit the text here..."
//         />
//       </div>

//       <button
//         onClick={handleAnalyze}
//         disabled={isLoading}
//         className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? 'Analyzing...' : 'Analyze Text'}
//       </button>

//       {analysisResult && (
//         <div className="mt-6">
//           {/* Example: Word Cloud collapsible toggle */}
//           <button
//             onClick={() => setShowCloud(!showCloud)}
//             className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//           >
//             {showCloud ? 'Hide' : 'Show'} Word Cloud
//           </button>

//           {showCloud && wordCloudData.length > 0 && (
//             <div
//               style={{
//                 marginTop: '1rem',
//                 width: '600px',
//                 height: '400px',
//                 backgroundColor: '#fafafa',  // custom background color
//                 border: '1px solid #ccc',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}
//             >
//               <WordCloud
//                 data={wordCloudData}
//                 width={600}
//                 height={400}
//                 fontSizeMapper={fontSizeMapper}
//                 rotate={rotate}
//                 padding={2}
//               />
//             </div>
//           )}

//           {showCloud && wordCloudData.length === 0 && (
//             <p className="mt-2 text-sm text-gray-600">
//               No data available for word cloud.
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default TextAnalysis;



















// import React, { useState, useEffect } from 'react';
// import WordCloud from 'react-d3-cloud';

// function TextAnalysis({ BASE_URL, cleanedText }) {
//   const [analysisText, setAnalysisText] = useState('');
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Collapsible toggles
//   const [showWords, setShowWords] = useState(false);
//   const [showBigrams, setShowBigrams] = useState(false);
//   const [showTrigrams, setShowTrigrams] = useState(false);
//   const [showCloud, setShowCloud] = useState(false);

//   // 1) On mount (or cleanedText change), set local state so user can edit/paste
//   useEffect(() => {
//     setAnalysisText(cleanedText);
//   }, [cleanedText]);

//   // 2) Analyze the text by calling backend /api/analyse-text
//   const handleAnalyze = async () => {
//     if (!analysisText.trim()) {
//       setError('No text provided. Please paste or select some text first.');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setAnalysisResult(null);

//     try {
//       const response = await fetch(`${BASE_URL}/api/analyse-text`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: analysisText }),
//       });

//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.detail || 'Analysis error');
//       }

//       const data = await response.json();
//       setAnalysisResult(data.data); // Expecting { topWords, topBigrams, topTrigrams }
//     } catch (err) {
//       console.error('Analysis error:', err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 3) Prepare Word Cloud data from topWords
//   //    topWords is typically an array of [ [word, count], ... ]
//   let wordCloudData = [];
//   if (analysisResult?.topWords) {
//     wordCloudData = analysisResult.topWords.map(([word, count]) => ({
//       text: word,
//       value: count,
//     }));
//   }

//   // 4) Font-size and rotation logic
//   const fontSizeMapper = (word) => {
//     // Example: multiply by 20 for bigger words, clamp min to 12
//     const size = Math.log2(word.value) * 20;
//     return size < 12 ? 12 : size;
//   };
//   const rotate = 0; // keep words horizontal

//   // (Optional) Debug: see what the wordCloudData is
//   console.log('wordCloudData =>', wordCloudData);

//   return (
//     <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-xl font-bold text-indigo-700 mb-4">Text Analysis</h2>

//       {/* Error display */}
//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       {/* Text input */}
//       <div className="mb-4">
//         <label className="block mb-2 font-medium text-gray-700">
//           Text to Analyze:
//         </label>
//         <textarea
//           rows={8}
//           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           value={analysisText}
//           onChange={(e) => setAnalysisText(e.target.value)}
//           placeholder="Paste or edit the text here..."
//         />
//       </div>

//       {/* Analyze button */}
//       <button
//         onClick={handleAnalyze}
//         disabled={isLoading}
//         className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? 'Analyzing...' : 'Analyze Text'}
//       </button>

//       {/* Collapsible sections for results */}
//       {analysisResult && (
//         <div className="mt-6 space-y-4">
//           {/* 1) Top Words */}
//           <div>
//             <button
//               onClick={() => setShowWords(!showWords)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//             >
//               {showWords ? 'Hide' : 'Show'} Top Words
//             </button>
//             {showWords && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md max-h-48 overflow-auto">
//                 <pre className="text-sm">
//                   {JSON.stringify(analysisResult.topWords, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>

//           {/* 2) Bigrams */}
//           <div>
//             <button
//               onClick={() => setShowBigrams(!showBigrams)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//             >
//               {showBigrams ? 'Hide' : 'Show'} Bigrams
//             </button>
//             {showBigrams && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md max-h-48 overflow-auto">
//                 <pre className="text-sm">
//                   {JSON.stringify(analysisResult.topBigrams, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>

//           {/* 3) Trigrams */}
//           <div>
//             <button
//               onClick={() => setShowTrigrams(!showTrigrams)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//             >
//               {showTrigrams ? 'Hide' : 'Show'} Trigrams
//             </button>
//             {showTrigrams && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md max-h-48 overflow-auto">
//                 <pre className="text-sm">
//                   {JSON.stringify(analysisResult.topTrigrams, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>

//           {/* 4) Word Cloud */}
//           <div>
//             <button
//               onClick={() => setShowCloud(!showCloud)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//             >
//               {showCloud ? 'Hide' : 'Show'} Word Cloud
//             </button>
//             {showCloud && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md">
//                 {wordCloudData.length > 0 ? (
//                   <div
//                     style={{
//                       width: '600px',
//                       height: '400px',
//                       backgroundColor: '#fafafa',
//                       border: '1px solid #ccc',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center'
//                     }}
//                   >
//                     <WordCloud
//                       data={wordCloudData}
//                       width={600}
//                       height={400}
//                       fontSizeMapper={fontSizeMapper}
//                       rotate={rotate}
//                       padding={2}
//                     />
//                   </div>
//                 ) : (
//                   <p className="mt-2 text-sm text-gray-600">
//                     No data available for word cloud.
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TextAnalysis;












// import React, { useState, useEffect } from 'react';
// import WordCloud from 'react-d3-cloud';

// function TextAnalysis({ BASE_URL, cleanedText }) {
//   const [analysisText, setAnalysisText] = useState('');
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Collapsible toggles
//   const [showWords, setShowWords] = useState(false);
//   const [showBigrams, setShowBigrams] = useState(false);
//   const [showTrigrams, setShowTrigrams] = useState(false);
//   const [showCloud, setShowCloud] = useState(false);

//   useEffect(() => {
//     setAnalysisText(cleanedText);
//   }, [cleanedText]);

//   const handleAnalyze = async () => {
//     if (!analysisText.trim()) {
//       setError('No text provided. Please paste or select some text first.');
//       return;
//     }
//     setIsLoading(true);
//     setError(null);
//     setAnalysisResult(null);

//     try {
//       const response = await fetch(`${BASE_URL}/api/analyse-text`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: analysisText }),
//       });
//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.detail || 'Analysis error');
//       }
//       const data = await response.json();
//       setAnalysisResult(data.data); // e.g. { topWords, topBigrams, topTrigrams }
//     } catch (err) {
//       console.error('Analysis error:', err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Build wordCloudData from topWords: [ [word, count], ... ]
//   let wordCloudData = [];
//   if (analysisResult?.topWords) {
//     wordCloudData = analysisResult.topWords.map(([word, count]) => ({
//       text: word,
//       value: count,
//     }));
//   }

//   // Force bigger fonts, clamp minimum
//   const fontSizeMapper = (word) => {
//     const size = Math.log2(word.value) * 25;
//     return size < 18 ? 18 : size;  // no smaller than 18
//   };

//   // Force black text (to avoid invisible random colours)
//   const fillColor = () => 'black';

//   // Force horizontal
//   const rotate = 0;

//   console.log('wordCloudData =>', wordCloudData);  // Debug: see if it’s empty

//   return (
//     <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-xl font-bold text-indigo-700 mb-4">Text Analysis</h2>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       <div className="mb-4">
//         <label className="block mb-2 font-medium text-gray-700">
//           Text to Analyze:
//         </label>
//         <textarea
//           rows={8}
//           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           value={analysisText}
//           onChange={(e) => setAnalysisText(e.target.value)}
//           placeholder="Paste or edit the text here..."
//         />
//       </div>

//       <button
//         onClick={handleAnalyze}
//         disabled={isLoading}
//         className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? 'Analyzing...' : 'Analyze Text'}
//       </button>

//       {analysisResult && (
//         <div className="mt-6 space-y-4">
//           {/* Debug List of topWords as well */}
//           <div>
//             <button
//               onClick={() => setShowWords(!showWords)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//             >
//               {showWords ? 'Hide' : 'Show'} Top Words
//             </button>
//             {showWords && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md max-h-48 overflow-auto">
//                 <pre className="text-sm">
//                   {JSON.stringify(analysisResult.topWords, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>

//           <div>
//             <button
//               onClick={() => setShowBigrams(!showBigrams)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//             >
//               {showBigrams ? 'Hide' : 'Show'} Bigrams
//             </button>
//             {showBigrams && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md max-h-48 overflow-auto">
//                 <pre className="text-sm">
//                   {JSON.stringify(analysisResult.topBigrams, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>

//           <div>
//             <button
//               onClick={() => setShowTrigrams(!showTrigrams)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//             >
//               {showTrigrams ? 'Hide' : 'Show'} Trigrams
//             </button>
//             {showTrigrams && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md max-h-48 overflow-auto">
//                 <pre className="text-sm">
//                   {JSON.stringify(analysisResult.topTrigrams, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>

//           {/* Word Cloud */}
//           <div>
//             <button
//               onClick={() => setShowCloud(!showCloud)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//             >
//               {showCloud ? 'Hide' : 'Show'} Word Cloud
//             </button>

//             {showCloud && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md">
//                 {wordCloudData.length > 0 ? (
//                   <div
//                     style={{
//                       width: '600px',
//                       height: '400px',
//                       backgroundColor: '#fafafa',
//                       border: '1px solid #ccc',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       position: 'relative'
//                     }}
//                   >
//                     <WordCloud
//                       data={wordCloudData}
//                       width={600}
//                       height={400}
//                       fontSizeMapper={fontSizeMapper}
//                       fontWeight="bold"
//                       font="Arial"
//                       fill={fillColor}
//                       rotate={rotate}
//                       padding={2}
//                       spiral="rectangular"
//                     />
//                   </div>
//                 ) : (
//                   <p className="mt-2 text-sm text-gray-600">
//                     No data available for word cloud.
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TextAnalysis;












// // src/TextAnalysis.jsx

// import React, { useState, useEffect } from 'react';
// import ServerWordCloud from './ServerWordCloud'; // <-- new component

// function TextAnalysis({ BASE_URL, cleanedText }) {
//   const [analysisText, setAnalysisText] = useState('');
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Collapsible toggles for topWords, bigrams, trigrams
//   const [showWords, setShowWords] = useState(false);
//   const [showBigrams, setShowBigrams] = useState(false);
//   const [showTrigrams, setShowTrigrams] = useState(false);

//   // Load the cleanedText from parent (if any) into local state
//   useEffect(() => {
//     setAnalysisText(cleanedText);
//   }, [cleanedText]);

//   // Call backend /api/analyse-text to get { topWords, topBigrams, topTrigrams }
//   const handleAnalyze = async () => {
//     if (!analysisText.trim()) {
//       setError('No text provided. Please paste or select some text first.');
//       return;
//     }
//     setIsLoading(true);
//     setError(null);
//     setAnalysisResult(null);

//     try {
//       const response = await fetch(`${BASE_URL}/api/analyse-text`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: analysisText }),
//       });
//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.detail || 'Analysis error');
//       }
//       const data = await response.json();
//       // data.data => { topWords, topBigrams, topTrigrams }
//       setAnalysisResult(data.data);
//     } catch (err) {
//       console.error('Analysis error:', err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-xl font-bold text-indigo-700 mb-4">Text Analysis</h2>

//       {/* Error display */}
//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       {/* Text input */}
//       <div className="mb-4">
//         <label className="block mb-2 font-medium text-gray-700">
//           Text to Analyze:
//         </label>
//         <textarea
//           rows={8}
//           className="w-full p-2 border border-gray-300 rounded-md 
//                      focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           value={analysisText}
//           onChange={(e) => setAnalysisText(e.target.value)}
//           placeholder="Paste or edit the text here..."
//         />
//       </div>

//       {/* Analyze button */}
//       <button
//         onClick={handleAnalyze}
//         disabled={isLoading}
//         className="px-4 py-2 bg-indigo-600 text-white rounded-md 
//                    hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? 'Analyzing...' : 'Analyze Text'}
//       </button>

//       {/* Show results if we have analysisResult */}
//       {analysisResult && (
//         <div className="mt-6 space-y-4">
//           {/* 1) Top Words */}
//           <div>
//             <button
//               onClick={() => setShowWords(!showWords)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 
//                          rounded-md hover:bg-gray-200"
//             >
//               {showWords ? 'Hide' : 'Show'} Top Words
//             </button>
//             {showWords && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md 
//                               max-h-48 overflow-auto">
//                 <pre className="text-sm">
//                   {JSON.stringify(analysisResult.topWords, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>

//           {/* 2) Bigrams */}
//           <div>
//             <button
//               onClick={() => setShowBigrams(!showBigrams)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 
//                          rounded-md hover:bg-gray-200"
//             >
//               {showBigrams ? 'Hide' : 'Show'} Bigrams
//             </button>
//             {showBigrams && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md 
//                               max-h-48 overflow-auto">
//                 <pre className="text-sm">
//                   {JSON.stringify(analysisResult.topBigrams, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>

//           {/* 3) Trigrams */}
//           <div>
//             <button
//               onClick={() => setShowTrigrams(!showTrigrams)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 
//                          rounded-md hover:bg-gray-200"
//             >
//               {showTrigrams ? 'Hide' : 'Show'} Trigrams
//             </button>
//             {showTrigrams && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md 
//                               max-h-48 overflow-auto">
//                 <pre className="text-sm">
//                   {JSON.stringify(analysisResult.topTrigrams, null, 2)}
//                 </pre>
//               </div>
//             )}
//           </div>

//           {/* Server-side Word Cloud */}
//           <ServerWordCloud
//             BASE_URL={BASE_URL}
//             topWords={analysisResult.topWords} 
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default TextAnalysis;


















// import { useState, useEffect } from 'react';
// import ServerWordCloud from './ServerWordCloud';

// function TextAnalysis({ BASE_URL, cleanedText = '', projectName = '' }) {
//   const [analysisText, setAnalysisText] = useState(cleanedText);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // On mount or whenever cleanedText changes
//   useEffect(() => {
//     setAnalysisText(cleanedText);
//   }, [cleanedText]);

//   // Analyze text via backend
//   const handleAnalyze = async () => {
//     if (!analysisText.trim()) {
//       setError('No text provided. Please paste or type something.');
//       return;
//     }
//     setIsLoading(true);
//     setError(null);
//     setAnalysisResult(null);

//     try {
//       const response = await fetch(`${BASE_URL}/api/analyse-text`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: analysisText, projectName }),
//       });
//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.detail || 'Analysis error');
//       }
//       const data = await response.json();
//       setAnalysisResult(data.data); // { topWords, topBigrams, topTrigrams }
//     } catch (err) {
//       console.error('Analysis error:', err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-xl font-bold text-indigo-700 mb-4">Text Analysis</h2>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       <div className="mb-4">
//         <label className="block mb-2 font-medium text-gray-700">
//           Text to Analyze:
//         </label>
//         <textarea
//           rows={8}
//           className="w-full p-2 border border-gray-300 rounded-md 
//                      focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           value={analysisText}
//           onChange={(e) => setAnalysisText(e.target.value)}
//           placeholder="Paste or edit the text here..."
//         />
//       </div>

//       <button
//         onClick={handleAnalyze}
//         disabled={isLoading}
//         className="px-4 py-2 bg-indigo-600 text-white rounded-md 
//                    hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? 'Analyzing...' : 'Analyze Text'}
//       </button>

//       {analysisResult && (
//         <div className="mt-6 space-y-4">
//           {/* Show topWords, bigrams, trigrams as you prefer, or do nothing */}
//           <div>
//             <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">
//               Show Top Words
//             </button>
//             {/* etc. for bigrams/trigrams toggles, if you want them collapsible */}
//             {/* Or just debug: */}
//             {/* <pre>{JSON.stringify(analysisResult, null, 2)}</pre> */}
//           </div>

//           {/* Server-side Word Cloud and frequency table */}
//           <ServerWordCloud
//             BASE_URL={BASE_URL}
//             topWords={analysisResult.topWords}
//             // pass projectName so it saves the cloud image
//             projectName={projectName}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default TextAnalysis;














// import { useState, useEffect } from 'react';
// import ServerWordCloud from './ServerWordCloud';

// function TextAnalysis({ BASE_URL, cleanedText = '', projectName = '' }) {
//   const [analysisText, setAnalysisText] = useState(cleanedText);
//   const [analysisResult, setAnalysisResult] = useState(null);

//   const [showWords, setShowWords] = useState(false);
//   const [showBigrams, setShowBigrams] = useState(false);
//   const [showTrigrams, setShowTrigrams] = useState(false);

//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setAnalysisText(cleanedText);
//   }, [cleanedText]);

//   const handleAnalyze = async () => {
//     if (!analysisText.trim()) {
//       setError('No text provided.');
//       return;
//     }
//     setIsLoading(true);
//     setError(null);
//     setAnalysisResult(null);

//     try {
//       const resp = await fetch(`${BASE_URL}/api/analyse-text`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: analysisText, projectName }),
//       });
//       if (!resp.ok) {
//         const errData = await resp.json();
//         throw new Error(errData.detail || 'Analysis error');
//       }
//       const data = await resp.json();
//       setAnalysisResult(data.data);
//     } catch (err) {
//       console.error('Analysis error:', err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Download the entire analysis result
//   const handleDownload = () => {
//     if (!analysisResult) return;
//     const blob = new Blob([JSON.stringify(analysisResult, null, 2)], {
//       type: 'application/json',
//     });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `analysis-results.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6">
//       <h2 className="text-xl font-bold text-indigo-700 mb-4">Text Analysis</h2>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       <div className="mb-4">
//         <label className="block mb-2 font-medium text-gray-700">
//           Text to Analyze:
//         </label>
//         <textarea
//           rows={8}
//           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           value={analysisText}
//           onChange={(e) => setAnalysisText(e.target.value)}
//           placeholder="Paste or edit the text here..."
//         />
//       </div>

//       <div className="flex space-x-2 mb-6">
//         <button
//           onClick={handleAnalyze}
//           disabled={isLoading}
//           className="px-4 py-2 bg-indigo-600 text-white rounded-md 
//                      hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? 'Analyzing...' : 'Analyze Text'}
//         </button>

//         {analysisResult && (
//           <button
//             onClick={handleDownload}
//             className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//           >
//             Download Analysis
//           </button>
//         )}
//       </div>

//       {analysisResult && (
//         <div className="mt-6 space-y-4">
//           {/* Toggles for topWords, bigrams, trigrams */}
//           <div className="space-x-2">
//             <button
//               onClick={() => setShowWords(!showWords)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//             >
//               {showWords ? 'Hide Top Words' : 'Show Top Words'}
//             </button>
//             <button
//               onClick={() => setShowBigrams(!showBigrams)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//             >
//               {showBigrams ? 'Hide Bigrams' : 'Show Bigrams'}
//             </button>
//             <button
//               onClick={() => setShowTrigrams(!showTrigrams)}
//               className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//             >
//               {showTrigrams ? 'Hide Trigrams' : 'Show Trigrams'}
//             </button>
//           </div>

//           {showWords && (
//             <div className="mt-2 bg-gray-50 p-3 rounded-md">
//               <pre className="text-sm whitespace-pre-wrap">
//                 {JSON.stringify(analysisResult.topWords, null, 2)}
//               </pre>
//             </div>
//           )}
//           {showBigrams && (
//             <div className="mt-2 bg-gray-50 p-3 rounded-md">
//               <pre className="text-sm whitespace-pre-wrap">
//                 {JSON.stringify(analysisResult.topBigrams, null, 2)}
//               </pre>
//             </div>
//           )}
//           {showTrigrams && (
//             <div className="mt-2 bg-gray-50 p-3 rounded-md">
//               <pre className="text-sm whitespace-pre-wrap">
//                 {JSON.stringify(analysisResult.topTrigrams, null, 2)}
//               </pre>
//             </div>
//           )}

//           {/* Word Cloud / Frequency Table */}
//           <ServerWordCloud
//             BASE_URL={BASE_URL}
//             topWords={analysisResult.topWords} // up to 50
//             projectName={projectName}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default TextAnalysis;






















import { useState, useEffect } from 'react';
import ServerWordCloud from './ServerWordCloud';

function TextAnalysis({ BASE_URL, cleanedText = '', projectName = '' }) {
  const [analysisText, setAnalysisText] = useState(cleanedText);
  const [analysisResult, setAnalysisResult] = useState(null);

  const [showWords, setShowWords] = useState(false);
  const [showBigrams, setShowBigrams] = useState(false);
  const [showTrigrams, setShowTrigrams] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAnalysisText(cleanedText);
  }, [cleanedText]);

  const handleAnalyze = async () => {
    if (!analysisText.trim()) {
      setError('No text provided.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const resp = await fetch(`${BASE_URL}/api/analyse-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: analysisText, projectName }),
      });
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.detail || 'Analysis error');
      }
      const data = await resp.json();
      setAnalysisResult(data.data);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!analysisResult) return;
    const blob = new Blob([JSON.stringify(analysisResult, null, 2)], {
      type: 'application/json',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analysis-results.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">Text Analysis</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">
          Text to Analyze:
        </label>
        <textarea
          rows={8}
          className="w-full p-2 border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={analysisText}
          onChange={(e) => setAnalysisText(e.target.value)}
          placeholder="Paste or edit the text here..."
        />
      </div>

      <div className="flex space-x-2 mb-6">
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md 
                     hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Text'}
        </button>

        {analysisResult && (
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
          >
            Download Analysis
          </button>
        )}
      </div>

      {analysisResult && (
        <div className="mt-6 space-y-4">
          {/* Toggles for topWords, bigrams, trigrams */}
          <div className="space-x-2">
            <button
              onClick={() => setShowWords(!showWords)}
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
            >
              {showWords ? 'Hide Top Words' : 'Show Top Words'}
            </button>
            <button
              onClick={() => setShowBigrams(!showBigrams)}
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
            >
              {showBigrams ? 'Hide Bigrams' : 'Show Bigrams'}
            </button>
            <button
              onClick={() => setShowTrigrams(!showTrigrams)}
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
            >
              {showTrigrams ? 'Hide Trigrams' : 'Show Trigrams'}
            </button>
          </div>

          {showWords && (
            <div className="mt-2 bg-gray-50 p-3 rounded-md">
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(analysisResult.topWords, null, 2)}
              </pre>
            </div>
          )}
          {showBigrams && (
            <div className="mt-2 bg-gray-50 p-3 rounded-md">
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(analysisResult.topBigrams, null, 2)}
              </pre>
            </div>
          )}
          {showTrigrams && (
            <div className="mt-2 bg-gray-50 p-3 rounded-md">
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(analysisResult.topTrigrams, null, 2)}
              </pre>
            </div>
          )}

          {/* Word Cloud / Frequency Table */}
          <ServerWordCloud
            BASE_URL={BASE_URL}
            topWords={analysisResult.topWords} // up to 50
            projectName={projectName}
          />
        </div>
      )}
    </div>
  );
}

export default TextAnalysis;











