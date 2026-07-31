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
  getDefaultersReport
} from "./fees.controller";

const router = Router();

// Fee Structures & Assignments
router.get("/structure", getFeeStructures);
router.post("/structure", createFeeStructure);
router.post("/assign", assignFeeStructure);

// Payment Collections & Verification
router.post("/collect", collectFeePayment);
router.post("/payment/verify", verifyFeePayment);

// Receipts & Reports
router.get("/receipt/:receiptNo", getFeeReceiptByNo);
router.get("/reports/collections", getCollectionsReport);
router.get("/reports/defaulters", getDefaultersReport);

export default router;
