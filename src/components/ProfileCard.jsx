import React from "react";
import { UserPlus } from "lucide-react";

function ProfileCard({ profile }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition">
      <img
        src={profile.avatar}
        alt={profile.name}
        className="w-16 h-16 rounded-full mb-4 border-2 border-blue-400"
      />
      <h3 className="font-bold text-gray-800">{profile.name}</h3>
      <p className="text-sm text-gray-500 mb-3">{profile.role}</p>
      <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        <UserPlus className="w-5 h-5" />
        Ajouter comme ami
      </button>
    </div>
  );
}

export default ProfileCard;
