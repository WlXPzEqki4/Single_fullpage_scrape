// import { useState } from 'react';

// function ServerWordCloud({ BASE_URL }) {
//   const [wordCloudUrl, setWordCloudUrl] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Example data for words. Usually you’d pass or fetch real word frequency data
//   const demoWords = [
//     ["hello", 10],
//     ["world", 8],
//     ["python", 15],
//     ["fastapi", 5],
//     ["react", 12],
//     ["cloud", 4]
//   ];

//   async function handleWordCloudImage() {
//     try {
//       setIsLoading(true);
//       setError(null);
//       setWordCloudUrl(null);

//       const response = await fetch(`${BASE_URL}/api/wordcloud-image`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           words: demoWords   // In real usage, pass actual data
//         })
//       });

//       if (!response.ok) {
//         const errData = await response.text();
//         throw new Error(errData || 'Failed to generate word cloud');
//       }
//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setWordCloudUrl(url);

//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div>
//       <h2>Server-Side Word Cloud</h2>

//       <button
//         onClick={handleWordCloudImage}
//         disabled={isLoading}
//         style={{ margin: '1rem 0', padding: '0.5rem 1rem' }}
//       >
//         {isLoading ? 'Generating...' : 'Generate Word Cloud'}
//       </button>

//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}

//       {wordCloudUrl && (
//         <div style={{ marginTop: '1rem' }}>
//           <img
//             src={wordCloudUrl}
//             alt="Python WordCloud"
//             style={{ border: '1px solid #ccc', background: '#fafafa' }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ServerWordCloud;




















// // src/ServerWordCloud.jsx

// import { useState } from 'react';

// function ServerWordCloud({ BASE_URL, topWords }) {
//   const [wordCloudUrl, setWordCloudUrl] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // If no topWords or empty array, we disable the button
//   const hasWords = Array.isArray(topWords) && topWords.length > 0;

//   async function handleWordCloudImage() {
//     if (!hasWords) {
//       setError('No top words to generate a cloud.');
//       return;
//     }
//     try {
//       setIsLoading(true);
//       setError(null);
//       setWordCloudUrl(null);

//       const response = await fetch(`${BASE_URL}/api/wordcloud-image`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           words: topWords // from the analysis results
//         })
//       });

//       if (!response.ok) {
//         const errData = await response.text();
//         throw new Error(errData || 'Failed to generate word cloud');
//       }

//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setWordCloudUrl(url);

//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-bold text-indigo-700">Word Cloud</h3>

//       <button
//         onClick={handleWordCloudImage}
//         disabled={isLoading || !hasWords}
//         className="px-4 py-2 bg-indigo-600 text-white rounded-md 
//                    hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? 'Generating...' : 'Generate Word Cloud'}
//       </button>

//       {error && (
//         <div className="p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       {wordCloudUrl && (
//         <div className="mt-4">
//           <img
//             src={wordCloudUrl}
//             alt="Server-Side Word Cloud"
//             className="border border-gray-300 bg-gray-50"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ServerWordCloud;














// // src/ServerWordCloud.jsx

// import { useState } from 'react';

// function ServerWordCloud({ BASE_URL, topWords }) {
//   const [wordCloudUrl, setWordCloudUrl] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // If no topWords or empty array, we disable the button
//   const hasWords = Array.isArray(topWords) && topWords.length > 0;

//   async function handleWordCloudImage() {
//     if (!hasWords) {
//       setError('No top words to generate a cloud.');
//       return;
//     }
//     try {
//       setIsLoading(true);
//       setError(null);
//       setWordCloudUrl(null);

//       const response = await fetch(`${BASE_URL}/api/wordcloud-image`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           words: topWords // from the analysis results
//         })
//       });

//       if (!response.ok) {
//         const errData = await response.text();
//         throw new Error(errData || 'Failed to generate word cloud');
//       }

//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setWordCloudUrl(url);

