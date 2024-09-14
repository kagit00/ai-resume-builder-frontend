import React, { useState } from 'react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiIndeed } from 'react-icons/si';
import SearchFilter from './SearchFilter';
import generatePdf from '../ResumeBuilder/ResumeFinal/PdfGenerator';
import FinalResume from '../ResumeBuilder/ResumeFinal/FinalResume';
import NothingToDisplay from '@/components/custom/UserDashboard/NothingToDisplay';
import { useQuery } from '@tanstack/react-query';
import { getResumeListByUserId } from '@/services/ApiService.js';
import PricingModal from '../UpgradeToPremium/PricingModal';

const DownloadableResumes = ({ userDetails }) => {
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [titleFilter, setTitleFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const isFreeUser = userDetails.authorities.length === 1 && userDetails.authorities[0].authority === 'FREE_USER'
  const nothingToDisplayTextDownloadableResume = 'No Downloadable Resume Is Here';

  const { data: downloadableResumes = [], isLoading: isDownloadableResumesLoading } = useQuery({
    queryKey: ['downloadableResumes', userDetails?.id],
    queryFn: () => getResumeListByUserId(userDetails?.id, 'completed'),
    enabled: !!userDetails,
  });

  const filteredCards = downloadableResumes.filter(card => {
    const titleMatch = card.title.toLowerCase().includes(titleFilter.toLowerCase());
    const dateMatch = dateFilter ? card.updatedAt.includes(dateFilter) : true;
    return titleMatch && dateMatch;
  });

  const handleApplyFilter = (title, date) => {
    setTitleFilter(title);
    setDateFilter(date);
  };

  const handleResetFilter = () => {
    setTitleFilter('');
    setDateFilter('');
  };

  const downloadResume = async (resume) => {
    const addedSummary = resume.resumeSummary.details || ''
    const addedAdditionalDetails = resume.additionalDetails
    const skills = resume.skills.split(',');
    const resumeSectionsData = resume.resumeSections
    const educationList = resumeSectionsData.filter(item => item.sectionType === 'EDUCATION');
    const experienceList = resumeSectionsData.filter(item => item.sectionType === 'EXPERIENCE');
    const projectsList = resumeSectionsData.filter(item => item.sectionType === 'PROJECT');
    const languagesList = resume.languages
    const resumePdfTitle = transformToSnakeCase(resume.title)
    generatePdf(resumePdfTitle,
      <FinalResume
        userDetails={userDetails}
        addedSummary={addedSummary}
        addedAdditionalDetails={addedAdditionalDetails}
        experienceList={experienceList}
        educationList={educationList}
        projectsList={projectsList}
        skills={skills}
        languagesList={languagesList}
      />
    )
  }

  function transformToSnakeCase(str) {
    return str.replace(/\s+/g, '_');
  }

  // Share handler
  const handleShare = (platform) => {
    if (platform === 'linkedin') {
      window.open('https://www.linkedin.com', '_blank');
    } else if (platform === 'indeed') {
      window.open('https://www.indeed.com', '_blank');
    } else if (platform === 'email') {
      window.open('mailto:?subject=Resume&body=Check out my resume!');
    }
  };

  return (
    <>
      {downloadableResumes.length > 0 ? (
        <section id="downloadable-resumes" className="relative flex-1 flex flex-col py-20 px-10">
          <div className="flex flex-col items-center mb-4 relative">
            <h2 className="text-3xl md:text-4xl lg:text-6xl mb-10 font-extralight leading-tight text-white flex items-center relative">
              Downloadable Resumes
              {!isFreeUser && <span className="ml-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                <svg className="inline-block w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Premium
              </span>}
            </h2>
            {isFreeUser && <div className="flex items-center">
              <a onClick={() => setShowPricingModal(true)} className="text-blue-500 hover:text-blue-700 font-semibold text-sm cursor-pointer">
                Upgrade
              </a>
              <p className="ml-2 text-gray-300 text-sm">
                to download and share your resumes with employers
              </p>
            </div>}
          </div>

          <SearchFilter onApply={handleApplyFilter} onReset={handleResetFilter} />

          <div className="flex space-x-4 overflow-x-auto hidden-scrollbar p-4 mt-10">
            {filteredCards.map(card => (
              <div
                key={card.id}
                className="relative max-w-[350px] min-w-[300px] bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 mb-6"
              >
                {/* Action Icons */}
                <div className="absolute top-4 right-4 flex items-center space-x-4">
                  {/* Download Icon */}
                  <svg onClick={() => {
                    if (!isFreeUser) downloadResume(card);
                  }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-6 h-6 p-1 rounded-full ${isFreeUser ? "bg-gray-300 text-gray-400 cursor-not-allowed" : "bg-white text-blue-500 hover:bg-blue-200 cursor-pointer"
                      } transition-colors`}
                    style={{ pointerEvents: isFreeUser ? 'none' : 'auto' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v12m0 0l-4-4m4 4l4-4m-4 4v-12m0 16v-4"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 20h16"
                    />
                  </svg>

                  {/* Share Icon */}
                  <div className="relative group">
                    <svg onClick={() => {
                      if (!isFreeUser) handleShare('linkedin');
                    }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className={`w-6 h-6 p-1 rounded-full ${isFreeUser ? "bg-gray-300 text-gray-400 cursor-not-allowed" : "bg-white text-green-500 hover:bg-green-200 cursor-pointer"
                        } transition-colors`}
                      style={{ pointerEvents: isFreeUser ? 'none' : 'auto' }}

                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 12h16M12 4l8 8m-8 8l-8-8"
                      />
                    </svg>

                    {/* Share options */}
                    {!isFreeUser &&
                      <div className="absolute hidden group-hover:flex flex-col space-y-2 right-0 mt-2 bg-gray-800 text-white text-xs rounded-md p-2 shadow-lg z-10">
                        <div
                          className="flex items-center space-x-1 cursor-pointer hover:text-blue-500"
                          onClick={() => handleShare('linkedin')}
                        >
                          <FaLinkedin className="text-blue-500" />
                          <span>LinkedIn</span>
                        </div>
                        <div
                          className="flex items-center space-x-1 cursor-pointer hover:text-blue-500"
                          onClick={() => handleShare('indeed')}
                        >
                          <SiIndeed className="text-blue-500" />
                          <span>Indeed</span>
                        </div>
                        <div
                          className="flex items-center space-x-1 cursor-pointer hover:text-blue-500"
                          onClick={() => handleShare('email')}
                        >
                          <FaEnvelope className="text-yellow-400" />
                          <span>Email</span>
                        </div>
                      </div>}
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col justify-between h-full pt-2">
                  <div className="mb-4">
                    <p className="font-thin text-4xl text-white mb-2 shadow-3xl p-2">
                      {card.title}
                    </p>
                    <p className="text-xs text-gray-200 leading-relaxed font-light px-2">
                      Enhance your chances of getting hired with a well-structured resume. Stand out from the crowd with a compelling CV!
                    </p>
                  </div>

                  <div className="flex items-center mt-4">
                    <span className="text-xs font-light text-gray-300 px-2">
                      {new Date(card.updatedAt).toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <NothingToDisplay text={nothingToDisplayTextDownloadableResume} userDetails={userDetails} />
      )
      }
    </>
  );
};

export default DownloadableResumes;

