import {NextResponse, NextRequest} from 'next/server';
import {connectDB} from '@/lib/db';
import saveJob from '@/models/savejobModel';
import {getDataFromToken} from '@/helpers/getDataFromToken';

// Handle DELETE request: Remove a saved job
export async function DELETE(req: NextRequest) {
  await connectDB();
  try {
    const freelancerId = getDataFromToken(req);
    const body = await req.json();
    const { savedJobId } = body;
    console.error("Deleting job with ID:", savedJobId, "for freelancer:", freelancerId);

    if (!freelancerId || !savedJobId) {
      return NextResponse.json(
        { error: "Freelancer ID and job ID are required" },
        { status: 400 }
      );
    }

    const deleted = await saveJob.findOneAndDelete({ freelancerId, savedJobId });

    if (!deleted) {
      return NextResponse.json(
        { error: "Saved job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Job removed from saved list" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing saved job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
