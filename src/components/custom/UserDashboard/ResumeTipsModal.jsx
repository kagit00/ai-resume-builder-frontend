import React from 'react';

const ResumeTipsModal = ({ onClose }) => {
     return (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50">
               <div className=" text-white rounded-lg shadow-xl w-full max-w-md bg-gradient-to-l from-zinc-900 to-black p-8 relative">
                    <button
                         onClick={onClose}
                         className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none transition-colors duration-300"
                    >
                         &times;
                    </button>
                    <h2 className="text-xl md:text-xl lg:text-2xl mb-6 font-normal text-white">Resume Creation Tips</h2>
                    <div className="flex justify-center mb-6">
                         <svg
                              width="80"
                              height="80"
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
                    <ul className="space-y-4">
                         <li className="flex items-center space-x-3">
                              <span className="text-blue-500 text-xl">&#8226;</span>
                              <p className="text-gray-300 text-base">Tailor your resume to the job description.</p>
                         </li>
                         <li className="flex items-center space-x-3">
                              <span className="text-blue-500 text-xl">&#8226;</span>
                              <p className="text-gray-300 text-base">Use strong action verbs.</p>
                         </li>
                         <li className="flex items-center space-x-3">
                              <span className="text-blue-500 text-xl">&#8226;</span>
                              <p className="text-gray-300 text-base">Quantify your achievements.</p>
                         </li>
                         <li className="flex items-center space-x-3">
                              <span className="text-blue-500 text-xl">&#8226;</span>
                              <p className="text-gray-300 text-base">Keep your resume concise.</p>
                         </li>
                         <li className="flex items-center space-x-3">
                              <span className="text-blue-500 text-xl">&#8226;</span>
                              <p className="text-gray-300 text-base">Proofread for errors.</p>
                         </li>
                    </ul>
               </div>
          </div>
     );
};

export default ResumeTipsModal;
