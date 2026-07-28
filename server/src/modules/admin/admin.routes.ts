import { Router } from "express";
import { getDashboardStats, getPaymentsList, getSupportTickets } from "./admin.controller";

const router = Router();

router.get("/stats", getDashboardStats);
router.get("/payments", getPaymentsList);
router.get("/support", getSupportTickets);

export default router;
