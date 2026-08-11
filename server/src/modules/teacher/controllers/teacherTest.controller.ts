// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Teacher Weekly Test Controller (Dynamic DB Bound)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { notifyParent } from "../../../services/pushNotificationService";
import {
  WeeklyTestModel,
  WeeklyTestQuestionModel,
  WeeklyTestResultModel
} from "../../../models/AcademicSchemas";
import { StudentModel, TeacherAssignmentModel } from "../../../models/SchoolSchemas";
import mongoose from "mongoose";

function emitParentSyncEvent(eventName: string, payload: any) {
  try {
    const io = (global as any).io;
    const now = new Date().toISOString();
    if (io) {
      io.emit("teacher:test_published", { eventName: "teacher:test_published", ...payload, timestamp: now });
      io.emit("parent:test_update", { eventName: "parent:test_update", title: payload.title, body: payload.message, ...payload, timestamp: now });
    }
  } catch (err) {}
}

// ════════════ 1. GET /api/v1/teacher/weekly-tests — List Tests ════════════
export const getTeacherTests = asyncHandler(async (req: Request, res: Response) => {
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
  if (status) query.status = (status as string).toUpperCase();

  const list = await WeeklyTestModel.find(query)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .sort({ testDate: -1 })
    .lean();

  const formattedTests = [];
  for (const t of list) {
    const questionsCount = await WeeklyTestQuestionModel.countDocuments({ testId: t._id });
    formattedTests.push({
      id: String(t._id),
      schoolId: String(t.schoolId),
      teacherId: String(t.teacherId),
      classId: String(t.classId?._id || t.classId),
      className: (t.classId as any)?.className || "Class",
      sectionId: String(t.sectionId?._id || t.sectionId),
      sectionName: (t.sectionId as any)?.sectionName || "A",
      subjectId: String(t.subjectId?._id || t.subjectId),
      subjectName: (t.subjectId as any)?.subjectName || "Subject",
      title: t.title,
      testDate: t.testDate,
      maxMarks: t.maxMarks,
      questionsCount,
      status: t.status
    });
  }

  return ApiResponse.success(res, 200, "Weekly tests roster retrieved", {
    totalTests: formattedTests.length,
    tests: formattedTests
  });
});

// ════════════ 2. POST /api/v1/teacher/weekly-tests — Create Test ════════════
export const createTeacherTest = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";

  const { classId, sectionId, subjectId, title, testDate, maxMarks, academicYearId } = req.body;

  if (!classId || !sectionId || !subjectId || !title || !testDate || !maxMarks) {
    return ApiResponse.error(res, 400, "classId, sectionId, subjectId, title, testDate, and maxMarks are required.", "VALIDATION_ERROR");
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

  // 2. Create Test document in DB
  const test = await WeeklyTestModel.create({
    schoolId,
    teacherId: new mongoose.Types.ObjectId(teacherId),
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: new mongoose.Types.ObjectId(sectionId),
    subjectId: new mongoose.Types.ObjectId(subjectId),
    academicYearId: academicYearId ? new mongoose.Types.ObjectId(academicYearId) : (assignment.academicYearId || undefined),
    title,
    testDate: new Date(testDate),
    maxMarks,
    status: "DRAFT"
  });

  return ApiResponse.created(res, "Weekly test created as draft successfully! Add questions next.", { test });
});

// ════════════ 3. GET /api/v1/teacher/weekly-tests/:id — Get Details & Questions ════════════
export const getTeacherTestById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const t = await WeeklyTestModel.findById(id)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .lean();

  if (!t) {
    return ApiResponse.error(res, 404, "Weekly test not found.", "NOT_FOUND");
  }

  if (String(t.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied.", "FORBIDDEN");
  }

  const questions = await WeeklyTestQuestionModel.find({ testId: id }).lean();

  return ApiResponse.success(res, 200, `Weekly test details & questions retrieved`, {
    test: {
      id: String(t._id),
      schoolId: String(t.schoolId),
      teacherId: String(t.teacherId),
      classId: String(t.classId?._id || t.classId),
      className: `${(t.classId as any)?.className || "Class"} - Section ${(t.sectionId as any)?.sectionName || "A"}`,
      subjectId: String(t.subjectId?._id || t.subjectId),
      subjectName: (t.subjectId as any)?.subjectName || "Subject",
      title: t.title,
      testDate: t.testDate,
      maxMarks: t.maxMarks,
      status: t.status,
      questions: questions.map(q => ({
        id: String(q._id),
        text: q.questionText,
        options: q.options || [],
        correctAnswer: q.correctOption || "",
        marks: q.marks
      }))
    }
  });
});

