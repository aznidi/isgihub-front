import React from 'react'
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
        <motion.div
            className="bg-white p-4 rounded-lg shadow-lg w-full max-w-5xl flex flex-col md:flex-row items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Profile Picture */}
            <motion.div
            className="mb-4 md:mb-0 md:mr-6"
            whileHover={{ scale: 1.1 }}
            >
            <img
                src={profilePhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-md"
            />
            </motion.div>

            {/* Profile Information in Horizontal Layout */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div className="flex items-center" whileHover={{ scale: 1.02 }}>
                <span className="font-medium text-gray-600 mr-2">Name:</span>
                <span className="text-gray-800">{`${userData.firstName} ${userData.lastName}`}</span>
            </motion.div>
            <motion.div className="flex items-center" whileHover={{ scale: 1.02 }}>
                <span className="font-medium text-gray-600 mr-2">Email:</span>
                <span className="text-gray-800">{userData.email}</span>
            </motion.div>
            <motion.div className="flex items-center" whileHover={{ scale: 1.02 }}>
                <span className="font-medium text-gray-600 mr-2">Filière:</span>
                <span className="text-gray-800">{userData.filiere}</span>
            </motion.div>
            <motion.div className="flex items-center" whileHover={{ scale: 1.02 }}>
                <span className="font-medium text-gray-600 mr-2">Groupe:</span>
                <span className="text-gray-800">{userData.groupe}</span>
            </motion.div>
            <motion.div className="flex items-center" whileHover={{ scale: 1.02 }}>
                <span className="font-medium text-gray-600 mr-2">Établissement:</span>
                <span className="text-gray-800">{userData.etablissement}</span>
            </motion.div>
            <motion.div className="flex items-center" whileHover={{ scale: 1.02 }}>
                <span className="font-medium text-gray-600 mr-2">Année:</span>
                <span className="text-gray-800">{userData.anneeFormation}</span>
            </motion.div>
            </div>
            
        </motion.div>
    )
}

export default UserInfos