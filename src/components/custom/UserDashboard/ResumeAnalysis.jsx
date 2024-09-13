import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { analyzeResume } from '@/services/ApiService';

const ResumeAnalysis = ({ userDetails }) => {
     const fileInputRef = useRef(null);
     const [file, setFile] = useState(null);
     const [jobDescription, setJobDescription] = useState('');
     const [analysisResult, setAnalysisResult] = useState(null);
     const [error, setError] = useState('');
     const [editorContent, setEditorContent] = useState(jobDescription);
     const quillRef = useRef(null);
     const isFreeUser = userDetails.authorities.length === 1 && userDetails.authorities[0].authority === 'FREE_USER'

     const handleFileChange = (e) => {
          setFile(e.target.files[0]);
     };

     const handleReset = () => {
          setEditorContent('')
          setJobDescription('')
          if (fileInputRef.current) {
               fileInputRef.current.value = '';
          }
          setFile(null)
          setAnalysisResult(null)
     }

     const handleEditorChange = (content) => {
          setEditorContent(content);
          setJobDescription(jobDescription)
     };

     const handleAnalyze = async () => {
          if (!file) {
               setError('Please upload a resume file');
               return;
          }

          const formData = new FormData();
          formData.append('file', file);
          formData.append('jobDescription', editorContent);

          const analyzedData = await analyzeResume(formData);
          setAnalysisResult(analyzedData)
     };

     return (
          <>
               <div className="flex flex-col h-screen bg-gray-900 text-gray-100 md:flex-row p-6 gap-6 mt-4">

                    {/* Left Side - JD and Resume Submission */}
                    <div className="w-full md:w-1/2 p-9 shadow-xl flex flex-col bg-gray-900 rounded-lg space-y-3 overflow-y-auto md:max-h-screen hidden-scrollbar">
                         {/* JD Submission */}
                         <div className="p-6 bg-transparent rounded-lg shadow-md">
                              <h3 className="text-2xl font-thin text-gray-300 mb-4">Job Description</h3>
                              <ReactQuill
                                   ref={quillRef}
                                   id="jobDescription"
                                   name="jobDescription"
                                   value={editorContent}
                                   onChange={handleEditorChange}
                                   className="editor-container bg-slate-300 text-black border border-transparent rounded-md w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out pr-16 hidden-scrollbar"
                                   placeholder="Job description"
                                   style={{ minHeight: '150px' }}
                              />
                              <button
                                   onClick={handleReset}
                                   className="bg-gray-500 hover:bg-gray-600 text-white mt-4 py-2 px-6 rounded-full text-sm font-medium transition ease-in-out duration-200"
                              >
                                   Reset
                              </button>
                         </div>

                         {/* Resume Submission */}
                         <div className="p-6 bg-transparent rounded-lg shadow-md">
                              <h3 className="text-2xl font-thin text-gray-100 mb-4">Upload Resume</h3>

                              <input
                                   ref={fileInputRef}
                                   type="file"
                                   onChange={handleFileChange}
                                   accept=".pdf,.docx"
                                   className="bg-gray-700 p-4 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                              />

                              {/* Button Container */}
                              <div className="flex justify-between space-x-4">
                                   {/* Submit Button */}
                                   <button
                                        disabled={!file || isFreeUser || !jobDescription}
                                        onClick={handleAnalyze}
                                        className={`py-2 px-6 rounded-full text-sm font-medium transition ease-in-out duration-200 ${file && !isFreeUser && jobDescription
                                             ? 'bg-green-500 hover:bg-green-600 text-white'
                                             : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                             }`}
                                   >
                                        Submit
                                   </button>
                              </div>
                         </div>

                    </div>

                    {/* Right Side - Full Height Card with Scores and Feedback */}
                    {!isFreeUser && <div className="w-full md:w-1/2 px-6 flex justify-center items-center mt-10 overflow-y-auto md:max-h-screen hidden-scrollbar">
                         <div className="bg-gray-900 rounded-lg shadow-lg py-6 h-full w-full flex flex-col justify-between">

                              {/* Analysis Results */}
                              <div className="flex-1 mb-8">
                                   <h2 className="text-2xl font-thin text-gray-100 mb-6 text-center">Analysis Result
                                        {!isFreeUser && <span className="ml-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 text-sm font-bold px-2 py-1 rounded-full shadow-lg">
                                             <svg className="inline-block w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                             </svg>
                                             Premium
                                        </span>}
                                   </h2>

                                   {error && <p className="text-red-500 text-center">{error}</p>}

                                   {analysisResult ? (
                                        <div className="p-6 rounded-xl shadow-lg">
                                             {/* Loop of Scores in a Circular Format */}
                                             <div className="grid grid-cols-3 gap-8 mb-8">
                                                  <div className="flex flex-col items-center">
                                                       <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-lime-400 text-white rounded-full flex items-center justify-center text-3xl font-extrabold shadow-lg hover:shadow-green-400 transition duration-300">
                                                            {analysisResult.matchScore}%
                                                       </div>
                                                       <p className="mt-2 text-base font-semibold text-gray-200">Match Score</p>
                                                  </div>
                                                  <div className="flex flex-col items-center">
                                                       <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-400 text-white rounded-full flex items-center justify-center text-3xl font-extrabold shadow-lg hover:shadow-yellow-400 transition duration-300">
                                                            {analysisResult.matchedKeywords.length}
                                                       </div>
                                                       <p className="mt-2 text-base font-semibold text-gray-200">Matched Keywords</p>
                                                  </div>
                                                  <div className="flex flex-col items-center">
                                                       <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full flex items-center justify-center text-3xl font-extrabold shadow-lg hover:shadow-red-400 transition duration-300">
                                                            {analysisResult.missingKeywords.length}
                                                       </div>
                                                       <p className="mt-2 text-base font-semibold text-gray-200">Missing Keywords</p>
                                                  </div>
                                             </div>

                                             {/* Matched and Missing Keywords */}
                                             <div className="space-y-5 text-gray-100">
                                                  {/* Matched Keywords */}
                                                  <p className="flex flex-col">
                                                       <span className="text-lg font-semibold text-gray-200 leading-tight">
                                                            Matched Keywords
                                                       </span>
                                                       <span className="mt-1 text-gray-400 font-light text-base tracking-wide">
                                                            {analysisResult.matchedKeywords.length > 0
                                                                 ? analysisResult.matchedKeywords.join(', ')
                                                                 : 'None'}
                                                       </span>
                                                  </p>

                                                  {/* Missing Keywords */}
                                                  <p className="flex flex-col">
                                                       <span className="text-lg font-semibold text-gray-200 leading-tight">
                                                            Missing Keywords
                                                       </span>
                                                       <span className="mt-1 text-gray-400 font-light text-base tracking-wide">
                                                            {analysisResult.missingKeywords.length > 0
                                                                 ? analysisResult.missingKeywords.join(', ')
                                                                 : 'None'}
                                                       </span>
                                                  </p>
                                             </div>

                                        </div>

                                   ) : (
                                        <p className="text-gray-400 text-center">No analysis result available. Please submit a resume and job description for analysis.</p>
                                   )}
                              </div>
                         </div>
                    </div>}

                    {isFreeUser && <div className="bg-gray-900 w-full md:w-1/2 px-6 flex justify-center items-center mt-10 overflow-y-auto md:max-h-screen hidden-scrollbar rounded-xl shadow-lg">
                         <div className="text-center p-8 max-w-md mx-auto bg-gray-800 rounded-lg shadow-md">
                              <h2 className="text-4xl text-gray-200 mb-6 font-thin">
                                   Analysis Result
                              </h2>
                              <p className="text-red-300 text-sm text-left font-thin mb-6">
                                   Resume Analysis feature is available only to premium users. Please upgrade to access this functionality and enjoy additional benefits.
                              </p>
                              <button className="bg-blue-500 text-white py-2 px-4 text-xs focus:ring-opacity-50 rounded-full font-semibold">
                                   Upgrade To Premium
                              </button>
                         </div>
                    </div>}

               </div>

          </>
     );
};

export default ResumeAnalysis;
