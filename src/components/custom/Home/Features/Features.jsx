import React, { useEffect, useState } from 'react';
import { CheckCircle, FileText, Zap } from 'lucide-react';

const timelineData = [
  {
    icon: <Zap className="h-8 w-8 text-blue-500 opacity-70" />,
    title: 'AI-Powered Optimization',
    description: 'Our AI-powered system analyzes your experience and skills to craft a resume that highlights your strengths and aligns with your career goals. Stand out from the competition with a resume designed to impress recruiters and hiring managers.',
  },
  {
    icon: <FileText className="h-8 w-8 text-blue-500 opacity-70" />,
    title: 'ATS-Friendly Templates',
    description: 'Choose from a range of templates optimized for Applicant Tracking Systems (ATS). Our templates ensure your resume passes through automated screenings and reaches the hands of hiring professionals.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-blue-500 opacity-70" />,
    title: 'Easy Customization',
    description: 'Customize your resume effortlessly with our user-friendly interface. Make changes in real-time, and preview your updates instantly to create a resume that reflects your personal style and professional accomplishments.',
  },
];

function Features() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % timelineData.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section id="features" className="w-full py-12 md:py-20 lg:py-32 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight text-center mb-12 md:mb-16 text-gray-100">
          Features
        </h2>

        {/* Slider Wrapper */}
        <div className="relative max-w-5xl mx-auto overflow-hidden h-64 md:h-72 lg:h-80">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }} // Slide movement
          >
            {timelineData.map((feature, index) => (
              <div key={index} className="w-full flex-shrink-0 flex flex-col items-center justify-center px-6">
                <div className="flex items-center justify-center mb-4">
                  {React.cloneElement(feature.icon, { className: 'h-10 w-10 text-blue-500' })}
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-normal text-blue-400 mb-4">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm lg:text-base text-left text-gray-300 max-w-2xl">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Pause/Play Button */}
          <div className="absolute top-4 right-4">
            <button
              className="text-gray-300 p-2 hover:bg-gray-700 rounded-full text-sm"
              onClick={togglePause}
            >
              {isPaused ? 'Play' : 'Pause'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;

