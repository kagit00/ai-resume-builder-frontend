import React, { useState, useEffect } from 'react';
import { getLanguages, saveLanguage, updateLanguage, deleteLanguage } from '@/services/ApiService';
import { FiTrash2 } from 'react-icons/fi'; // Import trash icon from react-icons

const LanguageForm = ({ languages, setLanguages, languagesList, setLanguagesList, editingIndex, setEditingIndex, resume, resumeDetails}) => {
     const [languageId, setLanguageId] = useState('')
     useEffect(() => {
          if (resumeDetails.isEditMode) {
               getLanguage()
          }
     }, []);
     console.log(languagesList)

     const getLanguage = async () => {
          const languages = await getLanguages(resume.id);
          setLanguagesList(languages);
     }

     const handleLanguageDetailChange = (e) => {
          setLanguages({ ...languages, [e.target.name]: e.target.value });
     };

     const handleAddLanguage = async () => {
          if (editingIndex !== null) {
               const updatedLanguagesList = languagesList.map((lang, index) =>
                    index === editingIndex ? languages : lang
               );
               setLanguagesList(updatedLanguagesList);
               await updateLanguage(resume.id, languageId, languages)
               setEditingIndex(null);
          } else {
               const lang = await saveLanguage(resume.id, languages);
               setLanguagesList([...languagesList, lang]);
               setLanguageId(lang.id)
          }
          setLanguages({ name: '', proficiencyLevel: '' });
     };

     const handleEditLanguage = (index) => {
          const languageToEdit = languagesList[index];
          setLanguageId(languagesList[index].id)
          setLanguages(languageToEdit);
          setEditingIndex(index);
     };

     const handleDeleteLanguage = async (index) => {
          const updatedLanguagesList = languagesList.filter((_, i) => i !== index);
          await deleteLanguage(resume.id, languagesList[index].id)
          setLanguagesList(updatedLanguagesList);
          if (editingIndex !== null && editingIndex >= index) {
               setEditingIndex(null); // Reset editing index if the deleted item was being edited
          }
     };

     return (
          <div>
               <>
                    {/* Display the list of added languages with delete icon */}
                    <div className="mb-6">
                         <ul className="flex flex-wrap gap-2">
                              {languagesList.map((lang, index) => (
                                   <li
                                        key={index}
                                        className="flex items-center text-gray-100 rounded-full bg-zinc-800 px-4 py-2 text-sm font-semibold cursor-pointer"
                                        onClick={() => handleEditLanguage(index)} // Set language details to form fields on click
                                   >
                                        {lang.name}
                                        <FiTrash2
                                             className="ml-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                             onClick={(e) => {
                                                  e.stopPropagation(); // Prevent triggering the edit on delete
                                                  handleDeleteLanguage(index);
                                             }}
                                        />
                                   </li>
                              ))}
                         </ul>
                    </div>

                    <div className="mb-6">
                         <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="name">
                              Language Name
                         </label>
                         <input
                              id="name"
                              name="name"
                              value={languages.name || ''}
                              onChange={handleLanguageDetailChange}
                              className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                              placeholder="Language Name"
                         />
                         <div className="mt-4 mb-4">
                              <p className="text-gray-300 text-sm md:text-base mb-2">Proficiency Level</p>
                              <div className="flex gap-4">
                                   {['NAIVE', 'NATIVE', 'FLUENT', 'EXPERT'].map((level) => (
                                        <label key={level} className="inline-flex items-center text-gray-300">
                                             <input
                                                  type="radio"
                                                  name="proficiencyLevel"
                                                  value={level}
                                                  checked={languages.proficiencyLevel === level}
                                                  onChange={(e) => setLanguages({ ...languages, proficiencyLevel: e.target.value })}
                                                  className="form-radio h-4 w-4 text-gray-600 transition duration-200 ease-in-out"
                                             />
                                             <span className="ml-2">{level}</span>
                                        </label>
                                   ))}
                              </div>
                         </div>

                         <button
                              onClick={handleAddLanguage}
                              className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                         >
                              {editingIndex !== null ? 'Update' : 'Add'}
                         </button>
                    </div>
               </>
          </div>
     );
};

export default LanguageForm;
