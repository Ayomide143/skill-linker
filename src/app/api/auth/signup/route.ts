import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  await connectDB();

  const { name, username, email, country, phone, password, role } =
    await req.json();

  // Check if user already exists
  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const newUser = new User({
    name,
    username,
    email,
    country,
    phone,
    password: hashedPassword,
    role: role,
  });

  const user = await newUser.save();

  // Build response
  const response = NextResponse.json({
    message: "Signup successful",
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    },
    success: true,
  });
  return response;
}
