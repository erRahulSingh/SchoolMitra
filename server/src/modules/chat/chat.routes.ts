// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Realtime Chat Engine Routes (Phase 11)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import { getChatMessages, sendChatMessage } from "./chat.controller";

const router = Router();

router.get("/messages/:recipientId", getChatMessages);
router.post("/messages", sendChatMessage);

export default router;
