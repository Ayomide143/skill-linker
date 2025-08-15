import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import InterviewRequest from "@/models/interviewRequestModel";


export async function POST(req: NextRequest) {
  await connectDB();
  const { interviewRequestId } = await req.json();
    if (!interviewRequestId) {
    return NextResponse.json({ error: "Missing interviewRequestId" }, { status: 400 });
  }
    try {
    const interviewRequest = await InterviewRequest.findById(interviewRequestId);
    if (!interviewRequest) {
      return NextResponse.json({ error: "Interview request not found" }, { status: 404 });
    }
    interviewRequest.status = "accepted";
    await interviewRequest.save();
    return NextResponse.json({ success: true, interviewRequest }, { status: 200 });
  } catch (error) {
    console.error("Error accepting interview request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}