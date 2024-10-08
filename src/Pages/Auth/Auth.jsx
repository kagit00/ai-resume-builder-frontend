import { useState } from 'react';
import { registerUser, doGoogleLogIn, doJWtLogIn } from '@/services/ApiService';
import { FaGoogle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography, Box } from '@mui/material';

function Auth() {
     const [errorMessage, setErrorMessage] = useState(null)
     const [formData, setFormData] = useState({
          username: '',
          name: '',
          password: '',
     });

     const [creds, setCreds] = useState({
          username: '',
          password: '',
     });

     const [isSignIn, setIsSignIn] = useState(false);
     const [emailValid, setEmailValid] = useState(false);
     const [emailTouched, setEmailTouched] = useState(false);
     const [nameValid, setNameValid] = useState(false);
     const [nameTouched, setNameTouched] = useState(false);
     const [passwordValid, setPasswordValid] = useState(false);
     const [passwordTouched, setPasswordTouched] = useState(false);
     const [authLoading, setAuthLoading] = useState(false);

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({
               ...prev,
               [name]: value,
          }));
          setCreds((prev) => ({
               ...prev,
               [name]: value,
          }));

          if (name === 'username') {
               validateEmail(value);
          }

          if (name === 'password') {
               validatePassword(value);
          }

          if (name === 'name') {
               validateName(value); // Validate the name field
          }
     };

     const validateEmail = (email) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          setEmailValid(emailRegex.test(email));
          setEmailTouched(true);
     };

     const validatePassword = (password) => {
          // Password validation rules
          const capitalLetterRegex = /^[A-Z]/;
          const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
          const numberRegex = /[0-9]/;

          const isValid =
               capitalLetterRegex.test(password) &&
               specialCharRegex.test(password) &&
               numberRegex.test(password) &&
               password.length > 8

          setPasswordValid(isValid);
          setPasswordTouched(true);
     };

     const validateName = (name) => {
          setNameValid(name.length > 0);
          setNameTouched(true);
     };

     const handleSignIn = async (e) => {
          e.preventDefault();
          setAuthLoading(true);
          try {
               await doJWtLogIn(creds);
          } catch (error) {
               setErrorMessage(error.response?.data?.errorMsg)
          } finally {
               setAuthLoading(false);
          }
     };

     const handleSignUp = async (e) => {
          e.preventDefault();
          setAuthLoading(true);
          try {
               formData.authTypeJwt = true
               await registerUser(formData);
               setIsSignIn(true)
          } catch (error) {
               setErrorMessage(error.response?.data?.errorMsg)
          } finally {
               setAuthLoading(false);
          }
     };

     const toggleForm = (e) => {
          e.preventDefault();
          setIsSignIn(!isSignIn);
     };

     const doGoogleSignIn = () => {
          setAuthLoading(true);
          setTimeout(() => {
               try {
                    doGoogleLogIn();
               } catch (err) {
                    toast.error(`An error occurred while logging in. ${err.response?.data.errorMsg}`, {
                         style: {
                              backgroundColor: '#1F2937',
                              color: '#fff'
                         },
                    });
               } finally {
                    setAuthLoading(false);
               }
          }, 3000);
     };

     const isFormValid = () => {
          const fieldsValid = emailValid && passwordValid;
          if (!isSignIn) {
               return fieldsValid && nameValid;
          }
          return fieldsValid;
     };

     const handleReset = () => {
          setFormData({
               username: '',
               name: '',
               password: '',
          });
          setCreds({
               username: '',
               password: '',
          });
          setEmailValid(false);
          setEmailTouched(false);
          setPasswordValid(true);
          setPasswordTouched(false);
          setNameValid(false);
          setNameTouched(false);
          setErrorMessage(null)
     };

     return (
          <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans overflow-x-hidden">
               <section id="home" className="relative flex-1 flex flex-col justify-center items-center text-center h-full w-full">
                    {authLoading && (
                         <div className="loader-overlay">
                              <div className="loader"></div>
                         </div>
                    )}
                    <div className="bg-gray-800 text-white p-6 md:p-8 rounded-sm shadow-2xl w-full max-w-md">
                         <h2 className="flex items-center justify-center text-xl md:text-2xl mb-6 font-thin text-center">
                              {isSignIn ? 'Sign In To ' : 'Sign Up To '}
                              <svg
                                   id="logo-35"
                                   width="50"
                                   height="39"
                                   viewBox="0 0 50 39"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg"
                                   className="ml-2"
                              >
                                   <path
                                        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                                        fill="#007AFF"
                                   />
                                   <path
                                        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                                        fill="#312ECB"
                                   />
                              </svg>
                         </h2>
                         {errorMessage && (
                              <Box
                                   display="flex"
                                   justifyContent="center"
                                   alignItems="center"
                                   mb={2}
                                   p={1}
                                   sx={{
                                        backgroundColor: 'rgba(255, 0, 0, 0.1)', // Light red background for warning
                                        borderRadius: '4px',
                                        border: '1px solid #f44336', // Red border for a clear error look
                                   }}
                              >
                                   <Typography
                                        variant="body2" // Smaller font
                                        fontWeight="bold"
                                        textAlign="center"
                                        color="error" // MUI built-in error color (red)
                                   >
                                        {errorMessage}
                                   </Typography>
                              </Box>
                         )}
                         <form className="space-y-6" onSubmit={isSignIn ? handleSignIn : handleSignUp}>
                              <div className="relative">
                                   <input
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        onBlur={() => setEmailTouched(true)}
                                        required
                                        type="text"
                                        placeholder="E-mail Id"
                                        style={{ fontSize: '15px' }}
                                        className={`bg-gray-700 text-white w-full px-4 rounded-lg py-2 shadow-inner focus:outline-none ${emailTouched && (emailValid ? 'border-green-500' : 'border-red-500')
                                             }`}
                                   />
                                   <span className="absolute inset-y-0 right-2 flex items-center">
                                        {emailTouched && (
                                             emailValid ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />
                                        )}
                                   </span>
                              </div>
                              {!isSignIn && (
                                   <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                             <input
                                                  name="name"
                                                  value={formData.name}
                                                  onChange={handleChange}
                                                  onBlur={() => setNameTouched(true)} // Track when the name field is touched
                                                  required
                                                  type="text"
                                                  placeholder="Name"
                                                  style={{ fontSize: '15px' }}
                                                  className="bg-gray-700 text-white w-full px-4 rounded-lg py-2 shadow-inner focus:outline-none"
                                             />
                                             <span className="absolute inset-y-0 right-2 flex items-center">
                                                  {nameTouched && (
                                                       nameValid ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />
                                                  )}
                                             </span>
                                        </div>
                                        <div className="relative">
                                             <input
                                                  name="password"
                                                  value={formData.password}
                                                  onChange={handleChange}
                                                  onBlur={() => setPasswordTouched(true)} // Track when the password field is touched
                                                  required
                                                  type="password"
                                                  placeholder="Password"
                                                  style={{ fontSize: '15px' }}
                                                  className={`bg-gray-700 text-white w-full px-4 rounded-lg py-2 shadow-inner focus:outline-none ${passwordTouched && !passwordValid ? 'border-red-500' : ''
                                                       }`}
                                             />
                                             <span className="absolute inset-y-0 right-2 flex items-center">
                                                  {passwordTouched && (
                                                       passwordValid ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" title="Password must start with a capital letter, include a special character, and contain a number." />
                                                  )}
                                             </span>
                                        </div>

                                   </div>
                              )}
                              {isSignIn && (
                                   <div className="relative">
                                        <input
                                             name="password"
                                             value={formData.password}
                                             onChange={handleChange}
                                             onBlur={() => setPasswordTouched(true)} // Track when the password field is touched
                                             required
                                             type="password"
                                             placeholder="Password"
                                             style={{ fontSize: '15px' }}
                                             className={`bg-gray-700 text-white w-full px-4 rounded-lg py-2 shadow-inner focus:outline-none ${passwordTouched && !passwordValid ? 'border-red-500' : ''
                                                  }`}
                                        />
                                        <span className="absolute inset-y-0 right-2 flex items-center">
                                             {passwordTouched && (
                                                  passwordValid ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" title="Password must start with a capital letter, include a special character, and contain a number." />
                                             )}
                                        </span>
                                   </div>

                              )}
                              <button
                                   type="submit"
                                   disabled={!isFormValid()}
                                   style={{ fontSize: '15px' }}
                                   className={`bg-blue-500 text-white px-1 py-1 rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300 md:text-lg font-normal w-full ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                              >
                                   {isSignIn ? 'Login' : 'Sign Up'}
                              </button>
                              <button
                                   type="button"
                                   onClick={handleReset}
                                   style={{ fontSize: '15px' }}
                                   className="bg-gray-900 text-white px-1 py-1 rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300 text-xs md:text-lg font-normal w-full"
                              >
                                   Reset
                              </button>

                         </form>
                         <p className="text-sm text-gray-400 mt-6">
                              {isSignIn ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
                              <a onClick={toggleForm} className="text-blue-400 hover:text-blue-300 cursor-pointer">
                                   {isSignIn ? 'Sign Up' : 'Log In'}
                              </a>
                         </p>
                         <div className="mt-8 space-y-4">
                              <p className="text-sm text-gray-400">Or sign in with</p>
                              <div className="flex justify-center space-x-8">
                                   <button onClick={doGoogleSignIn} className="bg-transparent text-white px-6 flex items-center">
                                        <FaGoogle className="mr-2" />
                                        <span>Google</span>
                                   </button>
                              </div>
                         </div>
                    </div>
               </section>
          </div>
     );
}

export default Auth;
