"use client";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [role, setRole] = useState<"client" | "freelancer" | "">("");
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    country: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError(null);

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    const res = await axios.post(
      "/api/auth/signup",
      {
        ...form,
        role,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Signup response:", res.data);
    window.location.href = "/auth/login";
  } catch (err: any) {
    console.error(err);
    setError(err.response?.data?.message || "Signup failed. Please try again.");
  } finally {
    setLoading(false);
  }
}


  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-200 px-2 sm:px-4 py-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-indigo-100 flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Illustration or Info */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-blue-500 md:w-1/2 p-10 text-white">
          <h2 className="text-4xl font-extrabold mb-4">Join Skill Linker</h2>
          <p className="text-lg mb-8 text-indigo-100">
            Connect, collaborate, and grow your freelance journey.
          </p>
          <img
            src="/logo2.png"
            alt="Skill Linker Logo"
            className="w-32 h-32 mb-4"
          />
        </div>
        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-indigo-700 mb-2 text-center">
            Sign Up
          </h2>
          <p className="text-gray-500 mb-8 text-center">
            Create your Skill Linker account
          </p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name & Username on same row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="username"
                  value={form.username}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, username: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>
            {/* Country & Phone Number on same row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Country"
                  value={form.country}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, country: e.target.value }))
                  }
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                />
              </div>
            </div>
            {/* Password & Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Create password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm((f) => ({ ...f, confirmPassword: e.target.value }))
                }
              />
            </div>
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I want to:
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setRole("client")}
                  className={`flex-1 px-4 py-2 rounded-lg border font-semibold cursor-pointer transition ${
                    role === "client"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-indigo-700 border-indigo-300 hover:border-indigo-500"
                  }`}
                >
                  Hire
                </button>
                <button
                  type="button"
                  onClick={() => setRole("freelancer")}
                  className={`flex-1 px-4 py-2 rounded-lg border font-semibold cursor-pointer transition ${
                    role === "freelancer"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-indigo-700 border-indigo-300 hover:border-indigo-500"
                  }`}
                >
                  Work
                </button>
              </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:from-indigo-700 hover:to-blue-600 transition-all cursor-pointer"
              disabled={!role || loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
