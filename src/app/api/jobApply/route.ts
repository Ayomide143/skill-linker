import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import Application from "@/models/applicationModel";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { jobId, freelancerId, coverLetter } = body;

  if (!jobId || !freelancerId || !coverLetter) {
    return NextResponse.json(
      { success: false, message: "Missing required fields." },
      { status: 400 }
    );
  }

  await connectDB();

  try {
    // Convert both IDs to ObjectId for querying and saving
    const jobObjectId = new mongoose.Types.ObjectId(jobId);
    const freelancerObjectId = new mongoose.Types.ObjectId(freelancerId);

    const existing = await Application.findOne({
      jobId: jobObjectId,
      freelancerId: freelancerObjectId,
    });
    if (existing) {
      return NextResponse.json(
        { error: "You have already applied to this job." },
        { status: 400 }
      );
    }

    const application = new Application({
      jobId: jobObjectId,
      freelancerId: freelancerObjectId,
      coverLetter,
    });
    await application.save();

    return NextResponse.json(
      { message: "Application submitted successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
