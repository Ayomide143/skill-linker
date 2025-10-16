import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/userModel";

// Backend route to fetch admin details
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Fetch the admin user details (replace with your logic)
    const admin = await User.findOne({ role: "admin" }).select("username email role");

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({
      username: admin.username,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    console.error("Error fetching admin details:", error);
    return NextResponse.json({ error: "Failed to fetch admin details" }, { status: 500 });
  }
}