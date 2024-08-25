import React from 'react'

function Features() {
     return (
          <section id="features" className="py-20 bg-black">
               <div className="container mx-auto px-4 md:px-8 text-center">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl py-20 font-thin text-white">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                         <div className="p-6 md:p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                              <h4 className="text-xl md:text-2xl font-semibold mb-4 text-gray-100">AI-Powered Insights</h4>
                              <p className="text-gray-400">Our AI analyzes job market trends and customizes your resume to fit the latest requirements.</p>
                         </div>
                         <div className="bg-zinc-900 p-6 md:p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                              <h4 className="text-xl md:text-2xl font-semibold mb-4 text-gray-100">Professional Templates</h4>
                              <p className="text-gray-400">Choose from a selection of high-quality templates to give your resume a polished and professional look.</p>
                         </div>
                         <div className="p-6 md:p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                              <h4 className="text-xl md:text-2xl font-semibold mb-4 text-gray-100">Easy Customization</h4>
                              <p className="text-gray-400">Quickly adjust and personalize your resume to highlight your skills and experience effectively.</p>
                         </div>
                    </div>
               </div>
          </section>
     )
}

export default Features