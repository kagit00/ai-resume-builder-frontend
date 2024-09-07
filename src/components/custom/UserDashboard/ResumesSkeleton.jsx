const ResumeSkeleton = () => {
     return (
          <section id="pending-resumes" className="relative flex-1 flex flex-col py-20 px-10">
               <div className="flex flex-col items-center mb-4">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl mb-10 font-extralight leading-tight text-gray-500 animate-pulse">
                         Pending Resumes
                    </h2>
               </div>

               <div className="flex space-x-4 overflow-x-auto hidden-scrollbar p-4 mt-10">
                    {/* Skeleton Loader for Cards */}
                    <div className="relative min-w-[250px] bg-gradient-to-l from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg animate-pulse mb-6 mr-6">
                         {/* Action Icons Placeholder */}
                         <div className="absolute top-4 right-4 flex items-center space-x-4">
                              <div className="w-6 h-6 p-1 rounded-full bg-gray-600 animate-pulse"></div>
                              <div className="w-6 h-6 p-1 rounded-full bg-gray-600 animate-pulse"></div>
                         </div>

                         {/* Card Content Placeholder */}
                         <div className="flex flex-col justify-between h-full pt-8">
                              <div className="mb-4">
                                   <div className="w-1/2 h-6 bg-gray-600 rounded-full animate-pulse mb-2"></div>
                                   <div className="w-full h-4 bg-gray-600 rounded-full animate-pulse"></div>
                              </div>

                              <div className="flex items-center mt-4">
                                   <div className="w-1/3 h-4 bg-gray-600 rounded-full animate-pulse"></div>
                              </div>
                         </div>
                    </div>

               </div>
          </section>
     )
}

export default ResumeSkeleton
