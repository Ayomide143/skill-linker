import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Job from "@/models/jobModel";

export async function GET(request: NextRequest) {
    await connectDB();
    try {
        const userId = getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const job = await Job.find({ clientId: userId, status: "open" });

        if (!job) {
            return NextResponse.json({ error: "Job not found or you do not have permission to view it" }, { status: 404 });
        }

        return NextResponse.json(job);
        
    } catch (error) {
        console.error("Error fetching job:", error);
        return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
    }
}