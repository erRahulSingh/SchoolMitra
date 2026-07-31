// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Support & Request Center Controller (Phase 11)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";

const supportTicketsStore: any[] = [
  { id: "TCK-1092", parentName: "Rajesh Sharma", studentName: "Aarav Sharma", category: "Fee Issue", subject: "Duplicate Transaction Deduction", status: "OPEN", priority: "HIGH", createdAt: "2026-07-30", replies: [] },
  { id: "TCK-1093", parentName: "Suresh Patel", studentName: "Ananya Patel", category: "Transport Complaint", subject: "Bus #02 Delayed by 15 mins", status: "RESOLVED ✅", priority: "MEDIUM", createdAt: "2026-07-28", replies: [{ sender: "Admin Desk", text: "Driver was rerouted due to road construction at Sector 14 flyover.", date: "2026-07-28" }] }
];

export const getSupportTickets = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Support tickets list retrieved", { tickets: supportTicketsStore });
});

export const createSupportTicket = asyncHandler(async (req: Request, res: Response) => {
  const { parentName, studentName, category, subject, description } = req.body;

  if (!category || !subject) {
    throw ApiError.badRequest("Category and subject are required.");
  }

  const newTicket = {
    id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
    parentName: parentName || "Parent",
    studentName: studentName || "Student",
    category,
    subject,
    description: description || "",
    status: "OPEN",
    priority: "MEDIUM",
    createdAt: new Date().toISOString().split("T")[0],
    replies: []
  };

  supportTicketsStore.unshift(newTicket);
  return ApiResponse.created(res, "Support ticket created successfully.", { ticket: newTicket });
});

export const replySupportTicket = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { replyText, status } = req.body;

  const target = supportTicketsStore.find(t => t.id === id);
  if (!target) {
    throw ApiError.notFound("Support ticket not found.");
  }

  if (replyText) {
    target.replies.push({ sender: "School Admin", text: replyText, date: new Date().toISOString() });
  }

  if (status) {
    target.status = status;
  }

  return ApiResponse.success(res, 200, "Support ticket reply recorded.", { ticket: target });
});
