"use client";
import React, { useEffect, useState } from "react";

export default function Application() {
  type Application = {
    _id: string;
    jobTitle: string;
    coverLetter: string;
    status: string;
    appliedAt: string;
  };

  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/helpers/freelancerApplication");
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);


  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
        My Applications
      </h1>

      {loading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className={`border rounded-lg p-4 sm:p-6 shadow-sm bg-white`}
            >
              <h2 className="font-semibold text-lg mb-2 text-gray-800 break-words">
                {app.jobTitle}
              </h2>
              <p className="text-sm text-gray-600 mb-2 break-words">
                <span className="font-medium">Cover Letter:</span> {app.coverLetter}
              </p>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm text-gray-700">Status:</span>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded ${getStatusStyle(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Applied At:</span>{" "}
                {new Date(app.appliedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No applications found.</p>
      )}
    </div>
  );
}
