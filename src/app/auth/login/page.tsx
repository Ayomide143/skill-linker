"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", credentials);
      console.log("Login successful:", response.data);
      const { user } = response.data;
      if (response.data.success) {
        localStorage.setItem("userId", user.id);
      }

      if (user.role === "client") {
        router.push("/home/clients/dashboard"); //Redirect to client dashboard
      } else if (user.role === "freelancer") {
        router.push("/home/freelancers/find-work"); //Redirect to freelancer dashboard
      } else if (user.role === "admin") {
        router.push("/home/admins/dashboard"); //Redirect to admin dashboard
      } else {
        router.push("/"); //Fallback redirect
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      alert("Login failed. Please check your credentials and try again.");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-200 px-2 sm:px-4 py-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-indigo-100 p-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2 text-center">
          Sign In
        </h2>
        <p className="text-gray-500 mb-8 text-center">
          Welcome back to Skill Linker
        </p>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 text-xs"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="text-right mt-2">
            <a
              href="/auth/forgot-password"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              onClick={handleLogin}
              disabled={loading}
              className="w-full mt-2 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:from-indigo-700 hover:to-blue-600 transition-all cursor-pointer"
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </div>

          <div>
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="px-4 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Google Sign-In button */}
            <button className="w-full flex items-center justify-center border border-gray-400 py-2 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
            <p className="mt-4 text-sm text-gray-500 text-center">
              By signing in, you agree to our{" "}
              <a
                href="/terms"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a
            href="/auth/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}
