// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Leave Management Controller (Phase 10)
// Teacher + Student Leave Application & Approval Workflow
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { LeaveApplicationModel, LeaveBalanceModel } from "../../models/CalendarSchemas";
import { UserModel } from "../../models/AuthSchemas";
import { StudentModel } from "../../models/SchoolSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { logTeacherAction } from "../../services/auditLogService";
import { send } from "../../services/notificationService";
import { Types } from "mongoose";

const getSchoolId = (req: Request) => {
  return (req as any).user?.schoolId || "sch_default";
};

// Helper to calculate total days between two dates
const calculateDays = (start: Date, end: Date, isHalfDay: boolean): number => {
  if (isHalfDay) return 0.5;
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive
  return diffDays;
};

// Helper to seed leave applications if empty
const getOrSeedLeaveApplications = async (schoolId: string) => {
  const leaves = await LeaveApplicationModel.find({
    ...(schoolId !== "sch_default" ? { schoolId } : {})
  }).sort({ createdAt: -1 }).lean().catch(() => []);

  if (leaves.length > 0) return leaves;

  const dummySchoolId = new Types.ObjectId("650000000000000000000001");

  // Find teachers for demo data
  const teachers = await UserModel.find({
    role: { $in: ["Teacher", "teacher"] }
  }).limit(4).lean() as any;

  const students = await StudentModel.find().limit(3).lean() as any;

  const seedData: any[] = [];

  if (teachers.length > 0) {
    seedData.push(
      {
        schoolId: dummySchoolId,
        applicantId: teachers[0]?._id || new Types.ObjectId(),
        applicantName: teachers[0]?.name || "Sunita Rao",
        applicantType: "Teacher",
        leaveType: "Casual",
        reason: "Family function — attending nephew's wedding in Jaipur",
        startDate: new Date("2026-08-18"),
        endDate: new Date("2026-08-20"),
        totalDays: 3,
        status: "Pending",
      },
      {
        schoolId: dummySchoolId,
        applicantId: teachers[1]?._id || new Types.ObjectId(),
        applicantName: teachers[1]?.name || "Dr. Vikram Malhotra",
        applicantType: "Teacher",
        leaveType: "Medical",
        reason: "Scheduled dental surgery, doctor's note attached",
        startDate: new Date("2026-08-10"),
        endDate: new Date("2026-08-12"),
        totalDays: 3,
        status: "Approved",
        approverName: "Principal Sharma",
        approvedAt: new Date("2026-08-08"),
      },
      {
        schoolId: dummySchoolId,
        applicantId: teachers[2]?._id || teachers[0]?._id || new Types.ObjectId(),
        applicantName: teachers[2]?.name || teachers[0]?.name || "Priya Gupta",
        applicantType: "Teacher",
        leaveType: "Earned",
        reason: "Planned annual vacation with family",
        startDate: new Date("2026-09-01"),
        endDate: new Date("2026-09-05"),
        totalDays: 5,
        status: "Pending",
      },
      {
        schoolId: dummySchoolId,
        applicantId: teachers[0]?._id || new Types.ObjectId(),
        applicantName: teachers[0]?.name || "Sunita Rao",
        applicantType: "Teacher",
        leaveType: "Casual",
        reason: "Personal work — bank and passport office visit",
        startDate: new Date("2026-07-22"),
        endDate: new Date("2026-07-22"),
        totalDays: 1,
        isHalfDay: true,
        halfDayType: "First_Half",
        status: "Approved",
        approverName: "Principal Sharma",
        approvedAt: new Date("2026-07-20"),
      }
    );
  }

  // Student leaves
  if (students.length > 0) {
    seedData.push(
      {
        schoolId: dummySchoolId,
        applicantId: students[0]?.parentId || new Types.ObjectId(),
        applicantName: "Parent of " + (students[0]?.name || "Aarav Sharma"),
        applicantType: "Student",
        studentId: students[0]?._id,
        classId: students[0]?.classId,
        sectionId: students[0]?.sectionId,
        leaveType: "Medical",
        reason: "Child has high fever and doctor has advised bed rest for 2 days",
        startDate: new Date("2026-08-14"),
        endDate: new Date("2026-08-15"),
        totalDays: 2,
        status: "Pending",
      },
      {
        schoolId: dummySchoolId,
        applicantId: students[1]?.parentId || new Types.ObjectId(),
        applicantName: "Parent of " + (students[1]?.name || "Diya Verma"),
        applicantType: "Student",
        studentId: students[1]?._id,
        classId: students[1]?.classId,
        sectionId: students[1]?.sectionId,
        leaveType: "Family_Emergency",
        reason: "Grandmother is unwell, need to visit hometown urgently",
        startDate: new Date("2026-08-11"),
        endDate: new Date("2026-08-13"),
        totalDays: 3,
        status: "Approved",
        approverName: "Class Teacher - Sunita Rao",
        approvedAt: new Date("2026-08-10"),
      }
    );
  }

  // Fallback if no teachers/students found
  if (seedData.length === 0) {
    seedData.push(
      {
        schoolId: dummySchoolId,
        applicantId: new Types.ObjectId(),
        applicantName: "Sunita Rao",
        applicantType: "Teacher",
        leaveType: "Casual",
        reason: "Family function — attending nephew's wedding",
        startDate: new Date("2026-08-18"),
        endDate: new Date("2026-08-20"),
        totalDays: 3,
        status: "Pending",
      },
      {
        schoolId: dummySchoolId,
        applicantId: new Types.ObjectId(),
        applicantName: "Dr. Vikram Malhotra",
        applicantType: "Teacher",
        leaveType: "Medical",
        reason: "Scheduled dental surgery",
        startDate: new Date("2026-08-10"),
        endDate: new Date("2026-08-12"),
        totalDays: 3,
        status: "Approved",
        approverName: "Principal Sharma",
        approvedAt: new Date("2026-08-08"),
      },
      {
        schoolId: dummySchoolId,
        applicantId: new Types.ObjectId(),
        applicantName: "Parent of Aarav Sharma",
        applicantType: "Student",
        leaveType: "Medical",
        reason: "Child has high fever",
        startDate: new Date("2026-08-14"),
        endDate: new Date("2026-08-15"),
        totalDays: 2,
        status: "Pending",
      }
    );
  }

  return await LeaveApplicationModel.create(seedData);
};