//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div>
//       {/* Remove the heading entirely */}
      
//       {/* The button now matches the "Show top words" style */}
//       <button
//         onClick={handleWordCloudImage}
//         disabled={isLoading || !hasWords}
//         className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md 
//                    hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? 'Generating...' : 'Generate Word Cloud'}
//       </button>

//       {/* Error display */}
//       {error && (
//         <div className="p-3 bg-red-50 text-red-600 rounded-md mt-2">
//           {error}
//         </div>
//       )}

//       {/* Display the image if we have a URL */}
//       {wordCloudUrl && (
//         <div className="mt-2">
//           <img
//             src={wordCloudUrl}
//             alt="Server-Side Word Cloud"
//             className="border border-gray-300 bg-gray-50"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ServerWordCloud;























// import { useState, useEffect } from 'react';

// function ServerWordCloud({ BASE_URL, topWords }) {
//   // Word cloud states
//   const [wordCloudUrl, setWordCloudUrl] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showCloud, setShowCloud] = useState(true);

//   // Sorting states
//   const [sortMode, setSortMode] = useState('freqDesc');  // default sort
//   const [sortedWords, setSortedWords] = useState([]);

//   // Ensure we have some words
//   const hasWords = Array.isArray(topWords) && topWords.length > 0;

//   // 1) Handle the generation of the server-side word cloud (PNG)
//   async function handleWordCloudImage() {
//     if (!hasWords) {
//       setError('No top words to generate a cloud.');
//       return;
//     }
//     try {
//       setIsLoading(true);
//       setError(null);
//       setWordCloudUrl(null);

//       const response = await fetch(`${BASE_URL}/api/wordcloud-image`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ words: topWords })
//       });

//       if (!response.ok) {
//         const errData = await response.text();
//         throw new Error(errData || 'Failed to generate word cloud');
//       }

//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setWordCloudUrl(url);
//       setShowCloud(true); // auto-show the cloud once generated
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // 2) Sort topWords into sortedWords whenever topWords or sortMode changes
//   useEffect(() => {
//     if (!hasWords) {
//       setSortedWords([]);
//       return;
//     }

//     // clone the array to avoid mutating props
//     const arr = [...topWords];

//     switch (sortMode) {
//       case 'freqAsc':
//         arr.sort((a, b) => a[1] - b[1]);   // ascending by frequency
//         break;
//       case 'freqDesc':
//         arr.sort((a, b) => b[1] - a[1]);  // descending by frequency
//         break;
//       case 'alphaAsc':
//         arr.sort((a, b) => a[0].localeCompare(b[0]));  // ascending alphabetically
//         break;
//       case 'alphaDesc':
//         arr.sort((a, b) => b[0].localeCompare(a[0]));  // descending alphabetically
//         break;
//       default:
//         break;
//     }
//     setSortedWords(arr);
//   }, [topWords, sortMode]);

//   // 3) Render UI
//   return (
//     <div className="space-y-4">
//       {/* Sorting Buttons */}
//       <div className="flex items-center space-x-2 mt-2">
//         <div className="text-sm text-gray-600">Sort by:</div>
//         <button
//           onClick={() => setSortMode('freqAsc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'freqAsc' ? 'underline' : ''}`}
//         >
//           Freq Asc
//         </button>
//         <button
//           onClick={() => setSortMode('freqDesc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'freqDesc' ? 'underline' : ''}`}
//         >
//           Freq Desc
//         </button>
//         <button
//           onClick={() => setSortMode('alphaAsc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'alphaAsc' ? 'underline' : ''}`}
//         >
//           A → Z
//         </button>
//         <button
//           onClick={() => setSortMode('alphaDesc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'alphaDesc' ? 'underline' : ''}`}
//         >
//           Z → A
//         </button>
//       </div>

