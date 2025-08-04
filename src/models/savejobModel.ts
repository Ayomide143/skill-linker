import mongoose, { Schema } from "mongoose";

const saveJobSchema = new Schema(
    {
        jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
        freelancerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        savedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);
const SaveJob = mongoose.models.SaveJob || mongoose.model("SaveJob", saveJobSchema);
export default SaveJob;