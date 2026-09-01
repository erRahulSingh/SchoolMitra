// @ts-nocheck
// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Realtime Chat Engine Routes (Phase 11)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import { authenticate } from "../../middleware/authGuards";
import { 
  getConversations, 
  getOrCreateConversation, 
  getChatMessages, 
  sendChatMessage,
  markMessageAsRead
} from "./chat.controller";

const router = Router();

// Protect all messaging endpoints
router.use(authenticate);

router.get("/conversations", getConversations);
router.post("/conversations", getOrCreateConversation);

// Get conversation messages by ID
router.get("/conversations/:id", (req, res, next) => {
  req.params.roomId = req.params.id;
  return getChatMessages(req, res, next);
});

// Post message into conversation by ID
router.post("/conversations/:id/messages", (req, res, next) => {
  req.body.roomId = req.params.id;
  return sendChatMessage(req, res, next);
});

router.get("/messages/:roomId", getChatMessages);
router.post("/messages", sendChatMessage);
router.patch("/messages/:id/read", markMessageAsRead);
router.patch("/:id/read", markMessageAsRead);

export default router;
