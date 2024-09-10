import React from 'react';

const ResumeTipsModal = ({ onClose }) => {
     return (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
               <div className="relative bg-transparent text-white rounded-lg shadow-2xl w-full max-w-sm p-6">
                    {/* Close Button */}
                    <button
                         onClick={onClose}
                         className="absolute top-4 right-4 text-gray-300 hover:text-white focus:outline-none transition-colors duration-300"
                    >
                         &times;
                    </button>

                    {/* Heading */}
                    <h2 className="text-lg md:text-2xl mb-4 font-thin text-gray-200">Resume Creation Tips</h2>

                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                         <svg
                              width="60"
                              height="60"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-gray-400"
                         >
                              <path
                                   d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                                   fill="currentColor"
                              />
                         </svg>
                    </div>

                    {/* Tips List */}
                    <ul className="space-y-4 font-semibold">
                         <li className="flex items-start space-x-2">
                              <span className="text-gray-400 text-xl">&#8226;</span>
                              <p className="text-gray-300 text-sm">Tailor your resume to the job description.</p>
                         </li>
                         <li className="flex items-start space-x-2">
                              <span className="text-gray-400 text-xl">&#8226;</span>
                              <p className="text-gray-300 text-sm">Use strong action verbs.</p>
                         </li>
                         <li className="flex items-start space-x-2">
                              <span className="text-gray-400 text-xl">&#8226;</span>
                              <p className="text-gray-300 text-sm">Quantify your achievements.</p>
                         </li>
                         <li className="flex items-start space-x-2">
                              <span className="text-gray-400 text-xl">&#8226;</span>
                              <p className="text-gray-300 text-sm">Keep your resume concise.</p>
                         </li>
                         <li className="flex items-start space-x-2">
                              <span className="text-gray-400 text-xl">&#8226;</span>
                              <p className="text-gray-300 text-sm">Proofread for errors.</p>
                         </li>
                    </ul>
               </div>
          </div>
     );
};

export default ResumeTipsModal;
