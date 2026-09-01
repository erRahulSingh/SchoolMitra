// @ts-nocheck
// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Admin Academic Management Controller
// Exposes global control (View, Edit, Delete, Publish) to SchoolAdmin
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { notifyParent, notifyTeacher } from "../../services/pushNotificationService";
import { sendClassNotification, sendStudentNotification } from "../../services/notificationService";
import {
  HomeworkModel,
  AssignmentModel,
  StudyMaterialModel,
  WeeklyTestModel,
  WeeklyTestResultModel,
  ExamModel,
  ExamMarkSubmissionModel,
  ReportCardModel,
  MarkModel
} from "../../models/AcademicSchemas";
import { StudentModel } from "../../models/SchoolSchemas";
import { SettingModel } from "../../models/SystemSchemas";
import mongoose from "mongoose";

// Helper for Parent App sync
function emitParentSyncEvent(eventName: string, payload: any) {
  try {
    const io = (global as any).io;
    const now = new Date().toISOString();
    if (io) {
      io.emit(eventName, { eventName, ...payload, timestamp: now });
    }
  } catch (err) {}
}

// ══════════════════════ 1. HOMEWORK CONTROL ══════════════════════
export const getAdminHomework = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { classId, sectionId, teacherId, status } = req.query;

  const query: any = { schoolId };
  if (classId) query.classId = new mongoose.Types.ObjectId(classId as string);
  if (sectionId) query.sectionId = new mongoose.Types.ObjectId(sectionId as string);
  if (teacherId) query.teacherId = new mongoose.Types.ObjectId(teacherId as string);
  if (status) query.status = (status as string).toUpperCase();

  const list = await HomeworkModel.find(query)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .populate("teacherId", "name email")
    .sort({ createdAt: -1 })
    .lean();

  return ApiResponse.success(res, 200, "School homework list retrieved", { homework: list });
});

export const updateAdminHomework = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { title, description, dueDate, status } = req.body;

  const hw = await HomeworkModel.findOne({ _id: id, schoolId });
  if (!hw) {
    return ApiResponse.error(res, 404, "Homework not found.", "NOT_FOUND");
  }

  if (title !== undefined) hw.title = title;
  if (description !== undefined) hw.description = description;
  if (dueDate !== undefined) hw.dueDate = new Date(dueDate);
  if (status !== undefined) hw.status = status.toUpperCase();

  await hw.save();
  return ApiResponse.success(res, 200, "Homework updated by Admin successfully", { homework: hw });
});

export const deleteAdminHomework = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";

  const hw = await HomeworkModel.findOneAndDelete({ _id: id, schoolId });
  if (!hw) {
    return ApiResponse.error(res, 404, "Homework not found.", "NOT_FOUND");
  }

  return ApiResponse.success(res, 200, "Homework deleted by Admin successfully");
});

export const publishAdminHomework = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { status = "PUBLISHED" } = req.body; // status can be "PUBLISHED" or "DRAFT"

  const hw = await HomeworkModel.findOne({ _id: id, schoolId })
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code");

  if (!hw) {
    return ApiResponse.error(res, 404, "Homework not found.", "NOT_FOUND");
  }

  hw.status = status.toUpperCase() as any;
  await hw.save();

  if (hw.status === "PUBLISHED") {
    const adminUserId = (req as any).user?.id || (req as any).user?._id;
    sendClassNotification(
      schoolId,
      adminUserId,
      hw.classId?._id || hw.classId,
      hw.sectionId?._id || hw.sectionId,
      "HOMEWORK",
      "Homework Published by Admin 📚",
      `New Homework assigned: "${hw.title}". Due Date: ${new Date(hw.dueDate).toDateString()}`,
      "homeworks",
      hw._id
    );
  }

  return ApiResponse.success(res, 200, `Homework status updated to ${hw.status}`);
});

// ══════════════════════ 2. ASSIGNMENTS CONTROL ══════════════════════
export const getAdminAssignments = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { classId, sectionId, teacherId, status } = req.query;

  const query: any = { schoolId };
  if (classId) query.classId = new mongoose.Types.ObjectId(classId as string);
  if (sectionId) query.sectionId = new mongoose.Types.ObjectId(sectionId as string);
  if (teacherId) query.teacherId = new mongoose.Types.ObjectId(teacherId as string);
  if (status) query.status = (status as string).toUpperCase();

  const list = await AssignmentModel.find(query)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .populate("teacherId", "name email")
    .sort({ createdAt: -1 })
    .lean();

  return ApiResponse.success(res, 200, "School assignments list retrieved", { assignments: list });
});

