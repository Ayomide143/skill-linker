import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import saveJob from "@/models/savejobModel";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { jobId, freelancerId } = await req.json();

    if (!jobId || !freelancerId) {
      return NextResponse.json(
        { error: "Job ID and Freelancer ID are required" },
        { status: 400 }
      );
    }

    const existingSave = await saveJob.findOne({ jobId, freelancerId });
    if (existingSave) {
      await saveJob.deleteOne({ _id: existingSave._id });
      return NextResponse.json({ message: "Job unsaved successfully" });
    } else {
      await saveJob.create({ jobId, freelancerId });
      return NextResponse.json({ message: "Job saved successfully" });
    }
  } catch (error) {
    console.error("Error saving job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
