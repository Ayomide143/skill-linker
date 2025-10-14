import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  freelancerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  coverLetter: { type: String, required: true },
  status: { type: String, enum: ["pending", "interviewing", "accepted", "rejected"], default: "pending" },
  appliedAt: { type: Date, default: Date.now },
});

const Application = mongoose.models.Application || mongoose.model("Application", applicationSchema);
export default Application;