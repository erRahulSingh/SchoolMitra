// @ts-nocheck
import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { LiveClass, MeetingAttendance } from "../../models/LiveClassSchemas";

// ──────────── TEACHER: Schedule a Live Class ────────────
export const scheduleClass = asyncHandler(async (req: any, res: any) => {
  const { classId, sectionId, subject, topic, meetingPlatform, startTime, endTime } = req.body;
  const schoolId = req.user?.schoolId;
  const teacherId = req.user?.userId;

  if (!classId || !sectionId || !subject || !topic || !startTime || !endTime) {
    throw ApiError.badRequest("Missing required fields for scheduling a live class.");
  }

  // In a real scenario, this would call Zoom API or Google Meet API to generate a link.
  // We'll generate a mock meeting link and ID for now.
  const meetingId = Math.random().toString(36).substring(2, 12);
  const meetingLink = `https://meet.schoolmitra.com/${meetingId}`;

  const liveClass = await LiveClass.create({
    schoolId,
    teacherId,
    classId,
    sectionId,
    subject,
    topic,
    meetingLink,
    meetingPlatform: meetingPlatform || "Zoom",
    meetingId,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    status: "Scheduled"
  });

  res.status(201).json(new ApiResponse(201, liveClass, "Live class scheduled successfully."));
});

// ──────────── TEACHER & STUDENT: Get Upcoming Classes ────────────
export const getUpcomingClasses = asyncHandler(async (req: any, res: any) => {
  const schoolId = req.user?.schoolId;
  const role = req.user?.role;
  const { classId, sectionId } = req.query;

  let query: any = { schoolId, status: { $in: ["Scheduled", "Ongoing"] } };

  if (role === "Teacher") {
    query.teacherId = req.user?.userId;
  } else if (role === "Parent" || role === "Student") {
    if (!classId || !sectionId) {
      throw ApiError.badRequest("classId and sectionId are required to fetch schedule.");
    }
    query.classId = classId;
    query.sectionId = sectionId;
  }

  const classes = await LiveClass.find(query).sort({ startTime: 1 }).populate("teacherId", "name email");

  res.status(200).json(new ApiResponse(200, classes, "Upcoming classes fetched successfully."));
});

// ──────────── STUDENT: Join a Class (Records Attendance) ────────────
export const joinClass = asyncHandler(async (req: any, res: any) => {
  const { liveClassId } = req.params;
  const studentId = req.user?.userId;
  const schoolId = req.user?.schoolId;

  const liveClass = await LiveClass.findOne({ _id: liveClassId, schoolId });
  if (!liveClass) {
    throw ApiError.notFound("Live class not found.");
  }

  if (liveClass.status === "Completed" || liveClass.status === "Cancelled") {
    throw ApiError.badRequest(`Cannot join a ${liveClass.status} class.`);
  }

  // Update status to ongoing if a student joins
  if (liveClass.status === "Scheduled") {
    liveClass.status = "Ongoing";
    await liveClass.save();
  }

  // Upsert Attendance Record
  await MeetingAttendance.findOneAndUpdate(
    { liveClassId, studentId, schoolId },
    { $setOnInsert: { joinTime: new Date() } },
    { upsert: true, new: true }
  );

  res.status(200).json(new ApiResponse(200, { meetingLink: liveClass.meetingLink, meetingPlatform: liveClass.meetingPlatform }, "Joined class successfully."));
});

// ──────────── TEACHER: End a Class ────────────
export const endClass = asyncHandler(async (req: any, res: any) => {
  const { liveClassId } = req.params;
  const teacherId = req.user?.userId;

  const liveClass = await LiveClass.findOne({ _id: liveClassId, teacherId });
  if (!liveClass) {
    throw ApiError.notFound("Live class not found or you are not authorized to end it.");
  }

  liveClass.status = "Completed";
  liveClass.endTime = new Date();
  await liveClass.save();

  // Mark leave time for all students who joined
  await MeetingAttendance.updateMany(
    { liveClassId, leaveTime: { $exists: false } },
    { $set: { leaveTime: new Date() } }
  );

  res.status(200).json(new ApiResponse(200, liveClass, "Live class ended successfully."));
});
