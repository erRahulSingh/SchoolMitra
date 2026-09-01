import { Request, Response } from "express";
import { AssignmentModel } from "../../models/AcademicSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import mongoose from "mongoose";

// ════════════ 1. CREATE ASSIGNMENT (Admin & Teacher) ════════════
export const createAssignment = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";
  // If teacher app calls this, fallback to their ID, otherwise accept from body (Admin)
  const creatorTeacherId = user?.role === "Teacher" ? (user.id || user._id) : req.body.teacherId;

  const { title, description, classId, sectionId, subjectId, maxMarks, dueDate, status } = req.body;

  if (!title || !classId || !subjectId || !maxMarks) {
    return ApiResponse.error(res, 400, "title, classId, subjectId, and maxMarks are required", "VALIDATION_ERROR");
  }

  const assignment = await AssignmentModel.create({
    schoolId,
    title,
    description,
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: sectionId ? new mongoose.Types.ObjectId(sectionId) : undefined,
    subjectId: new mongoose.Types.ObjectId(subjectId),
    teacherId: creatorTeacherId ? new mongoose.Types.ObjectId(creatorTeacherId) : undefined,
    maxMarks,
    dueDate,
    status: status || "PUBLISHED" // Auto-publish by default based on user request
  });

  return ApiResponse.created(res, "Assignment created successfully", { assignment });
});

// ════════════ 2. GET ASSIGNMENTS (Admin & Teacher) ════════════
export const getAssignments = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";
  const { classId, teacherId } = req.query;

  const query: any = { schoolId };
  if (classId) query.classId = new mongoose.Types.ObjectId(classId as string);
  
  // If teacher, force fetch only their assignments, unless it's an admin requesting a specific teacher's list
  if (user?.role === "Teacher") {
    query.teacherId = new mongoose.Types.ObjectId(user.id || user._id);
  } else if (teacherId) {
    query.teacherId = new mongoose.Types.ObjectId(teacherId as string);
  }

  const assignments = await AssignmentModel.find(query)
    .populate("classId", "className")
    .populate("subjectId", "subjectName")
    .populate("teacherId", "name")
    .sort({ createdAt: -1 })
    .lean();

  return ApiResponse.success(res, 200, "Assignments retrieved", { assignments });
});

// ════════════ 3. GET STUDENT ASSIGNMENTS (Parent App) ════════════
export const getStudentAssignments = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";
  const { studentId } = req.params;
  
  // Typically we'd fetch the student's classId from DB. We mock it for the demo endpoint.
  const classId = req.query.classId || "647b0a7d903e1c001f3eabc1"; 
  
  const assignments = await AssignmentModel.find({ 
    schoolId, 
    classId: new mongoose.Types.ObjectId(classId as string),
    status: "PUBLISHED" 
  })
    .populate("subjectId", "subjectName")
    .populate("teacherId", "name")
    .sort({ dueDate: 1 })
    .lean();

  return ApiResponse.success(res, 200, "Student assignments retrieved", { assignments });
});
