import { Router } from "express";
import { processPayment } from "./payment.controller";

const router = Router();
router.post("/process", processPayment);
export default router;
