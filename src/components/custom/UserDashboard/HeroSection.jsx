import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const HeroSection = () => {
  return (
    <div className="relative z-10 max-w-3xl mx-auto px-6 py-4">
      <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-light text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-900 animate-gradientPulse drop-shadow-lg">
        <span className="inline-block">
          <Typewriter
            words={["Hello", "Hola", "Namaste"]}
            cursor
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={60}
            delaySpeed={1000}
          />
        </span>
      </h2>

      <p className="text-sm md:text-md lg:text-lg leading-relaxed text-gray-400 font-normal">
        <span className="font-bold bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 text-transparent">
          Click on the '+'
        </span>{' '}
        and make your professional resumes effortlessly. Our tools help you craft standout resumes, showcasing your skills and experience to potential employers.
      </p>
    </div>
  );
};

export default HeroSection;
