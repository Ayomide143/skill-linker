import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/applicationModel";

export async function POST(req: NextRequest) {
  await connectDB();
  const { jobId, freelancerId } = await req.json();
  if (!jobId || !freelancerId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const application = await Application.findOneAndUpdate(
    { jobId, freelancerId },
    { status: "interviewing" },
    { new: true }
  );
  return NextResponse.json({ success: !!application });
}