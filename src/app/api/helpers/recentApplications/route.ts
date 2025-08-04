import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/applicationModel";
import Job from "@/models/jobModel";
import User from "@/models/userModel";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    // Get clientId from query or cookies
    const clientId = req.nextUrl.searchParams.get("clientId");
    if (!clientId) {
      return NextResponse.json({ error: "Missing clientId" }, { status: 400 });
    }

    // Get all jobs for this client
    const jobs = await Job.find({ clientId }).select("_id title").lean();
    const jobIds = jobs.map((job: any) => job._id);

    // Get recent applications for these jobs
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .sort({ appliedAt: -1 })
      .limit(10)
      .populate("freelancerId", "name")
      .populate("jobId", "title")
      .lean();
    const totalApplications = applications.length;

    // Format for frontend
    const formatted = applications.map((app: any) => ({
      _id: app._id,
      jobTitle: app.jobId?.title || "Job",
      freelancerName: app.freelancerId?.name || "Freelancer",
      appliedAt: app.appliedAt,
    }));

    return NextResponse.json({
      applications: formatted,
      totalApplications,
    });
  } catch (error) {
    console.error("Error fetching recent applications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
