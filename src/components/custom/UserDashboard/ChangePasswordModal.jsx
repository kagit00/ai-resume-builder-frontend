import { useState } from "react";

function ChangePasswordModal({ isOpen, onClose }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    setTimeout(onClose, 0); // Delay for transition
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      alert("Password changed successfully");
      handleClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-end transition-all duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="relative bg-blue-900 text-gray-200 shadow-xl w-full md:w-1/2 h-full p-8">
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
          <h2 className="text-3xl font-thin text-white">Change Password</h2>
          <p className="text-xs text-gray-300">Ensure your account is secure by updating your password regularly</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <label htmlFor="current-password" className="block text-sm text-gray-200 mb-2">
              Current Password
            </label>
            <input
              type="password"
              id="current-password"
              className="w-full px-3 py-1 focus:outline-none bg-transparent border-b-2 text-gray-200"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="new-password" className="block text-sm text-gray-200 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              className="w-full px-3 py-1 focus:outline-none bg-transparent border-b-2 text-gray-200"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label htmlFor="confirm-password" className="block text-sm text-gray-200 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-3 py-1 focus:outline-none bg-transparent border-b-2 text-gray-200"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}

          {/* Submit Button */}
          <div className="mt-10">
            <button
              type="submit"
              className="w-full bg-blue-950 hover:bg-blue-800 text-white py-2 rounded-full shadow-xl transition-all duration-300"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
