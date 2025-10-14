"use client";
import { useEffect, useState } from "react";

export default function JobApplicationsPage({ jobId }: { jobId: string }) {
  type Application = {
    _id: string;
    freelancerId: string;
    freelancerName: string;
    coverLetter: string;
  };

  const [applications, setApplications] = useState<Application[]>([]);
  const [job, setJob] = useState<{ title?: string } | null>(null);
  const [interview, setInterview] = useState<string | null>(null);
  const [hire, setHire] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;

    const fetchData = async () => {
      try {
        setLoading(true); 
        setError(null);

        // Fetch job details
        const jobResponse = await fetch(`/api/helpers/clientJobDetails?jobId=${jobId}`);
        if (!jobResponse.ok) {
          throw new Error("Failed to fetch job details");
        }
        const jobData = await jobResponse.json();
        setJob(jobData);

        // Fetch applications
        const applicationsResponse = await fetch(
          `/api/helpers/getApplication?jobId=${jobId}`
        );
        if (!applicationsResponse.ok) {
          throw new Error("Failed to fetch applications");
        }
        const applicationsData = await applicationsResponse.json();
        setApplications(Array.isArray(applicationsData) ? applicationsData : []);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchData();
  }, [jobId]);

  const handleInterview = (freelancerId: string) => {
    fetch("/api/helpers/interview", {
      method: "POST",
      body: JSON.stringify({ jobId, freelancerId }),
      headers: { "Content-Type": "application/json" },
    });
    setInterview(freelancerId);
  };

  const handleSelect = (freelancerId: string) => {
    fetch("/api/helpers/hire", {
      method: "POST",
      body: JSON.stringify({ jobId, freelancerId }),
      headers: { "Content-Type": "application/json" },
    });
    setHire(freelancerId);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 md:max-w-xl">
      <h1 className="text-2xl font-bold mb-4">
        Applications for {job?.title || "this job"}
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : applications.length > 0 ? (
        applications.map((app) => (
          <div key={app._id} className="border rounded p-4 mb-4">
            <div className="font-semibold">{app.freelancerName}</div>
            <h3>Cover Letter</h3>
            <div className="text-sm text-gray-500 mb-2">{app.coverLetter}</div>
            {interview === app.freelancerId ? (
              <p className="text-green-600">Interview scheduled</p>
            ) : (
              <button
                className="mr-2 px-4 py-1 bg-yellow-500 text-white rounded cursor-pointer"
                onClick={() => handleInterview(app.freelancerId)}
              >
                Interview
              </button>
            )}

            {hire === app.freelancerId ? (
              <p className="text-green-600">Hired</p>
            ) : (
              <button
                className="px-4 py-1 bg-green-600 text-white rounded cursor-pointer"
                onClick={() => handleSelect(app.freelancerId)}
              >
                Select for Hire
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No applications yet.</p>
      )}
    </div>
  );
}
