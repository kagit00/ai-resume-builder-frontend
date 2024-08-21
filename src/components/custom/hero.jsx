import React from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from "react-simple-typewriter";

function Hero() {

     return (
          <section id="home" className="relative flex-1 flex flex-col justify-center items-center text-center bg-gradient-to-r from-gray-900 to-black py-40 w-full">
               <div className="relative px-4 md:px-8 container mx-auto">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl mb-12 leading-tight text-white">
                         Build
                         <Typewriter
                              words={[
                                   " Stunning",
                                   " Elegant",
                                   " Creative",
                                   " Professional",
                                   " Simple"
                              ]}
                              cursor
                              cursorStyle="_"
                              typeSpeed={70}
                              deleteSpeed={50}
                              delaySpeed={1000}
                         />
                         Resumes
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-12 max-w-full md:max-w-3xl mx-auto">Create a professional, eye-catching resume in minutes with our AI-powered resume builder.</p>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center">
                         {
                              true ?
                                   <Link to={'/auth/sign-up'}>
                                        <button className="bg-blue-500 text-white py-3 px-6 md:py-3 md:px-8 rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300 text-base md:text-lg font-semibold hover:bg-blue-600">Get Started</button>
                                   </Link> :
                                   <Link to={'/auth/sign-in'}>
                                        <button className="bg-blue-500 text-white py-3 px-6 md:py-3 md:px-8 rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300 text-base md:text-lg font-semibold hover:bg-blue-600">Get Started</button>
                                   </Link>

                         }
                         <Link to={'/'}>
                              <button className="bg-gray-600 text-white py-3 px-6 md:py-3 md:px-8 rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300 text-base md:text-lg font-semibold">Learn More</button>
                         </Link>
                    </div>
               </div>
          </section>
     )
}

export default Hero