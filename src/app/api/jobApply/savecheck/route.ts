import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import saveJob from "@/models/savejobModel";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  const { jobId, freelancerId } = await request.json();
  if (!jobId || !freelancerId) {
    return NextResponse.json({ applied: false });
  }
  await connectDB();
  const jobObjectId = new mongoose.Types.ObjectId(jobId);
  const freelancerObjectId = new mongoose.Types.ObjectId(freelancerId);
  const existing = await saveJob.findOne({
    jobId: jobObjectId,
    freelancerId: freelancerObjectId,
  });
  return NextResponse.json({ applied: !!existing });
}