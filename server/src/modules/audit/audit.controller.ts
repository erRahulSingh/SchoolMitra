import { Request, Response } from "express";
import { memoryTeacherAuditLogs } from "../../services/auditLogService";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

export const getTeacherAuditLogs = asyncHandler(async (req: Request, res: Response) => {
  const { teacherId, classId, studentId, action } = req.query;

  let filteredLogs = [...memoryTeacherAuditLogs];

  if (teacherId) {
    filteredLogs = filteredLogs.filter(l => l.teacherId === teacherId);
  }
  if (classId) {
    filteredLogs = filteredLogs.filter(l => l.classId === classId);
  }
  if (studentId) {
    filteredLogs = filteredLogs.filter(l => l.studentId === studentId);
  }
  if (action) {
    filteredLogs = filteredLogs.filter(l => l.action === action);
  }

  return ApiResponse.success(res, 200, "Teacher audit logs retrieved successfully", {
    totalLogs: filteredLogs.length,
    logs: filteredLogs
  });
});

export const getAuditLogs = getTeacherAuditLogs;