// Helper to get or create leave balance
const getOrCreateLeaveBalance = async (schoolId: string, staffId: Types.ObjectId, staffName: string) => {
  const dummySchoolId = Types.ObjectId.isValid(schoolId)
    ? new Types.ObjectId(schoolId)
    : new Types.ObjectId("650000000000000000000001");

  let balance = await LeaveBalanceModel.findOne({
    staffId,
    academicYear: "2026-27",
  }).lean() as any;

  if (!balance) {
    balance = await LeaveBalanceModel.create({
      schoolId: dummySchoolId,
      staffId,
      staffName,
      academicYear: "2026-27",
    });
    balance = (balance as any).toObject ? (balance as any).toObject() : balance;
  }

  return balance;
};

// ════════════ 1. APPLY FOR LEAVE (Teacher/Staff) ════════════
export const applyLeave = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = getSchoolId(req);
  const {
    leaveType, reason, startDate, endDate,
    isHalfDay, halfDayType, attachments
  } = req.body;

  if (!leaveType || !reason || !startDate || !endDate) {
    return ApiResponse.error(res, 400, "Leave type, reason, start date, and end date are required");
  }

  const userId = (req as any).user?.id;
  const userName = (req as any).user?.name || "Unknown Teacher";

  const dummySchoolId = Types.ObjectId.isValid(schoolId)
    ? new Types.ObjectId(schoolId)
    : new Types.ObjectId("650000000000000000000001");

  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = calculateDays(start, end, isHalfDay || false);

  const leave = await LeaveApplicationModel.create({
    schoolId: dummySchoolId,
    applicantId: Types.ObjectId.isValid(userId) ? new Types.ObjectId(userId) : new Types.ObjectId(),
    applicantName: userName,
    applicantType: "Teacher",
    leaveType,
    reason,
    startDate: start,
    endDate: end,
    totalDays,
    isHalfDay: isHalfDay || false,
    halfDayType,
    attachments,
    status: "Pending",
  });

  logTeacherAction({
    schoolId,
    teacherId: userId || "unknown",
    teacherName: userName,
    action: "APPLY_LEAVE",
    oldValue: null,
    newValue: { leaveType, startDate, endDate, totalDays, reason },
  });

  // Notify school admin about new leave request
  const admins = await UserModel.find({
    role: { $in: ["SchoolAdmin", "Principal"] },
    ...(schoolId !== "sch_default" ? { schoolId } : {}),
  }).select("_id").lean() as any;

  for (const admin of admins.slice(0, 5)) {
    await send({
      schoolId,
      senderId: userId,
      recipientId: admin._id,
      recipientRole: "SchoolAdmin",
      type: "LEAVE",
      title: "🏖️ New Leave Request",
      message: `${userName} has applied for ${totalDays} day(s) ${leaveType} leave from ${start.toLocaleDateString("en-IN")} to ${end.toLocaleDateString("en-IN")}`,
      referenceType: "leave",
      referenceId: leave._id,
    }).catch(() => {});
  }

  return ApiResponse.success(res, 201, "Leave application submitted successfully", { leave });
});

