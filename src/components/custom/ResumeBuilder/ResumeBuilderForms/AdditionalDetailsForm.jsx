import React, { useState, useEffect } from 'react';
import { saveAdditionalDetails, getAdditionalDetails, updateAdditionalDetails } from '@/services/ApiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdditionalDetailsForm = ({ additionalDetails, setAdditionalDetails, addedAdditionalDetails, setAddedAdditionalDetails, resume, resumeDetails }) => {
     const [isLoading, setIsLoading] = useState(false)

     useEffect(() => {
          getResumeAddtionalDetails(resume.id);
     }, []);

     const getResumeAddtionalDetails = async () => {
          try {
               setIsLoading(true)
               const ad = await getAdditionalDetails(resume.id)
               if ((ad.phoneNumber && ad.phoneNumber.length > 0) ||
                    (ad.linkedInProfileLink && ad.linkedInProfileLink.length > 0) ||
                    (ad.githubLink && ad.githubLink.length > 0)) {
                    setAdditionalDetails(ad);
                    setAddedAdditionalDetails(ad)
               }
          } catch (error) {
               toast.error(error?.response?.data?.errorMsg, {
                    style: {
                         backgroundColor: '#1F2937',
                         color: '#fff'
                    },
               });
          } finally {
               setIsLoading(false)
          }
     }

     const areAllFieldsFilled = (additionalDetails) => {
          return (additionalDetails.phoneNumber && additionalDetails.phoneNumber.length > 0) ||
               (additionalDetails.linkedInProfileLink && additionalDetails.linkedInProfileLink.length > 0) ||
               (additionalDetails.githubLink && additionalDetails.githubLink.length > 0);
     }

     const handleAdditionalDetailChange = (e) => {
          setAdditionalDetails({ ...additionalDetails, [e.target.name]: e.target.value });
     };

     const handleAddAdditionalDetails = async () => {
          try {
               setIsLoading(true)
               if (areAllFieldsFilled(addedAdditionalDetails)) {
                    await updateAdditionalDetails(resume.id, additionalDetails.id, additionalDetails)
                    setAdditionalDetails(additionalDetails);
                    setAddedAdditionalDetails(additionalDetails)
               } else {
                    const ad = await saveAdditionalDetails(additionalDetails, resume.id)
                    setAdditionalDetails(ad); //temporary change
                    setAddedAdditionalDetails(ad)
               }
          } catch (error) {
               toast.error(error?.response?.data?.errorMsg, {
                    style: {
                         backgroundColor: '#1F2937',
                         color: '#fff'
                    },
               });
          } finally {
               setIsLoading(false)
          }
     };

     return (
          <div className='scroll-smooth'>
               {isLoading && (
                    <div className="loader-overlay">
                         <div className="loader"></div>
                    </div>
               )}
               <>
                    <div className="mb-6">
                         <label className="block text-gray-300 text-sm md:text-base mb-2 mt-3" htmlFor="phoneNumber">
                              Phone Number
                         </label>
                         <input
                              id="phoneNumber"
                              name="phoneNumber"
                              value={additionalDetails.phoneNumber || ''}
                              onChange={handleAdditionalDetailChange}
                              className="bg-transparent border-b-2 text-gray-100 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                              placeholder="Phone Number"
                         />

                         <label className="block text-gray-300 text-sm md:text-base mb-2 mt-5" htmlFor="githubLink">
                              Github Link
                         </label>
                         <input
                              id="githubLink"
                              name="githubLink"
                              value={additionalDetails.githubLink || ''}
                              onChange={handleAdditionalDetailChange}
                              className="bg-transparent border-b-2 text-gray-100 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                              placeholder="Github Link"
                         />

                         <label className="mt-5 block text-gray-300 text-sm md:text-base mb-2" htmlFor="linkedInProfileLink">
                              LinkedIn Profile Link
                         </label>
                         <input
                              id="linkedInProfileLink"
                              name="linkedInProfileLink"
                              value={additionalDetails.linkedInProfileLink || ''}
                              onChange={handleAdditionalDetailChange}
                              className="bg-transparent border-b-2 text-gray-100 rounded-md w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out mb-6"
                              placeholder="LinkedIn Profile Link"
                         />

                         <div className="flex space-x-4">
                              {areAllFieldsFilled(addedAdditionalDetails) ? (
                                   <>
                                        <button
                                             onClick={handleAddAdditionalDetails}
                                             className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                                        >
                                             <span>Update</span>
                                        </button>
                                   </>
                              ) : (areAllFieldsFilled(additionalDetails) &&
                                   <button
                                        onClick={handleAddAdditionalDetails}
                                        className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                                   >
                                        <span>Add</span>
                                   </button>
                              )
                              }
                         </div>
                    </div>
               </>
          </div>
     );
};

export default AdditionalDetailsForm;
