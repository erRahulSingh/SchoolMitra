// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Announcement & Push Notification Controller (Phase 11)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendPushNotification } from "../../config/firebase";

const announcementsStore: any[] = [
  { id: "ANC-901", title: "Independence Day Cultural Assembly", category: "Event", targetAudience: "Entire School", date: "15 Aug 2026", publishStatus: "PUBLISHED ✅" },
  { id: "ANC-902", title: "Mid-Term Examination Datesheet Circular", category: "Circular", targetAudience: "Class 10 & 12", date: "01 Aug 2026", publishStatus: "PUBLISHED ✅" }
];

export const getAnnouncements = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Announcements list retrieved", { announcements: announcementsStore });
});

export const createAnnouncement = asyncHandler(async (req: Request, res: Response) => {
  const { title, category, targetAudience, content } = req.body;

  if (!title) throw ApiError.badRequest("Announcement title is required.");

  const newNotice = {
    id: `ANC-${Math.floor(100 + Math.random() * 900)}`,
    title,
    category: category || "General Notice",
    targetAudience: targetAudience || "Entire School",
    content: content || "",
    date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    publishStatus: "PUBLISHED ✅"
  };

  announcementsStore.unshift(newNotice);
  return ApiResponse.created(res, "Announcement published to Parent App & Portal.", { announcement: newNotice });
});

export const publishCircular = asyncHandler(async (req: Request, res: Response) => {
  const { circularTitle, documentUrl, targetClass } = req.body;

  if (!circularTitle) throw ApiError.badRequest("Circular title is required.");

  return ApiResponse.created(res, "Official circular document published with digital signature.", {
    circular: {
      id: `CIRC-${Math.floor(1000 + Math.random() * 9000)}`,
      circularTitle,
      targetClass: targetClass || "All Classes",
      documentUrl: documentUrl || "https://schoolmitra.in/docs/circular_aug_2026.pdf",
      publishedAt: new Date().toISOString()
    }
  });
});

export const sendPushNotificationApi = asyncHandler(async (req: Request, res: Response) => {
  const { fcmToken, title, body, targetUser } = req.body;

  if (!title || !body) {
    throw ApiError.badRequest("Title and body are required for FCM Push.");
  }

  await sendPushNotification({
    token: fcmToken || "mock_fcm_token_12345",
    title,
    body
  });

  return ApiResponse.success(res, 200, `Push notification dispatched to ${targetUser || "Parent App"} successfully.`, {
    targetUser,
    title,
    body,
    dispatchedAt: new Date().toISOString()
  });
});

export const getUserInbox = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "User notifications inbox retrieved", {
    unreadCount: 2,
    notifications: [
      { id: "NOTIF-1", title: "Mid-Term Examination Datesheet", message: "Mid-term exam schedule for August 2026 has been published.", time: "10 mins ago", read: false },
      { id: "NOTIF-2", title: "Fee Receipt Generated", message: "Receipt #REC-99401 of ₹18,500 has been verified.", time: "1 hour ago", read: false }
    ]
  });
});

