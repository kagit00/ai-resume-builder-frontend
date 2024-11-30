import AddResume from '@/components/custom/UserDashboard/AddResume.jsx';
import ProfileSettingsModal from '@/components/custom/UserDashboard/ProfileSettingsModal.jsx';
import ResumeTipsModal from '@/components/custom/UserDashboard/ResumeTipsModal.jsx';
import HeroSection from '@/components/custom/UserDashboard/HeroSection.jsx';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ProfileSection = ({ userDetails }) => {
     const [isProfileModalOpen, setProfileModalOpen] = useState(false);
     const [isResumeTipsModalOpen, setResumeTipsModalOpen] = useState(false);
     const [isLoading, setIsLoading] = useState(false)

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
          <>
               {isLoading && (
                    <div className="loader-overlay">
                         <div className="loader"></div>
                    </div>
               )}
               
               {userDetails &&
                    <section id="home" className="relative flex-1 py-16 px-10">
                         <div className="max-w-7xl mx-auto">
                              {/* Hero Section */}
                              <div className="mb-12 relative text-center">
                                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 rounded-lg -z-10"></div>
                                   <HeroSection userDetails={userDetails} />
                                   <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 blur-md -z-20"></div>
                                        <div className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-blue-300 to-purple-400 opacity-10 blur-sm -z-30"></div>
                                   </div>
                              </div>

                              {/* Main Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                   {/* Add Resume Section */}
                                   <div className="flex items-center justify-center bg-transparent rounded-3xl hover:scale-105">
                                        <AddResume userDetails={userDetails} />
                                   </div>

                                   {/* Profile Settings Card */}
                                   <div className="relative p-6 rounded-xl shadow-2xl bg-gradient-to-l from-gray-800 to-gray-900 overflow-hidden duration-300">
                                        <div className="absolute inset-0 opacity-10 bg-pattern-background"></div>
                                        <h4 className="text-xl font-semibold text-white mb-4">Profile Settings</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                             Customize your profile to reflect your personal and professional identity.
                                        </p>
                                        <div className="relative flex items-center justify-center mb-6">
                                             <div className="p-4 rounded-full bg-gradient-to-l from-gray-600 via-transparent to-gray-900 shadow-lg hover:shadow-xl duration-300">
                                                  <svg className="h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l-2-2 2-2m0 0l2 2-2 2m0-2V6m0 12l2 2-2 2m-6-6l-2-2 2-2m0 0l2 2-2 2m0-2V6m0 12l-2 2 2 2m12-6l-2-2 2-2m0 0l2 2-2 2m0-2V6" />
                                                  </svg>
                                             </div>
                                        </div>
                                        <button
                                             onClick={handleOpenProfileModal}
                                             className="absolute top-4 right-4 text-white shadow-md transform hover:shadow-lg duration-300 ease-in-out"
                                        >
                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                  <circle cx="12" cy="12" r="3"></circle>
                                                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 5.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1.4z"></path>
                                             </svg>
                                        </button>
                                        {isProfileModalOpen && <ProfileSettingsModal onClose={handleCloseProfileModal} userDetails={userDetails} />}
                                   </div>

                                   {/* Resume Tips Card */}
                                   <div className="relative p-6 rounded-xl shadow-2xl bg-gradient-to-l from-gray-800 to-gray-900 overflow-hidden duration-300">
                                        <div className="absolute inset-0 opacity-10 bg-pattern-background"></div>
                                        <h4 className="text-xl font-semibold text-white mb-4">Resume Tips</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed mb-8">
                                             Discover best practices for resume writing to ensure your application stands out.
                                        </p>
                                        <div className="relative flex items-center justify-center mb-6">
                                             <div className="p-4 rounded-full bg-gradient-to-l from-gray-600 via-transparent to-gray-900 shadow-lg hover:shadow-xl  duration-300">
                                                  <svg className="h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                       <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                                       <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                       <line x1="12" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                  </svg>
                                             </div>
                                        </div>
                                        <button
                                             onClick={handleOpenResumeTipsModal}
                                             className="absolute top-4 right-4 text-white shadow-md transform hover:shadow-lg duration-300 ease-in-out"
                                        >
                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                  <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8 4a1 1 0 100-2 1 1 0 000 2zm.75-3.25a.75.75 0 00-1.5 0v-5.5a.75.75 0 011.5 0v5.5z" clipRule="evenodd" />
                                             </svg>
                                        </button>
                                        {isResumeTipsModalOpen && <ResumeTipsModal onClose={handleCloseResumeTipsModal} />}
                                   </div>
                              </div>
                         </div>
                    </section>
               }
          </>
     )
}

ProfileSection.propTypes = {
     userDetails: PropTypes.object.isRequired,
};

export default ProfileSection;