// @ts-nocheck
// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Teacher Exam & Gradebook Controller (Dynamic DB Bound)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { ExamModel, MarkModel, ExamMarkSubmissionModel } from "../../../models/AcademicSchemas";
import { sendClassNotification } from "../../../services/notificationService";
import { StudentModel, TeacherAssignmentModel } from "../../../models/SchoolSchemas";
import { SettingModel, AuditLogModel } from "../../../models/SystemSchemas";
import mongoose from "mongoose";

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

// ════════════ DYNAMIC GRADE CALCULATION ENGINE ════════════
async function calculateGradeForPercentage(schoolId: string, percentage: number): Promise<string> {
  const setting = await SettingModel.findOne({ schoolId, key: "grading_rules" }).lean() as any;
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

// ════════════ AUDIT TRAIL ENGINE ════════════
async function logMarksChangeAudit(
  schoolId: string,
  teacherId: string,
  teacherEmail: string,
  studentId: string,
  subjectId: string,
  oldMarks: number,
  newMarks: number
) {
  try {
    const student = await StudentModel.findById(studentId).select("name").lean() as any;
    const subject = await mongoose.model("subjects").findById(subjectId).select("subjectName").lean() as any;
    const teacher = await mongoose.model("users").findById(teacherId).select("name").lean() as any;

    await AuditLogModel.create({
      schoolId: new mongoose.Types.ObjectId(schoolId),
      userId: new mongoose.Types.ObjectId(teacherId),
      userEmail: teacherEmail,
      action: "UPDATE_MARKS",
      module: "marks",
      details: {
        teacherName: teacher?.name || "Teacher",
        studentName: student?.name || "Student",
        subjectName: subject?.subjectName || "Subject",
        oldMarks,
        newMarks,
        changedAt: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error("Audit log creation failed:", err);
  }
}

// ════════════ 1. GET /api/v1/teacher/exams — List Exams for Teacher ════════════
export const getTeacherExams = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";

  // Resolve assigned class-sections & subjects
  const assignments = await TeacherAssignmentModel.find({
    schoolId,
    teacherId: new mongoose.Types.ObjectId(teacherId),
    status: "Active"
  }).lean() as any;

  if (assignments.length === 0) {
    return ApiResponse.success(res, 200, "No exam schedules found: teacher is not assigned to any classes.", { exams: [] });
  }

  const classIds = assignments.map(a => a.classId);

  // Fetch published exams corresponding to teacher's classes
  const list = await ExamModel.find({
    schoolId,
    status: "PUBLISHED",
    classes: { $in: classIds }
  })
    .populate("classes", "className")
    .populate("academicYearId", "yearName")
    .sort({ startDate: -1 })
    .lean() as any;

  const formattedExams = list.map(ex => ({
    id: String(ex._id),
    examName: ex.examName,
    examType: ex.examType,
    startDate: ex.startDate,
    endDate: ex.endDate,
    maximumMarks: ex.maxMarks,
    passingMarks: ex.passingMarks,
    status: ex.status
  }));

  return ApiResponse.success(res, 200, "Examination datesheet & schedule retrieved", {
    totalExams: formattedExams.length,
    exams: formattedExams
  });
});

// ════════════ 2. GET /api/v1/teacher/exams/:id — Exam Details & Schedule ════════════
export const getTeacherExamById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const ex = await ExamModel.findOne({ _id: id, schoolId })
    .populate("classes", "className")
    .populate("schedule.subjectId", "subjectName code")
    .lean() as any;

  if (!ex) {
    return ApiResponse.error(res, 404, "Exam not found.", "NOT_FOUND");
  }

  const formattedSchedule = (ex.schedule || []).map(s => ({
    subjectId: String(s.subjectId?._id || s.subjectId),
    subjectName: (s.subjectId as any)?.subjectName || "Subject",
    subjectCode: (s.subjectId as any)?.code || "SUB",
    examDate: s.examDate,
    startTime: s.startTime,
    endTime: s.endTime,
    room: s.room || "Room",
    maxMarks: s.maxMarks || ex.maxMarks,
    passingMarks: s.passingMarks || ex.passingMarks
  }));

  return ApiResponse.success(res, 200, "Exam details & schedule datesheet retrieved", {
    exam: {
      id: String(ex._id),
      examName: ex.examName,
      examType: ex.examType,
      startDate: ex.startDate,
      endDate: ex.endDate,
      status: ex.status,
      schedule: formattedSchedule
    }
  });
});

