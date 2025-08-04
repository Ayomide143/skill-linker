import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/models/jobModel";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { jobId } = await req.json();
    if (!jobId) {
      return NextResponse.json({ error: "Missing jobId" }, { status: 400 });
    }
    // Mark job as completed
    await Job.findByIdAndUpdate(jobId, { status: "completed" });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error marking job as completed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
