// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Teacher & Parent Sync Routes
// All 12 Microservice API Endpoints + Phase 2 Profile APIs
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getTeacherDashboard,
  getTeacherClasses,
  getTeacherStudents,
  getTeacherAttendance,
  saveTeacherAttendance,
  syncOfflineAttendanceBatch,
  requestAttendanceCorrection,
  updateTeacherAttendanceById,


  getStudentAttendanceHistory,
  getTeacherAttendanceReport,

  getTeacherHomework,
  createTeacherHomework,
  getTeacherHomeworkById,
  updateTeacherHomeworkById,
  deleteTeacherHomeworkById,
  publishTeacherHomeworkById,

  getTeacherAssignments,
  createTeacherAssignment,
  getTeacherAssignmentById,
  updateTeacherAssignmentById,
  deleteTeacherAssignmentById,
  publishTeacherAssignmentById,
  getAssignmentSubmissions,

  getTeacherMaterials,
  uploadTeacherMaterial,
  getTeacherMaterialById,
  updateTeacherMaterialById,
  deleteTeacherMaterialById,

  getTeacherTests,
  createTeacherTest,
  getTeacherTestById,
  updateTeacherTestById,
  addQuestionsToWeeklyTest,
  publishWeeklyTest,
  submitWeeklyTestResults,
  getWeeklyTestResults,

  getTeacherExams,
  saveTeacherMarks,
  getTeacherExamById,
  getTeacherExamStudentsForMarks,
  updateTeacherMarksById,

  getTeacherReportCards,
  getStudentReportCardById,
  submitStudentReportCard,
  publishTeacherReportCards,

  getTeacherMessages,
  sendTeacherMessage,
  getTeacherMessageThreadById,
  createTeacherAnnouncement,
  getTeacherAnnouncements,
  getTeacherNotifications,
  markTeacherNotificationRead,
  markAllTeacherNotificationsRead,


  getTeacherProfile,
  updateTeacherProfile,
  changeTeacherPassword,
  getTeacherAttendanceHistory,
  applyTeacherLeave,
  getTeacherLeaves,
  getTeacherLeaveById,

  getTeacherTimetable,
  getTeacherTodayTimetable,
  getTeacherWeeklyTimetable,
  getParentSyncStatus,
  triggerTestParentSync,
  executeMasterTestSuiteEndpoint,
  getAcademicYears,

  switchActiveAcademicYear,
  getTeacherClassById,
  getTeacherClassStudents,
  getStudentPerformanceAnalytics,
  getTeacherSubjects,

  getTeachers,
  createTeacher,
  getTeacherById,

  updateTeacher,
  deleteTeacher,
  getTeacherAnalyticsOverview,
  getTeacherAnalyticsClassById
} from "./teacher.controller";

import { enforceTeacherPermissions } from "../../middlewares/teacherPermissions";
import { authenticate, requireSchool, requireRole, requirePermission } from "../../middleware/authGuards";
import { getTeacherMe, getTeacherMyPermissions } from "../admin/adminTeacher.controller";
import { getTeacherTimetableHandler } from "../academic/timetable.controller";

const router = Router();

import { teacherOpenApiSpec } from "../../docs/swaggerTeacherDoc";

// ──────────── 0. SWAGGER OPENAPI SPEC DOCUMENTATION ENDPOINT ────────────
router.get("/docs", (req, res) => res.json(teacherOpenApiSpec));

// Protect all downstream teacher routes
router.use(authenticate);
router.use(requireSchool);

// ──────────── 0.1 TEACHER SELF ENDPOINTS (Authenticated) ────────────
// GET /api/v1/teacher/me — Get own profile
router.get("/me", getTeacherMe);
router.get("/permissions", getTeacherMyPermissions);

// ──────────── 1. TEACHER PROFILE & PERSONAL MANAGEMENT APIs ────────────
router.get("/profile", getTeacherProfile);

