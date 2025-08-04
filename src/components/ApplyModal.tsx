"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import axios from "axios";

export default function ApplyModal({
  open,
  onClose,
  jobId,
  freelancerId,
  onApplySuccess,
}: {
  open: boolean;
  onClose: () => void;
  jobId: string;
  freelancerId: string;
  onApplySuccess: () => void;
}) {
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!coverLetter.trim()) {
      setError("Please write a cover letter.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "/api/jobApply",
        { jobId, freelancerId, coverLetter },
        { headers: { "Content-Type": "application/json" } }
      );
      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to apply for the job.");
      }

      // Success: Close modal, notify user, update UI etc.
      setSuccess(true);
      onApplySuccess();
      setCoverLetter(""); 
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0">
      <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-50 p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-lg relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
            onClick={onClose}
          >
            <IoClose />
          </button>
          <Dialog.Title className="text-2xl font-bold text-indigo-700 mb-4">
            Apply for this Job
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Cover Letter
              </label>
              <textarea
                required
                rows={5}
                className="w-full border rounded-lg p-3"
                placeholder="Write your cover letter here..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
