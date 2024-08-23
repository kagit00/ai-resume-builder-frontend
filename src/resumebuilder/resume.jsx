import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Resume = ({
}) => {
     return (
          <div className="p-4 mt-8 bg-gray-100 max-w-4xl mx-auto rounded-lg shadow-md" style={{ fontFamily: 'Times New Roman', fontSize: '10px' }}>
               {/* Header */}
               <header className="mb-4">
                    <h1 className="text-xl font-bold text-gray-800 text-center mb-1">{name}</h1>
                    <div className="flex justify-center items-center gap-2 mb-2 text-gray-700 text-xs">
                         <span>{additionalDetails.phoneNumber}</span>
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
               <section className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2" style={{ fontSize: '12px' }}>Summary</h2>
                    <p className="text-gray-700 text-xs leading-tight">{addedSummary}</p>
               </section>

               {/* Experience */}
               <section className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2" style={{ fontSize: '12px' }}>Experience</h2>
                    {experienceList.length > 0 ? (
                         experienceList.map((exp, index) => (
                              <div key={index} className="mb-3 border-b border-gray-300 pb-2">
                                   <div className="flex justify-between items-start">
                                        <div>
                                             <h3 className="text-sm font-semibold text-gray-800">{exp.jobTitle}</h3>
                                             <p className="text-gray-600 text-xs">{exp.companyName}</p>
                                        </div>
                                        <p className="text-gray-600 text-xs">{exp.startYear} -- {exp.endYear}</p>
                                   </div>
                                   <ul className="list-disc list-inside text-gray-800 text-sm mt-2">
                                        {exp.details.split('\n').map((detail, i) => (
                                             <li key={i}>{detail}</li>
                                        ))}
                                   </ul>
                              </div>
                         ))
                    ) : (
                         <p className="text-gray-700 text-xs">No experience details provided</p>
                    )}
               </section>

               {/* Education */}
               <section className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2" style={{ fontSize: '12px' }}>Education</h2>
                    {educationList.length > 0 ? (
                         educationList.map((edu, index) => (
                              <div key={index} className="mb-3 border-b border-gray-300 pb-2">
                                   <div className="flex justify-between items-start">
                                        <div>
                                             <h3 className="text-sm font-semibold text-gray-800">{edu.degree}</h3>
                                             <p className="text-gray-600 text-xs inline-block">{edu.schoolName}</p>
                                             <p className="text-gray-600 text-xs inline-block ml-2">{edu.location}</p>
                                        </div>
                                        <p className="text-gray-600 text-xs">{edu.startYear} -- {edu.endYear}</p>
                                   </div>
                                   <p>Scored {edu.percentage} %</p>
                              </div>
                         ))
                    ) : (
                         <p className="text-gray-700 text-xs">No education details provided</p>
                    )}
               </section>

               {/* Projects */}
               <section className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2" style={{ fontSize: '12px' }}>Projects</h2>
                    {projectsList.length > 0 ? (
                         projectsList.map((proj, index) => (
                              <div key={index} className="mb-3 border-b border-gray-300 pb-2">
                                   <div className="flex justify-between items-start">
                                        <div>
                                             <h3 className="text-sm font-semibold text-gray-800">{proj.title}</h3>
                                        </div>
                                        <p className="text-gray-600 text-xs">{proj.startYear} -- {proj.endYear}</p>
                                   </div>
                                   <p className="text-gray-800 text-sm mt-2">{proj.projectDetails}</p>
                              </div>
                         ))
                    ) : (
                         <p className="text-gray-700 text-xs">No projects provided</p>
                    )}
               </section>

               {/* Skills */}
               <section className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-2" style={{ fontSize: '12px' }}>Skills</h2>
                    <p className="text-gray-700 text-xs">{skills.join(', ')}</p>
               </section>

               {/* Languages */}
               <section>
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
     );
};

export default Resume;
