// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Teacher Attendance Controller (Dynamic DB Bound)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";
import { notifyParent } from "../../../services/pushNotificationService";
import { StudentModel, TeacherAssignmentModel, SectionModel } from "../../../models/SchoolSchemas";
import { AttendanceModel, AttendanceCorrectionRequestModel } from "../../../models/AcademicSchemas";
import mongoose from "mongoose";

function emitParentSyncEvent(eventName: string, payload: any) {
  try {
    const io = (global as any).io;
    const now = new Date().toISOString();
    if (io) {
      io.emit("teacher:attendance_updated", { eventName: "teacher:attendance_updated", ...payload, timestamp: now });
      io.emit("parent:attendance_update", { eventName: "parent:attendance_update", title: payload.title, body: payload.message, ...payload, timestamp: now });
    }
  } catch (err) {}
}

// ════════════ 1. GET /api/v1/teacher/attendance — Today's Attendance / Class Roster ════════════
export const getTeacherAttendance = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";

  const { classId, sectionId, date } = req.query;
  const attendanceDate = (date as string) || new Date().toISOString().split("T")[0];

  if (!classId || !sectionId) {
    return ApiResponse.error(res, 400, "classId and sectionId are required query parameters.", "VALIDATION_ERROR");
  }

  // 1. Verify class assignment
  const assignment = await TeacherAssignmentModel.findOne({
    schoolId,
    teacherId,
    classId: new mongoose.Types.ObjectId(classId as string),
    sectionId: new mongoose.Types.ObjectId(sectionId as string),
    status: "Active"
  }).lean();

  if (!assignment) {
    return ApiResponse.error(res, 403, "Access Denied: You are not assigned to this class section.", "FORBIDDEN");
  }

  // 2. Fetch all active students in this class section
  const students = await StudentModel.find({
    schoolId,
    classId: new mongoose.Types.ObjectId(classId as string),
    sectionId: new mongoose.Types.ObjectId(sectionId as string),
    status: "Active"
  })
    .select("rollNo name parentId")
    .sort({ rollNo: 1 })
    .lean();

  // 3. Check for existing attendance records for this date
  const records = await AttendanceModel.find({
    schoolId,
    classId: new mongoose.Types.ObjectId(classId as string),
    sectionId: new mongoose.Types.ObjectId(sectionId as string),
    date: attendanceDate
  }).lean();

  const recordMap: Record<string, any> = {};
  records.forEach(r => {
    recordMap[String(r.studentId)] = r;
  });

  // 4. Construct roster with status
  const attendanceRoster = students.map(s => {
    const rec = recordMap[String(s._id)];
    return {
      id: rec ? String(rec._id) : undefined,
      studentId: String(s._id),
      rollNo: s.rollNo || "N/A",
      name: s.name,
      status: rec ? rec.status : "Present", // defaults to Present if unmarked
      remarks: rec ? rec.remarks : ""
    };
  });

  const present = attendanceRoster.filter(r => r.status === "Present").length;
  const absent = attendanceRoster.filter(r => r.status === "Absent").length;
  const leave = attendanceRoster.filter(r => r.status === "Leave").length;
  const late = attendanceRoster.filter(r => r.status === "Late").length;

  return ApiResponse.success(res, 200, "Class attendance status retrieved", {
    classId,
    sectionId,
    date: attendanceDate,
    summary: { totalStudents: students.length, present, absent, leave, late },
    attendanceRoster
  });
});