//       {/* Table of sorted words */}
//       <div className="overflow-auto bg-white border border-gray-200 rounded-md">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="px-4 py-2 text-left font-medium text-gray-700">Word</th>
//               <th className="px-4 py-2 text-left font-medium text-gray-700">Frequency</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedWords.map(([word, freq], idx) => {
//               // for a quick bar histogram, let's assume max freq is sortedWords[0][1]
//               const maxFreq = sortedWords[0][1] || 1;
//               const barWidth = Math.round((freq / maxFreq) * 100);

//               return (
//                 <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
//                   <td className="px-4 py-2 text-gray-800">{word}</td>
//                   <td className="px-4 py-2 text-gray-800">
//                     <div className="flex items-center space-x-2">
//                       <span>{freq}</span>
//                       {/* A simple bar showing freq proportion */}
//                       <div className="bg-indigo-200 h-2" style={{ width: `${barWidth}%` }}></div>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//             {!hasWords && (
//               <tr>
//                 <td colSpan={2} className="px-4 py-2 text-gray-500">
//                   No words to display.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Generate Word Cloud & Hide/Show Buttons */}
//       <div className="flex items-center space-x-2">
//         <button
//           onClick={handleWordCloudImage}
//           disabled={isLoading || !hasWords}
//           className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//                      disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? 'Generating...' : 'Generate Word Cloud'}
//         </button>

//         {wordCloudUrl && (
//           <button
//             onClick={() => setShowCloud(!showCloud)}
//             className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//           >
//             {showCloud ? 'Hide' : 'Show'} Word Cloud
//           </button>
//         )}
//       </div>

//       {/* Error display */}
//       {error && (
//         <div className="p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       {/* Display the image if we have a URL and showCloud is true */}
//       {wordCloudUrl && showCloud && (
//         <div className="mt-2">
//           <img
//             src={wordCloudUrl}
//             alt="Server-Side Word Cloud"
//             className="border border-gray-300 bg-gray-50 max-w-full"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ServerWordCloud;













// import { useState, useEffect } from 'react';

// function ServerWordCloud({ BASE_URL, topWords = [], projectName = '' }) {
//   const [wordCloudUrl, setWordCloudUrl] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showCloud, setShowCloud] = useState(true);

//   // Sorting
//   const [sortMode, setSortMode] = useState('freqDesc');
//   const [sortedWords, setSortedWords] = useState([]);

//   // If no topWords or empty array, we disable the button
//   const hasWords = Array.isArray(topWords) && topWords.length > 0;

//   // 1) Generate Word Cloud
//   async function handleWordCloudImage() {
//     if (!hasWords) {
//       setError('No top words to generate a cloud.');
//       return;
//     }
//     try {
//       setIsLoading(true);
//       setError(null);
//       setWordCloudUrl(null);

//       const response = await fetch(`${BASE_URL}/api/wordcloud-image`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           words: topWords,
//           projectName
//         })
//       });

//       if (!response.ok) {
//         const errData = await response.text();
//         throw new Error(errData || 'Failed to generate word cloud');
//       }

//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setWordCloudUrl(url);
//       setShowCloud(true);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // 2) Sort topWords into sortedWords
//   useEffect(() => {
//     if (!hasWords) {
//       setSortedWords([]);
//       return;
//     }
//     const arr = [...topWords];

//     switch (sortMode) {
//       case 'freqAsc':
//         arr.sort((a, b) => a[1] - b[1]);   // ascending freq
//         break;
//       case 'freqDesc':
//         arr.sort((a, b) => b[1] - a[1]);  // descending freq
//         break;
//       case 'alphaAsc':
//         arr.sort((a, b) => a[0].localeCompare(b[0]));
//         break;
//       case 'alphaDesc':
//         arr.sort((a, b) => b[0].localeCompare(a[0]));
//         break;
//       default:
//         break;
//     }
//     setSortedWords(arr);
//   }, [topWords, sortMode, hasWords]);

//   return (
//     <div className="space-y-4">

