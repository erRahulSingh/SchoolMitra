// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Student Management Routes (Phase 4)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  updateStudentStatus,
  getStudentDocuments,
  getStudentAttendance,
  getStudentFees,
  getStudentExams,
  getStudentTransport,
  getStudentTimeline,
  getStudentParentMapping
} from "./students.controller";

const router = Router();

// Core Student CRUD Endpoints
router.get("/", getStudents);
router.post("/", createStudent);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.patch("/:id/status", updateStudentStatus);

// Student Sub-domain Endpoints
router.get("/:id/documents", getStudentDocuments);
router.get("/:id/attendance", getStudentAttendance);
router.get("/:id/fees", getStudentFees);
router.get("/:id/exams", getStudentExams);
router.get("/:id/transport", getStudentTransport);
router.get("/:id/timeline", getStudentTimeline);
router.get("/:id/parent", getStudentParentMapping);

export default router;
