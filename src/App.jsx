import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const scrollRef = useRef(null);


  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        scrollRef.current.classList.add('custom-scrollbar-scrolling');
        clearTimeout(scrollRef.current.scrollTimeout);
        scrollRef.current.scrollTimeout = setTimeout(() => {
          scrollRef.current.classList.remove('custom-scrollbar-scrolling');
        }, 500); // Hide scrollbar after 500ms of inactivity
      }
    };

    const element = scrollRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
      <div className="custom-scrollbar">
        <ToastContainer />
        <Outlet />
      </div>
  )
}

export default App
