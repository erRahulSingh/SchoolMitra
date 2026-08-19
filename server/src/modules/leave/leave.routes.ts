// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Leave Management Routes (Phase 10)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  applyLeave,
  getLeaveApplications,
  getLeaveById,
  approveLeave,
  rejectLeave,
  cancelLeave,
  getLeaveBalance,
  getAllLeaveBalances,
  getLeaveHistory,
  applyStudentLeave,
  getStudentLeaveHistory
} from "./leave.controller";

const router = Router();

// Teacher/Staff Leave
router.post("/apply", applyLeave);
router.get("/applications", getLeaveApplications);
router.get("/applications/:id", getLeaveById);
router.patch("/applications/:id/approve", approveLeave);
router.patch("/applications/:id/reject", rejectLeave);
router.patch("/applications/:id/cancel", cancelLeave);

// Leave Balance
router.get("/balance", getAllLeaveBalances);
router.get("/balance/:staffId", getLeaveBalance);

// Leave History
router.get("/history/:applicantId", getLeaveHistory);

// Student Leave (Parent submits)
router.post("/student/apply", applyStudentLeave);
router.get("/student/:studentId", getStudentLeaveHistory);

export default router;
