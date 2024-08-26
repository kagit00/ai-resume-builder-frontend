import Header from '@/components/custom/Home/Header/GlobalHeader.jsx'
import React, { useState, useEffect } from 'react';
import AddResume from '@/components/custom/UserDashboard/AddResume.jsx';
import ProfileSettingsModal from '@/components/custom/UserDashboard/ProfileSettingsModal.jsx';
import ResumeTipsModal from '@/components/custom/UserDashboard/ResumeTipsModal.jsx';
import axios from 'axios';
import { fetchUserDetailsFromToken } from '@/services/ApiService.js'
import HeroSection from '@/components/custom/UserDashboard/HeroSection.jsx';
import { getGoogleOauth2Token, getJwtToken } from '@/utils/AuthUtils';

function UserDashboard() {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isResumeTipsModalOpen, setResumeTipsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const jwtToken = getJwtToken()
  const googleOauth2Token = getGoogleOauth2Token();
  const accessToken = (jwtToken === undefined || jwtToken === 'undefined') ? (googleOauth2Token === undefined || googleOauth2Token === 'undefined' ? null : googleOauth2Token)  : jwtToken;
  
  useEffect(() => {
    fetchTokenFromUri();
  }, []);

  const fetchTokenFromUri = () => {
    if (accessToken) {
      getUserDetails()
    }
  }

  const getUserDetails = async () => {
    const result = await fetchUserDetailsFromToken(accessToken);
    setUserDetails(result);
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
            <HeroSection/>
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-md -z-20"></div>
              <div className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-blue-300 to-purple-400 opacity-10 blur-sm -z-30"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-center justify-center bg-transparent rounded-3xl hover:shadow-3xl hover:scale-105">
              <AddResume userDetails={userDetails} />
            </div>

            <div className="relative p-6 rounded-3xl shadow-2xl flex flex-col bg-gradient-to-r from-zinc-900 to-black overflow-hidden hover:shadow-3xl transition-colors duration-300">
              <div className="absolute inset-0 opacity-10 bg-pattern-background"></div>
              <h4 className="text-xl md:text-xl lg:text-2xl mb-5 font-normal text-white">Resume Tips</h4>
              <p className="relative text-gray-300 mb-6">
                Discover best practices for resume writing to ensure your application stands out from the crowd.
              </p>
              <div className="relative flex items-center justify-center mb-6">
                <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
                  <svg className="h-20 w-20 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 16.5a3 3 0 01-3-3V7.5A3 3 0 019.75 4.5m0 12a1.5 1.5 0 003 0m-3-8V7.5m0 0a1.5 1.5 0 013 0M12 20h.01" />
                  </svg>
                </div>
              </div>
              <button
                onClick={handleOpenResumeTipsModal}
                className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-full shadow-md transform hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out text-sm font-medium"
              >
                Tips
              </button>
              {isResumeTipsModalOpen && <ResumeTipsModal onClose={handleCloseResumeTipsModal} />}
            </div>


            <div className="relative p-6 rounded-3xl shadow-3xl flex flex-col bg-gradient-to-r from-zinc-900 to-black overflow-hidden hover:shadow-3xl transition-transform duration-300">
              <div className="absolute inset-0 opacity-10 bg-pattern-background"></div>
              <h4 className="text-xl md:text-xl lg:text-2xl mb-5 font-normal text-white">Profile Settings</h4>
              <p className="relative text-gray-300 mb-6">
                Customize your profile to reflect your personal and professional identity accurately. Also view your profile details.
              </p>
              <div className="relative flex items-center justify-center mb-6">
                <div className="p-4 rounded-full bg-gradient-to-r from-green-500 to-teal-600 shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
                  <svg className="h-20 w-20 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l-2-2 2-2m0 0l2 2-2 2m0-2V6m0 12l2 2-2 2m-6-6l-2-2 2-2m0 0l2 2-2 2m0-2V6m0 12l-2 2 2 2m12-6l-2-2 2-2m0 0l2 2-2 2m0-2V6" />
                  </svg>
                </div>
              </div>
              <button onClick={handleOpenProfileModal}
                className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-full shadow-md transform hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out text-sm font-medium"
              >
                Settings
              </button>
              {isProfileModalOpen && <ProfileSettingsModal onClose={handleCloseProfileModal} userDetails={userDetails} />}
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default UserDashboard