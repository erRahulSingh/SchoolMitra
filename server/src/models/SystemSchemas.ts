import { Schema, model } from "mongoose";

// 10. System Collections
export const AuditLogModel = model("auditLogs", new Schema({ userId: Schema.Types.ObjectId, action: String, ip: String }, { timestamps: true }));
export const SettingModel = model("settings", new Schema({ key: String, value: Schema.Types.Mixed }, { timestamps: true }));
export const SubscriptionModel = model("subscriptions", new Schema({ schoolId: Schema.Types.ObjectId, planId: String, status: String }, { timestamps: true }));
export const PlanModel = model("plans", new Schema({ planName: String, price: Number, maxStudents: Number }, { timestamps: true }));
export const SupportTicketModel = model("supportTickets", new Schema({ schoolId: Schema.Types.ObjectId, subject: String, status: String }, { timestamps: true }));
export const FeatureFlagModel = model("featureFlags", new Schema({ schoolId: Schema.Types.ObjectId, featureName: String, enabled: Boolean }, { timestamps: true }));
export const AnalyticsModel = model("analytics", new Schema({ metricName: String, metricValue: Number }, { timestamps: true }));
export const ActivityLogModel = model("activityLogs", new Schema({ eventName: String, payload: Object }, { timestamps: true }));
export const BackupModel = model("backups", new Schema({ dumpName: String, sizeMb: Number }, { timestamps: true }));
