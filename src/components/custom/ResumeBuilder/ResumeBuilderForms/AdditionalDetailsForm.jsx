import React, { useState, useEffect } from 'react';
import { saveAdditionalDetails, getAdditionalDetails, updateAdditionalDetails } from '@/services/ApiService';
import { areAllFieldsFilled } from '@/utils/BasicUtils';

const AdditionalDetailsForm = ({ additionalDetails, setAdditionalDetails, additionalDetailsList, setAdditionalDetailsList, editingIndex, setEditingIndex, resume, resumeDetails }) => {
     const [additionalDetailsId, setAdditionalDetailsId] = useState('')

     useEffect(() => {
          if (resumeDetails.isEditMode) {
               getResumeAddtionalDetails(resume.id);
          }
     }, []);

     const getResumeAddtionalDetails = async () => {
          const ad = await getAdditionalDetails(resume.id)
          setAdditionalDetails(ad);
     }

     const handleAdditionalDetailChange = (e) => {
          setAdditionalDetails({ ...additionalDetails, [e.target.name]: e.target.value });
     };

     const handleAddAdditionalDetails = async () => {
          if (editingIndex !== null || resumeDetails.isEditMode) {
               const updatedAdditionalDetailsList = additionalDetailsList.map((detail, index) =>
                    index === editingIndex ? additionalDetails : detail
               );
               await updateAdditionalDetails(resume.id, additionalDetails.id, additionalDetails)
               setAdditionalDetails(additionalDetails); //temporry change
               setAdditionalDetailsList(updatedAdditionalDetailsList);
               setEditingIndex(null);
          } else {
               const ad = await saveAdditionalDetails(additionalDetails, resume.id)
               setAdditionalDetails(ad); //temporary change
               setAdditionalDetailsList([...additionalDetailsList, ad]);
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
                              {areAllFieldsFilled(additionalDetails) && (
                                   (resumeDetails.isEditMode || editingIndex !== null) ? (
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
                              )}
                         </div>
                    </div>
               </>
          </div>
     );
};

export default AdditionalDetailsForm;
