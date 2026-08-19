// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Teacher Homework Controller (Dynamic DB Bound)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { notifyParent } from "../../../services/pushNotificationService";
import { sendClassNotification } from "../../../services/notificationService";
import { HomeworkModel } from "../../../models/AcademicSchemas";
import { StudentModel, TeacherAssignmentModel } from "../../../models/SchoolSchemas";
import mongoose from "mongoose";

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

// ════════════ 1. GET /api/v1/teacher/homework — List Homework Assignments ════════════
export const getTeacherHomework = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";

  const { classId, sectionId, status } = req.query;

  const query: any = {
    schoolId,
    teacherId: new mongoose.Types.ObjectId(teacherId)
  };

  if (classId) query.classId = new mongoose.Types.ObjectId(classId as string);
  if (sectionId) query.sectionId = new mongoose.Types.ObjectId(sectionId as string);
  if (status) {
    query.status = (status as string).toUpperCase();
  }

  const list = await HomeworkModel.find(query)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .sort({ createdAt: -1 })
    .lean();

  const formattedList = [];
  for (const hw of list) {
    const totalStudents = await StudentModel.countDocuments({
      schoolId,
      classId: hw.classId?._id || hw.classId,
      sectionId: hw.sectionId?._id || hw.sectionId,
      status: "Active"
    });

    formattedList.push({
      id: String(hw._id),
      schoolId: String(hw.schoolId),
      teacherId: String(hw.teacherId),
      classId: String(hw.classId?._id || hw.classId),
      className: (hw.classId as any)?.className || "Class",
      sectionId: String(hw.sectionId?._id || hw.sectionId),
      sectionName: (hw.sectionId as any)?.sectionName || "A",
      subjectId: String(hw.subjectId?._id || hw.subjectId),
      subjectName: (hw.subjectId as any)?.subjectName || "Subject",
      title: hw.title,
      description: hw.description || "",
      attachments: hw.attachments || [],
      assignedDate: hw.assignedDate,
      dueDate: hw.dueDate,
      status: hw.status,
      totalStudents
    });
  }

  return ApiResponse.success(res, 200, "Homework assignments roster retrieved successfully", {
    totalCount: formattedList.length,
    homeworkList: formattedList
  });
});

// ════════════ 2. POST /api/v1/teacher/homework — Create Homework (DRAFT / PUBLISHED) ════════════
export const createTeacherHomework = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";

  const { classId, sectionId, subjectId, title, description, assignedDate, dueDate, attachments = [], status = "DRAFT", academicYearId } = req.body;

  if (!classId || !sectionId || !subjectId || !title || !dueDate) {
    return ApiResponse.error(res, 400, "classId, sectionId, subjectId, title, and dueDate are required.", "VALIDATION_ERROR");
  }

  const normalizedStatus = status.toUpperCase() as "DRAFT" | "PUBLISHED" | "CLOSED";
  if (!["DRAFT", "PUBLISHED", "CLOSED"].includes(normalizedStatus)) {
    return ApiResponse.error(res, 400, "Invalid status. Supported: DRAFT, PUBLISHED, CLOSED", "VALIDATION_ERROR");
  }

  // 1. Verify Teacher is assigned to this Class Section & Subject
  const assignment = await TeacherAssignmentModel.findOne({
    schoolId,
    teacherId,
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: new mongoose.Types.ObjectId(sectionId),
    subjectId: new mongoose.Types.ObjectId(subjectId),
    status: "Active"
  }).lean();

  if (!assignment) {
    return ApiResponse.error(res, 403, "Access Denied: You are not assigned to teach this subject in this class section.", "FORBIDDEN");
  }

  // 2. Create the homework record
  const homework = await HomeworkModel.create({
    schoolId,
    teacherId: new mongoose.Types.ObjectId(teacherId),
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: new mongoose.Types.ObjectId(sectionId),
    subjectId: new mongoose.Types.ObjectId(subjectId),
    academicYearId: academicYearId ? new mongoose.Types.ObjectId(academicYearId) : (assignment.academicYearId || undefined),
    title,
    description: description || "",
    assignedDate: assignedDate ? new Date(assignedDate) : new Date(),
    dueDate: new Date(dueDate),
    attachments: attachments.map((a: any) => ({
      fileName: a.fileName || "file",
      fileUrl: a.fileUrl || "",
      fileType: a.fileType || ""
    })),
    status: normalizedStatus
  });

  // 3. Send Notification if Published immediately
  if (normalizedStatus === "PUBLISHED") {
    try {
      notifyParent(
        "ExponentPushToken[SampleParentToken]",
        "HOMEWORK_PUBLISHED",
        "New Homework Published 📚",
        `New Homework assigned: "${title}". Due Date: ${new Date(dueDate).toDateString()}`,
        { homeworkId: String(homework._id) }
      );
    } catch (e) {}

    emitParentSyncEvent("PARENT_HOMEWORK_CREATED", {
      title: "New Homework Available 📚",
      message: `New homework has been published. Title: ${title}. Due Date: ${new Date(dueDate).toDateString()}`,
      homeworkId: String(homework._id)
    });
  }

  return ApiResponse.created(res, `Homework created successfully as ${normalizedStatus}`, { homework });
});

