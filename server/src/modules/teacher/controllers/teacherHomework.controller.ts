import { Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";

function emitParentSyncEvent(eventName: string, payload: any) {
  try {
    const io = (global as any).io;
    const now = new Date().toISOString();
    if (io) {
      io.emit("teacher:homework_published", { eventName: "teacher:homework_published", ...payload, timestamp: now });
      io.emit("parent:homework_update", { eventName: "parent:homework_update", title: payload.title, body: payload.message, ...payload, timestamp: now });
    }
  } catch (err) {}
}

export const getTeacherHomework = asyncHandler(async (req: Request, res: Response) => {
  const { classId = "class_8", sectionId = "sec_a" } = req.query;

  return ApiResponse.success(res, 200, "Homework assignments roster retrieved", {
    classId,
    sectionId,
    totalCount: 2,
    homeworkList: [
      {
        id: "hw_101",
        schoolId: "sch_101",
        teacherId: "tch_65a88203921",
        classId: "class_8",
        sectionId: "sec_a",
        subjectId: "sub_math",
        subjectName: "Mathematics",
        title: "Linear Equations Exercise 3.2",
        description: "Solve problems 1 to 10 from NCERT textbook Chapter 3.",
        attachments: [
          { fileName: "Math_Worksheet_Ch3.pdf", fileUrl: "https://schoolmitra.s3.amazonaws.com/docs/Math_Worksheet.pdf", fileSize: "2.4 MB" }
        ],
        dueDate: "2024-05-25",
        status: "Published",
        publishedAt: "2024-05-20T10:00:00.000Z",
        submittedCount: 28,
        totalStudents: 36
      }
    ]
  });
});

export const createTeacherHomework = asyncHandler(async (req: Request, res: Response) => {
  const { classId = "class_8", sectionId = "sec_a", subjectId = "sub_math", title, description, dueDate, attachments = [] } = req.body;

  if (!title || !dueDate) {
    return ApiResponse.error(res, 400, "Title and due date are required for homework");
  }

  const newHomework = {
    id: `hw_${Date.now()}`,
    schoolId: "sch_101",
    teacherId: "tch_65a88203921",
    classId,
    sectionId,
    subjectId,
    title,
    description: description || "",
    attachments,
    dueDate,
    status: "Draft",
    publishedAt: null,
    createdAt: new Date().toISOString()
  };

  return ApiResponse.created(res, "Homework created as draft successfully!", { homework: newHomework });
});

export const getTeacherHomeworkById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  return ApiResponse.success(res, 200, `Homework ${id} details retrieved`, {
    homework: {
      id: id || "hw_101",
      schoolId: "sch_101",
      teacherId: "tch_65a88203921",
      classId: "class_8",
      className: "Class 8 - Section A",
      subjectId: "sub_math",
      subjectName: "Mathematics",
      title: "Linear Equations Exercise 3.2",
      description: "Solve problems 1 to 10 from NCERT textbook Chapter 3.",
      attachments: [
        { fileName: "Math_Worksheet_Ch3.pdf", fileUrl: "https://schoolmitra.s3.amazonaws.com/docs/Math_Worksheet.pdf", fileSize: "2.4 MB" }
      ],
      dueDate: "2024-05-25",
      status: "Published",
      publishedAt: "2024-05-20T10:00:00.000Z",
      submissionStats: { total: 36, submitted: 28, pending: 8, graded: 25 }
    }
  });
});

export const updateTeacherHomeworkById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, dueDate, attachments } = req.body;

  return ApiResponse.success(res, 200, `Homework ${id} updated successfully!`, {
    homework: {
      id,
      title: title || "Updated Homework Title",
      description: description || "Updated instructions",
      dueDate: dueDate || "2024-05-30",
      attachments: attachments || [],
      updatedAt: new Date().toISOString()
    }
  });
});

export const deleteTeacherHomeworkById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  return ApiResponse.success(res, 200, `Homework ${id} deleted successfully.`);
});

import { notifyParent } from "../../../services/pushNotificationService";

export const publishTeacherHomeworkById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Dispatch Expo Mobile Push Notification to Parent App
  notifyParent(
    "ExponentPushToken[SampleParentToken]",
    "HOMEWORK_PUBLISHED",
    "New Homework Published 📚",
    "New Mathematics homework assigned for Class 8 - Section A. Due Date: 25 May 2024. Tap to open worksheet.",
    { homeworkId: id, subject: "Mathematics" }
  );

  emitParentSyncEvent("PARENT_HOMEWORK_CREATED", {
    title: "New Homework Available 📚",
    message: `New Mathematics homework has been published for Class 8 - Section A. Due Date: 25 May 2024. Check Parent App now.`,
    homeworkId: id,
    publishedAt: new Date().toISOString()
  });

  return ApiResponse.success(res, 200, `Homework ${id} published and broadcasted to Parent App in real-time!`, {
    homeworkId: id,
    status: "Published",
    publishedAt: new Date().toISOString(),
    parentNotificationSent: true
  });
});

