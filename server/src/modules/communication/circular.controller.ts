// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Circulars & Long-Form Notices Controller (Phase 10)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { CircularModel } from "../../models/CommunicationSchemas";
import { StudentModel, ParentModel } from "../../models/SchoolSchemas";
import { sendClassesNotification, sendClassNotification } from "../../services/notificationService";
import mongoose from "mongoose";

// ════════════ 1. POST /api/v1/admin/circulars — Create & Publish Circular ════════════
export const createCircular = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || req.body.schoolId || new mongoose.Types.ObjectId("650000000000000000000001");
  const senderId = user?.id || user?._id;

  const {
    title,
    content,
    attachments,
    targetAudience = "All Parents",
    targetClassId,
    status = "Published"
  } = req.body;

  if (!title || !content) {
    throw ApiError.badRequest("Circular title and long-form content details are required.");
  }

  const circular = await CircularModel.create({
    schoolId: new mongoose.Types.ObjectId(schoolId),
    title,
    date: new Date(),
    content,
    attachments: attachments || [],
    targetAudience,
    targetClassId: targetClassId ? new mongoose.Types.ObjectId(targetClassId) : undefined,
    status
  });

  // Notify target audience
  if (status === "Published") {
    if (targetAudience === "Specific Class" && targetClassId) {
      sendClassNotification(
        schoolId,
        senderId,
        targetClassId,
        undefined,
        "ANNOUNCEMENT",
        `📄 New Circular: ${title}`,
        content.substring(0, 100) + "...",
        "circulars",
        circular._id
      ).catch(() => {});
    } else {
      // Find all classes in school for all parents
      const students = await StudentModel.find({ schoolId: new mongoose.Types.ObjectId(schoolId) }).select("classId").lean();
      const classIds = Array.from(new Set(students.map((s: any) => String(s.classId))));
      sendClassesNotification(
        schoolId,
        senderId,
        classIds,
        "ANNOUNCEMENT",
        `📄 New Circular: ${title}`,
        content.substring(0, 100) + "...",
        "circulars",
        circular._id
      ).catch(() => {});
    }
  }

  return ApiResponse.created(res, "Circular published successfully with attachments", { circular });
});

// ════════════ 2. GET /api/v1/admin/circulars — Admin List Circulars ════════════
export const getAdminCirculars = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || req.query.schoolId;

  const query: any = {};
  if (schoolId && mongoose.Types.ObjectId.isValid(schoolId)) {
    query.schoolId = new mongoose.Types.ObjectId(schoolId);
  }

  const list = await CircularModel.find(query)
    .populate("targetClassId", "className")
    .sort({ createdAt: -1 })
    .lean();

  return ApiResponse.success(res, 200, "School circulars list retrieved", { circulars: list });
});

// ════════════ 3. GET /api/v1/parents/circulars — Parent View Targeted Circulars ════════════
export const getParentCirculars = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const userId = user?.id || user?._id;
  const schoolId = user?.schoolId || req.query.schoolId;

  // Find parent's children classes
  let childClassIds: mongoose.Types.ObjectId[] = [];
  if (userId) {
    const parentDoc = await ParentModel.findOne({ userId: new mongoose.Types.ObjectId(userId) }).lean();
    if (parentDoc) {
      const students = await StudentModel.find({ parentId: parentDoc._id }).select("classId").lean();
      childClassIds = students.map(s => s.classId);
    }
  }

  const query: any = { status: "Published" };
  if (schoolId && mongoose.Types.ObjectId.isValid(schoolId)) {
    query.schoolId = new mongoose.Types.ObjectId(schoolId);
  }

  query.$or = [
    { targetAudience: "All Parents" },
    { targetClassId: { $in: childClassIds } }
  ];

  const list = await CircularModel.find(query)
    .populate("targetClassId", "className")
    .sort({ createdAt: -1 })
    .lean();

  const formatted = list.map(c => {
    const isRead = userId ? c.readBy.some((r: any) => String(r.userId) === String(userId)) : false;
    return {
      id: c._id.toString(),
      _id: c._id.toString(),
      title: c.title,
      date: c.date,
      content: c.content,
      attachments: c.attachments || [],
      targetAudience: c.targetAudience,
      isRead,
      createdAt: c.createdAt
    };
  });

  return ApiResponse.success(res, 200, "Parent circulars retrieved", { circulars: formatted });
});

