// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — School Tenant Routes
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getAllSchools,
  createSchool,
  getSchoolById,
  updateSchool,
  toggleSchoolStatus,
  getSchoolSettings,
  updateSchoolSettings,
  deleteSchool
} from "./schools.controller";

const router = Router();

router.get("/", getAllSchools);
router.post("/", createSchool);
router.get("/:id", getSchoolById);
router.put("/:id", updateSchool);
router.patch("/:id/status", toggleSchoolStatus);
router.get("/:id/settings", getSchoolSettings);
router.put("/:id/settings", updateSchoolSettings);
router.delete("/:id", deleteSchool);

export default router;