// ════════════ 2. GET LEAVE APPLICATIONS ════════════
export const getLeaveApplications = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = getSchoolId(req);
  const { status, type, applicantType, page, limit } = req.query;

  let leaves = await getOrSeedLeaveApplications(schoolId);
  let filtered = [...leaves];

  if (status) {
    filtered = filtered.filter((l: any) => l.status === status);
  }
  if (type) {
    filtered = filtered.filter((l: any) => l.leaveType === type);
  }
  if (applicantType) {
    filtered = filtered.filter((l: any) => l.applicantType === applicantType);
  }

  // Pagination
  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(50, Math.max(1, Number(limit) || 20));
  const total = filtered.length;
  const paginated = filtered.slice((pageNum - 1) * limitNum, pageNum * limitNum);

  // Summary stats
  const pendingCount = leaves.filter((l: any) => l.status === "Pending").length;
  const approvedCount = leaves.filter((l: any) => l.status === "Approved").length;
  const rejectedCount = leaves.filter((l: any) => l.status === "Rejected").length;
  const teacherLeaves = leaves.filter((l: any) => l.applicantType === "Teacher").length;
  const studentLeaves = leaves.filter((l: any) => l.applicantType === "Student").length;

  return ApiResponse.success(res, 200, "Leave applications retrieved successfully", {
    leaves: paginated.map((l: any) => ({
      id: l._id?.toString(),
      applicantName: l.applicantName,
      applicantType: l.applicantType,
      leaveType: l.leaveType,
      reason: l.reason,
      startDate: l.startDate,
      endDate: l.endDate,
      totalDays: l.totalDays,
      isHalfDay: l.isHalfDay,
      halfDayType: l.halfDayType,
      status: l.status,
      approverName: l.approverName,
      approvedAt: l.approvedAt,
      rejectionReason: l.rejectionReason,
      createdAt: l.createdAt,
    })),
    total,
    page: pageNum,
    limit: limitNum,
    summary: {
      pending: pendingCount,
      approved: approvedCount,
      rejected: rejectedCount,
      teacherLeaves,
      studentLeaves,
    },
  });
});

// ════════════ 3. GET SINGLE LEAVE APPLICATION ════════════
export const getLeaveById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return ApiResponse.error(res, 400, "Invalid leave application ID");
  }

  const leave = await LeaveApplicationModel.findById(id).lean() as any;
  if (!leave) {
    return ApiResponse.error(res, 404, "Leave application not found");
  }

  return ApiResponse.success(res, 200, "Leave application details retrieved", { leave });
});