// ════════════ 4. GET /api/v1/circulars/:id — View Circular Details ════════════
export const getCircularById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const circular = await CircularModel.findById(id).populate("targetClassId", "className").lean();

  if (!circular) {
    throw ApiError.notFound("Circular document not found.");
  }

  return ApiResponse.success(res, 200, "Circular details retrieved", { circular });
});

// ════════════ 5. PATCH /api/v1/parents/circulars/:id/read — Mark Circular as Read ════════════
export const markCircularAsRead = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const userId = user?.id || user?._id || req.body.userId;

  if (!userId || !mongoose.Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Valid circular id and user authentication required.");
  }

  const circular = await CircularModel.findById(id);
  if (!circular) {
    throw ApiError.notFound("Circular not found.");
  }

  const userObjId = new mongoose.Types.ObjectId(userId);
  const alreadyRead = circular.readBy.some((r: any) => String(r.userId) === String(userObjId));

  if (!alreadyRead) {
    circular.readBy.push({ userId: userObjId, readAt: new Date() });
    await circular.save();
  }

  return ApiResponse.success(res, 200, "Circular marked as read successfully", { circular });
});

// ════════════ 6. PUT /api/v1/admin/circulars/:id — Update Circular ════════════
export const updateCircular = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId;
  const { title, content, attachments, targetAudience, targetClassId, status } = req.body;

  const circular = await CircularModel.findOne({ _id: id, ...(schoolId ? { schoolId } : {}) });
  if (!circular) {
    throw ApiError.notFound("Circular not found.");
  }

  if (title) circular.title = title;
  if (content) circular.content = content;
  if (attachments) circular.attachments = attachments;
  if (targetAudience) circular.targetAudience = targetAudience;
  if (targetClassId) circular.targetClassId = new mongoose.Types.ObjectId(targetClassId);
  if (status) circular.status = status;

  await circular.save();
  return ApiResponse.success(res, 200, "Circular updated successfully", { circular });
});

// ════════════ 7. DELETE /api/v1/admin/circulars/:id — Delete Circular ════════════
export const deleteCircular = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId;

  const circular = await CircularModel.findOneAndDelete({ _id: id, ...(schoolId ? { schoolId } : {}) });
  if (!circular) {
    throw ApiError.notFound("Circular not found.");
  }

  return ApiResponse.success(res, 200, "Circular deleted successfully");
});

// ════════════ 8. POST /api/v1/admin/circulars/:id/publish — Publish Circular ════════════
export const publishCircularHandler = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = (req as any).user?.schoolId;
  const senderId = (req as any).user?.id || (req as any).user?._id;

  const circular = await CircularModel.findOne({ _id: id, ...(schoolId ? { schoolId } : {}) });
  if (!circular) {
    throw ApiError.notFound("Circular not found.");
  }

  circular.status = "Published";
  circular.date = new Date();
  await circular.save();

  if (circular.targetAudience === "Specific Class" && circular.targetClassId) {
    sendClassNotification(
      circular.schoolId,
      senderId,
      circular.targetClassId,
      undefined,
      "ANNOUNCEMENT",
      `📄 Published Circular: ${circular.title}`,
      circular.content.substring(0, 100) + "...",
      "circulars",
      circular._id
    ).catch(() => {});
  } else {
    const students = await StudentModel.find({ schoolId: circular.schoolId }).select("classId").lean();
    const classIds = Array.from(new Set(students.map((s: any) => String(s.classId))));
    sendClassesNotification(
      circular.schoolId,
      senderId,
      classIds,
      "ANNOUNCEMENT",
      `📄 Published Circular: ${circular.title}`,
      circular.content.substring(0, 100) + "...",
      "circulars",
      circular._id
    ).catch(() => {});
  }

  return ApiResponse.success(res, 200, "Circular published successfully", { circular });
});
