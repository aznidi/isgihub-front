// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-2xl font-semibold mt-4 mb-6">Page non trouvée</p>
        <p className="text-gray-500 mb-8">
          La page que vous recherchez n'existe pas. Elle a peut-être été déplacée ou supprimée.
        </p>
        <Link to="/" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
