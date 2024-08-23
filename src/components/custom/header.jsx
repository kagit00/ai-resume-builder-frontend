import React from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
     const location = useLocation();
     const navigate = useNavigate();
     const jwtToken = sessionStorage.getItem('JWT_TOKEN');
     const googleAuthToken = sessionStorage.getItem('GOOGLE_OAUTH2_TOKEN');

     const logOut = () => {
          sessionStorage.clear();
          navigate('/');
     }

     return (
          <header className="w-full py-3 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-gray-100 fixed top-0 left-0 z-50">
               <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
                    <p className="flex text-2xl text-white tracking-wide">
                         <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" class="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" class="ccustom" fill="#312ECB"></path> </svg>
                    </p>
                    <nav>
                         {location.pathname === '/' && (
                              <ul className="hidden md:flex space-x-8 text-md">
                                   <li>
                                        <a href="#home" className="hover:text-gray-400 transition duration-300 ease-in-out">Home</a>
                                   </li>
                                   <li>
                                        <a href="#features" className="hover:text-gray-400 transition duration-300 ease-in-out">Features</a>
                                   </li>
                                   <li>
                                        <a href="#showcase" className="hover:text-gray-400 transition duration-300 ease-in-out">Steps</a>
                                   </li>
                                   <li>
                                        <a href="#pricing" className="hover:text-gray-400 transition duration-300 ease-in-out">Pricing</a>
                                   </li>
                                   {!jwtToken && !googleAuthToken && (
                                        <li>
                                             <a
                                                  href="/auth/sign-in"
                                                  className="hover:text-gray-200 transition duration-300 ease-in-out bg-gray-600 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105"
                                             >
                                                  Get Started
                                             </a>
                                        </li>
                                   )}
                              </ul>
                         )}
                    </nav>
                    {(jwtToken || googleAuthToken) && location.pathname.startsWith('/user/') && (
                         <a onClick={logOut} className="cursor-pointer text-white hover:text-red-500 transition duration-300 ease-in-out">
                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   fill="none"
                                   viewBox="0 0 24 24"
                                   stroke="currentColor"
                                   className="h-6 w-6"
                              >
                                   <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1"
                                   />
                              </svg>
                         </a>
                    )}
               </div>
          </header>

     )
}

export default Header