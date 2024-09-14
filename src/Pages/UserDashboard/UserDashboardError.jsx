import { doNormalLogOut } from '@/utils/AuthUtils';
import React from 'react';
import { useLocation } from 'react-router-dom';

const UserDashboardError = () => {

     return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
               <div className="bg-gray-900 p-10">
                    <h1 className="text-6xl font-thin mb-6 text-red-400">Access Denied</h1>
                    <p className="text-sm mb-6 font-thin text-gray-200 text-center">
                         We encountered an unexpected error while loading your dashboard. Please try again later or contact support if the issue persists.
                    </p>
                    <div className="flex space-x-4">
                         <button
                              onClick={() => doNormalLogOut()}
                              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-all duration-300"
                         >
                              Retry
                         </button>
                         <button
                              onClick={() => window.location.href = '/'}
                              className="px-6 text-white rounded-full font-medium transition-all duration-300"
                         >
                              Go to Home
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default UserDashboardError;
