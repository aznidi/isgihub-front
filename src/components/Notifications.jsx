import React, { useState } from "react";
import Notification from "./Notification";
import { motion } from "framer-motion"; // Import de Framer Motion
import { Heart, MessageCircle, Share2, PlusCircle } from "lucide-react"; // Icônes

const Notifications = () => {
  const [filter, setFilter] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const notifications = [
    { id: 1, userPhoto: "src/assets/photo.jpg", username: "Walid Elberkaoui", notificationType: "like", postPhoto: "src/assets/photo.jpg" },
    { id: 2, userPhoto: "src/assets/photo.jpg", username: "Ali Othman", notificationType: "comment", postPhoto: "src/assets/photo.jpg" },
    { id: 3, userPhoto: "src/assets/photo.jpg", username: "Sarah Khalil", notificationType: "share", postPhoto: "src/assets/photo.jpg" },
    { id: 4, userPhoto: "src/assets/photo.jpg", username: "Nour Yassin", notificationType: "followRequest", postPhoto: null },
  ];

  const filteredNotifications = filter ? notifications.filter((notif) => notif.notificationType === filter) : notifications;

  // Variants Framer Motion
  const menuVariants = {
    open: { height: "auto", opacity: 1 },
    closed: { height: 0, opacity: 0 },
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white text-gray-900">
      {/* Barre de filtrage */}
      <div className="flex items-center justify-between mb-4">
        <button
          className="flex items-center justify-center bg-gray-200 text-gray-900 px-4 py-2 rounded-full text-sm hover:bg-gray-300 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Filtrer <span className="ml-2">{menuOpen ? "▲" : "▼"}</span>
        </button>
      </div>

      {/* Menu de filtre avec Framer Motion */}
      <motion.div
        initial="closed"
        animate={menuOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-gray-100 rounded-lg mb-4"
      >
        <div className="flex justify-around p-2">
          <button
            className={`flex flex-col items-center px-3 py-2 hover:scale-105 transition-transform ${
              filter === "" ? "text-blue-500" : "text-gray-700"
            }`}
            onClick={() => setFilter("")}
          >
            <div className="bg-gray-200 p-2 rounded-full">
              <Heart className="text-red-500" />
            </div>
            <span className="text-xs mt-1 hidden sm:block">Tout</span>
          </button>
          <button
            className={`flex flex-col items-center px-3 py-2 hover:scale-105 transition-transform ${
              filter === "like" ? "text-blue-500" : "text-gray-700"
            }`}
            onClick={() => setFilter("like")}
          >
            <div className="bg-red-100 p-2 rounded-full">
              <Heart className="text-red-500" />
            </div>
            <span className="text-xs mt-1 hidden sm:block">J'aime</span>
          </button>
          <button
            className={`flex flex-col items-center px-3 py-2 hover:scale-105 transition-transform ${
              filter === "comment" ? "text-blue-500" : "text-gray-700"
            }`}
            onClick={() => setFilter("comment")}
          >
            <div className="bg-blue-100 p-2 rounded-full">
              <MessageCircle className="text-blue-500" />
            </div>
            <span className="text-xs mt-1 hidden sm:block">Commentaires</span>
          </button>
          <button
            className={`flex flex-col items-center px-3 py-2 hover:scale-105 transition-transform ${
              filter === "share" ? "text-blue-500" : "text-gray-700"
            }`}
            onClick={() => setFilter("share")}
          >
            <div className="bg-green-100 p-2 rounded-full">
              <Share2 className="text-green-500" />
            </div>
            <span className="text-xs mt-1 hidden sm:block">Partages</span>
          </button>
          <button
            className={`flex flex-col items-center px-3 py-2 hover:scale-105 transition-transform ${
              filter === "followRequest" ? "text-blue-500" : "text-gray-700"
            }`}
            onClick={() => setFilter("followRequest")}
          >
            <div className="bg-yellow-100 p-2 rounded-full">
              <PlusCircle className="text-yellow-500" />
            </div>
            <span className="text-xs mt-1 hidden sm:block">Demandes</span>
          </button>
        </div>
      </motion.div>

      {/* Liste des notifications */}
      <div className="space-y-4">
        {filteredNotifications.map((notif) => (
          <Notification
            key={notif.id}
            userPhoto={notif.userPhoto}
            username={notif.username}
            notificationType={notif.notificationType}
            postPhoto={notif.postPhoto}
          />
        ))}
        {filteredNotifications.length === 0 && (
          <p className="text-center text-gray-500">Aucune notification trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
