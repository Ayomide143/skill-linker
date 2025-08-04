"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { set } from "mongoose";

export default function JobsHero() {
  interface Job {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    company?: string;
    budget: number;
    location: string;
    type: string;
    status: string;
    posted: string;
  }
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/helpers/jobs/getJobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto px-2 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-2">
          Find Your Next Job
        </h1>
        <p className="text-gray-600 text-lg">
          Browse available freelance jobs and start your next project.
        </p>
      </div>
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 shadow p-6 animate-pulse"
              >
                <div className="h-5 bg-gray-300 rounded w-1/3 mb-4" />
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded w-16" />
                  <div className="h-4 bg-gray-200 rounded w-12" />
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-4 bg-gray-200 rounded w-28" />
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">
            No jobs available at the moment.
          </p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Link
                href={`/home/freelancers/find-work/${job._id}`}
                className="block"
                key={job._id}
              >
                {/* Using Link to wrap the job card for navigation */}
                <div
                  key={job._id}
                  className="bg-white rounded-xl shadow-md border border-indigo-100 p-6 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition"
                >
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h2 className="text-xl font-semibold text-indigo-800">
                        {job.title}
                      </h2>
                      <span className="ml-0 sm:ml-4 text-xs text-gray-400">
                        {new Date(job.posted).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-2">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>
                        <strong>Company:</strong> {job.company}
                      </span>
                      <span>
                        <strong>Location:</strong> {job.location}
                      </span>
                      <span>
                        <strong>Type:</strong> {job.type}
                      </span>
                      <span>
                        <strong>Budget:</strong> ${job.budget}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
