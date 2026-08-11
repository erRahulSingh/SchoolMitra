// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Teacher Assignment Controller
// Operations to assign Teachers to Classes, Sections & Subjects
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { TeacherAssignmentModel } from "../../models/SchoolSchemas";
import mongoose from "mongoose";

// ════════════ 1. GET /api/v1/admin/teacher-assignments ════════════
export const getTeacherAssignments = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const { teacherId, classId, sectionId, subjectId } = req.query;

  const query: any = { schoolId };

  if (teacherId) query.teacherId = new mongoose.Types.ObjectId(teacherId as string);
  if (classId) query.classId = new mongoose.Types.ObjectId(classId as string);
  if (sectionId) query.sectionId = new mongoose.Types.ObjectId(sectionId as string);
  if (subjectId) query.subjectId = new mongoose.Types.ObjectId(subjectId as string);

  const assignments = await TeacherAssignmentModel.find(query)
    .populate("teacherId", "name email phone role avatar status")
    .populate("classId", "className numericOrder")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code type")
    .populate("academicYearId", "year startDate endDate isCurrent")
    .sort({ createdAt: -1 })
    .lean();

  return ApiResponse.success(res, 200, "Teacher assignments retrieved", { assignments });
});

// ════════════ 2. POST /api/v1/admin/teacher-assignments ════════════
export const createTeacherAssignment = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const { teacherId, classId, sectionId, subjectId, academicYearId, academicYear, status } = req.body;

  if (!teacherId || !classId || !sectionId || !subjectId) {
    return ApiResponse.error(res, 400, "teacherId, classId, sectionId, and subjectId are required.", "VALIDATION_ERROR");
  }

  // Check duplicate assignment
  const existing = await TeacherAssignmentModel.findOne({
    schoolId,
    teacherId: new mongoose.Types.ObjectId(teacherId),
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: new mongoose.Types.ObjectId(sectionId),
    subjectId: new mongoose.Types.ObjectId(subjectId)
  });

  if (existing) {
    return ApiResponse.error(res, 409, "Teacher is already assigned to this class, section, and subject.", "DUPLICATE_ASSIGNMENT");
  }

  const assignment = await TeacherAssignmentModel.create({
    schoolId,
    teacherId: new mongoose.Types.ObjectId(teacherId),
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: new mongoose.Types.ObjectId(sectionId),
    subjectId: new mongoose.Types.ObjectId(subjectId),
    academicYearId: academicYearId ? new mongoose.Types.ObjectId(academicYearId) : undefined,
    academicYear: academicYear || "",
    status: status || "Active"
  });

  return ApiResponse.created(res, "Teacher assigned successfully", { assignment });
});

// ════════════ 3. PUT /api/v1/admin/teacher-assignments/:id ════════════
export const updateTeacherAssignment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { teacherId, classId, sectionId, subjectId, academicYearId, academicYear, status } = req.body;

  const assignment = await TeacherAssignmentModel.findById(id);
  if (!assignment) {
    return ApiResponse.error(res, 404, `Teacher assignment with ID '${id}' not found.`, "NOT_FOUND");
  }

  if (teacherId !== undefined) assignment.teacherId = new mongoose.Types.ObjectId(teacherId);
  if (classId !== undefined) assignment.classId = new mongoose.Types.ObjectId(classId);
  if (sectionId !== undefined) assignment.sectionId = new mongoose.Types.ObjectId(sectionId);
  if (subjectId !== undefined) assignment.subjectId = new mongoose.Types.ObjectId(subjectId);
  if (academicYearId !== undefined) assignment.academicYearId = academicYearId ? new mongoose.Types.ObjectId(academicYearId) : undefined;
  if (academicYear !== undefined) assignment.academicYear = academicYear;
  if (status !== undefined) assignment.status = status;

  await assignment.save();

  return ApiResponse.success(res, 200, "Teacher assignment updated successfully", { assignment });
});

// ════════════ 4. DELETE /api/v1/admin/teacher-assignments/:id ════════════
export const deleteTeacherAssignment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const assignment = await TeacherAssignmentModel.findByIdAndDelete(id);
  if (!assignment) {
    return ApiResponse.error(res, 404, `Teacher assignment with ID '${id}' not found.`, "NOT_FOUND");
  }

  return ApiResponse.success(res, 200, "Teacher assignment removed successfully", { deletedId: id });
});
