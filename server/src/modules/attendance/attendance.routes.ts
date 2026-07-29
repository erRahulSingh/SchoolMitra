// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Attendance Management Routes
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  markStudentAttendance,
  getClassAttendance,
  getStudentAttendanceSummary,
  markStaffAttendance,
  getAttendanceReport
} from "./attendance.controller";

const router = Router();

router.post("/student/mark", markStudentAttendance);
router.get("/student/class", getClassAttendance);
router.get("/student/summary", getStudentAttendanceSummary);
router.post("/staff/mark", markStaffAttendance);
router.get("/report", getAttendanceReport);

export default router;
