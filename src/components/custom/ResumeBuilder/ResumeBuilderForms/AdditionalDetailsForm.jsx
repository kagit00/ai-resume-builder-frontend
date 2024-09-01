import React, { useState, useEffect } from 'react';
import { saveAdditionalDetails, getAdditionalDetails, updateAdditionalDetails } from '@/services/ApiService';

const AdditionalDetailsForm = ({ additionalDetails, setAdditionalDetails, addedAdditionalDetails, setAddedAdditionalDetails, resume, resumeDetails }) => {

     useEffect(() => {
          getResumeAddtionalDetails(resume.id);
     }, []);

     const getResumeAddtionalDetails = async () => {
          const ad = await getAdditionalDetails(resume.id)
          if ((ad.phoneNumber && ad.phoneNumber.length > 0) ||
               (ad.linkedInProfileLink && ad.linkedInProfileLink.length > 0) ||
               (ad.githubLink && ad.githubLink.length > 0)) {
               setAdditionalDetails(ad);
               setAddedAdditionalDetails(ad)
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
          if (resumeDetails.isEditMode || areAllFieldsFilled(addedAdditionalDetails)) {
               console.log ()
               await updateAdditionalDetails(resume.id, additionalDetails.id, additionalDetails)
               setAdditionalDetails(additionalDetails);
               setAddedAdditionalDetails(additionalDetails)
          } else {
               const ad = await saveAdditionalDetails(additionalDetails, resume.id)
               setAdditionalDetails(ad); //temporary change
               setAddedAdditionalDetails(ad)
          }
     };

     return (
          <div>
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
                              className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
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
                              className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
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
                              className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out mb-6"
                              placeholder="LinkedIn Profile Link"
                         />

                         <div className="flex space-x-4">
                              {(resumeDetails.isEditMode && additionalDetails) ? (
                                   <>
                                        <button
                                             onClick={handleAddAdditionalDetails}
                                             className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                                        >
                                             <span>Update</span>
                                        </button>
                                   </>
                              ) : (
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
