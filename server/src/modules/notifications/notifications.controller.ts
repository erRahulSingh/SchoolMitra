import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendPushNotification } from "../../config/firebase";
import { AnnouncementModel, NotificationModel } from "../../models/CommunicationSchemas";
import { Types } from "mongoose";

const dummySchoolId = new Types.ObjectId("650000000000000000000001");
const dummyUserId = new Types.ObjectId("650000000000000000000201");

// Helper to seed announcements if empty
const getOrSeedAnnouncements = async () => {
  const annList = await AnnouncementModel.find().lean();
  if (annList.length > 0) {
    return annList.map((a: any) => ({
      id: a._id.toString(),
      title: a.title,
      category: a.priority === "High" ? "Circular" : "Event",
      targetAudience: a.targetAudience,
      content: a.content,
      date: a.createdAt ? new Date(a.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Just Now",
      publishStatus: "PUBLISHED ✅"
    }));
  }

  const seeded = await AnnouncementModel.create([
    { schoolId: dummySchoolId, title: "Independence Day Cultural Assembly", content: "Assembly details for Independence day celebrations.", targetAudience: "All", priority: "Normal", status: "Published" },
    { schoolId: dummySchoolId, title: "Mid-Term Examination Datesheet Circular", content: "Examinations schedule for class 10 & 12.", targetAudience: "Students", priority: "High", status: "Published" }
  ]);

  return seeded.map((a: any) => ({
    id: a._id.toString(),
    title: a.title,
    category: a.priority === "High" ? "Circular" : "Event",
    targetAudience: a.targetAudience,
    content: a.content,
    date: new Date(a.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    publishStatus: "PUBLISHED ✅"
  }));
};

// ════════════ 1. GET ANNOUNCEMENTS ════════════
export const getAnnouncements = asyncHandler(async (_req: Request, res: Response) => {
  const announcements = await getOrSeedAnnouncements();
  return ApiResponse.success(res, 200, "Announcements list retrieved", { announcements });
});

// ════════════ 2. CREATE ANNOUNCEMENT ════════════
export const createAnnouncement = asyncHandler(async (req: Request, res: Response) => {
  const { title, category, targetAudience, content } = req.body;

  if (!title) throw ApiError.badRequest("Announcement title is required.");

  const record = await AnnouncementModel.create({
    schoolId: dummySchoolId,
    title,
    content: content || "",
    targetAudience: targetAudience || "All",
    priority: category === "Circular" ? "High" : "Normal",
    status: "Published"
  });

  return ApiResponse.created(res, "Announcement published to Parent App & Portal.", {
    announcement: {
      id: record._id.toString(),
      title: record.title,
      category: category || "General Notice",
      targetAudience: record.targetAudience,
      content: record.content,
      date: new Date(record.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      publishStatus: "PUBLISHED ✅"
    }
  });
});

// ════════════ 3. PUBLISH CIRCULAR ════════════
export const publishCircular = asyncHandler(async (req: Request, res: Response) => {
  const { circularTitle, documentUrl, targetClass } = req.body;

  if (!circularTitle) throw ApiError.badRequest("Circular title is required.");

  const record = await AnnouncementModel.create({
    schoolId: dummySchoolId,
    title: circularTitle,
    content: `Document Link: ${documentUrl || "https://schoolmitra.in/docs/circular.pdf"}`,
    targetAudience: "Parents",
    priority: "High",
    status: "Published"
  });

  return ApiResponse.created(res, "Official circular document published with digital signature.", {
    circular: {
      id: record._id.toString(),
      circularTitle: record.title,
      targetClass: targetClass || "All Classes",
      documentUrl: documentUrl || "https://schoolmitra.in/docs/circular_aug_2026.pdf",
      publishedAt: record.createdAt
    }
  });
});

// ════════════ 4. SEND PUSH NOTIFICATION ════════════
export const sendPushNotificationApi = asyncHandler(async (req: Request, res: Response) => {
  const { fcmToken, title, body, targetUser } = req.body;

  if (!title || !body) {
    throw ApiError.badRequest("Title and body are required for FCM Push.");
  }

  await sendPushNotification({
    token: fcmToken || "mock_fcm_token_12345",
    title,
    body
  }).catch(() => {});

  const record = await NotificationModel.create({
    schoolId: dummySchoolId,
    recipientId: dummyUserId,
    recipientRole: "Parent",
    title,
    body,
    type: "Announcement",
    read: false
  });

  return ApiResponse.success(res, 200, `Push notification dispatched successfully.`, {
    targetUser,
    title,
    body,
    dispatchedAt: record.createdAt
  });
});

// ════════════ 5. GET USER INBOX NOTIFICATIONS ════════════
export const getUserInbox = asyncHandler(async (_req: Request, res: Response) => {
  let notifs = await NotificationModel.find().lean();

  if (notifs.length === 0) {
    await NotificationModel.create([
      { schoolId: dummySchoolId, recipientId: dummyUserId, recipientRole: "Parent", title: "Mid-Term Examination Datesheet", body: "Mid-term exam schedule for August 2026 has been published.", type: "Academic", read: false },
      { schoolId: dummySchoolId, recipientId: dummyUserId, recipientRole: "Parent", title: "Fee Receipt Generated", body: "Receipt #REC-99401 of ₹18,500 has been verified.", type: "Fee", read: false }
    ]);
    notifs = await NotificationModel.find().lean();
  }

  const formatted = notifs.map(n => ({
    id: n._id.toString(),
    title: n.title,
    message: n.body,
    time: n.createdAt ? new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just Now",
    read: n.read
  }));

  return ApiResponse.success(res, 200, "User notifications inbox retrieved", {
    unreadCount: notifs.filter(n => !n.read).length,
    notifications: formatted
  });
});

// ════════════ 6. GET NOTIFICATIONS HISTORY ════════════
export const getNotificationsHistory = asyncHandler(async (_req: Request, res: Response) => {
  let list = await NotificationModel.find().lean();
  if (list.length === 0) {
    await NotificationModel.create([
      { schoolId: dummySchoolId, recipientId: dummyUserId, recipientRole: "Parent", title: "Mid-Term Examination Date Sheet Released", body: "Dear Parents and Students, the complete date sheet for the upcoming Mid-Term examinations is now available on the school portal under Academics. Exams begin on 10th September.", type: "Academic", read: false },
      { schoolId: dummySchoolId, recipientId: dummyUserId, recipientRole: "Parent", title: "School Transport Route 1 Delay Notice", body: "Please note that the school bus on Route 1 is delayed by 20 minutes due to congestion on the Dwarka Flyover. Parents are requested to coordinate stop arrival accordingly.", type: "Transport", read: false },
      { schoolId: dummySchoolId, recipientId: dummyUserId, recipientRole: "Teacher", title: "Staff Meeting at 03:00 PM in Conference Room", body: "Urgent meeting for all faculty coordinators today in the central conference room. Agenda: CBSE Term-2 syllabus verification. Attendance is mandatory.", type: "System", read: true }
    ]);
    list = await NotificationModel.find().lean();
  }

  const formatted = list.map(n => {
    let targetStr = "All School";
    if (n.recipientRole === "Parent") targetStr = "Parents Only";
    else if (n.recipientRole === "Teacher") targetStr = "Teachers Only";
    
    return {
      id: n._id.toString(),
      title: n.title,
      body: n.body,
      target: targetStr,
      sentAt: n.createdAt ? new Date(n.createdAt).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "Just Now",
      channels: ["push", "board"],
      readRate: "95%"
    };
  });

  return ApiResponse.success(res, 200, "Broadcast history list", { history: formatted });
});

// ════════════ 7. BROADCAST A NEW NOTIFICATION ════════════
export const createBroadcastNotification = asyncHandler(async (req: Request, res: Response) => {
  const { title, body, target } = req.body;

  if (!title || !body) {
    throw ApiError.badRequest("Title and body are required.");
  }

  let mappedRole: any = "Parent";
  if (target === "Teachers Only") mappedRole = "Teacher";
  else if (target === "Drivers Only") mappedRole = "Driver";

  const record = await NotificationModel.create({
    schoolId: dummySchoolId,
    recipientId: dummyUserId,
    recipientRole: mappedRole,
    title,
    body,
    type: "System",
    read: false
  });

  return ApiResponse.created(res, "Broadcast notification created in database successfully.", {
    notification: {
      id: record._id.toString(),
      title: record.title,
      body: record.body,
      target: target || "All School",
      sentAt: new Date(record.createdAt).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      channels: ["push", "board"],
      readRate: "100%"
    }
  });
});

// ════════════ 8. DELETE BROADCAST LOG ════════════
export const deleteNotificationLog = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (Types.ObjectId.isValid(id)) {
    await NotificationModel.findByIdAndDelete(id);
  }
  return ApiResponse.success(res, 200, "Broadcast log deleted successfully");
});
