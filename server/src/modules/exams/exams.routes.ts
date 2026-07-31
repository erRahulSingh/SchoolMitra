// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Exam Management Routes (Phase 8)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getExamsList,
  createExam,
  getExamScheduleDetails,
  enterMarks,
  getStudentResult,
  getReportCard,
  publishExamResults
} from "./exams.controller";

const router = Router();

// Exam Types & Schedules
router.get("/", getExamsList);
router.post("/create", createExam);
router.get("/schedule", getExamScheduleDetails);

// Marks & Results
router.post("/marks/entry", enterMarks);
router.get("/result/:studentId", getStudentResult);

// Report Cards & Publishing
router.get("/report-card/:studentId", getReportCard);
router.post("/publish", publishExamResults);

export default router;
