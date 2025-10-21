import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email } = await req.json();
    console.log("Received email for password reset:", email);
    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "No user found with this email." },
        { status: 404 }
      );
    }

    // Generate a password reset token
    const resetSecret = process.env.RESET_TOKEN;
    if (!resetSecret) {
      console.error("RESET_TOKEN is not set in environment variables.");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }
    const resetToken = jwt.sign({ id: user.id, email: user.email }, resetSecret);
    const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

    // Save the token and expiry to the user's record
    const userDoc: any = user;
    userDoc.resetPasswordToken = resetToken;
    userDoc.resetPasswordExpires = resetTokenExpiry;
    await userDoc.save();

    const resetUrl = `${process.env.BASE_URL}/auth/forgot-password?token=${resetToken}`;

    // Send the password reset email
    const transporter = nodemailer.createTransport({
      service: "Gmail", 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: `"Skill Linker" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hello,</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetUrl}" target="_blank">${resetUrl}</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thanks,</p>
        <p>The Skill Linker Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Password reset email sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in forgot password route:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}


// TODO: email is not gotten to the backend and also email template improvements 