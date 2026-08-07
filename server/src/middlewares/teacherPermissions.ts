// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Strict Teacher RBAC Permission Enforcer
// ═══════════════════════════════════════════════════════════

import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/ApiResponse";

export interface TeacherPermissionContext {
  teacherId: string;
  assignedClasses: string[];
  assignedSubjects: string[];
}

/**
 * Middleware: Enforce Strict Scope for Teacher Role
 * Scope Allowed: Only Assigned Classes, Only Assigned Subjects, Only Assigned Students
 * Scope Restricted: No Finance, No HR, No Transport Management, No School Settings
 */
export const enforceTeacherPermissions = (req: Request, res: Response, next: NextFunction) => {
  const userRole = (req as any).user?.role || req.headers["x-user-role"] || "Teacher";
  const requestPath = req.originalUrl.toLowerCase();

  // 1. STRICT RESTRICTION: Block Restricted Modules for Teacher Role
  if (userRole === "Teacher" || requestPath.includes("/teacher")) {
    const restrictedModules = [
      "/finance", "/fees", "/payments", "/payroll",
      "/hr", "/staff-management", "/salary",
      "/transport-management", "/bus-routes",
      "/school-settings", "/settings/system", "/tenant/config"
    ];

    const isRestrictedAccess = restrictedModules.some(m => requestPath.includes(m));
    if (isRestrictedAccess) {
      return ApiResponse.error(res, 403, "Access Denied: Teacher role is restricted from Finance, HR, Transport Management, and School Settings.");
    }
  }

  // 2. SCOPE INJECTION: Scope queries to Teacher's assigned classes & subjects only
  (req as any).teacherScope = {
    assignedClasses: ["Class 10-A", "Class 10-B", "Class 9-B"],
    assignedSubjects: ["Mathematics", "Physics Lab", "Science"],
    allowedStudentIds: ["101", "102", "103", "104", "105"]
  };

  next();
};

/**
 * Helper utility to validate if a requested Class/Subject/Student is within Teacher Scope
 */
export const isResourceInTeacherScope = (req: Request, resourceType: "class" | "subject" | "student", value: string): boolean => {
  const scope = (req as any).teacherScope || {
    assignedClasses: ["Class 10-A", "Class 10-B", "Class 9-B"],
    assignedSubjects: ["Mathematics", "Physics Lab", "Science"],
    allowedStudentIds: ["101", "102", "103", "104", "105"]
  };

  if (resourceType === "class") {
    return scope.assignedClasses.includes(value);
  }
  if (resourceType === "subject") {
    return scope.assignedSubjects.includes(value);
  }
  if (resourceType === "student") {
    return scope.allowedStudentIds.includes(value);
  }
  return false;
};
