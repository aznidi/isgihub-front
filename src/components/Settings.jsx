import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
  faLanguage,
  faFileAlt,
  faUsersSlash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Settings = () => {
  const [language, setLanguage] = useState('fr');
  const [darkMode, setDarkMode] = useState(false);

  const handleLanguageChange = (event) => setLanguage(event.target.value);
  const handleThemeChange = () => setDarkMode(!darkMode);
  const resetSettings = () => {
    setLanguage('fr');
    setDarkMode(false);
    alert('Paramètres réinitialisés !');
  };

  return (
    <div
      className={`max-w-3xl mx-auto p-8 space-y-8 rounded-lg relative transition-all duration-500 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Mode clair/sombre */}
      <div className="absolute top-4 right-4 flex items-center space-x-3">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="cursor-pointer"
          onClick={handleThemeChange}
        >
          <FontAwesomeIcon
            icon={darkMode ? faSun : faMoon}
            className="text-2xl transition duration-300"
          />
        </motion.div>
      </div>

      {/* Sélection de la langue */}
      <motion.div
        className={`p-6 rounded-lg shadow-md flex items-center ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FontAwesomeIcon icon={faLanguage} className="text-xl mr-3" />
        <span className="text-xl font-medium">Langue</span>
        <select
          value={language}
          onChange={handleLanguageChange}
          className={`ml-auto p-2 rounded-lg border ${
            darkMode
              ? 'bg-gray-700 text-white border-gray-600'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        >
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
          <option value="ar">العربية</option>
        </select>
      </motion.div>

      {/* Fichiers sauvegardés */}
      <motion.div
        className={`p-6 rounded-lg shadow-md flex items-center ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
        }`}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FontAwesomeIcon icon={faFileAlt} className="text-xl mr-3" />
        <span className="text-xl font-medium">Fichiers Sauvegardés</span>
        <button
          className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => alert('Ouverture des fichiers...')}
        >
          Voir les Fichiers
        </button>
      </motion.div>

      {/* Amis bloqués */}
      <motion.div
        className={`p-6 rounded-lg shadow-md flex items-center ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
        }`}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FontAwesomeIcon icon={faUsersSlash} className="text-xl mr-3" />
        <span className="text-xl font-medium">Amis Bloqués</span>
        <button
          className="ml-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
          onClick={() => alert('Gestion des amis bloqués...')}
        >
          Gérer
        </button>
      </motion.div>

      {/* Modifier les informations */}
      <motion.div
        className={`p-6 rounded-lg shadow-md flex items-center ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
        }`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FontAwesomeIcon icon={faEdit} className="text-xl mr-3" />
        <span className="text-xl font-medium">Modifier les Informations</span>
        <button
          className="ml-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
          onClick={() => alert('Modification des informations...')}
        >
          Modifier
        </button>
      </motion.div>

      {/* Boutons Sauvegarder et Réinitialiser */}
      <div className="space-y-4 sm:flex sm:justify-between sm:space-y-0">
        <motion.button
          className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => alert('Paramètres sauvegardés !')}
          whileHover={{ scale: 1.1 }}
        >
          Sauvegarder
        </motion.button>
        <motion.button
          className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
          onClick={resetSettings}
          whileHover={{ scale: 1.1 }}
        >
          Réinitialiser
        </motion.button>
      </div>
    </div>
  );
};

export default Settings;
