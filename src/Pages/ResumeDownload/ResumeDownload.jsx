import GlobalHeader from '@/components/custom/Home/Header/GlobalHeader';
import React from 'react';
import { FaDownload, FaLinkedin, FaTwitter, FaFacebook, FaEnvelope } from 'react-icons/fa';

const ResumeDownload = () => {
     const handleDownload = () => {
          // Logic for downloading the PDF
     };

     const handleShare = (platform) => {
          // Logic for sharing via social media
     };

     return (
          <div className="bg-black min-h-screen text-white flex flex-col">
               {/* Header */}
               <GlobalHeader />

               {/* Main Content */}
               <div className="flex flex-col md:flex-row flex-1 p-6 space-y-8 md:space-y-0 md:space-x-8 mt-10">
                    {/* Left Section: Static PDF Viewer Container */}
                    <div className="flex-1 bg-zinc-900 rounded-lg p-2 flex justify-center items-center h-[calc(100vh-100px)]">
                         <div className="border border-zinc-700 rounded-lg w-full h-full overflow-hidden">
                              {/* Scrollable PDF */}
                              <iframe
                                   src="/OICL-AO-Notification.pdf"
                                   title="Resume Preview"
                                   className="w-full h-full bg-white rounded-lg overflow-y-scroll"
                              ></iframe>
                         </div>
                    </div>

                    {/* Right Section: Minimalistic Options Panel */}
                    <div className="w-full md:w-64 bg-zinc-900 p-4 rounded-lg space-y-4">
                         {/* Social Media Share Buttons */}
                         <div className="space-y-3">
                              <button
                                   onClick={() => handleDownload ()}
                                   className="w-full flex items-center justify-center py-2 px-3 bg-zinc-800 hover:bg-zinc-700 rounded text-sm transition"
                              >
                                   <FaDownload className="mr-2" />  Download
                              </button>
                              <button
                                   onClick={() => handleShare('linkedin')}
                                   className="w-full flex items-center justify-center py-2 px-3 bg-zinc-800 hover:bg-zinc-700 rounded text-sm transition"
                              >
                                   <FaLinkedin className="mr-2" /> LinkedIn
                              </button>
                              <button
                                   onClick={() => handleShare('twitter')}
                                   className="w-full flex items-center justify-center py-2 px-3 bg-zinc-800 hover:bg-zinc-700 rounded text-sm transition"
                              >
                                   <FaTwitter className="mr-2" /> Twitter
                              </button>
                              <button
                                   onClick={() => handleShare('facebook')}
                                   className="w-full flex items-center justify-center py-2 px-3 bg-zinc-800 hover:bg-zinc-700 rounded text-sm transition"
                              >
                                   <FaFacebook className="mr-2" /> Facebook
                              </button>
                              <button
                                   onClick={() => handleShare('email')}
                                   className="w-full flex items-center justify-center py-2 px-3 bg-zinc-800 hover:bg-zinc-700 rounded text-sm transition"
                              >
                                   <FaEnvelope className="mr-2" /> Email
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default ResumeDownload;
