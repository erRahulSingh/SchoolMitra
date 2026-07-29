// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Notification & Broadcast Routes
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  triggerParentNotification,
  getUserNotificationInbox,
  markNotificationAsRead,
  createBroadcastAnnouncement,
  getBroadcastAnnouncements
} from "./notifications.controller";

const router = Router();

router.post("/dispatch", triggerParentNotification);
router.get("/inbox", getUserNotificationInbox);
router.patch("/:id/read", markNotificationAsRead);
router.post("/broadcast", createBroadcastAnnouncement);
router.get("/broadcasts", getBroadcastAnnouncements);

export default router;