//       {/* Sorting Buttons */}
//       <div className="flex items-center space-x-2">
//         <span className="text-sm text-gray-600">Sort by:</span>
//         <button
//           onClick={() => setSortMode('freqAsc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'freqAsc' ? 'underline' : ''}`}
//         >
//           Freq Asc
//         </button>
//         <button
//           onClick={() => setSortMode('freqDesc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'freqDesc' ? 'underline' : ''}`}
//         >
//           Freq Desc
//         </button>
//         <button
//           onClick={() => setSortMode('alphaAsc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'alphaAsc' ? 'underline' : ''}`}
//         >
//           A → Z
//         </button>
//         <button
//           onClick={() => setSortMode('alphaDesc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'alphaDesc' ? 'underline' : ''}`}
//         >
//           Z → A
//         </button>
//       </div>

//       {/* Table of Words */}
//       <div className="overflow-auto bg-white border border-gray-200 rounded-md">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="px-4 py-2 text-left font-medium text-gray-700">Word</th>
//               <th className="px-4 py-2 text-left font-medium text-gray-700">Frequency</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedWords.map(([word, freq], idx) => {
//               const maxFreq = sortedWords[0][1] || 1;
//               const barWidth = Math.round((freq / maxFreq) * 100);

//               return (
//                 <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
//                   <td className="px-4 py-2 text-gray-800">{word}</td>
//                   <td className="px-4 py-2 text-gray-800">
//                     <div className="flex items-center space-x-2">
//                       <span>{freq}</span>
//                       <div
//                         className="bg-indigo-200 h-2"
//                         style={{ width: `${barWidth}%` }}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}

//             {!hasWords && (
//               <tr>
//                 <td colSpan={2} className="px-4 py-2 text-gray-500">
//                   No words to display.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Word Cloud Buttons */}
//       <div className="flex items-center space-x-2">
//         <button
//           onClick={handleWordCloudImage}
//           disabled={isLoading || !hasWords}
//           className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md 
//                      hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? 'Generating...' : 'Generate Word Cloud'}
//         </button>

//         {wordCloudUrl && (
//           <button
//             onClick={() => setShowCloud(!showCloud)}
//             className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//           >
//             {showCloud ? 'Hide' : 'Show'} Word Cloud
//           </button>
//         )}
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       {/* Display Word Cloud Image */}
//       {wordCloudUrl && showCloud && (
//         <div className="mt-2">
//           <img
//             src={wordCloudUrl}
//             alt="Server-Side Word Cloud"
//             className="border border-gray-300 bg-gray-50 max-w-full"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ServerWordCloud;
















// import { useState, useEffect } from 'react';

// function ServerWordCloud({ BASE_URL, topWords = [], projectName = '' }) {
//   const [wordCloudUrl, setWordCloudUrl] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showCloud, setShowCloud] = useState(true);

//   // Sorting
//   const [sortMode, setSortMode] = useState('freqDesc');

//   // Pagination / row limit
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(1);

//   const [sortedWords, setSortedWords] = useState([]);

//   const hasWords = Array.isArray(topWords) && topWords.length > 0;

//   // 1) Word cloud generation
//   async function handleWordCloudImage() {
//     if (!hasWords) {
//       setError('No top words to generate a cloud.');
//       return;
//     }
//     try {
//       setIsLoading(true);
//       setError(null);
//       setWordCloudUrl(null);

//       const response = await fetch(`${BASE_URL}/api/wordcloud-image`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ words: topWords, projectName })
//       });
//       if (!response.ok) {
//         const errData = await response.text();
//         throw new Error(errData || 'Failed to generate word cloud');
//       }
//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setWordCloudUrl(url);
//       setShowCloud(true);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // 2) Sort the words
//   useEffect(() => {
//     if (!hasWords) {
//       setSortedWords([]);
//       return;
//     }
//     const arr = [...topWords];
//     switch (sortMode) {
//       case 'freqAsc':
//         arr.sort((a, b) => a[1] - b[1]);
//         break;
//       case 'freqDesc':
//         arr.sort((a, b) => b[1] - a[1]);
//         break;
//       case 'alphaAsc':
//         arr.sort((a, b) => a[0].localeCompare(b[0]));
//         break;
//       case 'alphaDesc':
//         arr.sort((a, b) => b[0].localeCompare(a[0]));
//         break;
//       default:
//         break;
//     }
//     setSortedWords(arr);
//     setPage(1); // reset to first page on sort
//   }, [topWords, sortMode, hasWords]);

