// ═══════════════════════════════════════════════════════════
// SchoolMitra — Module 10: System & SaaS Collections (9)
// ═══════════════════════════════════════════════════════════

import { Schema, model } from "mongoose";

// ──────────── AUDIT LOGS ────────────
const auditLogSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    index: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    index: true,
  },
  userEmail: { type: String, trim: true },
  action: { type: String, required: true, trim: true },
  module: { type: String, trim: true },
  ip: { type: String, trim: true },
  userAgent: { type: String },
  details: { type: Schema.Types.Mixed },
}, { timestamps: true });

auditLogSchema.index({ schoolId: 1, createdAt: -1 });
auditLogSchema.index({ userId: 1, createdAt: -1 });
export const AuditLogModel = model("auditLogs", auditLogSchema);

// ──────────── SETTINGS (Per-School Configs) ────────────
const settingSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  key: {
    type: String,
    required: true,
    trim: true,
  },
  value: { type: Schema.Types.Mixed, required: true },
  group: {
    type: String,
    enum: ["General", "Academic", "Fee", "Transport", "Notification", "Security"],
    default: "General",
  },
}, { timestamps: true });

settingSchema.index({ schoolId: 1, key: 1 }, { unique: true });
export const SettingModel = model("settings", settingSchema);

// ──────────── PLANS (SaaS Pricing Tier Definitions) ────────────
const planSchema = new Schema({
  planName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  code: { type: String, unique: true, uppercase: true },
  priceMonthly: { type: Number, required: true, min: 0 },
  priceYearly: { type: Number, required: true, min: 0 },
  maxStudents: { type: Number, default: 500 },
  maxBuses: { type: Number, default: 5 },
  maxStorageGb: { type: Number, default: 10 },
  features: { type: [String], default: [] },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const PlanModel = model("plans", planSchema);

// ──────────── SUBSCRIPTIONS (School SaaS Billing State) ────────────
const subscriptionSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  planId: {
    type: Schema.Types.ObjectId,
    ref: "plans",
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Canceled", "Expired", "Unpaid", "Trial"],
    default: "Trial",
    index: true,
  },
  billingCycle: {
    type: String,
    enum: ["Monthly", "Yearly"],
    default: "Monthly",
  },
  amount: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  nextBillingDate: { type: Date },
  autoRenew: { type: Boolean, default: true },
}, { timestamps: true });

subscriptionSchema.index({ schoolId: 1, status: 1 });
export const SubscriptionModel = model("subscriptions", subscriptionSchema);

// ──────────── SUPPORT TICKETS ────────────
const supportTicketSchema = new Schema({
  ticketNo: { type: String, unique: true, trim: true },
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    required: true,
    index: true,
  },
  raisedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  subject: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ["Technical", "Billing", "FeatureRequest", "BugReport", "Other"],
    default: "Technical",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Medium",
  },
  status: {
    type: String,
    enum: ["Open", "InProgress", "Resolved", "Closed"],
    default: "Open",
    index: true,
  },
  messages: [{
    senderId: { type: Schema.Types.ObjectId, ref: "users" },
    senderRole: { type: String },
    text: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

supportTicketSchema.index({ schoolId: 1, status: 1 });
export const SupportTicketModel = model("supportTickets", supportTicketSchema);

// ──────────── FEATURE FLAGS ────────────
const featureFlagSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    index: true,
  },
  featureName: {
    type: String,
    required: true,
    trim: true,
  },
  enabled: { type: Boolean, default: false },
  description: { type: String, trim: true },
  isGlobal: { type: Boolean, default: false },
}, { timestamps: true });

featureFlagSchema.index({ schoolId: 1, featureName: 1 });
export const FeatureFlagModel = model("featureFlags", featureFlagSchema);

// ──────────── SYSTEM ANALYTICS ────────────
const analyticsSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools",
    index: true,
  },
  metricName: { type: String, required: true, index: true },
  metricValue: { type: Number, required: true },
  dimensions: { type: Schema.Types.Mixed },
  date: { type: Date, default: Date.now, index: true },
}, { timestamps: true });

export const AnalyticsModel = model("analytics", analyticsSchema);

// ──────────── SYSTEM ACTIVITY LOGS ────────────
const activityLogSchema = new Schema({
  eventName: { type: String, required: true, index: true },
  payload: { type: Schema.Types.Mixed },
  ip: { type: String },
  timestamp: { type: Date, default: Date.now, index: true },
}, { timestamps: true });

export const ActivityLogModel = model("activityLogs", activityLogSchema);

// ──────────── BACKUPS ────────────
const backupSchema = new Schema({
  dumpName: { type: String, required: true, trim: true },
  fileUrl: { type: String },
  sizeMb: { type: Number, default: 0 },
  type: {
    type: String,
    enum: ["Automated", "Manual"],
    default: "Automated",
  },
  status: {
    type: String,
    enum: ["Completed", "Failed", "InProgress"],
    default: "Completed",
  },
  completedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const BackupModel = model("backups", backupSchema);
