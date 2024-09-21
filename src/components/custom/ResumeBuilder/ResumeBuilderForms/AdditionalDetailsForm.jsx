import React, { useState, useEffect } from 'react';
import { saveAdditionalDetails, getAdditionalDetails, updateAdditionalDetails } from '@/services/ApiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdditionalDetailsForm = ({ additionalDetails, setAdditionalDetails, addedAdditionalDetails, setAddedAdditionalDetails, resume }) => {
     const [isLoading, setIsLoading] = useState(false)

     useEffect(() => {
          getResumeAddtionalDetails(resume.id);
     }, []);
     console.log({ addedAdditionalDetails }, { additionalDetails })

     const isValidMobileNumber = () => {
          const regex = /^\+?[1-9]\d{1,14}$/
          return regex.test(additionalDetails.phoneNumber)
     }

     const isValidGithubLink = () => {
          const regex = /^https:\/\/github\.com\/[a-zA-Z0-9-]+$/
          return regex.test(additionalDetails.githubLink)
     }

     const handleReset = () => {
          setAdditionalDetails({ phoneNumber: '', githubLink: '', linkedInProfileLink: '' })
     }

     const isValidLinkedIn = () => {
          const regex = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/
          return regex.test(additionalDetails.linkedInProfileLink)
     }

     const getResumeAddtionalDetails = async () => {
          try {
               setIsLoading(true)
               const ad = await getAdditionalDetails(resume.id)
               setAdditionalDetails(ad);
               setAddedAdditionalDetails(ad)
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

     const areAllFieldsValid = (additionalDetails) => {
          return isValidMobileNumber(additionalDetails.phoneNumber) && isValidLinkedIn(additionalDetails.linkedInProfileLink) && isValidGithubLink(additionalDetails.githubLink);
     }

     const areAllFieldsEmpty = (details) => {
          return !details.githubLink && !details.linkedInProfileLink && !details.phoneNumber;
     }

     const handleAdditionalDetailChange = (e) => {
          setAdditionalDetails({ ...additionalDetails, [e.target.name]: e.target.value });
     };

     const handleAddAdditionalDetails = async () => {
          try {
               setIsLoading(true)
               if (!areAllFieldsEmpty(addedAdditionalDetails)) {
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

                              <>
                                   {!areAllFieldsEmpty(addedAdditionalDetails) && (
                                        <button
                                             onClick={handleAddAdditionalDetails}
                                             className={`${areAllFieldsValid(additionalDetails)
                                                  ? "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 transform hover:scale-105"
                                                  : "opacity-50 cursor-not-allowed bg-gray-600"
                                                  } text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2`}
                                             disabled={!areAllFieldsValid(additionalDetails)}
                                        >
                                             <span>Update</span>
                                        </button>
                                   )}

                                   {areAllFieldsEmpty(addedAdditionalDetails) && <button
                                        onClick={handleAddAdditionalDetails}
                                        className={`${areAllFieldsValid(additionalDetails)
                                             ? "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 transform hover:scale-105"
                                             : "opacity-50 cursor-not-allowed bg-gray-600"
                                             } text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2`}
                                        disabled={!areAllFieldsValid(additionalDetails)}
                                   >
                                        <span>Add</span>
                                   </button>}

                              </>
                              <button
                                   onClick={handleReset}
                                   className='transform hover:scale-105 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2'
                              >
                                   <span>Reset</span>
                              </button>
                         </div>
                    </div>
               </>
          </div>
     );
};

export default AdditionalDetailsForm;
