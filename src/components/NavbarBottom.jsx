import React, { useState, useEffect, useRef } from "react";
import { Home, Search, File, Bell, Settings } from 'lucide-react';

function NavbarBottom() {
  const Menus = [
    { name: "Search", icon: <Search /> },
    { name: "Files", icon: <File /> },
    { name: "Home", icon: <Home /> },
    { name: "Notifications", icon: <Bell /> },
    { name: "Settings", icon: <Settings /> },
  ];

  const [active, setActive] = useState(0); // Track active menu item
  const [circlePosition, setCirclePosition] = useState(0); // Position of the active circle
  const menuRefs = useRef([]); // Array of refs for each menu item

  useEffect(() => {
    // Calculate the position of the active circle based on the active menu item's ref
    const activeMenu = menuRefs.current[active];
    if (activeMenu) {
      setCirclePosition(activeMenu.offsetLeft + activeMenu.offsetWidth / 2 - 40); // Center the circle with adjusted size
    }
  }, [active]);

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 rounded-t-xl px-6 font-sans"
      style={{ boxShadow: "0 -8px 15px rgba(0, 0, 0, 0.1)" }} // Shadow at the top of the navbar
    >
      <ul className="flex relative justify-between p-4">
        {/* Circle that highlights the active icon */}
        <span
          className="bg-ofppt-bleu border-4 border-white h-20 w-20 absolute rounded-full flex items-center justify-center transition-all duration-500"
          style={{
            left: `${circlePosition}px`,
            top: "-2.5rem",  // Pull the circle slightly above to create the "curved into" effect
            zIndex: -1,  // Ensure the circle is behind the icons
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",  // Add shadow for better blending effect
          }}
        >
          {/* Increase icon size here */}
          <span className="text-white text-3xl">{Menus[active].icon}</span>
        </span>

        {Menus.map((menu, i) => (
          <li
            key={i}
            ref={el => (menuRefs.current[i] = el)}
            className={`w-16 ${i === 2 ? "ml-auto mr-auto" : ""}`} // Center Home in the middle
          >
            <a
              className={`flex flex-col items-center text-center pt-6 cursor-pointer transition-colors duration-500 ease-in-out ${
                i === active ? "text-ofppt-bleu" : "text-gray-600 hover:text-ofppt-bleu"
              }`}
              onClick={() => setActive(i)}
            >
              {/* Display the icon, hiding it when active since it's shown inside the circle */}
              <span className={`text-xl duration-500 ${i === active ? "opacity-0" : "opacity-100"}`}>
                {menu.icon}
              </span>
              {/* Display the label under each icon */}
              <span
                className={`mt-1 text-sm transition-transform ${
                  active === i ? "translate-y-4 opacity-100 text-ofppt-bleu" : "opacity-0 translate-y-10"
                } duration-700`}
                style={{
                  transform: i === active ? "translateY(-20px)" : "translateY(0)", // Increased upward movement
                  transition: "transform 0.3s ease-in-out", // Smooth transition
                }}
              >
                {menu.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavbarBottom;
