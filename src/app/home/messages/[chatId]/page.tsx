"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FaPaperPlane, FaSmile } from "react-icons/fa";

export default function ChatRoomPage() {
  const { chatId } = useParams(); // Get the chatId from the URL
  const [messages, setMessages] = useState<
    { sender: string; message: string; timestamp: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch chat messages for the given chatId
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages/${chatId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data.messages || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      sender: "You", // Replace with the actual sender (freelancer or client)
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    // Optimistically update the UI
    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    try {
      const response = await fetch(`/api/messages/${chatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Revert the optimistic update if the message fails to send
      setMessages((prev) => prev.filter((msg) => msg !== message));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between bg-green-600 text-white px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <h2 className="text-lg font-semibold">Chat</h2>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "You"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p>{msg.message}</p>
                <span className="text-xs text-gray-400">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
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
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500"
          onClick={handleSendMessage}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}