export const updateAdminAssignment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { title, description, maxMarks, dueDate, status } = req.body;

  const asg = await AssignmentModel.findOne({ _id: id, schoolId });
  if (!asg) {
    return ApiResponse.error(res, 404, "Assignment not found.", "NOT_FOUND");
  }

  if (title !== undefined) asg.title = title;
  if (description !== undefined) asg.description = description;
  if (maxMarks !== undefined) asg.maxMarks = maxMarks;
  if (dueDate !== undefined) asg.dueDate = new Date(dueDate);
  if (status !== undefined) asg.status = status.toUpperCase();

  await asg.save();
  return ApiResponse.success(res, 200, "Assignment updated by Admin successfully", { assignment: asg });
});

export const deleteAdminAssignment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";

  const asg = await AssignmentModel.findOneAndDelete({ _id: id, schoolId });
  if (!asg) {
    return ApiResponse.error(res, 404, "Assignment not found.", "NOT_FOUND");
  }

  return ApiResponse.success(res, 200, "Assignment deleted by Admin successfully");
});

export const publishAdminAssignment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { status = "PUBLISHED" } = req.body;

  const asg = await AssignmentModel.findOne({ _id: id, schoolId });
  if (!asg) {
    return ApiResponse.error(res, 404, "Assignment not found.", "NOT_FOUND");
  }

  asg.status = status.toUpperCase() as any;
  await asg.save();

  if (asg.status === "PUBLISHED") {
    const adminUserId = (req as any).user?.id || (req as any).user?._id;
    sendClassNotification(
      schoolId,
      adminUserId,
      asg.classId?._id || asg.classId,
      asg.sectionId?._id || asg.sectionId,
      "HOMEWORK",
      "Assignment Published by Admin 📄",
      `New Assignment announced: "${asg.title}". Max Marks: ${asg.maxMarks}.`,
      "assignments",
      asg._id
    );
  }

  return ApiResponse.success(res, 200, `Assignment status updated to ${asg.status}`);
});

// ══════════════════════ 3. STUDY MATERIALS CONTROL ══════════════════════
export const getAdminMaterials = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { classId, sectionId, subjectId } = req.query;

  const query: any = { schoolId };
  if (classId) query.classId = new mongoose.Types.ObjectId(classId as string);
  if (sectionId) query.sectionId = new mongoose.Types.ObjectId(sectionId as string);
  if (subjectId) query.subjectId = new mongoose.Types.ObjectId(subjectId as string);

  const list = await StudyMaterialModel.find(query)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .populate("teacherId", "name email")
    .sort({ createdAt: -1 })
    .lean();

  return ApiResponse.success(res, 200, "School study materials list retrieved", { materials: list });
});

export const updateAdminMaterial = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { title, description, status } = req.body;

  const m = await StudyMaterialModel.findOne({ _id: id, schoolId });
  if (!m) {
    return ApiResponse.error(res, 404, "Study material not found.", "NOT_FOUND");
  }

  if (title !== undefined) m.title = title;
  if (description !== undefined) m.description = description;
  if (status !== undefined) m.status = status;

  await m.save();
  return ApiResponse.success(res, 200, "Study material updated by Admin successfully", { material: m });
});

export const deleteAdminMaterial = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";

  const m = await StudyMaterialModel.findOneAndDelete({ _id: id, schoolId });
  if (!m) {
    return ApiResponse.error(res, 404, "Study material not found.", "NOT_FOUND");
  }

  return ApiResponse.success(res, 200, "Study material deleted by Admin successfully");
});

// ══════════════════════ 4. WEEKLY TESTS & RESULTS CONTROL ══════════════════════
export const getAdminWeeklyTests = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { classId, sectionId, teacherId, status } = req.query;

  const query: any = { schoolId };
  if (classId) query.classId = new mongoose.Types.ObjectId(classId as string);
  if (sectionId) query.sectionId = new mongoose.Types.ObjectId(sectionId as string);
  if (teacherId) query.teacherId = new mongoose.Types.ObjectId(teacherId as string);
  if (status) query.status = (status as string).toUpperCase();

  const list = await WeeklyTestModel.find(query)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .populate("teacherId", "name email")
    .sort({ testDate: -1 })
    .lean();

  return ApiResponse.success(res, 200, "School weekly tests list retrieved", { tests: list });
});

export const updateAdminWeeklyTest = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { title, testDate, maxMarks, status } = req.body;

  const t = await WeeklyTestModel.findOne({ _id: id, schoolId });
  if (!t) {
    return ApiResponse.error(res, 404, "Weekly test not found.", "NOT_FOUND");
  }

  if (title !== undefined) t.title = title;
  if (testDate !== undefined) t.testDate = new Date(testDate);
  if (maxMarks !== undefined) t.maxMarks = maxMarks;
  if (status !== undefined) t.status = status.toUpperCase();

  await t.save();
  return ApiResponse.success(res, 200, "Weekly test updated by Admin successfully", { test: t });
});

