import React, { useState, useEffect } from 'react';
import { getGenerateSuggestions, saveExperience, updateExperience, deleteExperience, getExperiences } from '@/services/ApiService';
import AISuggestionsButton from '../Buttons/AISuggestionButton.jsx'
import CustomDatePicker from '../../CustomDatePicker/CustomDatePicker';
import { areAllFieldsFilled } from '@/utils/BasicUtils';
import { FiTrash2 } from 'react-icons/fi';

const ExperienceForm = ({ experience, setExperience, experienceList, setExperienceList, editingIndex, setEditingIndex, resume, resumeDetails }) => {
     const [suggestions, setSuggestions] = React.useState('');
     const [experienceId, setExperienceId] = React.useState('');
     const sectionType = 'experience'

     useEffect(() => {
          if (resumeDetails.isEditMode) {
               getExperience()
          }
     }, []);

     const getExperience = async () => {
          const experiences = await getExperiences(resume.id)
          setExperienceList(experiences)
     }

     const handleExperienceDetailChange = (e) => {
          setExperience({ ...experience, [e.target.name]: e.target.value });
     };

     const handleGenerateSuggestions = async () => {
          const suggestions = await getGenerateSuggestions(resume.title, sectionType);
          setExperience(prevExperience => { return { ...prevExperience, description: suggestions.generatedSuggestion }; });
     };

     const handleAddExperience = async () => {
          if (editingIndex !== null) {
               const updatedExperienceList = experienceList.map((exp, index) =>
                    index === editingIndex ? experience : exp
               );
               setExperienceList(updatedExperienceList);
               await updateExperience(experience, experienceId, resume.id)
               setEditingIndex(null);
          } else {
               setExperienceList([...experienceList, experience]);
               const ex = await saveExperience(experience, resume.id)
               setExperienceId(ex.id);
          }
          setExperience({ title: '', location: '', organization: '', startDate: '', endDate: '', description: '' });
     };

     const handleEditExperience = (index) => {
          setExperienceId(experienceList[index].id)
          setExperience(experienceList[index]);
          setEditingIndex(index);
     };

     const handleDeleteExperience = async (index) => {
          const updatedExperienceList = experienceList.filter((_, i) => i !== index);
          setExperienceList(updatedExperienceList);
          await deleteExperience(resume.id, experienceList[index].id)
          if (editingIndex !== null && editingIndex >= index) {
               setEditingIndex(editingIndex === index ? null : editingIndex - 1);
          }
     };

     return (
          <div>
               <div className="mb-6 flex flex-wrap gap-2">
                    {experienceList.map((exp, index) => (
                         <span
                              key={index}
                              className="flex items-center text-gray-100 rounded-full bg-zinc-800 px-4 py-2 text-sm font-semibold cursor-pointer"
                         >
                              <span onClick={() => handleEditExperience(index)}>
                                   {exp.title} at {exp.organization}
                              </span>
                              <FiTrash2
                                   className="ml-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                   onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteExperience(index);
                                   }}
                              />
                         </span>
                    ))}
               </div>

               <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="w-full md:w-1/2">
                         <div>
                              <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="title">
                                   Job Title
                              </label>
                              <input
                                   id="title"
                                   name="title"
                                   value={experience.title}
                                   onChange={handleExperienceDetailChange}
                                   className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                                   placeholder="Job Title"
                              />
                         </div>
                    </div>

                    <div className="w-full md:w-1/2">
                         <div>
                              <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="location">
                                   Job Location
                              </label>
                              <input
                                   id="location"
                                   name="location"
                                   value={experience.location}
                                   onChange={handleExperienceDetailChange}
                                   className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                                   placeholder="Job Location"
                              />
                         </div>
                    </div>
               </div>

               <div className="mb-6">
                    <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="organization">
                         Company Name
                    </label>
                    <input
                         id="organization"
                         name="organization"
                         value={experience.organization}
                         onChange={handleExperienceDetailChange}
                         className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                         placeholder="Company Name"
                    />
               </div>

               <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="w-full md:w-1/2">
                         <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="startDate">
                              Start Date
                         </label>
                         <CustomDatePicker
                              id="startDate"
                              selectedDate={experience.startDate}
                              onDateChange={(date) => handleExperienceDetailChange({ target: { name: 'startDate', value: date.toISOString().split('T')[0] } })}
                              placeholder="Start Date"
                         />
                    </div>

                    <div className="w-full md:w-1/2">
                         <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="endDate">
                              End Date
                         </label>
                         <CustomDatePicker
                              id="endDate"
                              selectedDate={experience.endDate}
                              onDateChange={(date) => handleExperienceDetailChange({ target: { name: 'endDate', value: date.toISOString().split('T')[0] } })}
                              placeholder="End Date"
                         />
                    </div>
               </div>

               <div className="relative mb-6">
                    <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="description">
                         description
                    </label>
                    <div className="relative">
                         <textarea
                              id="description"
                              name="description"
                              value={experience.description}
                              onChange={handleExperienceDetailChange}
                              className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out pr-16 hidden-scrollbar"
                              rows="5"
                              placeholder="Enter experience description or click on the bottom-right button to write with AI"
                         />
                         <AISuggestionsButton onClick={handleGenerateSuggestions} />
                    </div>
               </div>
               {areAllFieldsFilled(experience) &&
                    <button
                         onClick={handleAddExperience}
                         className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                    >
                         <span>
                              {editingIndex !== null ? 'Update' : 'Add'}
                         </span>
                    </button>
               }

          </div>
     );
};

export default ExperienceForm;
