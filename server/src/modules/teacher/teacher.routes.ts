// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Teacher Management Routes
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getTeachers,
  createTeacher,
  getTeacherById,
  updateTeacher,
  assignSubject,
  deleteTeacher
} from "./teacher.controller";

const router = Router();

router.get("/", getTeachers);
router.post("/", createTeacher);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacher);
router.post("/:id/assign-subject", assignSubject);
router.delete("/:id", deleteTeacher);

export default router;
