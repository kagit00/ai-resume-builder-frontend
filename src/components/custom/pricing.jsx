import React from 'react'

function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-black">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h3 className="text-4xl md:text-5xl lg:text-6xl mb-12 text-white">Pricing Plans</h3>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
            <div className=" p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-xs">
              <h4 className="text-xl md:text-2xl font-semibold mb-4 text-gray-100">Basic Plan</h4>
              <p className="text-gray-400 text-lg mb-6">$29/month</p>
              <ul className="text-left text-gray-400 mb-6">
                <li className="mb-3">Access to all templates</li>
                <li className="mb-3">Basic AI features</li>
                <li className="mb-3">Email support</li>
              </ul>
              <button className="bg-gray-600 text-white py-3 px-6 md:py-3 md:px-8 rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300 text-base md:text-lg font-semibold hover:bg-blue-600">Subscribe</button>
            </div>
            <div className="bg-zinc-900 text-white p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-xs">
              <h4 className="text-xl md:text-2xl font-semibold mb-4">Premium Plan</h4>
              <p className="text-white text-lg mb-6">$59/month</p>
              <ul className="text-left mb-6">
                <li className="mb-3">All Basic Plan features</li>
                <li className="mb-3">Advanced AI insights</li>
                <li className="mb-3">Priority support</li>
                <li className="mb-3">Resume review by experts</li>
              </ul>
              <button className="bg-blue-500 text-white py-3 px-6 md:py-3 md:px-8 rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300 text-base md:text-lg font-semibold hover:bg-gray-100">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Pricing