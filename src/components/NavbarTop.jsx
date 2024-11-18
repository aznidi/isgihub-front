import React, { useState, useEffect, useRef } from 'react';
import { LogOut, LogIn, Users } from 'lucide-react';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation
import logos from '../assets/logos.png';
import { useAuth } from '../context/AuthContext';

function NavbarTop({ isLoggedIn }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef(null); // Référence pour le menu déroulant du profil
  const { logout, currentUser } = useAuth();

  const toggleProfileDropdown = () => setShowProfileDropdown((prev) => !prev);

  // Fermer le menu déroulant lorsqu'on clique en dehors de celui-ci
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  return (
    <div className="font-sans fixed top-0 w-full bg-white text-black flex items-center p-4 border-b shadow-lg z-30 justify-between">
      {/* Logo Section */}
      <div className="flex-shrink-0 flex items-center">
        <img
          src={logos}
          className="transition-all w-24" 
          alt="Logo"
        />
      </div>

      {/* Profile Section */}
      <div className="relative flex-shrink-0 flex items-center" ref={profileRef}>
        <button onClick={toggleProfileDropdown} className="focus:outline-none">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-40 transition-all duration-500 ease-in-out transform ${
            showProfileDropdown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
          style={{ transformOrigin: 'top' }}
        >
          {currentUser ? (
            <>
              {/* Profile Info - Wrap with Link to profile page */}
              <Link to="/profile" className="block p-3 border-b border-gray-200 hover:bg-gray-100 transition">
                <h4 className="font-semibold text-gray-900">John Doe</h4>
                <span className="text-sm text-gray-600">johndoe@gmail.com</span>
              </Link>

              {/* Friend Section */}
              <Link
                to="/friends"
                className="w-full p-2 text-left hover:bg-gray-100 transition flex items-center"
              >
                <Users size={20} className="inline mr-2" /> Friends
              </Link>

              {/* Logout Button */}
              <Link
                onClick={logout}
                className="w-full p-2 text-left text-red-600 hover:bg-gray-100 transition flex items-center"
              >
                <LogOut size={20} className="inline mr-2" /> Logout
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="w-full p-2 text-left hover:bg-gray-100 transition flex items-center"
            >
              <LogIn size={20} className="inline mr-2" /> Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarTop;
