// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Teacher Assignment Controller (Dynamic DB Bound)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { notifyParent } from "../../../services/pushNotificationService";
import { AssignmentModel } from "../../../models/AcademicSchemas";
import { StudentModel, TeacherAssignmentModel } from "../../../models/SchoolSchemas";
import mongoose from "mongoose";

function emitParentSyncEvent(eventName: string, payload: any) {
  try {
    const io = (global as any).io;
    const now = new Date().toISOString();
    if (io) {
      io.emit("teacher:assignment_published", { eventName: "teacher:assignment_published", ...payload, timestamp: now });
      io.emit("parent:assignment_update", { eventName: "parent:assignment_update", title: payload.title, body: payload.message, ...payload, timestamp: now });
    }
  } catch (err) {}
}

// ════════════ 1. GET /api/v1/teacher/assignments — List Assignments ════════════
export const getTeacherAssignments = asyncHandler(async (req: Request, res: Response) => {
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

  const list = await AssignmentModel.find(query)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .sort({ createdAt: -1 })
    .lean();

  const formattedList = [];
  for (const asg of list) {
    const totalStudents = await StudentModel.countDocuments({
      schoolId,
      classId: asg.classId?._id || asg.classId,
      sectionId: asg.sectionId?._id || asg.sectionId,
      status: "Active"
    });

    formattedList.push({
      id: String(asg._id),
      schoolId: String(asg.schoolId),
      teacherId: String(asg.teacherId),
      classId: String(asg.classId?._id || asg.classId),
      className: (asg.classId as any)?.className || "Class",
      sectionId: String(asg.sectionId?._id || asg.sectionId),
      sectionName: (asg.sectionId as any)?.sectionName || "A",
      subjectId: String(asg.subjectId?._id || asg.subjectId),
      subjectName: (asg.subjectId as any)?.subjectName || "Subject",
      title: asg.title,
      description: asg.description || "",
      maxMarks: asg.maxMarks,
      startDate: asg.startDate,
      dueDate: asg.dueDate, // submissionDate
      attachments: asg.attachments || [],
      status: asg.status,
      submittedCount: asg.submissions?.length || 0,
      totalStudents
    });
  }

  return ApiResponse.success(res, 200, "Class assignments retrieved successfully", {
    totalAssignments: formattedList.length,
    assignments: formattedList
  });
});

// ════════════ 2. POST /api/v1/teacher/assignments — Create Assignment (DRAFT / PUBLISHED) ════════════
export const createTeacherAssignment = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";

  const { classId, sectionId, subjectId, title, description, maxMarks = 20, startDate, dueDate, attachments = [], status = "DRAFT", academicYearId } = req.body;

  if (!classId || !sectionId || !subjectId || !title || !dueDate) {
    return ApiResponse.error(res, 400, "classId, sectionId, subjectId, title, and dueDate (submissionDate) are required.", "VALIDATION_ERROR");
  }

  const normalizedStatus = status.toUpperCase() as "DRAFT" | "PUBLISHED" | "CLOSED";
  if (!["DRAFT", "PUBLISHED", "CLOSED"].includes(normalizedStatus)) {
    return ApiResponse.error(res, 400, "Invalid status. Supported: DRAFT, PUBLISHED, CLOSED", "VALIDATION_ERROR");
  }

  // 1. Verify Teacher assignment
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

  // 2. Create the assignment in DB
  const newAsg = await AssignmentModel.create({
    schoolId,
    teacherId: new mongoose.Types.ObjectId(teacherId),
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: new mongoose.Types.ObjectId(sectionId),
    subjectId: new mongoose.Types.ObjectId(subjectId),
    academicYearId: academicYearId ? new mongoose.Types.ObjectId(academicYearId) : (assignment.academicYearId || undefined),
    title,
    description: description || "",
    maxMarks,
    startDate: startDate ? new Date(startDate) : new Date(),
    dueDate: new Date(dueDate),
    attachments: attachments.map((a: any) => ({
      fileName: a.fileName || "file",
      fileUrl: a.fileUrl || "",
      fileType: a.fileType || ""
    })),
    status: normalizedStatus
  });

  // 3. Sync & notify if Published immediately
  if (normalizedStatus === "PUBLISHED") {
    try {
      notifyParent(
        "ExponentPushToken[SampleParentToken]",
        "TEACHER_ANNOUNCEMENT",
        "New Project Assignment 📄",
        `New Assignment announced: "${title}". Max Marks: ${maxMarks}. Due: ${new Date(dueDate).toDateString()}`,
        { assignmentId: String(newAsg._id) }
      );
    } catch (e) {}

    emitParentSyncEvent("PARENT_ASSIGNMENT_CREATED", {
      title: `New Assignment Available: ${title} 📄`,
      message: `New assignment "${title}" has been published. Max Marks: ${maxMarks}. Due: ${new Date(dueDate).toDateString()}`,
      assignmentId: String(newAsg._id)
    });
  }

  return ApiResponse.created(res, `Assignment created successfully as ${normalizedStatus}`, { assignment: newAsg });
});

