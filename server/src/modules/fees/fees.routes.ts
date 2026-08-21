import { Router } from "express";
import { authenticate } from "../../middleware/authGuards";
import { requireActiveSchool } from "../../middleware/tenantMiddleware";
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

// ─── STEP 22: CENTRAL FEES & FINANCE AUTH & TENANT STATUS GUARDS ───
router.use(authenticate);
router.use(requireActiveSchool);

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
