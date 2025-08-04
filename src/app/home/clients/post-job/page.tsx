"use client";
import React from "react"
import JobForm from "@/components/JobForm";

export default function PostJobPage() {
  return (
    <>
      <div className="px-9 py-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-2">
          Post a Job
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Fill out the form below to post a new job for freelancers.
        </p>
        <JobForm />
      </div>
    </>
  );
}