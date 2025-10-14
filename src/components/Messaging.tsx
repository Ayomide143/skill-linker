"use client";
import React, { useState } from "react";
import { FaPaperPlane, FaSmile, FaSearch, FaEllipsisV } from "react-icons/fa";

export default function Messaging() {
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [userName, setUserName] = useState("You");
  const [selectedChat, setSelectedChat] = useState<string | null>(null); // Tracks the selected chat

  const handleSendMessage = (message: string) => {
    console.log("Message sent:", message);
  };

  const handleChatSelect = (chatName: string) => {
    setSelectedChat(chatName); // Set the selected chat
  };

  const handleBackToChats = () => {
    setSelectedChat(null); // Go back to the chat list
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Sidebar (Left Panel) */}
      <div
        className={`${
          selectedChat ? "hidden" : "flex"
        } md:flex flex-col w-full md:w-1/3 bg-[#202C33] text-white`}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h1 className="text-lg font-semibold">Chats</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white">
              <FaSearch />
            </button>
            <button className="text-gray-400 hover:text-white">
              <FaEllipsisV />
            </button>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 cursor-pointer"
              onClick={() => handleChatSelect(`Contact ${index + 1}`)} // Select chat
            >
              <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold">Contact {index + 1}</h3>
                <p className="text-xs text-gray-400">Latest message snippet...</p>
              </div>
              <span className="text-xs text-gray-400">12:45 PM</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Window (Right Panel) */}
      <div
        className={`${
          selectedChat ? "flex" : "hidden"
        } md:flex flex-col flex-1 bg-white`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-green-600 text-white px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-white hover:text-gray-200"
              onClick={handleBackToChats} // Back button for mobile
            >
              Back
            </button>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <h2 className="text-lg font-semibold">{selectedChat}</h2>
              <p className="text-sm text-gray-200">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-gray-200">
              <FaSearch />
            </button>
            <button className="text-white hover:text-gray-200">
              <FaEllipsisV />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === userName ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === userName
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p>{msg.message}</p>
                  <span className="text-xs text-gray-300">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-10">
              No messages yet. Start the conversation!
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 border-t">
          <button className="text-gray-500 hover:text-gray-700">
            <FaSmile />
          </button>
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500"
            onClick={() => handleSendMessage("Sample message")}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
