"use client";
import React, { useEffect, useState } from "react";

interface Job {
  _id: string;
  title: string;
  status: string;
  applicationCount?: number;
}

interface Application {
  _id: string;
  jobTitle: string;
  freelancerName: string;
  appliedAt: string;
}

interface Client {
  name: string;
  email: string;
}

export default function ClientDashboardStats() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [applications, setApplications] = useState<Application[]>([]);
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const clientId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch jobs and applications in parallel
    const fetchData = async () => {
      try {
        const [jobsRes, appsRes, clientRes] = await Promise.all([
          fetch("/api/helpers/clientJobs"),
          fetch(`/api/helpers/recentApplications?clientId=${clientId}`),
          fetch("/api/helpers/clientProfile"),
        ]);
        const jobsData = await jobsRes.json();
        const appsData = await appsRes.json();
        const clientData = await clientRes.json();
        setJobs(jobsData);
        setApplications(appsData.applications || []);
        setTotalApplications(appsData.totalApplications || 0);
        setClient(clientData);
      } catch (error) {
        // fallback: just don't crash
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-gray-600 animate-pulse">Loading dashboard...</span>
      </div>
    );
  }

  // Stats
  const totalJobs = jobs.length;
  const safeApplications = Array.isArray(applications) ? applications : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Profile Summary */}
      <div className="bg-white rounded-xl border border-gray-200 shadow p-6 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-700 mb-2">
          {client?.name?.[0] ?? "C"}
        </div>
        <div className="font-semibold text-lg">{client?.name ?? "Client"}</div>
        <div className="text-gray-500 text-sm">{client?.email ?? ""}</div>
      </div>

      {/* Job Stats */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 bg-indigo-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-indigo-700">{totalJobs}</div>
          <div className="text-gray-600">Active Jobs</div>
        </div>
        <div className="flex-1 bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{totalApplications}</div>
          <div className="text-gray-600">Total Applications</div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
        {safeApplications.length === 0 ? (
          <div className="text-gray-500">No recent applications.</div>
        ) : (
          <ul>
            {safeApplications.slice(0, 5).map((app) => (
              <li key={app._id} className="border-b py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-medium">{app.freelancerName}</span>
                  <span className="text-gray-500 ml-2">applied for</span>
                  <span className="ml-2 text-indigo-700 font-semibold">{app.jobTitle}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1 sm:mt-0">{new Date(app.appliedAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}