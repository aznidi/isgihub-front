import React from 'react';
import { UserPlus, MessageCircle, GraduationCap, Home, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

function ProfileCard({ profile }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={profile.avatar}
        alt={profile.name}
        className="w-16 h-16 rounded-full mb-4 border-2 border-blue-400"
      />
      <h3 className="font-bold text-gray-800">{profile.name}</h3>
      <p className="text-sm text-gray-500 mb-1">{profile.role}</p>
      <div className="text-gray-600 text-sm mb-4 w-full">
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="w-5 h-5 text-blue-500" />
          <span>Année : {profile.year}</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <Briefcase className="w-5 h-5 text-blue-500" />
          <span>Institut : {profile.institute}</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <Home className="w-5 h-5 text-blue-500" />
          <span>Adresse : {profile.location}</span>
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <motion.button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <UserPlus className="w-5 h-5" />
          Ajouter
        </motion.button>
        <motion.button
          className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle className="w-5 h-5" />
          Message
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ProfileCard;
