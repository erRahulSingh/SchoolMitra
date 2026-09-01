import { Request, Response } from "express";
import { ExamScheduleModel, MarkModel, ReportCardModel } from "../../models/AcademicSchemas";
import { StudentModel } from "../../models/SchoolSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";

function calculateGrade(percentage: number): string {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 40) return "D";
  return "F";
}

// ════════════ 1. LIST EXAMS ════════════
export const getExamsList = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId;
  
  const schedules = await ExamScheduleModel.find({ schoolId }).lean();
  return ApiResponse.success(res, 200, "Exams list retrieved", { exams: schedules });
});

// ════════════ 2. CREATE EXAM ════════════
export const createExam = asyncHandler(async (req: Request, res: Response) => {
  const { examName, classId, examType, startDate, endDate, academicYearId } = req.body;
  const user = (req as any).user;
  const schoolId = user?.schoolId;

  if (!examName || !classId || !academicYearId) {
    throw ApiError.badRequest("Exam name, classId, and academicYearId are required.");
  }

  const created = await ExamScheduleModel.create({
    schoolId,
    academicYearId,
    classId,
    examName,
    examType: examType || "Unit Test",
    startDate: startDate || new Date().toISOString().split("T")[0],
    endDate: endDate || new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    status: "Upcoming"
  });

  return ApiResponse.created(res, "Exam registered successfully.", { exam: created });
});

// ════════════ 3. EXAM SCHEDULE ════════════
export const getExamScheduleDetails = asyncHandler(async (req: Request, res: Response) => {
  const { classId } = req.query;
  const user = (req as any).user;
  
  if (!classId) throw ApiError.badRequest("classId query param is required.");
  
  const schedules = await ExamScheduleModel.find({ schoolId: user?.schoolId, classId }).populate("subjects.subjectId").lean();
  
  return ApiResponse.success(res, 200, `Exam schedule details for Class ${classId}`, {
    classId,
    schedules
  });
});

// ════════════ 4. MARKS ENTRY (SINGLE) ════════════
export const enterMarks = asyncHandler(async (req: Request, res: Response) => {
  const { studentId, examId, subjectId, marksObtained, maxMarks = 100 } = req.body;
  const user = (req as any).user;

  if (!studentId || !subjectId || !examId) {
    throw ApiError.badRequest("studentId, subjectId, and examId are required.");
  }

  const percentage = (marksObtained / maxMarks) * 100;
  const grade = calculateGrade(percentage);

  const mark = await MarkModel.findOneAndUpdate(
    { schoolId: user?.schoolId, studentId, examId, subjectId },
    { $set: { marksObtained, maxMarks, grade, isPassed: percentage >= 33, enteredBy: user?._id } },
    { new: true, upsert: true }
  );

  return ApiResponse.created(res, "Student marks recorded successfully.", { mark });
});

// ════════════ 4b. MARKS ENTRY (BULK FOR TEACHERS) ════════════
export const enterMarksBulk = asyncHandler(async (req: Request, res: Response) => {
  const { examId, subjectId, marks } = req.body; // marks is [{studentId, marksObtained, maxMarks}]
  const user = (req as any).user;
  const schoolId = user?.schoolId;

  if (!examId || !subjectId || !marks || !Array.isArray(marks)) {
    throw ApiError.badRequest("examId, subjectId, and an array of marks are required.");
  }

  const bulkOps = marks.map((m: any) => {
    const maxMarks = m.maxMarks || 100;
    const percentage = (m.marksObtained / maxMarks) * 100;
    const grade = calculateGrade(percentage);

    return {
      updateOne: {
        filter: { schoolId, studentId: m.studentId, examId, subjectId },
        update: { 
          $set: { 
            marksObtained: m.marksObtained, 
            maxMarks, 
            grade, 
            isPassed: percentage >= 33, 
            enteredBy: user?._id 
          } 
        },
        upsert: true
      }
    };
  });

  await MarkModel.bulkWrite(bulkOps);

  return ApiResponse.success(res, 200, "Bulk marks entered successfully.");
});

// ════════════ 5. GET STUDENT RESULT ════════════
export const getStudentResult = asyncHandler(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const user = (req as any).user;
  
  const reportCards = await ReportCardModel.find({ schoolId: user?.schoolId, studentId }).populate("examId").lean();

  return ApiResponse.success(res, 200, `Results for student ${studentId}`, {
    studentId,
    reportCards
  });
});

// ════════════ 6. REPORT CARD ════════════
export const getReportCard = asyncHandler(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const { examId } = req.query;
  const user = (req as any).user;
  
  let filter: any = { schoolId: user?.schoolId, studentId };
  if (examId) filter.examId = examId;

  // Get the most recent one if examId not provided
  const reportCard = await ReportCardModel.findOne(filter)
    .sort({ createdAt: -1 })
    .populate("examId")
    .populate("academicYearId")
    .populate("classId")
    .populate("subjects.subjectId")
    .lean();
    
  if (!reportCard) {
    throw ApiError.notFound("Report card not found for this student.");
  }
  
  const student = await StudentModel.findById(studentId).lean();

  return ApiResponse.success(res, 200, "Official report card generated", {
    reportCard,
    student
  });
});

// ════════════ 7. PUBLISH RESULTS ════════════
export const publishExamResults = asyncHandler(async (req: Request, res: Response) => {
  const { examId, classId } = req.body;
  const user = (req as any).user;
  const schoolId = user?.schoolId;

  await ReportCardModel.updateMany(
    { schoolId, examId, classId },
    { $set: { status: "PUBLISHED" } }
  );

  return ApiResponse.success(res, 200, `Results successfully published to Parent App!`, {
    examId,
    classId,
    status: "PUBLISHED"
  });
});

// ════════════ 8. STUDENT PERFORMANCE TRENDS (CHART DATA) ════════════
export const getStudentPerformance = asyncHandler(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const user = (req as any).user;
  
  const reportCards = await ReportCardModel.find({ schoolId: user?.schoolId, studentId }).populate("examId").sort({ createdAt: 1 }).lean();
  
  const gpaTrend = reportCards.map((rc: any) => ({
    exam: rc.examId?.examName || "Unknown",
    percentage: rc.percentage
  }));

  return ApiResponse.success(res, 200, "Academic performance history retrieved", {
    studentId,
    gpaTrend
  });
});
