// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — School Calendar & Holidays Controller (Phase 10)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { SchoolCalendarModel, SchoolHolidayModel, SchoolEventModel } from "../../models/CalendarSchemas";
import { ExamScheduleModel } from "../../models/AcademicSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { logTeacherAction } from "../../services/auditLogService";
import { Types } from "mongoose";

const getSchoolId = (req: Request) => {
  return (req as any).user?.schoolId || "sch_default";
};

// Helper to seed default calendar if empty
const getOrSeedCalendar = async (schoolId: string) => {
  const calendars = await SchoolCalendarModel.find({
    ...(schoolId !== "sch_default" ? { schoolId } : {})
  }).lean().catch(() => []);

  if (calendars.length > 0) return calendars;

  const dummySchoolId = new Types.ObjectId("650000000000000000000001");
  return await SchoolCalendarModel.create([{
    schoolId: dummySchoolId,
    calendarName: "Academic Year 2026-27",
    description: "Main school academic calendar for session 2026-27",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2027-03-31"),
    isActive: true,
  }]);
};

// Helper to seed default holidays
const getOrSeedHolidays = async (schoolId: string) => {
  const holidays = await SchoolHolidayModel.find({
    ...(schoolId !== "sch_default" ? { schoolId } : {})
  }).lean().catch(() => []);

  if (holidays.length > 0) return holidays;

  const dummySchoolId = new Types.ObjectId("650000000000000000000001");
  return await SchoolHolidayModel.create([
    { schoolId: dummySchoolId, name: "Republic Day", date: new Date("2027-01-26"), holidayType: "National", description: "National holiday", isRecurringAnnually: true, applicableTo: "All" },
    { schoolId: dummySchoolId, name: "Holi", date: new Date("2027-03-14"), holidayType: "Religious", description: "Festival of colors", isRecurringAnnually: true, applicableTo: "All" },
    { schoolId: dummySchoolId, name: "Independence Day", date: new Date("2026-08-15"), holidayType: "National", description: "National holiday", isRecurringAnnually: true, applicableTo: "All" },
    { schoolId: dummySchoolId, name: "Gandhi Jayanti", date: new Date("2026-10-02"), holidayType: "National", description: "National holiday", isRecurringAnnually: true, applicableTo: "All" },
    { schoolId: dummySchoolId, name: "Diwali Break", date: new Date("2026-10-20"), endDate: new Date("2026-10-25"), holidayType: "Religious", description: "Diwali festival break", isRecurringAnnually: true, applicableTo: "All" },
    { schoolId: dummySchoolId, name: "Christmas", date: new Date("2026-12-25"), holidayType: "Religious", description: "Christmas holiday", isRecurringAnnually: true, applicableTo: "All" },
    { schoolId: dummySchoolId, name: "Summer Vacation", date: new Date("2026-05-15"), endDate: new Date("2026-06-30"), holidayType: "School", description: "Annual summer vacation", applicableTo: "All" },
    { schoolId: dummySchoolId, name: "Dussehra", date: new Date("2026-10-02"), holidayType: "Religious", description: "Vijayadashami festival", isRecurringAnnually: true, applicableTo: "All" },
    { schoolId: dummySchoolId, name: "Eid-ul-Fitr", date: new Date("2027-03-30"), holidayType: "Religious", description: "End of Ramadan", isRecurringAnnually: false, applicableTo: "All" },
    { schoolId: dummySchoolId, name: "Winter Break", date: new Date("2026-12-26"), endDate: new Date("2027-01-01"), holidayType: "School", description: "Annual winter vacation", applicableTo: "All" },
  ]);
};

// ════════════ 1. GET SCHOOL CALENDAR ════════════
export const getSchoolCalendar = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = getSchoolId(req);
  const calendars = await getOrSeedCalendar(schoolId);

  return ApiResponse.success(res, 200, "School calendar retrieved successfully", {
    calendars: calendars.map((c: any) => ({
      id: c._id?.toString(),
      calendarName: c.calendarName,
      description: c.description,
      startDate: c.startDate,
      endDate: c.endDate,
      isActive: c.isActive,
      createdAt: c.createdAt,
    })),
    total: calendars.length,
  });
});

