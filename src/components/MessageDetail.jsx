import React, { useState } from 'react';

function MessageDetail({ message, onBack }) {
  const [reply, setReply] = useState('');

  const handleReply = () => {
    alert(`Envoyé: ${reply}`);
    setReply('');
  };

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      {onBack && (
        <button className="text-blue-500" onClick={onBack}>
          Retour
        </button>
      )}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex justify-between">
          <p className="font-bold">{message.sender}</p>
          <span className="text-xs text-gray-400">{message.time}</span>
        </div>
        <p>{message.content}</p>
      </div>
      <div className="space-y-2">
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Votre réponse"
        />
        <button
          onClick={handleReply}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default MessageDetail;
