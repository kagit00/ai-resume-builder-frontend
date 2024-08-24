import Header from '@/components/custom/header'
import React, { useState, useEffect } from 'react';
import AddResume from './components/addResume';
import { Typewriter } from "react-simple-typewriter";
import ProfileSettingsModal from '../profile/index.jsx';
import ResumeTipsModal from '../resumeTips/index.jsx';
import axios from 'axios';
import Cookies from 'js-cookie';

function Dashboard() {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isResumeTipsModalOpen, setResumeTipsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const accessToken = Cookies.get('GOOGLE_OAUTH2_TOKEN');

  useEffect(() => {
    fetchTokenFromUri();
  }, []);

  const fetchTokenFromUri = () => {
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      fetchUserDetailsFromToken();
    }
  }

  const fetchUserDetailsFromToken = async (e) => {
    try {
      const response = await axios.get(`http://localhost:8080/auth/current-user`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
        withCredentials: true,
      });

      const userDetails = response.data;
      if (userDetails) setUserDetails(userDetails);
      else setErrorMessage('Failed to fetch user details.');
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) setErrorMessage(`Login failed: ${error.response.data.message}`);
      else if (error.request) setErrorMessage('Login failed: No response from the server.');
      else setErrorMessage('Login failed: An unexpected error occurred.');
    }
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

            <div className="relative z-10 max-w-3xl mx-auto px-6 py-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 animate-gradientPulse drop-shadow-lg">
                <span className="inline-block">
                  <Typewriter
                    words={["Hello", "Hola", "Namaste"]}
                    cursor
                    cursorStyle="_"
                    typeSpeed={80}
                    deleteSpeed={60}
                    delaySpeed={1000}
                  />
                </span>
              </h2>

              <p className="text-sm md:text-md lg:text-lg leading-relaxed text-gray-400 font-light">
                <span className="font-bold bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 text-transparent">
                  Click on the '+'
                </span>
                {' '} and make your professional resumes effortlessly. Our tools help you craft standout resumes, showcasing your skills and experience to potential employers.
              </p>
            </div>

            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-md -z-20"></div>
              <div className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-blue-300 to-purple-400 opacity-10 blur-sm -z-30"></div>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-center justify-center bg-transparent rounded-3xl hover:shadow-3xl hover:scale-105">
              <AddResume userDetails={userDetails}/>
            </div>

            <div className="relative p-6 rounded-3xl shadow-2xl flex flex-col bg-zinc-900 overflow-hidden hover:shadow-3xl transition-colors duration-300">
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


            <div className="relative p-6 rounded-3xl shadow-3xl flex flex-col bg-zinc-900 overflow-hidden hover:shadow-3xl transition-transform duration-300">
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
              {isProfileModalOpen && <ProfileSettingsModal onClose={handleCloseProfileModal} userDetails={userDetails}/>}
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard