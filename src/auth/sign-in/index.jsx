import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaGoogle } from 'react-icons/fa';
import Cookies from 'js-cookie';


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
               Cookies.set('JWT_TOKEN', response.data.token);
               navigate('/user/dashboard');
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
          window.location.href = 'http://localhost:8080/oauth2/authorization/google';
     };

     return (
          <div className="bg-black text-white min-h-screen flex flex-col font-sans overflow-x-hidden">
               <section
                    id="home"
                    className="relative flex-1 flex flex-col justify-center items-center text-center h-full w-full"
               >
                    <div className="bg-zinc-900 text-white p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-md">
                         <h2 className="text-xl md:text-2xl mb-6 font-thin">
                              {isSignIn ? 'Sign In To Resumed.' : 'Sign Up To Resumed.'}
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
                                        className="bg-zinc-800 text-white w-full py-3 px-4 rounded-lg shadow-inner focus:outline-none"
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
                                                  className="bg-zinc-800 text-white w-full py-3 px-4 rounded-lg shadow-inner focus:outline-none"
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
                                                  className="bg-zinc-800 text-white w-full py-3 px-4 rounded-lg shadow-inner focus:outline-none"
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
                                             className="bg-zinc-800 text-white w-full py-3 px-4 rounded-lg shadow-inner focus:outline-none"
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
                                   <button onClick={handleGoogleLogin} className="bg-transparent  text-white py-3 px-6 rounded-lg flex items-center">
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