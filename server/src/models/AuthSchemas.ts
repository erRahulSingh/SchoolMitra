// ═══════════════════════════════════════════════════════════
// SchoolMitra — Module 1: Auth & Tenancy Collections (7)
// ═══════════════════════════════════════════════════════════

import { Schema, model, models, Types } from "mongoose";
import { ALL_SCHOOL_STATUSES, SchoolStatus } from "../constants/schoolStatus.constants";

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
    enum: ALL_SCHOOL_STATUSES,
    default: SchoolStatus.ACTIVE,
    index: true,
  },
  statusReason: { type: String, default: "" },
  statusChangedBy: { type: Schema.Types.Mixed },
  statusChangedAt: { type: Date, default: Date.now },
  statusExpiresAt: { type: Date },
  suspendedAt: { type: Date },
  suspendedBy: { type: Schema.Types.Mixed },
  reactivatedAt: { type: Date },
  reactivatedBy: { type: Schema.Types.Mixed },
  sessionVersion: { type: Number, default: 1 },
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

export const SchoolModel = models.schools || model("schools", schoolSchema);

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
export const BranchModel = models.branches || model("branches", branchSchema);

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
    required: function(this: any) { return !this.googleId && !this.passwordHash; },
  },
  passwordHash: {
    type: String,
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
      "SUPER_ADMIN", "SCHOOL_ADMIN", "TEACHER", "PARENT", "DRIVER",
      "SuperAdmin", "SchoolAdmin", "Principal", "Teacher",
      "Driver", "Parent", "TransportManager", "Accountant",
      "Receptionist", "Security",
    ],
    index: true,
  },
  schoolId: {
    type: Schema.Types.Mixed,
    default: null,
    required: function(this: any) {
      const normalized = String(this.role || "").toUpperCase();
      return normalized !== "SUPER_ADMIN";
    },
    index: true,
  },
  branchId: {
    type: Schema.Types.Mixed,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "SUSPENDED", "Active", "Inactive", "Suspended"],
    default: "ACTIVE",
    index: true,
  },
  isActive: { type: Boolean, default: true },
  isEmailVerified: { type: Boolean, default: false },
  permissions: {
    type: Schema.Types.Mixed,
    default: {
      attendance: { view: true, create: true, edit: true, delete: false },
      marks: { view: true, create: true, edit: true, delete: false },
      homework: { view: true, create: true, edit: true, delete: true },
      notice: { view: true, create: false, edit: false, delete: false },
      studyMaterial: { view: true, create: true, edit: true, delete: false },
      leave: { view: true, create: true, edit: false, delete: false },
    },
  },
  lastLoginAt: { type: Date },
  lastLoginIp: { type: String },
  empId: { type: String, trim: true },
  gender: { type: String, trim: true },
  dob: { type: Date },
  qualification: { type: String, trim: true },
  joiningDate: { type: Date },
  designation: { type: String, trim: true },
  department: { type: String, trim: true },
  subject: { type: String, trim: true },
  classTeacher: { type: String, trim: true },
}, { timestamps: true });

userSchema.index({ schoolId: 1, role: 1 });
export const UserModel = models.users || model("users", userSchema);

// ──────────── 4. ROLES (System & Custom Per School) ────────────
const roleSchema = new Schema({
  schoolId: {
    type: Schema.Types.Mixed,
    default: null,
    index: true,
  },
  roleName: {
    type: String,
    required: [true, "Role name is required"],
    trim: true,
  },
  systemRole: {
    type: String,
    trim: true,
    index: true,
  },
  description: { type: String, trim: true },
  permissions: {
    type: [String],
    default: [],
  },
  isSystem: { type: Boolean, default: false },
}, { timestamps: true });

roleSchema.index({ schoolId: 1, roleName: 1 });
export const RoleModel = models.roles || model("roles", roleSchema);

// ──────────── 4.1. ROLE PERMISSIONS ────────────
const rolePermissionSchema = new Schema({
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "roles",
    required: true,
    index: true,
  },
  permissionId: {
    type: Schema.Types.ObjectId,
    ref: "permissions",
  },
  permissionKey: {
    type: String,
    required: true,
    index: true,
  },
}, { timestamps: true });

rolePermissionSchema.index({ roleId: 1, permissionKey: 1 }, { unique: true });
export const RolePermissionModel = models.rolePermissions || model("rolePermissions", rolePermissionSchema);

// ──────────── 4.2. USER PERMISSION OVERRIDES ────────────
const userPermissionOverrideSchema = new Schema({
  schoolId: {
    type: Schema.Types.Mixed,
    required: true,
    index: true,
  },
  userId: {
    type: Schema.Types.Mixed,
    required: true,
    index: true,
  },
  permissionId: {
    type: Schema.Types.ObjectId,
    ref: "permissions",
  },
  permissionKey: {
    type: String,
    required: true,
    index: true,
  },
  effect: {
    type: String,
    enum: ["ALLOW", "DENY"],
    required: true,
  },
}, { timestamps: true });

userPermissionOverrideSchema.index({ schoolId: 1, userId: 1, permissionKey: 1 }, { unique: true });
export const UserPermissionOverrideModel = models.userPermissionOverrides || model("userPermissionOverrides", userPermissionOverrideSchema);

// ──────────── 5. PERMISSIONS (Global & Custom Registry) ────────────
const permissionSchema = new Schema({
  key: {
    type: String,
    required: [true, "Permission key is required"],
    unique: true,
    index: true,
    trim: true,
  },
  module: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  action: {
    type: String,
    required: true,
    trim: true,
  },
  description: { type: String, trim: true },
  schoolId: {
    type: Schema.Types.Mixed,
    default: null, // null for global centrally maintained definitions, ObjectId/String for school custom permissions
    index: true,
  },
}, { timestamps: true });

permissionSchema.index({ module: 1, action: 1 });
export const PermissionModel = models.permissions || model("permissions", permissionSchema);

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
export const SessionModel = models.sessions || model("sessions", sessionSchema);

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

export const RefreshTokenModel = models.refreshTokens || model("refreshTokens", refreshTokenSchema);

// ──────────── 8. AUDIT LOGS ────────────
const auditLogSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    index: true,
  },
  actorId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
  },
  actorRole: { type: String, required: true },
  action: { type: String, required: true },
  module: { type: String, required: true },
  targetId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    index: true,
  },
  oldValue: { type: Schema.Types.Mixed },
  newValue: { type: Schema.Types.Mixed },
  ipAddress: { type: String },
}, { timestamps: true });

export const AuditLogModel = models.auditLogs || model("auditLogs", auditLogSchema);