// ════════════ 2. CREATE SCHOOL CALENDAR ════════════
export const createSchoolCalendar = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = getSchoolId(req);
  const { calendarName, description, startDate, endDate, academicYearId } = req.body;

  if (!calendarName || !startDate || !endDate) {
    return ApiResponse.error(res, 400, "Calendar name, start date, and end date are required");
  }

  const dummySchoolId = Types.ObjectId.isValid(schoolId)
    ? new Types.ObjectId(schoolId)
    : new Types.ObjectId("650000000000000000000001");

  const calendar = await SchoolCalendarModel.create({
    schoolId: dummySchoolId,
    academicYearId: academicYearId ? new Types.ObjectId(academicYearId) : undefined,
    calendarName,
    description,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    isActive: true,
  });

  logTeacherAction({
    schoolId,
    teacherId: (req as any).user?.id || "admin",
    teacherName: (req as any).user?.name || "Admin",
    action: "CREATE_CALENDAR",
    oldValue: null,
    newValue: { calendarName, startDate, endDate },
  });

  return ApiResponse.success(res, 201, "School calendar created successfully", { calendar });
});

// ════════════ 3. UPDATE SCHOOL CALENDAR ════════════
export const updateSchoolCalendar = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { calendarName, description, startDate, endDate, isActive } = req.body;

  if (!Types.ObjectId.isValid(id)) {
    return ApiResponse.error(res, 400, "Invalid calendar ID");
  }

  const calendar = await SchoolCalendarModel.findByIdAndUpdate(
    id,
    { calendarName, description, startDate, endDate, isActive },
    { new: true }
  );

  if (!calendar) {
    return ApiResponse.error(res, 404, "Calendar not found");
  }

  logTeacherAction({
    schoolId: getSchoolId(req),
    teacherId: (req as any).user?.id || "admin",
    teacherName: (req as any).user?.name || "Admin",
    action: "UPDATE_CALENDAR",
    oldValue: null,
    newValue: { calendarName, startDate, endDate },
  });

  return ApiResponse.success(res, 200, "Calendar updated successfully", { calendar });
});

// ════════════ 4. GET ALL HOLIDAYS ════════════
export const getHolidays = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = getSchoolId(req);
  const { type, year } = req.query;
  const holidays = await getOrSeedHolidays(schoolId);

  let filtered = [...holidays];

  if (type) {
    filtered = filtered.filter((h: any) => h.holidayType === type);
  }
  if (year) {
    const yearNum = Number(year);
    filtered = filtered.filter((h: any) => {
      const d = new Date(h.date);
      return d.getFullYear() === yearNum;
    });
  }

  return ApiResponse.success(res, 200, "School holidays retrieved successfully", {
    holidays: filtered.map((h: any) => ({
      id: h._id?.toString(),
      name: h.name,
      date: h.date,
      endDate: h.endDate,
      holidayType: h.holidayType,
      description: h.description,
      isRecurringAnnually: h.isRecurringAnnually,
      applicableTo: h.applicableTo,
    })),
    total: filtered.length,
  });
});

// ════════════ 5. ADD HOLIDAY ════════════
export const addHoliday = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = getSchoolId(req);
  const { name, date, endDate, holidayType, description, isRecurringAnnually, applicableTo, calendarId } = req.body;

  if (!name || !date) {
    return ApiResponse.error(res, 400, "Holiday name and date are required");
  }

  const dummySchoolId = Types.ObjectId.isValid(schoolId)
    ? new Types.ObjectId(schoolId)
    : new Types.ObjectId("650000000000000000000001");

  const holiday = await SchoolHolidayModel.create({
    schoolId: dummySchoolId,
    calendarId: calendarId ? new Types.ObjectId(calendarId) : undefined,
    name,
    date: new Date(date),
    endDate: endDate ? new Date(endDate) : undefined,
    holidayType: holidayType || "School",
    description,
    isRecurringAnnually: isRecurringAnnually || false,
    applicableTo: applicableTo || "All",
  });

  logTeacherAction({
    schoolId,
    teacherId: (req as any).user?.id || "admin",
    teacherName: (req as any).user?.name || "Admin",
    action: "ADD_HOLIDAY",
    oldValue: null,
    newValue: { name, date, holidayType },
  });

  return ApiResponse.success(res, 201, "Holiday added successfully", { holiday });
});

