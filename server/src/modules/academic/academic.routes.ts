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
  deleteTimetableEntry,
  getStudentTimetableHandler
} from "./timetable.controller";

router.get("/timetables", adminGuards, getTimetables);
router.post("/timetables", adminGuards, createTimetableEntry);
router.put("/timetables/:id", adminGuards, updateTimetableEntry);
router.delete("/timetables/:id", adminGuards, deleteTimetableEntry);
router.get("/student-timetable/:studentId", adminGuards, getStudentTimetableHandler);

// ── Report Cards ──
import {
  uploadReportCard,
  getStudentReportCards
} from "./reportCard.controller";

router.post("/report-card", adminGuards, uploadReportCard);
router.get("/report-card/:studentId", adminGuards, getStudentReportCards);

// ── Assignments ──
import {
  createAssignment,
  getAssignments,
  getStudentAssignments
} from "./assignment.controller";

router.post("/assignments", adminGuards, createAssignment);
router.get("/assignments", adminGuards, getAssignments);
router.get("/assignments/student/:studentId", adminGuards, getStudentAssignments);

// ── Study Materials ──
import {
  uploadStudyMaterial,
  getStudyMaterials,
  getStudentStudyMaterials
} from "./studyMaterial.controller";

router.post("/study-materials", adminGuards, uploadStudyMaterial);
router.get("/study-materials", adminGuards, getStudyMaterials);
router.get("/study-materials/student/:studentId", adminGuards, getStudentStudyMaterials);

// ── Exam Schedules ──
import {
  createExamSchedule,
  getExamSchedules,
  getStudentExamSchedules
} from "./examSchedule.controller";

router.post("/exams/schedules", adminGuards, createExamSchedule);
router.get("/exams/schedules", adminGuards, getExamSchedules);
router.get("/exams/schedules/student/:studentId", adminGuards, getStudentExamSchedules);

export default router;