// ════════════ 3. GET /api/v1/teacher/exams/:examId/students — Get Students & Existing Marks ════════════
export const getTeacherExamStudentsForMarks = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; // examId
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";

  const { classId, sectionId, subjectId } = req.query;

  if (!classId || !sectionId || !subjectId) {
    return ApiResponse.error(res, 400, "classId, sectionId, and subjectId are required query parameters.", "VALIDATION_ERROR");
  }

  // 1. Verify Teacher assignment
  const assignment = await TeacherAssignmentModel.findOne({
    schoolId,
    teacherId,
    classId: new mongoose.Types.ObjectId(classId as string),
    sectionId: new mongoose.Types.ObjectId(sectionId as string),
    subjectId: new mongoose.Types.ObjectId(subjectId as string),
    status: "Active"
  }).lean() as any;

  if (!assignment) {
    return ApiResponse.error(res, 403, "Access Denied: You are not assigned to teach this subject in this class section.", "FORBIDDEN");
  }

  // 2. Fetch exam schedule parameters
  const exam = await ExamModel.findOne({ _id: id, schoolId }).lean() as any;
  if (!exam) {
    return ApiResponse.error(res, 404, "Exam not found.", "NOT_FOUND");
  }

  const subjectSched = (exam.schedule || []).find(s => String(s.subjectId) === String(subjectId));
  const maxMarks = subjectSched?.maxMarks || exam.maxMarks;
  const passingMarks = subjectSched?.passingMarks || exam.passingMarks;

  // 3. Fetch active students in class section
  const students = await StudentModel.find({
    schoolId,
    classId: new mongoose.Types.ObjectId(classId as string),
    sectionId: new mongoose.Types.ObjectId(sectionId as string),
    status: "Active"
  }).sort({ name: 1 }).lean() as any;

  // 4. Fetch existing marks entries
  const roster = [];
  for (const s of students) {
    const markEntry = await MarkModel.findOne({
      schoolId,
      examId: new mongoose.Types.ObjectId(id),
      studentId: s._id,
      subjectId: new mongoose.Types.ObjectId(subjectId as string)
    }).lean() as any;

    roster.push({
      studentId: String(s._id),
      rollNo: s.rollNo || "N/A",
      name: s.name,
      maximumMarks: maxMarks,
      passingMarks: passingMarks,
      obtainedMarks: markEntry ? markEntry.marksObtained : null,
      grade: markEntry ? markEntry.grade : "",
      remarks: markEntry ? (markEntry as any).remarks || "" : "",
      isPassed: markEntry ? markEntry.isPassed : null
    });
  }

  // 5. Fetch submission approval workflow status
  const submission = await ExamMarkSubmissionModel.findOne({
    schoolId,
    examId: new mongoose.Types.ObjectId(id),
    classId: new mongoose.Types.ObjectId(classId as string),
    sectionId: new mongoose.Types.ObjectId(sectionId as string),
    subjectId: new mongoose.Types.ObjectId(subjectId as string)
  }).lean() as any;

  const subjectDetails = await mongoose.model("subjects").findById(subjectId).select("subjectName").lean() as any;

  return ApiResponse.success(res, 200, "Student marks roster retrieved", {
    examId: id,
    examName: exam.examName,
    subjectName: subjectDetails?.subjectName || "Subject",
    maximumMarks: maxMarks,
    passingMarks: passingMarks,
    submissionStatus: submission ? submission.status : "DRAFT",
    adminRemarks: submission ? submission.adminRemarks || "" : "",
    studentsMarksRoster: roster
  });
});

