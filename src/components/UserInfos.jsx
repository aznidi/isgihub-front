import React from "react";
import { useAuth } from "../context/AuthContext"; // Importer le hook personnalisé pour accéder au contexte
import { TailSpin } from "react-loader-spinner";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserInfos = () => {
  // Accéder aux données depuis le contexte
  const { currentUser, userData } = useAuth();

  // Si l'utilisateur n'est pas connecté ou si les données sont en cours de chargement
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 font-semibold">Vous devez être connecté pour voir cette page.</p>
      </div>
    );
  }

  // Affichage si les données sont en train de se charger
  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="50" width="50" color="#6B21A8" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">Bienvenue, {userData.name}</h2>
      <p><strong>Email :</strong> {userData.email}</p>
      <ToastContainer />
    </motion.div>
  );
};

export default UserInfos;
