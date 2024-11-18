import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
              messages: [...chat.messages, { sender: "You", message: newMessage, timestamp, seen: false }],
            }
          : chat
      )
    );

    setSelectedMessage((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, { sender: "You", message: newMessage, timestamp, seen: false }],
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
    <div className="h-[90vh] flex bg-[#f5f5f5] text-[#000000] max-w-[1000px] mx-auto rounded-xl overflow-hidden shadow-lg">
      {/* Sidebar */}
      <motion.div
        className="flex-shrink-0 overflow-hidden bg-[#ffffff] rounded-l-xl border-r border-gray-200"
        animate={{ width: sidebarOpen ? "16rem" : "0" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {sidebarOpen && (
          <motion.div
            className="p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-sm font-bold mb-4 flex items-center justify-between text-[#333333]">
              Chats
            </h2>
            <motion.ul layout>
              {chats.map((chat) => (
                <motion.li
                  key={chat.id}
                  className={`p-2 rounded-md mb-2 cursor-pointer flex items-center space-x-3 ${selectedMessage?.id === chat.id ? "bg-[#e6f7ff] text-[#007BFF]" : "hover:bg-[#f0f0f0]"}`}
                  onClick={() => handleConversationClick(chat)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={mockProfilePics[chat.sender]}
                    alt={`${chat.sender} profile`}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{chat.sender}</span>
                      {chat.unreadCount === 0 ? (
                        <span className="text-[#007BFF] text-xs">✔️ Seen</span>
                      ) : (
                        <span className="text-[#FF4D4F] text-xs">• New</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{chat.subject}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </motion.div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col rounded-r-xl overflow-hidden">
        <motion.div
          className="p-4 flex items-center justify-between bg-[#ffffff] rounded-t-xl border-b border-gray-200"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-bold text-[#333333]">{selectedMessage ? selectedMessage.sender : "Select a chat"}</h2>
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="p-2 rounded-full bg-[#f0f0f0] hover:bg-[#e0e0e0] flex items-center justify-center"
            style={{ width: "40px", height: "40px" }}
          >
            {sidebarOpen ? <ChevronLeft size={20} className="text-[#007BFF]" /> : <ChevronRight size={20} className="text-[#007BFF]" />}
          </button>
        </motion.div>

        <motion.div className="flex-1 p-4 bg-[#fafafa] overflow-y-scroll">
          <AnimatePresence>
            {selectedMessage ? (
              selectedMessage.messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`mb-3 flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`relative max-w-[70%] p-3 rounded-lg ${msg.sender === "You" ? "bg-[#007BFF] text-white" : "bg-[#f0f0f0] text-[#333333]"}`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className={`text-xs ${msg.sender === "You" ? "text-[#E0E0E0]" : "text-[#666666]"}`}>
                        {msg.timestamp}
                      </p>
                    </div>

                    {/* "Seen" status */}
                    {msg.sender === "You" && index === selectedMessage.messages.length - 1 && (
                      <p className="text-xs text-[#FFFFFF] mt-1 text-right">
                        ✔️ Seen
                      </p>
                    )}

                    {msg.sender !== "You" && index === selectedMessage.messages.length - 1 && (
                      <p className="text-xs text-[#007BFF] mt-1 text-left">
                        ✔️ Seen by You
                      </p>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p
                className="text-[#999999]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Select a message to start a conversation
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="p-4 flex items-center bg-[#ffffff] border-t border-gray-200"
          ref={inputRef}
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="mr-2 p-2 rounded-full bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#333333]"
          >
            <Smile size={20} />
          </button>

          {showEmojiPicker && (
            <motion.div
              className="absolute bottom-20 left-4 z-20 bg-[#ffffff] shadow-lg rounded-lg p-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <EmojiPicker onEmojiClick={(emoji) => setNewMessage((prev) => prev + emoji.emoji)} />
            </motion.div>
          )}

          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 bg-[#fafafa] border rounded-lg outline-none text-sm"
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
        </motion.div>
      </div>
    </div>
  );
}
