import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Smile, Send, Sun, Moon } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const initialChats = [
  { id: 1, sender: "Kailey", subject: "Say Hi here...", unreadCount: 2, messages: [] },
  { id: 2, sender: "MaryJane", subject: "Check out...", unreadCount: 1, messages: [] },
  { id: 3, sender: "Niko", subject: "You smile like...", unreadCount: 0, messages: [] },
];

export default function ChatApp() {
  const [darkMode, setDarkMode] = useState(true);
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
    <div
      className={`h-[90vh] flex ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} max-w-[1000px] mx-auto rounded-xl overflow-hidden`}
    >
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0"} flex-shrink-0 overflow-hidden ${darkMode ? "bg-gray-800" : "bg-gray-200"} rounded-l-xl`}
      >
        {sidebarOpen && (
          <div className="p-4">
            <h2 className="text-sm font-bold mb-4 flex items-center justify-between">
              Chats
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode((prev) => !prev)}
                />
                <span className="slider">
                  <span className="icon">
                    {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                  </span>
                </span>
              </label>
            </h2>
            <ul>
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  className={`p-2 rounded-md mb-2 cursor-pointer ${
                    selectedMessage?.id === chat.id
                      ? "bg-indigo-500 text-white"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => handleConversationClick(chat)}
                >
                  <div className="flex justify-between items-center">
                    <span>{chat.sender}</span>
                    {chat.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
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
        <div
          className={`p-4 flex items-center justify-between ${darkMode ? "bg-gray-800" : "bg-gray-200"} rounded-t-xl`}
        >
          <h2 className="font-bold">
            {selectedMessage ? selectedMessage.sender : "Select a chat"}
          </h2>
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center"
            style={{ width: "40px", height: "40px" }}
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Messages */}
        <div className={`flex-1 p-4 ${darkMode ? "bg-gray-900" : "bg-white"} overflow-y-scroll`}>
          {selectedMessage ? (
            selectedMessage.messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative max-w-[70%] p-3 rounded-lg ${
                    msg.sender === "You"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-300 text-gray-900"
                  }`}
                  style={{
                    borderRadius: "20px", // Rounded bubbles
                    padding: "12px", // Clean padding
                  }}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs text-gray-500 text-right mt-1">{msg.timestamp}</p>

                  {/* Tail for the message bubble (side) */}
                  {msg.sender === "You" ? (
                    <div
                      className="absolute right-[-8px] bottom-0"
                      style={{
                        width: "0",
                        height: "0",
                        borderTop: "8px solid transparent",
                        borderBottom: "8px solid transparent",
                        borderLeft: "8px solid #4f46e5", // Tail color for sent message (Indigo)
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
                        borderRight: "8px solid #d1d5db", // Tail color for received message (Light gray)
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
        <div className={`p-4 flex items-center ${darkMode ? "bg-gray-800" : "bg-gray-200"}`} ref={inputRef}>
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="mr-2 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600"
          >
            <Smile size={20} className={`${darkMode ? "text-gray-300" : "text-gray-600"}`} />
          </button>

          {showEmojiPicker && (
            <div
              className="absolute bottom-20 left-4 z-20"
              style={{
                width: "300px",
                height: "350px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                borderRadius: "12px",
                backgroundColor: darkMode ? "#333" : "#f9f9f9",
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
            className="ml-2 p-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
