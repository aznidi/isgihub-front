import React, { useState } from 'react';
import { Search as SearchIcon, Filter } from 'lucide-react';

function SearchBar({ query, setQuery, filter, setFilter }) {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false); // État du menu de filtre

  const toggleFilterMenu = () => setIsFilterMenuOpen(!isFilterMenuOpen); // Ouvrir/Fermer le menu

  return (
    <div className="w-full max-w-3xl mx-auto flex items-center bg-white p-4 rounded-lg shadow-md">
      {/* Icône de recherche */}
      <SearchIcon className="text-gray-500 mr-3" />
      
      {/* Champ de recherche */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher des stagiaires ou formateurs..."
        className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
      />
      
      {/* Bouton pour ouvrir le menu de filtre */}
      <div className="relative">
        <Filter
          className="text-gray-500 cursor-pointer hover:text-gray-700"
          onClick={toggleFilterMenu}
        />
        {/* Menu de filtre */}
        {isFilterMenuOpen && (
          <div className="absolute top-8 right-0 bg-white shadow-lg rounded-lg p-2">
            <button
              className={`block px-4 py-2 text-sm ${
                filter === 'all' ? 'text-blue-500 font-bold' : 'text-gray-700'
              }`}
              onClick={() => {
                setFilter('all');
                toggleFilterMenu();
              }}
            >
              Tous
            </button>
            <button
              className={`block px-4 py-2 text-sm ${
                filter === 'stagiaire' ? 'text-blue-500 font-bold' : 'text-gray-700'
              }`}
              onClick={() => {
                setFilter('stagiaire');
                toggleFilterMenu();
              }}
            >
              Stagiaires
            </button>
            <button
              className={`block px-4 py-2 text-sm ${
                filter === 'formateur' ? 'text-blue-500 font-bold' : 'text-gray-700'
              }`}
              onClick={() => {
                setFilter('formateur');
                toggleFilterMenu();
              }}
            >
              Formateurs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