//   // 3) Pagination
//   const totalWords = sortedWords.length;
//   const totalPages = Math.ceil(totalWords / rowsPerPage);
//   const startIndex = (page - 1) * rowsPerPage;
//   const displayedWords = sortedWords.slice(startIndex, startIndex + rowsPerPage);

//   const handlePageChange = (newPage) => {
//     if (newPage < 1 || newPage > totalPages) return;
//     setPage(newPage);
//   };

//   return (
//     <div className="space-y-4 mt-6">
//       {/* Sort controls */}
//       <div className="flex items-center space-x-2">
//         <span className="text-sm text-gray-600">Sort by:</span>
//         <button
//           onClick={() => setSortMode('freqAsc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'freqAsc' ? 'underline' : ''}`}
//         >
//           Freq Asc
//         </button>
//         <button
//           onClick={() => setSortMode('freqDesc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'freqDesc' ? 'underline' : ''}`}
//         >
//           Freq Desc
//         </button>
//         <button
//           onClick={() => setSortMode('alphaAsc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'alphaAsc' ? 'underline' : ''}`}
//         >
//           A → Z
//         </button>
//         <button
//           onClick={() => setSortMode('alphaDesc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'alphaDesc' ? 'underline' : ''}`}
//         >
//           Z → A
//         </button>
//       </div>

//       {/* Rows per page selector */}
//       <div className="flex items-center space-x-2">
//         <span className="text-sm text-gray-600">Show:</span>
//         <select
//           value={rowsPerPage}
//           onChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(1); }}
//           className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md focus:outline-none"
//         >
//           <option value={5}>5 rows</option>
//           <option value={10}>10 rows</option>
//           <option value={20}>20 rows</option>
//           <option value={50}>50 rows</option>
//         </select>
//         <span className="text-sm text-gray-600">words per page</span>
//       </div>

//       {/* Word table */}
//       <div className="overflow-auto bg-white border border-gray-200 rounded-md">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="px-4 py-2 text-left font-medium text-gray-700">Word</th>
//               <th className="px-4 py-2 text-left font-medium text-gray-700">Frequency</th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayedWords.map(([word, freq], idx) => {
//               const maxFreq = sortedWords[0][1] || 1;
//               const barWidth = Math.round((freq / maxFreq) * 100);
//               return (
//                 <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
//                   <td className="px-4 py-2 text-gray-800">{word}</td>
//                   <td className="px-4 py-2 text-gray-800">
//                     <div className="flex items-center space-x-2">
//                       <span>{freq}</span>
//                       <div
//                         className="bg-indigo-200 h-2"
//                         style={{ width: `${barWidth}%` }}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//             {!hasWords && (
//               <tr>
//                 <td colSpan={2} className="px-4 py-2 text-gray-500">
//                   No words to display.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       {hasWords && (
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => handlePageChange(page - 1)}
//             disabled={page <= 1}
//             className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//                        disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Prev
//           </button>
//           <span className="text-sm">
//             Page {page} of {Math.max(totalPages, 1)}
//           </span>
//           <button
//             onClick={() => handlePageChange(page + 1)}
//             disabled={page >= totalPages}
//             className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//                        disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {/* Word Cloud Buttons */}
//       <div className="flex items-center space-x-2 mt-2">
//         <button
//           onClick={handleWordCloudImage}
//           disabled={isLoading || !hasWords}
//           className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md 
//                      hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? 'Generating...' : 'Generate Word Cloud'}
//         </button>

