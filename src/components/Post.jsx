import React, { useState, useEffect } from "react";
import { ThumbsUp, MessageSquare, Reply, Edit, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommentsSection from "./CommentsSection";
import photo from "../assets/photo.jpg";
import { faker } from "@faker-js/faker";

function Post({ content, image }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [responseComment, setResponseComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);

  // Génération aléatoire des commentaires
  useEffect(() => {
    const randomComments = Array.from({ length: 5 }).map(() => ({
      id: faker.string.uuid(),
      user: faker.internet.username(),
      text: faker.lorem.sentence(),
      likes: faker.number.int({ min: 0, max: 100 }),
      isLiked: false,
      timestamp: faker.date.recent(),
      responses: [], // Pour ajouter des réponses aux commentaires
    }));
    setComments(randomComments);
  }, []);

  const handleLike = () => {
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
    toast(isLiked ? "Like retiré!" : "Post aimé!");
  };

  const toggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      toast.error("Le commentaire ne peut pas être vide !");
      return;
    }
    const newCommentObj = {
      id: faker.string.uuid(),
      user: "Vous",
      text: newComment,
      likes: 0,
      isLiked: false,
      timestamp: new Date(),
      responses: [],
    };
    setComments([newCommentObj, ...comments]);
    setNewComment("");
    toast.success("Commentaire ajouté !");
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
    toast.info("Commentaire supprimé !");
  };

  const handleEditComment = (id, updatedText) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, text: updatedText } : comment
      )
    );
    setEditingComment(null); // Arrêter l'édition
    toast.success("Commentaire modifié !");
  };

  const handleLikeComment = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1, isLiked: true }
          : comment
      )
    );
    toast.success("Commentaire aimé !");
  };

  const handleAddResponse = (commentId) => {
    if (responseComment.trim() === "") {
      toast.error("La réponse ne peut pas être vide !");
      return;
    }
    const response = {
      id: faker.string.uuid(),
      user: "Vous",
      text: responseComment,
      likes: 0,
      timestamp: new Date(),
    };
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, responses: [response, ...comment.responses] }
          : comment
      )
    );
    setResponseComment("");
    toast.success("Réponse ajoutée !");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-4 mb-4 lg:max-w-2xl"
    >
      <ToastContainer />

      {/* En-tête du post */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-10 h-10">
          <img src={photo} alt="Avatar" className="rounded-full" />
        </div>
        <div>
          <h2 className="text-gray-800 font-semibold">AZNIDI Salah</h2>
          <p className="text-gray-500 text-sm">Stagiaire chez ISGI</p>
          <p className="text-gray-400 text-xs">Il y a 1 heure</p>
        </div>
      </div>

      {/* Contenu du post */}
      <p className="text-gray-700 mb-4">{content}</p>
      {image && (
        <motion.div className="mb-4">
          <img src={image} alt="Post" className="w-full h-auto rounded-lg" />
        </motion.div>
      )}

      {/* Compteurs de likes et commentaires */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <p>{likes} {likes === 1 ? "Like" : "Likes"}</p>
        <p>{comments.length} {comments.length === 1 ? "Commentaire" : "Commentaires"}</p>
      </div>

      {/* Boutons d'action */}
      <div className="flex flex-wrap justify-between gap-4 border-t pt-2 text-gray-600">
        <button
          onClick={handleLike}
          className={`flex items-center justify-center gap-2 flex-1 py-2 ${isLiked ? "text-blue-500" : "hover:text-blue-400"}`}
        >
          <ThumbsUp size={18} />
          <span>J'aime</span>
        </button>
        <button
          onClick={toggleComments}
          className="flex items-center justify-center gap-2 flex-1 py-2 hover:text-blue-400"
        >
          <MessageSquare size={18} />
          <span>Commenter</span>
        </button>
        <button className="flex items-center justify-center gap-2 flex-1 py-2 hover:text-blue-400">
          <Reply size={18} />
          <span>Partager</span>
        </button>
      </div>

      {/* Formulaire pour ajouter un commentaire */}
      <div className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajoutez un commentaire..."
          className="w-full border rounded-lg p-2 text-sm mb-2"
          rows={2}
        ></textarea>
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition-all"
        >
          Publier
        </button>
      </div>

      {/* Section des commentaires */}
      <CommentsSection
        comments={comments}
        showAllComments={showAllComments}
        toggleComments={toggleComments}
        onDeleteComment={handleDeleteComment}
        onEditComment={handleEditComment}
        onLikeComment={handleLikeComment}
        responseComment={responseComment}
        setResponseComment={setResponseComment}
        onAddResponse={handleAddResponse}
        editingComment={editingComment}
        setEditingComment={setEditingComment}
      />
    </motion.div>
  );
}

export default Post;
