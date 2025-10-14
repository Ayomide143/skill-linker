"use client";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Application() {
  type Application = {
    _id: string;
    jobTitle: string;
    jobId: string;
    coverLetter: string;
    status: string;
    appliedAt: string;
  };
  type InterviewRequest = {
    _id: string;
    jobId: string;
    status: string;
  };

  const router = useRouter(); // Initialize the router

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingRequestId, setLoadingRequestId] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [interviewRequests, setInterviewRequests] = useState<
    InterviewRequest[]
  >([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/helpers/freelancerApplication");
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await response.json();
        if (!data.applications || !data.interviewRequests) {
          throw new Error("Invalid response structure");
        }
        setApplications(data.applications || []);
        setInterviewRequests(data.interviewRequests || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications. Please try again later.");
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
  const handleAcceptInterview = async (interviewRequestId: string) => {
    const previousRequests = [...interviewRequests];
    try {
      setLoadingRequestId(interviewRequestId);
      setInterviewRequests((prev) =>
        prev.map((req) =>
          req._id === interviewRequestId ? { ...req, status: "accepted" } : req
        )
      );
      const response = await fetch("/api/helpers/interview/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interviewRequestId }),
      });
      if (!response.ok) {
        throw new Error("Failed to accept interview");
      }
      const data = await response.json();
      if (data.success) {
        setInterviewRequests((prev) =>
          prev.filter((req) => req.jobId !== interviewRequestId)
        );
      }
    } catch (error) {
      console.error("Error accepting interview:", error);
      setInterviewRequests(previousRequests); // Revert to previous state on error
    } finally {
      setLoadingRequestId(null);
    }
  };

  const handleDeclineInterview = async (interviewRequestId: string) => {
    const previousRequests = [...interviewRequests];
    try {
      setLoadingRequestId(interviewRequestId);
      setInterviewRequests((prev) =>
        prev.map((req) =>
          req._id === interviewRequestId ? { ...req, status: "rejected" } : req
        )
      );
      const response = await fetch("/api/helpers/interview/decline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interviewRequestId }),
      });
      if (!response.ok) {
        throw new Error("Failed to decline interview");
      }
      const data = await response.json();
      if (data.success) {
        setInterviewRequests((prev) =>
          prev.filter((req) => req.jobId !== interviewRequestId)
        );
      }
    } catch (error) {
      console.error("Error declining interview:", error);
      setInterviewRequests(previousRequests); // Revert to previous state on error
    } finally {
      setLoadingRequestId(null);
    }
  };

  const handleChatNow = async (interviewRequestId: string) => {
    try {
      const response = await fetch("/api/helpers/createChatRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interviewRequestId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create chat room");
      }

      const data = await response.json();
      if (data.success && data.chatId) {
        // Navigate to the chat room page
        router.push(`/home/messages/${data.chatId}`);
      } else {
        throw new Error("Chat room creation failed");
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
      alert("Failed to create chat room. Please try again.");
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

      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : loading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((app) => {
            const matchingRequest = interviewRequests.find(
              (req) => req.jobId === app.jobId
            );

            return (
              <div
                key={app._id}
                className="border rounded-lg p-4 sm:p-6 shadow-sm bg-white"
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

                {matchingRequest && matchingRequest.status === "pending" ? (
                  <div className="mt-4 flex gap-4">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-500 transition-ease disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={async () => {
                        await handleAcceptInterview(matchingRequest._id);
                      }}
                      disabled={loadingRequestId === matchingRequest._id}
                    >
                      {loadingRequestId === matchingRequest._id ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Accept Interview"
                      )}
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-500 transition-ease disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={async () => {
                        await handleDeclineInterview(matchingRequest._id);
                      }}
                      disabled={loadingRequestId === matchingRequest._id}
                    >
                      {loadingRequestId === matchingRequest._id ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Decline Interview"
                      )}
                    </button>
                  </div>
                ) : matchingRequest && matchingRequest.status === "accepted" ? (
                  <button
                    className="bg-green-600 text-white px-4 py-2 mt-2 rounded-lg cursor-pointer hover:bg-green-500 transition-ease"
                    onClick={() => handleChatNow(matchingRequest._id)}
                  >
                    Chat Now
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No applications found.</p>
      )}
    </div>
  );
}

