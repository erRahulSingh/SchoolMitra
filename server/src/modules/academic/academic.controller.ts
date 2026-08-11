// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Academic Structure Controller
// Operations to define Academic Years, Classes, Sections & Subjects
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  AcademicYearModel,
  ClassModel,
  SectionModel,
  SubjectModel
} from "../../models/SchoolSchemas";
import mongoose from "mongoose";

// ════════════ 1. GET /api/v1/admin/academic-structure — Full Structure ════════════
export const getAcademicStructure = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  const [academicYears, classes, sections, subjects] = await Promise.all([
    AcademicYearModel.find({ schoolId }).lean(),
    ClassModel.find({ schoolId }).sort({ numericOrder: 1 }).lean(),
    SectionModel.find({ schoolId }).lean(),
    SubjectModel.find({ schoolId }).lean()
  ]);

  return ApiResponse.success(res, 200, "Academic structure retrieved successfully", {
    academicYears,
    classes,
    sections,
    subjects
  });
});

// ════════════ 2. POST /api/v1/admin/academic-structure/seed — Seed Default Structure ════════════
export const seedAcademicStructure = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";

  // Check if already seeded
  const existingYear = await AcademicYearModel.findOne({ schoolId, year: "2026-27" });
  if (existingYear) {
    return ApiResponse.error(res, 409, "Academic structure for 2026-27 already seeded.", "ALREADY_SEEDED");
  }

  // 1. Seed Academic Year
  const academicYear = await AcademicYearModel.create({
    schoolId,
    year: "2026-27",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2027-03-31"),
    isCurrent: true
  });

  // 2. Define Classes and Sections
  const classesData = [
    { name: "Class 6", order: 6, sections: ["A", "B", "C"] },
    { name: "Class 7", order: 7, sections: ["A", "B"] },
    { name: "Class 8", order: 8, sections: ["A", "B"] }
  ];

  const createdClasses = [];
  const createdSections = [];

  for (const c of classesData) {
    const classDoc = await ClassModel.create({
      schoolId,
      className: c.name,
      numericOrder: c.order,
      sections: c.sections,
      academicYearId: academicYear._id
    });
    createdClasses.push(classDoc);

    for (const secName of c.sections) {
      const secDoc = await SectionModel.create({
        schoolId,
        sectionName: secName,
        classId: classDoc._id,
        maxStrength: 40
      });
      createdSections.push(secDoc);
    }
  }

  // 3. Define Subjects
  const subjectsData = [
    "Mathematics",
    "Science",
    "English",
    "Hindi",
    "Social Science",
    "Computer"
  ];

  const createdSubjects = [];

  // Assign subjects to each created class
  for (const classDoc of createdClasses) {
    for (const subName of subjectsData) {
      const subDoc = await SubjectModel.create({
        schoolId,
        subjectName: subName,
        code: subName.substring(0, 4).toUpperCase(),
        classId: classDoc._id,
        type: "Core",
        maxMarks: 100
      });
      createdSubjects.push(subDoc);
    }
  }

  return ApiResponse.created(res, "Academic structure seeded successfully", {
    academicYear,
    classesCount: createdClasses.length,
    sectionsCount: createdSections.length,
    subjectsCount: createdSubjects.length,
    classes: createdClasses,
    sections: createdSections,
    subjects: createdSubjects
  });
});

// ════════════ 3. GET & POST Academic Years ════════════
export const getAcademicYears = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const years = await AcademicYearModel.find({ schoolId }).sort({ startDate: 1 }).lean();
  return ApiResponse.success(res, 200, "Academic years retrieved", { years });
});

export const createAcademicYear = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const { year, startDate, endDate, isCurrent } = req.body;

  if (!year || !startDate || !endDate) {
    return ApiResponse.error(res, 400, "Year, startDate, and endDate are required.", "VALIDATION_ERROR");
  }

  if (isCurrent) {
    // Set all other years to not current
    await AcademicYearModel.updateMany({ schoolId }, { isCurrent: false });
  }

  const newYear = await AcademicYearModel.create({
    schoolId,
    year,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    isCurrent: !!isCurrent
  });

  return ApiResponse.created(res, "Academic year created", { academicYear: newYear });
});

// ════════════ 4. GET & POST Classes ════════════
export const getClasses = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const classes = await ClassModel.find({ schoolId }).sort({ numericOrder: 1 }).lean();
  return ApiResponse.success(res, 200, "Classes retrieved", { classes });
});

export const createClass = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const { className, numericOrder, sections, academicYearId } = req.body;

  if (!className || numericOrder === undefined) {
    return ApiResponse.error(res, 400, "className and numericOrder are required.", "VALIDATION_ERROR");
  }

  const newClass = await ClassModel.create({
    schoolId,
    className,
    numericOrder,
    sections: sections || ["A"],
    academicYearId: academicYearId ? new mongoose.Types.ObjectId(academicYearId) : undefined
  });

  // Automatically create sections
  const createdSections = [];
  const secs = sections || ["A"];
  for (const s of secs) {
    const sec = await SectionModel.create({
      schoolId,
      sectionName: s,
      classId: newClass._id,
      maxStrength: 40
    });
    createdSections.push(sec);
  }

  return ApiResponse.created(res, "Class created", { class: newClass, sections: createdSections });
});

// ════════════ 5. GET & POST Sections ════════════
export const getSections = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const sections = await SectionModel.find({ schoolId }).lean();
  return ApiResponse.success(res, 200, "Sections retrieved", { sections });
});

export const createSection = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const { sectionName, classId, maxStrength } = req.body;

  if (!sectionName || !classId) {
    return ApiResponse.error(res, 400, "sectionName and classId are required.", "VALIDATION_ERROR");
  }

  const newSec = await SectionModel.create({
    schoolId,
    sectionName,
    classId: new mongoose.Types.ObjectId(classId),
    maxStrength: maxStrength || 40
  });

  return ApiResponse.created(res, "Section created", { section: newSec });
});

// ════════════ 6. GET & POST Subjects ════════════
export const getSubjects = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const subjects = await SubjectModel.find({ schoolId }).lean();
  return ApiResponse.success(res, 200, "Subjects retrieved", { subjects });
});

export const createSubject = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user?.schoolId || "sch_default";
  const { subjectName, code, classId, type, maxMarks } = req.body;

  if (!subjectName) {
    return ApiResponse.error(res, 400, "subjectName is required.", "VALIDATION_ERROR");
  }

  const newSub = await SubjectModel.create({
    schoolId,
    subjectName,
    code: code || subjectName.substring(0, 4).toUpperCase(),
    classId: classId ? new mongoose.Types.ObjectId(classId) : undefined,
    type: type || "Core",
    maxMarks: maxMarks || 100
  });

  return ApiResponse.created(res, "Subject created", { subject: newSub });
});
