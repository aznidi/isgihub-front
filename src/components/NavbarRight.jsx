import React, { useState, createContext } from 'react';
import { Search, LogIn, LogOut, ChevronFirst, ChevronLast, X } from 'lucide-react';

const SidebarContext = createContext();

export default function NavbarRight({ isLoggedIn }) {
  const [expanded, setExpanded] = useState(false); // Start collapsed
  const [searchQuery, setSearchQuery] = useState('');

  const clearSearch = () => setSearchQuery('');

  // Function to toggle collapse/expand when clicking the collapse button
  const toggleSidebar = () => setExpanded((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <aside className={`h-screen fixed right-0 top-0 z-20 transition-all duration-300 ${expanded ? 'w-64' : 'w-16'}`}>
        <nav className="h-full flex flex-col bg-white border-l shadow-lg">
          <div className="p-4 pb-2 flex justify-between items-center">
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronLast /> : <ChevronFirst />}
            </button>
          </div>

          {/* Border under the collapse button */}
          <div className="border-b border-gray-200" />

          {isLoggedIn ? (
            <>
              {/* Profile Section */}
              <div
                className="flex items-center p-3 hover:bg-[#A7F3D0] transition duration-200 ease-in-out cursor-pointer"
                onClick={() => setExpanded(true)} // Ensure sidebar opens if collapsed
              >
                <img
                  src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                {expanded && (
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">John Doe</h4>
                    <span className="text-sm text-gray-600">johndoe@gmail.com</span>
                  </div>
                )}
              </div>

              {/* Search Section */}
              <div
                className="p-3 flex items-center justify-center hover:bg-[#A7F3D0] transition duration-200 ease-in-out cursor-pointer"
                onClick={() => setExpanded(true)} // Open the sidebar if collapsed
              >
                <span className={`text-black ${expanded ? 'mr-3' : ''}`}>
                  <Search size={20} />
                </span>
                {expanded && (
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Type something..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full p-2 pl-10 pr-10 rounded-full border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A7F3D0]"
                    />
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Logout Section */}
              <SidebarItem
                icon={<LogOut size={20} />}
                text="Logout"
                expanded={expanded}
                onClick={() => console.log('Logging out...')} // Replace with actual logout functionality
                hoverTextColor="text-red-600"
                centerIcon={!expanded}
              />
            </>
          ) : (
            // Show login button when not logged in
            <SidebarItem
              icon={<LogIn size={20} />}
              text="Login"
              expanded={expanded}
              onClick={() => console.log('Logging in...')} // Replace with actual login functionality
              hoverTextColor="text-gray-700"
              centerIcon={!expanded}
            />
          )}
        </nav>
      </aside>
    </SidebarContext.Provider>
  );
}

function SidebarItem({ icon, text, expanded, onClick, hoverTextColor = 'text-gray-700', centerIcon = false }) {
  return (
    <div
      className={`w-full flex items-center p-3 hover:bg-[#A7F3D0] transition duration-200 ease-in-out cursor-pointer ${hoverTextColor} ${centerIcon ? 'justify-center' : ''}`}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {expanded && <span className="flex-1">{text}</span>}
    </div>
  );
}