export const publishAdminWeeklyTest = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { status = "PUBLISHED" } = req.body;

  const t = await WeeklyTestModel.findOne({ _id: id, schoolId });
  if (!t) {
    return ApiResponse.error(res, 404, "Weekly test not found.", "NOT_FOUND");
  }

  t.status = status.toUpperCase() as any;
  await t.save();

  if (t.status === "PUBLISHED") {
    emitParentSyncEvent("PARENT_WEEKLY_TEST_CREATED", {
      title: "Weekly Test Announced 🧪",
      message: `Weekly test "${t.title}" published by Admin.`,
      testId: String(t._id)
    });
  }

  return ApiResponse.success(res, 200, `Weekly test status updated to ${t.status}`);
});

export const getAdminWeeklyTestResults = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; // weekly test ID
  const schoolId = (req as any).user?.schoolId || "sch_default";

  const results = await WeeklyTestResultModel.find({ schoolId, testId: id })
    .populate("studentId", "name rollNo")
    .lean();

  return ApiResponse.success(res, 200, "Weekly test results retrieved", { results });
});

export const updateAdminWeeklyTestResult = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; // weekly test result document ID
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { marksObtained, grade, remarks, status } = req.body;

  const resDoc = await WeeklyTestResultModel.findOne({ _id: id, schoolId });
  if (!resDoc) {
    return ApiResponse.error(res, 404, "Weekly test result not found.", "NOT_FOUND");
  }

  if (marksObtained !== undefined) resDoc.marksObtained = marksObtained;
  if (grade !== undefined) resDoc.grade = grade;
  if (remarks !== undefined) resDoc.remarks = remarks;
  if (status !== undefined) {
    resDoc.status = status.toUpperCase() as any;
  }

  await resDoc.save();

  // If Published, sync & notify parent
  if (resDoc.status === "PUBLISHED") {
    try {
      const test = await WeeklyTestModel.findById(resDoc.testId).lean();
      notifyParent(
        "ExponentPushToken[SampleParentToken]",
        "TEST_RESULT_PUBLISHED",
        "Weekly Test Result Shared by Admin 📊",
        `Weekly Test results for "${test?.title || "Test"}" updated by Admin. Score: ${resDoc.marksObtained}.`,
        { testId: String(resDoc.testId) }
      );
    } catch (e) {}
  }

  return ApiResponse.success(res, 200, "Weekly test result updated by Admin", { result: resDoc });
});

// ══════════════════════ 5. EXAM MARKS APPROVAL WORKFLOW CONTROL ══════════════════════
export const getAdminMarksSubmissions = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { status, examId, classId } = req.query;

  const query: any = { schoolId };
  if (status) query.status = (status as string).toUpperCase();
  if (examId) query.examId = new mongoose.Types.ObjectId(examId as string);
  if (classId) query.classId = new mongoose.Types.ObjectId(classId as string);

  const list = await ExamMarkSubmissionModel.find(query)
    .populate("examId", "examName examType")
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .populate("teacherId", "name email")
    .sort({ updatedAt: -1 })
    .lean();

  return ApiResponse.success(res, 200, "Exam marks submissions list retrieved", {
    totalSubmissions: list.length,
    submissions: list
  });
});

export const reviewAdminMarksSubmission = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const adminUserId = (req as any).user?.id || (req as any).user?._id;

  const sub = await ExamMarkSubmissionModel.findOne({ _id: id, schoolId });
  if (!sub) {
    return ApiResponse.error(res, 404, "Marks submission record not found.", "NOT_FOUND");
  }

  sub.status = "UNDER_REVIEW";
  sub.reviewedBy = new mongoose.Types.ObjectId(adminUserId);
  sub.reviewedAt = new Date();
  await sub.save();

  return ApiResponse.success(res, 200, "Marks submission status updated to UNDER_REVIEW", { submission: sub });
});

