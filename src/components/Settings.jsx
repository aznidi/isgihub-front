import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faLanguage, faFileAlt, faUsersSlash, faEdit } from '@fortawesome/free-solid-svg-icons';
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
            {/* Dark Mode Controller */}
            <div className="absolute top-4 right-4 flex items-center space-x-2">
                <FontAwesomeIcon
                    icon={darkMode ? faSun : faMoon}
                    className="text-2xl cursor-pointer transition duration-300"
                    onClick={handleThemeChange}
                />
                <label htmlFor="darkModeToggle" className="relative inline-block w-12 align-middle select-none">
                    <input
                        type="checkbox"
                        id="darkModeToggle"
                        checked={darkMode}
                        onChange={handleThemeChange}
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out"
                    />
                    <span className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></span>
                </label>
            </div>
            {/* Language Selection */}
            <motion.div
                className={`p-6 rounded-lg shadow-md flex items-center ${
                    darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <span className="text-xl font-medium">Langue</span>
                <div className="ml-auto flex items-center space-x-4 sm:hidden">
                    <FontAwesomeIcon icon={faLanguage} className="text-xl" />
                </div>
                <select
                    value={language}
                    onChange={handleLanguageChange}
                    className={`ml-auto p-2 bg-white border border-gray-300 rounded-lg focus:outline-none ${
                        darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                    }`}
                >
                    <option value="fr">Français</option>
                    <option value="en">Anglais</option>
                    <option value="ar">العربية</option>
                </select>
            </motion.div>

            {/* Saved Files */}
            <motion.div
                className={`p-6 rounded-lg shadow-md flex items-center ${
                    darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                }`}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <span className="text-xl font-medium">Fichiers Sauvegardés</span>
                <div className="ml-auto sm:hidden flex items-center space-x-4">
                    <FontAwesomeIcon icon={faFileAlt} className="text-xl" />
                </div>
                <button className="hidden sm:block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ml-auto">
                    Voir les Fichiers
                </button>
            </motion.div>

            {/* Blocked Friends */}
            <motion.div
                className={`p-6 rounded-lg shadow-md flex items-center ${
                    darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                }`}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <span className="text-xl font-medium">Amis Bloqués</span>
                <div className="ml-auto sm:hidden flex items-center space-x-4">
                    <FontAwesomeIcon icon={faUsersSlash} className="text-xl" />
                </div>
                <button className="hidden sm:block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ml-auto">
                    Gérer les Bloqués
                </button>
            </motion.div>

            {/* Change Information */}
            <motion.div
                className={`p-6 rounded-lg shadow-md flex items-center ${
                    darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                }`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <span className="text-xl font-medium">Modifier les Informations</span>
                <div className="ml-auto sm:hidden flex items-center space-x-4">
                    <FontAwesomeIcon icon={faEdit} className="text-xl" />
                </div>
                <button className="hidden sm:block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ml-auto">
                    Modifier
                </button>
            </motion.div>

            {/* Save and Reset Buttons */}
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