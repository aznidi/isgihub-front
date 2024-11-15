import React, { useEffect, useState } from 'react';
import NavbarTop from './NavbarTop';
import NavbarBottom from './NavbarBottom';
import NavbarLeft from './NavbarLeft';
import NavbarRight from './NavbarRight';

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
          <NavbarRight />
        </>
      )}
    </div>
  );
};

export default Navbar;
