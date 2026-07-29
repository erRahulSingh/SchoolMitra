// ═══════════════════════════════════════════════════════════
// SchoolMitra — Module 7: Communication Collections (7)
// ═══════════════════════════════════════════════════════════

import { Schema, model } from "mongoose";

// ──────────── 44. NOTIFICATIONS ────────────
const notificationSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  recipientId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
  },
  recipientRole: {
    type: String,
    enum: ["SchoolAdmin", "Teacher", "Parent", "Driver", "SuperAdmin"],
  },
  title: {
    type: String,
    required: [true, "Notification title is required"],
    trim: true,
  },
  body: {
    type: String,
    required: [true, "Notification body is required"],
    trim: true,
  },
  type: {
    type: String,
    enum: ["Attendance", "Fee", "Transport", "Academic", "Announcement", "Emergency", "System"],
    default: "System",
  },
  actionUrl: { type: String, trim: true },
  read: { type: Boolean, default: false, index: true },
  readAt: { type: Date },
}, { timestamps: true });

notificationSchema.index({ schoolId: 1, recipientId: 1, read: 1 });
export const NotificationModel = model("notifications", notificationSchema);

// ──────────── 45. ANNOUNCEMENTS ────────────
const announcementSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, "Announcement title is required"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Announcement content is required"],
    trim: true,
  },
  targetAudience: {
    type: String,
    enum: ["All", "Parents", "Teachers", "Students", "Staff"],
    default: "All",
    index: true,
  },
  targetClasses: [{
    type: Schema.Types.ObjectId,
    ref: "classes",
  }],
  priority: {
    type: String,
    enum: ["Low", "Normal", "High", "Urgent"],
    default: "Normal",
  },
  attachments: [{
    fileName: { type: String },
    fileUrl: { type: String },
  }],
  publishedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    enum: ["Draft", "Published", "Archived"],
    default: "Published",
  },
}, { timestamps: true });

announcementSchema.index({ schoolId: 1, targetAudience: 1 });
export const AnnouncementModel = model("announcements", announcementSchema);

// ──────────── 46. CHAT ROOMS ────────────
const chatRoomSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  name: { type: String, trim: true },
  type: {
    type: String,
    enum: ["Direct", "Group", "ClassGroup", "TeacherParent", "StaffGroup"],
    default: "Direct",
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  }],
  isGroup: { type: Boolean, default: false },
  lastMessage: { type: String, trim: true },
  lastMessageAt: { type: Date, default: Date.now },
}, { timestamps: true });

chatRoomSchema.index({ schoolId: 1, participants: 1 });
export const ChatRoomModel = model("chatRooms", chatRoomSchema);

// ──────────── 47. MESSAGES ────────────
const messageSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "chatRooms",
    required: true,
    index: true,
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  text: { type: String, trim: true },
  attachments: [{
    fileName: { type: String },
    fileUrl: { type: String },
    fileType: { type: String },
  }],
  readBy: [{
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    readAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

messageSchema.index({ roomId: 1, createdAt: -1 });
export const MessageModel = model("messages", messageSchema);

// ──────────── 48. EMAIL LOGS ────────────
const emailLogSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    index: true,
  },
  to: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  body: { type: String },
  status: {
    type: String,
    enum: ["Sent", "Failed", "Pending"],
    default: "Pending",
  },
  provider: { type: String, default: "SendGrid" },
  messageId: { type: String, trim: true },
  errorMessage: { type: String },
}, { timestamps: true });

emailLogSchema.index({ schoolId: 1, status: 1 });
export const EmailModel = model("emails", emailLogSchema);

// ──────────── 49. SMS LOGS ────────────
const smsLogSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    index: true,
  },
  phone: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ["Sent", "Failed", "Pending", "Delivered"],
    default: "Pending",
  },
  provider: { type: String, default: "Twilio" },
  sid: { type: String, trim: true },
  cost: { type: Number, default: 0 },
}, { timestamps: true });

smsLogSchema.index({ schoolId: 1, status: 1 });
export const SMSLogModel = model("smsLogs", smsLogSchema);

// ──────────── 50. PUSH NOTIFICATION LOGS ────────────
const pushLogSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    index: true,
  },
  recipientId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  fcmToken: { type: String, required: true },
  payload: { type: Schema.Types.Mixed },
  status: {
    type: String,
    enum: ["Sent", "Failed"],
    default: "Sent",
  },
  responseMessage: { type: String },
}, { timestamps: true });

pushLogSchema.index({ schoolId: 1, status: 1 });
export const PushLogModel = model("pushLogs", pushLogSchema);

// ──────────── 51. SUPPORT REQUESTS ────────────
const requestSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
    required: true,
    index: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Attendance Issue",
      "Leave Application",
      "Fee & Payment Issue",
      "Exam & Report Card",
      "Homework",
      "Bus / Transport",
      "Student Information",
      "Complaint",
      "Suggestion",
      "General Inquiry"
    ],
    index: true,
  },
  subject: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Urgent"],
    default: "Medium",
    index: true,
  },
  status: {
    type: String,
    enum: ["Submitted", "Under Review", "In Progress", "Waiting For Parent", "Resolved", "Closed"],
    default: "Submitted",
    index: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
}, { timestamps: true });

requestSchema.index({ schoolId: 1, parentId: 1, status: 1 });
export const RequestModel = model("requests", requestSchema);

// ──────────── 52. REQUEST MESSAGES THREAD ────────────
const requestMessageSchema = new Schema({
  requestId: {
    type: Schema.Types.ObjectId,
    ref: "requests",
    required: true,
    index: true,
  },
  senderRole: {
    type: String,
    enum: ["Parent", "SchoolAdmin", "Teacher"],
    required: true,
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  message: { type: String, required: true, trim: true },
  attachments: [{
    fileName: { type: String },
    fileUrl: { type: String },
    fileSize: { type: String },
    mimeType: { type: String },
  }],
}, { timestamps: true });

requestMessageSchema.index({ requestId: 1, createdAt: 1 });
export const RequestMessageModel = model("request_messages", requestMessageSchema);

