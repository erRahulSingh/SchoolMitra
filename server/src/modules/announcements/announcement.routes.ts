// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Announcement Routes
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getAdminAnnouncements,
  getAdminAnnouncementById,
  createAdminAnnouncement,
  updateAdminAnnouncement,
  deleteAdminAnnouncement,
  publishAdminAnnouncement
} from "../admin/adminAnnouncement.controller";

const router = Router();

router.get("/", getAdminAnnouncements);
router.post("/", createAdminAnnouncement);
router.get("/:id", getAdminAnnouncementById);
router.put("/:id", updateAdminAnnouncement);
router.delete("/:id", deleteAdminAnnouncement);
router.patch("/:id/publish", publishAdminAnnouncement);

export default router;
