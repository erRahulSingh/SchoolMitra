// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Universal Reports Engine Routes (Phase 12)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getAttendanceReportMaster,
  getExamReportMaster,
  getFeesReportMaster,
  getTransportReportMaster,
  getStudentsReportMaster,
  getTeachersReportMaster,
  generateReport
} from "./report.controller";

const router = Router();

router.get("/attendance", getAttendanceReportMaster);
router.get("/exams", getExamReportMaster);
router.get("/fees", getFeesReportMaster);
router.get("/transport", getTransportReportMaster);
router.get("/students", getStudentsReportMaster);
router.get("/teachers", getTeachersReportMaster);
router.get("/generate", generateReport);

export default router;
