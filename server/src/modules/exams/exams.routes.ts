import { Router } from "express";
import { authenticate } from "../../middleware/authGuards";
import { requireActiveSchool } from "../../middleware/tenantMiddleware";
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

// ─── STEP 20: CENTRAL EXAMS AUTH & TENANT STATUS GUARDS ───
router.use(authenticate);
router.use(requireActiveSchool);

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
