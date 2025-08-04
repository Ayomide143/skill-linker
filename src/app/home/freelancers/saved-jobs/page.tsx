"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import React from "react";

export default function SavedJobsPage() {
  type savedjobs = {
    _id: string;
    jobId: string;
    title: string;
    description: string;
  };

  const [savedJobs, setSavedJobs] = useState<savedjobs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await fetch("/api/helpers/jobs/getsavedJobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch saved jobs");
        }
        const data = await response.json();
        setSavedJobs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedJobs();
  }, []);

  const handleUnsave = async (savedJobId: string) => {
    try {
      const response = await fetch(`/api/helpers/jobs/getsavedJobs`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ savedJobId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove saved job");
      }

      setSavedJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== savedJobId)
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while removing the job"
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Saved Jobs</h1>
        <p className="text-gray-500 mb-6">
          Here you can view all the jobs you have saved for later.
        </p>
        <div className="border rounded-xl p-4 mb-6 bg-white shadow-sm">
          {loading ? (
            <p className="text-gray-500">Loading saved jobs...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : savedJobs.length === 0 ? (
            <p className="text-gray-500">
              Keep track of jobs you're interested in. Select the heart icon on
              a job post to save it for later.
            </p>
          ) : (
            <ul className="space-y-4">
              {savedJobs.map((job) => (
                <li key={job._id} className="border-b pb-2">
                  <h2 className="text-lg font-semibold">{job.title}</h2>
                  <p className="text-gray-600">{job.description}</p>
                  <button
                    className="text-red-500 hover:underline text-sm mt-2"
                    onClick={() => handleUnsave(job._id)}
                  >
                    Remove from saved
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
