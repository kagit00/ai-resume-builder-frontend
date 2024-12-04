import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchFilter = ({ onApply, onReset, placeholderTitle = "Filter by title", placeholderDate = "Filter by date" }) => {
  const [titleFilter, setTitleFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    onApply(titleFilter, dateFilter);
    setIsOpen(false);
  };

  const handleReset = () => {
    setTitleFilter('');
    setDateFilter('');
    onReset();
  };

  const handleClosePanel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-40 right-7 text-white p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 right-4 backdrop-blur-xl rounded-lg p-4 shadow-lg w-72 z-10">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleClosePanel}
              className="text-gray-400 hover:text-gray-600 absolute right-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <input
            type="text"
            placeholder={placeholderTitle}
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            className="border-b-2 p-2 text-xs mb-4 w-full bg-transparent"
          />
          {/* <input
            type="text"
            placeholder={placeholderDate}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border-b-2 p-2 text-xs mb-4 w-full bg-transparent"
          /> */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleReset}
              className="text-white rounded-sm p-2 text-xs"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="bg-blue-500 text-white rounded-3xl p-2 text-xs"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
};

SearchFilter.propTypes = {
  onApply: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  placeholderTitle: PropTypes.string,
  placeholderDate: PropTypes.string,
};

export default SearchFilter;
