import React, { useState, useEffect } from 'react';
import { getGenerateSuggestions, saveExperience, updateExperience, deleteExperience, getExperiences } from '@/services/ApiService';
import AISuggestionsButton from '../Buttons/AISuggestionButton.jsx'
import CustomDatePicker from '../../CustomDatePicker/CustomDatePicker';
import { FiTrash2 } from 'react-icons/fi';
import { setResumeValidity } from '@/utils/BasicUtils.js';

const ExperienceForm = ({ experience, setExperience, experienceList, setExperienceList, editingIndex, setEditingIndex, resume }) => {
     const [suggestions, setSuggestions] = React.useState('');
     const [experienceId, setExperienceId] = React.useState('');
     const sectionType = 'experience'
     const [isCurrentlyEnrolled, setIsCurrentlyEnrolled] = useState(false);
     const isDisabled = !experience.title || !experience.location || !experience.organization || !experience.startDate || !experience.description;
     setResumeValidity('experiences', experienceList.length > 0)

     useEffect(() => {
          getAllExperiencesForResume()
     }, []);

     const getAllExperiencesForResume = async () => {
          const experiences = await getExperiences(resume.id)
          setExperienceList(experiences)
     }

     const handleCheckboxChange = () => {
          setIsCurrentlyEnrolled(!isCurrentlyEnrolled);
          if (!isCurrentlyEnrolled) {
               setEducation((prev) => ({
                    ...prev,
                    endDate: '',
               }));
          }
     };

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
               const ex = await saveExperience(experience, resume.id)
               setExperienceList([...experienceList, ex]);
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
          <div className=' scroll-smooth'>
               <div className="mb-6 flex flex-wrap gap-2">
                    {experienceList.map((exp, index) => (
                         <span
                              key={index}
                              className="flex items-center text-gray-100 rounded-full bg-sky-950 px-4 py-2 text-xs font-semibold cursor-pointer"
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
                                   className="bg-transparent text-gray-100 border-b-2 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
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
                                   className="bg-transparent text-gray-100 border-b-2 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
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
                         className="bg-transparent text-gray-100 border-b-2 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
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
                              onDateChange={(date) =>
                                   handleExperienceDetailChange({
                                        target: { name: 'startDate', value: date.toISOString().split('T')[0] }
                                   })
                              }
                              placeholder="Start Date"
                              maxDate={experience.endDate ? new Date(experience.endDate) : new Date()} // Prevents selecting a start date after the end date
                         />
                    </div>

                    <div className="w-full md:w-1/2">
                         <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="endDate">
                              End Date
                         </label>
                         <CustomDatePicker
                              id="endDate"
                              selectedDate={experience.endDate}
                              onDateChange={(date) =>
                                   handleExperienceDetailChange({
                                        target: { name: 'endDate', value: date.toISOString().split('T')[0] }
                                   })
                              }
                              placeholder="End Date"
                              maxDate={new Date()} // Disables future dates
                              minDate={experience.startDate ? new Date(experience.startDate) : null} // Prevents selecting an end date before the start date
                              disabled={isCurrentlyEnrolled} // Disable field if checkbox is checked
                         />
                    </div>

                    <div className="flex items-center">
                         <input
                              type="checkbox"
                              id="currentlyEnrolled"
                              className="mr-2"
                              checked={isCurrentlyEnrolled}
                              onChange={handleCheckboxChange}
                         />
                         <label className="text-gray-300 text-xs" htmlFor="currentlyEnrolled">
                              Currently Enrolled
                         </label>
                    </div>
               </div>

               <div className="relative mb-6">
                    <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="description">
                         Description
                    </label>
                    <div className="relative">
                         <textarea
                              id="description"
                              name="description"
                              value={experience.description}
                              onChange={handleExperienceDetailChange}
                              className="bg-transparent text-gray-100 border-b-2 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out pr-16 hidden-scrollbar"
                              rows="5"
                              placeholder="Enter experience description or click on the bottom-right button to write with AI"
                         />
                         <AISuggestionsButton onClick={handleGenerateSuggestions} />
                    </div>
               </div>
               <button
                    onClick={handleAddExperience}
                    className={`text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform flex items-center space-x-2 ${isDisabled
                         ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                         : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'
                         }`}
                    disabled={isDisabled}
               >
                    <span>{editingIndex !== null ? 'Update' : 'Add'}</span>
               </button>

          </div>
     );
};

export default ExperienceForm;
