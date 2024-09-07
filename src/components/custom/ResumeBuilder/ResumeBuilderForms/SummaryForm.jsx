import { useEffect, useState } from 'react';
import AISuggestionsButton from '@/components/custom/ResumeBuilder/Buttons/AISuggestionButton.jsx'
import { getGenerateSuggestions, saveSummary, deleteSummary, updateSummary, getSummary } from '@/services/ApiService';
import { setResumeValidity } from '@/utils/BasicUtils';

const SummaryForm = ({ resume, currentStep, sections, addedSummary, setAddedSummary}) => {
     const [summary, setSummary] = useState('');
     setResumeValidity('summary', addedSummary? true : '')

     useEffect(() => {
          fetchResumeSummary(resume.id);
     }, [resume.id]);

     const fetchResumeSummary = async (resumeId) => {
          const result = await getSummary(resumeId);
          if (result?.details) {
               setSummary(result.details);
               setAddedSummary(result.details)
          }
     };

     const handleGenerateSuggestions = async () => {
          const suggestions = await getGenerateSuggestions(resume.title, 'overview');
          setSummary(suggestions.generatedSuggestion);
          setAddedSummary(suggestions.generatedSuggestion)
     };

     const handleSaveSummary = async () => {
          if (currentStep !== 0) return;
          if (summary.trim()) {
               if (summary && summary !== sections[currentStep].value && addedSummary) {
                    await updateSummary({ details: summary }, resume.id);
               } else if (!addedSummary && summary) {
                    await saveSummary({ details: summary }, resume.id);
               }
          }
          setSummary(summary);
          setAddedSummary(summary)
     };

     const handleDeleteSummary = async () => {
          if (currentStep !== 0) return;

          await deleteSummary(resume.id);
          setSummary('');
          setAddedSummary('');
     };

     return (
          <>
               <div className="relative mb-6">
                    <label className="block text-gray-400 text-sm mb-2" htmlFor={sections[currentStep].title.toLowerCase()}>
                         {sections[currentStep].title}
                    </label>
                    <div className="relative">
                         <textarea
                              id={sections[currentStep].title.toLowerCase()}
                              value={summary}
                              onChange={(e) => setSummary(e.target.value)}
                              className="bg-transparent text-gray-100 border-b-2 text-xs font-normal  w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out pr-16 hidden-scrollbar"
                              rows="5"
                              placeholder={sections[currentStep].placeholder}
                         />
                         <AISuggestionsButton onClick={handleGenerateSuggestions} />
                    </div>
               </div>

               <div className="flex space-x-4">
                    {(summary?.trim().length ?? 0) !== 0 && (
                         <>
                              <button
                                   onClick={handleSaveSummary}
                                   className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                              >
                                   <span>{summary && summary !== sections[currentStep].value && addedSummary ? 'Update' : 'Add'}</span>
                              </button>
                             {addedSummary && (<button
                                   onClick={handleDeleteSummary}
                                   className="text-gray-300 text-sm font-bold py-2 px-2 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center space-x-2"
                              >
                                   <span>Delete</span>
                              </button>
                              )}
                         </>
                    )}
               </div>
          </>
     );
};

export default SummaryForm;
