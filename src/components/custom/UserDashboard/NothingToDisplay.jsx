const NothingToDisplay = ({ text }) => {
     return (
          <div className="flex flex-col items-center justify-center h-full  text-white p-8 mt-10 rounded-xl shadow-2xl">
               <div className="flex flex-col items-center">
                    <div className="p-4 bg-zinc-700 rounded-full shadow-lg animate-pulse">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-16 h-16 text-zinc-300">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5m7.5-4.5a9 9 0 11-12.727 0A9 9 0 0117.25 12z" />
                         </svg>
                    </div>
                    <h1 className="text-5xl font-thin mt-6">{text}</h1>
                    <p className="mt-4 text-zinc-400 text-medium">Create a new one today. It will appear here.</p>
               </div>
          </div>
     )
}

export default NothingToDisplay;

