import { Router } from "express";
import {
  getAnnouncements,
  createAnnouncement,
  publishCircular,
  sendPushNotificationApi,
  getUserInbox,
  getNotificationsHistory,
  createBroadcastNotification,
  deleteNotificationLog
} from "./notifications.controller";

const router = Router();

router.get("/inbox", getUserInbox);
router.get("/announcements", getAnnouncements);
router.post("/announcements", createAnnouncement);
router.post("/circulars", publishCircular);
router.post("/push/send", sendPushNotificationApi);

// Broadcast & history endpoints
router.get("/history", getNotificationsHistory);
router.post("/broadcast", createBroadcastNotification);
router.delete("/history/:id", deleteNotificationLog);

export default router;
