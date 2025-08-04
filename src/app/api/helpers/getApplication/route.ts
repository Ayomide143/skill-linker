import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Application from "@/models/applicationModel";
import User from "@/models/userModel";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const jobId = req.nextUrl.searchParams.get("jobId");
    if (!jobId  || !mongoose.Types.ObjectId.isValid(jobId)) {
      return NextResponse.json({ error: "Missing jobId" }, { status: 400 });
    }
    const applications = await Application.find({ jobId })
      .populate("freelancerId", "name email")
      .lean();
    // Format for frontend
    const formatted = applications.map((app: any) => ({
      _id: app._id,
      freelancerId: app.freelancerId._id,
      freelancerName: app.freelancerId.name,
      freelancerEmail: app.freelancerId.email,
      coverLetter: app.coverLetter,
      status: app.status,
      appliedAt: app.appliedAt,
    }));
    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