// ════════════ 3. GET /api/v1/teacher/assignments/:id — Details ════════════
export const getTeacherAssignmentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const asg = await AssignmentModel.findById(id)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .lean();

  if (!asg) {
    return ApiResponse.error(res, 404, "Assignment not found.", "NOT_FOUND");
  }

  if (String(asg.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied: Cross-tenant query blocked.", "FORBIDDEN");
  }

  const totalStudents = await StudentModel.countDocuments({
    schoolId,
    classId: asg.classId?._id || asg.classId,
    sectionId: asg.sectionId?._id || asg.sectionId,
    status: "Active"
  });

  const submitted = asg.submissions?.length || 0;
  const graded = asg.submissions?.filter((s: any) => s.status === "Graded").length || 0;

  return ApiResponse.success(res, 200, "Assignment details retrieved", {
    assignment: {
      id: String(asg._id),
      schoolId: String(asg.schoolId),
      teacherId: String(asg.teacherId),
      classId: String(asg.classId?._id || asg.classId),
      className: `${(asg.classId as any)?.className || "Class"} - Section ${(asg.sectionId as any)?.sectionName || "A"}`,
      subjectId: String(asg.subjectId?._id || asg.subjectId),
      subjectName: (asg.subjectId as any)?.subjectName || "Subject",
      title: asg.title,
      description: asg.description || "",
      maxMarks: asg.maxMarks,
      startDate: asg.startDate,
      dueDate: asg.dueDate,
      attachments: asg.attachments || [],
      status: asg.status,
      submissionStats: { total: totalStudents, submitted, graded, pending: totalStudents - submitted }
    }
  });
});

// ════════════ 4. PUT /api/v1/teacher/assignments/:id — Update Assignment ════════════
export const updateTeacherAssignmentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const { title, description, maxMarks, startDate, dueDate, attachments, status } = req.body;

  const asg = await AssignmentModel.findById(id);
  if (!asg) {
    return ApiResponse.error(res, 404, "Assignment not found.", "NOT_FOUND");
  }

  if (String(asg.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied: Cross-tenant modification blocked.", "FORBIDDEN");
  }

  const oldStatus = asg.status;

  if (title !== undefined) asg.title = title;
  if (description !== undefined) asg.description = description;
  if (maxMarks !== undefined) asg.maxMarks = maxMarks;
  if (startDate !== undefined) asg.startDate = new Date(startDate);
  if (dueDate !== undefined) asg.dueDate = new Date(dueDate);
  if (attachments !== undefined) {
    asg.attachments = attachments.map((a: any) => ({
      fileName: a.fileName || "file",
      fileUrl: a.fileUrl || "",
      fileType: a.fileType || ""
    }));
  }

  if (status !== undefined) {
    const normalizedStatus = status.toUpperCase();
    if (["DRAFT", "PUBLISHED", "CLOSED"].includes(normalizedStatus)) {
      asg.status = normalizedStatus;
    }
  }

  await asg.save();

  // Send Notification if status changed from DRAFT to PUBLISHED
  if (asg.status === "PUBLISHED" && oldStatus !== "PUBLISHED") {
    try {
      notifyParent(
        "ExponentPushToken[SampleParentToken]",
        "TEACHER_ANNOUNCEMENT",
        "New Project Assignment 📄",
        `New Assignment announced: "${asg.title}". Max Marks: ${asg.maxMarks}. Due: ${new Date(asg.dueDate!).toDateString()}`,
        { assignmentId: String(asg._id) }
      );
    } catch (e) {}

    emitParentSyncEvent("PARENT_ASSIGNMENT_CREATED", {
      title: `New Assignment Available: ${asg.title} 📄`,
      message: `New assignment "${asg.title}" has been published. Max Marks: ${asg.maxMarks}. Due: ${new Date(asg.dueDate!).toDateString()}`,
      assignmentId: String(asg._id)
    });
  }

  return ApiResponse.success(res, 200, "Assignment updated successfully", { assignment: asg });
});

