import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/userModel";

// GET: Fetch all users
export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}, "name role isBlocked")
      .lean()
      .select({ _id: 1, name: 1, role: 1, isBlocked: 1 }) 
      .exec();

    const formattedUsers = users.map((user) => ({
      id: user._id.toString(), // Convert _id to string and rename to id
      name: user.name,
      role: user.role,
      isBlocked: user.isBlocked,
    }));

    return NextResponse.json({ users: formattedUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}