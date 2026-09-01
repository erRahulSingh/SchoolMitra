// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Teacher Study Materials Controller (Dynamic DB Bound)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { StudyMaterialModel } from "../../../models/AcademicSchemas";
import { TeacherAssignmentModel } from "../../../models/SchoolSchemas";
import mongoose from "mongoose";
import { createNotification } from "../../../services/notificationService";

// ════════════ 1. GET /api/v1/teacher/materials — List Study Materials ════════════
export const getTeacherMaterials = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";

  const { classId, sectionId, subjectId } = req.query;

  const query: any = {
    schoolId,
    teacherId: new mongoose.Types.ObjectId(teacherId)
  };

  if (classId) query.classId = new mongoose.Types.ObjectId(classId as string);
  if (sectionId) query.sectionId = new mongoose.Types.ObjectId(sectionId as string);
  if (subjectId) query.subjectId = new mongoose.Types.ObjectId(subjectId as string);

  const list = await StudyMaterialModel.find(query)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .sort({ createdAt: -1 })
    .lean();

  const formattedMaterials = list.map(m => ({
    id: String(m._id),
    schoolId: String(m.schoolId),
    teacherId: String(m.teacherId),
    classId: String(m.classId?._id || m.classId),
    className: (m.classId as any)?.className || "Class",
    sectionId: String(m.sectionId?._id || m.sectionId),
    sectionName: (m.sectionId as any)?.sectionName || "A",
    subjectId: String(m.subjectId?._id || m.subjectId),
    subjectName: (m.subjectId as any)?.subjectName || "Subject",
    title: m.title,
    description: m.description || "",
    attachments: m.attachments || [],
    status: m.status,
    uploadedAt: m.createdAt
  }));

  return ApiResponse.success(res, 200, "Study material library retrieved", {
    totalMaterials: formattedMaterials.length,
    materials: formattedMaterials
  });
});

// ════════════ 2. POST /api/v1/teacher/materials — Upload Material ════════════
export const uploadTeacherMaterial = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";

  const { classId, sectionId, subjectId, title, description, attachments = [], academicYearId } = req.body;

  if (!classId || !subjectId || !title || !attachments || !Array.isArray(attachments) || attachments.length === 0) {
    return ApiResponse.error(res, 400, "classId, subjectId, title, and at least one attachment file are required.", "VALIDATION_ERROR");
  }

  // 1. Verify Teacher is assigned to this Class Section & Subject
  const query: any = {
    schoolId,
    teacherId,
    classId: new mongoose.Types.ObjectId(classId),
    subjectId: new mongoose.Types.ObjectId(subjectId),
    status: "Active"
  };

  if (sectionId) {
    query.sectionId = new mongoose.Types.ObjectId(sectionId);
  }

  const assignment = await TeacherAssignmentModel.findOne(query).lean();
  if (!assignment) {
    return ApiResponse.error(res, 403, "Access Denied: You are not assigned to teach this subject in this class section.", "FORBIDDEN");
  }

  // 2. Save study material record
  const material = await StudyMaterialModel.create({
    schoolId,
    teacherId: new mongoose.Types.ObjectId(teacherId),
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: sectionId ? new mongoose.Types.ObjectId(sectionId) : undefined,
    subjectId: new mongoose.Types.ObjectId(subjectId),
    academicYearId: academicYearId ? new mongoose.Types.ObjectId(academicYearId) : (assignment.academicYearId || undefined),
    title,
    description: description || "",
    attachments: attachments.map((a: any) => {
      const typeStr = (a.fileType || "PDF").toUpperCase();
      return {
        fileName: a.fileName || "File",
        fileUrl: a.fileUrl || "",
        fileType: ["PDF", "PPT", "DOC", "IMAGE", "LINK"].includes(typeStr) ? typeStr : "PDF",
        fileSize: a.fileSize || "1.0 MB"
      };
    }),
    status: "Active"
  });

  await createNotification({
    schoolId: schoolId.toString(),
    senderId: teacherId.toString(),
    recipientId: classId.toString(),
    recipientRole: "Parent",
    type: "MESSAGE",
    title: `New Study Material Shared: ${title} 📚`,
    message: `New study material "${title}" uploaded for class. Check student portal.`
  }).catch(() => {});

  return ApiResponse.created(res, "Study material metadata uploaded successfully!", { material });
});

// ════════════ 3. GET /api/v1/teacher/materials/:id — Get Details ════════════
export const getTeacherMaterialById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const m = await StudyMaterialModel.findById(id)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .lean();

  if (!m) {
    return ApiResponse.error(res, 404, "Study material not found.", "NOT_FOUND");
  }

  if (String(m.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied.", "FORBIDDEN");
  }

  return ApiResponse.success(res, 200, "Study material details retrieved", {
    material: {
      id: String(m._id),
      schoolId: String(m.schoolId),
      teacherId: String(m.teacherId),
      classId: String(m.classId?._id || m.classId),
      className: (m.classId as any)?.className || "Class",
      sectionId: String(m.sectionId?._id || m.sectionId),
      sectionName: (m.sectionId as any)?.sectionName || "A",
      subjectId: String(m.subjectId?._id || m.subjectId),
      subjectName: (m.subjectId as any)?.subjectName || "Subject",
      title: m.title,
      description: m.description || "",
      attachments: m.attachments || [],
      status: m.status,
      uploadedAt: m.createdAt
    }
  });
});

// ════════════ 4. PUT /api/v1/teacher/materials/:id — Update Material ════════════
export const updateTeacherMaterialById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const { title, description, attachments, status } = req.body;

  const m = await StudyMaterialModel.findById(id);
  if (!m) {
    return ApiResponse.error(res, 404, "Study material not found.", "NOT_FOUND");
  }

  if (String(m.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied.", "FORBIDDEN");
  }

  if (title !== undefined) m.title = title;
  if (description !== undefined) m.description = description;
  if (attachments !== undefined) {
    m.attachments = attachments.map((a: any) => {
      const typeStr = (a.fileType || "PDF").toUpperCase();
      return {
        fileName: a.fileName || "File",
        fileUrl: a.fileUrl || "",
        fileType: ["PDF", "PPT", "DOC", "IMAGE", "LINK"].includes(typeStr) ? typeStr : "PDF",
        fileSize: a.fileSize || "1.0 MB"
      };
    }) as any;
  }
  if (status !== undefined) m.status = status;

  await m.save();

  return ApiResponse.success(res, 200, "Study material updated successfully", { material: m });
});

// ════════════ 5. DELETE /api/v1/teacher/materials/:id — Delete Material ════════════
export const deleteTeacherMaterialById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const m = await StudyMaterialModel.findById(id);
  if (!m) {
    return ApiResponse.error(res, 404, "Study material not found.", "NOT_FOUND");
  }

  if (String(m.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Access Denied.", "FORBIDDEN");
  }

  await StudyMaterialModel.findByIdAndDelete(id);

  return ApiResponse.success(res, 200, "Study material deleted successfully.");
});
