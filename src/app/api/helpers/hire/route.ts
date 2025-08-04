import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/applicationModel";
import Job from "@/models/jobModel";

export async function POST(req: NextRequest) {
  await connectDB();
  const { jobId, freelancerId } = await req.json();
  if (!jobId || !freelancerId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  // Mark application as accepted
  await Application.findOneAndUpdate(
    { jobId, freelancerId },
    { status: "accepted" }
  );
  // Set all other applications for this job as rejected
  await Application.updateMany(
    { jobId, freelancerId: { $ne: freelancerId } },
    { status: "rejected" }
  );
  // Update job status
  await Job.findByIdAndUpdate(jobId, { status: "in-progress" });
  return NextResponse.json({ success: true });
}