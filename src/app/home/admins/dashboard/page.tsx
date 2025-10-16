"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";
import {
  FaUsers,
  FaBriefcase,
  FaDollarSign,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function AdminDashboard() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    // Fetch admin details if needed
    const fetchAdminDetails = async () => {
      axios.get("/api/admin/users")
        .then((response) => {
          setAdminName(response.data.username);
        })
        .catch((error) => {
          console.error("Error fetching admin details:", error);
        });
      }
    fetchAdminDetails();
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/auth/logout");
      toast.success("Logout successful!");
      if (!response) {
        throw new Error("Logout failed");
      }
      // Redirect to login page after successful logout
      router.push("/auth/login");
      console.log("Logout successful:", response.data);
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred during logout. Please try again.");
      return;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Mobile Navbar */}
      <div className="md:hidden bg-[#202C33] text-white flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button
          onClick={toggleMenu}
          className="text-white text-2xl cursor-pointer"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-full md:w-1/4 bg-[#202C33] text-white md:block ${
          isMenuOpen ? "block" : "hidden"
        } transition-transform duration-300 ease-in-out`}
      >
        <div
          className={`flex items-center justify-center py-6 border-b border-gray-700 ${
            isMenuOpen ? "hidden" : "block"
          }`}
        >
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex flex-col gap-4 p-4">
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={() => {
              router.push("/home/admins/dashboard/manage/users");
              setIsMenuOpen(false); // Close menu on link click
            }}
          >
            <FaUsers />
            <span>Manage Users</span>
          </button>
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={() => {
              router.push("/home/admins/dashboard/manage/jobs");
              setIsMenuOpen(false); // Close menu on link click
            }}
          >
            <FaBriefcase />
            <span>Manage Jobs</span>
          </button>
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={() => {
              router.push("/home/admins/dashboard/manage/payments");
              setIsMenuOpen(false); // Close menu on link click
            }}
          >
            <FaDollarSign />
            <span>Payments</span>
          </button>
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={() => {
              router.push("/home/admins/dashboard/manage/reports");
              setIsMenuOpen(false); // Close menu on link click
            }}
          >
            <FaChartBar />
            <span>Reports</span>
          </button>
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={() => {
              router.push("/home/admins/dashboard/manage/settings");
              setIsMenuOpen(false); // Close menu on link click
            }}
          >
            <FaCog />
            <span>Settings</span>
          </button>
          <button
            className="flex text-red-500 items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={() => handleLogout()}
          >
            <MdLogout />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome, {adminName}</h2>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-2xl font-bold text-green-600">1,245</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700">Active Jobs</h3>
            <p className="text-2xl font-bold text-blue-600">342</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Earnings
            </h3>
            <p className="text-2xl font-bold text-yellow-600">$45,678</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Pending Reports
            </h3>
            <p className="text-2xl font-bold text-red-600">12</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <div className="bg-white shadow-md rounded-lg p-4">
            <ul className="divide-y divide-gray-200">
              <li className="py-3 flex justify-between">
                <span className="text-gray-700">John Doe posted a new job</span>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </li>
              <li className="py-3 flex justify-between">
                <span className="text-gray-700">
                  Jane Smith completed a milestone
                </span>
                <span className="text-sm text-gray-500">5 hours ago</span>
              </li>
              <li className="py-3 flex justify-between">
                <span className="text-gray-700">
                  Payment processed for Job #123
                </span>
                <span className="text-sm text-gray-500">1 day ago</span>
              </li>
              <li className="py-3 flex justify-between">
                <span className="text-gray-700">
                  New report submitted by User #456
                </span>
                <span className="text-sm text-gray-500">2 days ago</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
