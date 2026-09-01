import { Request, Response } from "express";
import { ExamScheduleModel } from "../../models/AcademicSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import mongoose from "mongoose";

// ════════════ 1. CREATE EXAM SCHEDULE (Admin Only) ════════════
export const createExamSchedule = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";
  
  const { examName, examType, mode, classId, startDate, endDate, subjects } = req.body;

  if (!examName || !classId || !startDate || !endDate) {
    return ApiResponse.error(res, 400, "Missing required fields", "VALIDATION_ERROR");
  }

  // mode can be "Online" or "Offline" (Virtual flag for frontend to know what to display)
  // subjects array will have different details based on mode (handled by frontend)

  const schedule = await ExamScheduleModel.create({
    schoolId,
    examName,
    examType: examType || "Unit Test",
    academicYearId: new mongoose.Types.ObjectId("647b0a7d903e1c001f3eabcd"), // Mock Academic Year
    classId: new mongoose.Types.ObjectId(classId),
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    subjects: subjects || [],
    status: "Upcoming"
  });

  return ApiResponse.created(res, "Exam schedule created successfully", { schedule });
});

// ════════════ 2. GET EXAM SCHEDULES (Admin) ════════════
export const getExamSchedules = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";
  const { classId } = req.query;

  const query: any = { schoolId };
  if (classId) query.classId = new mongoose.Types.ObjectId(classId as string);

  const schedules = await ExamScheduleModel.find(query)
    .populate("classId", "className")
    .sort({ startDate: 1 })
    .lean();

  return ApiResponse.success(res, 200, "Exam schedules retrieved", { schedules });
});

// ════════════ 3. GET STUDENT EXAM SCHEDULES (Parent/Student App) ════════════
export const getStudentExamSchedules = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";
  
  // Mock student's class
  const classId = req.query.classId || "647b0a7d903e1c001f3eabc1"; 
  
  const schedules = await ExamScheduleModel.find({ 
    schoolId, 
    classId: new mongoose.Types.ObjectId(classId as string)
  })
    .populate("subjects.subjectId", "subjectName code")
    .sort({ startDate: 1 })
    .lean();

  return ApiResponse.success(res, 200, "Student exam schedules retrieved", { schedules });
});
