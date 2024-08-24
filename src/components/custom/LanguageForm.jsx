import React from 'react';

const LanguageForm = ({ languages, setLanguages, languagesList, setLanguagesList, editingIndex, setEditingIndex }) => {
     const handleLanguageDetailChange = (e) => {
          setLanguages({ ...languages, [e.target.name]: e.target.value });
     };

     const handleAddLanguage = () => {
          if (editingIndex !== null) {
               const updatedLanguagesList = languagesList.map((lang, index) =>
                    index === editingIndex ? languages : lang
               );
               setLanguagesList(updatedLanguagesList);
               setEditingIndex(null);
          } else {
               setLanguagesList([...languagesList, languages]);
          }
          setLanguages({ languageName: '', expertise: '' });
     };

     return (
          <div>
               <>

                    <div className="mb-6">
                         <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="languageName">
                              Language Name
                         </label>
                         <input
                              id="languageName"
                              name="languageName"
                              value={languages.languageName || ''}
                              onChange={handleLanguageDetailChange}
                              className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                              placeholder="Language Name"
                         />
                         <div className="mt-4 mb-4">
                              <p className="text-gray-300 text-sm md:text-base mb-2">Expertise</p>
                              <div className="flex gap-4">
                                   {['Naive', 'Expert', 'Fluent', 'Native'].map((level) => (
                                        <label key={level} className="inline-flex items-center text-gray-300">
                                             <input
                                                  type="radio"
                                                  name="expertise"
                                                  value={level}
                                                  checked={languages.expertise === level}
                                                  onChange={(e) => setLanguages({ ...languages, expertise: e.target.value })}
                                                  className="form-radio h-4 w-4 text-gray-600 transition duration-200 ease-in-out"
                                             />
                                             <span className="ml-2">{level}</span>
                                        </label>
                                   ))}
                              </div>
                         </div>

                         <button onClick={handleAddLanguage}
                              className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                         >  {editingIndex !== null ? 'Update Language' : 'Add Language'}
                         </button>
                    </div>
               </>
          </div>
     );
};

export default LanguageForm;
