import React, { useState } from "react";
import photo from "../assets/photo.jpg"
const FriendCard = ({ id, name, profileImage=photo, mutualFriends, onClose }) => (
  <div className="flex items-center bg-white shadow-md rounded-lg p-3 mb-2 w-full h-20 relative lg:w-full">
    {/* Image de profil */}
    <img
      src={profileImage}
      alt={name}
      className="w-12 h-12 rounded-full object-cover"
    />
    {/* Informations */}
    <div className="ml-3 flex-1">
      <h4 className="text-sm font-bold truncate">{name}</h4>
      <p className="text-xs text-gray-500 truncate">
        {mutualFriends} amis en commun
      </p>
    </div>
    {/* Bouton "Ajouter" */}
    <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition">
      Ajouter
    </button>
    {/* Bouton "Fermer" */}
    <button
      onClick={() => onClose(id)}
      className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
    >
      ✕
    </button>
  </div>
);

const FriendSuggestions = ({ suggestions }) => {
  const [visibleSuggestions, setVisibleSuggestions] = useState(4); // Affiche 4 amis par défaut
  const [friends, setFriends] = useState(suggestions); // État pour stocker les amis visibles

  // Fonction pour afficher plus d'amis
  const showMoreFriends = () => {
    setVisibleSuggestions((prev) => prev + 4); // Ajouter 4 amis supplémentaires
  };

  // Fonction pour supprimer un ami des suggestions
  const removeFriend = (id) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== id));
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      {/* Titre */}
      <h3 className="text-lg font-bold mb-4">Vous connaissez peut-être...</h3>

      {/* Mobile: Carrousel horizontal */}
      <div
        className="block lg:hidden flex flex-row gap-4 overflow-x-auto scrollbar-hide overscroll-contain"
      >
        {friends.slice(0, visibleSuggestions).map((friend) => (
          <div key={friend.id} className="flex-shrink-0">
            <FriendCard
              id={friend.id}
              name={friend.name}
              profileImage={photo}
              mutualFriends={friend.mutualFriends}
              onClose={removeFriend}
            />
          </div>
        ))}
      </div>

      {/* Desktop: Grille avec une carte par ligne */}
      <div className="hidden lg:block">
        {friends.slice(0, visibleSuggestions).map((friend) => (
          <FriendCard
            key={friend.id}
            id={friend.id}
            name={friend.name}
            profileImage={photo}
            mutualFriends={friend.mutualFriends}
            onClose={removeFriend}
          />
        ))}
      </div>

      {/* Bouton "Voir plus" */}
      {visibleSuggestions < friends.length && (
        <div className="mt-4 text-center">
          <button
            onClick={showMoreFriends}
            className="text-blue-500 hover:underline text-sm"
          >
            Voir plus
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendSuggestions;
