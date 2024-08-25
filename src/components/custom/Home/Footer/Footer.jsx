import React from 'react';
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer id="contact" className="py-12 bg-black text-center text-gray-400">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-sm mb-6">&copy; 2024 ResumedAI. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="https://twitter.com" className="hover:text-blue-500 transition"><FaTwitter /></a>
            <a href="https://facebook.com" className="hover:text-blue-500 transition"><FaFacebook /></a>
            <a href="https://linkedin.com" className="hover:text-blue-500 transition"><FaLinkedin /></a>
          </div>
        </div>
      </footer>
  )
}

export default Footer