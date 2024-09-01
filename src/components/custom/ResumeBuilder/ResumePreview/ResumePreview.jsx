import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const ResumePreview = ({ userDetails, addedSummary, addedAdditionalDetails, experienceList, educationList, projectsList, skills, languagesList }) => {
     const name = userDetails.name
     const email = userDetails.username

     return (
          <div className="w-full md:w-1/2 p-6 md:p-8 shadow-3xl rounded-3xl flex flex-col justify-between relative overflow-auto hidden-scrollbar md:ml-4 lg:ml-6 md:mr-8 lg:mr-10">
               <div className="p-4 mt-4 bg-gray-100 max-w-4xl font-sans text-xs mx-auto shadow-md">
                    {/* Header */}
                    <header className="mb-2">
                         <h4 className="text-xl font-normal text-gray-800 text-center mb-1 leading-tight">{name}</h4>
                         <div style={{ fontSize: '10px' }} className="text-gray-700 font-semibold leading-tight flex justify-center items-center gap-2 mb-2">
                              <span>{email}</span>
                              <span className="text-gray-700">|</span>
                              <span>{addedAdditionalDetails.phoneNumber}</span>
                              <span className="text-gray-700">|</span>
                              <a href={addedAdditionalDetails.linkedInProfileLink} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                   <FaLinkedin className=" h-4" />
                              </a>
                              <span className="text-gray-700 mx-1">|</span>
                              <a href={addedAdditionalDetails.githubLink} className="text-gray-800 hover:underline" target="_blank" rel="noopener noreferrer">
                                   <FaGithub className=" h-4" />
                              </a>
                         </div>
                    </header>

                    {/* Summary */}
                    <section className="mb-1">
                         <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-zinc-300" style={{ fontSize: '12px' }}>Summary</h2>
                         <p style={{ fontSize: '10px' }} className="text-gray-700 font-semibold leading-tight">{addedSummary}</p>
                    </section>

                    {/* Experience */}
                    <section>
                         <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-1" style={{ fontSize: '12px' }}>Experience</h2>
                         {experienceList.length > 0 ? (
                              experienceList.map((exp, index) => (
                                   <div key={index} className="mb-3 border-b border-gray-300 pb-2">
                                        <div className="flex justify-between items-start">
                                             <div>
                                                  <h3 className="font-semibold text-black">{exp.title}</h3>
                                                  <p className="text-gray-600 text-xs">{exp.organization}, {exp.location}</p>
                                             </div>
                                             <p style={{ fontSize: '10px' }} className="text-gray-600 leading-tight font-semibold">{exp.startDate} - {exp.endDate}</p>
                                        </div>
                                        <p style={{ fontSize: '10px' }}
                                             className="text-gray-700 font-semibold leading-tight">{exp.description}</p>
                                   </div>
                              ))
                         ) : (
                              <p style={{ fontSize: '10px' }}
                                   className="text-gray-700 font-semibold leading-tight"></p>
                         )}
                    </section>

                    {/* Education */}
                    <section>
                         <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-1" style={{ fontSize: '12px' }}>Education</h2>
                         {educationList.length > 0 ? (
                              educationList.map((edu, index) => (
                                   <div key={index} className="mb-3 border-b border-gray-300 pb-2">
                                        <div className="flex justify-between items-start">
                                             <div>
                                                  <h3 className="font-semibold text-gray-800">{edu.title} </h3>
                                                  <p className="text-gray-600 text-xs inline-block">{edu.organization}, {edu.location}</p>

                                             </div>
                                             <p style={{ fontSize: '10px' }} className="text-gray-600 leading-tight font-semibold">{edu.startDate} - {edu.endDate}</p>
                                        </div>
                                        <p style={{ fontSize: '10px' }} className="text-gray-700 font-semibold leading-tight">{edu.description}</p>
                                   </div>
                              ))
                         ) : (
                              <p className="text-gray-700 text-xs"></p>
                         )}
                    </section>

                    {/* Projects */}
                    <section>
                         <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1" style={{ fontSize: '12px' }}>Projects</h2>
                         {projectsList.length > 0 ? (
                              projectsList.map((proj, index) => (
                                   <div key={index} className="mb-3 border-b border-gray-300 pb-2">
                                        <div className="flex justify-between items-start">
                                             <div>
                                                  <h3 className="font-semibold text-gray-800">{proj.title}</h3>
                                             </div>
                                             <p style={{ fontSize: '10px' }} className="text-gray-600 leading-tight font-semibold">{proj.startDate} - {proj.endDate}</p>
                                        </div>
                                        <p style={{ fontSize: '10px' }} className="text-gray-700 font-semibold leading-tight">{proj.description}</p>
                                   </div>
                              ))
                         ) : (
                              <p className="text-gray-700 text-xs"></p>
                         )}
                    </section>

                    {/* Skills */}
                    <section>
                         <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-1" style={{ fontSize: '12px' }}>Skills</h2>
                         <p style={{ fontSize: '10px' }} className="text-gray-700 font-semibold leading-tight">{skills.length === 0 ? 'No skills listed' : skills.join(', ')}</p>
                    </section>

                    {/* Languages */}
                    <section>
                         <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-1" style={{ fontSize: '12px' }}>Languages</h2>
                         {languagesList.length > 0 ? (
                              <div className="mb-2 flex flex-wrap gap-4">
                                   {languagesList.map((lang, index) => (
                                        <p key={index} className="text-gray-700 text-xs font-semibold">
                                             {lang.name}: {lang.proficiencyLevel}
                                        </p>
                                   ))}
                              </div>
                         ) : (
                              <p className="text-gray-700 text-xs"></p>
                         )}
                    </section>
               </div>
          </div>
     );
};

export default ResumePreview;
