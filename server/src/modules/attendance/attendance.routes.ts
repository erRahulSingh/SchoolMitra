// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Attendance Management Routes (Phase 7)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  markStudentAttendance,
  getClassAttendance,
  markTeacherAttendance,
  getTeacherDailyAttendance,
  applyLeave,
  getLeaveList,
  updateLeaveStatus,
  getMonthlyAttendanceReport,
  getAttendanceAnalytics
} from "./attendance.controller";

const router = Router();

// Student Attendance
router.post("/student/mark", markStudentAttendance);
router.get("/student/class", getClassAttendance);

// Teacher Attendance
router.post("/teacher/checkin", markTeacherAttendance);
router.get("/teacher/daily", getTeacherDailyAttendance);

// Leave Management
router.post("/leave/apply", applyLeave);
router.get("/leave/list", getLeaveList);
router.patch("/leave/:id/status", updateLeaveStatus);

// Reports & Analytics
router.get("/reports/monthly", getMonthlyAttendanceReport);
router.get("/analytics/overview", getAttendanceAnalytics);

export default router;
