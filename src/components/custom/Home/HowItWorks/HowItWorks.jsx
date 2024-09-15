import React from 'react';
import { motion } from 'framer-motion';
import { 
  LogIn, 
  Layout, 
  Edit, 
  Cpu, 
  DownloadCloud, 
  Search 
} from 'react-feather';

const steps = [
  {
    icon: LogIn,
    title: '#1. Log In',
    description: 'Start by logging into your account. If you don\'t have an account, sign up to get started.',
  },
  {
    icon: Layout,
    title: '#2. Access Dashboard',
    description: 'Once logged in, you\'ll be taken to your dashboard. Click on \'Create Resume\' to begin crafting your professional resume.',
  },
  {
    icon: Edit,
    title: '#3. Fill in Resume Details',
    description: 'Enter your personal information, work experience, education, and other relevant details. You can fill in each section step by step.',
  },
  {
    icon: Cpu,
    title: '#4. AI-Powered Assistance',
    description: 'Take advantage of our AI suggestions to optimize each section of your resume. The AI analyzes industry trends and recommends improvements to make your resume stand out.',
  },
  {
    icon: DownloadCloud,
    title: '#5. Download Your Resume',
    description: 'Once you\'re satisfied with your resume, click \'Finish\' to download it as a professional PDF. Your resume is now ready to send to employers!',
  },
  {
    icon: Search,
    title: '#6. Scan Against Job Boards',
    description: 'For further insights, you can scan your resume against popular job boards to ensure it matches the latest job market requirements and tailor it accordingly.',
  },
];

export default function HowItWorksTimeline() {
  return (
    <section id="howitworks" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-4xl font-thin tracking-tighter sm:text-5xl md:text-6xl mb-16 text-white text-center">
          How It Works
        </h3>

        {/* Central Vertical line */}
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute inset-x-1/2 top-0 h-full border-l-2 border-blue-400" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {/* Enhanced Timeline circle icon separated from the line */}
              <div className="relative z-10 w-16 h-16 flex items-center justify-center mr-8">
                <step.icon className="text-blue-400 w-10 h-10" />
              </div>

              {/* Step Content with background */}
              <div className="w-full text-center relative">
                <div className="mb-6 p-10 bg-gray-800 rounded-full shadow-xl">
                  <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                  <p className="text-gray-300">{step.description}</p>
                </div>

                {/* Vertical line below each step */}
                {index !== steps.length - 1 && (
                  <div className="absolute inset-x-1/2 top-full mt-6 h-12 border-l-2 border-blue-400" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
