// src/pages/ProfilePage.jsx
import React, { useState } from "react";
// import UserInfos from "../components/UserInfos";
import { DocumentIcon, BookmarkIcon } from "@heroicons/react/outline";
import EditProfileForm from "./EditProfileForm";


const Profile = () => {
  const [activeTab, setActiveTab] = useState("published");
  const [isEditing, setIsEditing] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  const [profile, setProfile] = useState({
    avatar: "", // Replace with real avatar URL
    username: "username",
    nom: "Farhat",
    prenom:"Salma",
    mail:"123@mail.com",
    bio: "Bienvenue sur mon profil ! 🚀",
    filiere: "Développement digital",
    institut: "ISGI",
    friends: 2000,
    classe: "DFWS-202",
    publishedFiles: [{ id: 3, link: "file1" }],
    savedFiles: [
      { id: 4, link: "file2" },
      { id: 5, link: "file3" },
      { id: 6, link: "file4" },
    ],
  });

  const handleEditClick = () => setIsEditing(true);
  const handleShowClick = () => setIsShowing(!isShowing);

  const handleSave = (updatedData) => {
    setProfile(updatedData);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col relative -mt-7 -ml-11">

      {!isEditing ? (
        <>
          {/* Profile Info */}
          <div className="flex flex-col items-center bg-white p-6 shadow-md mt-4 mx-4 rounded-lg">
          <p className="text-xl font-bold">{profile.username}</p>
            <img
              src={profile.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500"
            />
            <p className="text-xl font-bold">{profile.nom} {profile.prenom}</p>
            <p className="text-gray-500">{profile.bio}</p>

            <div className="flex justify-center space-x-8 mt-4">
              <div>
                <p className="font-bold text-lg">{profile.friends}</p>
                <p className="text-gray-500 text-sm">friends</p>
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleEditClick}
                className="bg-gray-200 text-gray-600 p-2 rounded-md mt-4"
              >
                Edit profile
              </button>
              <button
                onClick={handleShowClick}
                className="bg-gray-200 text-gray-600 p-2 rounded-md mt-4"
              >
                Plus d'Informations
              </button>
            </div>

            
            {isShowing && (
              <div className="mt-4 text-left w-full">
              <p className="mt-4 text-gray-700">
            <span className="font-bold">Mail:</span> {profile.mail}
        </p>
        <p className="mt-4 text-gray-700">
            <span className="font-bold">Filière:</span> {profile.filiere}
        </p>
        <p className="mt-2 text-gray-700">
            <span className="font-bold">Institut:</span> {profile.institut}
        </p>
        <p className="mt-2 text-gray-700">
            <span className="font-bold">Classe:</span> {profile.classe}
        </p>
              </div>
            )}
          </div>

          {/* Tabs for Published and Saved Files */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setActiveTab("published")}
              className={`flex items-center space-x-2 px-4 py-2 text-lg font-bold ${
                activeTab === "published"
                  ? "text-blue-600 border-b-4 border-blue-600"
                  : "text-gray-400"
              }`}
            >
              <DocumentIcon className="h-5 w-5" />
              <span>Published</span>
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex items-center space-x-2 px-4 py-2 text-lg font-bold ${
                activeTab === "saved"
                  ? "text-blue-600 border-b-4 border-blue-600"
                  : "text-gray-400"
              }`}
            >
              <BookmarkIcon className="h-5 w-5" />
              <span>Saved</span>
            </button>
          </div>

          {/* File Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 mt-4">
            {(activeTab === "published"
              ? profile.publishedFiles
              : profile.savedFiles
            ).map((file) => (
              <div
                key={file.id}
                className="relative w-full h-56 bg-gray-200 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={file.link}
                  alt={`File ${file.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <EditProfileForm userData={profile} onSave={handleSave} />
      )}
    </div>
  );
  // return (
  //   <div className="flex flex-col items-center min-h-screenp-6">
  //     {/* Profile Header with Horizontal Information */}
  //     <UserInfos />
  //   </div>
  // );
};

export default Profile;