// ════════════ 5. DELETE /api/v1/teacher/assignments/:id ════════════
export const deleteTeacherAssignmentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const asg = await AssignmentModel.findById(id);
  if (!asg) {
    return ApiResponse.error(res, 404, "Assignment not found.", "NOT_FOUND");
  }

  if (String(asg.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied: Cross-tenant operation blocked.", "FORBIDDEN");
  }

  await AssignmentModel.findByIdAndDelete(id);

  return ApiResponse.success(res, 200, "Assignment deleted successfully.");
});

// ════════════ 6. PATCH/POST /api/v1/teacher/assignments/:id/publish ════════════
export const publishTeacherAssignmentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const asg = await AssignmentModel.findById(id);
  if (!asg) {
    return ApiResponse.error(res, 404, "Assignment not found.", "NOT_FOUND");
  }

  if (String(asg.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied: Cross-tenant operation blocked.", "FORBIDDEN");
  }

  asg.status = "PUBLISHED";
  await asg.save();

  try {
    notifyParent(
      "ExponentPushToken[SampleParentToken]",
      "TEACHER_ANNOUNCEMENT",
      "New Project Assignment 📄",
      `New Assignment announced: "${asg.title}". Max Marks: ${asg.maxMarks}. Due: ${new Date(asg.dueDate!).toDateString()}`,
      { assignmentId: String(asg._id) }
    );
  } catch (e) {}

  emitParentSyncEvent("PARENT_ASSIGNMENT_CREATED", {
    title: `New Assignment Available: ${asg.title} 📄`,
    message: `New assignment "${asg.title}" has been published. Max Marks: ${asg.maxMarks}. Due: ${new Date(asg.dueDate!).toDateString()}`,
    assignmentId: String(asg._id)
  });

  return ApiResponse.success(res, 200, "Assignment published successfully!", {
    assignmentId: String(asg._id),
    status: "PUBLISHED",
    publishedAt: new Date()
  });
});

// ════════════ 7. GET /api/v1/teacher/assignments/:id/submissions ════════════
export const getAssignmentSubmissions = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const asg = await AssignmentModel.findById(id);
  if (!asg) {
    return ApiResponse.error(res, 404, "Assignment not found.", "NOT_FOUND");
  }

  if (String(asg.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied.", "FORBIDDEN");
  }

  // Populate submission details
  const submissionsList = [];
  for (const sub of asg.submissions || []) {
    const student = await StudentModel.findById(sub.studentId).select("name rollNo").lean();
    submissionsList.push({
      submissionId: String(sub._id),
      studentId: String(sub.studentId),
      studentRollNo: student?.rollNo || "N/A",
      studentName: student?.name || "Student",
      submittedAt: sub.submittedAt,
      fileUrl: sub.fileUrl || "",
      fileName: sub.fileUrl ? sub.fileUrl.split("/").pop() : "file.pdf",
      marksObtained: sub.marksObtained,
      feedback: sub.feedback || "",
      status: sub.status
    });
  }

  return ApiResponse.success(res, 200, "Assignment submissions retrieved", {
    assignmentId: id,
    assignmentTitle: asg.title,
    maxMarks: asg.maxMarks,
    totalSubmissions: submissionsList.length,
    submissions: submissionsList
  });
});
