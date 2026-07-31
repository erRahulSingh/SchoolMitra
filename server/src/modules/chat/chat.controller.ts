// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Teacher-Parent Realtime Chat Controller (Phase 11)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";

const messagesStore: Record<string, any[]> = {
  "STU-1001": [
    { id: "MSG-01", sender: "Sunita Rao (Physics Teacher)", text: "Aarav performed exceptionally well in yesterday's Physics lab numericals!", timestamp: "09:30 AM", isSelf: false },
    { id: "MSG-02", sender: "Rajesh Sharma (Parent)", text: "Thank you ma'am! We appreciate your guidance.", timestamp: "09:42 AM", isSelf: true }
  ]
};

export const getChatMessages = asyncHandler(async (req: Request, res: Response) => {
  const { recipientId = "STU-1001" } = req.params;

  const msgs = messagesStore[recipientId] || [
    { id: "MSG-01", sender: "Class Teacher", text: "Hello! Feel free to leave a message regarding academic updates.", timestamp: "10:00 AM", isSelf: false }
  ];

  return ApiResponse.success(res, 200, "Chat conversation history retrieved", { recipientId, messages: msgs });
});

export const sendChatMessage = asyncHandler(async (req: Request, res: Response) => {
  const { recipientId = "STU-1001", text, sender } = req.body;

  if (!text) throw ApiError.badRequest("Message text is required.");

  if (!messagesStore[recipientId]) {
    messagesStore[recipientId] = [];
  }

  const newMsg = {
    id: `MSG-${Date.now()}`,
    sender: sender || "Parent",
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    isSelf: true
  };

  messagesStore[recipientId].push(newMsg);
  return ApiResponse.created(res, "Chat message dispatched successfully.", { message: newMsg });
});