// ════════════ 4. POST /api/v1/teacher/exams/:examId/marks — Save/Submit Class Marks ════════════
export const saveTeacherMarks = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; // examId
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const userEmail = user?.email || "";
  const schoolId = user?.schoolId || "sch_default";

  const { classId, sectionId, subjectId, marksRoster, status = "DRAFT" } = req.body;

  if (!classId || !sectionId || !subjectId || !marksRoster || !Array.isArray(marksRoster)) {
    return ApiResponse.error(res, 400, "classId, sectionId, subjectId, and marksRoster array are required.", "VALIDATION_ERROR");
  }

  const normalizedStatus = status.toUpperCase();
  if (!["DRAFT", "SUBMITTED"].includes(normalizedStatus)) {
    return ApiResponse.error(res, 400, "Invalid status choice. Only DRAFT or SUBMITTED are allowed for teacher submissions.", "VALIDATION_ERROR");
  }

  // Check custom "marks.submit" permission if submitting
  if (normalizedStatus === "SUBMITTED") {
    const userPermissions = user?.permissions || [];
    if (!userPermissions.includes("marks.submit") && user?.role !== "SchoolAdmin" && user?.role !== "SuperAdmin") {
      return ApiResponse.error(res, 403, "Access Denied: You do not have 'marks.submit' permission to submit this roster for approval.", "FORBIDDEN");
    }
  }

  // 1. Verify Teacher assignment
  const assignment = await TeacherAssignmentModel.findOne({
    schoolId,
    teacherId,
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: new mongoose.Types.ObjectId(sectionId),
    subjectId: new mongoose.Types.ObjectId(subjectId),
    status: "Active"
  }).lean() as any;

  if (!assignment) {
    return ApiResponse.error(res, 403, "Access Denied: You are not assigned to teach this subject in this class section.", "FORBIDDEN");
  }

  // 2. Fetch exam schedule details
  const exam = await ExamModel.findOne({ _id: id, schoolId }).lean() as any;
  if (!exam) {
    return ApiResponse.error(res, 404, "Exam not found.", "NOT_FOUND");
  }

  const subjectSched = (exam.schedule || []).find(s => String(s.subjectId) === String(subjectId));
  const maxMarks = subjectSched?.maxMarks || exam.maxMarks;
  const passingMarks = subjectSched?.passingMarks || exam.passingMarks;

  // Check locks
  const existingSubmission = await ExamMarkSubmissionModel.findOne({
    schoolId,
    examId: new mongoose.Types.ObjectId(id),
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: new mongoose.Types.ObjectId(sectionId),
    subjectId: new mongoose.Types.ObjectId(subjectId)
  }).lean() as any;

  if (existingSubmission && ["APPROVED", "PUBLISHED"].includes(existingSubmission.status)) {
    return ApiResponse.error(res, 400, `Cannot modify marks: Submission status is currently '${existingSubmission.status}'.`, "SUBMISSION_LOCKED");
  }

  // 3. Validate & Upsert marks entries
  const savedEntries = [];
  for (const item of marksRoster) {
    if (!item.studentId || item.obtainedMarks === undefined || item.obtainedMarks === null) continue;

    const obtained = Number(item.obtainedMarks);

    if (obtained < 0 || obtained > maxMarks) {
      return ApiResponse.error(res, 400, `Validation Failed: Obtained marks (${obtained}) must be between 0 and maximum allowed marks (${maxMarks}).`, "VALIDATION_ERROR");
    }

    // Fetch existing mark first for Audit Trail logic
    const oldEntry = await MarkModel.findOne({
      schoolId,
      examId: new mongoose.Types.ObjectId(id),
      studentId: new mongoose.Types.ObjectId(item.studentId),
      subjectId: new mongoose.Types.ObjectId(subjectId)
    }).lean() as any;

    const passed = obtained >= passingMarks;
    const percentage = maxMarks > 0 ? (obtained / maxMarks) * 100 : 100;
    const calculatedGrade = await calculateGradeForPercentage(schoolId, percentage);

    const entry = await MarkModel.findOneAndUpdate(
      {
        schoolId,
        examId: new mongoose.Types.ObjectId(id),
        studentId: new mongoose.Types.ObjectId(item.studentId),
        subjectId: new mongoose.Types.ObjectId(subjectId)
      },
      {
        $set: {
          marksObtained: obtained,
          maxMarks: maxMarks,
          grade: item.grade || calculatedGrade,
          isPassed: passed,
          remarks: item.remarks || "",
          enteredBy: new mongoose.Types.ObjectId(teacherId)
        }
      },
      { upsert: true, new: true }
    );

    // Audit Trail if marks value changed
    if (oldEntry && oldEntry.marksObtained !== obtained) {
      await logMarksChangeAudit(schoolId, teacherId, userEmail, item.studentId, subjectId, oldEntry.marksObtained, obtained);
    }

    savedEntries.push(entry);
  }

  // 4. Update approval record
  const submissionUpdate: any = {
    status: normalizedStatus,
    teacherId: new mongoose.Types.ObjectId(teacherId)
  };

  if (normalizedStatus === "SUBMITTED") {
    submissionUpdate.submittedAt = new Date();
    sendClassNotification(
      schoolId,
      teacherId,
      classId,
      sectionId,
      "RESULT",
      `Exam Marks Published 📊`,
      `Official marks roster submitted for ${exam.examName}. Scores available on app.`,
      "results",
      id
    );
  }

  await ExamMarkSubmissionModel.findOneAndUpdate(
    {
      schoolId,
      examId: new mongoose.Types.ObjectId(id),
      classId: new mongoose.Types.ObjectId(classId),
      sectionId: new mongoose.Types.ObjectId(sectionId),
      subjectId: new mongoose.Types.ObjectId(subjectId)
    },
    { $set: submissionUpdate },
    { upsert: true, new: true }
  );

  return ApiResponse.created(res, `Exam marks saved successfully as ${normalizedStatus}!`, {
    examId: id,
    subjectId,
    submissionStatus: normalizedStatus,
    totalEvaluated: savedEntries.length,
    marks: savedEntries
  });
});