//         {wordCloudUrl && (
//           <button
//             onClick={() => setShowCloud(!showCloud)}
//             className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//           >
//             {showCloud ? 'Hide' : 'Show'} Word Cloud
//           </button>
//         )}
//       </div>

//       {error && (
//         <div className="p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       {wordCloudUrl && showCloud && (
//         <div className="mt-2">
//           <img
//             src={wordCloudUrl}
//             alt="Server-Side Word Cloud"
//             className="border border-gray-300 bg-gray-50 max-w-full"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ServerWordCloud;
















// import { useState, useEffect } from 'react';

// function ServerWordCloud({ BASE_URL, topWords = [], projectName = '' }) {
//   const [wordCloudUrl, setWordCloudUrl] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showCloud, setShowCloud] = useState(true);

//   // Sorting
//   const [sortMode, setSortMode] = useState('freqDesc');

//   // Pagination
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(1);

//   const [sortedWords, setSortedWords] = useState([]);

//   const hasWords = Array.isArray(topWords) && topWords.length > 0;

//   // 1) Generate Word Cloud
//   async function handleWordCloudImage() {
//     if (!hasWords) {
//       setError('No top words to generate a cloud.');
//       return;
//     }
//     try {
//       setIsLoading(true);
//       setError(null);
//       setWordCloudUrl(null);

//       const response = await fetch(`${BASE_URL}/api/wordcloud-image`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           words: topWords,
//           projectName
//         })
//       });
//       if (!response.ok) {
//         const errData = await response.text();
//         throw new Error(errData || 'Failed to generate word cloud');
//       }
//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);
//       setWordCloudUrl(url);
//       setShowCloud(true);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // 2) Sort
//   useEffect(() => {
//     if (!hasWords) {
//       setSortedWords([]);
//       return;
//     }
//     const arr = [...topWords];
//     switch (sortMode) {
//       case 'freqAsc':
//         arr.sort((a, b) => a[1] - b[1]);
//         break;
//       case 'freqDesc':
//         arr.sort((a, b) => b[1] - a[1]);
//         break;
//       case 'alphaAsc':
//         arr.sort((a, b) => a[0].localeCompare(b[0]));
//         break;
//       case 'alphaDesc':
//         arr.sort((a, b) => b[0].localeCompare(a[0]));
//         break;
//       default:
//         break;
//     }
//     setSortedWords(arr);
//     setPage(1); // reset to first page
//   }, [topWords, sortMode, hasWords]);

//   // 3) Pagination logic
//   const totalWords = sortedWords.length;
//   const totalPages = Math.ceil(totalWords / rowsPerPage);
//   const startIndex = (page - 1) * rowsPerPage;
//   const displayedWords = sortedWords.slice(startIndex, startIndex + rowsPerPage);

//   const handlePageChange = (newPage) => {
//     if (newPage < 1 || newPage > totalPages) return;
//     setPage(newPage);
//   };

//   return (
//     <div className="space-y-4 mt-6">
//       {/* Sort controls */}
//       <div className="flex items-center space-x-2">
//         <span className="text-sm text-gray-600">Sort by:</span>
//         <button
//           onClick={() => setSortMode('freqAsc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'freqAsc' ? 'underline' : ''}`}
//         >
//           Freq Asc
//         </button>
//         <button
//           onClick={() => setSortMode('freqDesc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'freqDesc' ? 'underline' : ''}`}
//         >
//           Freq Desc
//         </button>
//         <button
//           onClick={() => setSortMode('alphaAsc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'alphaAsc' ? 'underline' : ''}`}
//         >
//           A → Z
//         </button>
//         <button
//           onClick={() => setSortMode('alphaDesc')}
//           className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//             ${sortMode === 'alphaDesc' ? 'underline' : ''}`}
//         >
//           Z → A
//         </button>
//       </div>

