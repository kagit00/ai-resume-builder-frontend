import { cancelPremiumMembership, deleteAccount, updateNotificationEnabled } from '@/services/ApiService';
import React, { useEffect, useState } from 'react';
import PricingModal from '../UpgradeToPremium/PricingModal';
import { useQueryClient } from '@tanstack/react-query';

const ProfileSettingsModal = ({ onClose, userDetails }) => {
     const queryClient = useQueryClient();
     const [showPricingModal, setShowPricingModal] = useState(false);
     const handleUpgrade = () => setShowPricingModal(true);
     const [viewingProfile, setViewingProfile] = useState(false);
     const [managingEmailNotifications, setManagingEmailNotifications] = useState(false);
     const [isDeletingAccount, setIsDeletingAccount] = useState(false);
     const [notificationsEnabled, setNotificationsEnabled] = useState(userDetails.notificationEnabled);
     const [billingDetails, setBillingDetails] = useState(false)
     const isFreeUser = userDetails.authorities.length === 1 && userDetails.authorities[0].authority === 'FREE_USER'

     const handleDeleteAccount = async () => {
          if (isDeletingAccount) {
               await deleteAccount(userDetails.id)
          }
     };

     const handleCancelPremiumMembership = async () => {
          if (!isFreeUser) {
               const res = await cancelPremiumMembership(userDetails.id)
               if (res.status === 200)
                    queryClient.invalidateQueries('userDetails')
          }
          setBillingDetails(false)
          setViewingProfile(false)
     }

     const handleToggleNotifications = async () => {
          setNotificationsEnabled(prev => !prev);
          await updateNotificationEnabled(userDetails.id, !notificationsEnabled)
          queryClient.invalidateQueries('userDetails')
     };

     return (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90">
               <div className="relative bg-transparent text-white rounded-2xl shadow-xl w-full p-8 max-w-md">
                    {/* Close Button */}
                    <button
                         onClick={onClose}
                         className="absolute top-4 right-4 text-gray-300 hover:text-white focus:outline-none"
                    >
                         &times;
                    </button>

                    {/* Main Content */}
                    {!viewingProfile && !managingEmailNotifications && !isDeletingAccount && !showPricingModal && !billingDetails ? (
                         <>
                              <h2 className="text-xl md:text-2xl mb-6 font-thin text-gray-100 flex items-center">
                                   Profile Settings
                                   {!isFreeUser && <span className="ml-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                                        <svg className="inline-block w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Premium
                                   </span>}
                              </h2>

                              <ul className="space-y-4">
                                   {!isFreeUser && <li onClick={() => setBillingDetails(true)}
                                        className="gap-2 flex items-center text-sm font-medium hover:bg-gray-700 p-4 rounded-lg cursor-pointer transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                             <circle cx="12" cy="12" r="10" />
                                             <path d="M15 9l-6 6" />
                                             <path d="M9 9l6 6" />
                                        </svg>
                                        Cancel Premium Membership
                                   </li>}
                                   {isFreeUser && <li onClick={() => handleUpgrade()}
                                        className="flex items-center text-sm font-medium hover:bg-gray-700 p-4 rounded-lg cursor-pointer transition-colors duration-300">
                                        <svg className="w-6 h-6 mr-3 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                             <path d="M12 2L2 12h3v8h8v-8h3L12 2z"></path>
                                        </svg>
                                        Upgrade To Premium
                                   </li>}
                                   {userDetails.jwtUser &&
                                        <li className="flex items-center text-sm font-medium hover:bg-gray-700 p-4 rounded-lg cursor-pointer transition-colors duration-300">
                                             <svg className="w-6 h-6 mr-3 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                  <path d="M17 10.5V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5.5"></path>
                                                  <path d="M2 10.5h20"></path>
                                                  <path d="M17 21H7a2 2 0 0 1-2-2v-8h12v8a2 2 0 0 1-2 2z"></path>
                                             </svg>
                                             Change Password
                                        </li>
                                   }
                                   <li
                                        onClick={() => setManagingEmailNotifications(true)}
                                        className="flex items-center text-sm font-medium hover:bg-gray-700 p-4 rounded-lg cursor-pointer transition-colors duration-300"
                                   >
                                        <svg className="w-6 h-6 mr-3 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                             <path d="M8 17l4-4 4 4"></path>
                                             <path d="M12 3v12"></path>
                                        </svg>
                                        Manage Email Notifications
                                   </li>
                                   <li
                                        onClick={() => setViewingProfile(true)}
                                        className="flex items-center text-sm font-medium hover:bg-gray-700 p-4 rounded-lg cursor-pointer transition-colors duration-300"
                                   >
                                        <svg className="w-6 h-6 mr-3 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                             <circle cx="12" cy="12" r="4"></circle>
                                             <path d="M4.22 4.22a10 10 0 0 1 13.56 13.56"></path>
                                        </svg>
                                        View Profile
                                   </li>
                              </ul>
                              <div className="mt-6 border-t border-gray-600 pt-6">
                                   <button
                                        onClick={() => setIsDeletingAccount(true)}
                                        className="flex items-center text-red-400 text-sm font-medium hover:text-red-500 w-full text-left transition-colors duration-300"
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
                                   className="text-sm text-blue-400 hover:text-blue-500 mb-6 transition-colors duration-300 flex items-center"
                              >
                                   &larr; Back
                              </button>
                              <h2 className="text-lg md:text-xl lg:text-2xl mb-6 font-thin text-gray-100">
                                   Profile Details
                              </h2>
                              <div className="space-y-6">
                                   <div className="p-2">
                                        <p className="flex items-center mb-4">
                                             <span className="bg-blue-600 text-xs font-semibold text-white py-2 px-4 rounded-full mr-4">Email</span>
                                             <span className="text-gray-300 text-sm font-semibold">{userDetails.username}</span>
                                        </p>
                                        <p className="flex items-center mb-4">
                                             <span className="bg-blue-600 text-xs font-semibold text-white py-2 px-4 rounded-full mr-4">Name</span>
                                             <span className="text-gray-300 text-sm font-semibold">{userDetails.name}</span>
                                        </p>
                                        <p className="flex items-center mb-4">
                                             <span className="bg-blue-600 text-xs font-semibold text-white py-2 px-4 rounded-full mr-4">Member Since</span>
                                             <span className="text-gray-300 text-sm font-semibold">{userDetails.timestamp ? userDetails.timestamp.slice(0, 4) : ""}</span>
                                        </p>
                                        <p className="flex items-center">
                                             <span className="bg-blue-600 text-xs font-semibold text-white py-2 px-4 rounded-full mr-4">Bio</span>
                                             <span className="text-gray-300 text-sm font-semibold">{userDetails.bio ? userDetails.bio : 'Nothing to show as of now'}</span>
                                        </p>
                                   </div>
                              </div>
                         </>
                    ) : managingEmailNotifications ? (
                         <>
                              <button
                                   onClick={() => setManagingEmailNotifications(false)}
                                   className="text-sm text-blue-400 hover:text-blue-500 mb-6 transition-colors duration-300 flex items-center"
                              >
                                   &larr; Back
                              </button>
                              <h2 className="text-lg md:text-xl lg:text-2xl mb-10 font-thin text-gray-100">
                                   Manage Email Notifications
                              </h2>
                              <div className="space-y-6">
                                   <div>
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
                                                       className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notificationsEnabled ? 'transform translate-x-full bg-blue-500' : ''}`}
                                                  ></div>
                                             </label>
                                             <span className="text-gray-300 ml-4 text-sm font-medium">
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
                                   className="text-sm text-blue-400 hover:text-blue-500 mb-6 transition-colors duration-300 flex items-center"
                              >
                                   &larr; Back
                              </button>
                              <h2 className="text-lg md:text-xl lg:text-2xl mb-5 font-thin text-gray-100">
                                   Delete Account
                              </h2>
                              <p className="text-gray-300 mb-6">
                                   Are you sure you want to delete your account? This action is irreversible and all your data will be lost.
                              </p>
                              <button
                                   onClick={() => handleDeleteAccount()}
                                   className="w-full py-3 bg-red-500 hover:bg-red-600 rounded-full text-white font-semibold transition-colors duration-300"
                              >
                                   Confirm Deletion
                              </button>
                         </>
                    ) : showPricingModal ? (
                         <>
                              <PricingModal isOpen={true} setShowPricingModal={setShowPricingModal} userId={userDetails.id} />
                         </>
                    ) : billingDetails ? (
                         <>
                              <div className="p-6 max-w-md mx-auto rounded-lg shadow-lg">
                                   <button
                                        onClick={() => setBillingDetails(false)}
                                        className="text-sm text-blue-400 hover:text-blue-500 mb-6 transition-colors duration-300 flex items-center"
                                   >
                                        &larr; Back
                                   </button>
                                   <h2 className="text-lg md:text-xl lg:text-2xl mb-5 font-thin text-gray-100">
                                        Cancel Membership
                                   </h2>
                                   <p className="text-gray-300 mb-6">
                                        Are you sure you want to cancel your membership? This action is irreversible and all your billing details will be removed.
                                   </p>
                              
                                   <button
                                        onClick={() => handleCancelPremiumMembership()}
                                        className="w-full py-3 bg-red-500 hover:bg-red-600 rounded-full text-white font-semibold transition-colors duration-300"
                                   >
                                        Confirm Cancellation
                                   </button>
                              </div>

                         </>
                    ) : null}
               </div>
          </div>

     );
};

export default ProfileSettingsModal;

