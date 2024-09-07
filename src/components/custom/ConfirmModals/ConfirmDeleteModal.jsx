import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
     if (!isOpen) return null;

     return (
          <div className="fixed inset-0 flex items-center justify-center z-50">
               <div className="bg-slate-800 opacity-80 absolute inset-0" onClick={onClose}></div>
               <div className="bg-gray-700 p-8 rounded-lg shadow-2xl z-10 transform transition-transform scale-100">
                    <div className="flex items-center mb-4">
                         <div className="p-2 bg-red-600 rounded-full shadow-lg animate-pulse mr-4">
                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   fill="none"
                                   viewBox="0 0 24 24"
                                   strokeWidth="2"
                                   stroke="currentColor"
                                   className="w-10 h-10 text-white"
                              >
                                   <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 13h6m2 0h1M6 13H5m1-6h12m-1-2H7m10 2H7l1 12h8l1-12z"
                                   />
                              </svg>
                         </div>
                         <h2 className="text-2xl font-semibold text-white">Are you sure?</h2>
                    </div>
                    <p className="text-gray-300 mb-5 text-sm font-normal">
                         Do you really want to delete this resume? This action cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-4">
                         <button
                              className="font-semibold py-2 px-6 text-gray-300 text-sm transition-colors duration-300 ease-in-out transform hover:scale-105 hover:text-gray-100"
                              onClick={onClose}
                         >
                              Cancel
                         </button>
                         <button
                              className="bg-gradient-to-r from-red-500 to-red-700 text-sm text-white font-semibold py-2 px-6 rounded-full hover:from-red-600 hover:to-red-800 transition-colors duration-300 ease-in-out transform hover:scale-105 shadow-md"
                              onClick={onConfirm}
                         >
                              Delete
                         </button>
                    </div>
               </div>
          </div>

     );
};

export default ConfirmDeleteModal;
