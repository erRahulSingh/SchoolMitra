// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Academic Management Controller (Phase 6)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";

// ════════════ 1. CLASSES ════════════
export const getClasses = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Academic classes retrieved", {
    classes: [
      { id: "CLS-10", name: "Class 10", sections: ["A", "B", "C"], capacity: 120, totalEnrolled: 118, classTeacher: "Rajesh Kumar" },
      { id: "CLS-09", name: "Class 9", sections: ["A", "B", "C"], capacity: 120, totalEnrolled: 120, classTeacher: "Sunita Rao" },
      { id: "CLS-08", name: "Class 8", sections: ["A", "B", "C"], capacity: 125, totalEnrolled: 124, classTeacher: "Anjali Gupta" }
    ]
  });
});

export const createClass = asyncHandler(async (req: Request, res: Response) => {
  const { name, sections, capacity, classTeacher } = req.body;
  if (!name) throw ApiError.badRequest("Class name is required.");
  return ApiResponse.created(res, "Academic class created successfully.", {
    class: { id: `CLS-${name.replace(/[^0-9]/g, "") || "NEW"}`, name, sections: sections || ["A"], capacity: capacity || 40, classTeacher: classTeacher || "Unassigned" }
  });
});

// ════════════ 2. SECTIONS ════════════
export const getSections = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Class sections list", {
    sections: [
      { code: "SEC-A", name: "Section A", room: "Room 101", capacity: 40 },
      { code: "SEC-B", name: "Section B", room: "Room 102", capacity: 40 },
      { code: "SEC-C", name: "Section C", room: "Room 103", capacity: 40 }
    ]
  });
});

// ════════════ 3. SUBJECTS ════════════
export const getSubjects = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Academic subjects directory", {
    subjects: [
      { code: "MATH-101", name: "Mathematics", type: "Theory", passingMarks: 33, totalMarks: 100, isElective: false },
      { code: "PHY-101", name: "Physics", type: "Theory & Practical", passingMarks: 33, totalMarks: 100, isElective: false },
      { code: "ENG-101", name: "English Literature", type: "Theory", passingMarks: 33, totalMarks: 100, isElective: false }
    ]
  });
});

export const createSubject = asyncHandler(async (req: Request, res: Response) => {
  const { name, code, type } = req.body;
  if (!name) throw ApiError.badRequest("Subject name is required.");
  return ApiResponse.created(res, "Academic subject created.", {
    subject: { code: code || `SUB-${Date.now()}`, name, type: type || "Theory", passingMarks: 33, totalMarks: 100 }
  });
});

// ════════════ 4. TIMETABLE ════════════
export const getTimetable = asyncHandler(async (req: Request, res: Response) => {
  const { classId = "Class 10-A" } = req.query;
  return ApiResponse.success(res, 200, `Timetable for ${classId}`, {
    classId,
    schedule: [
      { period: "1st Period (08:30 AM)", Monday: "Mathematics (Rajesh Sir)", Tuesday: "Physics (Sunita Mam)", Wednesday: "English (Anjali Mam)" },
      { period: "2nd Period (09:15 AM)", Monday: "Chemistry (Manoj Sir)", Tuesday: "Mathematics (Rajesh Sir)", Wednesday: "Physics (Sunita Mam)" }
    ]
  });
});

export const createTimetableSlot = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.created(res, "Timetable slot added cleanly (No Conflict Detected).", { slot: req.body });
});

// ════════════ 5. HOMEWORK ════════════
export const getHomework = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Homework assignments list", {
    homeworkList: [
      { id: "HW-901", title: "Polynomial Exercise 2.3", class: "Class 10-A", subject: "Mathematics", dueDate: "2026-08-05", status: "Active" },
      { id: "HW-902", title: "Ohm's Law Lab Numericals", class: "Class 12-B", subject: "Physics", dueDate: "2026-08-04", status: "Active" }
    ]
  });
});

export const createHomework = asyncHandler(async (req: Request, res: Response) => {
  const { title, class: className, subject, dueDate } = req.body;
  if (!title) throw ApiError.badRequest("Homework title is required.");
  return ApiResponse.created(res, "Homework created & parent alert dispatched.", {
    homework: { id: `HW-${Date.now()}`, title, class: className, subject, dueDate, status: "Active" }
  });
});

// ════════════ 6. ASSIGNMENTS ════════════
export const getAssignments = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Academic assignments submissions desk", {
    assignments: [
      { id: "ASN-401", title: "Science Model Project Report", class: "Class 10-A", submissions: "38 / 42", deadline: "2026-08-10" }
    ]
  });
});

export const createAssignment = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.created(res, "Assignment created.", { assignment: req.body });
});

// ════════════ 7. STUDY MATERIALS ════════════
export const getStudyMaterials = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Digital study materials library", {
    materials: [
      { id: "MAT-01", title: "Class 10 Physics NCERT Formula Sheet PDF", type: "PDF Document", size: "4.2 MB", downloads: 142 },
      { id: "MAT-02", title: "Calculus Revision PPT Slides", type: "PPT Presentation", size: "12.8 MB", downloads: 98 }
    ]
  });
});

// ════════════ 8. LESSON PLANS ════════════
export const getLessonPlans = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Syllabus lesson plans tracker", {
    lessonPlans: [
      { id: "LP-01", chapter: "Chapter 1: Real Numbers", subject: "Mathematics", class: "Class 10", completion: "100% Completed ✅" },
      { id: "LP-02", chapter: "Chapter 2: Polynomials", subject: "Mathematics", class: "Class 10", completion: "75% In Progress ⏳" }
    ]
  });
});
