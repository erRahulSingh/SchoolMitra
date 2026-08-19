import { AuditLogModel } from "../models/SystemSchemas";

export interface AuditActionPayload {
  schoolId?: string;
  userId?: string;
  userEmail?: string;
  action: "DOCUMENT_UPLOADED" | "DOCUMENT_DELETED" | "CERTIFICATE_GENERATED" | "CERTIFICATE_REVOKED" | "CERTIFICATE_DOWNLOADED" | string;
  module?: string;
  resourceId?: string;
  ip?: string;
  userAgent?: string;
  details?: any;
}

export const inMemoryAuditLogs: any[] = [];

export const logSensitiveAuditAction = async (payload: AuditActionPayload) => {
  try {
    const logEntry = {
      schoolId: payload.schoolId || "650000000000000000000001",
      userId: payload.userId || "650000000000000000000101",
      userEmail: payload.userEmail || "admin@schoolmitra.com",
      action: payload.action,
      module: payload.module || "documents",
      ip: payload.ip || "127.0.0.1",
      userAgent: payload.userAgent || "SchoolMitra Web Portal",
      details: {
        resourceId: payload.resourceId || `res_${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...payload.details
      },
      createdAt: new Date()
    };

    inMemoryAuditLogs.unshift(logEntry);

    try {
      await AuditLogModel.create({
        schoolId: logEntry.schoolId,
        userId: logEntry.userId,
        userEmail: logEntry.userEmail,
        action: logEntry.action,
        module: logEntry.module,
        ip: logEntry.ip,
        userAgent: logEntry.userAgent,
        details: logEntry.details
      });
    } catch (dbErr) {
      // In-memory fallback if DB hot reload occurs
    }

    return logEntry;
  } catch (err) {
    console.error("[Audit Logger Exception]:", err);
  }
};
