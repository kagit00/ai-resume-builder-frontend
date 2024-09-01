import Header from '@/components/custom/Home/Header/GlobalHeader.jsx'
import React, { useState, useEffect } from 'react';
import AddResume from '@/components/custom/UserDashboard/AddResume.jsx';
import ProfileSettingsModal from '@/components/custom/UserDashboard/ProfileSettingsModal.jsx';
import ResumeTipsModal from '@/components/custom/UserDashboard/ResumeTipsModal.jsx';
import { fetchUserDetailsFromToken, getResumeListByUserId } from '@/services/ApiService.js'
import HeroSection from '@/components/custom/UserDashboard/HeroSection.jsx';
import DownloadableResumes from '@/components/custom/UserDashboard/DownloadableResumes';
import PendingResumes from '@/components/custom/UserDashboard/PendingResumes';


function UserDashboard() {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isResumeTipsModalOpen, setResumeTipsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [pendingResumes, setPendingResumes] = useState([])
  const [downloadableResumes, setDownloadableResumes] = useState([])

  useEffect(() => {
    getDashboardDetails()
  }, []);


  const getDashboardDetails = async () => {
    //user details
    const result = await fetchUserDetailsFromToken();
    setUserDetails(result);

    //resume list
    const resumes = await getResumeListByUserId(result.id)
    const inProgressResumes = resumes.filter(resume => resume.status === 'IN_PROGRESS');
    setPendingResumes(inProgressResumes)

    const completedResumes = resumes.filter(resume => resume.status === 'COMPLETED');
    setDownloadableResumes(completedResumes)
  };

  const handleOpenProfileModal = () => {
    setProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setProfileModalOpen(false);
  };

  const handleOpenResumeTipsModal = () => {
    setResumeTipsModalOpen(true);
  };

  const handleCloseResumeTipsModal = () => {
    setResumeTipsModalOpen(false);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Header />
      <section id="home" className="relative flex-1 flex flex-col py-20 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 rounded-lg -z-10"></div>
            <HeroSection />
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-md -z-20"></div>
              <div className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-blue-300 to-purple-400 opacity-10 blur-sm -z-30"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-center justify-center bg-transparent rounded-3xl hover:shadow-3xl hover:scale-105">
              <AddResume userDetails={userDetails} />
            </div>

            <div className="relative p-6 rounded-sm shadow-2xl flex flex-col bg-gradient-to-l from-zinc-900 to-black overflow-hidden hover:shadow-3xl transition-colors duration-300">
              <div className="absolute inset-0 opacity-10 bg-pattern-background"></div>
              <h4 className="text-lg font-semibold text-white mb-2 truncate">Resume Tips</h4>
              <p className="text-sm font-semibold text-gray-400 leading-relaxed mb-8">
                Discover best practices for resume writing to ensure your application stands out from the crowd.
              </p>
              <div className="relative flex items-center justify-center mb-6">
                <div className="p-4 rounded-full bg-gradient-to-r from-black via to-blue-900 shadow-xl hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
                  <svg className="h-20 w-60 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                    <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    <line x1="12" y1="8" x2="12" y2="8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
              </div>
              <button
                onClick={handleOpenResumeTipsModal}
                className="absolute top-4 right-4 text-white shadow-md transform hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8 4a1 1 0 100-2 1 1 0 000 2zm.75-3.25a.75.75 0 00-1.5 0v-5.5a.75.75 0 011.5 0v5.5z" clipRule="evenodd" />
                </svg>
              </button>
              {isResumeTipsModalOpen && <ResumeTipsModal onClose={handleCloseResumeTipsModal} />}
            </div>


            <div className="relative p-6 rounded-sm shadow-3xl flex flex-col bg-gradient-to-l from-zinc-900 to-black overflow-hidden hover:shadow-3xl transition-transform duration-300">
              <div className="absolute inset-0 opacity-10 bg-pattern-background"></div>
              <h4 className="text-lg font-semibold text-white mb-2 truncate">Profile Settings</h4>
              <p className="text-sm font-semibold text-gray-400 leading-relaxed mb-4">
                Customize your profile to reflect your personal and professional identity accurately. Also view your profile details.
              </p>
              <div className="relative flex items-center justify-center mb-6">
                <div className="p-4 rounded-full bg-gradient-to-r from-black to-blue-900 shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
                  <svg className="h-20 w-60 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l-2-2 2-2m0 0l2 2-2 2m0-2V6m0 12l2 2-2 2m-6-6l-2-2 2-2m0 0l2 2-2 2m0-2V6m0 12l-2 2 2 2m12-6l-2-2 2-2m0 0l2 2-2 2m0-2V6" />
                  </svg>
                </div>
              </div>
              <button onClick={handleOpenProfileModal}
                className="absolute top-4 right-4 text-white shadow-md transform hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 5.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 18.4 9c.67 0 1.28.26 1.74.73a1.65 1.65 0 0 0 .33 1.82v.09h0z"></path>
                </svg>
              </button>
              {isProfileModalOpen && <ProfileSettingsModal onClose={handleCloseProfileModal} userDetails={userDetails} />}
            </div>

          </div>
        </div>
      </section>
      <PendingResumes pendingResumes={pendingResumes} userDetails={userDetails} />
      <DownloadableResumes downloadableResumes={downloadableResumes} />
    </div>
  )
}

export default UserDashboard


