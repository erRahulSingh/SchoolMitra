import { Router } from "express";
import { authenticate } from "../../middleware/authGuards";
import { requireActiveSchool } from "../../middleware/tenantMiddleware";
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

// ─── STEP 21: CENTRAL REPORTS & MARKS AUTH & TENANT STATUS GUARDS ───
router.use(authenticate);
router.use(requireActiveSchool);

router.get("/attendance", getAttendanceReportMaster);
router.get("/exams", getExamReportMaster);
router.get("/fees", getFeesReportMaster);
router.get("/transport", getTransportReportMaster);
router.get("/students", getStudentsReportMaster);
router.get("/teachers", getTeachersReportMaster);
router.get("/generate", generateReport);

export default router;
