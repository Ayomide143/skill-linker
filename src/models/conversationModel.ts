import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  interviewRequestId: {type: mongoose.Schema.Types.ObjectId, ref: 'InterviewRequest'},
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema);
export default Conversation;