// ════════════ 4. PUT /api/v1/teacher/weekly-tests/:id — Update Details ════════════
export const updateTeacherTestById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const { title, testDate, maxMarks, status } = req.body;

  const t = await WeeklyTestModel.findById(id);
  if (!t) {
    return ApiResponse.error(res, 404, "Weekly test not found.", "NOT_FOUND");
  }

  if (String(t.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied.", "FORBIDDEN");
  }

  if (title !== undefined) t.title = title;
  if (testDate !== undefined) t.testDate = new Date(testDate);
  if (maxMarks !== undefined) t.maxMarks = maxMarks;
  if (status !== undefined) {
    const normalizedStatus = status.toUpperCase();
    if (["DRAFT", "PUBLISHED", "CLOSED"].includes(normalizedStatus)) {
      t.status = normalizedStatus;
    }
  }

  await t.save();

  return ApiResponse.success(res, 200, "Weekly test updated successfully", { test: t });
});

// ════════════ 5. POST /api/v1/teacher/weekly-tests/:id/questions — Add/Set Questions ════════════
export const addQuestionsToWeeklyTest = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const { questions } = req.body;

  if (!questions || !Array.isArray(questions)) {
    return ApiResponse.error(res, 400, "questions array containing questionText, options, correctOption, and marks is required.", "VALIDATION_ERROR");
  }

  const test = await WeeklyTestModel.findById(id);
  if (!test) {
    return ApiResponse.error(res, 404, "Weekly test not found.", "NOT_FOUND");
  }

  if (String(test.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied.", "FORBIDDEN");
  }

  // Clear old questions
  await WeeklyTestQuestionModel.deleteMany({ testId: id });

  // Bulk Insert new questions
  const docs = questions.map((q: any) => ({
    testId: new mongoose.Types.ObjectId(id),
    questionText: q.text || q.questionText || "Question text missing",
    options: q.options || [],
    correctOption: q.correctAnswer || q.correctOption || "",
    marks: q.marks || 1
  }));

  const inserted = await WeeklyTestQuestionModel.insertMany(docs);

  return ApiResponse.created(res, `${inserted.length} questions added to weekly test ${id} successfully!`, {
    testId: id,
    addedCount: inserted.length,
    questions: inserted
  });
});

// ════════════ 6. PATCH/POST /api/v1/teacher/weekly-tests/:id/publish — Publish Test ════════════
export const publishWeeklyTest = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const test = await WeeklyTestModel.findById(id)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code");

  if (!test) {
    return ApiResponse.error(res, 404, "Weekly test not found.", "NOT_FOUND");
  }

  if (String(test.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied.", "FORBIDDEN");
  }

  test.status = "PUBLISHED";
  await test.save();

  emitParentSyncEvent("PARENT_WEEKLY_TEST_CREATED", {
    title: "Weekly Test Announced 🧪",
    message: `${(test.subjectId as any)?.subjectName || "Subject"} Weekly Test scheduled for Class ${(test.classId as any)?.className || ""}-${(test.sectionId as any)?.sectionName || ""}. Max Marks: ${test.maxMarks}.`,
    testId: id,
    publishedAt: new Date().toISOString()
  });

  return ApiResponse.success(res, 200, `Weekly test ${id} published and broadcasted to Parent App!`, {
    testId: id,
    status: "PUBLISHED",
    publishedAt: new Date()
  });
});

