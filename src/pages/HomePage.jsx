import React, { useState } from "react";
import Post from "../components/Post"; // Post component
import FriendSuggestions from "../components/FriendSuggestions"; // Suggestions component
import { PlusCircle, XCircle } from "lucide-react"; // Icons
import photo from "../assets/photo.jpg";

function HomePage() {
  const [posts, setPosts] = useState([
    { id: 1, content: "Contenu du post 1", image: photo },
  ]);
  const suggestions = [
    {
      id: 1,
      name: "Saad Adam",
      profileImage: "/images/saad.jpg",
      mutualFriends: 5,
    },
    {
      id: 2,
      name: "Rosita Gonzalez",
      profileImage: "/images/rosita.jpg",
      mutualFriends: 3,
    },
    {
      id: 3,
      name: "Salsabil",
      profileImage: "/images/salsabil.jpg",
      mutualFriends: 8,
    },    {
      id: 4,
      name: "Salsabil",
      profileImage: "/images/salsabil.jpg",
      mutualFriends: 8,
    },    {
      id: 6,
      name: "Salsabil",
      profileImage: "/images/salsabil.jpg",
      mutualFriends: 8,
    },    {
      id: 5,
      name: "Salsabil",
      profileImage: "/images/salsabil.jpg",
      mutualFriends: 8,
    },    {
      id: 7,
      name: "Salsabil",
      profileImage: "/images/salsabil.jpg",
      mutualFriends: 8,
    },    {
      id: 8,
      name: "Salsabil",
      profileImage: "/images/salsabil.jpg",
      mutualFriends: 8,
    },
  ];

  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPostImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview image
    }
  };

  // Add a new post
  const handleAddPost = () => {
    if (newPostContent.trim() || newPostImage) {
      const newPost = {
        id: posts.length + 1,
        content: newPostContent,
        image: newPostImage ? imagePreview : null,
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      setNewPostImage(null);
      setImagePreview(null);
      setShowForm(false); // Hide form after adding a post
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 min-h-screen">
      {/* Floating Button with Responsive Position */}
      <div
        className={`fixed z-10 ${
          showForm
            ? "top-4 left-1/2 transform -translate-x-1/2" // Centered at the top when the form is visible
            : "top-4 left-1/2 transform -translate-x-1/2 md:bottom-4 md:right-4 md:top-auto md:left-auto md:transform-none" // Bottom-right for desktops
        }`}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white p-3 md:p-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110"
        >
          {showForm ? <XCircle size={24} /> : <PlusCircle size={24} />}
        </button>
      </div>

      {/* Posts Section */}
      <div className="flex-1 space-y-4">
        {/* Form Section with Animation */}
        <div
          className={`transition-all duration-500 ${
            showForm ? "max-h-screen opacity-100 mb-4" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Écrivez votre nouveau post ici..."
            className="w-full p-2 border rounded mb-2"
          ></textarea>

          {/* Image Upload */}
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Add Post Button */}
          <button
            onClick={handleAddPost}
            className="mt-2 bg-green-500 text-white p-2 rounded w-full"
          >
            Publier le post
          </button>
        </div>

        {/* Posts Display */}
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>

      {/* Suggestions Section */}
      <div className="p-6 bg-gray-50 min-h-screen">
        <FriendSuggestions suggestions={suggestions} />
      </div>
    </div>
  );
}

export default HomePage;
