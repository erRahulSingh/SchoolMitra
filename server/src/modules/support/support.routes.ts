// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Support & Request Center Routes (Phase 11)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import { getSupportTickets, createSupportTicket, replySupportTicket } from "./support.controller";
import { authenticate } from "../../middleware/authGuards";

const router = Router();

router.use(authenticate);

router.get("/tickets", getSupportTickets);
router.post("/tickets", createSupportTicket);
router.post("/tickets/:id/reply", replySupportTicket);

export default router;
