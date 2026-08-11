// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Admin Exam Management Controller
// Exposes CRUD & Publish controls for Exams to SchoolAdmin
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { notifyParent } from "../../services/pushNotificationService";
import { ExamModel } from "../../models/AcademicSchemas";
import mongoose from "mongoose";

// Helper for Parent App sync Socket.IO
function emitParentSyncEvent(eventName: string, payload: any) {
  try {
    const io = (global as any).io;
    const now = new Date().toISOString();
    if (io) {
      io.emit(eventName, { eventName, ...payload, timestamp: now });
    }
  } catch (err) {}
}

// ════════════ 1. POST /api/v1/admin/exams — Create Exam ════════════
export const createAdminExam = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const {
    examName,
    examType,
    academicYearId,
    startDate,
    endDate,
    classes,
    sections,
    subjects,
    maxMarks,
    passingMarks,
    status = "DRAFT",
    schedule = []
  } = req.body;

  if (!examName || !examType || !academicYearId || !startDate || !endDate || !classes || !sections || !subjects || !maxMarks || !passingMarks) {
    return ApiResponse.error(res, 400, "examName, examType, academicYearId, startDate, endDate, classes, sections, subjects, maxMarks, and passingMarks are required.", "VALIDATION_ERROR");
  }

  const normalizedStatus = status.toUpperCase();
  if (!["DRAFT", "PUBLISHED", "CLOSED"].includes(normalizedStatus)) {
    return ApiResponse.error(res, 400, "Invalid status. Supported: DRAFT, PUBLISHED, CLOSED", "VALIDATION_ERROR");
  }

  const exam = await ExamModel.create({
    schoolId,
    examName,
    examType,
    academicYearId: new mongoose.Types.ObjectId(academicYearId),
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    classes: classes.map((c: string) => new mongoose.Types.ObjectId(c)),
    sections: sections.map((s: string) => new mongoose.Types.ObjectId(s)),
    subjects: subjects.map((sub: string) => new mongoose.Types.ObjectId(sub)),
    maxMarks: Number(maxMarks),
    passingMarks: Number(passingMarks),
    status: normalizedStatus,
    schedule: schedule.map((s: any) => ({
      subjectId: new mongoose.Types.ObjectId(s.subjectId),
      examDate: new Date(s.examDate),
      startTime: s.startTime,
      endTime: s.endTime,
      room: s.room || "",
      maxMarks: s.maxMarks !== undefined ? Number(s.maxMarks) : Number(maxMarks),
      passingMarks: s.passingMarks !== undefined ? Number(s.passingMarks) : Number(passingMarks)
    }))
  });

  // Sync parent notify if published immediately
  if (normalizedStatus === "PUBLISHED") {
    try {
      notifyParent(
        "ExponentPushToken[SampleParentToken]",
        "EXAM_SCHEDULED",
        "New Exam Scheduled 📅",
        `New Exam announced: "${examName}" (${examType}). Starts on ${new Date(startDate).toDateString()}.`,
        { examId: String(exam._id) }
      );
    } catch (e) {}

    emitParentSyncEvent("PARENT_EXAM_SCHEDULED", {
      title: "New Exam Scheduled 📅",
      message: `Exam "${examName}" has been published by Admin.`,
      examId: String(exam._id)
    });
  }

  return ApiResponse.created(res, `Exam created successfully as ${normalizedStatus}`, { exam });
});

// ════════════ 2. GET /api/v1/admin/exams — List Exams ════════════
export const getAdminExams = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { classId, status, academicYearId } = req.query;

  const query: any = { schoolId };
  if (classId) query.classes = new mongoose.Types.ObjectId(classId as string);
  if (academicYearId) query.academicYearId = new mongoose.Types.ObjectId(academicYearId as string);
  if (status) query.status = (status as string).toUpperCase();

  const list = await ExamModel.find(query)
    .populate("classes", "className")
    .populate("sections", "sectionName")
    .populate("subjects", "subjectName code")
    .populate("academicYearId", "yearName")
    .sort({ startDate: -1 })
    .lean();

  return ApiResponse.success(res, 200, "School exams list retrieved", {
    totalExams: list.length,
    exams: list
  });
});

// ════════════ 3. GET /api/v1/admin/exams/:id — Details ════════════
export const getAdminExamById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";

  const exam = await ExamModel.findOne({ _id: id, schoolId })
    .populate("classes", "className")
    .populate("sections", "sectionName")
    .populate("subjects", "subjectName code")
    .populate("academicYearId", "yearName")
    .lean();

  if (!exam) {
    return ApiResponse.error(res, 404, "Exam not found.", "NOT_FOUND");
  }

  return ApiResponse.success(res, 200, "Exam details retrieved", { exam });
});

