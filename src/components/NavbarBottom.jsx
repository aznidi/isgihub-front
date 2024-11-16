import React, { useState, useEffect, useRef } from "react";
import { Home, File, Bell, Settings, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to get the current path

function NavbarBottom() {
  const Menus = [
    { name: "Files", icon: <File />, link: "/files" },
    { name: "Messages", icon: <MessageSquare />, link: "/inbox" },
    { name: "Home", icon: <Home />, link: "/" },
    { name: "Notifications", icon: <Bell />, link: "/notifications" },
    { name: "Settings", icon: <Settings />, link: "/settings" },
  ];

  const location = useLocation(); // Get the current location/path
  const [active, setActive] = useState(0); // Default "Home" is active
  const [circlePosition, setCirclePosition] = useState(0); // Position of the active circle
  const menuRefs = useRef([]); // Array of refs for each menu item

  useEffect(() => {
    // Set the active menu based on the current location
    const activeIndex = Menus.findIndex(menu => menu.link === location.pathname);
    setActive(activeIndex >= 0 ? activeIndex : 0); // Default to Home if no match found

    // Calculate the circle position based on the active menu
    const activeMenu = menuRefs.current[activeIndex >= 0 ? activeIndex : 0];
    if (activeMenu) {
      setCirclePosition(activeMenu.offsetLeft + activeMenu.offsetWidth / 2 - 40); // Center the circle
    }
  }, [location.pathname]);

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 rounded-t-xl px-6 font-sans"
      style={{ boxShadow: "0 -8px 15px rgba(0, 0, 0, 0.1)" }}
    >
      <ul className="flex relative justify-between p-4">
        {/* Circle highlighting the active icon */}
        <span
          className="bg-blue-600 border-4 border-white h-20 w-20 absolute rounded-full flex items-center justify-center transition-all duration-500"
          style={{
            left: `${circlePosition}px`,
            top: "-2.5rem",  // Pull the circle slightly above to create the "curved into" effect
            zIndex: -1,  // Ensure the circle is behind the icons
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",  // Add shadow for blending effect
          }}
        >
          <span className="text-white text-3xl">{Menus[active].icon}</span>
        </span>

        {Menus.map((menu, i) => (
          <li
            key={i}
            ref={el => (menuRefs.current[i] = el)}
            className={`w-16 ${i === 2 ? "ml-auto mr-auto" : ""}`} // Center Home in the middle
          >
            <Link
              to={menu.link} // Add navigation link
              className={`flex flex-col items-center text-center pt-6 cursor-pointer transition-colors duration-500 ease-in-out ${
                i === active ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {/* Hide the icon when active as it's shown inside the circle */}
              <span className={`text-xl duration-500 ${i === active ? "opacity-0" : "opacity-100"}`}>
                {menu.icon}
              </span>
              {/* Display the label under each icon */}
              <span
                className={`mt-1 text-sm transition-transform ${
                  active === i ? "translate-y-4 opacity-100 text-blue-600" : "opacity-0 translate-y-10"
                } duration-700`}
                style={{
                  transform: i === active ? "translateY(-20px)" : "translateY(0)", // Increased upward movement
                  transition: "transform 0.3s ease-in-out", // Smooth transition
                }}
              >
                {menu.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavbarBottom;
