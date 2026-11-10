import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  location: { type: String, required: true },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
  },
  status: {
    type: String,
    enum: ["Applied", "Interview", "Offer Received", "Rejected"],
    default: "Applied",
  },
  appliedDate: { type: Date, default: Date.now },
  jobUrl: { type: String, required: true },
  description: { type: String },
  note: { type: String },
});

export default mongoose.model("Application", applicationSchema);
