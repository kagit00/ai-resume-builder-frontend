import React, { useState } from 'react';
import SearchFilter from './SearchFilter';

const DownloadableResumes = ({ downloadableResumes }) => {
  const [titleFilter, setTitleFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredCards = downloadableResumes.filter(card => {
    const titleMatch = card.title.toLowerCase().includes(titleFilter.toLowerCase());
    const dateMatch = dateFilter ? card.lastUpdated.includes(dateFilter) : true;
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

  return (
    <section id="downloadable-resumes" className="relative flex-1 flex flex-col py-20 px-10">
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-3xl md:text-4xl lg:text-6xl mb-10 font-extralight leading-tight text-white">
          Downloadable Resumes
        </h2>
      </div>

      <SearchFilter onApply={handleApplyFilter} onReset={handleResetFilter} />

      <div className="flex space-x-4 overflow-x-auto hidden-scrollbar p-4 mt-10">
        {filteredCards.map(card => (
          <div
            key={card.id}
            className="relative min-w-[250px] bg-gradient-to-r from-black to-zinc-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 mb-6 mr-6"
          >
            {/* Action Icons */}
            <div className="absolute top-4 right-4 flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="blue"
                className="w-6 h-6 p-1 hover:shadow-xl hover:scale-110 transition-transform cursor-pointer"
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
            </div>

            {/* Card Content */}
            <div className="flex flex-col justify-between h-full pt-8">
              <div className="mb-4">
                <p className="text-lg font-semibold text-white mb-2 truncate">
                  {card.title}
                </p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Enhance your chances of getting hired with a well-structured resume. Stand out from the crowd with a compelling CV!
                </p>
              </div>

              <div className="flex items-center mt-4">
                <span className="text-xs font-semibold text-gray-500">
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

export default DownloadableResumes
