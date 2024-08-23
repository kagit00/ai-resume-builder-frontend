import React, { useState } from 'react';


const ProfileSettingsModal = ({ onClose }) => {
     const [viewingProfile, setViewingProfile] = useState(false);
     const username = sessionStorage.getItem('GOOGLE_OAUTH2_USERNAME');
     const name = sessionStorage.getItem('GOOGLE_OAUTH2_NAME');
     const memberSince = sessionStorage.getItem('GOOGLE_OAUTH2_USER_MEMBER_SINCE') 
     const bio = sessionStorage.getItem('GOOGLE_OAUTH2_USER_BIO');

     return (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
               <div className="bg-gray-900 text-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
                    <button
                         onClick={onClose}
                         className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
                    >
                         &times;
                    </button>
                    {!viewingProfile ? (
                         <>
                              <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 font-thin text-white">Profile Settings</h2>
                              <ul className="space-y-4">
                                   <li className="hover:bg-gray-800 p-4 rounded-lg cursor-pointer transition-colors duration-300">
                                        Upgrade To Premium
                                   </li>
                                   <li className="hover:bg-gray-800 p-4 rounded-lg cursor-pointer transition-colors duration-300">
                                        Change Password
                                   </li>
                                   <li className="hover:bg-gray-800 p-4 rounded-lg cursor-pointer transition-colors duration-300">
                                        Manage Email Notifications
                                   </li>
                                   <li
                                        onClick={() => {
                                             setViewingProfile(true);
                                        }}
                                        className="hover:bg-gray-800 p-4 rounded-lg cursor-pointer transition-colors duration-300"
                                   >
                                        View Profile
                                   </li>
                              </ul>
                              <div className="mt-10 border-t border-gray-700 pt-6">
                                   <button
                                        onClick={() => {
                                             // Handle account deletion logic here

                                        }}
                                        className="text-red-500 hover:text-red-700 w-full text-left transition-colors duration-300"
                                   >
                                        Delete Account
                                   </button>
                              </div>
                         </>
                    ) : (
                         <>
                              <button
                                   onClick={() => setViewingProfile(false)}
                                   className="text-sm text-blue-400 hover:text-blue-300 mb-6 transition-colors duration-300 flex items-center"
                              >
                                   &larr; Back to Settings
                              </button>
                              <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 font-thin text-white">
                                   Profile Details
                              </h2>
                              <div className="space-y-6">
                                   <div className="p-6 rounded-lg shadow-md bg-gray-900">
                                        <p className="flex items-center text-gray-300 text-base mb-4">
                                             <span className="bg-gray-700 text-white px-2 py-1 rounded-lg mr-4">Email</span>
                                             <span>{username}</span>
                                        </p>
                                        <p className="flex items-center text-gray-300 text-base mb-4">
                                             <span className="bg-gray-700 text-white px-2 py-1 rounded-lg mr-4">Name</span>
                                             <span>{name}</span>
                                        </p>
                                        <p className="flex items-center text-gray-300 text-base mb-4">
                                             <span className="bg-gray-700 text-white px-2 py-1 rounded-lg mr-4">Member Since</span>
                                             <span>{memberSince? memberSince.slice(0, 4) : ""}</span>
                                        </p>
                                        <p className="flex items-center text-gray-300 text-base">
                                             <span className="bg-gray-700 text-white px-2 py-1 rounded-lg mr-4">Bio</span>
                                             <span>{bio? bio : 'Nothing to show as of now'}</span>
                                        </p>
                                   </div>
                              </div>
                         </>
                    )}
               </div>
          </div>

     );
};


export default ProfileSettingsModal;