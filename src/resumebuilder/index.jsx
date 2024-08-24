import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Header from '@/components/custom/header';
import Resume from './resume.jsx'
import SkillsDropdown from '../components/custom/SkillsDropdown.jsx';
import ProjectForm from '@/components/custom/ProjectForm.jsx';
import LanguageForm from '@/components/custom/LanguageForm.jsx';
import EducationForm from '@/components/custom/EducationForm.jsx';
import ExperienceForm from '@/components/custom/ExperienceForm.jsx';
import AdditionalDetailsForm from '@/components/custom/AdditionalDetailsForm.jsx';
import AISuggestionsButton from '@/components/custom/AISuggestionButton.jsx'
import { useLocation } from 'react-router-dom';

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
     const resumeDetails = location.state;
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
          setTruncatedText(truncateText(resumeTitle, 5))
     }, []);

     const handleAddSummary = () => {
          if (currentStep === 0) {
               setAddedSummary(summary);
          }
     };

     const handleUpdateValue = (newValue) => {
          setValue(newValue);
          updateSectionValue(newValue);
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
          <div>
               <Header />
               <div className="pt-10 md:pt-15 lg:pt-20 flex flex-col h-screen bg-black text-gray-100 md:flex-row">
                    <div className="w-full md:w-1/2 p-6 md:p-8 shadow-3xl flex flex-col justify-between relative overflow-auto hidden-scrollbar md:ml-4 lg:ml-6 md:mr-8 lg:mr-10">
                         <header className="bg-zinc-950 absolute top-0 left-0 w-full p-5 z-10 shadow-2xl flex items-center justify-between">
                              <p className="text-sm md:text-sm lg:text-lg font-normal text-white text-shadow-lg">
                                   {truncatedText}
                              </p>
                         </header>


                         {/* Step Content */}
                         <div className="pt-20 flex-1 mb-4 overflow-auto hidden-scrollbar">
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
                                                       className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out pr-16 text-xs"
                                                       rows="5"
                                                       style={{ fontFamily: 'Helvetica' }}
                                                       placeholder={sections[currentStep].placeholder}
                                                  />
                                                  <AISuggestionsButton resumeTitle={resumeTitle} sectionType={sections[currentStep].title} onUpdate={handleUpdateValue} />
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
                                        <EducationForm education={education} setEducation={setEducation} educationList={educationList} setEducationList={setEducationList} editingIndex={editingIndex} setEditingIndex={setEditingIndex} />
                                   ) :
                                        currentStep === 2 ? (
                                             <ExperienceForm experience={experience} setExperience={setExperience} experienceList={experienceList} setExperienceList={setExperienceList} editingIndex={editingIndex} setEditingIndex={setEditingIndex} />
                                        ) : currentStep === 3 ? (
                                             <ProjectForm project={project} setProjects={setProjects} projectsList={projectsList} setProjectsList={setProjectsList} editingIndex={editingIndex} setEditingIndex={setEditingIndex} />
                                        )
                                             : currentStep === 4 ? (
                                                  <LanguageForm languages={languages} setLanguages={setLanguages} languagesList={languagesList} setLanguagesList={setLanguagesList} editingIndex={editingIndex} setEditingIndex={setEditingIndex} />
                                             ) : currentStep === 5 ? (
                                                  <SkillsDropdown skills={skills} handleSkillsUpdate={handleSkillsUpdate} />
                                             ) : currentStep === 6 && (
                                                  <AdditionalDetailsForm additionalDetails={additionalDetails} setAdditionalDetails={setAdditionalDetails} additionalDetailsList={additionalDetailsList} setAdditionalDetailsList={setAdditionalDetailsList} editingIndex={editingIndex} setEditingIndex={setEditingIndex} />
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
                                             onClick={() => alert('Resume Submitted!')}
                                             className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:shadow-outline flex items-center"
                                        >
                                             <CheckCircleIcon className="w-6 h-6" />
                                             <span className="sr-only">Submit Resume</span>
                                        </button>
                                   )}
                              </div>
                         </div>
                    </div>
                    <Resume userDetails={userDetails} addedSummary={addedSummary} additionalDetails={additionalDetails} experienceList={experienceList} educationList={educationList} projectsList={projectsList} skills={skills} languagesList={languagesList} setExperienceList={setExperienceList} />
               </div>
          </div>

     );
};

export default ResumeBuilder;
