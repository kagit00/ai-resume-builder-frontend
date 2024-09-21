import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import GlobalHeader from '@/components/custom/Home/Header/GlobalHeader.jsx';
import ResumePreview from '../../components/custom/ResumeBuilder/ResumePreview/ResumePreview.jsx'
import SkillsDropdown from '@/components/custom/ResumeBuilder/DropDowns/SkillsDropdown.jsx';
import ProjectForm from '@/components/custom/ResumeBuilder/ResumeBuilderForms/ProjectForm.jsx';
import LanguageForm from '@/components/custom/ResumeBuilder/ResumeBuilderForms/LanguageForm.jsx';
import EducationForm from '@/components/custom/ResumeBuilder/ResumeBuilderForms/EducationForm.jsx';
import SummaryForm from '@/components/custom/ResumeBuilder/ResumeBuilderForms/SummaryForm.jsx';
import ExperienceForm from '@/components/custom/ResumeBuilder/ResumeBuilderForms/ExperienceForm.jsx';
import AdditionalDetailsForm from '@/components/custom/ResumeBuilder/ResumeBuilderForms/AdditionalDetailsForm.jsx';
import { useLocation } from 'react-router-dom';
import { sendEmail, updateResumeStatus } from '@/services/ApiService';
import { useNavigate } from 'react-router-dom';
import UpgradeToPremium from '@/components/custom/UserDashboard/UpgradeToPremium.jsx';
import { Typography, Box } from '@mui/material';

