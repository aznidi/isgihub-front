import React, { useState, createContext } from "react";
import { Search, LogIn, LogOut, ChevronFirst, ChevronLast, X } from "lucide-react";

const SidebarContext = createContext();

export default function NavbarRight() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [expanded, setExpanded] = useState(false); // Start collapsed
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => setLoggedIn(false);

  const clearSearch = () => setSearchQuery("");

  // Function to toggle collapse/expand when clicking the collapse button
  const toggleSidebar = () => setExpanded((prev) => !prev);

  // Function to ensure clicking profile or search only opens the sidebar if it's collapsed
  const openSidebar = () => {
    if (!expanded) {
      setExpanded(true);
    }
  };

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <aside className={`h-screen fixed right-0 top-0 z-20 transition-all duration-300 ${expanded ? 'w-64' : 'w-16'}`}>
        <nav className="h-full flex flex-col bg-white border-l shadow-lg">
          <div className="p-4 pb-2 flex justify-between items-center">
            <button
              onClick={toggleSidebar} // Collapse or expand using the collapse button
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronLast /> : <ChevronFirst />}
            </button>
          </div>

          {/* Border under the collapse button */}
          <div className="border-b border-gray-200" />

          {/* Search Section - Only opens sidebar if collapsed */}
          <div
            className="p-3 flex items-center justify-center hover:bg-[#A7F3D0] transition duration-200 ease-in-out cursor-pointer"
            onClick={openSidebar} // Open the sidebar if collapsed
          >
            {/* Always show the search icon in black, centered when collapsed */}
            <span className={`text-black ${expanded ? 'mr-3' : ''}`}>
              <Search size={20} />
            </span>

            {/* Only show input field if expanded */}
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

          {/* Profile Section - No border here */}
          <div
            className="flex items-center p-3 hover:bg-[#A7F3D0] transition duration-200 ease-in-out cursor-pointer"
            onClick={openSidebar} // Open the sidebar if collapsed
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

          {/* Login/Logout Section */}
          <SidebarItem
            icon={loggedIn ? <LogOut size={20} /> : <LogIn size={20} />}
            text={loggedIn ? "Logout" : "Login"}
            expanded={expanded}
            onClick={loggedIn ? handleLogout : handleLogin}
            hoverTextColor={loggedIn ? "text-red-600" : "text-gray-700"}
            centerIcon={!expanded}  // Center the icon when collapsed
          />
        </nav>
      </aside>
    </SidebarContext.Provider>
  );
}

function SidebarItem({ icon, text, expanded, onClick, hoverTextColor = "text-gray-700", centerIcon = false }) {
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