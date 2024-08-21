import Header from '@/components/custom/header'
import React, { useState, useEffect } from 'react';
import AddResume from './components/addResume';
import { Typewriter } from "react-simple-typewriter";
import ProfileSettingsModal from '../profile/index.jsx';
import ResumeTipsModal from '../resumeTips/index.jsx';
import axios from 'axios';

function Dashboard() {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isResumeTipsModalOpen, setResumeTipsModalOpen] = useState(false);
  const appEnv = 'prod';
  const apiUrl = import.meta.env.API_URL;
  const [userDetails, setUserDetails] = useState(null);
  const accessToken = new URLSearchParams(window.location.search).get('oauth');

  useEffect(() => {
    if (appEnv === 'prod') {
      //cookie based implementation
    } else {
      fetchTokenFromUri();
    }
  }, []);

  const fetchTokenFromUri = () => {
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      localStorage.setItem('GOOGLE_OAUTH2_TOKEN', accessToken);
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
      if (userDetails) {
        setUserDetails(userDetails);
        localStorage.setItem('GOOGLE_OAUTH2_USERNAME', userDetails.username);
        localStorage.setItem('GOOGLE_OAUTH2_NAME', userDetails.name);
        localStorage.setItem('GOOGLE_OAUTH2_USER_MEMBER_SINCE', userDetails.timestamp);
        localStorage.setItem('GOOGLE_OAUTH2_USER_BIO', userDetails.bio);
      } else {
        setErrorMessage('Failed to fetch user details.');
      }
    } catch (error) {
      console.error('Login failed:', error);

      if (error.response) {
        setErrorMessage(`Login failed: ${error.response.data.message}`);
      } else if (error.request) {
        setErrorMessage('Login failed: No response from the server.');
      } else {
        setErrorMessage('Login failed: An unexpected error occurred.');
      }
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
      <section id="home" className="relative flex-1 flex flex-col bg-gradient-to-r from-gray-900 to-black py-20 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 font-light text-white">
              <Typewriter
                words={[
                  "Hello",
                  "Hola",
                  "Namaste"
                ]}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-300">
              Create and manage your professional resumes effortlessly. Our tools help you craft standout resumes, showcasing your skills and experience to potential employers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative bg-gray-800 p-6 rounded-3xl shadow-2xl">
              <h4 className="text-xl md:text-2xl lg:text-3xl mb-6 font-thin text-white">Create a Resume</h4>
              <AddResume />
            </div>

            <div className="relative bg-gray-800 p-6 rounded-3xl shadow-2xl">
              <h4 className="text-xl md:text-2xl lg:text-3xl mb-6 font-thin text-white">Resume Tips</h4>
              <p className="text-gray-300 mb-6">
                Discover best practices for resume writing to ensure your application stands out from the crowd.
              </p>
              <button onClick={handleOpenResumeTipsModal}
                className="absolute top-4 right-4 bg-blue-500 text-white py-1 px-3 rounded-full shadow-lg text-xs hover:bg-blue-600 transition duration-300"
              >
                View Tips
              </button>
              {isResumeTipsModalOpen && <ResumeTipsModal onClose={handleCloseResumeTipsModal} />}
            </div>

            <div className="relative bg-gray-800 p-6 rounded-3xl shadow-2xl">
              <h4 className="text-xl md:text-2xl lg:text-3xl mb-6 font-thin text-white">Profile Settings</h4>
              <p className="text-gray-300 mb-6">
                Customize your profile to reflect your personal and professional identity accurately.
              </p>
              <button onClick={handleOpenProfileModal}
                className="absolute top-4 right-4 bg-blue-500 text-white py-1 px-3 rounded-full shadow-lg text-xs hover:bg-blue-600 transition duration-300"
              >
                Go to Settings
              </button>
              {isProfileModalOpen && <ProfileSettingsModal onClose={handleCloseProfileModal} />}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard