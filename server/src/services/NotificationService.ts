// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Centralized Notification Service
// Unified Engine: Database Logging ➔ Native Expo Push ➔ Real-Time Socket.IO
// ═══════════════════════════════════════════════════════════

import mongoose from "mongoose";
import { NotificationModel, DeviceTokenModel, NotificationPreferenceModel } from "../models/CommunicationSchemas";
import { StudentModel, ParentModel, UserModel } from "../models/SchoolSchemas";
import { notifyParent, notifyTeacher } from "./pushNotificationService";
import logger from "../utils/logger";

export type NotificationType = 
  | "HOMEWORK" 
  | "EXAM" 
  | "RESULT" 
  | "REPORT_CARD" 
  | "FEE" 
  | "TRANSPORT" 
  | "ANNOUNCEMENT" 
  | "MESSAGE"
  | "Attendance"
  | "Emergency"
  | "System"
  | "EVENT"
  | "LEAVE"
  | "CALENDAR";

export interface CreateNotificationDto {
  schoolId: mongoose.Types.ObjectId | string;
  senderId?: mongoose.Types.ObjectId | string;
  recipientId: mongoose.Types.ObjectId | string;
  recipientRole?: "Parent" | "Teacher" | "SchoolAdmin" | "Driver" | "SuperAdmin";
  type: NotificationType;
  title: string;
  message: string;
  referenceType?: string;
  referenceId?: mongoose.Types.ObjectId | string;
  actionUrl?: string;
  priority?: "LOW" | "NORMAL" | "HIGH" | "URGENT";
}

export interface SendNotificationPayload {
  schoolId?: mongoose.Types.ObjectId | string;
  senderId?: mongoose.Types.ObjectId | string;
  recipientId: mongoose.Types.ObjectId | string;
  recipientRole?: "Parent" | "Teacher" | "SchoolAdmin" | "Driver" | "SuperAdmin";
  type: NotificationType | string;
  title: string;
  message: string;
  referenceType?: string;
  referenceId?: mongoose.Types.ObjectId | string;
  actionUrl?: string;
  priority?: "LOW" | "NORMAL" | "HIGH" | "URGENT";
}

/**
 * Main Event Architecture API: Send notification to any recipient.
 * Example: await notificationService.send({ recipientId, type: "RESULT", title: "Result Published", message: "...", referenceId: resultId });
 */
export const send = async (payload: SendNotificationPayload) => {
  let schoolId = payload.schoolId;
  let recipientRole = payload.recipientRole;

  if (!schoolId || !recipientRole) {
    const recipientUser = await UserModel.findById(payload.recipientId).select("schoolId role").lean();
    if (!schoolId && recipientUser?.schoolId) {
      schoolId = recipientUser.schoolId;
    }
    if (!recipientRole && recipientUser?.role) {
      recipientRole = recipientUser.role as any;
    }
  }

  if (!schoolId) {
    logger.error("[NotificationService] Mandatory schoolId missing for send(). Notification skipped.");
    return null;
  }

  return createNotification({
    schoolId,
    senderId: payload.senderId,
    recipientId: payload.recipientId,
    recipientRole: recipientRole || "Parent",
    type: payload.type as NotificationType,
    title: payload.title,
    message: payload.message,
    referenceType: payload.referenceType,
    referenceId: payload.referenceId,
    actionUrl: payload.actionUrl,
    priority: payload.priority || "NORMAL"
  });
};

/**
 * 1. Create a single persistent notification record and dispatch real-time alerts.
 */
