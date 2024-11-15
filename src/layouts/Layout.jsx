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
    <div className={`${isMobile ? 'flex flex-col h-screen' : 'flex h-screen'}`}>
      {/* Barre de navigation */}
      <header className={`${isMobile ? 'fixed w-full top-0 z-10' : 'fixed h-full w-20 z-10'}`}>
        <Navbar />
      </header>

      {/* Contenu principal avec marge et padding */}
      <main className={`flex-grow ${isMobile ? 'pt-20 pb-20 px-4' : 'ml-20 p-8'} bg-white relative`}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
