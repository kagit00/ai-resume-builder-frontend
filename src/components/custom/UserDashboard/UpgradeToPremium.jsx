import { useState } from 'react';
import PricingModal from '../UpgradeToPremium/PricingModal';
import PropTypes from 'prop-types';

const UpgradeToPremium = ({ isOpen, onClose, userId }) => {
     const [showPricingModal, setShowPricingModal] = useState(false);
     const handleUpgrade = () => setShowPricingModal(true);

     if (!isOpen) return null;

     return (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90">
               {/* First Modal (Original) */}
               {!showPricingModal && (
                    <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-sm w-full">
                         {/* Icon */}
                         <div className="flex justify-center mb-6">
                              <svg
                                   className="w-16 h-16 text-indigo-600"
                                   xmlns="http://www.w3.org/2000/svg"
                                   fill="none"
                                   viewBox="0 0 24 24"
                                   stroke="currentColor"
                              >
                                   <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                   />
                              </svg>
                         </div>

                         {/* Title */}
                         <h2 className="text-3xl font-thin text-center text-white mb-4">
                              Resume Saved!
                         </h2>

                         {/* Message */}
                         <p className="text-white text-center text-sm font-thin mb-6">
                              Your resume has been saved successfully. To download your resume, please upgrade to premium.
                         </p>

                         {/* Buttons */}
                         <div className="flex justify-center space-x-6">
                              <button
                                   onClick={handleUpgrade}
                                   className="bg-indigo-600 hover:bg-indigo-700 text-gray-200 font-semibold px-4 py-2 text-sm rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                              >
                                   Upgrade
                              </button>
                              <button
                                   onClick={onClose}
                                   className="bg-gray-400 text-gray-200 font-semibold px-4 py-2 text-sm rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                              >
                                   Cancel
                              </button>
                         </div>
                    </div>
               )}

               {/* Second Modal (Pricing Plans) */}
               {showPricingModal && (
                    <div className="bg-transparent p-8 max-w-md w-full">
                         <PricingModal isOpen={isOpen} setShowPricingModal={setShowPricingModal} userId={userId}/>
                    </div>
               )}
          </div>
     );
};

UpgradeToPremium.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    userId: PropTypes.number,
};

export default UpgradeToPremium;


