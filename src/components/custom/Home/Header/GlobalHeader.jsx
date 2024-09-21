import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { doNormalLogOut } from '@/utils/AuthUtils';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

function GlobalHeader({ onSectionChange, activeSection }) {
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation();
    const sectionNames = {
        section1: "Profile & Misc.",
        section2: "Pending Resumes",
        section3: "Downloadable Resumes",
        section4: "Resume Analysis",
    };
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const logout = () => {
        try {
            setIsLoading(true)
            doNormalLogOut()
        } catch (err) {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {isLoading && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                </div>
            )}
            <header className="w-full py-3 bg-gray-900 text-gray-100 fixed top-0 left-0 z-50">
                <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
                    {/* Logo */}
                    <a href="/" className="flex items-center justify-center">
                        <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path>
                            <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#312ECB"></path>
                        </svg>
                    </a>

                    {/* Hamburger Menu Button */}
                    {!location.pathname.startsWith('/user') && (
                        <button
                            className="block lg:hidden p-2"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    )}

                    {/* Navigation Links */}
                    <nav
                        className={`lg:flex lg:gap-8 flex-col lg:flex-row absolute lg:relative top-16 right-2 lg:top-auto lg:left-auto bg-black text-white opacity-80 lg:bg-transparent shadow-md lg:shadow-none ${isOpen ? 'block' : 'hidden'}`}
                    >
                        {!location.pathname.startsWith('/user') && (
                            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-4 lg:p-0">
                                <a href="#features" className="text-xs md:text-sm lg:text-base font-normal hover:text-blue-400 transition-colors">
                                    Features
                                </a>
                                <a href="#howitworks" className="text-xs md:text-sm lg:text-base font-normal hover:text-blue-400 transition-colors">
                                    How It Works
                                </a>
                                <a href="#sampleresume" className="text-xs md:text-sm lg:text-base font-normal hover:text-blue-400 transition-colors">
                                    Sample Resume
                                </a>
                                <a href="#pricing" className="text-xs md:text-sm lg:text-base font-normal hover:text-blue-400 transition-colors">
                                    Pricing
                                </a>
                            </div>
                        )}
                    </nav>

                    {location.pathname.endsWith("/dashboard") && (
                        <div className="absolute top-5 right-20">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center px-4 py-1 bg-gray-700 text-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-150"
                            >
                                <span className="mr-2 text-xs font-semibold tracking-wide">{sectionNames[activeSection]}</span>
                                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-full max-w-xs bg-gray-800 text-gray-200 rounded-lg shadow-lg z-50 opacity-90 transition-opacity duration-200 ease-in-out">
                                    <ul className="text-xs font-semibold">
                                        <li
                                            className="px-4 py-3 hover:bg-gray-700 rounded-lg cursor-pointer transition ease-in-out duration-150"
                                            onClick={() => {
                                                onSectionChange("section1");
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            Profile & Misc.
                                        </li>
                                        <li
                                            className="px-4 py-3 hover:bg-gray-700 rounded-lg cursor-pointer transition ease-in-out duration-150"
                                            onClick={() => {
                                                onSectionChange("section2");
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            Pending Resumes
                                        </li>
                                        <li
                                            className="px-4 py-3 hover:bg-gray-700 rounded-lg cursor-pointer transition ease-in-out duration-150"
                                            onClick={() => {
                                                onSectionChange("section3");
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            Downloadable Resumes
                                        </li>
                                        <li
                                            className="px-4 py-3 hover:bg-gray-700 rounded-lg cursor-pointer transition ease-in-out duration-150"
                                            onClick={() => {
                                                onSectionChange("section4");
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            Resume Analysis
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}



                    {/* Logout Button */}
                    {location.pathname.startsWith("/user/") && (
                        <a onClick={() => logout()} className="cursor-pointer text-white hover:text-red-500 transition duration-300 ease-in-out">
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
        </>
    )
}

export default GlobalHeader
