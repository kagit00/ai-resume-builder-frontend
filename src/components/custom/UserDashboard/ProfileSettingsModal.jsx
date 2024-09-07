import { updateNotificationEnabled } from '@/services/ApiService';
import React, { useState } from 'react';

const ProfileSettingsModal = ({ onClose, userDetails }) => {
     const [viewingProfile, setViewingProfile] = useState(false);
     const [managingEmailNotifications, setManagingEmailNotifications] = useState(false);
     const [isDeletingAccount, setIsDeletingAccount] = useState(false);
     const [notificationsEnabled, setNotificationsEnabled] = useState(false);

     const handleDeleteAccount = async () => {

     };

     const handleManageEmailNotifications = async () => {
          await updateNotificationEnabled(userDetails.id, managingEmailNotifications)
     };

     const handleToggleNotifications = () => {
          setNotificationsEnabled(!notificationsEnabled);
     };

     return (
          <div className="fixed inset-0 flex items-center justify-center bg-slate-950 bg-opacity-80 z-50">
               <div className="text-black rounded-2xl shadow-xl w-full p-8 relative bg-blue-100 max-w-sm">
                    <button
                         onClick={onClose}
                         className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
                    >
                         &times;
                    </button>
                    {!viewingProfile && !managingEmailNotifications && !isDeletingAccount ? (
                         <>
                               <h2 className="text-lg md:text-3xl mb-4 font-thin text-black">Profile Settings</h2>
                              <ul className="space-y-4">
                                   <li className="flex items-center text-sm font-semibold hover:bg-blue-200 p-4 rounded-lg cursor-pointer transition-colors duration-300">
                                        <svg className="w-6 h-6 mr-3 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                             <path d="M12 2L2 12h3v8h8v-8h3L12 2z"></path>
                                        </svg>
                                        Upgrade To Premium
                                   </li>
                                   {userDetails.jwtUser &&
                                        <li className="flex items-center text-sm font-semibold hover:bg-blue-200 p-4 rounded-lg cursor-pointer transition-colors duration-300">
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
                                        className="flex items-center text-sm font-semibold hover:bg-blue-200 p-4 rounded-lg cursor-pointer transition-colors duration-300"
                                   >
                                        <svg className="w-6 h-6 mr-3 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                             <path d="M8 17l4-4 4 4"></path>
                                             <path d="M12 3v12"></path>
                                        </svg>
                                        Manage Email Notifications
                                   </li>
                                   <li
                                        onClick={() => setViewingProfile(true)}
                                        className="flex items-center text-sm font-semibold hover:bg-blue-200 p-4 rounded-lg cursor-pointer transition-colors duration-300"
                                   >
                                        <svg className="w-6 h-6 mr-3 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                             <circle cx="12" cy="12" r="4"></circle>
                                             <path d="M4.22 4.22a10 10 0 0 1 13.56 13.56"></path>
                                        </svg>
                                        View Profile
                                   </li>
                              </ul>
                              <div className="mt-5 border-t border-gray-00 pt-6">
                                   <button
                                        onClick={() => setIsDeletingAccount(true)}
                                        className="flex items-center text-red-500 text-sm font-semibold hover:text-red-700 w-full text-left transition-colors duration-300"
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
                                   className="text-sm text-blue-500 hover:text-blue-700 mb-6 transition-colors duration-300 flex items-center"
                              >
                                   &larr; Back to Settings
                              </button>
                              <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 font-thin text-black">
                                   Profile Details
                              </h2>
                              <div className="space-y-6">
                                   <div className="p-2">
                                        <p className="flex items-center mb-4">
                                             <span className="bg-blue-600 text-xs font-semibold text-white py-2 px-4 rounded-full mr-4">Email</span>
                                             <span className="text-black text-sm font-semibold">{userDetails.username}</span>
                                        </p>
                                        <p className="flex items-center text-white-300 mb-4">
                                             <span className="bg-blue-600 text-xs font-semibold text-white py-2 px-4 rounded-full mr-4">Name</span>
                                             <span className="text-black text-sm font-semibold">{userDetails.name}</span>
                                        </p>
                                        <p className="flex items-center text-white mb-4">
                                             <span className="bg-blue-600 text-xs font-semibold text-white py-2 px-4 rounded-full mr-4">Member Since</span>
                                             <span className="text-black text-sm font-semibold">{userDetails.timestamp ? userDetails.timestamp.slice(0, 4) : ""}</span>
                                        </p>
                                        <p className="flex items-center text-white">
                                             <span className="bg-blue-600 text-xs font-semibold text-white py-2 px-4 rounded-full mr-4">Bio</span>
                                             <span className="text-black text-sm font-semibold">{userDetails.bio ? userDetails.bio : 'Nothing to show as of now'}</span>
                                        </p>
                                   </div>
                              </div>
                         </>
                    ) : managingEmailNotifications ? (
                         <>
                              <button
                                   onClick={() => setManagingEmailNotifications(false)}
                                   className="text-sm text-blue-500 hover:text-blue-700 mb-6 transition-colors duration-300 flex items-center"
                              >
                                   &larr; Back to Settings
                              </button>
                              <h2 className="text-2xl md:text-3xl lg:text-4xl mb-10 font-thin text-black">
                                   Manage Email Notifications
                              </h2>
                              <div className="space-y-6">
                                   <div>
                                        <div className="flex items-center">
                                             <label className="relative inline-flex items-center cursor-pointer">
                                                  <input onClick={() => handleManageEmailNotifications()}
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
                                             <span className="text-black ml-4 text-sm font-semibold">
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
                                   className="text-sm text-blue-500 hover:text-blue-700 mb-6 transition-colors duration-300 flex items-center"
                              >
                                   &larr; Back to Settings
                              </button>
                              <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 font-thin text-black">
                                   Delete Account
                              </h2>
                              <div className="space-y-6">
                                   <div className="">
                                        <p className="text-black mb-4 text-xs font-semibold">
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

