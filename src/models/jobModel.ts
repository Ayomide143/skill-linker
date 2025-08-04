import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        tags: { type: [String], required: true },
        company: { type: String },
        budget: { type: Number, required: true },
        posted: { type: Date, default: Date.now },
        type: { type: String, enum: ["full-time", "remote", "contract"], required: true },
        location: { type: String, required: true },
        status: { type: String, enum: ["open", "in-progress", "completed", "cancelled"], default: "open" },
    },
    { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default Job;