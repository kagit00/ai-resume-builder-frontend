import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Resume = ({userDetails, addedSummary, additionalDetails, experienceList, educationList, projectsList, skills, languagesList }) => {
     const name = userDetails.name
     const email = userDetails.username
     return (
          <div className="w-full md:w-1/2 p-6 md:p-8 shadow-3xl rounded-3xl flex flex-col justify-between relative overflow-auto hidden-scrollbar md:ml-4 lg:ml-6 md:mr-8 lg:mr-10">
               <div className="p-4 mt-4 bg-gray-100 max-w-4xl font-sans text-xs mx-auto shadow-md">
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
                         <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-zinc-300 mb-1" style={{ fontSize: '12px' }}>Summary</h2>
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
                                        <p className="text-gray-800 text-xs inline-block ml-2">{proj.projectDetails}</p>
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
     );
};

export default Resume;