// ════════════ 3. GET /api/v1/teacher/homework/:id — Retrieve Specific Homework Details ════════════
export const getTeacherHomeworkById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const hw = await HomeworkModel.findById(id)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .lean();

  if (!hw) {
    return ApiResponse.error(res, 404, "Homework assignment not found.", "NOT_FOUND");
  }

  if (String(hw.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied: Cross-tenant query blocked.", "FORBIDDEN");
  }

  const totalStudents = await StudentModel.countDocuments({
    schoolId,
    classId: hw.classId?._id || hw.classId,
    sectionId: hw.sectionId?._id || hw.sectionId,
    status: "Active"
  });

  return ApiResponse.success(res, 200, "Homework details retrieved", {
    homework: {
      id: String(hw._id),
      schoolId: String(hw.schoolId),
      teacherId: String(hw.teacherId),
      classId: String(hw.classId?._id || hw.classId),
      className: `${(hw.classId as any)?.className || "Class"} - Section ${(hw.sectionId as any)?.sectionName || "A"}`,
      subjectId: String(hw.subjectId?._id || hw.subjectId),
      subjectName: (hw.subjectId as any)?.subjectName || "Subject",
      title: hw.title,
      description: hw.description || "",
      attachments: hw.attachments || [],
      assignedDate: hw.assignedDate,
      dueDate: hw.dueDate,
      status: hw.status,
      submissionStats: { total: totalStudents, submitted: 0, pending: totalStudents, graded: 0 }
    }
  });
});

// ════════════ 4. PUT /api/v1/teacher/homework/:id — Update Homework ════════════
export const updateTeacherHomeworkById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const teacherId = user?.id || user?._id;

  const { title, description, assignedDate, dueDate, attachments, status } = req.body;

  const hw = await HomeworkModel.findById(id);
  if (!hw) {
    return ApiResponse.error(res, 404, "Homework assignment not found.", "NOT_FOUND");
  }

  if (String(hw.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied: Cross-tenant modification blocked.", "FORBIDDEN");
  }

  if (String(hw.teacherId) !== String(teacherId)) {
    return ApiResponse.error(res, 403, "Access Denied: You do not own this homework record.", "FORBIDDEN");
  }

  const oldStatus = hw.status;

  if (title !== undefined) hw.title = title;
  if (description !== undefined) hw.description = description;
  if (assignedDate !== undefined) hw.assignedDate = new Date(assignedDate);
  if (dueDate !== undefined) hw.dueDate = new Date(dueDate);
  if (attachments !== undefined) {
    hw.attachments = attachments.map((a: any) => ({
      fileName: a.fileName || "file",
      fileUrl: a.fileUrl || "",
      fileType: a.fileType || ""
    }));
  }
  
  if (status !== undefined) {
    const normalizedStatus = status.toUpperCase();
    if (["DRAFT", "PUBLISHED", "CLOSED"].includes(normalizedStatus)) {
      hw.status = normalizedStatus;
    }
  }

  await hw.save();

  // Send Notification if status changed from DRAFT to PUBLISHED
  if (hw.status === "PUBLISHED" && oldStatus !== "PUBLISHED") {
    sendClassNotification(
      schoolId,
      teacherId,
      hw.classId,
      hw.sectionId,
      "HOMEWORK",
      "New Homework Published 📚",
      `New Homework assigned: "${hw.title}". Due Date: ${new Date(hw.dueDate).toDateString()}`,
      "homeworks",
      hw._id
    );
  }

  return ApiResponse.success(res, 200, "Homework updated successfully", { homework: hw });
});

// ════════════ 5. DELETE /api/v1/teacher/homework/:id — Delete Homework ════════════
export const deleteTeacherHomeworkById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const teacherId = user?.id || user?._id;

  const hw = await HomeworkModel.findById(id);
  if (!hw) {
    return ApiResponse.error(res, 404, "Homework assignment not found.", "NOT_FOUND");
  }

  if (String(hw.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied: Cross-tenant operation blocked.", "FORBIDDEN");
  }

  if (String(hw.teacherId) !== String(teacherId)) {
    return ApiResponse.error(res, 403, "Access Denied: You do not own this homework record.", "FORBIDDEN");
  }

  await HomeworkModel.findByIdAndDelete(id);

  return ApiResponse.success(res, 200, "Homework deleted successfully.");
});

// ════════════ 6. PATCH/POST /api/v1/teacher/homework/:id/publish — Publish Draft Homework ════════════
export const publishTeacherHomeworkById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const teacherId = user?.id || user?._id;

  const hw = await HomeworkModel.findById(id);
  if (!hw) {
    return ApiResponse.error(res, 404, "Homework assignment not found.", "NOT_FOUND");
  }

  if (String(hw.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied: Cross-tenant operation blocked.", "FORBIDDEN");
  }

  if (String(hw.teacherId) !== String(teacherId)) {
    return ApiResponse.error(res, 403, "Access Denied: You do not own this homework record.", "FORBIDDEN");
  }

  hw.status = "PUBLISHED";
  await hw.save();

  sendClassNotification(
    schoolId,
    teacherId,
    hw.classId,
    hw.sectionId,
    "HOMEWORK",
    "New Homework Published 📚",
    `New Homework assigned: "${hw.title}". Due Date: ${new Date(hw.dueDate).toDateString()}`,
    "homeworks",
    hw._id
  );

  return ApiResponse.success(res, 200, `Homework published and broadcasted to Parent App!`, {
    homeworkId: String(hw._id),
    status: "PUBLISHED",
    publishedAt: new Date()
  });
});