export const approveAdminMarksSubmission = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const adminUserId = (req as any).user?.id || (req as any).user?._id;
  const { publishImmediate = true } = req.body;

  const sub = await ExamMarkSubmissionModel.findOne({ _id: id, schoolId })
    .populate("examId")
    .populate("classId")
    .populate("sectionId")
    .populate("subjectId");

  if (!sub) {
    return ApiResponse.error(res, 404, "Marks submission record not found.", "NOT_FOUND");
  }

  // Set status to APPROVED or PUBLISHED
  const targetStatus = publishImmediate ? "PUBLISHED" : "APPROVED";
  sub.status = targetStatus;
  sub.reviewedBy = new mongoose.Types.ObjectId(adminUserId);
  sub.reviewedAt = new Date();
  await sub.save();

  // Trigger notifyTeacher to alert the teacher that their marks submission is approved!
  try {
    notifyTeacher(
      "ExponentPushToken[SampleTeacherToken]",
      "MARKS_REMINDER",
      "Exam Marks Approved 🎯",
      `Your marks roster for ${(sub.subjectId as any)?.subjectName || "Subject"} has been approved by the School Admin.`,
      { examId: String(sub.examId?._id || sub.examId) }
    );
  } catch (e) {}

  // If status is PUBLISHED, trigger Parent App notifications!
  if (targetStatus === "PUBLISHED") {
    try {
      notifyParent(
        "ExponentPushToken[SampleParentToken]",
        "EXAM_MARKS_PUBLISHED",
        "Exam Results Published! 📊",
        `${(sub.examId as any)?.examName || "Exam"} marks for ${(sub.subjectId as any)?.subjectName || "Subject"} are now published.`,
        { examId: String(sub.examId?._id || sub.examId) }
      );
    } catch (e) {}

    emitParentSyncEvent("PARENT_MARKS_PUBLISHED", {
      title: "Exam Marks Published 📊",
      message: `Marks for ${(sub.subjectId as any)?.subjectName || "Subject"} under ${(sub.examId as any)?.examName || "Exam"} have been published by Admin.`,
      examId: String(sub.examId?._id || sub.examId),
      subjectId: String(sub.subjectId?._id || sub.subjectId)
    });
  }

  return ApiResponse.success(res, 200, `Marks submission successfully ${targetStatus}!`, { submission: sub });
});

export const rejectAdminMarksSubmission = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const adminUserId = (req as any).user?.id || (req as any).user?._id;
  const { remarks } = req.body;

  if (!remarks) {
    return ApiResponse.error(res, 400, "Remarks (reason for rejection) are required when rejecting marks.", "VALIDATION_ERROR");
  }

  const sub = await ExamMarkSubmissionModel.findOne({ _id: id, schoolId })
    .populate("subjectId")
    .populate("examId");
    
  if (!sub) {
    return ApiResponse.error(res, 404, "Marks submission record not found.", "NOT_FOUND");
  }

  sub.status = "REJECTED";
  sub.adminRemarks = remarks;
  sub.reviewedBy = new mongoose.Types.ObjectId(adminUserId);
  sub.reviewedAt = new Date();
  await sub.save();

  // Trigger notifyTeacher to alert the teacher that their marks submission is rejected
  try {
    notifyTeacher(
      "ExponentPushToken[SampleTeacherToken]",
      "MARKS_REMINDER",
      "Marks Roster Rejected ❌",
      `Your marks roster for ${(sub.subjectId as any)?.subjectName || "Subject"} was rejected by School Admin: "${remarks}"`,
      { examId: String(sub.examId?._id || sub.examId) }
    );
  } catch (e) {}

  return ApiResponse.success(res, 200, "Marks submission rejected and returned to teacher.", { submission: sub });
});

// ══════════════════════ 6. CONFIGURABLE GRADING RULES ══════════════════════
export const getAdminGradingRules = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = (req as any).user?.schoolId || "sch_default";

  const setting = await SettingModel.findOne({ schoolId, key: "grading_rules" }).lean();
  const rules = setting?.value || [
    { minPercent: 90, maxPercent: 100, grade: "A+" },
    { minPercent: 80, maxPercent: 89.99, grade: "A" },
    { minPercent: 70, maxPercent: 79.99, grade: "B+" },
    { minPercent: 60, maxPercent: 69.99, grade: "B" },
    { minPercent: 50, maxPercent: 59.99, grade: "C" },
    { minPercent: 40, maxPercent: 49.99, grade: "D" },
    { minPercent: 0, maxPercent: 39.99, grade: "F" }
  ];

  return ApiResponse.success(res, 200, "Academic grading system configuration retrieved", { rules });
});

