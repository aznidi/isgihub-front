import React, { useEffect, useState } from 'react';
import NavbarTop from './NavbarTop';
import NavbarBottom from './NavbarBottom';
import NavbarLeft from './NavbarLeft';
import NavbarRight from './NavbarRight';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track the logged-in state

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // You can create a function to toggle the logged-in state for testing
  const toggleLogin = () => setIsLoggedIn((prev) => !prev);

  return (
    <div>
      {/* Button to toggle login state for testing purposes */}
      <button onClick={toggleLogin} className="fixed top-4 left-4 bg-blue-500 text-white p-2 rounded">
        {isLoggedIn ? 'Log Out' : 'Log In'}
      </button>

      {isMobile ? (
        <>
          <NavbarTop />
          <NavbarBottom />
        </>
      ) : (
        <>
          <NavbarLeft />
          {/* Pass the `isLoggedIn` state to `NavbarRight` */}
          <NavbarRight isLoggedIn={isLoggedIn} />
        </>
      )}
    </div>
  );
};

export default Navbar;
;
