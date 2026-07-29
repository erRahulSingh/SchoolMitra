// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Student Management Routes
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent
} from "./students.controller";

const router = Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
