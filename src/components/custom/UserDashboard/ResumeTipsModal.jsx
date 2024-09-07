import React from 'react';

const ResumeTipsModal = ({ onClose }) => {
     return (
          <div className="fixed inset-0 flex items-center justify-center bg-slate-950 bg-opacity-80 z-50">
               <div className="relative bg-blue-100 text-white rounded-lg shadow-2xl w-full max-w-sm p-6">
                    {/* Close Button */}
                    <button
                         onClick={onClose}
                         className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none transition-colors duration-300"
                    >
                         &times;
                    </button>

                    {/* Heading */}
                    <h2 className="text-lg md:text-3xl mb-4 font-thin text-black">Resume Creation Tips</h2>

                    {/* Icon (Smaller size for compact design) */}
                    <div className="flex justify-center mb-4">
                         <svg
                              width="50"
                              height="50"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-blue-500"
                         >
                              <path
                                   d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                                   fill="currentColor"
                              />
                         </svg>
                    </div>

                    {/* Tips List */}
                    <ul className="space-y-3">
                         <li className="flex items-start space-x-2">
                              <span className="text-blue-500 text-xl">&#8226;</span>
                              <p className="text-black font-semibold text-sm">Tailor your resume to the job description.</p>
                         </li>
                         <li className="flex items-start space-x-2">
                              <span className="text-blue-500 text-xl">&#8226;</span>
                              <p className="text-black font-semibold text-sm">Use strong action verbs.</p>
                         </li>
                         <li className="flex items-start space-x-2">
                              <span className="text-blue-500 text-xl">&#8226;</span>
                              <p className="text-black font-semibold text-sm">Quantify your achievements.</p>
                         </li>
                         <li className="flex items-start space-x-2">
                              <span className="text-blue-500 text-xl">&#8226;</span>
                              <p className="text-black font-semibold text-sm">Keep your resume concise.</p>
                         </li>
                         <li className="flex items-start space-x-2">
                              <span className="text-blue-500 text-xl">&#8226;</span>
                              <p className="text-black font-semibold text-sm">Proofread for errors.</p>
                         </li>
                    </ul>
               </div>
          </div>
     );
};

export default ResumeTipsModal;
