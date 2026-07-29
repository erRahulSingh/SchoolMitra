// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Exam & Gradebook Routes
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getExamSchedules,
  createExamSchedule,
  submitMarks,
  getStudentMarks,
  getReportCard,
  getTopRankers
} from "./exams.controller";

const router = Router();

router.get("/schedules", getExamSchedules);
router.post("/schedules", createExamSchedule);
router.post("/marks/entry", submitMarks);
router.get("/marks/student/:studentId", getStudentMarks);
router.get("/report-card/:studentId", getReportCard);
router.get("/rankers", getTopRankers);

export default router;
