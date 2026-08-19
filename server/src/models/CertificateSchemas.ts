// ═══════════════════════════════════════════════════════════
// SchoolMitra — Module 14: Certificate & Template Schemas
// ═══════════════════════════════════════════════════════════

import { Schema, model, models } from "mongoose";

// ──────────── 1. CERTIFICATE TEMPLATES ────────────
const certificateTemplateSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  templateName: {
    type: String,
    required: [true, "Template name is required"],
    trim: true,
  },
  certificateType: {
    type: String,
    enum: [
      "Transfer Certificate",
      "Bonafide Certificate",
      "Character Certificate",
      "Study Certificate",
      "Migration Certificate",
      "Leaving Certificate",
      "Achievement Certificate",
      "Custom Certificate"
    ],
    default: "Bonafide Certificate",
    required: true,
    index: true,
  },
  headerTitle: {
    type: String,
    default: "BONAFIDE CERTIFICATE",
    trim: true,
  },
  bodyContent: {
    type: String,
    required: [true, "Body content template is required"],
  },
  footerText: {
    type: String,
    default: "Principal / Authorized Registrar",
    trim: true,
  },
  logoUrl: {
    type: String,
    trim: true,
  },
  borderStyle: {
    type: String,
    enum: ["Classic Gold", "Royal Blue", "Emerald Minimal", "Fancy Ribbon"],
    default: "Classic Gold",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

certificateTemplateSchema.index({ schoolId: 1, certificateType: 1 });
export const CertificateTemplateModel = models.certificateTemplates || model("certificateTemplates", certificateTemplateSchema);

// ──────────── 2. ISSUED CERTIFICATES ────────────
const issuedCertificateSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  certificateNo: {
    type: String,
    required: [true, "Certificate number is required"],
    unique: true, // CRITICAL: Strict unique constraint to prevent duplicate certificate numbers
    index: true,
    trim: true,
    uppercase: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "students",
    index: true,
  },
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  fatherName: {
    type: String,
    trim: true,
  },
  className: {
    type: String,
    trim: true,
  },
  section: {
    type: String,
    trim: true,
  },
  rollNumber: {
    type: String,
    trim: true,
  },
  academicYear: {
    type: String,
    default: "2026-2027",
    trim: true,
  },
  certificateType: {
    type: String,
    required: true,
    trim: true,
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
  templateId: {
    type: Schema.Types.ObjectId,
    ref: "certificateTemplates",
  },
  populatedContent: {
    type: String,
    required: true,
  },
  issuedBy: {
    type: String,
    default: "School Registrar",
  },
  status: {
    type: String,
    enum: ["ISSUED", "REVOKED"],
    default: "ISSUED",
    index: true,
  },
}, { timestamps: true });

issuedCertificateSchema.index({ schoolId: 1, certificateNo: 1 });
export const IssuedCertificateModel = models.issuedCertificates || model("issuedCertificates", issuedCertificateSchema);
