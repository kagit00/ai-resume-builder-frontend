import { useState } from "react";

function ResumeTipsModal({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // Delay to allow the sliding animation before unmounting
  };

  return (
    <div
      className={`fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-end transition-all duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="relative text-gray-200 shadow-xl w-full md:w-1/3 h-full p-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-300"
        >
          &times;
        </button>

        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-3xl font-thin text-white">Resume Creation Tips</h2>
          <p className="text-xs text-gray-300">Boost your chances with these professional tips</p>
        </div>

        {/* Tips Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-300">Key Tips:</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2">
              <span className="text-gray-400 text-xl">&#8226;</span>
              <p className="text-sm">Tailor your resume to the job description</p>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gray-400 text-xl">&#8226;</span>
              <p className="text-sm">Use strong action verbs</p>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gray-400 text-xl">&#8226;</span>
              <p className="text-sm">Quantify your achievements</p>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gray-400 text-xl">&#8226;</span>
              <p className="text-sm">Keep your resume concise</p>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gray-400 text-xl">&#8226;</span>
              <p className="text-sm">Proofread for errors</p>
            </li>
          </ul>
        </div>

        {/* Footer Section */}
        <div className="mt-auto pt-6 border-t border-gray-700">
          <button
            disabled
            className="w-full bg-gray-600 text-white py-2 text-xs font-semibold rounded-full shadow-lg cursor-not-allowed"
            title="Coming soon"
          >
            Explore Resume Templates (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumeTipsModal;
