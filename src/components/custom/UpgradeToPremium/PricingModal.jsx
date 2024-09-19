import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PlanCard from "./PlanCard";

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
                    <section id="pricing">
                         <div className="container mx-auto px-4">
                              <h3 className="text-xl md:text-2xl lg:text-3xl font-thin text-white mb-6">
                                   Pricing Plans
                              </h3>
                              <div className="flex flex-col md:flex-row justify-center items-stretch space-y-4 md:space-y-0 md:space-x-4">
                                   {/* Reusable Plan Component */}
                                   <PlanCard
                                        title="Basic @ Rs. 0"
                                        subHeader="Lifetime Access With Basic Features"
                                        features={[
                                             'Unlimited Resume Creation',
                                             'AI features',
                                             'Email support',
                                             'Unlimited Resume Edit',
                                        ]}
                                        buttonLabel="Active"
                                        isActive={true}
                                   />

                                   <PlanCard
                                        title="Premium @ Rs. 20"
                                        subHeader="Lifetime Access With Advanced Features"
                                        features={[
                                             'All Basic Featues',
                                             'Analyze Your Resumes & Get Insights',
                                             'Download Your Resumes',
                                             'Share Resumes on Social',
                                        ]}
                                        buttonLabel="Subscribe"
                                        onClick={subscribe}
                                   />
                              </div>
                         </div>
                    </section>
               </div>
          </>

     );
};

export default PricingModal;
