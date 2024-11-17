import React, { createContext, useContext, useState, useEffect } from 'react';

// Créez le contexte Dark Mode
const DarkModeContext = createContext();

// Le provider qui permet de gérer le Dark Mode à l'échelle de l'application
export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    // Charger l'état du Dark Mode depuis localStorage au chargement de la page
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
            setDarkMode(true);
        }
    }, []);

    // Mettre à jour localStorage lorsque le Dark Mode change
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

// Hook pour utiliser le contexte Dark Mode dans n'importe quel composant
export const useDarkMode = () => useContext(DarkModeContext);
