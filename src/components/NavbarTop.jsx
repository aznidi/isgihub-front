
import React, { useState } from 'react';
import { Search, X, LogOut, LogIn, Users } from 'lucide-react';
import logos from '../assets/logos.png'; // Ensure this path is correct

function NavbarTop({ isLoggedIn, expanded }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const clearSearch = () => setSearchQuery('');
  const toggleProfileDropdown = () => setShowProfileDropdown((prev) => !prev);

  return (
    <div className="font-sans fixed top-0 w-full bg-white text-black flex items-center p-4 border-b shadow-lg z-30 justify-between">
      {/* Logo Section */}
      <div className="flex-shrink-0 flex items-center"> {/* Center logo vertically */}
        <img
          src={logos}
          className="transition-all w-24"  // Reduced logo width to w-24 (smaller)
          alt="Logo"
        />
      </div>

    

      {/* Profile Section */}
      <div className="relative flex-shrink-0 flex items-center"> {/* Center profile vertically */}
        <button onClick={toggleProfileDropdown} className="focus:outline-none">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"  // Smaller profile picture (w-10, h-10)
          />
        </button>

        {/* Dropdown Menu with Slower Transition Effect */}
        <div
          className={`absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-40 transition-all duration-500 ease-in-out transform ${showProfileDropdown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} 
          style={{ transformOrigin: 'top' }} // Ensures the dropdown appears to drop down
        >
          {showProfileDropdown && isLoggedIn && (
            <>
              {/* Profile Info */}
              <div className="p-3 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900">John Doe</h4>
                <span className="text-sm text-gray-600">johndoe@gmail.com</span>
              </div>

              {/* Friend Section */}
              <button
                onClick={() => console.log('Navigating to friends...')} // Replace with actual functionality
                className="w-full p-2 text-left hover:bg-gray-100 transition"
              >
                <Users size={20} className="inline mr-2" /> Friends
              </button>

              {/* Logout Button */}
              <button
                onClick={() => console.log('Logging out...')}  // Replace with actual logout functionality
                className="w-full p-2 text-left text-red-600 hover:bg-gray-100 transition"
              >
                <LogOut size={20} className="inline mr-2" /> Logout
              </button>
            </>
          )}

          {/* Login Button when not logged in */}
          {!isLoggedIn && (
            <button
              onClick={() => console.log('Logging in...')}  // Replace with actual login functionality
              className="w-full p-2 text-left hover:bg-gray-100 transition"
            >
              <LogIn size={20} className="inline mr-2" /> Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarTop;
