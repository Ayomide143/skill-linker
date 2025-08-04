import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import saveJob from "@/models/savejobModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

// Handle POST request: Fetch saved jobs
export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const freelancerId = getDataFromToken(req);
    if (!freelancerId) {
      return NextResponse.json(
        { error: "Freelancer ID is required" },
        { status: 400 }
      );
    }

    const savedJobs = await saveJob.find({ freelancerId }).populate({
      path: "jobId",
      select: "title description",
    });

    const cleanedJobs = savedJobs.map((entry) => ({
      _id: entry._id,
      jobId: entry.jobId._id,
      title: entry.jobId.title,
      description: entry.jobId.description,
    }));

    return NextResponse.json(cleanedJobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

