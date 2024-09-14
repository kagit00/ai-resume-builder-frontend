import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Typewriter from 'react-typewriter-effect';
 
function Hero() {
  const handleClick = () => {
    window.location.href = '/auth/sign-in';
  };

     return (
          <section className="w-full py-20 md:py-32 lg:py-40 mt-10 bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-5xl font-thin tracking-tighter sm:text-6xl md:text-7xl text-gray-100">
                  Create Your Perfect Resume with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Craft a professional, tailored resume in minutes with our advanced AI technology. Stand out from the crowd and land your dream job.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button  onClick={handleClick} className="bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:translate-y-[-2px]">
                  Get Started <ChevronRight className="ml-2 h-5 w-5 inline" />
                </Button>
                <Button className="bg-gray-800 text-blue-400 rounded-full border-2 border-blue-400 hover:bg-gray-700 shadow-md hover:shadow-lg transform hover:translate-y-[-2px]">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

     )
}

export default Hero