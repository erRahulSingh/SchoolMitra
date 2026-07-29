// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Razorpay Payment Routes
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  processSubscriptionPayment
} from "./payment.controller";

const router = Router();

router.post("/create-order", createRazorpayOrder);
router.post("/verify", verifyRazorpayPayment);
router.post("/subscription", processSubscriptionPayment);

export default router;