// ════════════ 4. PUT /api/v1/admin/exams/:id — Update Exam ════════════
export const updateAdminExam = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const {
    examName,
    examType,
    academicYearId,
    startDate,
    endDate,
    classes,
    sections,
    subjects,
    maxMarks,
    passingMarks,
    status,
    schedule
  } = req.body;

  const exam = await ExamModel.findOne({ _id: id, schoolId });
  if (!exam) {
    return ApiResponse.error(res, 404, "Exam not found.", "NOT_FOUND");
  }

  const oldStatus = exam.status;

  if (examName !== undefined) exam.examName = examName;
  if (examType !== undefined) exam.examType = examType;
  if (academicYearId !== undefined) exam.academicYearId = new mongoose.Types.ObjectId(academicYearId);
  if (startDate !== undefined) exam.startDate = new Date(startDate);
  if (endDate !== undefined) exam.endDate = new Date(endDate);
  if (classes !== undefined) exam.classes = classes.map((c: string) => new mongoose.Types.ObjectId(c));
  if (sections !== undefined) exam.sections = sections.map((s: string) => new mongoose.Types.ObjectId(s));
  if (subjects !== undefined) exam.subjects = subjects.map((sub: string) => new mongoose.Types.ObjectId(sub));
  if (maxMarks !== undefined) exam.maxMarks = Number(maxMarks);
  if (passingMarks !== undefined) exam.passingMarks = Number(passingMarks);
  
  if (schedule !== undefined && Array.isArray(schedule)) {
    exam.schedule = schedule.map((s: any) => ({
      subjectId: new mongoose.Types.ObjectId(s.subjectId),
      examDate: new Date(s.examDate),
      startTime: s.startTime,
      endTime: s.endTime,
      room: s.room || "",
      maxMarks: s.maxMarks !== undefined ? Number(s.maxMarks) : Number(exam.maxMarks),
      passingMarks: s.passingMarks !== undefined ? Number(s.passingMarks) : Number(exam.passingMarks)
    })) as any;
  }

  if (status !== undefined) {
    const normalizedStatus = status.toUpperCase();
    if (["DRAFT", "PUBLISHED", "CLOSED"].includes(normalizedStatus)) {
      exam.status = normalizedStatus;
    }
  }

  await exam.save();

  // Send Notification if status changed from DRAFT to PUBLISHED
  if (exam.status === "PUBLISHED" && oldStatus !== "PUBLISHED") {
    try {
      notifyParent(
        "ExponentPushToken[SampleParentToken]",
        "EXAM_SCHEDULED",
        "New Exam Scheduled 📅",
        `New Exam announced: "${exam.examName}" (${exam.examType}). Starts on ${new Date(exam.startDate).toDateString()}.`,
        { examId: String(exam._id) }
      );
    } catch (e) {}

    emitParentSyncEvent("PARENT_EXAM_SCHEDULED", {
      title: "New Exam Scheduled 📅",
      message: `Exam "${exam.examName}" has been published by Admin.`,
      examId: String(exam._id)
    });
  }

  return ApiResponse.success(res, 200, "Exam updated successfully by Admin", { exam });
});

// ════════════ 5. DELETE /api/v1/admin/exams/:id — Delete Exam ════════════
export const deleteAdminExam = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";

  const exam = await ExamModel.findOneAndDelete({ _id: id, schoolId });
  if (!exam) {
    return ApiResponse.error(res, 404, "Exam not found.", "NOT_FOUND");
  }

  return ApiResponse.success(res, 200, "Exam deleted successfully by Admin.");
});

// ════════════ 6. PATCH/POST /api/v1/admin/exams/:id/publish — Publish Exam ════════════
export const publishAdminExam = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";

  const exam = await ExamModel.findOne({ _id: id, schoolId });
  if (!exam) {
    return ApiResponse.error(res, 404, "Exam not found.", "NOT_FOUND");
  }

  exam.status = "PUBLISHED";
  await exam.save();

  try {
    notifyParent(
      "ExponentPushToken[SampleParentToken]",
      "EXAM_SCHEDULED",
      "New Exam Scheduled 📅",
      `New Exam announced: "${exam.examName}" (${exam.examType}). Starts on ${new Date(exam.startDate).toDateString()}.`,
      { examId: String(exam._id) }
    );
  } catch (e) {}

  emitParentSyncEvent("PARENT_EXAM_SCHEDULED", {
    title: "New Exam Scheduled 📅",
    message: `Exam "${exam.examName}" has been published by Admin.`,
    examId: String(exam._id)
  });

  return ApiResponse.success(res, 200, "Exam published successfully by Admin!", {
    examId: String(exam._id),
    status: "PUBLISHED",
    publishedAt: new Date()
  });
});
