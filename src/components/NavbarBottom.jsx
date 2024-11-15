import React, { useEffect, useRef, useState } from "react";
import { Home, File, Bell, Settings, MessageSquare } from 'lucide-react'; // Supprimer Search
import { Link, useLocation } from 'react-router-dom'; // Importer useLocation pour obtenir le chemin actuel

function NavbarBottom() {
  const Menus = [
    { name: "Home", icon: <Home />, link: "/" },
    { name: "Files", icon: <File />, link: "/files" },
    { name: "Messages", icon: <MessageSquare />, link: "/inbox" },
    { name: "Notifications", icon: <Bell />, link: "/notifications" },
    { name: "Settings", icon: <Settings />, link: "/settings" },
  ];

  const location = useLocation(); // Obtenir le chemin actuel
  const [active, setActive] = useState(0); // Par défaut, l'icône "Home" est active
  const [circlePosition, setCirclePosition] = useState(0); // Position du cercle actif
  const menuRefs = useRef([]); // Tableau de refs pour chaque élément de menu

  useEffect(() => {
    // Mettre à jour l'index actif en fonction du chemin actuel
    const activeIndex = Menus.findIndex(menu => menu.link === location.pathname);
    setActive(activeIndex >= 0 ? activeIndex : 0); // Définit Home comme actif par défaut si le chemin ne correspond à aucun menu

    // Calculer la position du cercle actif basé sur l'élément actif
    const activeMenu = menuRefs.current[activeIndex >= 0 ? activeIndex : 0];
    if (activeMenu) {
      setCirclePosition(activeMenu.offsetLeft + activeMenu.offsetWidth / 2 - 40); // Centrer le cercle avec la taille ajustée
    }
  }, [location, Menus]);

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 rounded-t-xl px-6 font-sans"
      style={{ boxShadow: "0 -8px 15px rgba(0, 0, 0, 0.1)" }} // Ombre en haut de la navbar
    >
      <ul className="flex relative justify-between p-4">
        {/* Cercle qui met en évidence l'icône active */}
        <span
          className="bg-ofppt-bleu border-4 border-white h-20 w-20 absolute rounded-full flex items-center justify-center transition-all duration-500"
          style={{
            left: `${circlePosition}px`,
            top: "-2.5rem",  // Tirer légèrement le cercle vers le haut pour créer l'effet "encastré"
            zIndex: -1,  // Assurer que le cercle est derrière les icônes
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",  // Ajouter une ombre pour un meilleur effet de fusion
          }}
        >
          {/* Agrandir l'icône ici */}
          <span className="text-white text-3xl">{Menus[active].icon}</span>
        </span>

        {Menus.map((menu, i) => (
          <li
            key={i}
            ref={el => (menuRefs.current[i] = el)}
            className={`w-16 ${i === 2 ? "ml-auto mr-auto" : ""}`} // Centrer Home au milieu
          >
            <Link
              to={menu.link} // Ajouter le lien de navigation
              className={`flex flex-col items-center text-center pt-6 cursor-pointer transition-colors duration-500 ease-in-out ${
                i === active ? "text-ofppt-bleu" : "text-gray-600 hover:text-ofppt-bleu"
              }`}
            >
              {/* Afficher l'icône, en la masquant lorsqu'elle est active car elle est affichée à l'intérieur du cercle */}
              <span className={`text-xl duration-500 ${i === active ? "opacity-0" : "opacity-100"}`}>
                {menu.icon}
              </span>
              {/* Afficher le label sous chaque icône */}
              <span
                className={`mt-1 text-sm transition-transform ${
                  active === i ? "translate-y-4 opacity-100 text-ofppt-bleu" : "opacity-0 translate-y-10"
                } duration-700`}
                style={{
                  transform: i === active ? "translateY(-20px)" : "translateY(0)", // Mouvement vers le haut accru
                  transition: "transform 0.3s ease-in-out", // Transition fluide
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
