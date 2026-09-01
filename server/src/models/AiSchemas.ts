import { Schema, model } from "mongoose";

const aiDoubtSchema = new Schema({
  schoolId: { type: Schema.Types.ObjectId, ref: "schools", required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "students", required: true },
  promptText: { type: String },
  mediaUrl: { type: String }, // Can be image URL or audio URL
  mediaType: { type: String, enum: ["none", "image", "audio"], default: "none" },
  aiResponse: { type: String, required: true },
  subject: { type: String }, // Auto-categorized by AI
  tokensUsed: { type: Number, default: 0 },
}, { timestamps: true });

// Index to quickly fetch a student's doubts for the day
aiDoubtSchema.index({ studentId: 1, createdAt: -1 });

// TTL Index: Automatically delete doubts older than 6 months (approx 15.5 million seconds)
aiDoubtSchema.index({ createdAt: 1 }, { expireAfterSeconds: 15552000 });

export const AiDoubtModel = model("aiDoubts", aiDoubtSchema);

const doubtTicketSchema = new Schema({
  schoolId: { type: Schema.Types.ObjectId, ref: "schools", required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "students", required: true },
  aiDoubtId: { type: Schema.Types.ObjectId, ref: "aiDoubts" },
  subject: { type: String },
  chatHistory: { type: Array, default: [] },
  status: { type: String, enum: ["OPEN", "RESOLVED"], default: "OPEN" },
  teacherReply: { type: String }
}, { timestamps: true });

export const DoubtTicketModel = model("doubtTickets", doubtTicketSchema);
