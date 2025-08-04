"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
// import axios from "axios";
import { useState } from "react";

export default function JobForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    company: "",
    budget: "",
    type: "full-time",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Basic check for required fields
    if (
      !form.title ||
      !form.description ||
      !form.tags ||
      !form.budget ||
      !form.type ||
      !form.location
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "/api/helpers/jobDetails",
        {
          ...form,
          tags: form.tags.split(",").map((tag) => tag.trim()),
          budget: Number(form.budget),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      setForm({
        title: "",
        description: "",
        tags: "",
        company: "",
        budget: "",
        type: "full-time",
        location: "",
      });
      router.push("/home/clients/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Job Title *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Senior React Developer"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={5}
            placeholder="Describe the job in detail"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-1">
            Tags * (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. React, Next.js, Tailwind"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block font-medium mb-1">Company (optional)</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Company name"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block font-medium mb-1">Budget ($USD) *</label>
          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 1000"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block font-medium mb-1">Job Type *</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="full-time">Full-time</option>
            <option value="remote">remote</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location *</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Remote, Lagos, New York"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <p className="text-green-600">✅ Job posted successfully!</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 cursor-pointer transition"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