// ════════════ 4. APPROVE LEAVE ════════════
export const approveLeave = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = getSchoolId(req);
  const approverName = (req as any).user?.name || "Admin";
  const approverId = (req as any).user?.id;

  if (!Types.ObjectId.isValid(id)) {
    return ApiResponse.error(res, 400, "Invalid leave application ID");
  }

  const leave = await LeaveApplicationModel.findById(id);
  if (!leave) {
    return ApiResponse.error(res, 404, "Leave application not found");
  }

  if (leave.status !== "Pending") {
    return ApiResponse.error(res, 400, `Leave is already ${leave.status}. Only pending leaves can be approved.`);
  }

  leave.status = "Approved";
  leave.approvedBy = Types.ObjectId.isValid(approverId) ? new Types.ObjectId(approverId) : undefined;
  leave.approverName = approverName;
  leave.approvedAt = new Date();
  leave.notificationSent = true;
  await leave.save();

  // Update leave balance for teacher/staff
  if (leave.applicantType === "Teacher" || leave.applicantType === "Staff") {
    try {
      const leaveTypeMap: Record<string, string> = {
        "Casual": "casualLeave",
        "Medical": "sickLeave",
        "Earned": "earnedLeave",
        "Maternity": "maternityLeave",
        "Paternity": "paternityLeave",
        "Unpaid": "unpaidLeave",
      };
      const balanceField = leaveTypeMap[leave.leaveType] || "casualLeave";

      await LeaveBalanceModel.findOneAndUpdate(
        { staffId: leave.applicantId, academicYear: "2026-27" },
        {
          $inc: {
            [`${balanceField}.used`]: leave.totalDays,
            [`${balanceField}.remaining`]: -leave.totalDays,
          },
        }
      );
    } catch (err) {
      // Balance update failure should not block approval
    }
  }

  // Notify applicant
  await send({
    schoolId,
    senderId: approverId,
    recipientId: leave.applicantId,
    recipientRole: leave.applicantType === "Student" ? "Parent" : "Teacher",
    type: "LEAVE",
    title: "✅ Leave Approved",
    message: `Your ${leave.leaveType} leave from ${new Date(leave.startDate).toLocaleDateString("en-IN")} to ${new Date(leave.endDate).toLocaleDateString("en-IN")} has been approved by ${approverName}`,
    referenceType: "leave",
    referenceId: leave._id,
  }).catch(() => {});

  logTeacherAction({
    schoolId,
    teacherId: approverId || "admin",
    teacherName: approverName,
    action: "APPROVE_LEAVE",
    oldValue: { status: "Pending" },
    newValue: { status: "Approved", applicantName: leave.applicantName, totalDays: leave.totalDays },
  });

  return ApiResponse.success(res, 200, "Leave approved successfully", { leave });
});

// ════════════ 5. REJECT LEAVE ════════════
export const rejectLeave = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = getSchoolId(req);
  const { rejectionReason } = req.body;
  const approverName = (req as any).user?.name || "Admin";
  const approverId = (req as any).user?.id;

  if (!Types.ObjectId.isValid(id)) {
    return ApiResponse.error(res, 400, "Invalid leave application ID");
  }

  const leave = await LeaveApplicationModel.findById(id);
  if (!leave) {
    return ApiResponse.error(res, 404, "Leave application not found");
  }

  if (leave.status !== "Pending") {
    return ApiResponse.error(res, 400, `Leave is already ${leave.status}. Only pending leaves can be rejected.`);
  }

  leave.status = "Rejected";
  leave.approvedBy = Types.ObjectId.isValid(approverId) ? new Types.ObjectId(approverId) : undefined;
  leave.approverName = approverName;
  leave.rejectionReason = rejectionReason || "Not approved by administration";
  leave.notificationSent = true;
  await leave.save();

  // Notify applicant
  await send({
    schoolId,
    senderId: approverId,
    recipientId: leave.applicantId,
    recipientRole: leave.applicantType === "Student" ? "Parent" : "Teacher",
    type: "LEAVE",
    title: "❌ Leave Rejected",
    message: `Your ${leave.leaveType} leave from ${new Date(leave.startDate).toLocaleDateString("en-IN")} to ${new Date(leave.endDate).toLocaleDateString("en-IN")} has been rejected. Reason: ${leave.rejectionReason}`,
    referenceType: "leave",
    referenceId: leave._id,
  }).catch(() => {});

  logTeacherAction({
    schoolId,
    teacherId: approverId || "admin",
    teacherName: approverName,
    action: "REJECT_LEAVE",
    oldValue: { status: "Pending" },
    newValue: { status: "Rejected", applicantName: leave.applicantName, rejectionReason: leave.rejectionReason },
  });

  return ApiResponse.success(res, 200, "Leave rejected", { leave });
});

