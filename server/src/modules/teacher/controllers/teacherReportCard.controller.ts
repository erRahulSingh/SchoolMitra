// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Teacher Report Card Controller (Dynamic DB Bound)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { ReportCardModel, MarkModel, ExamModel } from "../../../models/AcademicSchemas";
import { StudentModel, TeacherAssignmentModel } from "../../../models/SchoolSchemas";
import { SettingModel } from "../../../models/SystemSchemas";
import mongoose from "mongoose";

// Helper for Grade calculation
async function calculateGradeForPercentage(schoolId: string, percentage: number): Promise<string> {
  const setting: any = await SettingModel.findOne({ schoolId, key: "grading_rules" }).lean();
  const rules = setting?.value || [
    { minPercent: 90, maxPercent: 100, grade: "A+" },
    { minPercent: 80, maxPercent: 89.99, grade: "A" },
    { minPercent: 70, maxPercent: 79.99, grade: "B+" },
    { minPercent: 60, maxPercent: 69.99, grade: "B" },
    { minPercent: 50, maxPercent: 59.99, grade: "C" },
    { minPercent: 40, maxPercent: 49.99, grade: "D" },
    { minPercent: 0, maxPercent: 39.99, grade: "F" }
  ];

  for (const r of rules) {
    if (percentage >= r.minPercent && percentage <= r.maxPercent) {
      return r.grade;
    }
  }
  return "F";
}

// ════════════ 1. GET /api/v1/teacher/report-cards — List Report Cards status for Class ════════════
export const getTeacherReportCards = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";

  const { classId, sectionId, examId } = req.query;

  if (!classId || !sectionId || !examId) {
    return ApiResponse.error(res, 400, "classId, sectionId, and examId are required query parameters.", "VALIDATION_ERROR");
  }

  // 1. Verify Teacher assignment
  const assignments = await TeacherAssignmentModel.find({
    schoolId,
    teacherId: new mongoose.Types.ObjectId(teacherId),
    classId: new mongoose.Types.ObjectId(classId as string),
    sectionId: new mongoose.Types.ObjectId(sectionId as string),
    status: "Active"
  }).lean();

  if (assignments.length === 0) {
    return ApiResponse.error(res, 403, "Access Denied: You are not assigned to teach this class section.", "FORBIDDEN");
  }

  // 2. Fetch active students in class section
  const students = await StudentModel.find({
    schoolId,
    classId: new mongoose.Types.ObjectId(classId as string),
    sectionId: new mongoose.Types.ObjectId(sectionId as string),
    status: "Active"
  }).sort({ name: 1 }).lean();

  const roster = [];
  for (const s of students) {
    const rc = await ReportCardModel.findOne({
      schoolId,
      studentId: s._id,
      examId: new mongoose.Types.ObjectId(examId as string)
    }).lean();

    roster.push({
      studentId: String(s._id),
      rollNo: s.rollNo || "N/A",
      studentName: s.name,
      totalMarks: rc ? rc.totalMarks : 0,
      obtainedMarks: rc ? rc.obtainedMarks : 0,
      percentage: rc ? rc.percentage.toFixed(2) + "%" : "0.00%",
      grade: rc ? rc.grade : "N/A",
      status: rc ? rc.status : "PENDING_GENERATION"
    });
  }

  const classNameVal: any = await mongoose.model("classes").findById(classId).select("className").lean();
  const examVal: any = await ExamModel.findById(examId).select("examName").lean();

  return ApiResponse.success(res, 200, "Class report cards status retrieved", {
    classId,
    className: classNameVal?.className || "Class",
    examName: examVal?.examName || "Exam",
    totalStudents: students.length,
    submittedToAdmin: roster.filter(r => r.status === "PENDING_APPROVAL").length,
    approvedByAdmin: roster.filter(r => ["APPROVED", "PUBLISHED"].includes(r.status)).length,
    reportCardsRoster: roster
  });
});

