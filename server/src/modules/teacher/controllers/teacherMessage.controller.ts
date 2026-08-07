import { Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";

function emitParentSyncEvent(eventName: string, payload: any) {
  try {
    const io = (global as any).io;
    const now = new Date().toISOString();
    if (io) {
      io.emit("teacher:notification_created", { eventName: "teacher:notification_created", ...payload, timestamp: now });
      io.emit("parent:notification_update", { eventName: "parent:notification_update", title: payload.title, body: payload.message, ...payload, timestamp: now });
    }
  } catch (err) {}
}

export const getTeacherMessages = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Parent conversation threads for assigned students retrieved", {
    totalThreads: 3,
    threads: [
      {
        threadId: "msg_601",
        studentId: "st_101",
        studentName: "Aarav Sharma",
        parentName: "Mr. Rajesh Kumar",
        className: "Class 8 - Section A",
        lastMessage: "Thank you sir, we will make sure he completes the math worksheet tonight.",
        lastMessageTime: "10:15 AM",
        unreadCount: 1
      }
    ]
  });
});

export const getTeacherMessageThreadById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  return ApiResponse.success(res, 200, `Message thread ${id} details retrieved`, {
    threadId: id || "msg_601",
    studentId: "st_101",
    studentName: "Aarav Sharma",
    parentName: "Mr. Rajesh Kumar",
    chatHistory: [
      { id: "chat_1", sender: "Teacher", text: "Good morning Mr. Rajesh. Aarav scored 29/30 in today's weekly test.", time: "09:30 AM", status: "Read" }
    ]
  });
});

export const sendTeacherMessage = asyncHandler(async (req: Request, res: Response) => {
  const { studentId = "st_101", parentName = "Mr. Rajesh Kumar", messageText } = req.body;

  if (!messageText) {
    return ApiResponse.error(res, 400, "Message text is required");
  }

  emitParentSyncEvent("PARENT_NOTIFICATION_RECEIVED", {
    title: `Direct Message from Class Teacher 💬`,
    message: messageText,
    studentId,
    parentName,
    sentAt: new Date().toISOString()
  });

  return ApiResponse.created(res, "Message delivered & broadcasted to Parent App in real-time!", {
    messageRecord: {
      id: `chat_${Date.now()}`,
      studentId,
      parentName,
      text: messageText,
      status: "Sent",
      syncedToParentApp: true,
      sentAt: new Date().toISOString()
    }
  });
});

export const createTeacherAnnouncement = asyncHandler(async (req: Request, res: Response) => {
  const { classId = "class_8", sectionId = "sec_a", title, content, category = "Academic Notice", priority = "High" } = req.body;

  if (!title || !content) {
    return ApiResponse.error(res, 400, "Title and content are required for announcement");
  }

  const io = (global as any).io;
  if (io) {
    io.emit("teacher:announcement_created", { title, content, classId, sectionId });
    io.emit("parent:notification_update", { title: `Class Notice: ${title}`, body: content });
  }

  return ApiResponse.created(res, "Announcement published & broadcasted to assigned class parents in real-time!", {
    announcement: {
      id: `ann_${Date.now()}`,
      classId,
      sectionId,
      title,
      content,
      category,
      priority,
      syncedToParentApp: true,
      publishedAt: new Date().toISOString()
    }
  });
});

export const getTeacherAnnouncements = asyncHandler(async (req: Request, res: Response) => {
  const { classId = "class_8", sectionId = "sec_a" } = req.query;

  return ApiResponse.success(res, 200, "Class announcements list retrieved", {
    classId,
    sectionId,
    totalAnnouncements: 2,
    announcements: [
      {
        id: "ann_701",
        title: "Parent Teacher Meeting (PTM) Scheduled",
        content: "Annual Term-1 PTM is scheduled for Saturday, 28 May 2024 from 09:00 AM to 01:00 PM.",
        category: "PTM Notice",
        publishedAt: "2024-05-20T09:00:00.000Z"
      }
    ]
  });
});
