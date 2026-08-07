import { Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";

function emitParentSyncEvent(eventName: string, payload: any) {
  try {
    const io = (global as any).io;
    const now = new Date().toISOString();
    if (io) {
      io.emit("teacher:marks_submitted", { eventName: "teacher:marks_submitted", ...payload, timestamp: now });
      io.emit("parent:result_update", { eventName: "parent:result_update", title: payload.title, body: payload.message, ...payload, timestamp: now });
    }
  } catch (err) {}
}

export const getTeacherReportCards = asyncHandler(async (req: Request, res: Response) => {
  const { classId = "class_8", term = "Mid-Term 2024" } = req.query;

  return ApiResponse.success(res, 200, "Class report cards status retrieved", {
    classId,
    className: "Class 8 - Section A",
    term,
    totalStudents: 5,
    submittedToAdmin: 4,
    pendingSubmission: 1,
    approvedByAdmin: 3,
    reportCardsRoster: [
      { studentId: "st_101", rollNo: "01", studentName: "Aarav Sharma", totalMarks: 500, obtainedMarks: 476, percentage: "95.2%", grade: "A+", result: "Pass", status: "SubmittedToAdmin" }
    ]
  });
});

export const getStudentReportCardById = asyncHandler(async (req: Request, res: Response) => {
  const { studentId } = req.params;

  return ApiResponse.success(res, 200, `Report card draft for student ${studentId} retrieved`, {
    reportCard: {
      studentId: studentId || "st_101",
      studentName: "Aarav Sharma",
      className: "Class 8 - Section A",
      totalMarks: 500,
      obtainedMarks: 476,
      percentage: "95.2%",
      grade: "A+",
      result: "Pass",
      status: "SubmittedToAdmin",
      requiresAdminApproval: true
    }
  });
});

export const submitStudentReportCard = asyncHandler(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const { teacherRemarks } = req.body;

  return ApiResponse.created(res, `Report card for student ${studentId} submitted to School Admin for verification & final publication!`, {
    reportCardSubmission: {
      studentId,
      status: "SubmittedToAdmin",
      teacherRemarks: teacherRemarks || "Submitted by Class Teacher",
      submittedAt: new Date().toISOString(),
      requiresAdminApproval: true,
      publishedToParentApp: false
    }
  });
});

import { notifyParent } from "../../../services/pushNotificationService";

export const publishTeacherReportCards = asyncHandler(async (req: Request, res: Response) => {
  const { term = "CBSE Mid-Term 2026", className = "Class 10-A" } = req.body;

  notifyParent(
    "ExponentPushToken[SampleParentToken]",
    "EXAM_RESULT_PUBLISHED",
    `Official Exam Report Card Released 📊`,
    `360° CBSE Report Card for ${term} (${className}) has been published to Parent App. Tap to view scorecard.`,
    { term, className }
  );

  emitParentSyncEvent("PARENT_REPORT_CARD_PUBLISHED", {
    title: `Official Report Card Published: ${term}`,
    message: `360° CBSE Report Card for ${className} has been published to Parent App.`,
    className,
    term
  });

  return ApiResponse.success(res, 200, "Report cards published and broadcasted to Parent App!", {
    term,
    className,
    syncedToParentApp: true
  });
});

