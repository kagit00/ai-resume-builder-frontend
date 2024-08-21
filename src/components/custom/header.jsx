import React from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
     const location = useLocation();
      const navigate = useNavigate();
     const jwtToken = localStorage.getItem('JWT_TOKEN');
     const googleAuthToken = localStorage.getItem('GOOGLE_OAUTH2_TOKEN');

     const logOut = () => {
          localStorage.clear();
          navigate('/');
     }

     return (
          <header className="w-full py-5 bg-black fixed top-0 left-0 z-50 shadow-lg">
               <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">resumed.</h1>
                    <nav>
                         {location.pathname === '/' && (
                              <ul className="hidden md:flex space-x-8 text-md">
                                   <li><a href="#home" className="hover:text-gray-400 transition">Home</a></li>
                                   <li><a href="#features" className="hover:text-gray-400 transition">Features</a></li>
                                   <li><a href="#showcase" className="hover:text-gray-400 transition">Steps</a></li>
                                   <li><a href="#pricing" className="hover:text-gray-400 transition">Pricing</a></li>

                                   {!jwtToken && !googleAuthToken && (
                                        <li>
                                             <a href="/auth/sign-in" className="hover:text-gray-400 transition bg-gray-600 text-white py-3 px-5 md:py-3 md:px-5 rounded-full shadow-7xl">
                                                  Get Started
                                             </a>
                                        </li>
                                   )}

                              </ul>
                         )}
                    </nav>
                    {(jwtToken || googleAuthToken) && (
                         <a onClick={logOut} className='cursor-pointer'>
                              Log Out
                         </a>
                    )}
               </div>
          </header>
     )
}

export default Header