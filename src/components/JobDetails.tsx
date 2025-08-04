"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ApplyModal from "@/components/ApplyModal";
import Footer from "@/components/Footer";
import { FaRegHeart, FaHeart, FaCheckCircle } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";

interface Job {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  budget: number;
  type: string;
  company: string;
  location: string;
  posted: string;
}

export default function JobDetailsClient({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openApplyModal, setOpenApplyModal] = useState(false);
  const [freelancerId, setFreelancerId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("userId") ?? "";
    setFreelancerId(id);

    // Check if already applied
    if (id && job._id) {
      axios
        .post("/api/jobApply/applicationcheck", { jobId: job._id, freelancerId: id })
        .then((res) => setApplied(res.data.applied))
        .catch(() => setApplied(false));
      axios
        .post("/api/jobApply/savecheck", { jobId: job._id, freelancerId: id })
        .then((res) => setSaved(res.data.saved))
        .catch(() => setSaved(false));
    }
  }, [job._id]);

  const handleApplyOpen = () => {
    if (!applied) setOpenApplyModal(true);
  };
  const handleApplyClose = () => setOpenApplyModal(false);

  const toggleSave = () => {
    // call API to save to DB
    axios
      .post("/api/helpers/jobs/saveJob", {
        jobId: job._id,
        freelancerId,
      })
      .then((res) => {
        if (res.data.message === "Job saved successfully") {
          setSaved(true);
        } else if (res.data.message === "Job already saved") {
          setSaved(false);
        }
      })
      .catch((error) => {
        console.error("Error saving job:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="px-9 py-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-4">
          Job Details
        </h1>
        <div className="bg-white rounded-xl border shadow p-6">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-600">
              {new Date(job.posted).toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h4 className="font-semibold mb-2">Job description:</h4>
          <p className="mb-4">{job.description}</p>
          <div className="space-y-2 flex flex-col sm:flex-row sm:justify-between">
            <p>
              <strong>Company:</strong> {job.company || "N/A"}
            </p>
            <p>
              <strong>Location:</strong> {job.location}
            </p>
            <p>
              <strong>Type:</strong> {job.type}
            </p>
            <p>
              <strong>Budget:</strong> ${job.budget}
            </p>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              disabled={applied}
              className={`px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-semibold cursor-pointer shadow hover:from-indigo-700 hover:to-blue-600 transition 
              ${applied ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={handleApplyOpen}
            >
              {applied ? (
                <div className="flex items-center justify-center gap-2 text-white font-semibold">
                  <FaCheckCircle /> Application sent!
                </div>
              ) : (
                "Apply Now"
              )}
            </button>
            <button
              onClick={toggleSave}
              className="px-6 py-2 flex gap-3 items-center justify-center text-indigo-600 border border-indigo-600 rounded-lg font-semibold cursor-pointer shadow transition"
            >
              {saved ? <FaHeart className="text-indigo-600" /> : <FaRegHeart />}
              {saved ? "Saved" : "Save Job"}
            </button>
          </div>
        </div>

        {/* Modal Component */}
        <ApplyModal
          open={openApplyModal}
          onClose={handleApplyClose}
          jobId={job._id}
          freelancerId={freelancerId}
          onApplySuccess={() => setApplied(true)}
        />

        {/* Client Info */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">
            About the client
          </h2>
          <p className="text-blue-600 flex items-center gap-2">
            <MdVerified /> Payment and location Verified
          </p>
          <p className="text-gray-600 mt-2">
            This client has been verified and is ready to hire freelancers for
            this job.
          </p>
          <p className="text-gray-600 mt-2">
            0% hire rate, 1 open job, 0 reviews
          </p>
          <p className="text-gray-600 mt-2 flex items-center gap-2">
            <FaLocationDot /> {job.location}
          </p>
          <p className="text-gray-600 mt-2">
            If you have any questions about the job or the client, feel free to
            reach out.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
