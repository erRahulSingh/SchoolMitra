import { Request, Response } from "express";
import { ReportCardModel } from "../../models/AcademicSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

// [ADMIN] Upload a new Report Card
export const uploadReportCard = asyncHandler(async (req: Request, res: Response) => {
  const { studentId, classId, sectionId, academicYearId, examName, subjects, totalMaxMarks, totalMarksObtained, percentage, overallGrade, remarks, attendance } = req.body;
  
  const schoolId = (req as any).user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3"; // Fallback for testing

  const reportCard = await ReportCardModel.findOneAndUpdate(
    { schoolId, studentId, examName },
    {
      classId, sectionId, academicYearId, subjects, totalMaxMarks, totalMarksObtained, percentage, overallGrade, remarks, attendance, status: "PUBLISHED"
    },
    { upsert: true, new: true }
  );

  return ApiResponse.success(res, 201, "Report Card uploaded successfully", reportCard);
});

// [PARENT] Get all Report Cards for a student
export const getStudentReportCards = asyncHandler(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const schoolId = (req as any).user?.schoolId || (req.query.schoolId as string);

  if (!studentId) {
    return ApiResponse.error(res, 400, "Student ID is required", "MISSING_STUDENT_ID");
  }

  const query: any = { studentId, status: "PUBLISHED" };
  if (schoolId) query.schoolId = schoolId;

  const reportCards = await ReportCardModel.find(query).sort({ issuedDate: -1 });

  return ApiResponse.success(res, 200, "Report cards fetched successfully", reportCards);
});
