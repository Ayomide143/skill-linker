import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/userModel";

// In a real app, get clientId from auth/session
export async function GET(req: NextRequest) {
  await connectDB();

  // Example: get the first client (replace with real logic)
  const client = await User.findOne({ role: "client" }).select("name email").lean();

  if (!client) {
    return NextResponse.json({ name: "Client", email: "" });
  }

  return NextResponse.json({ name: client.name, email: client.email });
}