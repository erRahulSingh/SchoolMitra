import { Router } from "express";
import { 
  getExamSchedules, 
  createExamSchedule, 
  submitMarks, 
  getStudentMarks, 
  getReportCard 
} from "./exams.controller";

const router = Router();

// Schedules
router.get("/schedules", getExamSchedules);
router.post("/schedules", createExamSchedule);

// Marks & Grade Sheets
router.post("/marks", submitMarks);
router.get("/marks/:studentId", getStudentMarks);

// Report Cards
router.get("/report-card/:studentId", getReportCard);

export default router;
