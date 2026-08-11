// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Class Teacher Assignment Controller
// Operations to assign Class Teachers to Class Sections
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { ClassTeacherAssignmentModel, SectionModel } from "../../models/SchoolSchemas";
import mongoose from "mongoose";

// ════════════ 1. GET /api/v1/admin/class-teachers ════════════
export const getClassTeacherAssignments = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const { teacherId, classId, sectionId } = req.query;

  const query: any = { schoolId };

  if (teacherId) query.teacherId = new mongoose.Types.ObjectId(teacherId as string);
  if (classId) query.classId = new mongoose.Types.ObjectId(classId as string);
  if (sectionId) query.sectionId = new mongoose.Types.ObjectId(sectionId as string);

  const assignments = await ClassTeacherAssignmentModel.find(query)
    .populate("teacherId", "name email phone role avatar status")
    .populate("classId", "className numericOrder")
    .populate("sectionId", "sectionName")
    .populate("academicYearId", "year startDate endDate isCurrent")
    .sort({ createdAt: -1 })
    .lean();

  return ApiResponse.success(res, 200, "Class teacher assignments retrieved", { assignments });
});

// ════════════ 2. POST /api/v1/admin/class-teachers ════════════
export const createClassTeacherAssignment = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const { teacherId, classId, sectionId, academicYearId, academicYear, status } = req.body;

  if (!teacherId || !classId || !sectionId) {
    return ApiResponse.error(res, 400, "teacherId, classId, and sectionId are required.", "VALIDATION_ERROR");
  }

  // Check duplicate assignment for class + section
  const existing = await ClassTeacherAssignmentModel.findOne({
    schoolId,
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: new mongoose.Types.ObjectId(sectionId)
  });

  if (existing) {
    return ApiResponse.error(res, 409, "A class teacher is already assigned to this class section.", "DUPLICATE_ASSIGNMENT");
  }

  const assignment = await ClassTeacherAssignmentModel.create({
    schoolId,
    teacherId: new mongoose.Types.ObjectId(teacherId),
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: new mongoose.Types.ObjectId(sectionId),
    academicYearId: academicYearId ? new mongoose.Types.ObjectId(academicYearId) : undefined,
    academicYear: academicYear || "",
    status: status || "Active"
  });

  // Sync to Section document classTeacherId
  await SectionModel.findByIdAndUpdate(sectionId, {
    classTeacherId: new mongoose.Types.ObjectId(teacherId)
  });

  return ApiResponse.created(res, "Class teacher assigned successfully", { assignment });
});

// ════════════ 3. PUT /api/v1/admin/class-teachers/:id ════════════
export const updateClassTeacherAssignment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { teacherId, classId, sectionId, academicYearId, academicYear, status } = req.body;

  const assignment = await ClassTeacherAssignmentModel.findById(id);
  if (!assignment) {
    return ApiResponse.error(res, 404, `Class teacher assignment with ID '${id}' not found.`, "NOT_FOUND");
  }

  const oldTeacherId = assignment.teacherId;
  const oldSectionId = assignment.sectionId;

  if (teacherId !== undefined) assignment.teacherId = new mongoose.Types.ObjectId(teacherId);
  if (classId !== undefined) assignment.classId = new mongoose.Types.ObjectId(classId);
  if (sectionId !== undefined) assignment.sectionId = new mongoose.Types.ObjectId(sectionId);
  if (academicYearId !== undefined) assignment.academicYearId = academicYearId ? new mongoose.Types.ObjectId(academicYearId) : undefined;
  if (academicYear !== undefined) assignment.academicYear = academicYear;
  if (status !== undefined) assignment.status = status;

  await assignment.save();

  // Sync section updates
  if (sectionId !== undefined || teacherId !== undefined) {
    // Clear old section teacher
    await SectionModel.findByIdAndUpdate(oldSectionId, { $unset: { classTeacherId: "" } });
    // Update new section teacher
    const finalSectionId = sectionId || oldSectionId;
    const finalTeacherId = teacherId || oldTeacherId;
    await SectionModel.findByIdAndUpdate(finalSectionId, {
      classTeacherId: new mongoose.Types.ObjectId(finalTeacherId)
    });
  }

  return ApiResponse.success(res, 200, "Class teacher assignment updated successfully", { assignment });
});

// ════════════ 4. DELETE /api/v1/admin/class-teachers/:id ════════════
export const deleteClassTeacherAssignment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const assignment = await ClassTeacherAssignmentModel.findByIdAndDelete(id);
  if (!assignment) {
    return ApiResponse.error(res, 404, `Class teacher assignment with ID '${id}' not found.`, "NOT_FOUND");
  }

  // Clear classTeacherId on section
  await SectionModel.findByIdAndUpdate(assignment.sectionId, {
    $unset: { classTeacherId: "" }
  });

  return ApiResponse.success(res, 200, "Class teacher assignment removed successfully", { deletedId: id });
});