// ════════════ 6. CANCEL LEAVE ════════════
export const cancelLeave = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const schoolId = getSchoolId(req);
  const userId = (req as any).user?.id;
  const userName = (req as any).user?.name || "User";

  if (!Types.ObjectId.isValid(id)) {
    return ApiResponse.error(res, 400, "Invalid leave application ID");
  }

  const leave = await LeaveApplicationModel.findById(id);
  if (!leave) {
    return ApiResponse.error(res, 404, "Leave application not found");
  }

  if (leave.status !== "Pending") {
    return ApiResponse.error(res, 400, `Only pending leaves can be cancelled. Current status: ${leave.status}`);
  }

  leave.status = "Cancelled";
  leave.cancelledAt = new Date();
  await leave.save();

  logTeacherAction({
    schoolId,
    teacherId: userId || "unknown",
    teacherName: userName,
    action: "CANCEL_LEAVE",
    oldValue: { status: "Pending" },
    newValue: { status: "Cancelled", applicantName: leave.applicantName },
  });

  return ApiResponse.success(res, 200, "Leave cancelled successfully", { leave });
});

// ════════════ 7. GET LEAVE BALANCE FOR STAFF ════════════
export const getLeaveBalance = asyncHandler(async (req: Request, res: Response) => {
  const { staffId } = req.params;
  const schoolId = getSchoolId(req);

  if (!Types.ObjectId.isValid(staffId)) {
    return ApiResponse.error(res, 400, "Invalid staff ID");
  }

  const staff = await UserModel.findById(staffId).select("name role").lean() as any;
  const staffName = (staff as any)?.name || "Unknown Staff";

  const balance = await getOrCreateLeaveBalance(schoolId, new Types.ObjectId(staffId), staffName);

  return ApiResponse.success(res, 200, "Leave balance retrieved", {
    staffId,
    staffName,
    academicYear: (balance as any).academicYear,
    balance: {
      casualLeave: (balance as any).casualLeave,
      sickLeave: (balance as any).sickLeave,
      earnedLeave: (balance as any).earnedLeave,
      maternityLeave: (balance as any).maternityLeave,
      paternityLeave: (balance as any).paternityLeave,
      unpaidLeave: (balance as any).unpaidLeave,
    },
  });
});

// ════════════ 8. GET ALL STAFF LEAVE BALANCES ════════════
export const getAllLeaveBalances = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = getSchoolId(req);

  // Find all staff members
  const staffMembers = await UserModel.find({
    role: { $in: ["Teacher", "teacher", "Accountant", "Driver"] },
    ...(schoolId !== "sch_default" ? { schoolId } : {}),
  }).select("_id name role").lean() as any;

  const balances = [];

  for (const staff of staffMembers) {
    const balance = await getOrCreateLeaveBalance(schoolId, staff._id as Types.ObjectId, (staff as any).name);
    balances.push({
      staffId: staff._id?.toString(),
      staffName: (staff as any).name,
      role: (staff as any).role,
      academicYear: (balance as any).academicYear,
      casualLeave: (balance as any).casualLeave,
      sickLeave: (balance as any).sickLeave,
      earnedLeave: (balance as any).earnedLeave,
    });
  }

  return ApiResponse.success(res, 200, "All staff leave balances retrieved", {
    balances,
    total: balances.length,
  });
});

// ════════════ 9. GET LEAVE HISTORY ════════════
export const getLeaveHistory = asyncHandler(async (req: Request, res: Response) => {
  const { applicantId } = req.params;
  const { year } = req.query;

  let query: any = {};

  if (Types.ObjectId.isValid(applicantId)) {
    query.applicantId = new Types.ObjectId(applicantId);
  }

  if (year) {
    const yearNum = Number(year);
    query.startDate = {
      $gte: new Date(`${yearNum}-01-01`),
      $lte: new Date(`${yearNum}-12-31`),
    };
  }

  const history = await LeaveApplicationModel.find(query)
    .sort({ createdAt: -1 })
    .lean()
    .catch(() => []);

  return ApiResponse.success(res, 200, "Leave history retrieved", {
    history: history.map((l: any) => ({
      id: l._id?.toString(),
      applicantName: l.applicantName,
      applicantType: l.applicantType,
      leaveType: l.leaveType,
      reason: l.reason,
      startDate: l.startDate,
      endDate: l.endDate,
      totalDays: l.totalDays,
      status: l.status,
      approverName: l.approverName,
      rejectionReason: l.rejectionReason,
      createdAt: l.createdAt,
    })),
    total: history.length,
  });
});

