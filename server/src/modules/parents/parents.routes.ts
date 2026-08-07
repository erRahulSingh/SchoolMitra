// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Parent Management Routes
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getParents,
  createParent,
  getParentById,
  updateParent,
  getParentChildren,
  toggleParentAlerts,
  getParentAttendanceFeed,
  getParentHomeworkFeed,
  getParentAssignmentsFeed,
  getParentWeeklyTestsFeed,
  getParentExamsFeed,
  getParentResultsFeed,
  getParentReportCardsFeed,
  getParentAnnouncementsFeed
} from "./parents.controller";

const router = Router();

// Standard Parent Admin APIs
router.get("/attendance", getParentAttendanceFeed);
router.get("/homework", getParentHomeworkFeed);
router.get("/assignments", getParentAssignmentsFeed);
router.get("/weekly-tests", getParentWeeklyTestsFeed);
router.get("/exams", getParentExamsFeed);
router.get("/results", getParentResultsFeed);
router.get("/report-cards", getParentReportCardsFeed);
router.get("/announcements", getParentAnnouncementsFeed);

router.get("/", getParents);
router.post("/", createParent);
router.get("/:id", getParentById);
router.put("/:id", updateParent);
router.get("/:id/children", getParentChildren);
router.patch("/:id/alerts", toggleParentAlerts);

export default router;