// ════════════ 5. PUT /api/v1/teacher/exams/:examId/marks/:studentId — Update Single Student Marks ════════════
export const updateTeacherMarksById = asyncHandler(async (req: Request, res: Response) => {
  const { id, studentId } = req.params;
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const userEmail = user?.email || "";
  const schoolId = user?.schoolId || "sch_default";

  const { subjectId, obtainedMarks, grade, remarks } = req.body;

  if (!studentId || !subjectId || obtainedMarks === undefined) {
    return ApiResponse.error(res, 400, "studentId (as param), subjectId, and obtainedMarks are required.", "VALIDATION_ERROR");
  }

  const student = await StudentModel.findById(studentId).lean() as any;
  if (!student) {
    return ApiResponse.error(res, 404, "Student not found.", "NOT_FOUND");
  }

  // 1. Verify Teacher assignment
  const assignment = await TeacherAssignmentModel.findOne({
    schoolId,
    teacherId,
    classId: student.classId,
    sectionId: student.sectionId,
    subjectId: new mongoose.Types.ObjectId(subjectId),
    status: "Active"
  }).lean() as any;

  if (!assignment) {
    return ApiResponse.error(res, 403, "Access Denied: You are not assigned to teach this student.", "FORBIDDEN");
  }

  // 2. Fetch exam details & check lock status
  const exam = await ExamModel.findOne({ _id: id, schoolId }).lean() as any;
  if (!exam) {
    return ApiResponse.error(res, 404, "Exam not found.", "NOT_FOUND");
  }

  const existingSubmission = await ExamMarkSubmissionModel.findOne({
    schoolId,
    examId: new mongoose.Types.ObjectId(id),
    classId: student.classId,
    sectionId: student.sectionId,
    subjectId: new mongoose.Types.ObjectId(subjectId)
  }).lean() as any;

  if (existingSubmission && ["APPROVED", "PUBLISHED"].includes(existingSubmission.status)) {
    return ApiResponse.error(res, 400, `Cannot modify marks: Submission status is currently '${existingSubmission.status}'.`, "SUBMISSION_LOCKED");
  }

  const subjectSched = (exam.schedule || []).find(s => String(s.subjectId) === String(subjectId));
  const maxMarks = subjectSched?.maxMarks || exam.maxMarks;
  const passingMarks = subjectSched?.passingMarks || exam.passingMarks;

  const obtained = Number(obtainedMarks);

  if (obtained < 0 || obtained > maxMarks) {
    return ApiResponse.error(res, 400, `Validation Failed: Obtained marks (${obtained}) must be between 0 and maximum allowed marks (${maxMarks}).`, "VALIDATION_ERROR");
  }

  // Fetch existing mark for Audit Trail logic
  const oldEntry = await MarkModel.findOne({
    schoolId,
    examId: new mongoose.Types.ObjectId(id),
    studentId: new mongoose.Types.ObjectId(studentId),
    subjectId: new mongoose.Types.ObjectId(subjectId)
  }).lean() as any;

  const passed = obtained >= passingMarks;
  const percentage = maxMarks > 0 ? (obtained / maxMarks) * 100 : 100;
  const calculatedGrade = await calculateGradeForPercentage(schoolId, percentage);

  const entry = await MarkModel.findOneAndUpdate(
    {
      schoolId,
      examId: new mongoose.Types.ObjectId(id),
      studentId: new mongoose.Types.ObjectId(studentId),
      subjectId: new mongoose.Types.ObjectId(subjectId)
    },
    {
      $set: {
        marksObtained: obtained,
        maxMarks: maxMarks,
        grade: grade || calculatedGrade,
        isPassed: passed,
        remarks: remarks || "",
        enteredBy: new mongoose.Types.ObjectId(teacherId)
      }
    },
    { upsert: true, new: true }
  );

  // Audit Trail if marks value changed
  if (oldEntry && oldEntry.marksObtained !== obtained) {
    await logMarksChangeAudit(schoolId, teacherId, userEmail, studentId, subjectId, oldEntry.marksObtained, obtained);
  }

  return ApiResponse.success(res, 200, `Student marks updated successfully`, { mark: entry });
});