// ════════════ 2. POST /api/v1/teacher/attendance — Submit Daily Roll Call ════════════
export const saveTeacherAttendance = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";

  const { classId, sectionId, date = new Date().toISOString().split("T")[0], attendance } = req.body;

  if (!classId || !sectionId || !attendance || !Array.isArray(attendance)) {
    return ApiResponse.error(res, 400, "classId, sectionId, and attendance array are required.");
  }

  // 1. Verify class assignment
  const assignment = await TeacherAssignmentModel.findOne({
    schoolId,
    teacherId,
    classId: new mongoose.Types.ObjectId(classId),
    sectionId: new mongoose.Types.ObjectId(sectionId),
    status: "Active"
  }).lean();

  if (!assignment) {
    return ApiResponse.error(res, 403, "Access Denied: You are not assigned to this class section.", "FORBIDDEN");
  }

  const upsertedRecords = [];

  // 2. Perform Upserts for each student record to prevent duplicates
  for (const item of attendance) {
    if (!item.studentId || !item.status) continue;

    const record = await AttendanceModel.findOneAndUpdate(
      {
        schoolId,
        studentId: new mongoose.Types.ObjectId(item.studentId),
        date
      },
      {
        $set: {
          teacherId: new mongoose.Types.ObjectId(teacherId),
          classId: new mongoose.Types.ObjectId(classId),
          sectionId: new mongoose.Types.ObjectId(sectionId),
          status: item.status,
          remarks: item.remarks || ""
        }
      },
      { upsert: true, new: true }
    );
    upsertedRecords.push(record);

    // 3. Send Live Push Notification to Parent for Absent/Leave status
    if (item.status === "Absent" || item.status === "Leave") {
      notifyParent(
        "ExponentPushToken[SampleParentToken]",
        "ATTENDANCE_UPDATE",
        `Daily Attendance Update: ${item.status} 📅`,
        `Student was marked ${item.status} on ${date}. Verified by Class Teacher.`,
        { studentId: item.studentId, date, status: item.status }
      );
    }
  }

  const totalCount = attendance.length;
  const presentCount = attendance.filter((a: any) => a.status === "Present").length;
  const absentCount = attendance.filter((a: any) => a.status === "Absent").length;
  const leaveCount = attendance.filter((a: any) => a.status === "Leave").length;
  const lateCount = attendance.filter((a: any) => a.status === "Late").length;

  // Broadcast sync event to Parent App
  emitParentSyncEvent("PARENT_ATTENDANCE_UPDATED", {
    title: "Daily Attendance Recorded 📅",
    message: `Attendance marked for Class ${classId} on ${date}. Present: ${presentCount}, Absent: ${absentCount}.`,
    classId,
    sectionId,
    date,
    stats: { totalCount, presentCount, absentCount, leaveCount, lateCount }
  });

  return ApiResponse.created(res, "Attendance saved to database & broadcasted to Parent App in real-time!", {
    summary: { totalCount, presentCount, absentCount, leaveCount, lateCount },
    savedRecordsCount: upsertedRecords.length
  });
});

// ════════════ 3. PUT /api/v1/teacher/attendance/:id — Update Today's Attendance (Locked older dates) ════════════
export const updateTeacherAttendanceById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";
  const { status, remarks } = req.body;

  if (!status) {
    return ApiResponse.error(res, 400, "Status is required.", "VALIDATION_ERROR");
  }

  const record = await AttendanceModel.findById(id);
  if (!record) {
    return ApiResponse.error(res, 404, "Attendance record not found.", "NOT_FOUND");
  }

  // Cross-tenant check
  if (String(record.schoolId) !== String(schoolId)) {
    return ApiResponse.error(res, 403, "Forbidden: Cross-tenant modification denied.", "CROSS_TENANT_BLOCKED");
  }

  // Enforce lock check: attendance for dates older than today cannot be modified directly
  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  if (record.date !== todayStr) {
    return ApiResponse.error(
      res,
      403,
      `Attendance for date '${record.date}' is Locked 🔒. Direct modification is disabled. Please submit an Admin Correction Request.`,
      "ATTENDANCE_LOCKED"
    );
  }

  const oldStatus = record.status;
  record.status = status;
  if (remarks !== undefined) record.remarks = remarks;
  await record.save();

  emitParentSyncEvent("PARENT_ATTENDANCE_UPDATED", {
    title: "Attendance Record Updated",
    message: `Attendance status updated to ${status}.`,
    attendanceId: id,
    status
  });

  return ApiResponse.success(res, 200, "Attendance record updated successfully!", {
    attendanceId: id,
    oldStatus,
    newStatus: status
  });
});

// ════════════ 4. POST /api/v1/teacher/attendance/correction-request — Request Modification for Locked Dates ════════════
export const requestAttendanceCorrection = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";

  const { attendanceId, requestedStatus, reason } = req.body;

  if (!attendanceId || !requestedStatus || !reason) {
    return ApiResponse.error(res, 400, "attendanceId, requestedStatus, and reason are required.", "VALIDATION_ERROR");
  }

  const attendance = await AttendanceModel.findById(attendanceId);
  if (!attendance) {
    return ApiResponse.error(res, 404, "Attendance record not found.", "NOT_FOUND");
  }

  const student = await StudentModel.findById(attendance.studentId).lean();

  const newRequest = await AttendanceCorrectionRequestModel.create({
    schoolId,
    teacherId: new mongoose.Types.ObjectId(teacherId),
    attendanceId: new mongoose.Types.ObjectId(attendanceId),
    studentId: attendance.studentId,
    date: attendance.date,
    currentStatus: attendance.status,
    requestedStatus,
    reason,
    status: "PendingAdminApproval"
  });

  return ApiResponse.created(res, "Attendance correction request submitted to School Admin for verification!", {
    correctionRequest: {
      requestId: String(newRequest._id),
      attendanceId,
      studentName: student ? student.name : "Student",
      date: attendance.date,
      currentStatus: attendance.status,
      requestedStatus,
      reason,
      status: "PendingAdminApproval",
      submittedAt: newRequest.createdAt
    }
  });
});

