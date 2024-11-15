
import React, { useState, createContext, useContext } from 'react';
import { ChevronFirst, ChevronLast, Home, Search, File, Bell, Settings, MoreVertical } from 'lucide-react';

const SidebarContext = createContext();

export default function NavbarLeft() {
  const [expanded, setExpanded] = useState(true);

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <aside className="h-screen fixed left-0 top-0 z-20">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src="https://img.logoipsum.com/243.svg"
              className={`overflow-hidden transition-all ${expanded ? 'w-32' : 'w-0'}`}
              alt="Logo"
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          {/* Sidebar Items */}
          <ul className="flex-1 px-3">
            <SidebarItem icon={<Home />} text="Home" />
            <SidebarItem icon={<Search />} text="Search" />
            <SidebarItem icon={<File />} text="Files" />
            <SidebarItem icon={<Bell />} text="Notifications" />
            <SidebarItem icon={<Settings />} text="Settings" />
          </ul>

          
        </nav>
      </aside>
    </SidebarContext.Provider>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
          : 'hover:bg-indigo-50 text-gray-600'
      }`}
    >
      <span className="mr-2">{icon}</span>
      <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}>
        {text}
      </span>
      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`} />
      )}

      {/* Tooltip on hover */}
      {!expanded && (
        <div
          className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
        >
          {text}
        </div>
      )}
    </li>
  );
}

