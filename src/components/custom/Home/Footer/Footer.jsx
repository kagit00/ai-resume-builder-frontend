import React from 'react';

function Footer() {
  return (
   <footer className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">© {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
            <nav className="flex gap-8">
              <a className="text-sm text-gray-400 hover:text-blue-400 transition-colors" href="#">
                Terms of Service
              </a>
              <a className="text-sm text-gray-400 hover:text-blue-400 transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="text-sm text-gray-400 hover:text-blue-400 transition-colors" href="#">
                Contact Us
              </a>
            </nav>
          </div>
        </div>
      </footer>
  )
}

export default Footer