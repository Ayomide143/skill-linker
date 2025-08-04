import {NextResponse, NextRequest} from "next/server";
import {connectDB} from "@/lib/db";
import saveJob from "@/models/savejobModel";


export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const {jobId, freelancerId} = await req.json();
    
        if (!jobId || !freelancerId) {
        return NextResponse.json({error: "Job ID and Freelancer ID are required"}, {status: 400});
        }
    
        // Check if the job is already saved by this freelancer
        const existingSave = await saveJob.findOne({jobId, freelancerId});
        if (existingSave) {
        return NextResponse.json({message: "Job already saved"}, {status: 200});
        }
    
        // Save the job
        const newSave = new saveJob({jobId, freelancerId});
        await newSave.save();
    
        return NextResponse.json({message: "Job saved successfully"}, {status: 201});
    } catch (error) {
        console.error("Error saving job:", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}