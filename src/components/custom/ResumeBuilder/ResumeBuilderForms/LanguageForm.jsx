import React, { useState, useEffect } from 'react';
import { getLanguages, saveLanguage, updateLanguage, deleteLanguage } from '@/services/ApiService';
import { FiTrash2 } from 'react-icons/fi';
import { setResumeValidity } from '@/utils/BasicUtils';

const LanguageForm = ({ language, setLanguage, languagesList, setLanguagesList, editingIndex, setEditingIndex, resume }) => {
     const [languageId, setLanguageId] = useState('')
     const isDisabled = !language.name || !language.proficiencyLevel 
     setResumeValidity('languages', languagesList.length > 0)

     useEffect(() => {
          getAllLanguagesForResume()
     }, []);

     const getAllLanguagesForResume = async () => {
          const languages = await getLanguages(resume.id);
          setLanguagesList(languages);
     }

     const handleLanguageDetailChange = (e) => {
          setLanguage({ ...language, [e.target.name]: e.target.value });
     };

     const handleAddLanguage = async () => {
          if (editingIndex !== null) {
               const updatedLanguagesList = languagesList.map((lang, index) =>
                    index === editingIndex ? language : lang
               );
               setLanguagesList(updatedLanguagesList);
               await updateLanguage(resume.id, languageId, language)
               setEditingIndex(null);
          } else {
               const lang = await saveLanguage(resume.id, language);
               setLanguagesList([...languagesList, lang]);
               setLanguageId(lang.id)
          }
          setLanguage({ name: '', proficiencyLevel: '' });
     };

     const handleEditLanguage = (index) => {
          const languageToEdit = languagesList[index];
          setLanguageId(languagesList[index].id)
          setLanguage(languageToEdit);
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
                    {/* Display the list of added language with delete icon */}
                    <div className="mb-6">
                         <ul className="flex flex-wrap gap-2">
                              {languagesList.map((lang, index) => (
                                   <li
                                        key={index}
                                        className="flex items-center text-gray-100 rounded-full bg-sky-950 px-4 py-2 text-xs font-semibold cursor-pointer"
                                        onClick={() => handleEditLanguage(index)} // Set language details to form fields on click
                                   >
                                        {lang.name}
                                        <FiTrash2
                                             className="ml-2 text-gray-100 hover:text-red-500 transition-colors cursor-pointer"
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
                              value={language.name || ''}
                              onChange={handleLanguageDetailChange}
                              className="bg-transparent text-gray-100 border-b-2 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                              placeholder="Language Name"
                         />
                         <div className="mt-8 mb-4">
                              <p className="text-gray-300 text-sm md:text-base mb-2">Proficiency Level</p>
                              <div className="flex gap-4 text-xs font-semibold">
                                   {['NAIVE', 'NATIVE', 'FLUENT', 'EXPERT'].map((level) => (
                                        <label key={level} className="inline-flex items-center text-gray-300">
                                             <input
                                                  type="radio"
                                                  name="proficiencyLevel"
                                                  value={level}
                                                  checked={language.proficiencyLevel === level}
                                                  onChange={(e) => setLanguage({ ...language, proficiencyLevel: e.target.value })}
                                                  className="form-radio h-4 w-4 text-gray-600 transition duration-200 ease-in-out"
                                             />
                                             <span className="ml-2">{level}</span>
                                        </label>
                                   ))}
                              </div>
                         </div>

                         <button
                         onClick={handleAddLanguage}
                         className={`text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform flex items-center space-x-2 ${isDisabled
                              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                              : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'
                              }`}
                         disabled={isDisabled}
                    >
                         <span>{editingIndex !== null ? 'Update' : 'Add'}</span>
                    </button>
                    </div>
               </>
          </div>
     );
};

export default LanguageForm;
