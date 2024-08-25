import React from 'react';

const AISuggestionsButton = ({ onClick }) => {
  return (
    <button onClick={onClick}
      className="mb-2 absolute right-2 bottom-2 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400"
      style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6"
        fill="currentColor"
      >
        <path d="M12 2C6.486 2 2 6.486 2 12c0 2.652 1.037 5.026 2.735 6.769.074.076.156.147.235.225a9.94 9.94 0 001.504 1.12c.13.076.265.146.396.215 1.362.722 2.876 1.171 4.53 1.171 5.514 0 10-4.486 10-10S17.514 2 12 2zm-3 10c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm6 5c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm3-5c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm-3-3c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z" />
      </svg>
    </button>
  );
};

export default AISuggestionsButton;
