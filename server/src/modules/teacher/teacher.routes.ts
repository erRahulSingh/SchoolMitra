// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Teacher & Parent Sync Routes
// All 12 Microservice API Endpoints
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getTeacherDashboard,
  getTeacherClasses,
  getTeacherStudents,
  getTeacherAttendance,
  saveTeacherAttendance,
  getTeacherHomework,
  createTeacherHomework,
  getTeacherAssignments,
  createTeacherAssignment,
  getTeacherMaterials,
  uploadTeacherMaterial,
  getTeacherTests,
  createTeacherTest,
  getTeacherExams,
  saveTeacherMarks,
  getTeacherReportCards,
  publishTeacherReportCards,
  getTeacherMessages,
  sendTeacherMessage,
  getTeacherProfile,
  updateTeacherProfile,
  getTeachers,
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher
} from "./teacher.controller";

import { enforceTeacherPermissions } from "../../middlewares/teacherPermissions";

const router = Router();

// Apply Strict Teacher RBAC Security Middleware
router.use(enforceTeacherPermissions);

// ──────────── 12 SPECIFIED TEACHER & PARENT SYNC ENDPOINTS ────────────
router.get("/dashboard", getTeacherDashboard);

router.get("/classes", getTeacherClasses);

router.get("/students", getTeacherStudents);

router.get("/attendance", getTeacherAttendance);
router.post("/attendance", saveTeacherAttendance);

router.get("/homework", getTeacherHomework);
router.post("/homework", createTeacherHomework);

router.get("/assignments", getTeacherAssignments);
router.post("/assignments", createTeacherAssignment);

router.get("/materials", getTeacherMaterials);
router.post("/materials", uploadTeacherMaterial);

router.get("/tests", getTeacherTests);
router.post("/tests", createTeacherTest);

router.get("/exams", getTeacherExams);
router.post("/exams", saveTeacherMarks);

router.get("/report-cards", getTeacherReportCards);
router.post("/report-cards", publishTeacherReportCards);

router.get("/messages", getTeacherMessages);
router.post("/messages", sendTeacherMessage);

router.get("/profile", getTeacherProfile);
router.put("/profile", updateTeacherProfile);

// Legacy Root Endpoints
router.get("/", getTeachers);
router.post("/", createTeacher);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
