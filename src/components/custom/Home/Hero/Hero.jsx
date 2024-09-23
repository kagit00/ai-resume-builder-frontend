import {useState} from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

function Hero() {
  const [showFloatingPage, setShowFloatingPage] = useState(false);

  const handleToggleFloatingPage = () => {
    setShowFloatingPage(!showFloatingPage);
  };

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
            <Button onClick={handleClick} className="bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:translate-y-[-2px]">
              Get Started <ChevronRight className="ml-2 h-5 w-5 inline" />
            </Button>
            <div className="relative">
              <button
                onClick={handleToggleFloatingPage}
                className="bg-gray-800 text-blue-400 rounded-full border-2 border-blue-400 hover:bg-gray-700 shadow-md hover:shadow-lg transform hover:translate-y-[-2px] px-4 py-2"
              >
                Learn More
              </button>

              {showFloatingPage && (
                <div
                  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-xl shadow-lg rounded-lg p-6 z-50"
                  style={{ height: '200px', width: '400px' }}
                >
                  <h2 className="text-xl font-thin mb-4">More Information</h2>
                  <p className="font-normal text-gray-300 text-xs  text-left leading-relaxed">When you will click on 'Get Started', you primarily have to sign up either with google or manually. Once 
                    you are logged in, you can start the journey of your resume creation process.
                  </p>
                  <button
                    onClick={handleToggleFloatingPage}
                    className="mt-4 text-sm text-blue-500 hover:underline"
                  >
                    Close
                  </button>
                </div>
              )}

              {showFloatingPage && (
                <div
                  className="fixed inset-0 bg-black opacity-50 z-40"
                  onClick={handleToggleFloatingPage}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Hero