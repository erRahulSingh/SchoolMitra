// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Academic Management Routes (Phase 6)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getClasses,
  createClass,
  getSections,
  getSubjects,
  createSubject,
  getTimetable,
  createTimetableSlot,
  getHomework,
  createHomework,
  getAssignments,
  createAssignment,
  getStudyMaterials,
  getLessonPlans
} from "./academics.controller";

const router = Router();

// Classes & Sections
router.get("/classes", getClasses);
router.post("/classes", createClass);
router.get("/sections", getSections);

// Subjects
router.get("/subjects", getSubjects);
router.post("/subjects", createSubject);

// Timetable
router.get("/timetable", getTimetable);
router.post("/timetable", createTimetableSlot);

// Homework & Assignments
router.get("/homework", getHomework);
router.post("/homework", createHomework);
router.get("/assignments", getAssignments);
router.post("/assignments", createAssignment);

// Materials & Lesson Plans
router.get("/materials", getStudyMaterials);
router.get("/lesson-plans", getLessonPlans);

export default router;
