import React from 'react'
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h3 className="text-4xl md:text-5xl lg:text-6xl py-20 font-thin text-white">Pricing Plans</h3>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
          <div className=" p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-xs">
            <h4 className="text-xl md:text-2xl font-semibold mb-4 text-gray-100">Basic Plan</h4>
            <p className="text-gray-400 text-lg mb-6">Rs. 0 with Lifetime Access</p>
            <ul className="text-left text-gray-400 mb-6">
              <li className="mb-3">Unlimited Resume Creation</li>
              <li className="mb-3">AI features</li>
              <li className="mb-3">Email support</li>
              <li className="mb-3">Unlimited Resume Edit</li>
            </ul>
        </div>
          <div className="bg-gray-800 text-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-xs">
            <h4 className="text-xl md:text-2xl font-semibold mb-4">Premium Plan</h4>
            <p className="text-white text-lg mb-6">Rs. 20 with Lifetime Access</p>
            <ul className="text-left mb-6">
               <li className="mb-3">All Basic Featues</li>
              <li className="mb-3">Analyze Your Resumes & Get Insights</li>
              <li className="mb-3">Download Your Resumes</li>
              <li className="mb-3">Share Resumes on Social</li>
            </ul>          
            </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing