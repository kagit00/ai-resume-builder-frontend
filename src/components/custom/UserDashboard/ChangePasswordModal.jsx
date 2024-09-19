import { changePassword } from "@/services/ApiService";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useQueryClient } from '@tanstack/react-query';

function ChangePasswordModal({ isOpen, userId, setChangePassword }) {
     const queryClient = useQueryClient();
     const [currentPassword, setCurrentPassword] = useState('');
     const [newPassword, setNewPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');
     const disabled = !currentPassword || !newPassword || !confirmPassword
     const [isLoading, setIsLoading] = useState(false)
     const [errorMessage, setErrorMessage] = useState(null)
     const [successMessage, setSuccessMessage] = useState(null)

     const handleClose = () => {
          setChangePassword(false)
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               if (!isPasswordValid(newPassword)) {
                    setErrorMessage("New Password is Not Valid. It must contains atleast 9 characters including atleast one special, one numeric and one capital letter.")
                    return
               }
               if (newPassword !== confirmPassword) {
                    setErrorMessage("Confirmed Password does not match.")
                    return
               }
               setIsLoading(true)
               await changePassword(currentPassword, newPassword, confirmPassword, userId);
               handleReset()
               setSuccessMessage("Password Updated Successfully.")
               queryClient.invalidateQueries('userDetails')
          } catch (err) {
               setSuccessMessage(null)
               setErrorMessage(err.response?.data?.errorMsg)
          } finally {
               setIsLoading(false)
          }
     };

     const handleReset = () => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("")
          setErrorMessage("")
     }

     const isPasswordValid = (password) => {
          const capitalLetterRegex = /^[A-Z]/;
          const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
          const numberRegex = /[0-9]/;

          return capitalLetterRegex.test(password) &&
               specialCharRegex.test(password) &&
               numberRegex.test(password) &&
               password.length > 8
     }

     return (
          <div
               className={`fixed inset-0 z-50 flex items-center justify-end transition-all duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
          >
               <div className="relative  text-gray-200 shadow-xl w-full md:w-1/3 h-full p-8">
               {isLoading && (
                         <div className="loader-overlay">
                              <div className="loader"></div>
                         </div>
                    )}
                    {/* Close Button */}
                    <button
                         onClick={handleClose}
                         aria-label="Close modal"
                         className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-300"
                    >
                         &times;
                    </button>

                    {/* Header Section */}
                    <div className="mb-6">
                         <h2 className="text-3xl font-thin text-white">Change Password</h2>
                         <p className="text-xs text-gray-300">Ensure your account is secure by updating your password regularly</p>
                    </div>

                    {errorMessage && (
                         <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              mb={2}
                              p={1}
                              sx={{
                                   backgroundColor: 'rgba(255, 99, 99, 0.2)', // Softer red background for warning (more readable on blue)
                                   borderRadius: '4px',
                                   border: '1px solid #ff5252', // A lighter red border for a clear error look
                              }}
                         >
                              <Typography
                                   variant="body2" // Smaller font
                                   fontWeight="bold"
                                   textAlign="center"
                                   color="#ff8a80" // Lighter red text for visibility against dark background
                              >
                                   {errorMessage}
                              </Typography>
                         </Box>
                    )}

                    {successMessage && (
                         <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              mb={2}
                              p={1}
                              sx={{
                                   backgroundColor: 'rgba(76, 175, 80, 0.2)', // Softer green background
                                   borderRadius: '4px',
                                   border: '1px solid #4CAF50', // Green border for success
                              }}
                         >
                              <Typography
                                   variant="body2"
                                   fontWeight="bold"
                                   textAlign="center"
                                   color="#81c784" // Lighter green text for contrast against blue background
                              >
                                   {successMessage}
                              </Typography>
                         </Box>
                    )}

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                         {/* Current Password */}
                         <div>
                              <label htmlFor="current-password" className="block text-sm text-gray-200 mb-2">
                                   Current Password
                              </label>
                              <input
                                   type="password"
                                   id="current-password"
                                   className="w-full px-3 py-1 focus:outline-none bg-transparent border-b-2 text-gray-200"
                                   value={currentPassword}
                                   onChange={(e) => setCurrentPassword(e.target.value)}
                                   required
                              />
                         </div>

                         {/* New Password */}
                         <div>
                              <label htmlFor="new-password" className="block text-sm text-gray-200 mb-2">
                                   New Password
                              </label>
                              <input
                                   type="password"
                                   id="new-password"
                                   className="w-full px-3 py-1 focus:outline-none bg-transparent border-b-2 text-gray-200"
                                   value={newPassword}
                                   onChange={(e) => setNewPassword(e.target.value)}
                                   required
                              />
                         </div>

                         {/* Confirm New Password */}
                         <div>
                              <label htmlFor="confirm-password" className="block text-sm text-gray-200 mb-2">
                                   Confirm New Password
                              </label>
                              <input
                                   type="password"
                                   id="confirm-password"
                                   className="w-full px-3 py-1 focus:outline-none bg-transparent border-b-2 text-gray-200"
                                   value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                                   required
                              />
                         </div>

                         {/* Submit Button */}
                         <div className="mt-10">
                              <button
                                   type="submit"
                                   disabled={disabled}  // This will disable the button when the condition is not met
                                   className={`w-1/4 text-sm font-semibold text-white py-2 rounded-full shadow-xl transition-all duration-300 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-400'
                                        }`}
                              >
                                   Update
                              </button>

                              <button
                                   onClick={() => handleReset()}
                                   type="reset"
                                   className="w-1/4 text-sm text-white transition-all duration-300"
                              >
                                   Reset
                              </button>
                         </div>

                    </form>
               </div>
          </div>
     );
}

export default ChangePasswordModal;
