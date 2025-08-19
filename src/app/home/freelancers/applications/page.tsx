"use client";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Application() {
  type Application = {
    _id: string;
    jobTitle: string;
    coverLetter: string;
    status: string;
    appliedAt: string;
  };
  type InterviewRequest = {
    _id: string;
    jobId: string;
    status: string;
  };

  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [interviewRequests, setInterviewRequests] = useState<
    InterviewRequest[]
  >([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/helpers/freelancerApplication");
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await response.json();
        setApplications(data.formatted || []);
        setInterviewRequests(data.formattedInterviewRequests || []);
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
      case "interviewing":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const handleAcceptInterview = async () => {
    try {
      const response = await fetch("/api/helpers/interview/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interviewRequestId: interviewRequests[0]._id }),
      });
      if (!response.ok) {
        throw new Error("Failed to accept interview");
      }
      const data = await response.json();
      if (data.success) {
        setInterviewRequests((prev) =>
          prev.filter((req) => req._id !== interviewRequests[0]._id)
        );
        setApplications((prev) =>
          prev.map((app) =>
            app._id === interviewRequests[0].jobId
              ? { ...app, status: "interviewing" }
              : app
          )
        );
      }
    } catch (error) {
      console.error("Error accepting interview:", error);
    }
  };

  const handleDeclineInterview = async () => {
    try {
      const response = await fetch("/api/helpers/interview/decline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interviewRequestId: interviewRequests[0]._id }),
      });
      if (!response.ok) {
        throw new Error("Failed to decline interview");
      }
      const data = await response.json();
      if (data.success) {
        setInterviewRequests((prev) =>
          prev.filter((req) => req._id !== interviewRequests[0]._id)
        );
      }
    } catch (error) {
      console.error("Error declining interview:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex gap-9 items-center mb-6">
        <button
          className="flex gap-1.5 text-center justify-center text-sm text-grey-600 cursor-pointer hover:text-gray-800 transition-colors"
          onClick={() => window.history.back()}
        >
          {" "}
          <IoMdArrowRoundBack className="mt-0.5" /> Back
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
          My Applications
        </h1>
      </div>

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
                <span className="font-medium">Cover Letter:</span>{" "}
                {app.coverLetter}
              </p>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm text-gray-700">
                  Status:
                </span>
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
              {interviewRequests &&
              interviewRequests.some(
                (req) => req.jobId === app._id && req.status === "pending"
              ) ? (
                <div className="mt-4 flex gap-4">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-500 transition-ease"
                    onClick={handleAcceptInterview}
                  >
                    Accept Interview
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-500 transition-ease"
                    onClick={handleDeclineInterview}
                  >
                    Decline Interview
                  </button>
                </div>
              ) : 
              app.status === "interviewing" ? (
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-500 transition-ease">
                  Chat Now
                </button>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No applications found.</p>
      )}
    </div>
  );
}

//i have worked with the button but i am unable to work because mongodb is not working
