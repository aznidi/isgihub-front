import React, { useState } from "react";
import { ThumbsUp, MessageSquare, Edit, Trash,Reply } from "lucide-react"; // Icons from lucide-react
import photo from "../assets/photo.jpg";

function Post({ content, image }) {
  // States for post
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isImageClicked, setIsImageClicked] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);

  // Toggle like for post
  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  // Add a new comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: newComment,
          likes: 0,
          isLiked: false,
          isEditing: false,
        },
      ]);
      setNewComment("");
      setShowCommentInput(false);
    }
  };

  // Toggle like for a specific comment
  const handleCommentLike = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1, isLiked: !comment.isLiked }
          : comment
      )
    );
  };

  // Edit a comment
  const handleCommentEdit = (commentId, newText) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, text: newText, isEditing: false } : comment
      )
    );
  };

  // Toggle edit mode for a comment
  const toggleEditMode = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, isEditing: !comment.isEditing } : comment
      )
    );
  };

  // Delete a comment
  const handleCommentDelete = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  // Toggle image enlargement
  const handleImageClick = () => {
    setIsImageClicked(!isImageClicked);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 mb-4">
      {/* Post Header */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full">
          <img src={photo} alt="Avatar" className="rounded-full" />
        </div>
        <div>
          <h2 className="text-gray-800 font-semibold">AZNIDI Salah</h2>
          <p className="text-gray-500 text-sm">Stagiaire dans ISGI</p>
          <p className="text-gray-500 text-xs">Il y a 1 heure</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-700 mb-4">{content}</p>

      {/* Post Image */}
      {image && (
        <div
          className={`mb-2 cursor-pointer ${
            isImageClicked
              ? "fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
              : ""
          }`}
          onClick={handleImageClick}
        >
          <img
            src={image}
            alt="Post"
            className={`w-full h-auto rounded-lg border ${
              isImageClicked ? "max-h-[90vh] max-w-[90vw] object-contain" : ""
            }`}
          />
        </div>
      )}

      {/* Like and Comment Counters */}
      <div className="flex items-center justify-between mt-2 text-gray-600">
        <p>{likes} {likes === 1 ? "Like" : "Likes"}</p>
        <p>{comments.length} {comments.length === 1 ? "Comment" : "Comments"}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between border-t-2 border-gray-300 pt-2">
        <button
          className={`flex-1 text-center py-2 flex items-center justify-center transition-all duration-200 ease-in-out ${
            isLiked ? "text-blue-500" : "text-gray-600"
          } hover:bg-gray-200`}
          onClick={handleLike}
        >
          <ThumbsUp className="mr-2" />
          <span className="hidden sm:inline-block">Like</span>
        </button>
        <button
          className="flex-1 text-center text-gray-600 hover:bg-gray-200 py-2 flex items-center justify-center"
          onClick={() => setShowCommentInput(!showCommentInput)}
        >
          <MessageSquare className="mr-2" />
          <span className="hidden sm:inline-block">Comment</span>
        </button>
        <button className="flex-1 text-center text-gray-600 hover:bg-gray-200 py-2 flex items-center justify-center">
          <Reply className="mr-2" />
          <span className="hidden sm:inline-block">Reply</span>
        </button>
      </div>

      {/* Add Comment Input */}
      {showCommentInput && (
        <div className="mt-4">
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="border p-2 rounded w-full"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white p-2 rounded w-full"
            >
              Add Comment
            </button>
           
          </form>
        </div>
      )}

      {/* Display Comments */}
      {comments.length > 0 && (
        <div className="mt-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-t pt-2 mt-2">
              {/* Comment Display */}
              {comment.isEditing ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCommentEdit(comment.id, newComment);
                  }}
                >
                  <input
                    type="text"
                    defaultValue={comment.text}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                  <button
                    type="submit"
                    className="mt-2 bg-green-500 text-white p-2 rounded w-full"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <p className="text-gray-700">{comment.text}</p>
              )}

              {/* Comment Actions */}
              <div className="flex items-center space-x-2 mt-2">
                {/* Like Button for Each Comment */}
                <button
                  onClick={() => handleCommentLike(comment.id)}
                  className={`text-gray-500 hover:text-blue-500 flex items-center ${
                    comment.isLiked ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  <ThumbsUp className="mr-1" />
                  {comment.likes} {comment.likes === 1 ? "Like" : "Likes"}
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => toggleEditMode(comment.id)}
                  className="text-gray-500 hover:text-green-500 flex items-center"
                >
                  <Edit className="mr-1" />
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleCommentDelete(comment.id)}
                  className="text-gray-500 hover:text-red-500 flex items-center"
                >
                  <Trash className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
