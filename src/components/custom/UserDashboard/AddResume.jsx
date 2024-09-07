import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeCreationPopUp from '../ResumeBuilder/ResumeBuilderForms/ResumeCreationPopUp';
import { createResume } from '@/services/ApiService';

function AddResume({ userDetails }) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const resumeDetails = {
    userDetails: userDetails,
    isEditMode: false
  };

  const buildResume = async (title) => {
    const response = await createResume({ 'title': title }, userDetails.id);
    navigate('/user/dashboard/resumeBuilder', { state: { resume: response, resumeDetails } });
  };

  return (
    <div>
      <div
        className="flex items-center justify-center  p-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <div className="flex items-center justify-center mb-4 bg-gray-900 rounded-full p-4 shadow-lg">
          <svg
            className="h-16 w-16 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </div>

      <ResumeCreationPopUp
        isOpen={openDialog} 
        onClose={() => setOpenDialog(false)} 
        onSubmit={buildResume} 
      />
    </div>
  );
}

export default AddResume;
