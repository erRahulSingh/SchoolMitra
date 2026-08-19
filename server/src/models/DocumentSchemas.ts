// ═══════════════════════════════════════════════════════════
// SchoolMitra — Module 13: Document & Certificate Schemas
// ═══════════════════════════════════════════════════════════

import { Schema, model, models } from "mongoose";

// ──────────── STUDENT DOCUMENTS ────────────
const studentDocumentSchema = new Schema({
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
  title: {
    type: String,
    required: [true, "Document title is required"],
    trim: true,
  },
  category: {
    type: String,
    enum: [
      "Aadhaar / ID",
      "Birth Certificate",
      "Transfer Certificate",
      "Previous Marksheet",
      "Address Proof",
      "Passport Photo",
      "Other"
    ],
    default: "Other",
    required: true,
    index: true,
  },
  documentType: {
    type: String,
    enum: ["PDF", "IMAGE", "DOCX", "OTHER"],
    default: "PDF",
  },
  fileUrl: {
    type: String,
    required: [true, "File URL is required"],
    trim: true,
  },
  fileSize: {
    type: String,
    default: "1.2 MB",
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  verificationStatus: {
    type: String,
    enum: ["Verified", "Pending", "Rejected"],
    default: "Verified",
    index: true,
  },
  issueDate: {
    type: Date,
  },
  expiryDate: {
    type: Date,
    index: true,
  },
  notes: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

studentDocumentSchema.index({ schoolId: 1, studentId: 1, category: 1 });
export const StudentDocumentModel = models.studentDocuments || model("studentDocuments", studentDocumentSchema);

// ──────────── TEACHER & STAFF DOCUMENTS ────────────
const teacherDocumentSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "teachers",
    required: true,
    index: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    index: true,
  },
  title: {
    type: String,
    required: [true, "Document title is required"],
    trim: true,
  },
  category: {
    type: String,
    enum: [
      "Photo",
      "ID Proof",
      "Qualification Certificate",
      "Experience Certificate",
      "Joining Document",
      "Other"
    ],
    default: "Other",
    required: true,
    index: true,
  },
  documentType: {
    type: String,
    enum: ["PDF", "IMAGE", "DOCX", "OTHER"],
    default: "PDF",
  },
  fileUrl: {
    type: String,
    required: [true, "File URL is required"],
    trim: true,
  },
  fileSize: {
    type: String,
    default: "1.5 MB",
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  verificationStatus: {
    type: String,
    enum: ["Verified", "Pending", "Rejected"],
    default: "Verified",
    index: true,
  },
  issueDate: {
    type: Date,
  },
  expiryDate: {
    type: Date,
    index: true,
  },
  notes: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

teacherDocumentSchema.index({ schoolId: 1, teacherId: 1, category: 1 });
export const TeacherDocumentModel = models.teacherDocuments || model("teacherDocuments", teacherDocumentSchema);
