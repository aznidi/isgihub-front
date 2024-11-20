import React from "react";
import { Heart, MessageCircle, Share2, PlusCircle } from "lucide-react";

const Notification = ({ userPhoto, username, notificationType, postPhoto }) => {
  const notificationDetails = {
    like: { text: "a aimé une vidéo", emoji: <Heart className="text-red-500" />, bg: "bg-red-100" },
    comment: { text: "a commenté une vidéo", emoji: <MessageCircle className="text-blue-500" />, bg: "bg-blue-100" },
    share: { text: "a partagé une vidéo", emoji: <Share2 className="text-green-500" />, bg: "bg-green-100" },
    followRequest: { text: "a envoyé une demande de suivi", emoji: <PlusCircle className="text-yellow-500" />, bg: "bg-yellow-100" },
  };

  const { text: notificationText, emoji, bg } = notificationDetails[notificationType] || {};

  return (
    <div
      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 cursor-pointer"
    >
      {/* Conteneur photo utilisateur et icône */}
      <div className="relative flex items-center">
        <div className="relative w-14 h-14">
          <img
            src={userPhoto}
            alt="User"
            className="w-full h-full rounded-full object-cover border border-gray-300"
          />
          {/* Icône avec fond à côté de la photo */}
          <div
            className={`absolute -top-1 -right-2 w-6 h-6 flex items-center justify-center rounded-full ${bg}`}
          >
            {emoji}
          </div>
        </div>
      </div>

      {/* Détails notification */}
      <div className="flex-1 ml-4">
        <span className="font-bold text-base">{username}</span>
        <p className="text-sm text-gray-600 mt-1">{notificationText}</p>
      </div>

      {/* Image du post (optionnelle) */}
      {postPhoto && (
        <img
          src={postPhoto}
          alt="Post"
          className="w-14 h-14 rounded-md object-cover border border-gray-300 ml-4"
        />
      )}
      {!postPhoto && (
        <button
          className="w-30 bg-purple-600 text-white rounded-md px-4 py-2 hover:bg-purple-700 transition flex justify-center items-center"
          
        >
          Accepter
        </button>
      )}
    </div>
  );
};

export default Notification;
