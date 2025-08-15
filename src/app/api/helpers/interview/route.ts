import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/applicationModel";
import InterviewRequest from "@/models/interviewRequestModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(req: NextRequest) {
  await connectDB();
  const clientId = getDataFromToken(req);
  const { jobId, freelancerId } = await req.json();
  if (!jobId || !freelancerId || !clientId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const application = await Application.findOneAndUpdate(
    { jobId, freelancerId },
    { status: "interviewing" },
    { new: true }
  );
  const interviewRequest = await InterviewRequest.create({
    clientId,
    freelancerId: application?.freelancerId,
    jobId: application?.jobId,
    status: "pending",
  });
  if (!interviewRequest) {
    return NextResponse.json({ error: "Failed to create interview request" }, { status: 500 });
  }
  return NextResponse.json({
    success: true,
    interviewRequest,
    application
  });
}