import { Router } from "express";
import { getSupportTickets } from "./support.controller";

const router = Router();
router.get("/tickets", getSupportTickets);
export default router;
