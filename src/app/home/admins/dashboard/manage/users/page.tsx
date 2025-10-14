"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaUser, FaBan, FaSearch } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

export default function ManageUsers() {
  const [users, setUsers] = useState<
    {
      id: string;
      name: string;
      role: string;
      isBlocked: Boolean;
      reports: number;
    }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Loading state for fetching users
  const [error, setError] = useState<string | null>(null); // Error state
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null); // Tracks which user's action is loading

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/admin/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error: any) {
        console.error("Error fetching users:", error);
        setError(error.message || "An error occurred while fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUser = async (userId: string) => {
    try {
      setLoadingUserId(userId); // Set loading state for the specific user
      const response = await axios.post(`/api/admin/users/block`, { userId });

      if (!response.data.success) {
        throw new Error("Failed to block user");
      }

      // Update the user's status locally
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isBlocked: true } : user
        )
      );
      toast.success("User has been blocked successfully."); // Show success toast
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("Failed to block user. Please try again."); // Show error toast
    } finally {
      setLoadingUserId(null); // Reset loading state
    }
  };

  const handleUnblockUser = async (userId: string) => {
    try {
      setLoadingUserId(userId); // Set loading state for the specific user
      const response = await axios.post(`/api/admin/users/unblock`, { userId });

      if (!response.data.success) {
        throw new Error("Failed to unblock user");
      }

      // Update the user's status locally
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isBlocked: false } : user
        )
      );
      toast.success("User has been unblocked successfully."); // Show success toast
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error("Failed to unblock user. Please try again."); // Show error toast
    } finally {
      setLoadingUserId(null); // Reset loading state
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex items-center justify-between bg-green-600 text-white px-4 py-3">
        <h1 className="text-xl font-bold">Manage Users</h1>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search users..."
            className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="text-white hover:text-gray-200">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredUsers.length > 0 ? (
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Blocked</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 border-b border-gray-200"
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td
                    className={`px-4 py-2 ${
                      user.isBlocked ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {user.isBlocked ? (
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-500 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleUnblockUser(user.id)}
                        disabled={loadingUserId === user.id} // Disable button if loading
                      >
                        {loadingUserId === user.id
                          ? "Unblocking..."
                          : "Unblock"}
                      </button>
                    ) : (
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-500 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleBlockUser(user.id)}
                        disabled={loadingUserId === user.id} // Disable button if loading
                      >
                        {loadingUserId === user.id ? "Blocking..." : "Block"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
}
