// src/components/UserInfos.jsx
import React from 'react';
import { motion } from "framer-motion";
import profilePhoto from '../assets/photo.jpg'; // Placeholder image

function UserInfos() {
    const userData = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        password: "••••••••",
        filiere: "Informatique",
        groupe: "Groupe A",
        etablissement: "Université de Paris",
        anneeFormation: "3ème année",
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-96">
            {/* Profile Photo with Hover Animation */}
            <motion.div
                className="flex justify-center mb-4"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
            >
                <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-blue-500"
                />
            </motion.div>

            {/* User Name with Hover Effect */}
            <motion.div
                className="text-center mb-4"
                whileHover={{ scale: 1.1, color: "#0077ff" }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-xl font-semibold">
                    {userData.firstName} {userData.lastName}
                </h2>
            </motion.div>

            {/* Email with Hover Effect */}
            <motion.div
                className="text-center mb-4"
                whileHover={{ scale: 1.1, color: "#0077ff" }}
                transition={{ duration: 0.3 }}
            >
                <p className="text-sm">{userData.email}</p>
            </motion.div>

            {/* Additional User Data */}
            <div className="space-y-2">
                <p><strong>Filière:</strong> {userData.filiere}</p>
                <p><strong>Groupe:</strong> {userData.groupe}</p>
                <p><strong>Établissement:</strong> {userData.etablissement}</p>
                <p><strong>Année de Formation:</strong> {userData.anneeFormation}</p>
            </div>
        </div>
    );
}

export default UserInfos;  {/* Assurez-vous que l'exportation par défaut est ici. */}
