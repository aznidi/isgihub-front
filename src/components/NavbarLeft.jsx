import React, { useState, createContext, useContext } from 'react';
import { ChevronFirst, ChevronLast, Home, Search, File, Bell, Settings, LogOut, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation
import logos from '../assets/logos.png';

const SidebarContext = createContext();

export default function NavbarLeft() {
  const [expanded, setExpanded] = useState(false); // Gère l'extension de la barre latérale
  const [activeItem, setActiveItem] = useState('home'); // Par défaut, l'élément actif est 'home'
  const [showSearchBar, setShowSearchBar] = useState(false); // Contrôle la visibilité de la barre de recherche
  const [searchTerm, setSearchTerm] = useState(""); // État de l'entrée de recherche
  const [users] = useState([
    { username: "bahimall", info: "BAHIMALL" },
    { username: "kurulusosman", info: "Kuruluş Osman • Suivi(e)" },
    { username: "tarek_store1", info: "Tarek ⏩ store" },
    { username: "othmannl", info: "Othman Boulal" },
    { username: "i.s.g.i_elite", info: "ISGI-CASABLANCA" },
    { username: "two_brothers_store_", info: "TWO BROTHERS STORE" },
    { username: "7.toun.officiel", info: "7-TOUN • 1,3 m followers" },
    { username: "hespress", info: "Hespress" },
  ]);

  // Filtrer les utilisateurs en fonction du terme recherché
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gérer la déconnexion
  const handleLogout = () => {
    console.log("Logging out...");
    alert("Logged out!");
  };

  // Gérer le clic sur les éléments de la barre latérale
  const handleItemClick = (item) => {
    setActiveItem(item); // Définit l'élément cliqué comme actif
    setShowSearchBar(false); // Ferme la barre de recherche quand un autre élément est sélectionné
  };

  return (
    <SidebarContext.Provider value={{ expanded, activeItem, handleItemClick }}>
      <div className="flex h-screen">
        {/* Barre latérale */}
        <aside className="h-screen w-64 bg-white border-r shadow-sm">
          <nav className="h-full flex flex-col">
            <div className="p-4 pb-2 flex justify-between items-center">
              {/* Logo qui se développe/replie avec la barre latérale */}
              <img
                src={logos}
                className={`overflow-hidden transition-all ${expanded ? 'w-32' : 'w-0'}`}
                alt="Logo"
              />
              <button
                onClick={() => setExpanded(curr => !curr)}
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                {expanded ? <ChevronFirst /> : <ChevronLast />}
              </button>
            </div>

            {/* Séparateur */}
            <div className="border-b border-gray-200" />

            {/* Éléments de la barre latérale */}
            <ul className="px-3">
              <SidebarItem icon={<Home />} text="Accueil" item="home" onClick={handleItemClick} />
              <SidebarItem
                icon={<Search />}
                text="Recherche"
                item="search"
                onClick={() => { handleItemClick('search'); setShowSearchBar(true); }} // Afficher la barre de recherche
              />
              <SidebarItem icon={<File />} text="Fichiers" item="files" to="/files" onClick={handleItemClick} />
              <SidebarItem icon={<MessageSquare />} text="Messages" item="messages" onClick={handleItemClick} />
              <SidebarItem icon={<Bell />} text="Notifications" item="notifications" onClick={handleItemClick} />
              <SidebarItem icon={<Settings />} text="Paramètres" item="settings" onClick={handleItemClick} />
              
            </ul>
          </nav>
        </aside>

        {/* Section de la barre de recherche à droite */}
        {showSearchBar && (
          <div className="flex-1 bg-gray-100 p-4">
            <div className="bg-white w-full max-w-3xl p-4 rounded-lg shadow-md mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recherche</h2>
                <button
                  onClick={() => setShowSearchBar(false)} // Masquer la barre de recherche
                  className="text-gray-500 hover:text-gray-800"
                >
                  ✖
                </button>
              </div>
              <input
                type="text"
                placeholder="Rechercher par username..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex flex-wrap gap-2">
                {filteredUsers.map((user, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm"
                  >
                    {user.username}
                  </div>
                ))}
                {filteredUsers.length === 0 && (
                  <p className="text-gray-500 text-sm">Aucun utilisateur trouvé.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contenu principal */}
        <main className="flex-1 p-8">
          {/* Afficher le contenu en fonction de l'élément actif */}
          {activeItem === 'home' && <h1 className="text-2xl font-bold">Page d'accueil</h1>}
          {activeItem === 'files' && <h1 className="text-2xl font-bold">Fichiers</h1>}
          {activeItem === 'messages' && <h1 className="text-2xl font-bold">Messages</h1>}
          {activeItem === 'notifications' && <h1 className="text-2xl font-bold">Notifications</h1>}
          {activeItem === 'settings' && <h1 className="text-2xl font-bold">Paramètres</h1>}
          {activeItem === 'search' && <h1 className="text-2xl font-bold">Résultats de la recherche</h1>}
        </main>
      </div>
    </SidebarContext.Provider>
  );
}

// Composant SidebarItem
export function SidebarItem({ icon, text, item, onClick, expanded }) {
  const { expanded: ctxExpanded } = useContext(SidebarContext);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Réinitialiser l'état actif après un délai pour un effet de disparition en douceur
    setTimeout(() => {
      setIsClicked(false);
    }, 850); // Ajustez cette durée pour un effet de fade-out plus long
    if (onClick) onClick(item); // Appeler la fonction onClick avec l'élément comme argument
  };

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors duration-[2000ms] ease-in-out ${
        isClicked
          ? 'bg-indigo-200 text-indigo-800'
          : 'bg-transparent hover:bg-indigo-200 text-gray-600'
      }`}
      onClick={handleClick}
    >
      <Link to="#" className="flex items-center w-full">
        <span className={`mr-2 transition-transform duration-500 ${isClicked ? 'transform translate-y-1 animate-jiggle' : ''}`}>
          {icon}
        </span>
        <span className={`overflow-hidden transition-all duration-300 ${ctxExpanded ? 'w-52 ml-3' : 'w-0'}`}>
          {text}
        </span>
      </Link>
    </li>
  );
}
