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
  getAttendanceAnalytics,
  getAttendanceSettings,
  updateAttendanceSettings,
  createCorrectionRequest,
  getCorrectionRequests,
  approveCorrectionRequest,
  rejectCorrectionRequest,
  getSubjectWiseAttendance,
  sendLowAttendanceWarningNotification
} from "./attendance.controller";

const router = Router();

// Subject-Wise Attendance & Defaulter Alerts
router.get("/subject-wise/:studentId?", getSubjectWiseAttendance);
router.post("/alert-defaulter", sendLowAttendanceWarningNotification);

// Attendance Window Settings & Lock Status
router.get("/settings", getAttendanceSettings);
router.post("/settings", updateAttendanceSettings);

// Attendance Correction Requests Workflow
router.post("/correction-request", createCorrectionRequest);
router.get("/correction-requests", getCorrectionRequests);
router.post("/correction-requests/:id/approve", approveCorrectionRequest);
router.post("/correction-requests/:id/reject", rejectCorrectionRequest);

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
