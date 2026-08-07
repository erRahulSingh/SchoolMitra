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
  deleteTeacher
} from "./teacher.controller";

import { enforceTeacherPermissions } from "../../middlewares/teacherPermissions";

const router = Router();

import { teacherOpenApiSpec } from "../../docs/swaggerTeacherDoc";

// ──────────── 0. SWAGGER OPENAPI SPEC DOCUMENTATION ENDPOINT ────────────
router.get("/docs", (req, res) => res.json(teacherOpenApiSpec));

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
router.get("/timetable", getTeacherTimetable);
router.get("/timetable/today", getTeacherTodayTimetable);
router.get("/timetable/week", getTeacherWeeklyTimetable);

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



import { attendanceRateLimiter, messageRateLimiter, fileUploadRateLimiter } from "../../middlewares/rateLimiter";
import { validateAttendancePayload, validatePayload } from "../../middlewares/validateRequest";

// ──────────── 3. ATTENDANCE ENGINE ENDPOINTS ────────────
router.get("/attendance", getTeacherAttendance);
router.post("/attendance", attendanceRateLimiter, validateAttendancePayload, saveTeacherAttendance);
router.post("/attendance/offline-sync", attendanceRateLimiter, syncOfflineAttendanceBatch);
router.post("/attendance/correction-request", attendanceRateLimiter, requestAttendanceCorrection);
router.put("/attendance/:id", attendanceRateLimiter, updateTeacherAttendanceById);
router.get("/attendance/student/:studentId", getStudentAttendanceHistory);
router.get("/attendance/report", getTeacherAttendanceReport);





// ──────────── 4. HOMEWORK ENGINE ENDPOINTS ────────────
router.get("/homework", getTeacherHomework);
router.post("/homework", createTeacherHomework);
router.get("/homework/:id", getTeacherHomeworkById);
router.put("/homework/:id", updateTeacherHomeworkById);
router.delete("/homework/:id", deleteTeacherHomeworkById);
router.post("/homework/:id/publish", publishTeacherHomeworkById);


// ──────────── 5. ASSIGNMENTS ENGINE ENDPOINTS ────────────
router.get("/assignments", getTeacherAssignments);
router.post("/assignments", createTeacherAssignment);
router.get("/assignments/:id", getTeacherAssignmentById);
router.put("/assignments/:id", updateTeacherAssignmentById);
router.delete("/assignments/:id", deleteTeacherAssignmentById);
router.get("/assignments/:id/submissions", getAssignmentSubmissions);


// ──────────── 6. STUDY MATERIAL LIBRARY ENDPOINTS ────────────
router.get("/materials", getTeacherMaterials);
router.post("/materials", uploadTeacherMaterial);
router.get("/materials/:id", getTeacherMaterialById);
router.put("/materials/:id", updateTeacherMaterialById);
router.delete("/materials/:id", deleteTeacherMaterialById);


// ──────────── 7. WEEKLY TEST ENGINE ENDPOINTS ────────────
router.post("/weekly-tests", createTeacherTest);
router.get("/weekly-tests", getTeacherTests);
router.get("/weekly-tests/:id", getTeacherTestById);
router.put("/weekly-tests/:id", updateTeacherTestById);
router.post("/weekly-tests/:id/questions", addQuestionsToWeeklyTest);
router.post("/weekly-tests/:id/publish", publishWeeklyTest);
router.post("/weekly-tests/:id/results", submitWeeklyTestResults);
router.get("/weekly-tests/:id/results", getWeeklyTestResults);

// Legacy tests route
router.get("/tests", getTeacherTests);
router.post("/tests", createTeacherTest);


// ──────────── 8. EXAMINATION & MARKS ENTRY ENGINE ENDPOINTS ────────────
router.get("/exams", getTeacherExams);
router.get("/exams/:id", getTeacherExamById);
router.get("/exams/:id/students", getTeacherExamStudentsForMarks);
router.post("/exams/:id/marks", saveTeacherMarks);
router.put("/exams/:id/marks", updateTeacherMarksById);


// ──────────── 9. REPORT CARD SUBMISSION ENDPOINTS ────────────
router.get("/report-cards", getTeacherReportCards);
router.get("/report-cards/:studentId", getStudentReportCardById);
router.post("/report-cards/:studentId/submit", submitStudentReportCard);
router.post("/report-cards/publish", publishTeacherReportCards);


// ──────────── 10. MESSAGES & ANNOUNCEMENTS ENDPOINTS ────────────
router.get("/messages", getTeacherMessages);
router.post("/messages", sendTeacherMessage);
router.get("/messages/:id", getTeacherMessageThreadById);
router.post("/announcements", createTeacherAnnouncement);
router.get("/announcements", getTeacherAnnouncements);

// ──────────── 11. NOTIFICATION CENTER ENDPOINTS ────────────
router.get("/notifications", getTeacherNotifications);
router.patch("/notifications/read-all", markAllTeacherNotificationsRead);
router.patch("/notifications/:id/read", markTeacherNotificationRead);




// Legacy Root Endpoints
router.get("/", getTeachers);
router.post("/", createTeacher);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;

