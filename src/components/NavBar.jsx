import React, { useEffect, useState } from 'react';
import NavbarTop from './NavbarTop';
import NavbarBottom from './NavbarBottom';
import NavbarLeft from './NavbarLeft';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const isLoggedIn = true;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        <>
          <NavbarTop />
          <NavbarBottom />
        </>
      ) : (
        <>
          <NavbarLeft />
        </>
      )}
    </div>
  );
};

export default Navbar;
