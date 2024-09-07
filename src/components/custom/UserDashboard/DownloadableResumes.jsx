import React, { useState } from 'react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiIndeed } from 'react-icons/si';
import SearchFilter from './SearchFilter';
import generatePdf from '../ResumeBuilder/ResumeFinal/PdfGenerator';
import FinalResume from '../ResumeBuilder/ResumeFinal/FinalResume';

const DownloadableResumes = ({ downloadableResumes, userDetails }) => {
  const [titleFilter, setTitleFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const isFreeUser = userDetails.authorities[0].authority === 'FREE_USER';

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
    const addedSummary = resume.resumeSummary.details
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
    <section id="downloadable-resumes" className="relative flex-1 flex flex-col py-20 px-10">
      <div className="flex flex-col items-center mb-4 relative">
        <h2 className="text-3xl md:text-4xl lg:text-6xl mb-10 font-extralight leading-tight text-white flex items-center relative">
          Downloadable Resumes
          <span className="ml-3 px-3 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full shadow-lg">
            Premium
          </span>
        </h2>
      </div>

      <SearchFilter onApply={handleApplyFilter} onReset={handleResetFilter} />

      <div className="flex space-x-4 overflow-x-auto hidden-scrollbar p-4 mt-10">
        {filteredCards.map(card => (
          <div
            key={card.id}
            className="relative min-w-[250px] bg-gradient-to-l from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 mb-6 mr-6"
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
                { !isFreeUser &&
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
            <div className="flex flex-col justify-between h-full pt-8">
              <div className="mb-4">
                <p className="text-sm font-bold text-white mb-2 rounded-full truncate shadow-xl bg-gradient-to-l from-gray-600 to-gray-900 p-2">
                  {card.title}
                </p>
                <p className="text-xs text-gray-300 leading-relaxed px-2">
                  Enhance your chances of getting hired with a well-structured resume. Stand out from the crowd with a compelling CV!
                </p>
              </div>

              <div className="flex items-center mt-4">
                <span className="text-xs font-semibold text-gray-500 px-2">
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
  );
};

export default DownloadableResumes;

