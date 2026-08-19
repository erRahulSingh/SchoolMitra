import { Router } from "express";
import { authenticate } from "../../middleware/authGuards";
import {
  getAnnouncements,
  createAnnouncement,
  publishCircular,
  sendPushNotificationApi,
  getUserInbox,
  getNotificationsHistory,
  createBroadcastNotification,
  deleteNotificationLog,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  registerDeviceToken,
  deleteDeviceToken,
  deleteNotification,
  getUnreadNotificationCount,
  getNotificationPreferences,
  updateNotificationPreferences
} from "./notifications.controller";

const router = Router();

// Protect all notification endpoints with JWT authentication & tenant authorization
router.use(authenticate);

router.get("/", getUserInbox);
router.get("/inbox", getUserInbox);
router.get("/unread-count", getUnreadNotificationCount);
router.get("/preferences", getNotificationPreferences);
router.put("/preferences", updateNotificationPreferences);

router.post("/device-token", registerDeviceToken);
router.delete("/device-token/:id", deleteDeviceToken);

router.patch("/read-all", markAllNotificationsAsRead);
router.patch("/:id/read", markNotificationAsRead);
router.delete("/:id", deleteNotification);

router.get("/announcements", getAnnouncements);
router.post("/announcements", createAnnouncement);
router.post("/circulars", publishCircular);
router.post("/push/send", sendPushNotificationApi);

// Broadcast & history endpoints
router.get("/history", getNotificationsHistory);
router.post("/broadcast", createBroadcastNotification);
router.delete("/history/:id", deleteNotificationLog);

export default router;
