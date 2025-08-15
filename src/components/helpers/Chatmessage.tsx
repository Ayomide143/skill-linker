"use client";
import React from "react";

interface ChatMessageProps {
  message: string;
  sender?: string;
  isOwnMessage?: boolean;
}

export default function Chatmessage({ sender, message, isOwnMessage }: ChatMessageProps) {
    const isSystemMessage = sender === "System";
  return (
    <div
      className={`flex ${
        isSystemMessage
          ? "justify-center"
          : isOwnMessage
          ? "justify-end"
          : "justify-start"
      } mb-2`}
    >
      <div className={`rounded-lg max-w-xs px-4 py-2 ${
        isSystemMessage
          ? "bg-gray-600 text-white text-center text-xs"
          : isOwnMessage
          ? "bg-blue-500 text-white"
          : "bg-white text-gray-800"}`}>
            {!isSystemMessage && <p className="text-sm text-gray-500 font-bold">{sender}</p>}
        <p>{message}</p>
      </div>
    </div>
  );
}