//       {/* Rows per page */}
//       <div className="flex items-center space-x-2">
//         <span className="text-sm text-gray-600">Show:</span>
//         <select
//           value={rowsPerPage}
//           onChange={(e) => {
//             const val = parseInt(e.target.value, 10);
//             setRowsPerPage(val);
//             setPage(1);
//           }}
//           className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md focus:outline-none"
//         >
//           <option value={5}>5 rows</option>
//           <option value={10}>10 rows</option>
//           <option value={20}>20 rows</option>
//           <option value={50}>50 rows</option>
//         </select>
//         <span className="text-sm text-gray-600">words per page</span>
//       </div>

//       {/* Table of words */}
//       <div className="overflow-auto bg-white border border-gray-200 rounded-md">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="px-4 py-2 text-left font-medium text-gray-700">Word</th>
//               <th className="px-4 py-2 text-left font-medium text-gray-700">Frequency</th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayedWords.map(([word, freq], idx) => {
//               const maxFreq = sortedWords[0] ? sortedWords[0][1] : 1;
//               const barWidth = Math.round((freq / maxFreq) * 100);

//               return (
//                 <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
//                   <td className="px-4 py-2 text-gray-800">{word}</td>
//                   <td className="px-4 py-2 text-gray-800">
//                     <div className="flex items-center space-x-2">
//                       <span>{freq}</span>
//                       <div
//                         className="bg-indigo-200 h-2"
//                         style={{ width: `${barWidth}%` }}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//             {!hasWords && (
//               <tr>
//                 <td colSpan={2} className="px-4 py-2 text-gray-500">
//                   No words to display.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       {hasWords && totalPages > 1 && (
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => handlePageChange(page - 1)}
//             disabled={page <= 1}
//             className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//                        disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Prev
//           </button>
//           <span className="text-sm">
//             Page {page} of {Math.max(totalPages, 1)}
//           </span>
//           <button
//             onClick={() => handlePageChange(page + 1)}
//             disabled={page >= totalPages}
//             className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
//                        disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {/* Word Cloud Buttons */}
//       <div className="flex items-center space-x-2 mt-2">
//         <button
//           onClick={handleWordCloudImage}
//           disabled={isLoading || !hasWords}
//           className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md 
//                      hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? 'Generating...' : 'Generate Word Cloud'}
//         </button>

//         {wordCloudUrl && (
//           <button
//             onClick={() => setShowCloud(!showCloud)}
//             className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
//           >
//             {showCloud ? 'Hide' : 'Show'} Word Cloud
//           </button>
//         )}
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="p-3 bg-red-50 text-red-600 rounded-md">
//           {error}
//         </div>
//       )}

//       {/* Display Word Cloud Image */}
//       {wordCloudUrl && showCloud && (
//         <div className="mt-2">
//           <img
//             src={wordCloudUrl}
//             alt="Server-Side Word Cloud"
//             className="border border-gray-300 bg-gray-50 max-w-full"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ServerWordCloud;










import { useState, useEffect } from 'react';

