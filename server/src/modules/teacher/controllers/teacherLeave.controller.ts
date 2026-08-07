import { Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";

export const getTeacherProfile = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Teacher profile dossier retrieved", {
    profile: {
      _id: "tch_65a88203921",
      schoolId: "sch_101",
      userId: "usr_99182",
      employeeId: "TCH-2024-884",
      name: "Anil Dev Sharma",
      phone: "+91 98765 43210",
      email: "anil.sharma@dpsdwarka.edu.in",
      designation: "Senior Educator & Class Teacher 10-A",
      subjects: ["Mathematics", "Physics Lab", "Science"],
      classes: ["Class 10-A", "Class 9-B", "Class 8-A"],
      joiningDate: "2018-07-15",
      qualification: "M.Sc. Mathematics, B.Ed (Delhi University)",
      status: "Active"
    }
  });
});

export const updateTeacherProfile = asyncHandler(async (req: Request, res: Response) => {
  const { phone, email, qualification } = req.body;
  return ApiResponse.success(res, 200, "Teacher profile updated successfully", {
    phone: phone || "+91 98765 43210",
    email: email || "anil.sharma@dpsdwarka.edu.in",
    qualification: qualification || "M.Sc. Mathematics, B.Ed"
  });
});

export const changeTeacherPassword = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Teacher password changed successfully!");
});

export const getTeacherAttendanceHistory = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Teacher punch-in attendance history retrieved", {
    workingDaysThisMonth: 22,
    presentDays: 21,
    absentDays: 0,
    leaveDays: 1,
    punctualityRate: "98.2%"
  });
});

export const applyTeacherLeave = asyncHandler(async (req: Request, res: Response) => {
  const { leaveType = "Casual", startDate, endDate, reason, totalDays = 1 } = req.body;

  if (!reason || !startDate || !endDate) {
    return ApiResponse.error(res, 400, "Start date, end date, and reason are required");
  }

  return ApiResponse.created(res, "Leave application submitted successfully!", {
    leaveApplication: {
      id: `lv_${Date.now()}`,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
      status: "Pending",
      appliedOn: new Date().toISOString()
    }
  });
});

export const getTeacherLeaves = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Teacher leave balance & application history retrieved", {
    leaveBalance: {
      casualLeave: { total: 12, used: 4, remaining: 8 },
      medicalLeave: { total: 10, used: 0, remaining: 10 },
      earnedLeave: { total: 15, used: 2, remaining: 13 }
    },
    applications: [
      { id: "lv_101", leaveType: "Casual", startDate: "2024-05-03", endDate: "2024-05-03", totalDays: 1, reason: "Personal Work", status: "Approved", appliedOn: "2024-05-01" }
    ]
  });
});

export const getTeacherLeaveById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  return ApiResponse.success(res, 200, `Leave application ${id} details retrieved`, {
    application: {
      id: id || "lv_102",
      teacherId: "tch_65a88203921",
      teacherName: "Anil Dev Sharma",
      leaveType: "Medical",
      startDate: "2024-06-10",
      endDate: "2024-06-12",
      totalDays: 3,
      reason: "Fever & Doctor Consultation",
      status: "Pending"
    }
  });
});
