import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Smile, Send } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

// Mock user profile pictures
const mockProfilePics = {
  Kailey: "https://randomuser.me/api/portraits/lego/1.jpg",
  MaryJane: "https://randomuser.me/api/portraits/lego/2.jpg",
  Niko: "https://randomuser.me/api/portraits/lego/3.jpg",
};

const initialChats = [
  { id: 1, sender: "Kailey", subject: "Say Hi here...", unreadCount: 2, messages: [] },
  { id: 2, sender: "MaryJane", subject: "Check out...", unreadCount: 1, messages: [] },
  { id: 3, sender: "Niko", subject: "You smile like...", unreadCount: 0, messages: [] },
];

export default function ChatApp() {
  const [chats, setChats] = useState(initialChats);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleConversationClick = (chat) => {
    setChats((prevChats) =>
      prevChats.map((c) =>
        c.id === chat.id ? { ...c, unreadCount: 0 } : c
      )
    );
    setSelectedMessage(chat);
    setSidebarOpen(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedMessage) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === selectedMessage.id
          ? {
              ...chat,
              messages: [...chat.messages, { sender: "You", message: newMessage, timestamp }],
            }
          : chat
      )
    );

    setSelectedMessage((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, { sender: "You", message: newMessage, timestamp }],
          }
        : prev
    );

    setNewMessage("");

    setTimeout(() => {
      const replyMessage = `Reply from ${selectedMessage.sender}`;
      const replyTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedMessage.id
            ? {
                ...chat,
                messages: [...chat.messages, { sender: selectedMessage.sender, message: replyMessage, timestamp: replyTimestamp }],
              }
            : chat
        )
      );

      setSelectedMessage((prev) =>
        prev
          ? {
              ...prev,
              messages: [...prev.messages, { sender: selectedMessage.sender, message: replyMessage, timestamp: replyTimestamp }],
            }
          : prev
      );
    }, 1500);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="h-[90vh] flex bg-gradient-to-r from-[#1e1e1e] via-[#121212] to-[#2a2a2a] text-gray-200 max-w-[1000px] mx-auto rounded-xl overflow-hidden">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0"} flex-shrink-0 overflow-hidden bg-[#1c1c1c] rounded-l-xl`}
      >
        {sidebarOpen && (
          <div className="p-4">
            <h2 className="text-sm font-bold mb-4 flex items-center justify-between">
              Chats
            </h2>
            <ul>
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  className={`p-2 rounded-md mb-2 cursor-pointer ${selectedMessage?.id === chat.id ? "bg-[#7f00ff] text-white" : "hover:bg-[#444444]"}`}
                  onClick={() => handleConversationClick(chat)}
                >
                  <div className="flex items-center justify-between">
                    <img
                      src={mockProfilePics[chat.sender]}
                      alt={`${chat.sender} profile`}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span>{chat.sender}</span>
                    {chat.unreadCount > 0 && (
                      <span className="bg-[#ff2e2e] text-white text-xs px-2 py-0.5 rounded-full">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col rounded-r-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 flex items-center justify-between bg-[#2b2b2b] rounded-t-xl">
          <h2 className="font-bold">{selectedMessage ? selectedMessage.sender : "Select a chat"}</h2>
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] flex items-center justify-center"
            style={{ width: "40px", height: "40px" }}
          >
            {sidebarOpen ? <ChevronLeft size={20} className="text-[#00ff96]" /> : <ChevronRight size={20} className="text-[#00ff96]" />}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 bg-[#1e1e1e] overflow-y-scroll">
          {selectedMessage ? (
            selectedMessage.messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative max-w-[70%] p-3 rounded-lg ${msg.sender === "You" ? "bg-[#007BFF] text-white" : "bg-[#eeeeee] text-black"}`}
                  style={{
                    borderRadius: "20px", // Rounded bubbles
                    padding: "12px", // Clean padding
                  }}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs text-black text-right mt-1">{msg.timestamp}</p> {/* Updated to black */}
                  {/* Tail for the message bubble (side) */}
                  {msg.sender === "You" ? (
                    <div
                      className="absolute right-[-8px] bottom-0"
                      style={{
                        width: "0",
                        height: "0",
                        borderTop: "8px solid transparent",
                        borderBottom: "8px solid transparent",
                        borderLeft: "8px solid #007BFF", // Tail color for sent message
                        borderRadius: "10px", // Rounded corner for the tail
                      }}
                    />
                  ) : (
                    <div
                      className="absolute left-[-8px] bottom-0"
                      style={{
                        width: "0",
                        height: "0",
                        borderTop: "8px solid transparent",
                        borderBottom: "8px solid transparent",
                        borderRight: "8px solid #eeeeee", // Tail color for received message
                        borderRadius: "10px", // Rounded corner for the tail
                      }}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Select a message to start a conversation</p>
          )}
        </div>

        {/* Input */}
        <div className="p-4 flex items-center bg-[#333333]" ref={inputRef}>
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="mr-2 p-2 rounded-full bg-[#444444] text-gray-300"
          >
            <Smile size={20} />
          </button>

          {showEmojiPicker && (
            <div
              className="absolute bottom-20 left-4 z-20"
              style={{
                width: "300px",
                height: "350px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                borderRadius: "12px",
                backgroundColor: "#333333",
                padding: "10px",
              }}
            >
              <EmojiPicker onEmojiClick={(emoji) => setNewMessage((prev) => prev + emoji.emoji)} />
            </div>
          )}

          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 bg-transparent border rounded-lg outline-none text-sm"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 rounded-full bg-[#007BFF] hover:bg-[#0056b3] text-white"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
