// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Emergency Safety Broadcast Routes (Phase 11)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  triggerEmergencyBroadcast,
  getEmergencyBroadcasts
} from "./emergency.controller";

const router = Router();

router.post("/emergency-broadcast", triggerEmergencyBroadcast);
router.get("/emergency-broadcast", getEmergencyBroadcasts);

export default router;
