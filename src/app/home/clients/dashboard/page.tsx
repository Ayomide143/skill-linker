"use client";
import { useEffect, useState } from "react";
import Clientnav from "@/components/Clientnav";
import React from "react";
import { FaSpinner } from "react-icons/fa6";
import Footer from "@/components/Footer";
import ClientDashboardStats from "@/components/ClientDashboardStats";

export default function ClientsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  interface Job {
    _id: string;
    title: string;
    description: string;
    status: string;
    applicationCount?: number;
  }

  useEffect(() => {
    const fetchActiveJobs = async () => {
      try {
        const response = await fetch("/api/helpers/clientJobs");
        if (!response.ok) {
          throw new Error("Failed to fetch active jobs");
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching active jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 flex items-center gap-2">
          <FaSpinner /> Loading ...
        </p>
      </div>
    );
  }

  return (
    <>
      <Clientnav />
      <div className="px-19 py-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-2">
          Clients Page
        </h1>
        <div className="mb-6 flex flex-col justify-between sm:flex-row items-left gap-4">
          <p className="text-gray-600 text-lg">
            Good day, Client. Ready to hire?
          </p>
          <a href="/home/clients/post-job">
            <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-semibold shadow hover:from-indigo-700 hover:to-blue-600 cursor-pointer transition">
              + Post a Job
            </button>
          </a>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Active Jobs</h2>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job._id}
                className="border p-4 mb-3 rounded cursor-pointer hover:bg-gray-50 transition"
                onClick={() =>
                  (window.location.href = `/home/clients/dashboard/${job._id}`)
                }
              >
                <h3 className="font-semibold">{job.title}</h3>
                <p>{job.description}</p>
                <span className="text-sm text-gray-500">
                  Status: {job.status}
                </span>
                <p>
                  No of application:{" "}
                  <span className="text-sm text-gray-500">
                    {job.applicationCount ?? 0}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              You have no active jobs at the moment.
            </p>
          )}
        </div>
        <div className="mt-6">
          <ClientDashboardStats />
        </div>
      </div>
      <Footer />
    </>
  );
}
