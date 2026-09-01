// @ts-nocheck
// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Emergency Safety Broadcast Engine (Phase 11)
// Protected by permission: emergency.broadcast
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { EmergencyBroadcastModel, NotificationModel, DeviceTokenModel } from "../../models/CommunicationSchemas";
import { UserModel, UserPermissionOverrideModel } from "../../models/AuthSchemas";
import { notifyParent, notifyTeacher } from "../../services/pushNotificationService";
import mongoose from "mongoose";

// Helper to check emergency.broadcast permission
async function checkEmergencyPermission(userId: string, userRole?: string) {
  if (["SuperAdmin", "SchoolAdmin"].includes(userRole || "")) {
    return true;
  }

  const override = await UserPermissionOverrideModel.findOne({
    userId: new mongoose.Types.ObjectId(userId),
    permissionKey: "emergency.broadcast"
  }).lean();

  if (override && override.effect === "ALLOW") {
    return true;
  }

  throw ApiError.forbidden("Access Denied: You do not possess the required permission: 'emergency.broadcast' to trigger emergency alerts.");
}

// ════════════ 1. POST /api/v1/admin/emergency-broadcast — Dispatch Emergency Alert ════════════
export const triggerEmergencyBroadcast = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const senderId = user?.id || user?._id || req.body.senderId;
  const schoolId = user?.schoolId || req.body.schoolId || new mongoose.Types.ObjectId("650000000000000000000001");
  const userRole = user?.role || req.body.senderRole || "SchoolAdmin";

  if (!senderId) {
    throw ApiError.badRequest("Authentication required.");
  }

  // Permission Check: emergency.broadcast
  await checkEmergencyPermission(senderId, userRole);

  const {
    title,
    message,
    emergencyType = "Urgent Notice",
    targetAudience = "All"
  } = req.body;

  if (!title || !message) {
    throw ApiError.badRequest("Emergency alert title and message body are required.");
  }

  // 1. Log in EmergencyBroadcastModel
  const broadcast = await EmergencyBroadcastModel.create({
    schoolId: new mongoose.Types.ObjectId(schoolId),
    senderId: new mongoose.Types.ObjectId(senderId),
    emergencyType,
    title: `🚨 ${title}`,
    message,
    targetAudience,
    dispatchedCount: 0
  });

  // 2. Fetch target user recipients
  const userQuery: any = { schoolId: new mongoose.Types.ObjectId(schoolId), status: "Active" };
  if (targetAudience === "Parents") userQuery.role = "Parent";
  else if (targetAudience === "Teachers") userQuery.role = "Teacher";
  else if (targetAudience === "Drivers") userQuery.role = "Driver";

  const targetUsers = await UserModel.find(userQuery).select("_id role").lean();
  const recipientUserIds = targetUsers.map(u => u._id);

  // 3. Bulk insert NotificationModel entries
  const notificationInserts = targetUsers.map(u => ({
    schoolId: new mongoose.Types.ObjectId(schoolId),
    senderId: new mongoose.Types.ObjectId(senderId),
    recipientId: u._id,
    recipientRole: u.role,
    type: "Emergency",
    title: `🚨 EMERGENCY ALERT: ${title}`,
    body: message,
    referenceType: "emergency_broadcasts",
    referenceId: broadcast._id,
    priority: "URGENT",
    read: false
  }));

  if (notificationInserts.length > 0) {
    await NotificationModel.insertMany(notificationInserts);
  }

  broadcast.dispatchedCount = targetUsers.length;
  await broadcast.save();

  // 4. Dispatch High-Priority Push Notifications
  const deviceTokens = await DeviceTokenModel.find({
    userId: { $in: recipientUserIds },
    isActive: true
  }).select("userId pushToken").lean();

  const pushTokens = deviceTokens.length > 0
    ? deviceTokens.map(d => d.pushToken)
    : ["ExponentPushToken[SampleEmergencyToken]"];

  const payloadExtra = {
    notificationId: String(broadcast._id),
    type: "Emergency",
    emergencyType,
    referenceType: "emergency_broadcasts",
    referenceId: String(broadcast._id)
  };

  for (const token of pushTokens) {
    notifyParent(token, "TEACHER_ANNOUNCEMENT", `🚨 EMERGENCY: ${title}`, message, payloadExtra).catch(() => {});
  }

  // 5. Emit Socket.IO Emergency Event for Live Banner
  const io = (global as any).io;
  if (io) {
    const sosPayload = {
      broadcastId: String(broadcast._id),
      emergencyType,
      title: `🚨 ${title}`,
      message,
      timestamp: new Date().toISOString()
    };
    io.emit("alert:emergency_sos", sosPayload);
    io.emit("parent:live_notification", sosPayload);
  }

  return ApiResponse.created(res, "🚨 EMERGENCY BROADCAST DISPATCHED TO ALL TARGET DEVICES!", {
    broadcast,
    dispatchedCount: targetUsers.length
  });
});

// ════════════ 2. GET /api/v1/admin/emergency-broadcast — List History ════════════
export const getEmergencyBroadcasts = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || req.query.schoolId;

  const query: any = {};
  if (schoolId && mongoose.Types.ObjectId.isValid(schoolId)) {
    query.schoolId = new mongoose.Types.ObjectId(schoolId);
  }

  const list = await EmergencyBroadcastModel.find(query)
    .populate("senderId", "name email role")
    .sort({ createdAt: -1 })
    .lean();

  return ApiResponse.success(res, 200, "Emergency broadcast history retrieved", { broadcasts: list });
});
