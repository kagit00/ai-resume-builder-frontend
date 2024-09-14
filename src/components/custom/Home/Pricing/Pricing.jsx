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
            <p className="text-gray-400 text-lg mb-6">$29/month</p>
            <ul className="text-left text-gray-400 mb-6">
              <li className="mb-3">Access to all templates</li>
              <li className="mb-3">Basic AI features</li>
              <li className="mb-3">Email support</li>
            </ul>
            <Button className="bg-gray-600 text-white hover:bg-blue-700 rounded-full shadow-md hover:shadow-lg transform hover:translate-y-[-2px]">
              Get Started <ChevronRight className="ml-2 h-5 w-5 inline" />
            </Button>          </div>
          <div className="bg-gray-800 text-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-xs">
            <h4 className="text-xl md:text-2xl font-semibold mb-4">Premium Plan</h4>
            <p className="text-white text-lg mb-6">$59/month</p>
            <ul className="text-left mb-6">
              <li className="mb-3">All Basic Plan features</li>
              <li className="mb-3">Advanced AI insights</li>
              <li className="mb-3">Priority support</li>
              <li className="mb-3">Resume review by experts</li>
            </ul>
            <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-full shadow-md hover:shadow-lg transform hover:translate-y-[-2px]">
              Subscribe <ChevronRight className="ml-2 h-5 w-5 inline" />
            </Button>            
            </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing