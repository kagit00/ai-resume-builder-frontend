import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { doNormalLogOut } from '@/utils/AuthUtils';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

function GlobalHeader({ onSectionChange, activeSection }) {
     const location = useLocation();
     const queryClient = useQueryClient();

     const sectionNames = {
          section1: "Profile & Misc.",
          section2: "Pending Resumes",
          section3: "Downloadable Resumes",
     };

     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

     const toggleDropdown = () => {
          setIsDropdownOpen(!isDropdownOpen);
     };

     return (
          <header className="w-full py-3 bg-gray-900 text-gray-100 fixed top-0 left-0 z-50">
               <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
                    {/* Logo */}
                    <p className="flex text-2xl text-white tracking-wide">
                         <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path>
                              <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#312ECB"></path>
                         </svg>
                    </p>

                    {location.pathname.endsWith("/dashboard") && (
                         <div className="relative">
                              <button
                                   onClick={toggleDropdown}
                                   className="flex items-center px-4 py-2 bg-gray-800 text-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                              >
                                   <span className="mr-2">{sectionNames[activeSection]}</span>
                                   <ChevronDownIcon className="h-5 w-5" />
                              </button>
                              {isDropdownOpen && (
                                   <div className="absolute right-0 mt-2 w-48 bg-gray-800 font-normal text-sm text-white rounded shadow-lg z-50">
                                        <ul>
                                             <li
                                                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                                  onClick={() => {
                                                       onSectionChange("section1");
                                                       setIsDropdownOpen(false);
                                                  }}
                                             >
                                                  Profile & Misc.
                                             </li>
                                             <li
                                                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                                  onClick={() => {
                                                       onSectionChange("section2");
                                                       setIsDropdownOpen(false);
                                                  }}
                                             >
                                                  Pending Resumes
                                             </li>
                                             <li
                                                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                                  onClick={() => {
                                                       onSectionChange("section3");
                                                       setIsDropdownOpen(false);
                                                  }}
                                             >
                                                  Downloadable Resumes
                                             </li>
                                        </ul>
                                   </div>
                              )}
                         </div>
                    )}

                    {/* Logout Button */}
                    {location.pathname.startsWith("/user/") && (
                         <a onClick={() => doNormalLogOut()} className="cursor-pointer text-white hover:text-red-500 transition duration-300 ease-in-out">
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

export default GlobalHeader