export const createNotification = async (dto: CreateNotificationDto) => {
  try {
    const {
      schoolId,
      senderId,
      recipientId,
      recipientRole = "Parent",
      type,
      title,
      message,
      referenceType,
      referenceId,
      actionUrl,
      priority = "NORMAL"
    } = dto;

    // Create DB entry (isRead aliased to read, message aliased to body)
    const notification = await NotificationModel.create({
      schoolId: new mongoose.Types.ObjectId(schoolId),
      senderId: senderId ? new mongoose.Types.ObjectId(senderId) : undefined,
      recipientId: new mongoose.Types.ObjectId(recipientId),
      recipientRole,
      type,
      title,
      body: message,
      referenceType,
      referenceId: referenceId ? new mongoose.Types.ObjectId(referenceId) : undefined,
      actionUrl,
      priority,
      read: false
    });

    logger.info(`[NotificationService] DB entry created: ${notification._id} for recipient: ${recipientId} (${type})`);

    // Dispatch Native Expo Push
    const payloadExtra = {
      notificationId: String(notification._id),
      type,
      referenceType,
      referenceId: String(referenceId || "")
    };

    // Check recipient notification preferences (Emergency alerts ALWAYS dispatch)
    let shouldSendPush = true;
    if (type !== "Emergency") {
      const userPref = await NotificationPreferenceModel.findOne({
        userId: new mongoose.Types.ObjectId(recipientId)
      }).lean();

      if (userPref) {
        if (type === "HOMEWORK" && !userPref.homework) shouldSendPush = false;
        else if (type === "EXAM" && !userPref.exam) shouldSendPush = false;
        else if ((type === "RESULT" || type === "REPORT_CARD") && !userPref.results) shouldSendPush = false;
        else if (type === "ANNOUNCEMENT" && !userPref.announcements) shouldSendPush = false;
        else if (type === "FEE" && !userPref.fees) shouldSendPush = false;
        else if (type === "TRANSPORT" && !userPref.busTracking) shouldSendPush = false;
        else if (type === "MESSAGE" && !userPref.teacherMessages) shouldSendPush = false;
      }
    }

    if (shouldSendPush) {
      // Fetch registered active device push tokens for user
      const deviceTokens = await DeviceTokenModel.find({
        userId: new mongoose.Types.ObjectId(recipientId),
        isActive: true
      }).select("pushToken").lean();

      const pushTokensList = deviceTokens.length > 0
        ? deviceTokens.map(d => d.pushToken)
        : ["ExponentPushToken[SampleParentToken]"];

      for (const token of pushTokensList) {
        if (recipientRole === "Parent") {
          let legacyType: "ATTENDANCE_UPDATE" | "HOMEWORK_PUBLISHED" | "EXAM_RESULT_PUBLISHED" | "TEACHER_ANNOUNCEMENT" = "TEACHER_ANNOUNCEMENT";
          if (type === "HOMEWORK") legacyType = "HOMEWORK_PUBLISHED";
          else if (type === "RESULT" || type === "REPORT_CARD") legacyType = "EXAM_RESULT_PUBLISHED";
          else if (type === "Attendance") legacyType = "ATTENDANCE_UPDATE";

          await notifyParent(token, legacyType, title, message, payloadExtra).catch(() => {});
        } else if (recipientRole === "Teacher") {
          let legacyType: "NEW_ANNOUNCEMENT" | "HOMEWORK_REMINDER" | "EXAM_REMINDER" | "MARKS_REMINDER" | "ADMIN_MESSAGE" | "LEAVE_STATUS" = "NEW_ANNOUNCEMENT";
          if (type === "MESSAGE") legacyType = "ADMIN_MESSAGE";

          await notifyTeacher(token, legacyType, title, message, payloadExtra).catch(() => {});
        }
      }
    }

    // Dispatch Live Socket.IO Event
    const io = (global as any).io;
    if (io) {
      const socketPayload = {
        id: String(notification._id),
        notificationId: String(notification._id),
        schoolId: String(schoolId),
        senderId: String(senderId || ""),
        recipientId: String(recipientId),
        recipientRole,
        type,
        title,
        message,
        referenceType,
        referenceId: String(referenceId || ""),
        isRead: false,
        readAt: null,
        createdAt: notification.createdAt
      };

      io.to(`user:${recipientId}`).emit("parent:live_notification", socketPayload);
      io.to(`parent:${recipientId}`).emit("parent:live_notification", socketPayload);
    }

    return notification;
  } catch (err) {
    logger.error("[NotificationService Error] Failed to create notification:", err);
    return null;
  }
};

/**
 * 2. Broadcast notification to all parents in a specific Class & Section.
 */
