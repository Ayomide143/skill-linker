import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Job from "@/models/jobModel";

export async function POST(request: NextRequest) {
    await connectDB();
    try {
        const { title, description, budget, tags, company, type, location } = await request.json();
        const clientId = getDataFromToken(request);
    
        if (!title || !description || !budget || !tags || !type || !location) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        
        const newJob = new Job({
        title,
        description,
        clientId,
        budget,
        tags,
        company,
        type,
        location,
        });
    
        const savedJob = await newJob.save();
    
        return NextResponse.json(savedJob, { status: 201 });
    } catch (error) {
        console.error("Error creating job:", error);
        return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
    }
}