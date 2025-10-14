import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Conversation from "@/models/conversationModel";
import InterviewRequest from "@/models/interviewRequestModel";
import { generateChatId } from "@/helpers/generateChatId";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { interviewRequestId } = await req.json();

    if (!interviewRequestId) {
      return NextResponse.json(
        { error: "Missing interviewRequestId" },
        { status: 400 }
      );
    }

    interface InterviewRequestType {
      _id: string;
      freelancerId: string;
      clientId: string;
      [key: string]: any;
    }

    // Fetch the interview request
    const interviewRequest = await InterviewRequest.findById(interviewRequestId).lean() as InterviewRequestType | null;

    if (!interviewRequest) {
      return NextResponse.json(
        { error: "Interview request not found" },
        { status: 404 }
      );
    }

    const { freelancerId, clientId } = interviewRequest;

    // Generate the chat ID
    const chatId = generateChatId(freelancerId, clientId);

    // Check if the chat room already exists
    let chatRoom = await Conversation.findOne({ chatId });

    if (!chatRoom) {
      // Create a new chat room
      chatRoom = await Conversation.create({
        chatId,
        participants: [freelancerId, clientId],
      });
    }

    return NextResponse.json({ success: true, chatId: chatRoom.chatId });
  } catch (error) {
    console.error("Error creating chat room:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}