// ════════════ 2. GET /api/v1/teacher/report-cards/:studentId — Retrieve Single Report Card Draft ════════════
export const getStudentReportCardById = asyncHandler(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const { examId } = req.query;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  if (!examId) {
    return ApiResponse.error(res, 400, "examId query parameter is required.", "VALIDATION_ERROR");
  }

  const rc = await ReportCardModel.findOne({
    schoolId,
    studentId: new mongoose.Types.ObjectId(studentId),
    examId: new mongoose.Types.ObjectId(examId as string)
  })
    .populate("classId", "className")
    .populate("subjects.subjectId", "subjectName code")
    .lean();

  if (!rc) {
    return ApiResponse.error(res, 404, "Report card not generated yet.", "NOT_FOUND");
  }

  const student = await StudentModel.findById(studentId).select("name rollNo").lean();

  return ApiResponse.success(res, 200, `Report card for student ${studentId} retrieved`, {
    reportCard: {
      id: String(rc._id),
      studentId: String(rc.studentId),
      studentName: student?.name || "Student",
      rollNo: student?.rollNo || "N/A",
      className: (rc.classId as any)?.className || "Class",
      subjects: rc.subjects.map(s => ({
        subjectId: String(s.subjectId?._id || s.subjectId),
        subjectName: (s.subjectId as any)?.subjectName || "Subject",
        obtainedMarks: s.obtainedMarks,
        maxMarks: s.maxMarks,
        percentage: s.percentage.toFixed(2) + "%",
        grade: s.grade,
        isPassed: s.isPassed
      })),
      totalMarks: rc.totalMarks,
      obtainedMarks: rc.obtainedMarks,
      percentage: rc.percentage.toFixed(2) + "%",
      grade: rc.grade,
      remarks: rc.remarks || "",
      status: rc.status
    }
  });
});

// ════════════ 3. POST /api/v1/teacher/report-cards/:studentId/submit — Compile & Submit Report Card ════════════
export const submitStudentReportCard = asyncHandler(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";

  const { examId, remarks } = req.body;

  if (!examId) {
    return ApiResponse.error(res, 400, "examId is required.", "VALIDATION_ERROR");
  }

  // 1. Fetch student info
  const student: any = await StudentModel.findById(studentId).lean();
  if (!student) {
    return ApiResponse.error(res, 404, "Student not found.", "NOT_FOUND");
  }

  // 2. Fetch all student marks entries for this exam
  const marks = await MarkModel.find({
    schoolId,
    studentId: new mongoose.Types.ObjectId(studentId),
    examId: new mongoose.Types.ObjectId(examId)
  }).populate("subjectId").lean();

  if (marks.length === 0) {
    return ApiResponse.error(res, 400, "No marks found for this student for the requested exam. Cannot compile report card.", "NO_MARKS_FOUND");
  }

  // 3. Compile subjects marks array
  let totalMax = 0;
  let totalObtained = 0;

  const subjectsList = [];
  for (const m of marks) {
    const pct = m.maxMarks > 0 ? (m.marksObtained / m.maxMarks) * 100 : 0;
    const grade = await calculateGradeForPercentage(schoolId, pct);

    totalMax += m.maxMarks;
    totalObtained += m.marksObtained;

    subjectsList.push({
      subjectId: m.subjectId?._id || m.subjectId,
      obtainedMarks: m.marksObtained,
      maxMarks: m.maxMarks,
      percentage: pct,
      grade,
      isPassed: m.isPassed !== undefined ? m.isPassed : true
    });
  }

  const overallPercentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
  const overallGrade = await calculateGradeForPercentage(schoolId, overallPercentage);

  // 4. Save/upsert report card document with PENDING_APPROVAL status
  const rc = await ReportCardModel.findOneAndUpdate(
    {
      schoolId,
      studentId: new mongoose.Types.ObjectId(studentId),
      examId: new mongoose.Types.ObjectId(examId)
    },
    {
      $set: {
        academicYearId: student.academicYearId,
        classId: student.classId,
        subjects: subjectsList,
        totalMarks: totalMax,
        obtainedMarks: totalObtained,
        percentage: overallPercentage,
        grade: overallGrade,
        remarks: remarks || "Submitted by class teacher",
        status: "PENDING_APPROVAL"
      }
    },
    { upsert: true, new: true }
  );

  return ApiResponse.created(res, `Report card compiled and submitted to School Admin for verification!`, {
    reportCard: rc
  });
});

// ════════════ 4. POST /api/v1/teacher/report-cards/publish — Stub for backward compatibility ════════════
export const publishTeacherReportCards = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Report cards publication must be initiated by School Admin or Principal.", {
    requiresAdminApproval: true
  });
});
