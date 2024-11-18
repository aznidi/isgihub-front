import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase-config"; // Import du service Auth
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase-config"; // Import de la base de données Realtime
import { TailSpin } from "react-loader-spinner";

const AuthContext = createContext(); // Création du contexte Auth

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Stocker l'utilisateur connecté
  const [userData, setUserData] = useState(null); // Stocker les données utilisateur
  const [loading, setLoading] = useState(true); // Gérer l'état de chargement
  const [error, setError] = useState(null); // Stocker les erreurs

  useEffect(() => {
    // Écouteur pour suivre l'état d'authentification
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true); // Activer l'état de chargement
      setError(null); // Réinitialiser les erreurs

      if (user) {
        setCurrentUser(user); // Définir l'utilisateur connecté

        // Récupérer les données utilisateur depuis Realtime Database
        const userRef = ref(database, `users/${user.uid}`);
        onValue(
          userRef,
          (snapshot) => {
            const data = snapshot.val();

            if (data) {
              setUserData(data); // Stocker les données utilisateur
            } else {
              console.warn("Aucune donnée utilisateur trouvée dans Realtime Database.");
            }

            setLoading(false); // Désactiver l'état de chargement après récupération des données
          },
          (error) => {
            setLoading(true); // Désactiver l'état de chargement même en cas d'erreur
          }
        );
      } else {
        setCurrentUser(null); // Aucun utilisateur connecté
        setUserData(null); // Réinitialiser les données utilisateur
        setLoading(false); // Désactiver l'état de chargement
        
      }
    });

    // Cleanup de l'écouteur onAuthStateChanged lors du démontage du composant
    return () => unsubscribe();
  }, []); // Ajouter navigate en dépendance pour rediriger correctement

  // Fonction de déconnexion
  const logout = async () => {
    try {
      await signOut(auth); // Déconnexion de Firebase
      setCurrentUser(null); // Réinitialiser l'état de l'utilisateur
      setUserData(null); // Réinitialiser les données utilisateur
      setLoading(true)
      window.location.href = '/login'
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error.message);
    }
  };

  // Si l'application charge encore l'état d'authentification ou les données utilisateur
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="80" width="80" color="#6B21A8" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, userData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte Auth
export const useAuth = () => {
  return useContext(AuthContext);
};