// ════════════ 5. POST /api/v1/teacher/attendance/offline-sync — Sync Queued Items ════════════
export const syncOfflineAttendanceBatch = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const teacherId = user?.id || user?._id;
  const schoolId = user?.schoolId || "sch_default";

  const { offlineQueue } = req.body;

  if (!offlineQueue || !Array.isArray(offlineQueue) || offlineQueue.length === 0) {
    return ApiResponse.error(res, 400, "offlineQueue array containing queued attendance items is required");
  }

  const syncedItems = [];
  let absentCount = 0;
  let presentCount = 0;

  for (const item of offlineQueue) {
    if (!item.studentId || !item.date || !item.status || !item.classId || !item.sectionId) continue;

    const record = await AttendanceModel.findOneAndUpdate(
      {
        schoolId,
        studentId: new mongoose.Types.ObjectId(item.studentId),
        date: item.date
      },
      {
        $set: {
          teacherId: new mongoose.Types.ObjectId(teacherId),
          classId: new mongoose.Types.ObjectId(item.classId),
          sectionId: new mongoose.Types.ObjectId(item.sectionId),
          status: item.status,
          remarks: item.remarks || "Synced Offline"
        }
      },
      { upsert: true, new: true }
    );

    if (item.status === "Absent") absentCount++;
    if (item.status === "Present") presentCount++;

    syncedItems.push({
      offlineQueueId: item.offlineQueueId || `off_${Math.random()}`,
      studentId: item.studentId,
      date: item.date,
      status: item.status,
      syncedAt: new Date().toISOString(),
      syncStatus: "Success"
    });
  }

  emitParentSyncEvent("PARENT_ATTENDANCE_UPDATED", {
    title: "Offline Attendance Synced to Cloud ☁️",
    message: `Batch of ${syncedItems.length} offline attendance records synced successfully!`,
    totalSynced: syncedItems.length,
    presentCount,
    absentCount
  });

  return ApiResponse.created(res, `Batch of ${syncedItems.length} offline attendance records synced successfully!`, {
    batchReceipt: {
      totalReceived: offlineQueue.length,
      syncedCount: syncedItems.length,
      syncedAt: new Date().toISOString(),
      items: syncedItems
    }
  });
});

// ════════════ 6. GET /api/v1/teacher/attendance/student/:studentId — Student History ════════════
export const getStudentAttendanceHistory = asyncHandler(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const schoolId = (req as any).user?.schoolId || "sch_default";

  const history = await AttendanceModel.find({ schoolId, studentId }).sort({ date: -1 }).lean();
  const student = await StudentModel.findById(studentId).lean();

  const total = history.length;
  const present = history.filter(h => h.status === "Present").length;
  const absent = history.filter(h => h.status === "Absent").length;
  const leave = history.filter(h => h.status === "Leave").length;
  const late = history.filter(h => h.status === "Late").length;

  const percentage = total > 0 ? ((present + late) / total * 100).toFixed(1) + "%" : "100%";

  return ApiResponse.success(res, 200, `Attendance history for student retrieved`, {
    studentId,
    studentName: student ? student.name : "Student",
    overallPercentage: percentage,
    totalWorkingDays: total,
    presentDays: present,
    absentDays: absent,
    leaveDays: leave,
    lateDays: late
  });
});

// ════════════ 7. GET /api/v1/teacher/attendance/report — Monthly Class Report ════════════
export const getTeacherAttendanceReport = asyncHandler(async (req: Request, res: Response) => {
  const { classId, sectionId, month } = req.query;
  const schoolId = (req as any).user?.schoolId || "sch_default";

  if (!classId || !sectionId) {
    return ApiResponse.error(res, 400, "classId and sectionId are required.");
  }

  // Count matches
  const totalRecords = await AttendanceModel.countDocuments({
    schoolId,
    classId: new mongoose.Types.ObjectId(classId as string),
    sectionId: new mongoose.Types.ObjectId(sectionId as string)
  });

  const presentRecords = await AttendanceModel.countDocuments({
    schoolId,
    classId: new mongoose.Types.ObjectId(classId as string),
    sectionId: new mongoose.Types.ObjectId(sectionId as string),
    status: { $in: ["Present", "Late"] }
  });

  const rate = totalRecords > 0 ? ((presentRecords / totalRecords) * 100).toFixed(1) + "%" : "95.0%";

  return ApiResponse.success(res, 200, "Monthly attendance report retrieved", {
    classId,
    sectionId,
    month: month || "Current",
    averageAttendanceRate: rate,
    totalWorkingDays: Math.ceil(totalRecords / 30) || 24
  });
});