// ════════════ 7. POST /api/v1/teacher/weekly-tests/:id/results — Submit Marks ════════════
export const submitWeeklyTestResults = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const teacherId = user?.id || user?._id;

  const { results } = req.body; // array of { studentId, marksObtained, grade, remarks, status }

  if (!results || !Array.isArray(results)) {
    return ApiResponse.error(res, 400, "results array containing studentId and marksObtained is required.", "VALIDATION_ERROR");
  }

  const test = await WeeklyTestModel.findById(id).populate("subjectId").lean();
  if (!test) {
    return ApiResponse.error(res, 404, "Weekly test not found.", "NOT_FOUND");
  }

  const upserted = [];

  for (const item of results) {
    if (!item.studentId || item.marksObtained === undefined) continue;

    const resDoc = await WeeklyTestResultModel.findOneAndUpdate(
      {
        schoolId,
        testId: new mongoose.Types.ObjectId(id),
        studentId: new mongoose.Types.ObjectId(item.studentId)
      },
      {
        $set: {
          marksObtained: item.marksObtained,
          grade: item.grade || "A",
          remarks: item.remarks || "Good attempt",
          status: item.status ? item.status.toUpperCase() : "SUBMITTED"
        }
      },
      { upsert: true, new: true }
    );
    upserted.push(resDoc);

    // If Published immediately, sync & notify parent
    if (resDoc.status === "PUBLISHED") {
      try {
        notifyParent(
          "ExponentPushToken[SampleParentToken]",
          "TEST_RESULT_PUBLISHED",
          "Weekly Test Result Shared 📊",
          `Weekly Test results for "${test.title}" is out! Score: ${item.marksObtained}/${test.maxMarks}. Grade: ${resDoc.grade}.`,
          { testId: id, score: `${item.marksObtained}/${test.maxMarks}` }
        );
      } catch (e) {}
    }
  }

  const io = (global as any).io;
  if (io) {
    io.emit("teacher:marks_submitted", { testId: id, resultsCount: results.length });
    io.emit("parent:result_update", { title: "Weekly Test Results Published 📊", testId: id });
  }

  return ApiResponse.created(res, `Results for weekly test ${id} submitted successfully!`, {
    testId: id,
    totalEvaluated: upserted.length,
    results: upserted
  });
});

// ════════════ 8. GET /api/v1/teacher/weekly-tests/:id/results — Get Marks ════════════
export const getWeeklyTestResults = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const test = await WeeklyTestModel.findById(id)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .lean();

  if (!test) {
    return ApiResponse.error(res, 404, "Weekly test not found.", "NOT_FOUND");
  }

  if (String(test.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied.", "FORBIDDEN");
  }

  const results = await WeeklyTestResultModel.find({ schoolId, testId: id })
    .populate("studentId", "name rollNo")
    .lean();

  const formattedResults = results.map((r, idx) => ({
    rank: idx + 1,
    studentId: String(r.studentId?._id || r.studentId),
    studentName: (r.studentId as any)?.name || "Student",
    rollNo: (r.studentId as any)?.rollNo || "N/A",
    marksObtained: r.marksObtained,
    percentage: ((r.marksObtained / test.maxMarks) * 100).toFixed(1) + "%",
    grade: r.grade || "A",
    remarks: r.remarks || "",
    status: r.status
  }));

  const totalScore = results.reduce((acc, curr) => acc + curr.marksObtained, 0);
  const avgScore = results.length > 0 ? (totalScore / results.length).toFixed(1) : "0.0";
  const avgPercent = results.length > 0 ? ((parseFloat(avgScore) / test.maxMarks) * 100).toFixed(1) + "%" : "0%";

  return ApiResponse.success(res, 200, `Results & leaderboard for weekly test ${id} retrieved`, {
    testId: id,
    testTitle: test.title,
    maxMarks: test.maxMarks,
    averageScore: `${avgScore} (${avgPercent})`,
    leaderboard: formattedResults
  });
});
