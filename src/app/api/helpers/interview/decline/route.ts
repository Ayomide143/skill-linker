import { NextRequest, NextResponse } from "next/server";
import InterviewRequest from "@/models/interviewRequestModel";
import Application from "@/models/applicationModel"; 
import { connectDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { interviewRequestId } = await req.json();

    if (!interviewRequestId) {
      return NextResponse.json(
        { error: "Missing interviewRequestId" },
        { status: 400 }
      );
    }

    // Find and update the interview request
    const updatedRequest = await InterviewRequest.findByIdAndUpdate(
      interviewRequestId,
      { status: "rejected" },
      { new: true }
    );

    if (!updatedRequest) {
      return NextResponse.json(
        { error: "Interview request not found" },
        { status: 404 }
      );
    }

    // Update the corresponding application status
    const updatedApplication = await Application.findOneAndUpdate(
      { jobId: updatedRequest.jobId, freelancerId: updatedRequest.freelancerId },
      { status: "rejected" },
      { new: true }
    );

    if (!updatedApplication) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      updatedRequest,
      updatedApplication,
    });
  } catch (error) {
    console.error("Error declining interview:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


