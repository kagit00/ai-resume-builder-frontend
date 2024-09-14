import React from 'react';
import { motion, useAnimation } from 'framer-motion';
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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function Features() {
  const controls = useAnimation();

  const handleScroll = () => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        controls.start("visible");
      }
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <section id="features" className="w-full py-20 md:py-32 bg-gray-900">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-4xl font-thin tracking-tight sm:text-5xl md:text-7xl text-center mb-16 text-gray-100">
          Features
        </h2>

        <div className="relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full border-l-2 border-blue-500"></div>
          <div className="flex flex-col items-center">
            {timelineData.map((feature, index) => (
              <motion.div
                key={index}
                className="relative mb-20 w-full max-w-4xl fade-in"
                initial="hidden"
                animate={controls}
                variants={fadeInUp}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center">
                  {React.cloneElement(feature.icon)}
                </div>
                <motion.div
                  className="ml-24 pl-8 bg-gray-900 p-8 rounded-lg shadow-lg mx-auto"
                  whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
                >
                  <h3 className="text-xl font-semibold text-gray-100 mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;





