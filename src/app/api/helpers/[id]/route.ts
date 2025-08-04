import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/models/jobModel";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    const {id}  = await params;
    if (!id) {
        return NextResponse.json({error: "Job ID is required"}, {status: 400});
    }
    await connectDB();
    try {
        const job = await Job.findById(id);
        if (!job) {
            return NextResponse.json({message: "Job not found"}, {status: 404});
        }
        return NextResponse.json(job, {status: 200});
        
    } catch (error) {
        console.error("Error fetching job details:", error);
        return NextResponse.json({error: "Failed to fetch job details"}, {status: 500});
        
    }
}