router.put("/profile", updateTeacherProfile);
router.put("/change-password", changeTeacherPassword);
router.get("/attendance-history", getTeacherAttendanceHistory);
router.post("/leave", applyTeacherLeave);
router.post("/leaves", applyTeacherLeave);
router.get("/leaves", getTeacherLeaves);
router.get("/leaves/:id", getTeacherLeaveById);


// ──────────── 1.1 TIMETABLE ENDPOINTS (READ-ONLY) ────────────
router.get("/timetable", getTeacherTimetableHandler);
router.get("/timetable/today", getTeacherTimetableHandler);
router.get("/timetable/week", getTeacherTimetableHandler);

// ──────────── 1.2 PARENT APP SYNCHRONIZATION ENGINE TELEMETRY & TESTING ────────────
router.get("/parent-sync/status", getParentSyncStatus);
router.post("/parent-sync/test", triggerTestParentSync);
router.post("/master-test-suite", executeMasterTestSuiteEndpoint);


// ──────────── 1.3 ACADEMIC YEAR MANAGEMENT ENDPOINTS ────────────
router.get("/academic-years", getAcademicYears);
router.patch("/academic-years/switch", switchActiveAcademicYear);






// ──────────── 2. CLASS & ACADEMIC ASSIGNMENT CORE ENDPOINTS ────────────
router.get("/dashboard", getTeacherDashboard);

router.get("/classes", getTeacherClasses);
router.get("/classes/:classId", getTeacherClassById);
router.get("/classes/:classId/students", getTeacherClassStudents);

router.get("/subjects", getTeacherSubjects);
router.get("/students", getTeacherStudents);
router.get("/students/:studentId/performance", getStudentPerformanceAnalytics);
router.get("/students/:id/performance", getStudentPerformanceAnalytics);



import { attendanceRateLimiter, messageRateLimiter, fileUploadRateLimiter } from "../../middlewares/rateLimiter";
import { validateAttendancePayload, validatePayload } from "../../middlewares/validateRequest";

// ──────────── 3. ATTENDANCE ENGINE ENDPOINTS ────────────
router.get("/attendance", getTeacherAttendance);
router.post("/attendance", attendanceRateLimiter, validateAttendancePayload, requirePermission("attendance.create"), saveTeacherAttendance);
router.post("/attendance/offline-sync", attendanceRateLimiter, requirePermission("attendance.create"), syncOfflineAttendanceBatch);
router.post("/attendance/correction-request", attendanceRateLimiter, requestAttendanceCorrection);
router.put("/attendance/:id", attendanceRateLimiter, requirePermission("attendance.update"), updateTeacherAttendanceById);
router.get("/attendance/student/:studentId", getStudentAttendanceHistory);
router.get("/attendance/report", getTeacherAttendanceReport);





// ──────────── 4. HOMEWORK ENGINE ENDPOINTS ────────────
router.get("/homework", getTeacherHomework);
router.post("/homework", requirePermission("homework.create"), createTeacherHomework);
router.get("/homework/:id", getTeacherHomeworkById);
router.put("/homework/:id", requirePermission("homework.update"), updateTeacherHomeworkById);
router.delete("/homework/:id", requirePermission("homework.delete"), deleteTeacherHomeworkById);
router.post("/homework/:id/publish", requirePermission("homework.publish"), publishTeacherHomeworkById);
router.patch("/homework/:id/publish", requirePermission("homework.publish"), publishTeacherHomeworkById);


// ──────────── 5. ASSIGNMENTS ENGINE ENDPOINTS ────────────
router.get("/assignments", getTeacherAssignments);
router.post("/assignments", requirePermission("assignments.create"), createTeacherAssignment);
router.get("/assignments/:id", getTeacherAssignmentById);
router.put("/assignments/:id", requirePermission("assignments.update"), updateTeacherAssignmentById);
router.delete("/assignments/:id", requirePermission("assignments.delete"), deleteTeacherAssignmentById);
router.get("/assignments/:id/submissions", getAssignmentSubmissions);
router.post("/assignments/:id/publish", requirePermission("assignments.publish"), publishTeacherAssignmentById);
router.patch("/assignments/:id/publish", requirePermission("assignments.publish"), publishTeacherAssignmentById);


