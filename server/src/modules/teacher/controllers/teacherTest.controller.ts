import { Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";

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

export const getTeacherTests = asyncHandler(async (req: Request, res: Response) => {
  const { classId = "class_8", sectionId = "sec_a" } = req.query;

  return ApiResponse.success(res, 200, "Weekly tests roster retrieved", {
    classId,
    sectionId,
    totalTests: 2,
    tests: [
      {
        id: "wt_401",
        title: "Maths Unit Test - 1 (Linear Equations)",
        testDate: "2024-05-28",
        durationMinutes: 45,
        maxMarks: 30,
        questionsCount: 15,
        status: "Published"
      }
    ]
  });
});

export const createTeacherTest = asyncHandler(async (req: Request, res: Response) => {
  const { classId = "class_8", sectionId = "sec_a", subjectId = "sub_math", title, testDate, durationMinutes = 45, maxMarks = 30 } = req.body;

  if (!title || !testDate) {
    return ApiResponse.error(res, 400, "Title and test date are required for weekly test");
  }

  const newTest = {
    id: `wt_${Date.now()}`,
    schoolId: "sch_101",
    teacherId: "tch_65a88203921",
    classId,
    sectionId,
    subjectId,
    title,
    testDate,
    durationMinutes,
    maxMarks,
    questionsCount: 0,
    status: "Draft",
    publishedAt: null,
    createdAt: new Date().toISOString()
  };

  return ApiResponse.created(res, "Weekly test created as draft successfully! Add questions next.", { test: newTest });
});

export const getTeacherTestById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  return ApiResponse.success(res, 200, `Weekly test ${id} details & questions retrieved`, {
    test: {
      id: id || "wt_401",
      title: "Maths Unit Test - 1 (Linear Equations)",
      testDate: "2024-05-28",
      durationMinutes: 45,
      maxMarks: 30,
      status: "Published",
      questions: [
        { id: "q1", text: "Solve for x: 2x + 5 = 15", options: ["x = 5", "x = 10", "x = 4", "x = 3"], correctAnswer: "x = 5", marks: 2 }
      ]
    }
  });
});

export const updateTeacherTestById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, testDate, durationMinutes, maxMarks } = req.body;

  return ApiResponse.success(res, 200, `Weekly test ${id} updated successfully!`, {
    test: { id, title, testDate, durationMinutes, maxMarks, updatedAt: new Date().toISOString() }
  });
});

export const addQuestionsToWeeklyTest = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { questions } = req.body;

  if (!questions || !Array.isArray(questions)) {
    return ApiResponse.error(res, 400, "Questions array is required");
  }

  return ApiResponse.created(res, `${questions.length} questions added to weekly test ${id} successfully!`, {
    testId: id,
    addedCount: questions.length,
    questions
  });
});

export const publishWeeklyTest = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  emitParentSyncEvent("PARENT_WEEKLY_TEST_CREATED", {
    title: "Weekly Test Announced 🧪",
    message: `Maths Unit Test - 1 scheduled for Class 8 - Section A on 28 May 2024. Max Marks: 30. Check Parent App for details.`,
    testId: id,
    publishedAt: new Date().toISOString()
  });

  return ApiResponse.success(res, 200, `Weekly test ${id} published and broadcasted to Parent App in real-time!`, {
    testId: id,
    status: "Published",
    publishedAt: new Date().toISOString(),
    parentNotificationSent: true
  });
});

export const submitWeeklyTestResults = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { results } = req.body;

  if (!results || !Array.isArray(results)) {
    return ApiResponse.error(res, 400, "Results array with studentId and marksObtained is required");
  }

  const io = (global as any).io;
  if (io) {
    io.emit("teacher:marks_submitted", { testId: id, resultsCount: results.length });
    io.emit("parent:result_update", { title: "Weekly Test Results Published 📊", testId: id });
  }

  return ApiResponse.created(res, `Results for weekly test ${id} submitted & broadcasted to Parent App!`, {
    testId: id,
    totalEvaluated: results.length,
    syncedToParentApp: true
  });
});

export const getWeeklyTestResults = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  return ApiResponse.success(res, 200, `Results & leaderboard for weekly test ${id} retrieved`, {
    testId: id || "wt_401",
    testTitle: "Maths Unit Test - 1 (Linear Equations)",
    maxMarks: 30,
    averageScore: "24.6 (82%)",
    leaderboard: [
      { rank: 1, studentId: "st_101", studentName: "Aarav Sharma", marksObtained: 29, percentage: "96.6%" }
    ]
  });
});
