import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Contexte pour l'authentification
import { TailSpin } from "react-loader-spinner"; // Spinner pour le chargement

const PrivateRoute = () => {
  const { currentUser, loading } = useAuth() || {}; // Protection contre undefined

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="80" width="80" color="#6B21A8" ariaLabel="loading" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
