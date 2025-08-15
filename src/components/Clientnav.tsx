"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Clientnav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Example unread notifications/messages
  const notifications = [
    {
      id: 1,
      type: "message",
      from: "John Doe",
      text: "Hi, are you available for a quick call?",
      time: "2m ago",
      link: "/messages",
      unread: true,
    },
    {
      id: 2,
      type: "message",
      from: "Project Team",
      text: "Your proposal was accepted!",
      time: "1h ago",
      link: "/messages",
      unread: true,
    },
    {
      id: 3,
      type: "alert",
      from: "System",
      text: "Payment received for your last project.",
      time: "3h ago",
      link: "/notifications",
      unread: false,
    },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setNotifOpen(false);
      }
    }
    if (dropdownOpen || notifOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen, notifOpen]);

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
    <nav className="w-full px-4 sm:px-8 py-3 flex items-center justify-between z-20 relative">
      {/* Desktop & Large Tablet */}
      <div className="hidden md:flex w-full items-center justify-between">
        {/* Left: Logo and Navigation Links */}
        <div className="flex items-center gap-8 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Link href={"/home/freelancers/find-work"}>
              <img src="/logo.png" alt="Skill Linker Logo" className="h-8" />
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6 ml-4">
            <Link
              href="/home/clients/dashboard"
              className="text-black-700 font-medium hover:text-indigo-900 transition"
            >
              Find talents
            </Link>
            <Link
              href="/projects"
              className="text-black-700 font-medium hover:text-indigo-900 transition"
            >
              Manage works
            </Link>
            <Link
              href="/home/messages"
              className="text-black-700 font-medium hover:text-indigo-900 transition"
            >
              Messages
            </Link>
          </div>
        </div>
        {/* Middle: Search Jobs */}
        <div className="flex-1 flex justify-center px-4">
          <div className="w-full max-w-xs">
            <input
              type="text"
              placeholder="Search talents..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            />
          </div>
        </div>
        {/* Right: Notification & User Avatar */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Notification Icon with Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              className="relative text-black-700 hover:text-indigo-900 focus:outline-none cursor-pointer"
              onClick={() => setNotifOpen((v) => !v)}
              aria-label="Notifications"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {notifications.filter((n) => n.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {notifications.filter((n) => n.unread).length}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-40 py-2">
                <div className="px-4 py-2 font-semibold text-gray-700 border-b">
                  Unread Messages
                </div>
                {notifications.filter((n) => n.unread).length === 0 && (
                  <div className="px-4 py-3 text-gray-500 text-sm">
                    No new notifications.
                  </div>
                )}
                {notifications
                  .filter((n) => n.unread)
                  .map((n) => (
                    <Link
                      key={n.id}
                      href={n.link}
                      className="flex items-start gap-2 px-4 py-3 hover:bg-indigo-50 transition"
                      onClick={() => setNotifOpen(false)}
                    >
                      <div className="pt-1">
                        {n.type === "message" ? (
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                            <path
                              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{n.from}</div>
                        <div className="text-gray-600 text-sm">{n.text}</div>
                        <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                      </div>
                    </Link>
                  ))}
                <div className="border-t my-1" />
                <Link
                  href="/notifications"
                  className="block px-4 py-2 text-indigo-700 font-medium hover:bg-indigo-50 transition text-center"
                  onClick={() => setNotifOpen(false)}
                >
                  View all notifications
                </Link>
              </div>
            )}
          </div>
          {/* User Avatar with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="relative cursor-pointer"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-label="User menu"
            >
              <img
                src="/avatar-placeholder.png"
                alt="User Avatar"
                className="h-9 w-9 rounded-full border border-indigo-200 object-cover"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-40 py-2">
                <Link
                  href="/home/freelancers/profile"
                  className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-50 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  {/* Profile Icon */}
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Your Profile
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-50 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  {/* Settings Icon */}
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09c.36 0 .7-.14.96-.39.26-.25.4-.6.39-.96V9a1.65 1.65 0 0 0-1-1.51A2 2 0 1 1 5 3.09V3a1.65 1.65 0 0 0 1.51 1c.36 0 .7.14.96.39.25.26.39.6.39.96V7c0 .36.14.7.39.96.25.26.6.39.96.39h2c.36 0 .7-.14.96-.39.25-.26.39-.6.39-.96V5c0-.36.14-.7.39-.96.26-.25.6-.39.96-.39A2 2 0 1 1 21 5v.09a1.65 1.65 0 0 0-1 1.51v2c0 .36.14.7.39.96.25.26.6.39.96.39h.09a2 2 0 1 1 0 4h-.09c-.36 0-.7.14-.96.39-.25.26-.39.6-.39.96v2c0 .36.14.7.39.96z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  Settings
                </Link>
                <div className="border-t my-1" />
                <button
                  className="flex items-center gap-2 px-4 py-2 text-gray-800 w-full hover:bg-gray-50 transition"
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                >
                  {/* Logout Icon */}
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path d="M16 17l5-5m0 0l-5-5m5 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile & Tablet < 890px */}
      <div className="flex md:hidden w-full items-center justify-between">
        {/* Hamburger Menu */}
        <button
          className="text-black-700 focus:outline-none cursor-pointer"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Center: Logo */}
        <div className="flex-1 flex justify-center">
          <img src="/logo.png" alt="Skill Linker Logo" className="h-8" />
        </div>
        {/* Right: Search Icon & User Avatar */}
        <div className="flex items-center gap-3">
          {/* Search Icon */}
          <button className="text-black-700 focus:outline-none">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M21 21l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {/* User Avatar */}
          <button className="relative">
            <Link
              href="/home/freelancers/profile">
            <img
              src="/avatar-placeholder.png"
              alt="User Avatar"
              className="h-9 w-9 rounded-full border border-indigo-200 object-cover"
            />
            </Link>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer with transition and icons */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-lg border-t border-indigo-100 flex flex-col md:hidden z-30 transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
        style={{ minHeight: mobileMenuOpen ? "180px" : "0px" }}
      >
        <Link
          href="/home/freelancers/find-work"
          className="flex items-center gap-3 px-6 py-3 text-indigo-700 font-medium"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Dashboard Icon */}
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          Find talents
        </Link>
        <div className="border-t mx-6" />
        <Link
          href="/projects"
          className="flex items-center gap-3 px-6 py-3 text-indigo-700 font-medium"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Projects Icon */}
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M3 7V5a2 2 0 0 1 2-2h2m2 0h6m2 0h2a2 2 0 0 1 2 2v2m0 2v6m0 2v2a2 2 0 0 1-2 2h-2m-2 0H7m-2 0H5a2 2 0 0 1-2-2v-2m0-2V7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          Manage works
        </Link>
        <div className="border-t mx-6" />
        <Link
          href="/home/messages"
          className="flex items-center gap-3 px-6 py-3 text-indigo-700 font-medium"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Messages Icon */}
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          Messages
        </Link>
        <div className="border-t mx-6" />
        <Link
          href="/settings"
          className="flex items-center gap-3 px-6 py-3 text-indigo-700 font-medium"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Settings Icon */}
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09c.36 0 .7-.14.96-.39.26-.25.4-.6.39-.96V9a1.65 1.65 0 0 0-1-1.51A2 2 0 1 1 5 3.09V3a1.65 1.65 0 0 0 1.51 1c.36 0 .7.14.96.39.25.26.39.6.39.96V7c0 .36.14.7.39.96.25.26.6.39.96.39h2c.36 0 .7-.14.96-.39.25-.26.39-.6.39-.96V5c0-.36.14-.7.39-.96.26-.25.6-.39.96-.39A2 2 0 1 1 21 5v.09a1.65 1.65 0 0 0-1 1.51v2c0 .36.14.7.39.96.25.26.6.39.96.39h.09a2 2 0 1 1 0 4h-.09c-.36 0-.7.14-.96.39-.25.26-.39.6-.39.96v2c0 .36.14.7.39.96z" stroke="currentColor" strokeWidth="2" />
          </svg>
          Settings
        </Link>
        <div className="border-t mx-6" />
        <button
          className="flex items-center gap-3 px-6 py-3 text-indigo-700 font-medium text-left"
          onClick={() => {
            setMobileMenuOpen(false);
            handleLogout();
          }}
        >
          {/* Logout Icon */}
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M16 17l5-5m0 0l-5-5m5 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Log out
        </button>
      </div>
    </nav>
  );
}
