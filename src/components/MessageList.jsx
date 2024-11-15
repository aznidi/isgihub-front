import React from 'react';

function MessageList({ messages, onSelect }) {
  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className="bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition transform hover:-translate-y-1 shadow-sm hover:shadow-lg"
          onClick={() => onSelect(message)}
        >
          <div className="flex justify-between">
            <p className="font-bold">{message.sender}</p>
            <span className="text-xs text-gray-400">{message.time}</span>
          </div>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
