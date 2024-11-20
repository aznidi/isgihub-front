import React, { useState } from "react";
import { ThumbsUp, Edit, Trash, Save, X, Reply } from "lucide-react";
import { motion } from "framer-motion";
import photo from '../assets/photo.jpg'

function CommentsSection({
  comments,
  showAllComments,
  toggleComments,
  onDeleteComment,
  onEditComment,
  onLikeComment,
  responseComment,
  setResponseComment,
  onAddResponse,
}) {
  const [editMode, setEditMode] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [isResponding, setIsResponding] = useState(null);

  const handleEditStart = (id, text) => {
    setEditMode(id);
    setEditedText(text);
  };

  const handleEditCancel = () => {
    setEditMode(null);
    setEditedText("");
  };

  const handleEditSave = (id) => {
    if (editedText.trim() === "") return;
    onEditComment(id, editedText);
    setEditMode(null);
    setEditedText("");
  };

  const handleLike = (commentId) => {
    onLikeComment(commentId);
  };

  const handleToggleResponse = (commentId) => {
    if (isResponding === commentId) {
      setIsResponding(null);
      setResponseComment("");
    } else {
      setIsResponding(commentId);
    }
  };

  const handleAddResponse = (commentId) => {
    onAddResponse(commentId);
  };

  return (
    <div className="mt-4 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        {comments.slice(0, showAllComments ? comments.length : 3).map((comment) => (
          <div key={comment.id} className="flex flex-col space-y-2 border-b pb-3 bg-gray-50 rounded-lg p-3 shadow-sm">
            {/* User Profile and Info */}
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <img
                src={photo} // Remplacer par une URL d'image réelle ou dynamique
                alt={comment.user}
                className="w-10 h-10 rounded-full object-cover"
              />
              {/* User Info */}
              <div className="flex flex-col">
                <p className="font-semibold text-sm text-gray-800">{comment.user}</p>
                <p className="text-xs text-gray-400">{comment.timestamp.toLocaleString()}</p>
              </div>
            </div>

            {/* Comment Text */}
            {editMode === comment.id ? (
              <div className="mt-2">
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm mb-2 focus:ring-2 focus:ring-blue-400"
                  placeholder="Modifier votre commentaire..."
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleEditSave}
                    className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600"
                  >
                    <Save size={16} />
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600">{comment.text}</p>
            )}

            {/* Icons Section - Flex layout */}
            <div className="flex items-center justify-between mt-2">
              {/* Left Side: Like, Edit, Delete */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center text-gray-500 hover:text-blue-500 transition-colors"
                  aria-label="Like"
                >
                  <ThumbsUp size={16} />
                  <span className="ml-1 text-xs">{comment.likes}</span> {/* Adjusting position */}
                </button>
                <button
                  onClick={() => handleEditStart(comment.id, comment.text)}
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                  aria-label="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDeleteComment(comment.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  aria-label="Delete"
                >
                  <Trash size={16} />
                </button>
              </div>

              {/* Right Side: Reply button */}
              <button
                onClick={() => handleToggleResponse(comment.id)}
                className="text-gray-500 hover:text-blue-400 transition-colors ml-auto text-xs"
                aria-label="Reply"
              >
                <Reply size={16} />
                <span className="ml-2">Répondre</span>
              </button>
            </div>

            {/* Displaying Responses */}
            {isResponding === comment.id && (
              <div className="mt-2 flex items-center">
                <textarea
                  value={responseComment}
                  onChange={(e) => setResponseComment(e.target.value)}
                  className="w-full sm:w-2/3 lg:w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400"
                  placeholder="Votre réponse..."
                />
                <button
                  onClick={() => handleAddResponse(comment.id)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-lg ml-2 hover:bg-blue-600"
                >
                  Répondre
                </button>
              </div>
            )}

            {/* Displaying the responses */}
            {comment.responses.length > 0 && (
              <div className="mt-4 ml-4">
                {comment.responses.map((response) => (
                  <div key={response.id} className="flex flex-col space-y-2">
                    <p className="text-gray-700 text-sm">{response.user} :</p>
                    <p className="text-gray-600">{response.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Toggle comments visibility */}
      <div className="mt-4 text-center">
        <button
          onClick={toggleComments}
          className="text-blue-500 hover:text-blue-400 transition-colors"
        >
          {showAllComments ? "Voir moins" : "Voir plus"}
        </button>
      </div>
    </div>
  );
}

export default CommentsSection;
