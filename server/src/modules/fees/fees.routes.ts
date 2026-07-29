// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Fee Management Routes
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getFeeStructures,
  createFeeStructure,
  getInvoices,
  createInvoice,
  recordPayment,
  getPaymentReceipts,
  getFeeDueReport,
  sendDueReminder
} from "./fees.controller";

const router = Router();

router.get("/structures", getFeeStructures);
router.post("/structures", createFeeStructure);
router.get("/invoices", getInvoices);
router.post("/invoices", createInvoice);
router.post("/payments/collect", recordPayment);
router.get("/receipts", getPaymentReceipts);
router.get("/due-report", getFeeDueReport);
router.post("/due-reminder", sendDueReminder);

export default router;
