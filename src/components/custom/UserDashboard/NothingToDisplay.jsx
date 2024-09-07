import React, { useState } from 'react';
import ResumeCreationPopUp from '../ResumeBuilder/ResumeBuilderForms/ResumeCreationPopUp';
import { createResume } from '@/services/ApiService';
import { useNavigate } from 'react-router-dom';

const NothingToDisplay = ({ text, userDetails }) => {
     const navigate = useNavigate();
     const [openDialog, setOpenDialog] = useState(false);
     const resumeDetails = {
          userDetails: userDetails,
          isEditMode: false
     };

     const handleCreateResume = async (title) => {
          const response = await createResume({ 'title': title }, userDetails.id);
          navigate('/user/dashboard/resumeBuilder', { state: { resume: response, resumeDetails } });
     };

     return (
          <div className="flex flex-col items-center justify-center h-full bg-transparent mt-20 text-white p-8 rounded-xl">
               <div className="flex flex-col items-center">
                    <div className="p-6 bg-zinc-700 rounded-full shadow-xl animate-bounce">
                         <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              className="w-16 h-16 text-zinc-300"
                         >
                              <path
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                   d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5m7.5-4.5a9 9 0 11-12.727 0A9 9 0 0117.25 12z"
                              />
                         </svg>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-light mt-8 animate-fadeIn">{text}</h1>
                    <p className="mt-6 text-lg md:text-xl text-zinc-400 text-center">
                         Create a new one today. It will appear here.
                    </p>

                    <button
                         className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-300 ease-in-out shadow-lg"
                         onClick={() => setOpenDialog(true)}
                    >
                         Create New Resume
                    </button>
               </div>

               <ResumeCreationPopUp
                    isOpen={openDialog}
                    onClose={() => setOpenDialog(false)}
                    onSubmit={handleCreateResume}
               />
          </div>
     );
};

export default NothingToDisplay;
