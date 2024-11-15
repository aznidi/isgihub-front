import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar';

function Layout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`${isMobile ? 'flex flex-col h-screen' : 'flex'}`}>
      <header className={`${isMobile ? 'fixed w-full top-0' : 'fixed h-full w-20'}`}>
        <Navbar />
      </header>

      <main className={`${isMobile ? 'flex-grow pt-16 pb-16' : 'flex-grow ml-20 mr-20 p-5'}`}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
