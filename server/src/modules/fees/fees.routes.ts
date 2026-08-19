// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Fees & Finance Management Routes (Phase 9)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getFeeStructures,
  createFeeStructure,
  assignFeeStructure,
  collectFeePayment,
  verifyFeePayment,
  getFeeReceiptByNo,
  getCollectionsReport,
  getDefaultersReport,
  sendFeeReminderNotification,
  applyStudentFeeOverride,
  getStudentFeeLedger
} from "./fees.controller";

const router = Router();

// Fee Structures & Assignments
router.get("/structure", getFeeStructures);
router.post("/structure", createFeeStructure);
router.post("/assign", assignFeeStructure);
router.post("/students/override", applyStudentFeeOverride);
router.get("/ledger/:studentId", getStudentFeeLedger);

// Payment Collections & Verification
router.post("/collect", collectFeePayment);
router.post("/payment/verify", verifyFeePayment);
router.post("/remind", sendFeeReminderNotification);
router.post("/reminders", sendFeeReminderNotification);

// Receipts & Reports
router.get("/receipt/:receiptNo", getFeeReceiptByNo);
router.get("/reports/collections", getCollectionsReport);
router.get("/reports/defaulters", getDefaultersReport);

export default router;
