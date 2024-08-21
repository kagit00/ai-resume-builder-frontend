import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaGithub, FaGoogle } from 'react-icons/fa';


function SignInPage() {
     const navigate = useNavigate();
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
     const [errorMessage, setErrorMessage] = useState('');
     const history = useNavigate()

     const toggleForm = () => {
          setIsSignIn(!isSignIn);
     };

     const handleChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value,
          });
          setCreds({
               ...formData,
               [e.target.name]: e.target.value,
          })
     };

     const handleSignIn = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.post('http://localhost:8080/auth/token', creds);
               localStorage.setItem('JWT_TOKEN', response.data.token);
               localStorage.setItem('username', formData.username);
               navigate('/dashboard'); // Redirect to dashboard
          } catch (error) {
               console.error('Login failed:', error);
               setErrorMessage('Login failed. Please check your credentials.');
          }
     };

     const handleSignUp = async (e) => {
          try {
               const response = await axios.post('http://localhost:8080/users', formData);
               console.log('User signed up successfully:', response.data);
               // You can redirect the user or show a success message here
          } catch (error) {
               console.error('There was an error signing up:', error);
               setErrorMessage('Sign up failed. Please try again.');
          }
     };

     const handleGoogleLogin = () => {
          localStorage.setItem('GOOGLE_OAUTH2_TOKEN', 'default');
          window.location.href = 'http://localhost:8080/oauth2/authorization/google';
     };

     const handleGithubLogin = () => {
          window.location.href = 'http://localhost:8080/oauth2/authorization/github';
     };

     return (
          <div className="bg-black text-white min-h-screen flex flex-col font-sans overflow-x-hidden">
               <section
                    id="home"
                    className="relative flex-1 flex flex-col justify-center items-center text-center bg-gradient-to-r from-gray-900 to-black h-full w-full"
               >
                    <div className="bg-gray-800 text-white p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-md">
                         <h2 className="text-xl md:text-2xl mb-6">
                              {isSignIn ? 'Sign In To resumed.' : 'Sign Up To resumed.'}
                         </h2>
                         <form className="space-y-6" onSubmit={isSignIn ? handleSignIn : handleSignUp}>
                              <div>
                                   <input
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        placeholder="E-mail Id"
                                        className="bg-gray-700 text-white w-full py-3 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   />
                              </div>
                              {!isSignIn && (
                                   <div className="grid grid-cols-2 gap-4">
                                        <div>
                                             <input
                                                  name="name"
                                                  value={formData.name}
                                                  onChange={handleChange}
                                                  required
                                                  type="text"
                                                  placeholder="Name"
                                                  className="bg-gray-700 text-white w-full py-3 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                                             />
                                        </div>
                                        <div>
                                             <input
                                                  name="password"
                                                  value={formData.password}
                                                  onChange={handleChange}
                                                  required
                                                  type="password"
                                                  placeholder="Password"
                                                  className="bg-gray-700 text-white w-full py-3 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                                             />
                                        </div>
                                   </div>
                              )}

                              {isSignIn && (
                                   <div>
                                        <input
                                             name="password"
                                             value={formData.password}
                                             onChange={handleChange}
                                             required
                                             type="password"
                                             placeholder="Password"
                                             className="bg-gray-700 text-white w-full py-3 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                   </div>
                              )}

                              <button
                                   type="submit"
                                   className="bg-blue-500 text-white py-2 px-3 rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300 text-base md:text-lg font-semibold hover:bg-blue-700 w-full"
                              >
                                   {isSignIn ? 'Login' : 'Sign Up'}
                              </button>
                         </form>
                         <p className="text-sm text-gray-400 mt-6">
                              {isSignIn ? 'Don\'t have an account?' : 'Already have an account?'}
                              {" "}
                              <a onClick={toggleForm} className="text-blue-400 hover:text-blue-300 cursor-pointer">
                                   {isSignIn ? 'Sign Up' : 'Log In'}
                              </a>
                         </p>
                         <div className="mt-8 space-y-4">
                              <p className="text-sm text-gray-400">Or sign in with</p>
                              <div className="flex justify-center space-x-8">
                                   <button onClick={handleGithubLogin} className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-lg flex items-center">
                                        <FaGithub className="w-6 h-6 mr-2" />
                                        GitHub
                                   </button>

                                   <button onClick={handleGoogleLogin} className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-lg flex items-center">
                                        <FaGoogle className="w-6 h-6 mr-2" />
                                        Google
                                   </button>
                              </div>
                         </div>
                    </div>
               </section>
          </div>

     )
}

export default SignInPage