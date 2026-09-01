// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Support & Request Center Controller
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { SupportTicketModel } from "../../models/SystemSchemas";
import { createNotification } from "../../services/notificationService";

export const getSupportTickets = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user.schoolId;
  const role = user.role;

  let query: any = { schoolId };

  if (role === "Parent" || role === "Student") {
    query.raisedBy = user.id;
  }

  const tickets = await SupportTicketModel.find(query).sort({ createdAt: -1 }).lean() as any[];

  const formatted = tickets.map((t: any) => {
    let displayCat = "Attendance Issue";
    if (t.category === "Billing") displayCat = "Fee Issue";
    else if (t.category === "FeatureRequest") displayCat = "Leave Application";
    else if (t.category === "BugReport") displayCat = "Exam & Report Card";
    else if (t.category === "Other") displayCat = "Bus / Transport";

    let displayPriority = "Medium";
    if (t.priority === "Critical") displayPriority = "Urgent";
    else if (t.priority === "High") displayPriority = "High";
    else if (t.priority === "Low") displayPriority = "Low";

    let displayStatus = "Submitted";
    if (t.status === "InProgress") displayStatus = "In Progress";
    else if (t.status === "Resolved") displayStatus = "Resolved";
    else if (t.status === "Closed") displayStatus = "Closed";

    return {
      id: t.ticketNo || `REQ-${t._id.toString().slice(-4)}`,
      _id: t._id.toString(),
      category: displayCat,
      subject: t.subject,
      studentName: t.studentName || "N/A",
      parentName: t.parentName || "N/A",
      status: displayStatus,
      priority: displayPriority,
      createdAt: t.createdAt ? new Date(t.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      replies: t.messages?.map((m: any) => ({
        sender: m.senderRole || "Admin Desk",
        text: m.text,
        date: m.sentAt ? new Date(m.sentAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]
      })) || []
    };
  });

  return ApiResponse.success(res, 200, "Support tickets retrieved successfully", { tickets: formatted });
});

export const createSupportTicket = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { category, subject, description, priority = "Medium" } = req.body;

  if (!category || !subject) {
    throw ApiError.badRequest("Category and subject are required.");
  }

  const ticketNo = `REQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 8999)}`;

  let mappedCategory = "Technical";
  if (category === "Fee Issue" || category === "Billing") mappedCategory = "Billing";
  else if (category === "Leave Application") mappedCategory = "FeatureRequest";
  else if (category === "Exam & Report Card" || category === "Bus / Transport") mappedCategory = "Other";
  else if (category) mappedCategory = "Other";

  let mappedPriority = "Medium";
  if (priority === "Urgent") mappedPriority = "Critical";
  else if (priority === "High") mappedPriority = "High";
  else if (priority === "Low") mappedPriority = "Low";

  const ticket = await SupportTicketModel.create({
    schoolId: user.schoolId,
    raisedBy: user.id,
    ticketNo,
    subject,
    category: mappedCategory,
    priority: mappedPriority,
    status: "Open",
    messages: [{
      senderRole: user.role,
      text: description || "Raised via app."
    }]
  });

  await createNotification({
    schoolId: user.schoolId.toString(),
    senderId: user.id.toString(),
    recipientId: user.id.toString(), // Broadcasting to admin panel usually handled via socket
    recipientRole: "SchoolAdmin",
    type: "MESSAGE",
    title: `New Support Ticket: ${ticketNo}`,
    message: `Subject: ${subject}`
  }).catch(() => {});

  return ApiResponse.created(res, "Support ticket created successfully.", { ticket });
});

export const replySupportTicket = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;
  const { replyText, status } = req.body;

  let targetQuery: any = { schoolId: user.schoolId };
  if (id.startsWith("REQ-")) {
    targetQuery.ticketNo = id;
  } else {
    targetQuery._id = id;
  }

  const target = await SupportTicketModel.findOne(targetQuery);
  
  if (!target) {
    throw ApiError.notFound("Support ticket not found.");
  }

  if (replyText) {
    target.messages.push({
      senderRole: user.role,
      text: replyText,
      sentAt: new Date()
    } as any);
  }

  if (status && user.role === "SchoolAdmin") {
    let mappedStatus = "Open";
    if (status === "In Progress" || status === "InProgress") mappedStatus = "InProgress";
    else if (status === "Resolved") mappedStatus = "Resolved";
    else if (status === "Closed") mappedStatus = "Closed";

    target.status = mappedStatus;
  }

  await target.save();

  if (user.role === "SchoolAdmin" && replyText) {
    await createNotification({
      schoolId: user.schoolId.toString(),
      senderId: user.id.toString(),
      recipientId: target.raisedBy.toString(),
      recipientRole: "Parent",
      type: "MESSAGE",
      title: `Update on Ticket ${target.ticketNo}`,
      message: `School admin replied: ${replyText}`
    }).catch(() => {});
  }

  return ApiResponse.success(res, 200, "Support ticket updated successfully.", { ticket: target });
});
