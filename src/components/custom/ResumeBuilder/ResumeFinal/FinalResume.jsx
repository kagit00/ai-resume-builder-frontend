import React from 'react';
import './styles.css'

const FinalResume = ({ userDetails, addedSummary, addedAdditionalDetails, experienceList, educationList, projectsList, skills, languagesList }) => {
     const name = userDetails.name
     const email = userDetails.username

     return (
          <div className="w-full py-3 px-6 shadow-3xl rounded-3xl flex flex-col justify-between relative overflow-auto">
               <div className="bg-white font-sans text-sm mx-auto shadow-md px-4">
                    {/* Header */}
                    <header className="flex flex-col mb-4 mt-2">
                         {/* Name Section */}
                         <div className="flex justify-between items-center">
                              <h2 className="text-xl font-semibold text-black leading-tight">{name}</h2>
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
                                        href={`https://${addedAdditionalDetails.linkedInProfileLink.replace(/^(https?:\/\/)?/, '')}`}
                                        className="text-blue-800 font-semibold hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                   >
                                        LinkedIn
                                   </a>

                                   {/* GitHub */}
                                   <a
                                        href={`https://${addedAdditionalDetails.githubLink.replace(/^(https?:\/\/)?/, '')}`}
                                        className="text-blue-800 font-semibold hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                   >
                                        GitHub
                                   </a>
                              </div>
                         </div>

                         {/* Divider */}
                         <hr className="border-t mt-3" />
                    </header>

                    {/* Summary Section */}
                    <section className="mb-3 text-black">
                         {/* Section Heading */}
                         <h5 className="text-base font-semibold border-b border-gray-300 pb-2">Summary</h5>

                         {/* Summary Content */}
                         <div className="text-xs font-normal leading-relaxed mt-1" dangerouslySetInnerHTML={{ __html: addedSummary }} />
                    </section>

                    {/* Experience */}
                    <section className="mb-3">
                         {/* Section Heading */}
                         <h5 className="text-base font-semibold text-black border-b border-gray-300 pb-2">Experience</h5>

                         {/* Experience List */}
                         {experienceList.length > 0 ? (
                              experienceList.map((exp, index) => (
                                   <div key={index} className="mb-3 pb-2 border-b border-gray-300">
                                        <div className="flex justify-between items-start">
                                             {/* Experience Details */}
                                             <div className="text-xs">
                                                  {/* Job Title */}
                                                  <h5 className="font-semibold text-black text-base">{exp.title}</h5>

                                                  {/* Organization and Location */}
                                                  <p className="text-gray-700 font-medium">
                                                       {exp.organization}, {exp.location}
                                                  </p>

                                                  {/* Duration */}
                                                  <p className="text-gray-600 font-semibold">
                                                       {exp.startDate} - {exp.endDate || "Present"}
                                                  </p>

                                                  {/* Description with Rich Text Formatting */}
                                                  <div
                                                       className="text-black font-normal cust leading-snug mt-1"
                                                       dangerouslySetInnerHTML={{ __html: exp.description }}
                                                  />
                                             </div>
                                        </div>
                                   </div>
                              ))
                         ) : (
                              <p className="text-xs text-black font-semibold">No experience listed</p>
                         )}
                    </section>


                    {/* Education */}
                    <section className="mb-3">
                         {/* Section Heading */}
                         <h5 className="text-base font-semibold text-black border-b border-gray-300 pb-2">Education</h5>

                         {/* Education List */}
                         {educationList.length > 0 ? (
                              educationList.map((edu, index) => (
                                   <div key={index} className="mb-3 pb-2 border-b border-gray-300 text-xs">
                                        <div className="text-xs">
                                             {/* Degree/Title */}
                                             <h5 className="font-semibold text-black text-base">{edu.title}</h5>

                                             {/* Institution and Location */}
                                             <p className="text-gray-700 font-medium">
                                                  {edu.organization}, {edu.location}
                                             </p>

                                             {/* Dates of Study */}
                                             <p className="text-gray-600 font-semibold leading-snug">
                                                  {edu.startDate} - {edu.endDate || "Present"}
                                             </p>

                                             {/* Description */}
                                             {edu.description && (
                                                  <div
                                                       className="text-black font-normal leading-snug mt-1"
                                                       dangerouslySetInnerHTML={{ __html: edu.description }}
                                                  />
                                             )}
                                        </div>
                                   </div>
                              ))
                         ) : (
                              <p className="text-xs text-black font-semibold">No education listed</p>
                         )}
                    </section>

                    {/* Projects */}
                    <section className="mb-3">
                         {/* Section Heading */}
                         <h5 className="text-base font-semibold text-black border-b border-gray-300 pb-2">Projects</h5>

                         {/* Projects List */}
                         {projectsList.length > 0 ? (
                              projectsList.map((proj, index) => (
                                   <div key={index} className="mb-3 pb-2 border-b border-gray-300 text-xs">
                                        <div className="text-xs">
                                             {/* Project Title */}
                                             <h5 className="font-semibold text-black text-base">{proj.title}</h5>

                                             {/* Organization and Location */}
                                             <p className="text-gray-700 font-medium">
                                                  {proj.organization}, {proj.location}
                                             </p>

                                             {/* Project Dates */}
                                             <p className="text-gray-600 font-semibold leading-snug">
                                                  {proj.startDate} - {proj.endDate || "Present"}
                                             </p>

                                             {/* Project Description */}
                                             {proj.description && (
                                                  <div
                                                       className="text-black font-normal leading-snug mt-1"
                                                       dangerouslySetInnerHTML={{ __html: proj.description }}
                                                  />
                                             )}
                                        </div>
                                   </div>
                              ))
                         ) : (
                              <p className="text-xs text-black font-semibold">No projects listed</p>
                         )}
                    </section>

                    {/* Skills */}
                    <section className="mb-3">
                         {/* Section Heading */}
                         <h5 className="text-base font-semibold text-gray-800 border-b border-gray-300 pb-2 tracking-wide">Skills</h5>

                         {/* Skills List */}
                         <p className="text-xs text-gray-700 font-medium mt-1">
                              {skills.length === 0 ? 'No skills listed' : skills.join(', ')}
                         </p>
                    </section>

                    {/* Languages */}
                    <section className="mb-3">
                         {/* Section Heading */}
                         <h5 className="text-base font-semibold text-gray-800 border-b border-gray-300 pb-2 tracking-wide">Languages</h5>

                         {/* Languages List */}
                         {languagesList.length > 0 ? (
                              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-1">
                                   {languagesList.map((lang, index) => (
                                        <p key={index} className="text-xs text-gray-700 font-medium">
                                             <span className="font-semibold text-gray-900">{lang.name}:</span>
                                             <span className="ml-1">{lang.proficiencyLevel}</span>
                                        </p>
                                   ))}
                              </div>
                         ) : (
                              <p className="text-xs text-gray-600 mt-1">No languages listed</p>
                         )}
                    </section>
               </div>
          </div>

     );
};

export default FinalResume;
