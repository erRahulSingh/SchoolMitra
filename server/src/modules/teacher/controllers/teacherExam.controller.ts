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

export const getTeacherExams = asyncHandler(async (req: Request, res: Response) => {
  const { classId = "class_8", sectionId = "sec_a" } = req.query;

  return ApiResponse.success(res, 200, "Examination datesheet & schedule retrieved", {
    classId,
    sectionId,
    totalExams: 3,
    exams: [
      {
        id: "ex_501",
        examName: "Unit Test - 1",
        examType: "Unit Test",
        term: "Term 1 (2024)",
        classId: "class_8",
        className: "Class 8 - Section A",
        subjectId: "sub_math",
        subjectName: "Mathematics",
        examDate: "2024-05-25",
        maximumMarks: 50,
        passingMarks: 18,
        status: "Upcoming"
      }
    ]
  });
});

export const getTeacherExamById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  return ApiResponse.success(res, 200, `Exam ${id} schedule details retrieved`, {
    exam: {
      id: id || "ex_501",
      examName: "Unit Test - 1",
      examType: "Unit Test",
      term: "Term 1 (2024)",
      classId: "class_8",
      className: "Class 8 - Section A",
      subjectId: "sub_math",
      subjectName: "Mathematics",
      examDate: "2024-05-25",
      maximumMarks: 50,
      passingMarks: 18,
      status: "Upcoming"
    }
  });
});

export const getTeacherExamStudentsForMarks = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  return ApiResponse.success(res, 200, `Student marks roster for exam ${id} retrieved`, {
    examId: id || "ex_501",
    examName: "Unit Test - 1",
    subjectName: "Mathematics",
    maximumMarks: 50,
    passingMarks: 18,
    studentsMarksRoster: [
      { studentId: "st_101", rollNo: "01", name: "Aarav Sharma", maximumMarks: 50, obtainedMarks: 48, grade: "A+", remarks: "Outstanding performance in algebra", isPassed: true },
      { studentId: "st_102", rollNo: "02", name: "Diya Verma", maximumMarks: 50, obtainedMarks: 44, grade: "A", remarks: "Very good analytical skills", isPassed: true }
    ]
  });
});

export const saveTeacherMarks = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { subjectId = "sub_math", marksRoster } = req.body;

  if (!marksRoster || !Array.isArray(marksRoster)) {
    return ApiResponse.error(res, 400, "marksRoster array with studentId, obtainedMarks, maximumMarks, grade, and remarks is required");
  }

  emitParentSyncEvent("PARENT_MARKS_UPDATED", {
    title: "Exam Marks Recorded 💯",
    message: `Unit Test - 1 marks for Mathematics recorded & verified by Class Teacher. Check student result portal.`,
    examId: id,
    subjectId,
    totalEvaluated: marksRoster.length
  });

  return ApiResponse.created(res, `Exam marks recorded & broadcasted to Parent App in real-time!`, {
    examId: id,
    subjectId,
    totalEvaluated: marksRoster.length,
    syncedToParentApp: true,
    savedAt: new Date().toISOString()
  });
});

export const updateTeacherMarksById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { marksRoster } = req.body;

  emitParentSyncEvent("PARENT_MARKS_UPDATED", {
    title: "Exam Marks Updated 📝",
    message: `Marks entry updated for Unit Test - 1 Mathematics. Verified by Educator.`,
    examId: id,
    updatedCount: marksRoster ? marksRoster.length : 1
  });

  return ApiResponse.success(res, 200, `Exam ${id} marks updated successfully!`, {
    examId: id,
    syncedToParentApp: true,
    updatedAt: new Date().toISOString()
  });
});
