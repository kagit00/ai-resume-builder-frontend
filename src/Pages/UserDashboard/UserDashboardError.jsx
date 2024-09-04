import React from 'react';
import { useLocation } from 'react-router-dom';

const UserDashboardError = () => {
     
     return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
               <div className="bg-zinc-900 p-8 rounded-lg shadow-lg">
                    <h1 className="text-5xl font-thin mb-4 text-red-500">Something went wrong</h1>
                    <p className="text-sm mb-6 font-semibold text-zinc-500">
                         We encountered an unexpected error while loading your dashboard. Please try again later or contact support if the issue persists.
                    </p>
                    <div className="mt-4">
                         <button
                              onClick={() => window.location.reload()}
                              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full text-lg font-semibold transition duration-300"
                         >
                              Retry
                         </button>
                         <button
                              onClick={() => window.location.href = '/'}
                              className="ml-4 px-4 py-3 text-lg font-semibold transition duration-300"
                         >
                              Go to Home
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default UserDashboardError;
