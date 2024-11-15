import React from 'react';
import { ThumbsUp, MessageSquare, Reply } from 'lucide-react'; // Icônes de lucide-react
import photo from "../assets/photo.jpg";
function Post() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
      {/* En-tête du poste */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div>
          <h2 className="text-gray-800 font-semibold">AZNIDI Salah</h2>
          <p className="text-gray-500 text-sm">Stagiaire dans ISGI</p>
          <p className="text-gray-500 text-xs">Il y a 1 heure</p>
        </div>
      </div>

      {/* Contenu du poste */}
      <p className="text-gray-700 mb-4">J'ai pas compris ce Code</p>

      {/* Affichage de l'photo si elle est disponible */}
      {photo && (
        <div className="mb-4">
          <img src={photo} alt="Post" className="w-full h-auto rounded-lg" />
        </div>
      )}

      {/* Zone des boutons avec icônes */}
      <div className="flex justify-between border-t border-gray-200 pt-2">
        <button className="flex-1 text-center text-gray-600 hover:bg-gray-100 py-2 flex items-center justify-center">
          <ThumbsUp className="mr-2" />
          J'aime
        </button>
        <button className="flex-1 text-center text-gray-600 hover:bg-gray-100 py-2 flex items-center justify-center">
          <MessageSquare className="mr-2" />
          Comment
        </button>
        <button className="flex-1 text-center text-gray-600 hover:bg-gray-100 py-2 flex items-center justify-center">
          <Reply className="mr-2" />
          Répondre
        </button>
      </div>
    </div>
  );
}

export default Post;