// ──────────── 6. STUDY MATERIAL LIBRARY ENDPOINTS ────────────
router.get("/materials", getTeacherMaterials);
router.post("/materials", requirePermission("materials.create"), uploadTeacherMaterial);
router.get("/materials/:id", getTeacherMaterialById);
router.put("/materials/:id", requirePermission("materials.update"), updateTeacherMaterialById);
router.delete("/materials/:id", requirePermission("materials.delete"), deleteTeacherMaterialById);


// ──────────── 7. WEEKLY TEST ENGINE ENDPOINTS ────────────
router.post("/weekly-tests", requirePermission("weeklytests.create"), createTeacherTest);
router.get("/weekly-tests", getTeacherTests);
router.get("/weekly-tests/:id", getTeacherTestById);
router.put("/weekly-tests/:id", requirePermission("weeklytests.update"), updateTeacherTestById);
router.post("/weekly-tests/:id/questions", requirePermission("weeklytests.update"), addQuestionsToWeeklyTest);
router.post("/weekly-tests/:id/publish", requirePermission("weeklytests.publish"), publishWeeklyTest);
router.patch("/weekly-tests/:id/publish", requirePermission("weeklytests.publish"), publishWeeklyTest);
router.post("/weekly-tests/:id/results", requirePermission("weeklyresults.create"), submitWeeklyTestResults);
router.get("/weekly-tests/:id/results", getWeeklyTestResults);

// Legacy tests route
router.get("/tests", getTeacherTests);
router.post("/tests", createTeacherTest);


// ──────────── 8. EXAMINATION & MARKS ENTRY ENGINE ENDPOINTS ────────────
router.get("/exams", getTeacherExams);
router.get("/exams/:id", getTeacherExamById);
router.get("/exams/:id/students", getTeacherExamStudentsForMarks);
router.post("/exams/:id/marks", requirePermission("marks.create"), saveTeacherMarks);
router.put("/exams/:id/marks", requirePermission("marks.update"), updateTeacherMarksById);
router.put("/exams/:id/marks/:studentId", requirePermission("marks.update"), updateTeacherMarksById);

// Direct Aliases
router.post("/marks", requirePermission("marks.create"), saveTeacherMarks);
router.put("/marks/:id", requirePermission("marks.update"), updateTeacherMarksById);


// ──────────── 9. REPORT CARD SUBMISSION ENDPOINTS ────────────
router.get("/report-cards", getTeacherReportCards);
router.get("/report-cards/:studentId", getStudentReportCardById);
router.post("/report-cards/:studentId/submit", requirePermission("reports.create"), submitStudentReportCard);
router.post("/report-cards/publish", requirePermission("reports.publish"), publishTeacherReportCards);


// ──────────── 10. MESSAGES & ANNOUNCEMENTS ENDPOINTS ────────────
router.get("/messages", getTeacherMessages);
router.post("/messages", requirePermission("messages.create"), sendTeacherMessage);
router.get("/messages/:id", getTeacherMessageThreadById);
router.post("/announcements", requirePermission("announcements.create"), createTeacherAnnouncement);
router.get("/announcements", getTeacherAnnouncements);

// ──────────── 11. NOTIFICATION CENTER ENDPOINTS ────────────
router.get("/notifications", getTeacherNotifications);
router.patch("/notifications/read-all", markAllTeacherNotificationsRead);
router.patch("/notifications/:id/read", markTeacherNotificationRead);




// ──────────── 12. TEACHER ANALYTICS ENDPOINTS ────────────
router.get("/analytics/overview", getTeacherAnalyticsOverview);
router.get("/analytics/classes/:id", getTeacherAnalyticsClassById);
router.get("/analytics/students/:id", getStudentPerformanceAnalytics);

// Legacy Root Endpoints
router.get("/", getTeachers);
router.post("/", createTeacher);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;

