// ═══════════════════════════════════════════════════════════
// SchoolMitra — Module 1: Auth & Tenancy Collections (7)
// ═══════════════════════════════════════════════════════════

import { Schema, model, Types } from "mongoose";

// ──────────── 1. SCHOOLS (Tenant Root) ────────────
const schoolSchema = new Schema({
  code: {
    type: String,
    required: [true, "School code is required"],
    unique: true,
    index: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: [true, "School name is required"],
    trim: true,
    maxlength: 100,
  },
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  pincode: { type: String, trim: true },
  phone: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  website: { type: String, trim: true },
  domain: {
    type: String,
    unique: true,
    index: true,
    sparse: true,
    trim: true,
    lowercase: true,
  },
  logo: { type: String },
  primaryColor: { type: String, default: "#8b5cf6" },
  plan: {
    type: String,
    enum: ["Basic", "Growth", "Enterprise", "Standard", "Pro", "Custom"],
    default: "Basic",
  },
  status: {
    type: String,
    enum: ["Active", "Suspended", "Trial", "Expired", "PendingEmailVerification"],
    default: "Trial",
    index: true,
  },
  trialStartsAt: { type: Date, default: Date.now },
  trialEndsAt: {
    type: Date,
    default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
  maxStudents: { type: Number, default: 500 },
  maxBuses: { type: Number, default: 5 },
  enabledModules: {
    type: [String],
    default: ["dashboard", "students", "attendance", "fees", "transport"],
  },
}, { timestamps: true });

export const SchoolModel = model("schools", schoolSchema);

// ──────────── 2. BRANCHES ────────────
const branchSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: [true, "School ID is required"],
    index: true,
  },
  branchName: {
    type: String,
    required: [true, "Branch name is required"],
    trim: true,
  },
  branchCode: { type: String, trim: true, uppercase: true },
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  phone: { type: String, trim: true },
  isMain: { type: Boolean, default: false },
}, { timestamps: true });

branchSchema.index({ schoolId: 1, branchName: 1 }, { unique: true });
export const BranchModel = model("branches", branchSchema);

// ──────────── 3. USERS ────────────
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: 60,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
  },
  password: {
    type: String,
    required: function(this: any) { return !this.googleId; },
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true,
    index: true,
  },
  phone: { type: String, trim: true },
  avatar: { type: String },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: [
      "SuperAdmin", "SchoolAdmin", "Principal", "Teacher",
      "Driver", "Parent", "TransportManager", "Accountant",
      "Receptionist", "Security",
    ],
    index: true,
  },
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    index: true,
  },
  branchId: {
    type: Schema.Types.ObjectId,
    ref: "branches",
  },
  isActive: { type: Boolean, default: true },
  isEmailVerified: { type: Boolean, default: false },
  lastLoginAt: { type: Date },
  lastLoginIp: { type: String },
}, { timestamps: true });

userSchema.index({ schoolId: 1, role: 1 });
export const UserModel = model("users", userSchema);

// ──────────── 4. ROLES (Custom Per School) ────────────
const roleSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    index: true,
  },
  roleName: {
    type: String,
    required: [true, "Role name is required"],
    trim: true,
  },
  description: { type: String, trim: true },
  permissions: {
    type: [String],
    default: [],
  },
  isSystem: { type: Boolean, default: false },
}, { timestamps: true });

roleSchema.index({ schoolId: 1, roleName: 1 }, { unique: true });
export const RoleModel = model("roles", roleSchema);

// ──────────── 5. PERMISSIONS (Global Registry) ────────────
const permissionSchema = new Schema({
  module: {
    type: String,
    required: true,
    trim: true,
  },
  action: {
    type: String,
    required: true,
    enum: ["create", "read", "update", "delete", "export", "import", "approve"],
    trim: true,
  },
  description: { type: String, trim: true },
}, { timestamps: true });

permissionSchema.index({ module: 1, action: 1 }, { unique: true });
export const PermissionModel = model("permissions", permissionSchema);

// ──────────── 6. SESSIONS ────────────
const sessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
  },
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    index: true,
  },
  token: { type: String, required: true },
  ipAddress: { type: String },
  userAgent: { type: String },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }, // TTL index — auto-delete expired sessions
  },
}, { timestamps: true });

sessionSchema.index({ userId: 1, expiresAt: 1 });
export const SessionModel = model("sessions", sessionSchema);

// ──────────── 7. REFRESH TOKENS ────────────
const refreshTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    index: { expires: 0 }, // TTL index — auto-delete after 7 days
  },
}, { timestamps: true });

export const RefreshTokenModel = model("refreshTokens", refreshTokenSchema);
