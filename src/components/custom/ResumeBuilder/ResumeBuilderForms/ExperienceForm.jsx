import React, { useState, useEffect } from 'react';
import { getGenerateSuggestions, saveExperience, updateExperience, deleteExperience, getExperiences } from '@/services/ApiService';
import AISuggestionsButton from '../Buttons/AISuggestionButton.jsx'
import CustomDatePicker from '../../CustomDatePicker/CustomDatePicker';
import { FiTrash2 } from 'react-icons/fi';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResponsiveQuill from '@/components/custom/ResponsiveQuill/ResponsiveQuill';


const ExperienceForm = ({ experience, setExperience, experienceList, setExperienceList, editingIndex, setEditingIndex, resume }) => {
     const [suggestions, setSuggestions] = React.useState('');
     const [isLoading, setIsLoading] = useState(false)
     const isDisabled = !experience.title || !experience.location || !experience.organization || !experience.startDate || !experience.description;

     useEffect(() => {
          getAllExperiencesForResume()
     }, []);

     const handleReset = () => {
          setExperience({ title: '', location: '', organization: '', startDate: '', endDate: '', description: '' })
          setEditingIndex(null)
     }

     const handleEditorChange = (value) => {
          setExperience(prev => ({
               ...prev,
               description: DOMPurify.sanitize(value)
          }));
     };

     const handleExperienceDetailChange = (e) => {
          const { name, value } = e.target;
          setExperience(prev => ({
               ...prev,
               [name]: DOMPurify.sanitize(value)
          }));
     };

     const getAllExperiencesForResume = async () => {
          try {
               setIsLoading(true)
               const experiences = await getExperiences(resume.id)
               setExperienceList(experiences)
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

     const handleGenerateSuggestions = async () => {
          if (!experience.title) {
               toast.error("Job Title Required For Generating AI Suggestions", {
                    style: {
                         backgroundColor: '#1F2937',
                         color: '#fff'
                    },
               });
               return;
          }
          try {
               setIsLoading(true)
               const suggestions = await getGenerateSuggestions(experience.title, 'experencie description in six bullet points');
               setExperience(prevExperience => { return { ...prevExperience, description: suggestions.generatedSuggestion }; });
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

     const handleAddExperience = async () => {
          try {
               setIsLoading(true)
               if (editingIndex !== null) {
                    const updatedExperienceList = experienceList.map((exp, index) =>
                         index === editingIndex ? experience : exp
                    );
                    setExperienceList(updatedExperienceList);
                    await updateExperience(experience, experience.id, resume.id)
                    setEditingIndex(null);
               } else {
                    const ex = await saveExperience(experience, resume.id)
                    setExperienceList([...experienceList, ex]);
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
          handleReset()
     };

     const handleEditExperience = (index) => {
          setExperience(experienceList[index]);
          setEditingIndex(index);
     };

     const handleDeleteExperience = async (index) => {
          const updatedExperienceList = experienceList.filter((_, i) => i !== index);
          setExperienceList(updatedExperienceList);
          try {
               setIsLoading(true)
               await deleteExperience(resume.id, experienceList[index].id)
               if (editingIndex !== null && editingIndex >= index) {
                    setEditingIndex(editingIndex === index ? null : editingIndex - 1);
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
          <>
               {isLoading && (
                    <div className="loader-overlay">
                         <div className="loader"></div>
                    </div>
               )}
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
                                        className=" text-gray-100 bg-transparent border-b-2 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
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
                                        className=" text-gray-100 bg-transparent border-b-2 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
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
                              className="bg-transparent border-b-2 text-gray-100 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                              placeholder="Company Name"
                         />
                    </div>

                    <div className="flex flex-col md:flex-row gap-1 mb-6">
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
                              />
                         </div>
                    </div>

                    <div className="relative mb-6">
                         <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="description">
                              Responsibilities
                         </label>
                         <div className="relative">
                              <ResponsiveQuill
                                   id="description"
                                   name="description"
                                   value={experience.description}
                                   onChange={handleEditorChange}
                                   style={{ minHeight: '100px', maxHeight: '180px' }}
                                   placeholder="Experience description or click on the bottom-right button to write with AI"
                                   className="bg-slate-300 text-black border border-transparent rounded-md w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out pr-16 hidden-scrollbar"
                              />
                              <AISuggestionsButton onClick={handleGenerateSuggestions} />
                         </div>
                    </div>

                    <div className="flex space-x-3">
                         <button
                              onClick={handleAddExperience}
                              className={`text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform flex items-center space-x-2 ${isDisabled
                                   ? 'opacity-50 cursor-not-allowed bg-gray-600'
                                   : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'
                                   }`}
                              disabled={isDisabled}
                         >
                              <span>{editingIndex !== null ? 'Update' : 'Add'}</span>
                         </button>

                         <button
                              onClick={handleReset}
                              className=" text-white py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                         >
                              <span>Reset</span>
                         </button>
                    </div>
               </div>
          </>

     );
};

export default ExperienceForm;
