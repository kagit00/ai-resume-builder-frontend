import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const FinalResume = ({ userDetails, addedSummary, addedAdditionalDetails, experienceList, educationList, projectsList, skills, languagesList }) => {
     const name = userDetails.name
     const email = userDetails.username

     return (
          <div className="w-full py-5 px-8 shadow-3xl rounded-3xl flex flex-col justify-between relative overflow-auto">
               <div className="bg-white font-sans text-base mx-auto shadow-md px-6">
                    {/* Header */}
                    <header className="mb-6 mt-4 flex justify-between items-center">
                         <h5 className="text-lg font-normal text-black leading-tight">{name}</h5>
                         <div className="text-black font-semibold leading-tight flex items-center gap-4 text-xs">
                              <a href={`mailto:${email}`}>{email}</a>
                              <span className="mx-2"></span>
                              <span>{addedAdditionalDetails.phoneNumber}</span>
                              <span className="mx-2"></span>
                              <a href={`https://${addedAdditionalDetails.linkedInProfileLink.replace(/^(https?:\/\/)?/, '')}`} className="text-blue-800" target="_blank" rel="noopener noreferrer">
                                   LinkedIn
                              </a>
                              <span className="mx-2"></span>
                              <a href={`https://${addedAdditionalDetails.githubLink.replace(/^(https?:\/\/)?/, '')}`} className="text-blue-800" target="_blank" rel="noopener noreferrer">
                                   GitHub
                              </a>
                         </div>
                    </header>


                    {/* Summary */}
                    <section className="mb-5">
                         <h5 className="text-medium font-semibold text-black border-b-2 border-zinc-300 pb-3">Summary</h5>
                         <p className="text-sm text-black font-normal leading-tight">{addedSummary}</p>
                    </section>

                    {/* Experience */}
                    <section className="mb-4">
                         <h5 className="text-medium font-semibold text-black border-b-2 border-gray-300 pb-3">Experience</h5>
                         {experienceList.length > 0 ? (
                              experienceList.map((exp, index) => (
                                   <div key={index} className="mb-2 border-b border-gray-300 pb-2">
                                        <div className="flex justify-between items-start">
                                             <div className="text-sm">
                                                  <h5 className="font-semibold text-black">{exp.title}</h5>
                                                  <p className="text-gray-600">{exp.organization}, {exp.location}</p>
                                                  <p className="text-gray-600 font-semibold leading-tight">{exp.startDate} - {exp.endDate}</p>
                                                  <p className="text-black font-normal leading-tight">{exp.description}</p>
                                             </div>
                                        </div>
                                   </div>
                              ))
                         ) : (
                              <p className="text-medium text-black font-semibold leading-tight">No experience listed</p>
                         )}
                    </section>

                    {/* Education */}
                    <section className="mb-4">
                         <h5 className="text-medium font-semibold text-black border-b-2 border-gray-300 pb-3">Education</h5>
                         {educationList.length > 0 ? (
                              educationList.map((edu, index) => (
                                   <div key={index} className="mb-2 border-b border-gray-300 pb-2 text-sm">
                                        <div className="flex justify-between items-start">
                                             <div>
                                                  <h5 className="font-semibold text-black">{edu.title}</h5>
                                                  <p className="text-gray-600">{edu.organization}, {edu.location}</p>
                                             </div>
                                             <p className="text-gray-600 font-semibold leading-tight">{edu.startDate} - {edu.endDate}</p>
                                        </div>
                                        <p className="text-black font-normal leading-tight">{edu.description}</p>
                                   </div>
                              ))
                         ) : (
                              <p className="text-medium text-black">No education listed</p>
                         )}
                    </section>

                    {/* Projects */}
                    <section className="mb-4">
                         <h5 className="text-medium font-semibold text-black border-b-2 border-gray-300 pb-3">Projects</h5>
                         {projectsList.length > 0 ? (
                              projectsList.map((proj, index) => (
                                   <div key={index} className="mb-2 border-b border-gray-300 pb-2 text-sm">
                                        <div className="flex justify-between items-start">
                                             <div>
                                                  <h5 className="font-semibold text-black">{proj.title}</h5>
                                                  <p className="text-gray-600">{proj.organization}, {proj.location}</p>
                                             </div>
                                             <p className="text-gray-600 font-semibold leading-tight">{proj.startDate} - {proj.endDate}</p>
                                        </div>
                                        <p className="text-black font-normal leading-tight">{proj.description}</p>
                                   </div>
                              ))
                         ) : (
                              <p className="text-medium text-black">No projects listed</p>
                         )}
                    </section>

                    {/* Skills */}
                    <section className="mb-4">
                         <h5 className="text-medium font-semibold text-black border-b-2 border-gray-300 pb-3">Skills</h5>
                         <p className="text-sm text-black font-normal leading-tight">{skills.length === 0 ? 'No skills listed' : skills.join(', ')}</p>
                    </section>

                    {/* Languages */}
                    <section className="mb-4">
                         <h5 className="text-medium font-semibold text-gray-800 border-b-2 border-gray-300 pb-3 tracking-wide">Languages</h5>
                         {languagesList.length > 0 ? (
                              <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-1">
                                   {languagesList.map((lang, index) => (
                                        <p key={index} className="text-sm text-gray-700 font-medium">
                                             <span className="font-semibold text-gray-900">{lang.name}:</span>
                                             <span className="ml-1">{lang.proficiencyLevel}</span>
                                        </p>
                                   ))}
                              </div>
                         ) : (
                              <p className="text-sm text-gray-600 mt-2">No languages listed</p>
                         )}
                    </section>

               </div>
          </div>
     );
};

export default FinalResume;