export const saveAdminGradingRules = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { rules } = req.body; // array of { minPercent: number, maxPercent: number, grade: string }

  if (!rules || !Array.isArray(rules)) {
    return ApiResponse.error(res, 400, "rules array containing minPercent, maxPercent, and grade is required.", "VALIDATION_ERROR");
  }

  // Validate rules format
  for (const r of rules) {
    if (r.minPercent === undefined || r.maxPercent === undefined || !r.grade) {
      return ApiResponse.error(res, 400, "Each rule must contain minPercent, maxPercent, and grade.", "VALIDATION_ERROR");
    }
  }

  const setting = await SettingModel.findOneAndUpdate(
    { schoolId, key: "grading_rules" },
    {
      $set: {
        value: rules,
        group: "Academic"
      }
    },
    { upsert: true, new: true }
  );

  return ApiResponse.success(res, 200, "Academic grading system configuration saved successfully", { rules: setting.value });
});

// ══════════════════════ 7. REPORT CARD APPROVAL WORKFLOW CONTROL ══════════════════════
export const getAdminReportCards = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { status, examId, classId, studentId } = req.query;

  const query: any = { schoolId };
  if (status) query.status = status.toUpperCase();
  if (examId) query.examId = new mongoose.Types.ObjectId(examId as string);
  if (classId) query.classId = new mongoose.Types.ObjectId(classId as string);
  if (studentId) query.studentId = new mongoose.Types.ObjectId(studentId as string);

  const list = await ReportCardModel.find(query)
    .populate("studentId", "name rollNo")
    .populate("examId", "examName examType")
    .populate("classId", "className")
    .populate("subjects.subjectId", "subjectName code")
    .sort({ createdAt: -1 })
    .lean();

  return ApiResponse.success(res, 200, "Report cards list retrieved", {
    totalReportCards: list.length,
    reportCards: list
  });
});

export const generateAdminReportCards = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const { classId, sectionId, examId } = req.body;

  if (!classId || !sectionId || !examId) {
    return ApiResponse.error(res, 400, "classId, sectionId, and examId are required to compile report cards.", "VALIDATION_ERROR");
  }

  // 1. Fetch active students in class section
  const students = await StudentModel.find({
    schoolId,
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: new mongoose.Types.ObjectId(sectionId),
    status: "Active"
  }).lean();

  if (students.length === 0) {
    return ApiResponse.error(res, 400, "No active students found in this class section.", "NOT_FOUND");
  }

  const generated = [];

  for (const s of students) {
    // Fetch all student marks entries for this exam
    const marks = await MarkModel.find({
      schoolId,
      studentId: s._id,
      examId: new mongoose.Types.ObjectId(examId)
    }).populate("subjectId").lean();

    if (marks.length === 0) continue; // skip student if no marks recorded

    // Compile subjects marks
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

    const rc = await ReportCardModel.findOneAndUpdate(
      { schoolId, studentId: s._id, examId: new mongoose.Types.ObjectId(examId) },
      {
        $set: {
          academicYearId: s.academicYearId,
          classId: s.classId,
          subjects: subjectsList,
          totalMarks: totalMax,
          obtainedMarks: totalObtained,
          percentage: overallPercentage,
          grade: overallGrade,
          remarks: "Generated by School Admin",
          status: "DRAFT"
        }
      },
      { upsert: true, new: true }
    );
    generated.push(rc);
  }

  return ApiResponse.success(res, 201, `Report cards compiled as DRAFT for ${generated.length} students.`, {
    totalGenerated: generated.length,
    reportCards: generated
  });
});

export const approveAdminReportCard = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const adminUserId = (req as any).user?.id || (req as any).user?._id;

  const rc = await ReportCardModel.findOne({ _id: id, schoolId });
  if (!rc) {
    return ApiResponse.error(res, 404, "Report card record not found.", "NOT_FOUND");
  }

  rc.status = "APPROVED";
  rc.approvedBy = new mongoose.Types.ObjectId(adminUserId);
  rc.approvedAt = new Date();
  await rc.save();

  return ApiResponse.success(res, 200, "Report card approved successfully by Admin", { reportCard: rc });
});

export const publishAdminReportCard = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";
  const adminUserId = (req as any).user?.id || (req as any).user?._id;

  const rc = await ReportCardModel.findOne({ _id: id, schoolId })
    .populate("studentId")
    .populate("examId");

  if (!rc) {
    return ApiResponse.error(res, 404, "Report card record not found.", "NOT_FOUND");
  }

  rc.status = "PUBLISHED";
  rc.approvedBy = new mongoose.Types.ObjectId(adminUserId);
  rc.approvedAt = new Date();
  await rc.save();

  sendStudentNotification(
    schoolId,
    adminUserId,
    rc.studentId?._id || rc.studentId,
    "REPORT_CARD",
    "Report Card Published! 📊",
    `Official Report Card for "${(rc.examId as any)?.examName || "Exam"}" has been published.`,
    "reportCards",
    rc._id
  );

  return ApiResponse.success(res, 200, "Report card published successfully to Parent App!", { reportCard: rc });
});




