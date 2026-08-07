// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Support & Request Center Controller (Phase 11)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { SupportTicketModel } from "../../models/SystemSchemas";
import { Types } from "mongoose";

const dummySchoolId = new Types.ObjectId("650000000000000000000001");
const dummyUserId = new Types.ObjectId("650000000000000000000002");

// Helper to seed support tickets if empty
const getOrSeedSupportTickets = async () => {
  let tickets = await SupportTicketModel.find().lean().catch(() => []);
  if (tickets.length > 0) return tickets;

  return await SupportTicketModel.create([
    {
      schoolId: dummySchoolId,
      raisedBy: dummyUserId,
      ticketNo: "REQ-2026-802",
      subject: "Fee installment schedule query",
      category: "Billing",
      priority: "High",
      status: "Open",
      messages: [{
        senderRole: "Parent",
        text: "Please let me know if we can pay the quarter fee in monthly installments.",
        sentAt: new Date()
      }]
    },
    {
      schoolId: dummySchoolId,
      raisedBy: dummyUserId,
      ticketNo: "REQ-2026-804",
      subject: "Bus route extension to Sector 18",
      category: "Other",
      priority: "Medium",
      status: "Open",
      messages: [{
        senderRole: "Parent",
        text: "Please extend the bus route by 1km to cover Vasant Kunj Sector 18.",
        sentAt: new Date()
      }]
    }
  ]);
};

export const getSupportTickets = asyncHandler(async (_req: Request, res: Response) => {
  const tickets = await getOrSeedSupportTickets();

  const formatted = tickets.map((t: any) => {
    // Map category
    let displayCat = "Attendance Issue";
    if (t.category === "Billing") displayCat = "Fee Issue";
    else if (t.category === "FeatureRequest") displayCat = "Leave Application";
    else if (t.category === "BugReport") displayCat = "Exam & Report Card";
    else if (t.category === "Other") displayCat = "Bus / Transport";

    // Map priority
    let displayPriority = "Medium";
    if (t.priority === "Critical") displayPriority = "Urgent";
    else if (t.priority === "High") displayPriority = "High";
    else if (t.priority === "Low") displayPriority = "Low";

    // Map status
    let displayStatus = "Submitted";
    if (t.status === "InProgress") displayStatus = "In Progress";
    else if (t.status === "Resolved") displayStatus = "Resolved";
    else if (t.status === "Closed") displayStatus = "Closed";

    return {
      id: t.ticketNo || `REQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      _id: t._id.toString(),
      category: displayCat,
      subject: t.subject,
      studentName: "Rahul Sharma",
      parentName: "Vijay Sharma",
      status: displayStatus,
      priority: displayPriority,
      createdAt: t.createdAt ? new Date(t.createdAt).toISOString().split("T")[0] : "2026-08-06",
      replies: t.messages?.map((m: any) => ({
        sender: m.senderRole || "Admin Desk",
        text: m.text,
        date: m.sentAt ? new Date(m.sentAt).toISOString().split("T")[0] : "2026-08-06"
      })) || []
    };
  });

  return ApiResponse.success(res, 200, "Support tickets list retrieved", { tickets: formatted });
});

export const createSupportTicket = asyncHandler(async (req: Request, res: Response) => {
  const { parentName, studentName, category, subject, description, priority = "Medium" } = req.body;

  if (!category || !subject) {
    throw ApiError.badRequest("Category and subject are required.");
  }

  const ticketNo = `REQ-2026-${Math.floor(100 + Math.random() * 899)}`;

  // Map category to schema enum: Technical, Billing, FeatureRequest, BugReport, Other
  let mappedCategory = "Technical";
  if (category === "Fee Issue" || category === "Billing") mappedCategory = "Billing";
  else if (category === "Leave Application") mappedCategory = "FeatureRequest";
  else if (category === "Exam & Report Card" || category === "Bus / Transport") mappedCategory = "Other";

  // Map priority to schema enum: Low, Medium, High, Critical
  let mappedPriority = "Medium";
  if (priority === "Urgent") mappedPriority = "Critical";
  else if (priority === "High") mappedPriority = "High";
  else if (priority === "Low") mappedPriority = "Low";

  const ticket = await SupportTicketModel.create({
    schoolId: dummySchoolId,
    raisedBy: dummyUserId,
    ticketNo,
    subject,
    category: mappedCategory,
    priority: mappedPriority,
    status: "Open",
    messages: [{
      senderRole: "Parent",
      text: description || "Raised via parent app."
    }]
  });

  return ApiResponse.created(res, "Support ticket created successfully in MongoDB.", { ticket });
});

export const replySupportTicket = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { replyText, status } = req.body;

  const target = await SupportTicketModel.findOne({ ticketNo: id });
  if (!target) {
    throw ApiError.notFound("Support ticket not found.");
  }

  if (replyText) {
    target.messages.push({
      senderRole: "Admin Desk",
      text: replyText,
      sentAt: new Date()
    } as any);
  }

  if (status) {
    let mappedStatus = "Open";
    if (status === "In Progress" || status === "InProgress") mappedStatus = "InProgress";
    else if (status === "Resolved") mappedStatus = "Resolved";
    else if (status === "Closed") mappedStatus = "Closed";

    target.status = mappedStatus;
  }

  await target.save();

  return ApiResponse.success(res, 200, "Support ticket reply recorded.", { ticket: target });
});