const ResumeBuilder = () => {
     const navigate = useNavigate()
     const [summary, setSummary] = useState('');
     const [addedSummary, setAddedSummary] = useState('');
     const [education, setEducation] = useState({ title: '', organization: '', location: '', startDate: '', endDate: '', description: '' });
     const [educationList, setEducationList] = useState([]);
     const [experienceList, setExperienceList] = useState([]);
     const [experience, setExperience] = useState({ title: '', location: '', organization: '', startDate: '', endDate: '', description: '' });
     const [projectsList, setProjectsList] = useState([]);
     const [project, setProject] = useState({ title: '', location: '', organization: '', startDate: '', endDate: '', description: '' });
     const [currentStep, setCurrentStep] = useState(0);
     const [editingIndex, setEditingIndex] = useState(null);
     const [languagesList, setLanguagesList] = useState([]);
     const [language, setLanguage] = useState({ name: '', proficiencyLevel: '' });
     const [skills, setSkills] = useState([]);
     const [additionalDetails, setAdditionalDetails] = useState({ phoneNumber: '', githubLink: '', linkedInProfileLink: '' })
     const location = useLocation();
     const { resume, resumeDetails } = location.state || {};
     const userDetails = resumeDetails.userDetails;
     const resumeTitle = resume.title
     const [addedAdditionalDetails, setAddedAdditionalDetails] = useState({ phoneNumber: '', githubLink: '', linkedInProfileLink: '' })
     const [isUpgradeToPremiumModalOpen, setIsUpgradeToPremiumModalOpen] = useState(false)
     const isFreeUser = userDetails.authorities.length === 1 && userDetails.authorities[0].authority === 'FREE_USER'
     const isNotificationEnabled = userDetails.notificationEnabled;
     const isResumeSubmitDisabled = !addedSummary || (educationList.length < 1) || (experienceList.length < 1) || (projectsList.length < 1) || (languagesList.length < 1) || (skills.length < 1) || !addedAdditionalDetails || !userDetails

     const sections = [
          { title: 'Summary', value: summary, setValue: setSummary, placeholder: 'Put Qualification Summary' },
          { title: 'Education', value: '', setValue: () => { }, placeholder: '' },
          { title: 'Experience', value: '', setValue: () => { }, placeholder: '' },
          { title: 'Projects', value: '', setValue: () => { }, placeholder: '' },
          { title: 'Languages', value: language, setValue: setLanguage, placeholder: 'Enter your language here...' },
          { title: 'Skills', value: skills, setValue: setSkills, placeholder: 'Enter your skills here...' },
          { title: 'Additional', value: '', setValue: () => { }, placeholder: '' }
     ];

     const openUpgradeToPremiumModal = () => {
          setIsUpgradeToPremiumModalOpen(true)
     }

     const updateResume = async () => {
          if (isFreeUser) {
               openUpgradeToPremiumModal()
          } else {
               navigate('/user/dashboard/resume/success', {
                    state: {
                         resumePdfTitle: resumeTitle,
                         userDetails: userDetails,
                         addedSummary: addedSummary,
                         addedAdditionalDetails: addedAdditionalDetails,
                         experienceList: experienceList,
                         educationList: educationList,
                         projectsList: projectsList,
                         skills: skills,
                         languagesList: languagesList
                    }
               });
          }
          await updateResumeStatus(resume.id)
          if (isNotificationEnabled)
               await sendEmail(userDetails.username, userDetails.name, isFreeUser)
     }

     const closeUpgradeToPremiumModal = () => {
          setIsUpgradeToPremiumModalOpen(false);
     };

     const confirmUpgradeToPremium = () => {
          navigate('/user/upgradetopremium')
          closeModal();
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

     const currentSection = sections[currentStep];
     return (
          <>
               <GlobalHeader />
               <div className="pt-10 md:pt-15 lg:pt-20 flex flex-col h-screen bg-gray-900 text-gray-100 md:flex-row">
                    <div className="w-full md:w-1/2 p-6 md:p-8 shadow-3xl flex flex-col relative overflow-hidden md:ml-4 lg:ml-6 md:mr-8 lg:mr-10">
                         <header className="absolute top-0 left-0 w-full py-10 px-5 z-10 shadow-3xl flex items-center justify-between">
                              <p className="text-sm font-semibold py-2 px-5 text-black truncate text-shadow-lg leading-relaxed bg-blue-100 rounded-full">
                                   {resumeTitle} Resume
                              </p>
                         </header>

                         {/* Step Content */}
                         <div className="pt-20 flex-1 overflow-auto hidden-scrollbar mb-4">
                              <p className="text-xl md:text-2xl font-thin mb-6 border-b border-gray-700 pb-2">
                                   {currentSection.title} Details
                              </p>

                              {currentStep === 0 ? (
                                   <SummaryForm
                                        resume={resume}
                                        currentStep={currentStep}
                                        sections={sections}
                                        resumeDetails={resumeDetails}
                                        addedSummary={addedSummary}
                                        setAddedSummary={setAddedSummary}
                                   />

                              )
                                   : currentStep === 1 ? (
                                        <EducationForm
                                             education={education}
                                             setEducation={setEducation}
                                             educationList={educationList}
                                             setEducationList={setEducationList}
                                             editingIndex={editingIndex}
                                             setEditingIndex={setEditingIndex}
                                             resume={resume}
                                             resumeDetails={resumeDetails}
                                        />
                                   ) :
                                        currentStep === 2 ? (
                                             <ExperienceForm
                                                  experience={experience}
                                                  setExperience={setExperience}
                                                  experienceList={experienceList}
                                                  setExperienceList={setExperienceList}
                                                  editingIndex={editingIndex}
                                                  setEditingIndex={setEditingIndex}
                                                  resume={resume}
                                                  resumeDetails={resumeDetails}
                                             />
                                        ) : currentStep === 3 ? (
                                             <ProjectForm
                                                  project={project}
                                                  setProject={setProject}
                                                  projectsList={projectsList}
                                                  setProjectsList={setProjectsList}
                                                  editingIndex={editingIndex}
                                                  setEditingIndex={setEditingIndex}
                                                  resume={resume}
                                                  resumeDetails={resumeDetails}
                                             />
                                        )
                                             : currentStep === 4 ? (
                                                  <LanguageForm
                                                       language={language}
                                                       setLanguage={setLanguage}
                                                       languagesList={languagesList}
                                                       setLanguagesList={setLanguagesList}
                                                       editingIndex={editingIndex}
                                                       setEditingIndex={setEditingIndex}
                                                       resume={resume}
                                                       resumeDetails={resumeDetails}
                                                  />
                                             ) : currentStep === 5 ? (
                                                  <SkillsDropdown
                                                       handleSkillsUpdate={handleSkillsUpdate}
                                                       selectedSkills={skills}
                                                       setSelectedSkills={setSkills}
                                                       resume={resume}
                                                  />

                                             ) : currentStep === 6 && (
                                                  <AdditionalDetailsForm
                                                       additionalDetails={additionalDetails}
                                                       setAdditionalDetails={setAdditionalDetails}
                                                       addedAdditionalDetails={addedAdditionalDetails}
                                                       setAddedAdditionalDetails={setAddedAdditionalDetails}
                                                       resume={resume}
                                                       resumeDetails={resumeDetails}
                                                  />
                                             )
                              }

                              <div className="flex justify-between mt-8">
                                   {currentStep > 0 && (
                                        <div className="relative flex flex-col items-center group">
                                             <button
                                                  onClick={handlePrevious}
                                                  className={`text-white p-2 rounded-lg bg-gray-800 transition duration-200 ease-in-out focus:outline-none focus:shadow-outline flex items-center ${editingIndex !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                  disabled={editingIndex !== null}
                                             >
                                                  <ChevronLeftIcon className="w-6 h-6" />
                                                  <span className="sr-only">Previous</span>
                                             </button>
                                        </div>

                                   )}
                                   {currentStep < sections.length - 1 ? (
                                        <div className="relative flex flex-col items-center group">
                                             <button
                                                  onClick={handleNext}
                                                  className={`text-white p-2 rounded-lg bg-gray-800 transition duration-200 ease-in-out focus:outline-none focus:shadow-outline flex items-center ${editingIndex !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                  disabled={editingIndex !== null}
                                             >
                                                  <ChevronRightIcon className="w-6 h-6" />
                                                  <span className="sr-only">Next</span>
                                             </button>
                                        </div>
                                   ) : (
                                        <div className="relative flex flex-col items-center">
                                             <button
                                                  onClick={() => updateResume()}
                                                  className={`text-white p-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:shadow-outline flex items-center ${isResumeSubmitDisabled ? 'cursor-not-allowed bg-gray-500 hover:bg-gray-600' : 'cursor-pointer bg-green-500 hover:bg-green-600'}`}
                                                  disabled={isResumeSubmitDisabled}
                                             >
                                                  <CheckCircleIcon className="w-6 h-6" />
                                                  
                                             </button>

                                             {isResumeSubmitDisabled && (
                                                  <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-xs bg-red-700 text-white text-sm rounded-sm shadow-lg px-4 py-3 z-50">
                                                       <p className='font-semibold text-xs text-left'></p>You have to complete each section to save your resume.
                                                  </div>
                                             )}
                                        </div>

                                   )}
                                   <UpgradeToPremium
                                        isOpen={isUpgradeToPremiumModalOpen}
                                        onClose={closeUpgradeToPremiumModal}
                                        onUpgrade={confirmUpgradeToPremium}
                                        userId={userDetails.id}
                                   />
                              </div>
                         </div>
                    </div>
                    <ResumePreview
                         userDetails={userDetails}
                         addedSummary={addedSummary}
                         addedAdditionalDetails={addedAdditionalDetails}
                         experienceList={experienceList}
                         educationList={educationList}
                         projectsList={projectsList}
                         skills={skills}
                         languagesList={languagesList}
                    />
               </div>
          </>
     );
};

export default ResumeBuilder;
