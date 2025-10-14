import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/applicationModel";
import interviewRequest from "@/models/interviewRequestModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const freelancerId = getDataFromToken(req);
    if (!freelancerId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const applications = await Application.find({ freelancerId })
      .sort({ appliedAt: -1 })
      .populate("jobId", "title coverLetter status")
      .lean();
    // Format for frontend
    const formatted = applications.map((app: any) => ({
      _id: app._id,
      jobId: app.jobId._id,
      jobTitle: app.jobId.title,
      coverLetter: app.coverLetter,
      status: app.status,
      appliedAt: app.appliedAt,
    }));
    const interviewRequests = await interviewRequest
      .find({
        freelancerId,
        jobId: { $in: applications.map((app) => app.jobId._id) },
      })
      .populate("jobId", "title status")
      .lean();
    // Format interview requests
    const formattedInterviewRequests = interviewRequests.map((req: any) => ({
      _id: req._id,
      jobId: req.jobId._id,
      jobTitle: req.jobId.title,
      status: req.status,
    }));

    return NextResponse.json(
      {
        applications: formatted,
        interviewRequests: formattedInterviewRequests,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
