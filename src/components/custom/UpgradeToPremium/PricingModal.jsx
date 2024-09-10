import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const PricingModal = ({ isOpen, setShowPricingModal, userId }) => {
     if (!isOpen) return null;
     const handleBack = () => setShowPricingModal(false);
     const navigate = useNavigate()

     const subscribe = () => {
          navigate('/user/premium/subscribe', { state: userId })
     }

     return (
          <>
               {/* Back Button */}
               <div className="flex justify-start mb-4">
                    <button
                         onClick={handleBack}
                         className="text-sm text-blue-400 hover:text-blue-500 mb-6 transition-colors duration-300 flex items-center"
                    >
                        &larr; Back
                    </button>
               </div>

               <div className="overflow-auto hidden-scrollbar">
                    <section id="pricing" className="bg-transparent">
                         <div className="container mx-auto px-4">
                              <h3 className="text-lg md:text-xl lg:text-2xl font-thin text-white mb-6">Pricing Plans</h3>
                              <div className="flex flex-col md:flex-row justify-center items-stretch space-y-4 md:space-y-0 md:space-x-4">
                                   {/* Basic Plan */}
                                   <div className="bg-transparent p-3 rounded-lg shadow-lg w-full max-w-sm flex flex-col justify-between">
                                        <div className='p-2'>
                                             <h4 className="text-md font-thin mb-1 text-gray-100">Basic Plan</h4>
                                             <p className="text-gray-300 text-xs mb-2">Rs. 0/month</p>
                                             <ul className="text-left text-gray-400 mb-2 font-semibold text-xs space-y-1 list-disc">
                                                  <li>Unlimited Resume Creation</li>
                                                  <li>Basic AI features</li>
                                                  <li>Email support</li>
                                                  <li>Unlimited Resume Edit</li>
                                             </ul>
                                        </div>
                                        <button className="bg-gray-600 text-white py-1 px-2 rounded-md text-xs font-semibold cursor-none">
                                             Active
                                        </button>
                                   </div>

                                   {/* Premium Plan */}
                                   <div className="bg-transparent p-3 rounded-lg shadow-lg w-full max-w-sm flex flex-col justify-between">
                                        <div className='p-2'>
                                             <h4 className="text-md font-thin mb-1 text-white">Premium Plan</h4>
                                             <p className="text-gray-300 text-xs mb-2">Rs. 20/month</p>
                                             <ul className="text-left text-gray-400 mb-2 font-semibold text-xs space-y-1 list-disc">
                                                  <li>Unlimited Resume Creation</li>
                                                  <li>Basic AI features</li>
                                                  <li>Email support</li>
                                                  <li>Unlimited Resume Edit</li>
                                                  <li>Dowload Your Resumes</li>
                                                  <li>Share Resumes</li>
                                             </ul>
                                        </div>
                                        <button onClick={() => subscribe()} className="bg-blue-500 text-white py-1 px-2 rounded-md shadow-sm transform hover:scale-105 transition-transform duration-300 text-xs font-semibold">
                                             Subscribe
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </section>
               </div>
        </>
     );
};

export default PricingModal;
