import React, { useState } from 'react';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

function SearchBar({ query, setQuery, filter, setFilter }) {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const toggleFilterMenu = () => setIsFilterMenuOpen(!isFilterMenuOpen);

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto flex items-center bg-white p-4 rounded-lg shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
        {isFilterMenuOpen && (
          <motion.div
            className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-3 w-40 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {['all', 'stagiaire', 'formateur'].map((type) => (
              <button
                key={type}
                className={`block w-full px-4 py-2 text-sm text-left rounded-md ${
                  filter === type ? 'bg-blue-100 text-blue-600 font-bold' : 'text-gray-700'
                } hover:bg-blue-50`}
                onClick={() => {
                  setFilter(type);
                  toggleFilterMenu();
                }}
              >
                {type === 'all' ? 'Tous' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default SearchBar;
