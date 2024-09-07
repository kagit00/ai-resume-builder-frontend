import React, { useState } from 'react';

const UpgradeToPremium = ({ isOpen, onClose, onUpgrade }) => {
     if (!isOpen) return null; // Only render if modal is open

     return (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-700 bg-opacity-80">
               <div className="bg-blue-100 p-8 rounded-xl shadow-2xl max-w-sm w-full">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                         <svg className="w-16 h-16 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                         </svg>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-thin text-center text-black mb-4">Resume Saved!</h2>

                    {/* Message */}
                    <p className="text-black text-center text-sm font-normal mb-6">
                         Your resume has been saved successfully. To download your resume, please upgrade to premium.
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-center space-x-6">
                         <button
                              onClick={onUpgrade}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 text-sm rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                         >
                              Upgrade
                         </button>
                         <button
                              onClick={onClose}
                              className="bg-gray-400 text-white font-semibold px-4 py-2 text-sm rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                         >
                              Cancel
                         </button>
                    </div>
               </div>
          </div>

     );
};

export default UpgradeToPremium;

