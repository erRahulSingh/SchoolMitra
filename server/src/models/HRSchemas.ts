// ═══════════════════════════════════════════════════════════
// SchoolMitra — Module 9: HR Collections (3)
// ═══════════════════════════════════════════════════════════

import { Schema, model } from "mongoose";

// ──────────── LEAVE REQUESTS ────────────
const leaveRequestSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  applicantId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
  },
  applicantType: {
    type: String,
    enum: ["Teacher", "Staff", "Student"],
    default: "Teacher",
  },
  leaveType: {
    type: String,
    enum: ["Casual", "Medical", "Earned", "Maternity", "Paternity", "Unpaid"],
    default: "Casual",
  },
  reason: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalDays: { type: Number, required: true, min: 0.5 },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Cancelled"],
    default: "Pending",
    index: true,
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  rejectionReason: { type: String, trim: true },
}, { timestamps: true });

leaveRequestSchema.index({ schoolId: 1, applicantId: 1, status: 1 });
export const LeaveRequestModel = model("leaveRequests", leaveRequestSchema);

// ──────────── SALARY (Payroll Records) ────────────
const salarySchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
  },
  month: { type: String, required: true, trim: true }, // e.g. "2026-07"
  year: { type: Number, required: true },
  basicPay: { type: Number, required: true, min: 0 },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netSalary: { type: Number, required: true },
  paymentDate: { type: Date },
  paymentMode: {
    type: String,
    enum: ["BankTransfer", "Cheque", "Cash"],
    default: "BankTransfer",
  },
  status: {
    type: String,
    enum: ["Draft", "Processed", "Paid"],
    default: "Draft",
    index: true,
  },
  payslipUrl: { type: String },
}, { timestamps: true });

salarySchema.index({ schoolId: 1, staffId: 1, month: 1 }, { unique: true });
export const SalaryModel = model("salary", salarySchema);

// ──────────── STAFF DOCUMENTS ────────────
const staffDocumentSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
  },
  documentName: { type: String, required: true, trim: true },
  documentType: {
    type: String,
    enum: ["Aadhar", "PAN", "DegreeCertificate", "ExperienceLetter", "Resume", "Other"],
    default: "Other",
  },
  fileUrl: { type: String, required: true },
  verificationStatus: {
    type: String,
    enum: ["Pending", "Verified", "Rejected"],
    default: "Pending",
  },
}, { timestamps: true });

staffDocumentSchema.index({ schoolId: 1, staffId: 1 });
export const StaffDocumentModel = model("staffDocuments", staffDocumentSchema);