// ════════════ 6. UPDATE HOLIDAY ════════════
export const updateHoliday = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, date, endDate, holidayType, description, isRecurringAnnually, applicableTo } = req.body;

  if (!Types.ObjectId.isValid(id)) {
    return ApiResponse.error(res, 400, "Invalid holiday ID");
  }

  const holiday = await SchoolHolidayModel.findByIdAndUpdate(
    id,
    { name, date, endDate, holidayType, description, isRecurringAnnually, applicableTo },
    { new: true }
  );

  if (!holiday) {
    return ApiResponse.error(res, 404, "Holiday not found");
  }

  logTeacherAction({
    schoolId: getSchoolId(req),
    teacherId: (req as any).user?.id || "admin",
    teacherName: (req as any).user?.name || "Admin",
    action: "UPDATE_HOLIDAY",
    oldValue: null,
    newValue: { name, date, holidayType },
  });

  return ApiResponse.success(res, 200, "Holiday updated successfully", { holiday });
});

// ════════════ 7. DELETE HOLIDAY ════════════
export const deleteHoliday = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return ApiResponse.error(res, 400, "Invalid holiday ID");
  }

  const holiday = await SchoolHolidayModel.findByIdAndDelete(id);

  logTeacherAction({
    schoolId: getSchoolId(req),
    teacherId: (req as any).user?.id || "admin",
    teacherName: (req as any).user?.name || "Admin",
    action: "DELETE_HOLIDAY",
    oldValue: { name: (holiday as any)?.name },
    newValue: null,
  });

  return ApiResponse.success(res, 200, "Holiday deleted successfully");
});

// ════════════ 8. GET MONTHLY COMBINED VIEW ════════════
// Merges holidays + events + exams into a single month view
export const getMonthlyCalendarView = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = getSchoolId(req);
  const { year, month } = req.params;
  const yearNum = parseInt(year);
  const monthNum = parseInt(month) - 1; // JS months are 0-indexed

  const startOfMonth = new Date(yearNum, monthNum, 1);
  const endOfMonth = new Date(yearNum, monthNum + 1, 0, 23, 59, 59);

  // Fetch holidays
  const holidays = await SchoolHolidayModel.find({
    date: { $gte: startOfMonth, $lte: endOfMonth }
  }).lean().catch(() => []);

  // Fetch events
  const events = await SchoolEventModel.find({
    startDate: { $lte: endOfMonth },
    endDate: { $gte: startOfMonth },
  }).lean().catch(() => []);

  // Fetch exams in this month
  const exams = await ExamScheduleModel.find({
    startDate: { $gte: startOfMonth.toISOString().split("T")[0], $lte: endOfMonth.toISOString().split("T")[0] }
  }).lean().catch(() => []);

  // Build day-wise calendar entries
  const calendarDays: any[] = [];
  const daysInMonth = endOfMonth.getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(yearNum, monthNum, day);
    const dateStr = currentDate.toISOString().split("T")[0];
    const dayOfWeek = currentDate.getDay(); // 0=Sun, 6=Sat

    const dayHolidays = holidays.filter((h: any) => {
      const hDate = new Date(h.date);
      const hEnd = h.endDate ? new Date(h.endDate) : hDate;
      return currentDate >= new Date(hDate.toISOString().split("T")[0]) &&
             currentDate <= new Date(hEnd.toISOString().split("T")[0]);
    });

    const dayEvents = events.filter((e: any) => {
      const eStart = new Date(e.startDate);
      const eEnd = new Date(e.endDate);
      return currentDate >= new Date(eStart.toISOString().split("T")[0]) &&
             currentDate <= new Date(eEnd.toISOString().split("T")[0]);
    });

    const dayExams = exams.filter((ex: any) => {
      const exDate = ex.startDate;
      return exDate === dateStr;
    });

    calendarDays.push({
      date: dateStr,
      day,
      dayOfWeek,
      isSunday: dayOfWeek === 0,
      isHoliday: dayHolidays.length > 0,
      holidays: dayHolidays.map((h: any) => ({ id: h._id?.toString(), name: h.name, type: h.holidayType })),
      events: dayEvents.map((e: any) => ({ id: e._id?.toString(), title: e.title, type: e.eventType, status: e.status })),
      exams: dayExams.map((ex: any) => ({ id: ex._id?.toString(), name: ex.examName, class: ex.class })),
    });
  }

  return ApiResponse.success(res, 200, `Calendar for ${month}/${year} retrieved`, {
    year: yearNum,
    month: monthNum + 1,
    monthName: startOfMonth.toLocaleString("en-IN", { month: "long" }),
    totalDays: daysInMonth,
    totalHolidays: holidays.length,
    totalEvents: events.length,
    totalExams: exams.length,
    days: calendarDays,
  });
});
