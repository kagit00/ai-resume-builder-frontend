import React from 'react';
import Header from './Header';
import Experience from './Experience';
import Project from './Project';
import Language from './Language';
import Education from './Education';
import DOMPurify from 'dompurify';
import './styles.css'

const ResumePreview = ({ userDetails, addedSummary, addedAdditionalDetails, experienceList, educationList, projectsList, skills, languagesList }) => {
     const name = userDetails.name
     const email = userDetails.username

     return (
          <div className="w-full md:w-1/2 lg:w-1/2 p-10 shadow-3xl rounded-3xl flex flex-col justify-between relative overflow-auto mt-2 md:mt-0 hidden-scrollbar">
               <div className="bg-white font-sans text-xs mx-auto shadow-md px-6">
                    {/* Header */}
                    <header className="flex flex-col mb-1 mt-5">
                         {/* Name Section */}
                         <div className="flex justify-between items-center">
                              <h2 className="text-lg font-semibold text-black leading-tight">{name}</h2>
                         </div>

                         {/* Contact Info Section */}
                         <div className="flex justify-between items-center text-xs text-gray-700 mt-1">
                              <div className="flex flex-col">
                                   <span>
                                        <a href={`mailto:${email}`} className="hover:underline">{email}</a>
                                   </span>
                                   <span>{addedAdditionalDetails.phoneNumber}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                   {/* LinkedIn */}
                                   <a
                                        href={addedAdditionalDetails.linkedInProfileLink}
                                        className="text-blue-800 font-semibold hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                   >
                                        LinkedIn
                                   </a>

                                   {/* GitHub */}
                                   <a
                                        href={addedAdditionalDetails.githubLink}
                                        className="text-blue-800 font-semibold hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                   >
                                        GitHub
                                   </a>
                              </div>
                         </div>

                         {/* Divider */}
                         <hr className="border-t mt-2" />
                    </header>

                    {/* Summary Section */}
                    <section className="mb-2 text-black">
                         {/* Section Heading */}
                         <h5 className="text-sm font-semibold border-b border-gray-300 pb-1">Summary</h5>

                         {/* Summary Content */}
                         <div className="custom font-normal leading-relaxed mt-1 cust" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(addedSummary) }} />
                    </section>

                    {/* Experience */}
                    <Experience experienceList={experienceList} />

                    {/* Education */}
                    <Education educationList={educationList} />

                    {/* Projects */}
                    <Project projectsList={projectsList} />
                    

                    {/* Skills */}
                    <section className="mb-2">
                         {/* Section Heading */}
                         <h5 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-1 tracking-wide">Skills</h5>

                         {/* Skills List */}
                         <p className="text-xs text-gray-700 font-medium mt-1">
                              {skills.length === 0 ? 'No skills listed' : skills.join(', ')}
                         </p>
                    </section>

                    {/* Languages */}
                    <Language languagesList={languagesList} />
                    
               </div>

          </div>

     );
};

export default ResumePreview;
