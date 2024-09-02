import React, { useState } from 'react';

const ProfileSettingsModal = ({ onClose, userDetails }) => {
     const [viewingProfile, setViewingProfile] = useState(false);
     const [managingEmailNotifications, setManagingEmailNotifications] = useState(false);
     const [isDeletingAccount, setIsDeletingAccount] = useState(false);
     const [notificationsEnabled, setNotificationsEnabled] = useState(false);

     const handleDeleteAccount = async () => {

     };

     const handleManageEmailNotifications = () => {
          // Add logic for managing email notifications here
          console.log("Manage Email Notifications action triggered");
     };

     const handleToggleNotifications = () => {
          setNotificationsEnabled(!notificationsEnabled);
     };

     return (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50">
               <div className="text-white rounded-2xl shadow-xl w-full max-w-md p-8 relative bg-gradient-to-l from-zinc-900 to-black">
                    <button
                         onClick={onClose}
                         className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
                    >
                         &times;
                    </button>
                    {!viewingProfile && !managingEmailNotifications && !isDeletingAccount ? (
                         <>
                              <h2 className="text-lg font-semibold text-white mb-3 truncate">Profile Settings</h2>
                              <ul className="space-y-4">
                                   <li className="flex items-center hover:bg-zinc-900 p-4 rounded-lg cursor-pointer transition-colors duration-300">
                                        <svg className="w-6 h-6 mr-3 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                             <path d="M12 2L2 12h3v8h8v-8h3L12 2z"></path>
                                        </svg>
                                        Upgrade To Premium
                                   </li>
                                   {userDetails.jwtUser &&
                                        <li className="flex items-center hover:bg-zinc-900 p-4 rounded-lg cursor-pointer transition-colors duration-300">
                                             <svg className="w-6 h-6 mr-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                  <path d="M17 10.5V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5.5"></path>
                                                  <path d="M2 10.5h20"></path>
                                                  <path d="M17 21H7a2 2 0 0 1-2-2v-8h12v8a2 2 0 0 1-2 2z"></path>
                                             </svg>
                                             Change Password
                                        </li>
                                   }
                                   <li
                                        onClick={() => setManagingEmailNotifications(true)}
                                        className="flex items-center hover:bg-zinc-900 p-4 rounded-lg cursor-pointer transition-colors duration-300"
                                   >
                                        <svg className="w-6 h-6 mr-3 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                             <path d="M8 17l4-4 4 4"></path>
                                             <path d="M12 3v12"></path>
                                        </svg>
                                        Manage Email Notifications
                                   </li>
                                   <li
                                        onClick={() => setViewingProfile(true)}
                                        className="flex items-center hover:bg-zinc-900 p-4 rounded-lg cursor-pointer transition-colors duration-300"
                                   >
                                        <svg className="w-6 h-6 mr-3 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                             <circle cx="12" cy="12" r="4"></circle>
                                             <path d="M4.22 4.22a10 10 0 0 1 13.56 13.56"></path>
                                        </svg>
                                        View Profile
                                   </li>
                              </ul>
                              <div className="mt-10 border-t border-gray-700 pt-6">
                                   <button
                                        onClick={() => setIsDeletingAccount(true)}
                                        className="flex items-center text-red-500 hover:text-red-700 w-full text-left transition-colors duration-300"
                                   >
                                        <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth={2}
                                             stroke="currentColor"
                                             className="w-5 h-5 mr-3"
                                        >
                                             <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M19 7l-1 12.25A2.75 2.75 0 0115.25 22H8.75A2.75 2.75 0 016 19.25L5 7m5 0V4.75A2.75 2.75 0 0112.75 2h-1.5A2.75 2.75 0 019 4.75V7m5 0v-2.5A2.75 2.75 0 0115.25 2h-1.5A2.75 2.75 0 0111 4.75V7m5 0H8m4 0v10m-4-10v10"
                                             />
                                        </svg>
                                        Delete Account
                                   </button>
                              </div>
                         </>
                    ) : viewingProfile ? (
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
                                   <div className="p-6 rounded-lg shadow-md bg-opacity-100 z-50">
                                        <p className="flex items-center text-gray-300 text-base mb-4">
                                             <span className="bg-zinc-800 text-white px-2 py-1 rounded-lg mr-4">Email</span>
                                             <span>{userDetails.username}</span>
                                        </p>
                                        <p className="flex items-center text-gray-300 text-base mb-4">
                                             <span className="bg-zinc-800 text-white px-2 py-1 rounded-lg mr-4">Name</span>
                                             <span>{userDetails.name}</span>
                                        </p>
                                        <p className="flex items-center text-gray-300 text-base mb-4">
                                             <span className="bg-zinc-800 text-white px-2 py-1 rounded-lg mr-4">Member Since</span>
                                             <span>{userDetails.timestamp ? userDetails.timestamp.slice(0, 4) : ""}</span>
                                        </p>
                                        <p className="flex items-center text-gray-300 text-base">
                                             <span className="bg-zinc-800 text-white px-2 py-1 rounded-lg mr-4">Bio</span>
                                             <span>{userDetails.bio ? userDetails.bio : 'Nothing to show as of now'}</span>
                                        </p>
                                   </div>
                              </div>
                         </>
                    ) : managingEmailNotifications ? (
                         <>
                              <button
                                   onClick={() => setManagingEmailNotifications(false)}
                                   className="text-sm text-blue-400 hover:text-blue-300 mb-6 transition-colors duration-300 flex items-center"
                              >
                                   &larr; Back to Settings
                              </button>
                              <h2 className="text-2xl md:text-3xl lg:text-4xl mb-10 font-thin text-white">
                                   Manage Email Notifications
                              </h2>
                              <div className="space-y-6">
                                   <div className="rounded-lg shadow-md bg-opacity-100 z-50">
                                        <div className="flex items-center">
                                             <label className="relative inline-flex items-center cursor-pointer">
                                                  <input
                                                       type="checkbox"
                                                       checked={notificationsEnabled}
                                                       onChange={handleToggleNotifications}
                                                       className="sr-only"
                                                  />
                                                  <div className="w-11 h-6 bg-gray-600 rounded-full"></div>
                                                  <div
                                                       className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notificationsEnabled ? 'transform translate-x-full bg-blue-500' : ''
                                                            }`}
                                                  ></div>
                                             </label>
                                             <span className="text-gray-300 ml-4 font-normal">
                                                  {notificationsEnabled ? 'Notifications Enabled' : 'Notifications Disabled'}
                                             </span>
                                        </div>  
                                   </div>
                              </div>
                         </>
                    ) : isDeletingAccount ? (
                         <>
                              <button
                                   onClick={() => setIsDeletingAccount(false)}
                                   className="text-sm text-blue-400 hover:text-blue-300 mb-6 transition-colors duration-300 flex items-center"
                              >
                                   &larr; Back to Settings
                              </button>
                              <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 font-thin text-white">
                                   Delete Account
                              </h2>
                              <div className="space-y-6">
                                   <div className="p-6 rounded-lg shadow-md bg-opacity-100 z-50">
                                        <p className="text-gray-400 mb-4 text-sm ">
                                             This action will permanently delete your account. Please confirm if you want to proceed.
                                        </p>
                                        <button
                                             onClick={handleDeleteAccount}
                                             className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm py-2 rounded"
                                        >
                                             Sure, Delete
                                        </button>
                                   </div>
                              </div>
                         </>
                    ) : null}
               </div>
          </div>
     );
};

export default ProfileSettingsModal;

