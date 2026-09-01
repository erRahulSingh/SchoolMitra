import { Request, Response } from "express";
import { StudyMaterialModel } from "../../models/AcademicSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import mongoose from "mongoose";

// ════════════ 1. UPLOAD/CREATE STUDY MATERIAL (Admin & Teacher) ════════════
export const uploadStudyMaterial = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";
  const uploaderId = user?.role === "Teacher" ? (user.id || user._id) : req.body.teacherId || "647b0a7d903e1c001f3eabc3"; // Fallback to a teacher ID if Admin doesn't provide one

  const { title, description, classId, sectionId, subjectId, attachments } = req.body;

  if (!title || !classId || !subjectId) {
    return ApiResponse.error(res, 400, "title, classId, and subjectId are required", "VALIDATION_ERROR");
  }

  const material = await StudyMaterialModel.create({
    schoolId,
    title,
    description,
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: sectionId ? new mongoose.Types.ObjectId(sectionId) : undefined,
    subjectId: new mongoose.Types.ObjectId(subjectId),
    teacherId: new mongoose.Types.ObjectId(uploaderId),
    attachments: attachments || [],
    status: "Active"
  });

  return ApiResponse.created(res, "Study material uploaded successfully", { material });
});

// ════════════ 2. GET STUDY MATERIALS (Admin & Teacher) ════════════
export const getStudyMaterials = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";
  const { classId, subjectId } = req.query;

  const query: any = { schoolId };
  if (classId) query.classId = new mongoose.Types.ObjectId(classId as string);
  if (subjectId) query.subjectId = new mongoose.Types.ObjectId(subjectId as string);
  
  // Teachers should ideally only see their own materials, but maybe they want to see the whole class.
  // For now, let's fetch all for the class.
  if (user?.role === "Teacher") {
    query.teacherId = new mongoose.Types.ObjectId(user.id || user._id);
  }

  const materials = await StudyMaterialModel.find(query)
    .populate("classId", "className")
    .populate("subjectId", "subjectName")
    .populate("teacherId", "name")
    .sort({ createdAt: -1 })
    .lean();

  return ApiResponse.success(res, 200, "Study materials retrieved", { materials });
});

// ════════════ 3. GET STUDENT STUDY MATERIALS (Parent/Student App) ════════════
export const getStudentStudyMaterials = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";
  
  // Mock student's class
  const classId = req.query.classId || "647b0a7d903e1c001f3eabc1"; 
  
  const materials = await StudyMaterialModel.find({ 
    schoolId, 
    classId: new mongoose.Types.ObjectId(classId as string),
    status: "Active" 
  })
    .populate("subjectId", "subjectName")
    .populate("teacherId", "name")
    .sort({ createdAt: -1 })
    .lean();

  return ApiResponse.success(res, 200, "Student study materials retrieved", { materials });
});
