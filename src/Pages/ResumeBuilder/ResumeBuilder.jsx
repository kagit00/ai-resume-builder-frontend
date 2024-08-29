import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import GlobalHeader from '@/components/custom/Home/Header/GlobalHeader.jsx';
import ResumePreview from '../../components/custom/ResumeBuilder/ResumePreview/ResumePreview.jsx'
import SkillsDropdown from '@/components/custom/ResumeBuilder/DropDowns/SkillsDropdown.jsx';
import ProjectForm from '@/components/custom/ResumeBuilder/ResumeBuilderForms/ProjectForm.jsx';
import LanguageForm from '@/components/custom/ResumeBuilder/ResumeBuilderForms/LanguageForm.jsx';
import EducationForm from '@/components/custom/ResumeBuilder/ResumeBuilderForms/EducationForm.jsx';
import ExperienceForm from '@/components/custom/ResumeBuilder/ResumeBuilderForms/ExperienceForm.jsx';
import AdditionalDetailsForm from '@/components/custom/ResumeBuilder/ResumeBuilderForms/AdditionalDetailsForm.jsx';
import AISuggestionsButton from '@/components/custom/ResumeBuilder/Buttons/AISuggestionButton.jsx'
import { useLocation } from 'react-router-dom';
import { getGenerateSuggestions, saveSummary, updateResumeStatus } from '@/services/ApiService';

