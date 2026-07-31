// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Notifications & Announcements Routes (Phase 11)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getAnnouncements,
  createAnnouncement,
  publishCircular,
  sendPushNotificationApi,
  getUserInbox
} from "./notifications.controller";

const router = Router();

router.get("/inbox", getUserInbox);
router.get("/announcements", getAnnouncements);
router.post("/announcements", createAnnouncement);
router.post("/circulars", publishCircular);
router.post("/push/send", sendPushNotificationApi);

export default router;
