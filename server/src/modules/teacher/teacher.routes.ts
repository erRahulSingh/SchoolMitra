// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Teacher Management Routes (Phase 5)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getTeachers,
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getTeacherAttendance,
  getTeacherSalary,
  getTeacherLeaves,
  getTeacherDocuments,
  getTeacherSubjects,
  getTeacherTimetable
} from "./teacher.controller";

const router = Router();

// Core Teacher CRUD Endpoints
router.get("/", getTeachers);
router.post("/", createTeacher);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

// Sub-domain Endpoints
router.get("/:id/attendance", getTeacherAttendance);
router.get("/:id/salary", getTeacherSalary);
router.get("/:id/leaves", getTeacherLeaves);
router.get("/:id/documents", getTeacherDocuments);
router.get("/:id/subjects", getTeacherSubjects);
router.get("/:id/timetable", getTeacherTimetable);

export default router;
