import { Router } from "express";
import {
  getPayrollLedger,
  savePayrollRecord,
  deletePayrollRecord,
  getLeaveLedgers,
  getExpenseClaims,
  updateExpenseClaimStatus
} from "./hr.controller";

const router = Router();

// Payroll routes
router.get("/payroll", getPayrollLedger);
router.post("/payroll", savePayrollRecord);
router.delete("/payroll/:id", deletePayrollRecord);

// Leaves & entitlement
router.get("/leaves", getLeaveLedgers);

// Claims & Reimbursements
router.get("/claims", getExpenseClaims);
router.patch("/claims/:id/status", updateExpenseClaimStatus);

export default router;
