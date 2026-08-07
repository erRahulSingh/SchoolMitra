// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — API Request Payload Validation Middleware
// Prevents invalid, malformed, or malicious data from reaching MongoDB
// ═══════════════════════════════════════════════════════════

import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/ApiResponse";

/**
 * Validates required fields in request body, params, or query
 */
export const validatePayload = (requiredFields: string[], source: "body" | "query" | "params" = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dataSource = req[source];

    if (!dataSource || typeof dataSource !== "object") {
      return ApiResponse.error(res, 400, `Bad Request: Missing or invalid request ${source} payload.`);
    }

    const missingFields: string[] = [];

    for (const field of requiredFields) {
      if (dataSource[field] === undefined || dataSource[field] === null || dataSource[field] === "") {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return ApiResponse.error(
        res,
        422,
        `Validation Error: The following required fields are missing or empty: ${missingFields.join(", ")}`
      );
    }

    next();
  };
};

/**
 * Attendance Schema Validator
 */
export const validateAttendancePayload = (req: Request, res: Response, next: NextFunction) => {
  const { classId, attendance } = req.body;

  if (!classId) {
    return ApiResponse.error(res, 422, "Validation Error: 'classId' is required for marking attendance.");
  }

  if (!attendance || !Array.isArray(attendance) || attendance.length === 0) {
    return ApiResponse.error(res, 422, "Validation Error: 'attendance' array with student items is required.");
  }

  for (const item of attendance) {
    if (!item.studentId || !item.status) {
      return ApiResponse.error(res, 422, "Validation Error: Each item in attendance must have 'studentId' and 'status'.");
    }
    if (!["Present", "Absent", "Leave", "Late"].includes(item.status)) {
      return ApiResponse.error(res, 422, `Validation Error: Invalid status '${item.status}'. Must be Present, Absent, Leave, or Late.`);
    }
  }

  next();
};

/**
 * Marks Entry Schema Validator
 */
export const validateMarksPayload = (req: Request, res: Response, next: NextFunction) => {
  const { marksRoster } = req.body;

  if (!marksRoster || !Array.isArray(marksRoster) || marksRoster.length === 0) {
    return ApiResponse.error(res, 422, "Validation Error: 'marksRoster' array is required.");
  }

  for (const item of marksRoster) {
    if (item.obtainedMarks < 0 || (item.maximumMarks && item.obtainedMarks > item.maximumMarks)) {
      return ApiResponse.error(res, 422, `Validation Error: Invalid obtainedMarks (${item.obtainedMarks}) for student '${item.studentId}'.`);
    }
  }

  next();
};
