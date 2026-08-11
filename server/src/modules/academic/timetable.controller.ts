// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Timetable Setup & Retrieval Controller
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { TimetableModel } from "../../models/SchoolSchemas";
import mongoose from "mongoose";

// ════════════ 1. GET /api/v1/admin/timetables — Retrieve Class/Teacher Timetables ════════════
export const getTimetables = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const { classId, sectionId, teacherId, dayOfWeek } = req.query;

  const query: any = { schoolId };

  if (classId) query.classId = new mongoose.Types.ObjectId(classId as string);
  if (sectionId) query.sectionId = new mongoose.Types.ObjectId(sectionId as string);
  if (teacherId) query.teacherId = new mongoose.Types.ObjectId(teacherId as string);
  if (dayOfWeek) query.dayOfWeek = dayOfWeek as string;

  const slots = await TimetableModel.find(query)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .populate("teacherId", "name email role")
    .sort({ dayOfWeek: 1, startTime: 1 })
    .lean();

  return ApiResponse.success(res, 200, "Timetable slots retrieved", { slots });
});

// ════════════ 2. POST /api/v1/admin/timetables — Create a Slot Entry ════════════
export const createTimetableEntry = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const { dayOfWeek, startTime, endTime, classId, sectionId, subjectId, teacherId, room, academicYearId } = req.body;

  if (!dayOfWeek || !startTime || !endTime || !classId || !sectionId || !subjectId || !teacherId) {
    return ApiResponse.error(res, 400, "dayOfWeek, startTime, endTime, classId, sectionId, subjectId, and teacherId are required.", "VALIDATION_ERROR");
  }

  // Check duplicate slot to prevent collisions
  const existing = await TimetableModel.findOne({
    schoolId,
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: new mongoose.Types.ObjectId(sectionId),
    dayOfWeek,
    startTime
  });

  if (existing) {
    return ApiResponse.error(res, 409, "A class slot already exists for this class section, day, and start time.", "COLLISION");
  }

  const slot = await TimetableModel.create({
    schoolId,
    academicYearId: academicYearId ? new mongoose.Types.ObjectId(academicYearId) : undefined,
    dayOfWeek,
    startTime,
    endTime,
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: new mongoose.Types.ObjectId(sectionId),
    subjectId: new mongoose.Types.ObjectId(subjectId),
    teacherId: new mongoose.Types.ObjectId(teacherId),
    room: room || ""
  });

  return ApiResponse.created(res, "Timetable slot entry created", { slot });
});

// ════════════ 3. PUT /api/v1/admin/timetables/:id — Edit Entry ════════════
export const updateTimetableEntry = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { dayOfWeek, startTime, endTime, classId, sectionId, subjectId, teacherId, room, academicYearId } = req.body;

  const slot = await TimetableModel.findById(id);
  if (!slot) {
    return ApiResponse.error(res, 404, `Timetable slot with ID '${id}' not found.`, "NOT_FOUND");
  }

  if (dayOfWeek !== undefined) slot.dayOfWeek = dayOfWeek;
  if (startTime !== undefined) slot.startTime = startTime;
  if (endTime !== undefined) slot.endTime = endTime;
  if (classId !== undefined) slot.classId = new mongoose.Types.ObjectId(classId);
  if (sectionId !== undefined) slot.sectionId = new mongoose.Types.ObjectId(sectionId);
  if (subjectId !== undefined) slot.subjectId = new mongoose.Types.ObjectId(subjectId);
  if (teacherId !== undefined) slot.teacherId = new mongoose.Types.ObjectId(teacherId);
  if (room !== undefined) slot.room = room;
  if (academicYearId !== undefined) slot.academicYearId = academicYearId ? new mongoose.Types.ObjectId(academicYearId) : undefined;

  await slot.save();

  return ApiResponse.success(res, 200, "Timetable slot updated successfully", { slot });
});

// ════════════ 4. DELETE /api/v1/admin/timetables/:id — Remove Entry ════════════
export const deleteTimetableEntry = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const slot = await TimetableModel.findByIdAndDelete(id);
  if (!slot) {
    return ApiResponse.error(res, 404, `Timetable slot with ID '${id}' not found.`, "NOT_FOUND");
  }

  return ApiResponse.success(res, 200, "Timetable slot entry removed successfully", { deletedId: id });
});

// ════════════ 5. GET /api/v1/teacher/timetable — Teacher Self Timetable ════════════
export const getTeacherTimetableHandler = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";

  const { day } = req.query; // e.g. "Monday"

  const query: any = {
    schoolId,
    teacherId: new mongoose.Types.ObjectId(teacherId)
  };

  if (day) {
    query.dayOfWeek = day as string;
  }

  const slots = await TimetableModel.find(query)
    .populate("classId", "className")
    .populate("sectionId", "sectionName")
    .populate("subjectId", "subjectName code")
    .sort({ dayOfWeek: 1, startTime: 1 })
    .lean();

  const formattedSlots = slots.map(s => ({
    id: String(s._id),
    day: s.dayOfWeek,
    time: `${s.startTime} - ${s.endTime}`,
    startTime: s.startTime,
    endTime: s.endTime,
    classId: String(s.classId?._id || s.classId),
    className: `${(s.classId as any)?.className || "Class"}-${(s.sectionId as any)?.sectionName || "A"}`,
    subject: (s.subjectId as any)?.subjectName || "Subject",
    room: s.room || "N/A"
  }));

  // Group by day of week if no specific day is requested
  if (!day) {
    const grouped: Record<string, any[]> = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    };
    formattedSlots.forEach(s => {
      if (grouped[s.day]) {
        grouped[s.day].push(s);
      }
    });
    return ApiResponse.success(res, 200, "Teacher weekly timetable retrieved", {
      timetable: grouped,
      totalSlotsCount: formattedSlots.length
    });
  }

  return ApiResponse.success(res, 200, `Teacher timetable for ${day} retrieved`, {
    timetable: formattedSlots,
    totalSlotsCount: formattedSlots.length
  });
});
