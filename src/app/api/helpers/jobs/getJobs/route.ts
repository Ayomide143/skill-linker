import {NextResponse, NextRequest} from 'next/server';
import {connectDB} from '@/lib/db';
import Job from '@/models/jobModel';

export async function GET(request: NextRequest) {
    await connectDB();
    try {
        const jobs = await Job.find().sort({createdAt: -1}); // Fetch all jobs sorted by creation date in descending order
        if (!jobs || jobs.length === 0) {
            return NextResponse.json({message: "No jobs found"}, {status: 404});
        }
        return NextResponse.json(jobs, {status: 200});
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({error: "Failed to fetch jobs"}, {status: 500});
    }
}