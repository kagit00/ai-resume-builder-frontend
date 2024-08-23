import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Header from '@/components/custom/header';
import Resume from './resume.jsx'
import SkillsDropdown from '../components/custom/skillsdropdown.jsx';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

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
     const name = 'Kaustav Manna'
     const contactDetails = '99999999999'
     const email = 'kaustavmanna4@gmail.com'

     const sections = [
          { title: 'Summary', value: summary, setValue: setSummary, placeholder: 'Enter your summary here...' },
          { title: 'Education', value: '', setValue: () => { }, placeholder: '' },
          { title: 'Experience', value: '', setValue: () => { }, placeholder: '' },
          { title: 'Projects', value: '', setValue: () => { }, placeholder: '' },
          { title: 'Languages', value: languages, setValue: setLanguages, placeholder: 'Enter your languages here...' },
          { title: 'Skills', value: skills, setValue: setSkills, placeholder: 'Enter your skills here...' },
          { title: 'Additional', value: '', setValue: () => { }, placeholder: '' }
     ];

     const handleAddSummary = () => {
          if (currentStep === 0) {
               setAddedSummary(summary);
          }
     };

     const handleSkillsUpdate = (newSkills) => {
          setSkills(newSkills);
     };

     const handleExperienceDetailChange = (e) => {
          setExperience({ ...experience, [e.target.name]: e.target.value });
     };

     const handleAdditionalDetailsChange = (e) => {
          setAdditionalDetails({ ...additionalDetails, [e.target.name]: e.target.value });
     }

     const handleEducationDetailChange = (e) => {
          setEducation({ ...education, [e.target.name]: e.target.value });
     }

     const handleAddEducation = (e) => {
          if (editingIndex !== null) {
               const updatedEducationList = educationList.map((ed, index) =>
                    index === editingIndex ? education : ed
               );
               setEducationList(updatedEducationList);
               setEditingIndex(null);
          } else {
               setEducationList([...educationList, education]);
          }
          setEducation({ schoolName: '', startYear: '', endYear: '', percentage: '' });
     }

     const handleProjectDetailChange = (e) => {
          setProjects({ ...project, [e.target.name]: e.target.value });
     };

     const handleAddExperience = () => {
          if (editingIndex !== null) {
               // Update existing experience
               const updatedExperienceList = experienceList.map((exp, index) =>
                    index === editingIndex ? experience : exp
               );
               setExperienceList(updatedExperienceList);
               setEditingIndex(null);
          } else {
               // Add new experience
               setExperienceList([...experienceList, experience]);
          }
          setExperience({ companyName: '', startYear: '', endYear: '', details: '' });
     };

     const handleAddAdditionalDetails = () => {
          if (editingIndex !== null) {
               const updatedAdditionalDetailsList = additionalDetailsList.map((ad, index) =>
                    index === editingIndex ? additionalDetails : ad
               );
               setAdditionalDetailsList(updatedAdditionalDetailsList);
               setEditingIndex(null);
          } else {
               setAdditionalDetailsList([...additionalDetailsList, additionalDetails]);
          }
          setAdditionalDetails({ phoneNumber: '', githubLink: '', linkedinProfileLink: '' })
     }

     const handleAddProject = () => {
          if (editingIndex !== null) {
               // Update existing project
               const updatedProjectsList = projectsList.map((proj, index) =>
                    index === editingIndex ? project : proj
               );
               setProjectsList(updatedProjectsList);
               setEditingIndex(null);
          } else {
               // Add new project
               setProjectsList([...projectsList, project]);
          }
          setProjects({ projectName: '', projectDetails: '' });
     };

     const handleRemoveExperience = (index) => {
          const updatedExperienceList = experienceList.filter((_, i) => i !== index);
          setExperienceList(updatedExperienceList);
     };

     const handleRemoveProject = (index) => {
          const updatedProjectsList = projectsList.filter((_, i) => i !== index);
          setProjectsList(updatedProjectsList);
     };

     const handleRemoveLanguage = (index) => {
          const updatedLanguagesList = languagesList.filter((_, i) => i !== index);
          setLanguagesList(updatedLanguagesList);
     };

     const handleLanguageDetailChange = (e) => {
          setLanguages({ ...languages, [e.target.name]: e.target.value });
     };

     const handleAddLanguage = () => {
          if (editingIndex !== null) {
               // Update existing language
               const updatedLanguagesList = languagesList.map((lang, index) =>
                    index === editingIndex ? languages : lang
               );
               setLanguagesList(updatedLanguagesList);
               setEditingIndex(null);
          } else {
               // Add new language
               setLanguagesList([...languagesList, languages]);
          }
          setLanguages({ languageName: '', expertise: '' });
     };

     const handleEditExperience = (index) => {
          setExperience(experienceList[index]);
          setEditingIndex(index);
          setCurrentStep(2); // Go to Experience step
     };

     const handleEditProject = (index) => {
          setProjects(projectsList[index]);
          setEditingIndex(index);
          setCurrentStep(3);
     };

     const handleNext = () => {
          if (currentStep < sections.length - 1) setCurrentStep(currentStep + 1);
     };

     const handlePrevious = () => {
          if (currentStep > 0) setCurrentStep(currentStep - 1);
     };

     const currentSection = sections[currentStep];

     return (
          <div>
               <Header />
               <div className="pt-10 md:pt-15 lg:pt-20 flex flex-col h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-100 md:flex-row">
                    {/* Left Side: Step-by-Step Input Fields & AI Suggestions */}
                    <div className="w-full md:w-1/2 p-6 md:p-8 from-gray-800 shadow-3xl rounded-3xl flex flex-col justify-between relative overflow-auto hidden-scrollbar md:ml-4 lg:ml-6 md:mr-8 lg:mr-10">
                         <header className="absolute top-0 left-0 w-full p-5 z-10 bg-gray-900 bg-opacity-90 shadow-2xl rounded-b-lg">
                              <h1 className="text-lg md:text-xl font-light text-white text-shadow-lg">
                                   Resume for Software Developer
                              </h1>
                         </header>

                         {/* Step Content */}
                         <div className="pt-20 flex-1 mb-4 overflow-auto hidden-scrollbar">
                              <p className="text-xl md:text-2xl font-thin mb-6 border-b border-gray-700 pb-2">
                                   {currentSection.title} Details
                              </p>

                              {
                                   currentStep === 0 ? (
                                        <>
                                             <div className="mb-6">
                                                  <label className="block text-gray-400 text-sm mb-2" htmlFor={sections[currentStep].title.toLowerCase()}>
                                                       {sections[currentStep].title}
                                                  </label>
                                                  <textarea
                                                       id={sections[currentStep].title.toLowerCase()}
                                                       value={sections[currentStep].value}
                                                       onChange={(e) => sections[currentStep].setValue(e.target.value)}
                                                       className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                       rows="4"
                                                       placeholder={sections[currentStep].placeholder}
                                                  />
                                             </div>

                                             <button
                                                  onClick={handleAddSummary}
                                                  className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                                             >
                                                  <span>
                                                       {editingIndex !== null ? 'Update Summary' : 'Add Summary'}
                                                  </span>
                                             </button>

                                             <div className="mt-4 p-4 md:p-5 bg-gray-700 shadow-lg rounded-lg">
                                                  <h3 className="text-lg md:text-xl font-light text-white mb-4" style={{ textShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' }}>
                                                       AI Suggestions
                                                  </h3>
                                                  <p className="text-gray-400 mb-4">
                                                       Let our AI help you enhance your experience details. Click below to get tailored suggestions.
                                                  </p>
                                                  <button
                                                       className="bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 p-2 rounded-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center"
                                                       style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}
                                                  >
                                                       <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 512 512"
                                                            className="w-6 h-6"
                                                            fill="currentColor"
                                                       >
                                                            <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                                                       </svg>
                                                  </button>
                                             </div>

                                        </>
                                   )
                                        : currentStep === 1 ? (
                                             <>
                                                  <div className="mb-6">
                                                       <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="degree">
                                                            Degree or Equivalent
                                                       </label>
                                                       <input
                                                            id="degree"
                                                            name="degree"
                                                            value={education.degree}
                                                            onChange={handleEducationDetailChange}
                                                            className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                            placeholder="Degree or Equivalent"
                                                       />
                                                  </div>

                                                  <div className="mb-6">
                                                       <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="location">
                                                            Location
                                                       </label>
                                                       <input
                                                            id="location"
                                                            name="location"
                                                            value={education.location}
                                                            onChange={handleEducationDetailChange}
                                                            className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                            placeholder="Location"
                                                       />
                                                  </div>

                                                  <div className="mb-6">
                                                       <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="schoolName">
                                                            School/University Name
                                                       </label>
                                                       <input
                                                            id="schoolName"
                                                            name="schoolName"
                                                            value={education.schoolName}
                                                            onChange={handleEducationDetailChange}
                                                            className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                            placeholder="School/University Name"
                                                       />
                                                  </div>

                                                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                                                       <div className="w-full md:w-1/2">
                                                            <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="startYear">
                                                                 Start Year
                                                            </label>
                                                            <input
                                                                 id="startYear"
                                                                 name="startYear"
                                                                 value={education.startYear}
                                                                 onChange={handleEducationDetailChange}
                                                                 type="number"
                                                                 className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                                 placeholder="Start Year"
                                                            />
                                                       </div>

                                                       <div className="w-full md:w-1/2">
                                                            <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="endYear">
                                                                 End Year (or Present)
                                                            </label>
                                                            <input
                                                                 id="endYear"
                                                                 name="endYear"
                                                                 value={education.endYear}
                                                                 onChange={handleEducationDetailChange}
                                                                 type="text"
                                                                 className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                                 placeholder="End Year or Present"
                                                            />
                                                       </div>
                                                  </div>


                                                  <div className="mb-4">
                                                       <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="details">
                                                            Details
                                                       </label>
                                                       <input
                                                            id="details"
                                                            name="details"
                                                            value={education.details}
                                                            onChange={handleEducationDetailChange}
                                                            className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                            placeholder="Details"
                                                       />
                                                  </div>

                                                  <button
                                                       onClick={handleAddEducation}
                                                       className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                                                  >
                                                       <span>
                                                            {editingIndex !== null ? 'Update School' : 'Add School'}
                                                       </span>
                                                  </button>
                                             </>
                                        ) :
                                             currentStep === 2 ? (
                                                  <>
                                                       <div className="flex flex-col md:flex-row gap-4 mb-6">
                                                            <div className="w-full md:w-1/2">
                                                                 <div>
                                                                      <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="jobTitle">
                                                                           Job Title
                                                                      </label>
                                                                      <input
                                                                           id="jobTitle"
                                                                           name="jobTitle"
                                                                           value={experience.jobTitle}
                                                                           onChange={handleExperienceDetailChange}
                                                                           className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                                           placeholder="Job Title"
                                                                      />
                                                                 </div>
                                                            </div>

                                                            <div className="w-full md:w-1/2">
                                                                 <div>
                                                                      <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="jobLocation">
                                                                           Job Location
                                                                      </label>
                                                                      <input
                                                                           id="jobLocation"
                                                                           name="jobLocation"
                                                                           value={experience.jobLocation}
                                                                           onChange={handleExperienceDetailChange}
                                                                           className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                                           placeholder="Job Location"
                                                                      />
                                                                 </div>
                                                            </div>
                                                       </div>


                                                       <div className="mb-6">
                                                            <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="companyName">
                                                                 Company Name
                                                            </label>
                                                            <input
                                                                 id="companyName"
                                                                 name="companyName"
                                                                 value={experience.companyName}
                                                                 onChange={handleExperienceDetailChange}
                                                                 className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                                 placeholder="Company Name"
                                                            />
                                                       </div>

                                                       <div className="flex flex-col md:flex-row gap-4 mb-6">
                                                            <div className="w-full md:w-1/2">
                                                                 <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="startYear">
                                                                      Start Year
                                                                 </label>
                                                                 <input
                                                                      id="startYear"
                                                                      name="startYear"
                                                                      value={experience.startYear}
                                                                      onChange={handleExperienceDetailChange}
                                                                      type="number"
                                                                      className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                                      placeholder="Start Year"
                                                                 />
                                                            </div>

                                                            <div className="w-full md:w-1/2">
                                                                 <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="endYear">
                                                                      End Year (or Present)
                                                                 </label>
                                                                 <input
                                                                      id="endYear"
                                                                      name="endYear"
                                                                      value={experience.endYear}
                                                                      onChange={handleExperienceDetailChange}
                                                                      type="text"
                                                                      className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                                      placeholder="End Year or Present"
                                                                 />
                                                            </div>
                                                       </div>

                                                       <div className="mb-6">
                                                            <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="details">
                                                                 Details
                                                            </label>
                                                            <textarea
                                                                 id="details"
                                                                 name="details"
                                                                 value={experience.details}
                                                                 onChange={handleExperienceDetailChange}
                                                                 className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                                 rows="4"
                                                                 placeholder="Bullet points for details"
                                                            />
                                                       </div>

                                                       <button onClick={handleAddExperience} className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                                                       >
                                                            <span>
                                                                 {editingIndex !== null ? 'Update Experience' : 'Add Experience'}
                                                            </span>
                                                       </button>

                                                       <div className="mt-4 p-4 md:p-5 bg-gray-700 shadow-lg rounded-lg">
                                                            <h3 className="text-lg md:text-xl font-semibold mb-4">AI Suggestions</h3>
                                                            <p className="text-gray-300 mb-4">
                                                                 Let our AI help you enhance your experience details. Click below to get tailored suggestions.
                                                            </p>
                                                            <button
                                                                 className="bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 p-2 rounded-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center"
                                                            >
                                                                 <svg
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                      viewBox="0 0 512 512"
                                                                      className="w-6 h-6"
                                                                      fill="currentColor"
                                                                 >
                                                                      <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                                                                 </svg>
                                                            </button>
                                                       </div>
                                                  </>
                                             ) : currentStep === 3 ? (
                                                  <>
                                                       <div className="mb-6">
                                                            <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="projectName">
                                                                 Project Name
                                                            </label>
                                                            <input
                                                                 id="projectName"
                                                                 name="projectName"
                                                                 value={project.projectName}
                                                                 onChange={handleProjectDetailChange}
                                                                 className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                                 placeholder="Project Name"
                                                            />
                                                       </div>

                                                       <div className="flex flex-col md:flex-row gap-4 mb-6">
                                                            <div className="w-full md:w-1/2">
                                                                 <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="startYear">
                                                                      Start Year
                                                                 </label>
                                                                 <input
                                                                      id="startYear"
                                                                      name="startYear"
                                                                      value={project.startYear}
                                                                      onChange={handleProjectDetailChange}
                                                                      type="number"
                                                                      className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                                      placeholder="Start Year"
                                                                 />
                                                            </div>

                                                            <div className="w-full md:w-1/2">
                                                                 <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="endYear">
                                                                      End Year (or Present)
                                                                 </label>
                                                                 <input
                                                                      id="endYear"
                                                                      name="endYear"
                                                                      value={project.endYear}
                                                                      onChange={handleProjectDetailChange}
                                                                      type="text"
                                                                      className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                                      placeholder="End Year or Present"
                                                                 />
                                                            </div>
                                                       </div>


                                                       <div className="mb-4">
                                                            <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="projectDetails">
                                                                 Project Details
                                                            </label>
                                                            <textarea
                                                                 id="projectDetails"
                                                                 name="projectDetails"
                                                                 value={project.projectDetails}
                                                                 onChange={handleProjectDetailChange}
                                                                 className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                                 rows="4"
                                                                 placeholder="Details about the project"
                                                            />
                                                       </div>

                                                       <button
                                                            onClick={handleAddProject}
                                                            className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                                                       >
                                                            <span>
                                                                 {editingIndex !== null ? 'Update Project' : 'Add Project'}
                                                            </span>
                                                       </button>

                                                       <div className="mt-5 p-4 md:p-5 bg-gray-700 shadow-lg rounded-lg">
                                                            <h3 className="text-lg md:text-xl font-semibold mb-4">AI Suggestions</h3>
                                                            <p className="text-gray-300 mb-4">
                                                                 Let our AI help you enhance your project details. Click below to get tailored suggestions.
                                                            </p>
                                                            <button
                                                                 className="bg-transparent hover:bg-blue-50 text-blue-500 hover:text-blue-600 p-2 rounded-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center"
                                                            >
                                                                 <svg
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                      viewBox="0 0 512 512"
                                                                      className="w-6 h-6"
                                                                      fill="currentColor"
                                                                 >
                                                                      <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                                                                 </svg>
                                                            </button>
                                                       </div>
                                                  </>
                                             )
                                                  : currentStep === 4 ? (
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
                                                                      className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
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
                                                  ) : currentStep === 5 ? (
                                                       <>

                                                            {/* Skills Section */}
                                                            <SkillsDropdown skills={skills} handleSkillsUpdate={handleSkillsUpdate} />
                                                       </>
                                                  ) : currentStep === 6 && (
                                                       <>

                                                            <div className="mb-6">
                                                                 <label className="block text-gray-300 text-sm md:text-base mb-2 mt-3" htmlFor="phoneNumber">
                                                                      Phone Number
                                                                 </label>
                                                                 <input
                                                                      id="phoneNumber"
                                                                      name="phoneNumber"
                                                                      value={additionalDetails.phoneNumber || ''}
                                                                      onChange={handleAdditionalDetailsChange}
                                                                      className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                                      placeholder="Phone Number"
                                                                 />

                                                                 <label className="block text-gray-300 text-sm md:text-base mb-2 mt-5" htmlFor="githubLink">
                                                                      Github Link
                                                                 </label>
                                                                 <input
                                                                      id="githubLink"
                                                                      name="githubLink"
                                                                      value={additionalDetails.githubLink || ''}
                                                                      onChange={handleAdditionalDetailsChange}
                                                                      className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out"
                                                                      placeholder="Github Link"
                                                                 />

                                                                 <label className="mt-5 block text-gray-300 text-sm md:text-base mb-2" htmlFor="linkedinProfileLink">
                                                                      LinkedIn Profile Link
                                                                 </label>
                                                                 <input
                                                                      id="linkedinProfileLink"
                                                                      name="linkedinProfileLink"
                                                                      value={additionalDetails.linkedinProfileLink || ''}
                                                                      onChange={handleAdditionalDetailsChange}
                                                                      className="bg-gray-700 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none focus:bg-gray-600 transition duration-200 ease-in-out mb-6"
                                                                      placeholder="LinkedIn Profile Link"
                                                                 />


                                                                 <button onClick={handleAddAdditionalDetails}
                                                                      className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                                                                 >  {editingIndex !== null ? 'Update' : 'Add'}
                                                                 </button>
                                                            </div>
                                                       </>
                                                  )
                              }

                              <div className="flex justify-between mt-8">
                                   {currentStep > 0 && (
                                        <button
                                             onClick={handlePrevious}
                                             className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:shadow-outline flex items-center"
                                        >
                                             <ChevronLeftIcon className="w-6 h-6" />
                                             <span className="sr-only">Previous</span> {/* Screen reader text for accessibility */}
                                        </button>
                                   )}
                                   {currentStep < sections.length - 1 ? (
                                        <button
                                             onClick={handleNext}
                                             className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:shadow-outline flex items-center"
                                        >
                                             <ChevronRightIcon className="w-6 h-6" />
                                             <span className="sr-only">Next</span> {/* Screen reader text for accessibility */}
                                        </button>
                                   ) : (
                                        <button
                                             onClick={() => alert('Resume Submitted!')}
                                             className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:shadow-outline flex items-center"
                                        >
                                             <CheckCircleIcon className="w-6 h-6" />
                                             <span className="sr-only">Submit Resume</span> {/* Screen reader text for accessibility */}
                                        </button>
                                   )}
                              </div>
                         </div>
                    </div>

                    {/* Right Side: Preview Section */}
                    <div className="w-full md:w-1/2 p-6 md:p-8 from-gray-800 shadow-3xl rounded-3xl flex flex-col justify-between relative overflow-auto hidden-scrollbar md:ml-4 lg:ml-6 md:mr-8 lg:mr-10">
                         <header className="absolute top-0 left-0 w-full p-5 z-10 bg-gray-900 bg-opacity-90 shadow-2xl rounded-b-lg">
                              <h1 className="text-lg md:text-xl font-light text-white text-shadow-lg">
                                   Resume Preview
                              </h1>
                         </header>
                         <div className="p-4 mt-8 bg-gray-100 max-w-4xl mx-auto rounded-lg shadow-md" style={{ fontFamily: 'Times New Roman', fontSize: '10px' }}>
                              {/* Header */}
                              <header className="mb-3">
                                   <h1 className="text-xl font-bold text-gray-800 text-center mb-1">{name}</h1>
                                   <div className="flex justify-center items-center gap-2 mb-2 text-gray-700 text-xs">
                                        <span>{email}</span>
                                        <span className="text-gray-700 mx-1">|</span>
                                        <span>7718389537</span>
                                        <span className="text-gray-700 mx-1">|</span>
                                        <a href={additionalDetails.linkedinProfileLink} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                             <FaLinkedin className="w-4 h-4" />
                                        </a>
                                        <span className="text-gray-700 mx-1">|</span>
                                        <a href={additionalDetails.githubLink} className="text-gray-800 hover:underline" target="_blank" rel="noopener noreferrer">
                                             <FaGithub className="w-4 h-4" />
                                        </a>
                                   </div>
                              </header>

                              {/* Summary */}
                              <section className="mb-1">
                                   <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2" style={{ fontSize: '12px' }}>Summary</h2>
                                   <p className="text-gray-700 text-xs leading-tight">{addedSummary}</p>
                              </section>

                              {/* Experience */}
                              <section className="mb-1">
                                   <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2" style={{ fontSize: '12px' }}>Experience</h2>
                                   {experienceList.length > 0 ? (
                                        experienceList.map((exp, index) => (
                                             <div key={index} className="mb-3 border-b border-gray-300 pb-2">
                                                  <div className="flex justify-between items-start">
                                                       <div>
                                                            <h3 className="font-semibold text-black">{exp.jobTitle}</h3>
                                                            <p className="text-gray-600 text-xs">{exp.companyName}, {exp.jobLocation}</p>
                                                       </div>
                                                       <p className="text-gray-600 text-xs font-semibold">{exp.startYear} -- {exp.endYear}</p>
                                                  </div>
                                                  <p className="text-gray-600 text-xs inline-block ml-2">{exp.details}</p>
                                             </div>
                                        ))
                                   ) : (
                                        <p className="text-gray-700 text-xs">No experience details provided</p>
                                   )}
                              </section>

                              {/* Education */}
                              <section className="mb-1">
                                   <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2" style={{ fontSize: '12px' }}>Education</h2>
                                   {educationList.length > 0 ? (
                                        educationList.map((edu, index) => (
                                             <div key={index} className="mb-3 border-b border-gray-300 pb-2">
                                                  <div className="flex justify-between items-start">
                                                       <div>
                                                            <h3 className="font-semibold text-gray-800">{edu.degree} </h3>
                                                            <p className="text-gray-600 text-xs inline-block">{edu.schoolName}, {edu.location}</p>

                                                       </div>
                                                       <p className="text-gray-600 text-xs font-semibold">{edu.startYear} -- {edu.endYear}</p>
                                                  </div>
                                                  <p className="text-gray-600 text-xs inline-block ml-2">{edu.details}</p>
                                             </div>
                                        ))
                                   ) : (
                                        <p className="text-gray-700 text-xs">No education details provided</p>
                                   )}
                              </section>

                              {/* Projects */}
                              <section className="mb-1">
                                   <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1" style={{ fontSize: '12px' }}>Projects</h2>
                                   {projectsList.length > 0 ? (
                                        projectsList.map((proj, index) => (
                                             <div key={index} className="mb-3 border-b border-gray-300 pb-2">
                                                  <div className="flex justify-between items-start">
                                                       <div>
                                                            <h3 className="font-semibold text-gray-800">{proj.projectName}</h3>
                                                       </div>
                                                       <p className="text-gray-600 text-xs font-semibold">{proj.startYear} -- {proj.endYear}</p>
                                                  </div>
                                                  <p className="text-gray-800 text-sm" style={{ fontSize: '12px' }}>{proj.projectDetails}</p>
                                             </div>
                                        ))
                                   ) : (
                                        <p className="text-gray-700 text-xs">No projects provided</p>
                                   )}
                              </section>

                              {/* Skills */}
                              <section className="mb-1">
                                   <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2" style={{ fontSize: '12px' }}>Skills</h2>
                                   <p className="text-gray-700 text-xs">{skills.join(', ')}</p>
                              </section>

                              {/* Languages */}
                              <section className="mb-1">
                                   <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2" style={{ fontSize: '12px' }}>Languages</h2>
                                   {languagesList.length > 0 ? (
                                        languagesList.map((lang, index) => (
                                             <div key={index} className="mb-2">
                                                  <p className="text-gray-700 text-xs">
                                                       <strong>{lang.languageName}</strong>: {lang.expertise}
                                                  </p>
                                             </div>
                                        ))
                                   ) : (
                                        <p className="text-gray-700 text-xs">No languages added yet.</p>
                                   )}
                              </section>
                         </div>
                    </div>
               </div>
          </div>

     );
};

export default ResumeBuilder;
