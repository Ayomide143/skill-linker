import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

// POST: Create a new admin user
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, username, email, country, phone, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Admin user already exist, please login." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new User({
      name,
      username,
      email,
      country,
      phone,
      password: hashedPassword,
      role: "admin", 
    });

    await newAdmin.save();

    return NextResponse.json(
      { message: "Admin user created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating admin user:", error);
    return NextResponse.json(
      { error: "Failed to create admin user." },
      { status: 500 }
    );
  }
}