import React from 'react';

function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-light text-white mb-10">Pricing Plans</h3>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">

          {/* Basic Plan */}
          <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full max-w-sm">
            <h4 className="text-xl font-semibold mb-2">Basic Plan</h4>
            <p className="text-gray-400 text-lg mb-4">Rs. 0 with Lifetime Access</p>
            <ul className="text-left text-gray-400 space-y-3 mb-6">
              <li>Unlimited Resume Creation</li>
              <li>AI-powered features</li>
              <li>Email support</li>
              <li>Unlimited Resume Editing</li>
            </ul>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-500 transition duration-300">
              Get Started
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-400 text-white p-6 rounded-xl shadow-lg w-full max-w-sm transform">
            <h4 className="text-xl font-semibold mb-2">Premium Plan</h4>
            <p className="text-white text-lg mb-4">Rs. 20 with Lifetime Access</p>
            <ul className="text-left space-y-3 mb-6">
              <li>All Basic Plan Features</li>
              <li>Analyze Your Resumes & Get Insights</li>
              <li>Download Resumes in PDF</li>
              <li>Share Resumes on Social Platforms</li>
            </ul>
            <button className="bg-white text-blue-600 py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300">
              Upgrade Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Pricing;
