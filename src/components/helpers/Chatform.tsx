"use client";
import React from "react";

export default function Chatform({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) {


  const [message, setMessage] = React.useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage(""); // Clear the input after sending
    }
  };


  return (
    <form onClick={handleSubmit} className="flex gap-3 mt-4 p-3">
      <input
        type="text"
        onChange={(e) => console.log(e.target.value)}
        placeholder="Type your message here..."
        className="flex-1 w-full p-2 border-2 rounded-full border-gray-300 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
      >
        Send
      </button>
    </form>
  );
}
