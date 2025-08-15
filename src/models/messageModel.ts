import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: { type: String, required: true },
  isSeen: { type: Boolean, default: false},
  timestamp: { type: Date, default: Date.now },
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
});

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
export default Message;