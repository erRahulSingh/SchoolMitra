// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Parent Management Routes
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import { authenticate } from "../../middleware/authGuards";
import {
  getParents,
  createParent,
  getParentById,
  updateParent,
  getParentChildren,
  toggleParentAlerts,
  getParentAttendanceFeed,
  getParentHomeworkFeed,
  getParentHomeworkById,
  getParentAssignmentsFeed,
  getParentAssignmentById,
  getParentWeeklyTestsFeed,
  getParentExamsFeed,
  getParentResultsFeed,
  getParentReportCardsFeed,
  getParentAnnouncementsFeed,
  getParentMaterialsFeed,
  getParentStudentPerformance,
  getParentExamById,
  getParentReportCardById
} from "./parents.controller";

const router = Router();

// Protect all parent-facing endpoints
router.use(authenticate);

// Standard Parent Admin APIs
router.get("/attendance", getParentAttendanceFeed);
router.get("/homework", getParentHomeworkFeed);
router.get("/homework/:id", getParentHomeworkById);
router.get("/assignments", getParentAssignmentsFeed);
router.get("/assignments/:id", getParentAssignmentById);
router.get("/weekly-tests", getParentWeeklyTestsFeed);
router.get("/exams", getParentExamsFeed);
router.get("/exams/:id", getParentExamById);
router.get("/results", getParentResultsFeed);
router.get("/report-cards", getParentReportCardsFeed);
router.get("/report-cards/:id", getParentReportCardById);
router.get("/announcements", getParentAnnouncementsFeed);
router.get("/materials", getParentMaterialsFeed);
router.get("/students/:studentId/performance", getParentStudentPerformance);
router.get("/analytics/child/:studentId", getParentStudentPerformance);

router.get("/", getParents);
router.post("/", createParent);
router.get("/:id", getParentById);
router.put("/:id", updateParent);
router.get("/:id/children", getParentChildren);
router.patch("/:id/alerts", toggleParentAlerts);

export default router;

