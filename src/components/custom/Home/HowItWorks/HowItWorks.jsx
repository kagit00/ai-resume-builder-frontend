import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FaSignInAlt, FaTachometerAlt, FaKeyboard, FaRobot, FaDownload, FaSearch } from 'react-icons/fa';

const steps = [
  {
    icon: FaSignInAlt,
    title: 'Log In',
    description: 'Start by logging into your account. If you don\'t have an account, sign up to get started.',
  },
  {
    icon: FaTachometerAlt,
    title: 'Access Dashboard',
    description: 'Once logged in, you\'ll be taken to your dashboard. Click on \'Create Resume\' to begin crafting your professional resume.',
  },
  {
    icon: FaKeyboard,
    title: 'Fill in Resume Details',
    description: 'Enter your personal information, work experience, education, and other relevant details. You can fill in each section step by step.',
  },
  {
    icon: FaRobot,
    title: 'AI-Powered Assistance',
    description: 'Take advantage of our AI suggestions to optimize each section of your resume. The AI analyzes industry trends and recommends improvements to make your resume stand out.',
  },
  {
    icon: FaDownload,
    title: 'Download Your Resume',
    description: 'Once you\'re satisfied with your resume, click \'Finish\' to download it as a professional PDF. Your resume is now ready to send to employers!',
  },
  {
    icon: FaSearch,
    title: 'Scan Against Job Boards',
    description: 'For further insights, you can scan your resume against popular job boards to ensure it matches the latest job market requirements and tailor it accordingly.',
  },
];

const stepAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="howitworks" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-4xl font-thin tracking-tighter sm:text-5xl md:text-6xl mb-16 text-white text-center">
          How It Works
        </h3>

        <div className="relative flex flex-col items-center">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex flex-col items-center w-full md:w-1/2 xl:w-1/3 px-4 mb-12 md:mb-16 transition-transform duration-500`}
              initial="hidden"
              animate={currentStep === index ? "visible" : "hidden"}
              variants={stepAnimation}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ display: currentStep === index ? 'flex' : 'none' }}
            >
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-400"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <step.icon className="text-blue-400 w-8 h-8" />
                </motion.div>
              </div>
              <motion.h4
                className="text-xl font-semibold text-gray-100 mb-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                {step.title}
              </motion.h4>
              <motion.p
                className="text-gray-300 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {step.description}
              </motion.p>
              {index < steps.length - 1 && (
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ArrowRight className="text-gray-500 w-6 h-6" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
