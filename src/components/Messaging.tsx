"use client";
import React, { useState } from "react";
import Chatmessage from "./helpers/Chatmessage";
import Chatform from "./helpers/Chatform";

export default function Messaging() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);

  const handleSendMessage = (message: string) => {
    // Logic to handle sending the message
    console.log("Message sent:", message);
    // Here you would typically call an API to send the message
  };
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Chat</h1>
        {!joined ? (
          <div className="flex items-center font-bold">
            User is not joined yet
          </div>
        ) : (
          <div className="h-[325px] overflow-y-auto bg-black-800 border border-gray-300 rounded-lg p-4 mb-4">
            {messages.map((msg, index) => (
              <Chatmessage
                key={index}
                sender={msg.sender}
                message={msg.message}
                isOwnMessage={msg.sender === userName}
              />
            ))}
          </div>
        )}
        <div className="mt-6">
          <Chatform onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
