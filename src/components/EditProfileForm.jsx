import React, { useState } from "react";

const EditProfileForm = ({ userData, onSave }) => {
    const [formData, setFormData] = useState({ ...userData });
    const [previewImage, setPreviewImage] = useState(userData.avatar);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
        setFormData((prev) => ({ ...prev, avatar: imageUrl }));
    }
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    };

    return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-md">
        <div className="flex flex-col items-center">
        <img src={previewImage} alt="Preview" className="w-24 h-24 rounded-full mb-4 border-4 border-gray-300"/>
        <label htmlFor="avatar" className="bg-gray-200 text-gray-600 px-4 py-1 rounded-md cursor-pointer">
            Change Photo
        </label>
        <input id="avatar" type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
        </div>

        <div>
        <label htmlFor="username" className="block text-sm font-medium">
            Nom d'utilisateur
        </label>
        <input id="username" name="username" type="text" value={formData.username} onChange={handleChange} className="w-full p-2 border rounded-md"/>
        </div>
        
        <div>
        <label htmlFor="nom" className="block text-sm font-medium">
            Nom 
        </label>
        <input id="nom" name="nom" type="text" value={formData.nom} onChange={handleChange} className="w-full p-2 border rounded-md"/>
        </div>

        <div>
        <label htmlFor="prenom" className="block text-sm font-medium">
            Prénom
        </label>
        <input id="prenom" name="prenom" type="text" value={formData.prenom} onChange={handleChange} className="w-full p-2 border rounded-md"/>
        </div>

        <div>
        <label htmlFor="mail" className="block text-sm font-medium">
            Mail
        </label>
        <input id="mail" name="mail" type="text" value={formData.mail} onChange={handleChange} className="w-full p-2 border rounded-md"/>
        </div>

        <div>
        <label htmlFor="bio" className="block text-sm font-medium">
            Bio
        </label>
        <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} className="w-full p-2 border rounded-md"/>
        </div>

        <div>
        <label htmlFor="filiere" className="block text-sm font-medium">
            Filiére
        </label>
        <input id="filiere" name="filiere" type="text" value={formData.filiere} onChange={handleChange} className="w-full p-2 border rounded-md"/>
        </div>

        <div>
        <label htmlFor="institut" className="block text-sm font-medium">
            Institut
        </label>
        <input id="institut" name="institut" type="text" value={formData.institut} onChange={handleChange} className="w-full p-2 border rounded-md"/>
        </div>

        <div>
        <label htmlFor="classe" className="block text-sm font-medium">
            Classe
        </label>
        <input id="classe" name="classe" type="text" value={formData.classe} onChange={handleChange} className="w-full p-2 border rounded-md"/>
        </div>

        <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
        Sauvegarder
        </button>
    </form>
    );
};

export default EditProfileForm;
