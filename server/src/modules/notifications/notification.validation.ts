// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Notification Validation Helpers
// ═══════════════════════════════════════════════════════════

import { Types } from "mongoose";

export const validateNotificationPayload = (payload: any) => {
  if (!payload.title || typeof payload.title !== "string" || !payload.title.trim()) {
    return "Notification title is required.";
  }
  if (!payload.message && !payload.body) {
    return "Notification message body is required.";
  }
  if (payload.recipientId && !Types.ObjectId.isValid(payload.recipientId)) {
    return "Invalid recipientId ObjectId format.";
  }
  return null;
};