// ════════════ 10. STUDENT LEAVE APPLICATION (Parent submits) ════════════
export const applyStudentLeave = asyncHandler(async (req: Request, res: Response) => {
  const schoolId = getSchoolId(req);
  const {
    studentId, leaveType, reason, startDate, endDate,
    isHalfDay, halfDayType, attachments
  } = req.body;

  if (!studentId || !leaveType || !reason || !startDate || !endDate) {
    return ApiResponse.error(res, 400, "Student ID, leave type, reason, start date, and end date are required");
  }

  const userId = (req as any).user?.id;
  const userName = (req as any).user?.name || "Parent";

  const dummySchoolId = Types.ObjectId.isValid(schoolId)
    ? new Types.ObjectId(schoolId)
    : new Types.ObjectId("650000000000000000000001");

  // Get student details
  let studentName = "Student";
  let classId, sectionId;
  if (Types.ObjectId.isValid(studentId)) {
    const student = await StudentModel.findById(studentId).select("name classId sectionId parentId").lean() as any;
    if (student) {
      studentName = (student as any).name;
      classId = (student as any).classId;
      sectionId = (student as any).sectionId;
    }
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = calculateDays(start, end, isHalfDay || false);

  const leave = await LeaveApplicationModel.create({
    schoolId: dummySchoolId,
    applicantId: Types.ObjectId.isValid(userId) ? new Types.ObjectId(userId) : new Types.ObjectId(),
    applicantName: `Parent of ${studentName}`,
    applicantType: "Student",
    studentId: new Types.ObjectId(studentId),
    parentId: Types.ObjectId.isValid(userId) ? new Types.ObjectId(userId) : undefined,
    classId,
    sectionId,
    leaveType,
    reason,
    startDate: start,
    endDate: end,
    totalDays,
    isHalfDay: isHalfDay || false,
    halfDayType,
    attachments,
    status: "Pending",
  });

  logTeacherAction({
    schoolId,
    teacherId: userId || "parent",
    teacherName: userName,
    action: "APPLY_LEAVE",
    oldValue: null,
    newValue: { studentName, leaveType, startDate, endDate, totalDays },
  });

  // Notify class teacher and admin
  const admins = await UserModel.find({
    role: { $in: ["SchoolAdmin", "Principal", "Teacher"] },
    ...(schoolId !== "sch_default" ? { schoolId } : {}),
  }).select("_id role").limit(5).lean() as any;

  for (const admin of admins) {
    await send({
      schoolId,
      senderId: userId,
      recipientId: admin._id,
      recipientRole: (admin as any).role === "Teacher" ? "Teacher" : "SchoolAdmin",
      type: "LEAVE",
      title: "📝 Student Leave Request",
      message: `${studentName}'s parent has applied for ${totalDays} day(s) ${leaveType} leave from ${start.toLocaleDateString("en-IN")}`,
      referenceType: "leave",
      referenceId: leave._id,
    }).catch(() => {});
  }

  return ApiResponse.success(res, 201, "Student leave application submitted successfully", { leave });
});

// ════════════ 11. GET STUDENT LEAVE HISTORY ════════════
export const getStudentLeaveHistory = asyncHandler(async (req: Request, res: Response) => {
  const { studentId } = req.params;

  let query: any = { applicantType: "Student" };
  if (Types.ObjectId.isValid(studentId)) {
    query.studentId = new Types.ObjectId(studentId);
  }

  const history = await LeaveApplicationModel.find(query)
    .sort({ createdAt: -1 })
    .lean()
    .catch(() => []);

  return ApiResponse.success(res, 200, "Student leave history retrieved", {
    history: history.map((l: any) => ({
      id: l._id?.toString(),
      applicantName: l.applicantName,
      leaveType: l.leaveType,
      reason: l.reason,
      startDate: l.startDate,
      endDate: l.endDate,
      totalDays: l.totalDays,
      status: l.status,
      approverName: l.approverName,
      rejectionReason: l.rejectionReason,
      createdAt: l.createdAt,
    })),
    total: history.length,
  });
});
