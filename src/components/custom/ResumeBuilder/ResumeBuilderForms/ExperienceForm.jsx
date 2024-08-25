import React from 'react';
import { getGenerateSuggestions } from '@/services/ApiService';
import AISuggestionsButton from '../Buttons/AISuggestionButton.jsx'
import { getGoogleOauth2Token } from '@/utils/AuthUtils.js';

const ExperienceForm = ({ experience, setExperience, experienceList, setExperienceList, editingIndex, setEditingIndex, resumeTitle }) => {
     const [suggestions, setSuggestions] = React.useState('');
     const accessToken = getGoogleOauth2Token()
     const sectionType = 'experience'

     const handleExperienceDetailChange = (e) => {
          setExperience({ ...experience, [e.target.name]: e.target.value });
     };

     const handleGenerateSuggestions = async () => {
          const suggestions = await getGenerateSuggestions(resumeTitle, sectionType, accessToken);
          setExperience(prevExperience => { return { ...prevExperience, details: suggestions.generatedSuggestion }; });
     };

     const handleAddExperience = () => {
          if (editingIndex !== null) {
               const updatedExperienceList = experienceList.map((exp, index) =>
                    index === editingIndex ? experience : exp
               );
               setExperienceList(updatedExperienceList);
               setEditingIndex(null);
          } else {
               setExperienceList([...experienceList, experience]);
          }
          setExperience({ jobTitle: '', jobLocation: '', companyName: '', startYear: '', endYear: '', details: '' });
     };

     const handleEditExperience = (index) => {
          setExperience(experienceList[index]);
          setEditingIndex(index);
     };

     const handleDeleteExperience = (index) => {
          const updatedExperienceList = experienceList.filter((_, i) => i !== index);
          setExperienceList(updatedExperienceList);
          if (editingIndex !== null && editingIndex >= index) {
               setEditingIndex(editingIndex === index ? null : editingIndex - 1);
          }
     };

     return (
          <div>
               <div className="flex flex-wrap gap-2 mb-4">
                    {experienceList.map((exp, index) => (
                         <span
                              key={index}
                              className="bg-zinc-900 text-gray-100 py-1 px-3 rounded-full flex items-center space-x-2 cursor-pointer transition duration-200 ease-in-out"
                         >
                              <span onClick={() => handleEditExperience(index)}>
                                   {exp.jobTitle} at {exp.companyName}
                              </span>
                              <button
                                   className="text-red-500 hover:text-red-700 focus:outline-none"
                                   onClick={() => handleDeleteExperience(index)}
                              >
                                   &times;
                              </button>
                         </span>
                    ))}
               </div>

               <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="w-full md:w-1/2">
                         <div>
                              <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="jobTitle">
                                   Job Title
                              </label>
                              <input
                                   id="jobTitle"
                                   name="jobTitle"
                                   value={experience.jobTitle}
                                   onChange={handleExperienceDetailChange}
                                   className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                                   placeholder="Job Title"
                              />
                         </div>
                    </div>

                    <div className="w-full md:w-1/2">
                         <div>
                              <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="jobLocation">
                                   Job Location
                              </label>
                              <input
                                   id="jobLocation"
                                   name="jobLocation"
                                   value={experience.jobLocation}
                                   onChange={handleExperienceDetailChange}
                                   className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                                   placeholder="Job Location"
                              />
                         </div>
                    </div>
               </div>

               <div className="mb-6">
                    <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="companyName">
                         Company Name
                    </label>
                    <input
                         id="companyName"
                         name="companyName"
                         value={experience.companyName}
                         onChange={handleExperienceDetailChange}
                         className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                         placeholder="Company Name"
                    />
               </div>

               <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="w-full md:w-1/2">
                         <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="startYear">
                              Start Year
                         </label>
                         <input
                              id="startYear"
                              name="startYear"
                              value={experience.startYear}
                              onChange={handleExperienceDetailChange}
                              type="number"
                              className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                              placeholder="Start Year"
                         />
                    </div>

                    <div className="w-full md:w-1/2">
                         <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="endYear">
                              End Year (or Present)
                         </label>
                         <input
                              id="endYear"
                              name="endYear"
                              value={experience.endYear}
                              onChange={handleExperienceDetailChange}
                              type="text"
                              className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                              placeholder="End Year or Present"
                         />
                    </div>
               </div>

               <div className="relative mb-6">
                    <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="details">
                         Details
                    </label>
                    <div className="relative">
                         <textarea
                              id="details"
                              name="details"
                              value={experience.details}
                              onChange={handleExperienceDetailChange}
                              className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out pr-16 hidden-scrollbar"
                              rows="5"
                              placeholder="Enter experience details or click on the bottom-right button to write with AI"
                         />
                         <AISuggestionsButton onClick={handleGenerateSuggestions} />
                    </div>
               </div>

               <button
                    onClick={handleAddExperience}
                    className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
               >
                    <span>
                         {editingIndex !== null ? 'Update Experience' : 'Add Experience'}
                    </span>
               </button>
          </div>
     );
};

export default ExperienceForm;
