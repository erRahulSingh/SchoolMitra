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
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "users",
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
    alias: "message",
  },
  type: {
    type: String,
    enum: [
      "Attendance", "Fee", "Transport", "Academic", "Announcement", "Emergency", "System",
      "HOMEWORK", "EXAM", "RESULT", "REPORT_CARD", "FEE", "TRANSPORT", "ANNOUNCEMENT", "MESSAGE"
    ],
    default: "System",
    index: true,
  },
  referenceType: { type: String, trim: true },
  referenceId: { type: Schema.Types.ObjectId, index: true },
  actionUrl: { type: String, trim: true },
  priority: {
    type: String,
    enum: ["LOW", "NORMAL", "HIGH", "URGENT"],
    default: "NORMAL"
  },
  read: { type: Boolean, default: false, index: true, alias: "isRead" },
  readAt: { type: Date },
}, { timestamps: true });

notificationSchema.index({ schoolId: 1, recipientId: 1, createdAt: -1 });
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
    alias: "description",
  },
  targetAudience: {
    type: String,
    enum: ["All", "Parents", "Teachers", "Students", "Staff", "All Parents", "All Teachers", "Specific Class", "Specific Section", "Specific Teacher", "ALL_TEACHERS", "ALL_PARENTS", "ALL_USERS", "CLASS", "SECTION", "SPECIFIC_TEACHERS"],
    default: "All",
    index: true,
    alias: "audienceType",
  },
  targetClasses: [{
    type: Schema.Types.ObjectId,
    ref: "classes",
    alias: "targetClassIds",
  }],
  targetSections: [{
    type: Schema.Types.ObjectId,
    ref: "sections",
    alias: "targetSectionIds",
  }],
  targetUserIds: [{
    type: Schema.Types.ObjectId,
    ref: "users",
  }],
  targetTeacher: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  priority: {
    type: String,
    enum: ["Low", "Normal", "High", "Urgent", "LOW", "NORMAL", "HIGH", "URGENT"],
    default: "Normal",
  },
  attachment: {
    type: String,
  },
  attachments: [{
    fileName: { type: String },
    fileUrl: { type: String },
  }],
  publishedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    alias: "createdBy",
  },
  publishDate: {
    type: Date,
    default: Date.now,
    alias: "publishAt",
  },
  expiryDate: {
    type: Date,
    alias: "expiresAt",
  },
  status: {
    type: String,
    enum: ["Draft", "Published", "Archived", "Scheduled"],
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
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
  },
  isGroup: { type: Boolean, default: false },
  lastMessage: { type: String, trim: true },
  lastMessageAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Active", "Archived"],
    default: "Active",
  },
}, { timestamps: true });

chatRoomSchema.index({ schoolId: 1, participants: 1 });
export const ChatRoomModel = model("chatRooms", chatRoomSchema);

// ──────────── 47. MESSAGES ────────────
const messageSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    index: true,
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "chatRooms",
    required: true,
    index: true,
    alias: "conversationId",
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  text: { type: String, trim: true, alias: "message" },
  attachments: [{
    fileName: { type: String },
    fileUrl: { type: String },
    fileType: { type: String },
  }],
  read: { type: Boolean, default: false, alias: "isRead" },
  readAt: { type: Date },
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

// ──────────── 52. DEVICE TOKENS ────────────
const deviceTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
  },
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
  },
  deviceId: {
    type: String,
    required: true,
    trim: true,
  },
  platform: {
    type: String,
    enum: ["android", "ios", "web"],
    default: "android",
  },
  pushToken: {
    type: String,
    required: true,
    trim: true,
    alias: "token",
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
  lastUsedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

deviceTokenSchema.index({ userId: 1, deviceId: 1 }, { unique: true });
export const DeviceTokenModel = model("deviceTokens", deviceTokenSchema);

// ──────────── 53. CIRCULARS ────────────
const circularSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  title: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
  attachments: [{
    fileName: { type: String, trim: true },
    fileUrl: { type: String, trim: true },
    fileType: { type: String, trim: true },
    fileSize: { type: String, trim: true }
  }],
  targetAudience: {
    type: String,
    enum: ["All Parents", "All Teachers", "Specific Class"],
    default: "All Parents"
  },
  targetClassId: {
    type: Schema.Types.ObjectId,
    ref: "classes"
  },
  status: {
    type: String,
    enum: ["Published", "Draft", "Archived"],
    default: "Published"
  },
  readBy: [{
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    readAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

circularSchema.index({ schoolId: 1, targetAudience: 1, createdAt: -1 });
export const CircularModel = model("circulars", circularSchema);

// ──────────── 54. EMERGENCY BROADCASTS ────────────
const emergencyBroadcastSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  emergencyType: {
    type: String,
    enum: ["School Closure", "Bus Emergency", "Weather Warning", "Urgent Notice"],
    required: true,
  },
  title: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  targetAudience: {
    type: String,
    enum: ["All", "Parents", "Teachers", "Drivers"],
    default: "All"
  },
  dispatchedCount: { type: Number, default: 0 },
}, { timestamps: true });

emergencyBroadcastSchema.index({ schoolId: 1, createdAt: -1 });
export const EmergencyBroadcastModel = model("emergency_broadcasts", emergencyBroadcastSchema);

// ──────────── 55. NOTIFICATION PREFERENCES ────────────
const notificationPreferenceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
    unique: true,
  },
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
  },
  homework: { type: Boolean, default: true },
  assignments: { type: Boolean, default: true },
  exam: { type: Boolean, default: true, alias: "exams" },
  results: { type: Boolean, default: true },
  announcements: { type: Boolean, default: true },
  fees: { type: Boolean, default: true },
  busTracking: { type: Boolean, default: true, alias: "bus" },
  teacherMessages: { type: Boolean, default: true, alias: "messages" },
}, { timestamps: true });

export const NotificationPreferenceModel = model("notification_preferences", notificationPreferenceSchema);

// -----------------------------------------------------------
// Gallery & Event Media Schemas
// -----------------------------------------------------------

const galleryAlbumSchema = new Schema({
  schoolId: { type: Schema.Types.ObjectId, ref: "schools", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
  title: { type: String, required: true },
  description: { type: String },
  coverPhoto: { type: String },
  eventDate: { type: Date },
  visibility: { type: String, enum: ["All", "SpecificClasses", "StaffOnly"], default: "All" },
  classes: [{ type: Schema.Types.ObjectId, ref: "classes" }]
}, { timestamps: true });

galleryAlbumSchema.index({ schoolId: 1, visibility: 1 });
export const GalleryAlbumModel = model("gallery_albums", galleryAlbumSchema);

const galleryMediaSchema = new Schema({
  schoolId: { type: Schema.Types.ObjectId, ref: "schools", required: true },
  albumId: { type: Schema.Types.ObjectId, ref: "gallery_albums", required: true },
  uploadedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
  mediaType: { type: String, enum: ["Image", "Video"], default: "Image" },
  url: { type: String, required: true },
  caption: { type: String }
}, { timestamps: true });

galleryMediaSchema.index({ schoolId: 1, albumId: 1 });
export const GalleryMediaModel = model("gallery_media", galleryMediaSchema);