function ServerWordCloud({ BASE_URL, topWords = [], projectName = '' }) {
  const [wordCloudUrl, setWordCloudUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCloud, setShowCloud] = useState(true);

  // Sorting
  const [sortMode, setSortMode] = useState('freqDesc');

  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const [sortedWords, setSortedWords] = useState([]);

  const hasWords = Array.isArray(topWords) && topWords.length > 0;

  // 1) Generate Word Cloud
  async function handleWordCloudImage() {
    if (!hasWords) {
      setError('No top words to generate a cloud.');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      setWordCloudUrl(null);

      const response = await fetch(`${BASE_URL}/api/wordcloud-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ words: topWords, projectName })
      });
      if (!response.ok) {
        const errData = await response.text();
        throw new Error(errData || 'Failed to generate word cloud');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setWordCloudUrl(url);
      setShowCloud(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // 2) Sort topWords
  useEffect(() => {
    if (!hasWords) {
      setSortedWords([]);
      setPage(1);
      return;
    }
    const arr = [...topWords];
    switch (sortMode) {
      case 'freqAsc':
        arr.sort((a, b) => a[1] - b[1]);
        break;
      case 'freqDesc':
        arr.sort((a, b) => b[1] - a[1]);
        break;
      case 'alphaAsc':
        arr.sort((a, b) => a[0].localeCompare(b[0]));
        break;
      case 'alphaDesc':
        arr.sort((a, b) => b[0].localeCompare(a[0]));
        break;
      default:
        break;
    }
    setSortedWords(arr);
    setPage(1);
  }, [topWords, sortMode, hasWords]);

  // 3) Pagination logic
  const totalWords = sortedWords.length;
  const totalPages = Math.ceil(totalWords / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const displayedWords = sortedWords.slice(startIndex, startIndex + rowsPerPage);

  // 4) Global max frequency for bar widths
  const globalMaxFreq = hasWords
    ? Math.max(...sortedWords.map(item => item[1]))
    : 1;

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="space-y-4 mt-6">
      {/* Sort controls */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <button
          onClick={() => setSortMode('freqAsc')}
          className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
            ${sortMode === 'freqAsc' ? 'underline' : ''}`}
        >
          Freq Asc
        </button>
        <button
          onClick={() => setSortMode('freqDesc')}
          className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
            ${sortMode === 'freqDesc' ? 'underline' : ''}`}
        >
          Freq Desc
        </button>
        <button
          onClick={() => setSortMode('alphaAsc')}
          className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
            ${sortMode === 'alphaAsc' ? 'underline' : ''}`}
        >
          A → Z
        </button>
        <button
          onClick={() => setSortMode('alphaDesc')}
          className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
            ${sortMode === 'alphaDesc' ? 'underline' : ''}`}
        >
          Z → A
        </button>
      </div>

      {/* Rows per page */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Show:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            setRowsPerPage(val);
            setPage(1);
          }}
          className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md focus:outline-none"
        >
          <option value={5}>5 rows</option>
          <option value={10}>10 rows</option>
          <option value={20}>20 rows</option>
          <option value={50}>50 rows</option>
        </select>
        <span className="text-sm text-gray-600">words per page</span>
      </div>

      {/* Table of words */}
      <div className="overflow-auto bg-white border border-gray-200 rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Word</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Frequency</th>
            </tr>
          </thead>
          <tbody>
            {displayedWords.map(([word, freq], idx) => {
              // Fix: scale relative to the globalMaxFreq
              const barWidth = Math.round((freq / globalMaxFreq) * 100);

              return (
                <tr key={idx} className="border-b last:border-none hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800">{word}</td>
                  <td className="px-4 py-2 text-gray-800">
                    <div className="flex items-center space-x-2">
                      <span>{freq}</span>
                      <div
                        className="bg-indigo-200 h-2"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
            {!hasWords && (
              <tr>
                <td colSpan={2} className="px-4 py-2 text-gray-500">
                  No words to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {hasWords && totalPages > 1 && (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Word Cloud Buttons */}
      <div className="flex items-center space-x-2 mt-2">
        <button
          onClick={handleWordCloudImage}
          disabled={isLoading || !hasWords}
          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md 
                     hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Word Cloud'}
        </button>

        {wordCloudUrl && (
          <button
            onClick={() => setShowCloud(!showCloud)}
            className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
          >
            {showCloud ? 'Hide' : 'Show'} Word Cloud
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {/* Display Word Cloud Image */}
      {wordCloudUrl && showCloud && (
        <div className="mt-2">
          <img
            src={wordCloudUrl}
            alt="Server-Side Word Cloud"
            className="border border-gray-300 bg-gray-50 max-w-full"
          />
        </div>
      )}
    </div>
  );
}

export default ServerWordCloud;










