export const sendClassNotification = async (
  schoolId: mongoose.Types.ObjectId | string,
  senderId: mongoose.Types.ObjectId | string | undefined,
  classId: mongoose.Types.ObjectId | string,
  sectionId: mongoose.Types.ObjectId | string | undefined,
  type: NotificationType,
  title: string,
  message: string,
  referenceType?: string,
  referenceId?: mongoose.Types.ObjectId | string
) => {
  try {
    const studentQuery: any = { schoolId: new mongoose.Types.ObjectId(schoolId), classId: new mongoose.Types.ObjectId(classId) };
    if (sectionId) {
      studentQuery.sectionId = new mongoose.Types.ObjectId(sectionId);
    }

    const students = await StudentModel.find(studentQuery).select("parentId").lean();
    const parentIds = students.map((s: any) => s.parentId).filter(Boolean);

    if (parentIds.length === 0) return [];

    const parents = await ParentModel.find({ _id: { $in: parentIds } }).select("userId").lean();
    const recipientUserIds = parents.filter((p: any) => p.userId).map((p: any) => String(p.userId));

    const uniqueUserIds = Array.from(new Set(recipientUserIds));
    const createdList = [];

    for (const userId of uniqueUserIds) {
      const notif = await createNotification({
        schoolId,
        senderId,
        recipientId: userId,
        recipientRole: "Parent",
        type,
        title,
        message,
        referenceType,
        referenceId
      });
      if (notif) createdList.push(notif);
    }

    return createdList;
  } catch (err) {
    logger.error("[NotificationService Error] Failed sendClassNotification:", err);
    return [];
  }
};

/**
 * 3. Broadcast notification to all parents across multiple classes.
 */
export const sendClassesNotification = async (
  schoolId: mongoose.Types.ObjectId | string,
  senderId: mongoose.Types.ObjectId | string | undefined,
  classIds: (mongoose.Types.ObjectId | string)[],
  type: NotificationType,
  title: string,
  message: string,
  referenceType?: string,
  referenceId?: mongoose.Types.ObjectId | string
) => {
  try {
    const classObjIds = classIds.map(c => new mongoose.Types.ObjectId(c));
    const students = await StudentModel.find({
      schoolId: new mongoose.Types.ObjectId(schoolId),
      classId: { $in: classObjIds }
    }).select("parentId").lean();

    const parentIds = students.map((s: any) => s.parentId).filter(Boolean);
    if (parentIds.length === 0) return [];

    const parents = await ParentModel.find({ _id: { $in: parentIds } }).select("userId").lean();
    const recipientUserIds = parents.filter((p: any) => p.userId).map((p: any) => String(p.userId));

    const uniqueUserIds = Array.from(new Set(recipientUserIds));
    const createdList = [];

    for (const userId of uniqueUserIds) {
      const notif = await createNotification({
        schoolId,
        senderId,
        recipientId: userId,
        recipientRole: "Parent",
        type,
        title,
        message,
        referenceType,
        referenceId
      });
      if (notif) createdList.push(notif);
    }

    return createdList;
  } catch (err) {
    logger.error("[NotificationService Error] Failed sendClassesNotification:", err);
    return [];
  }
};

/**
 * 4. Send targeted notification to a single student's parent.
 */
export const sendStudentNotification = async (
  schoolId: mongoose.Types.ObjectId | string,
  senderId: mongoose.Types.ObjectId | string | undefined,
  studentId: mongoose.Types.ObjectId | string,
  type: NotificationType,
  title: string,
  message: string,
  referenceType?: string,
  referenceId?: mongoose.Types.ObjectId | string
) => {
  try {
    const student = await StudentModel.findById(studentId).select("parentId").lean();
    if (!student || !student.parentId) return null;

    const parent = await ParentModel.findById(student.parentId).select("userId").lean();
    if (!parent || !parent.userId) return null;

    return createNotification({
      schoolId,
      senderId,
      recipientId: parent.userId,
      recipientRole: "Parent",
      type,
      title,
      message,
      referenceType,
      referenceId
    });
  } catch (err) {
    logger.error("[NotificationService Error] Failed sendStudentNotification:", err);
    return null;
  }
};
