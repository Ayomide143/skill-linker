import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/userModel";

export async function GET(req: NextRequest) {
  await connectDB();

  const client = await User.findOne({ role: "client" }).select("name email").lean();

  if (!client) {
    return NextResponse.json({ name: "Client", email: "" });
  }

  return NextResponse.json({ name: client.name, email: client.email });
}