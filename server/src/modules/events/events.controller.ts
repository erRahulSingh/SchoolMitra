import { Request, Response } from "express";
import { SchoolEventModel } from "../../models/CalendarSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

// ════════════ 1. CREATE EVENT (Admin Only) ════════════
export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";
  const createdBy = user?.id || "647b0a7d903e1c001f3eabc9";

  const { title, description, eventType, startDate, endDate, startTime, endTime, venue, targetAudience } = req.body;

  if (!title || !startDate || !endDate) {
    return ApiResponse.error(res, 400, "Title, startDate, and endDate are required", "VALIDATION_ERROR");
  }

  const event = await SchoolEventModel.create({
    schoolId,
    title,
    description,
    eventType: eventType || "Custom",
    startDate,
    endDate,
    startTime,
    endTime,
    venue,
    targetAudience: targetAudience || "All",
    createdBy,
    status: "Published",
    publishedAt: new Date()
  });

  return ApiResponse.created(res, "Event created successfully", { event });
});

// ════════════ 2. GET EVENTS (Admin & Parent) ════════════
export const getEvents = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "60f7b1b3b3b3b3b3b3b3b3b3";

  const events = await SchoolEventModel.find({ schoolId, status: "Published" })
    .sort({ startDate: 1 })
    .lean();

  return ApiResponse.success(res, 200, "Events retrieved successfully", { events });
});
