import React from 'react';
import Header from './Header';
import Experience from './Experience';
import Project from './Project';
import Language from './Language';
import Education from './Education';

const ResumePreview = ({ userDetails, addedSummary, addedAdditionalDetails, experienceList, educationList, projectsList, skills, languagesList }) => {
     const name = userDetails.name
     const email = userDetails.username

     return (
          <div className="w-1/2 p-6 md:p-8 shadow-3xl rounded-3xl flex flex-col justify-between relative overflow-auto hidden-scrollbar md:ml-4 lg:ml-6 md:mr-8 lg:mr-10">
               <div className="px-8 py-5 mt-3 bg-slate-200 max-w-4xl font-sans text-xs mx-auto shadow-md">

                    <Header name={name} email={email} addedAdditionalDetails={addedAdditionalDetails} />

                    {/* Summary */}
                    <section className="mb-4">
                         <h5 className="text-medium font-semibold text-black border-b border-gray-300 pb-2">Summary</h5>
                         <p className="text-xs text-black font-normal leading-snug">{addedSummary}</p>
                    </section>

                    {/* Experience */}
                    <Experience experienceList={experienceList} />

                    {/* Education */}
                    <Education educationList={educationList} />

                    {/* Projects */}
                    <Project projectsList={projectsList} />

                    {/* Skills */}
                    <section className="mb-3">
                         <h5 className="text-medium font-semibold text-black border-b border-gray-300 pb-2">Skills</h5>
                         <p className="text-xs text-black font-normal leading-tight">{skills.length === 0 ? 'No skills listed' : skills.join(', ')}</p>
                    </section>

                    {/* Languages */}
                    <Language languagesList={languagesList} />

               </div>
          </div>
     );
};

export default ResumePreview;
