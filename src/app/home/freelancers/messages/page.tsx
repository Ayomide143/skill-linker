import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export default function MessagesPage() {
  return (
    <>
    <Navbar />
      <main className="min-h-80px flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-200 px-2 sm:px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-indigo-100 p-8">
          <h2 className="text-3xl font-bold text-indigo-700 mb-2 text-center">
            Messages
          </h2>
          <p className="text-gray-500 mb-8 text-center">
            Your messages will appear here.
          </p>
          {/* Message list will go here */}
        </div>
      </main>
      <Footer />
    </>
  );
}
