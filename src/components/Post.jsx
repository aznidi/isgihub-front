import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Reply, Edit, Trash } from 'lucide-react'; // Icônes de lucide-react
import photo from "../assets/photo.jpg"; // Import de l'image

function Post() {
  // États
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false); // Pour changer la couleur de l'icône "like"
  const [comments, setComments] = useState([]); // Pour stocker les commentaires
  const [newComment, setNewComment] = useState(''); // Pour gérer le texte du commentaire
  const [isImageClicked, setIsImageClicked] = useState(false); // Pour agrandir l'image
  const [showCommentInput, setShowCommentInput] = useState(false); // Pour afficher le champ de saisie des commentaires

  // Fonction pour incrémenter et décrémenter les likes
  const handleLike = () => {
    if (isLiked) {
      // Si le like est déjà activé, décrémenter
      setLikes(likes - 1);
    } else {
      // Si le like n'est pas activé, incrémenter
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked); // Changer l'état du like au clic
  };

  // Fonction pour ajouter un commentaire
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment) {
      setComments([...comments, { text: newComment, likes: 0, id: Date.now(), replies: [] }]);
      setNewComment(''); // Réinitialiser le champ de texte
      setShowCommentInput(false); // Masquer l'input après soumission
    }
  };

  // Fonction pour agrandir l'image
  const handleImageClick = () => {
    setIsImageClicked(!isImageClicked);
  };

  // Fonction pour liker un commentaire
  const handleCommentLike = (commentId) => {
    setComments(comments.map((comment) =>
      comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  // Fonction pour supprimer un commentaire
  const handleCommentDelete = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  // Fonction pour ajouter une réponse à un commentaire
  const handleReplySubmit = (commentId, replyText) => {
    setComments(comments.map((comment) =>
      comment.id === commentId ? { ...comment, replies: [...comment.replies, replyText] } : comment
    ));
  };

  // Fonction pour afficher/cacher le champ de saisie de commentaire
  const toggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 ">
      {/* En-tête du poste */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full">
          <img src={photo} alt="" className="rounded-full" /> {/* Avatar avec bordure ronde */}
        </div>
        <div>
          <h2 className="text-gray-800 font-semibold">AZNIDI Salah</h2>
          <p className="text-gray-500 text-sm">Stagiaire dans ISGI</p>
          <p className="text-gray-500 text-xs">Il y a 1 heure</p>
        </div>
      </div>

      {/* Contenu du poste */}
      <p className="text-gray-700 mb-4">J'ai pas compris ce Code</p>

      {/* Affichage de l'image du poste avec bordure noire et hauteur responsive */}
      <div
        className={`mb-2 cursor-pointer ${isImageClicked ? 'fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50' : ''}`}
        onClick={handleImageClick}
      >
        <img 
          src={photo} 
          alt="Post" 
          className={`w-full h-48 sm:h-64 md:h-80 lg:h-auto rounded-lg border-2 border-black ${isImageClicked ? 'max-h-[90vh] max-w-[90vw] object-contain' : ''}`} 
        />
      </div>

      {/* Zone des boutons avec icônes */}
      <div className="flex justify-between border-t-2 border-gray-300 pt-2">
        {/* Bouton "J'aime" avec incrémentation et hover */}
        <button
          className={`flex-1 text-center py-2 flex items-center justify-center transition-all duration-200 ease-in-out ${isLiked ? 'text-blue-500' : 'text-gray-600'} hover:bg-gray-200`}
          onClick={handleLike}
        >
          <ThumbsUp className="mr-2" />
          <span className="hidden sm:inline-block">J'aime</span>
        </button>
        {/* Bouton "Commentaire" */}
        <button 
          className="flex-1 text-center text-gray-600 hover:bg-gray-200 py-2 flex items-center justify-center"
          onClick={toggleCommentInput}
        >
          <MessageSquare className="mr-2" />
          <span className="hidden sm:inline-block">Comment</span>
        </button>
        {/* Bouton "Répondre" */}
        <button className="flex-1 text-center text-gray-600 hover:bg-gray-200 py-2 flex items-center justify-center">
          <Reply className="mr-2" />
          <span className="hidden sm:inline-block">Répondre</span>
        </button>
      </div>

      {/* Affichage du nombre de likes */}
      <div className="mt-2 text-gray-600">
        <p>{likes} {likes === 1 ? "Like" : "Likes"}</p>
      </div>

      {/* Affichage des commentaires */}
      <div className="mt-4">
        {showCommentInput && (
          <div className="mb-4">
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ajouter un commentaire..."
                className="border p-2 rounded w-full"
              />
              <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
                Ajouter un commentaire
              </button>
            </form>
          </div>
        )}

        {/* Affichage des commentaires avec réactions et actions */}
        <div>
          {comments.length === 0 ? (
            <p>Aucun commentaire</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border-t pt-2 mt-2">
                <p className="text-gray-700">{comment.text}</p>
                <div className="flex items-center space-x-2 mt-2">
                  {/* Liker un commentaire */}
                  <button onClick={() => handleCommentLike(comment.id)} className="text-gray-500 hover:text-blue-500 flex items-center">
                    <ThumbsUp className="mr-1" />
                    {comment.likes} Likes
                  </button>
                  {/* Modifier un commentaire */}
                  <button className="text-gray-500 hover:text-blue-500 flex items-center">
                    <Edit className="mr-1" />
                    Modifier
                  </button>
                  {/* Supprimer un commentaire */}
                  <button onClick={() => handleCommentDelete(comment.id)} className="text-gray-500 hover:text-red-500 flex items-center">
                    <Trash className="mr-1" />
                    Supprimer
                  </button>
                </div>

                {/* Réponses au commentaire */}
                {comment.replies.length > 0 && (
                  <div className="mt-2 ml-4">
                    {comment.replies.map((reply, index) => (
                      <p key={index} className="text-gray-600">{reply}</p>
                    ))}
                  </div>
                )}
                
                {/* Ajouter une réponse */}
                <div className="mt-2 ml-4">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleReplySubmit(comment.id, newComment);
                    setNewComment('');
                  }}>
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Répondre..."
                      className="border p-2 rounded w-full"
                    />
                    <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
                      Répondre
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
