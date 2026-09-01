import { Request, Response } from "express";
import { CircularModel } from "../../models/CommunicationSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

// ════════════ 1. CREATE CIRCULAR (Admin Only) ════════════
export const createCircular = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";

  const { title, content, targetAudience, attachments } = req.body;

  if (!title || !content) {
    return ApiResponse.error(res, 400, "Title and content are required", "VALIDATION_ERROR");
  }

  const circular = await CircularModel.create({
    schoolId,
    title,
    content,
    targetAudience: targetAudience || "All Parents",
    attachments: attachments || [],
    status: "Published"
  });

  return ApiResponse.created(res, "Circular created successfully", { circular });
});

// ════════════ 2. GET CIRCULARS (Admin & Parent) ════════════
export const getCirculars = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";

  const circulars = await CircularModel.find({ schoolId, status: "Published" })
    .sort({ date: -1 })
    .lean();

  return ApiResponse.success(res, 200, "Circulars retrieved successfully", { circulars });
});
