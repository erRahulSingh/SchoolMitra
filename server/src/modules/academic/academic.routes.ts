// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Academic Structure Routes
// Mounted at /api/v1/admin/academics
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import { authenticate, requireSchool, requireRole } from "../../middleware/authGuards";
import {
  getAcademicStructure,
  seedAcademicStructure,
  getAcademicYears,
  createAcademicYear,
  getClasses,
  createClass,
  getSections,
  createSection,
  getSubjects,
  createSubject
} from "./academic.controller";

const router = Router();

// Full pipeline guards: authenticate → requireSchool → requireRole(SchoolAdmin, SuperAdmin)
const adminGuards = [authenticate, requireSchool, requireRole("SchoolAdmin", "SuperAdmin")];

// ── Unified Academic Structure ──
router.get("/academic-structure", adminGuards, getAcademicStructure);
router.post("/academic-structure/seed", adminGuards, seedAcademicStructure);

// ── Academic Years ──
router.get("/academic-years", adminGuards, getAcademicYears);
router.post("/academic-years", adminGuards, createAcademicYear);

// ── Classes ──
router.get("/classes", adminGuards, getClasses);
router.post("/classes", adminGuards, createClass);

// ── Sections ──
router.get("/sections", adminGuards, getSections);
router.post("/sections", adminGuards, createSection);

// ── Subjects ──
router.get("/subjects", adminGuards, getSubjects);
router.post("/subjects", adminGuards, createSubject);

// ── Teacher Assignments ──
import {
  getTeacherAssignments,
  createTeacherAssignment,
  updateTeacherAssignment,
  deleteTeacherAssignment
} from "./teacherAssignment.controller";

router.get("/teacher-assignments", adminGuards, getTeacherAssignments);
router.post("/teacher-assignments", adminGuards, createTeacherAssignment);
router.put("/teacher-assignments/:id", adminGuards, updateTeacherAssignment);
router.delete("/teacher-assignments/:id", adminGuards, deleteTeacherAssignment);

// ── Class Teacher Assignments ──
import {
  getClassTeacherAssignments,
  createClassTeacherAssignment,
  updateClassTeacherAssignment,
  deleteClassTeacherAssignment
} from "./classTeacherAssignment.controller";

router.get("/class-teachers", adminGuards, getClassTeacherAssignments);
router.post("/class-teachers", adminGuards, createClassTeacherAssignment);
router.put("/class-teachers/:id", adminGuards, updateClassTeacherAssignment);
router.delete("/class-teachers/:id", adminGuards, deleteClassTeacherAssignment);

// ── Timetable Setup ──
import {
  getTimetables,
  createTimetableEntry,
  updateTimetableEntry,
  deleteTimetableEntry
} from "./timetable.controller";

router.get("/timetables", adminGuards, getTimetables);
router.post("/timetables", adminGuards, createTimetableEntry);
router.put("/timetables/:id", adminGuards, updateTimetableEntry);
router.delete("/timetables/:id", adminGuards, deleteTimetableEntry);

export default router;
