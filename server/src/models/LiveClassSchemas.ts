import mongoose, { Schema, Document } from "mongoose";

export interface ILiveClass extends Document {
  schoolId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;
  classId: string;
  sectionId: string;
  subject: string;
  topic: string;
  meetingLink: string;
  meetingPlatform: "Zoom" | "GoogleMeet" | "WebRTC";
  meetingId: string;
  meetingPassword?: string;
  startTime: Date;
  endTime: Date;
  status: "Scheduled" | "Ongoing" | "Completed" | "Cancelled";
  recordingUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LiveClassSchema = new Schema<ILiveClass>(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: "School", required: true, index: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
    classId: { type: String, required: true },
    sectionId: { type: String, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    meetingLink: { type: String, required: true },
    meetingPlatform: { type: String, enum: ["Zoom", "GoogleMeet", "WebRTC"], default: "Zoom" },
    meetingId: { type: String, required: true },
    meetingPassword: { type: String },
    startTime: { type: Date, required: true, index: true },
    endTime: { type: Date, required: true },
    status: { type: String, enum: ["Scheduled", "Ongoing", "Completed", "Cancelled"], default: "Scheduled" },
    recordingUrl: { type: String },
  },
  { timestamps: true }
);

export const LiveClass = mongoose.model<ILiveClass>("LiveClass", LiveClassSchema);

export interface IMeetingAttendance extends Document {
  schoolId: mongoose.Types.ObjectId;
  liveClassId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  joinTime: Date;
  leaveTime?: Date;
  durationMinutes: number;
}

const MeetingAttendanceSchema = new Schema<IMeetingAttendance>(
  {
    schoolId: { type: Schema.Types.ObjectId, ref: "School", required: true },
    liveClassId: { type: Schema.Types.ObjectId, ref: "LiveClass", required: true, index: true },
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    joinTime: { type: Date, required: true, default: Date.now },
    leaveTime: { type: Date },
    durationMinutes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Compound index to ensure one attendance record per student per class session
MeetingAttendanceSchema.index({ liveClassId: 1, studentId: 1 }, { unique: true });

export const MeetingAttendance = mongoose.model<IMeetingAttendance>("MeetingAttendance", MeetingAttendanceSchema);