const ResumeBuilder = () => {
     const [summary, setSummary] = useState('');
     const [addedSummary, setAddedSummary] = useState('');
     const [education, setEducation] = useState({ degree: '', schoolName: '', location: '', startYear: '', endYear: '', details: '' });
     const [educationList, setEducationList] = useState([]);
     const [experienceList, setExperienceList] = useState([]);
     const [experience, setExperience] = useState({ jobTitle: '', jobLocation: '', companyName: '', startYear: '', endYear: '', details: '' });
     const [projectsList, setProjectsList] = useState([]);
     const [project, setProjects] = useState({ projectName: '', startYear: '', endYear: '', projectDetails: '' });
     const [currentStep, setCurrentStep] = useState(0);
     const [editingIndex, setEditingIndex] = useState(null);
     const [languagesList, setLanguagesList] = useState([]);
     const [languages, setLanguages] = useState({ languageName: '', expertise: '' });
     const [skills, setSkills] = useState([]);
     const [additionalDetails, setAdditionalDetails] = useState({ phoneNumber: '', githubLink: '', linkedinProfileLink: '' })
     const [additionalDetailsList, setAdditionalDetailsList] = useState([])
     const location = useLocation();
     const { resume, resumeDetails } = location.state || {};
     const userDetails = resumeDetails.userDetails;
     const resumeTitle = resumeDetails.resumeTitle
     const [truncatedText, setTruncatedText] = useState('')

     const sections = [
          { title: 'Summary', value: summary, setValue: setSummary, placeholder: 'Enter your qualification summary or click on the bottom-right button to write with AI' },
          { title: 'Education', value: '', setValue: () => { }, placeholder: '' },
          { title: 'Experience', value: '', setValue: () => { }, placeholder: '' },
          { title: 'Projects', value: '', setValue: () => { }, placeholder: '' },
          { title: 'Languages', value: languages, setValue: setLanguages, placeholder: 'Enter your languages here...' },
          { title: 'Skills', value: skills, setValue: setSkills, placeholder: 'Enter your skills here...' },
          { title: 'Additional', value: '', setValue: () => { }, placeholder: '' }
     ];

     useEffect(() => {
          console.log(userDetails)
          setTruncatedText(truncateText(resumeTitle, 7))
     }, []);

     const handleAddSummary = async () => {
          if (currentStep === 0) {
               setAddedSummary(summary);
               await saveSummary({ details: summary }, resume.id)
          }
     };

     const updateResume = async () => {
          await updateResumeStatus(resume.id)
     }

     const handleGenerateSuggestions = async () => {
          const suggestions = await getGenerateSuggestions(resumeTitle, 'overview');
          setSummary(suggestions.generatedSuggestion);
          setAddedSummary(suggestions.generatedSuggestion)
     };

     const handleNext = () => {
          if (currentStep < sections.length - 1) setCurrentStep(currentStep + 1);
     };

     const handlePrevious = () => {
          if (currentStep > 0) setCurrentStep(currentStep - 1);
     };

     const handleSkillsUpdate = (newSkills) => {
          setSkills(newSkills);
     };

     const truncateText = (text, maxWords) => {
          const words = text.split(' ');
          if (words.length > maxWords)
               return words.slice(0, maxWords).join(' ') + '...';
          return text;
     }

     const currentSection = sections[currentStep];
     return (
          <>
               <GlobalHeader />
               <div className="pt-10 md:pt-15 lg:pt-20 flex flex-col h-screen bg-black text-gray-100 md:flex-row">
                    <div className="w-full md:w-1/2 p-6 md:p-8 shadow-3xl flex flex-col relative overflow-hidden md:ml-4 lg:ml-6 md:mr-8 lg:mr-10">
                         <header className="bg-zinc-950 absolute top-0 left-0 w-full p-5 z-10 shadow-2xl flex items-center justify-between">
                              <p className="text-sm md:text-sm lg:text-lg font-normal text-white text-shadow-lg">
                                   {truncatedText}
                              </p>
                         </header>

                         {/* Step Content */}
                         <div className="pt-20 flex-1 overflow-auto hidden-scrollbar mb-4">
                              <p className="text-xl md:text-2xl font-thin mb-6 border-b border-gray-700 pb-2">
                                   {currentSection.title} Details
                              </p>

                              {currentStep === 0 ? (
                                   <>
                                        <div className="relative mb-6">
                                             <label className="block text-gray-400 text-sm mb-2" htmlFor={sections[currentStep].title.toLowerCase()}>
                                                  {sections[currentStep].title}
                                             </label>
                                             <div className="relative">
                                                  <textarea
                                                       id={sections[currentStep].title.toLowerCase()}
                                                       value={sections[currentStep].value}
                                                       onChange={(e) => sections[currentStep].setValue(e.target.value)}
                                                       className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out pr-16 hidden-scrollbar"
                                                       rows="5"
                                                       placeholder={sections[currentStep].placeholder}
                                                  />
                                                  <AISuggestionsButton onClick={handleGenerateSuggestions} />
                                             </div>
                                        </div>

                                        <button
                                             onClick={handleAddSummary}
                                             className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                                        >
                                             <span>
                                                  {editingIndex !== null ? 'Update Summary' : 'Add Summary'}
                                             </span>
                                        </button>
                                   </>
                              )
                                   : currentStep === 1 ? (
                                        <EducationForm education={education} setEducation={setEducation} educationList={educationList} setEducationList={setEducationList} editingIndex={editingIndex} setEditingIndex={setEditingIndex} resume={resume}/>
                                   ) :
                                        currentStep === 2 ? (
                                             <ExperienceForm experience={experience} setExperience={setExperience} experienceList={experienceList} setExperienceList={setExperienceList} editingIndex={editingIndex} setEditingIndex={setEditingIndex} resume={resume}/>
                                        ) : currentStep === 3 ? (
                                             <ProjectForm project={project} setProjects={setProjects} projectsList={projectsList} setProjectsList={setProjectsList} editingIndex={editingIndex} setEditingIndex={setEditingIndex} resume={resume} />
                                        )
                                             : currentStep === 4 ? (
                                                  <LanguageForm languages={languages} setLanguages={setLanguages} languagesList={languagesList} setLanguagesList={setLanguagesList} editingIndex={editingIndex} setEditingIndex={setEditingIndex} resume={resume} />
                                             ) : currentStep === 5 ? (
                                                  <SkillsDropdown handleSkillsUpdate={handleSkillsUpdate} />
                                             ) : currentStep === 6 && (
                                                  <AdditionalDetailsForm additionalDetails={additionalDetails} setAdditionalDetails={setAdditionalDetails} additionalDetailsList={additionalDetailsList} setAdditionalDetailsList={setAdditionalDetailsList} editingIndex={editingIndex} setEditingIndex={setEditingIndex} resume={resume} />
                                             )
                              }

                              <div className="flex justify-between mt-8">
                                   {currentStep > 0 && (
                                        <button
                                             onClick={handlePrevious}
                                             className="bg-zinc-900 text-white p-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:shadow-outline flex items-center"
                                        >
                                             <ChevronLeftIcon className="w-6 h-6" />
                                             <span className="sr-only">Previous</span>
                                        </button>
                                   )}
                                   {currentStep < sections.length - 1 ? (
                                        <button
                                             onClick={handleNext}
                                             className="bg-zinc-900 text-white p-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:shadow-outline flex items-center"
                                        >
                                             <ChevronRightIcon className="w-6 h-6" />
                                             <span className="sr-only">Next</span>
                                        </button>
                                   ) : (
                                        <button
                                             onClick={() => updateResume()}
                                             className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:shadow-outline flex items-center"
                                        >
                                             <CheckCircleIcon className="w-6 h-6" />
                                             <span className="sr-only">Submit Resume</span>
                                        </button>
                                   )}
                              </div>
                         </div>
                    </div>
                    <ResumePreview userDetails={userDetails} addedSummary={addedSummary} additionalDetailsList={additionalDetailsList} experienceList={experienceList} educationList={educationList} projectsList={projectsList} skills={skills} languagesList={languagesList} setExperienceList={setExperienceList} />
               </div>
          </>

     );
};

export default ResumeBuilder;
