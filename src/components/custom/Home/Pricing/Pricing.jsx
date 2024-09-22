import React from 'react';

function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h3 className="text-4xl md:text-5xl lg:text-6xl py-10 font-light text-white">Pricing Plans</h3>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">

          {/* Basic Plan */}
          <div className="bg-gray-800 text-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
            <h4 className="text-2xl font-semibold mb-4">Basic Plan</h4>
            <p className="text-gray-400 text-xl mb-6">Rs. 0 with Lifetime Access</p>
            <ul className="text-left text-gray-400 space-y-4 mb-8">
              <li>Unlimited Resume Creation</li>
              <li>AI-powered features</li>
              <li>Email support</li>
              <li>Unlimited Resume Editing</li>
            </ul>
            <button className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-500 transition duration-300">
              Get Started
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-red-600 to-red-400 text-white p-8 rounded-3xl shadow-2xl w-full max-w-md transform scale-105">
            <h4 className="text-2xl font-semibold mb-4">Premium Plan</h4>
            <p className="text-white text-xl mb-6">Rs. 20 with Lifetime Access</p>
            <ul className="text-left space-y-4 mb-8">
              <li>All Basic Plan Features</li>
              <li>Analyze Your Resumes & Get Insights</li>
              <li>Download Resumes in PDF</li>
              <li>Share Resumes on Social Platforms</li>
            </ul>
            <button className="bg-white text-red-600 py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300">
              Upgrade Now
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-gray-800 text-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
            <h4 className="text-2xl font-semibold mb-4">Enterprise Plan</h4>
            <p className="text-gray-400 text-xl mb-6">Contact Us for Pricing</p>
            <ul className="text-left text-gray-400 space-y-4 mb-8">
              <li>All Premium Plan Features</li>
              <li>Custom Resume Templates</li>
              <li>Dedicated Account Manager</li>
              <li>Priority Support</li>
            </ul>
            <button className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-500 transition duration-300">
              Contact Us
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Pricing;
