import { Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";

function emitParentSyncEvent(eventName: string, payload: any) {
  try {
    const io = (global as any).io;
    const now = new Date().toISOString();
    if (io) {
      io.emit("teacher:assignment_published", { eventName: "teacher:assignment_published", ...payload, timestamp: now });
      io.emit("parent:homework_update", { eventName: "parent:homework_update", title: payload.title, body: payload.message, ...payload, timestamp: now });
    }
  } catch (err) {}
}

export const getTeacherAssignments = asyncHandler(async (req: Request, res: Response) => {
  const { classId = "class_8", sectionId = "sec_a" } = req.query;

  return ApiResponse.success(res, 200, "Class project assignments retrieved", {
    classId,
    sectionId,
    totalAssignments: 2,
    assignments: [
      {
        id: "asg_201",
        schoolId: "sch_101",
        teacherId: "tch_65a88203921",
        classId: "class_8",
        sectionId: "sec_a",
        subjectId: "sub_math",
        subjectName: "Mathematics",
        title: "Algebraic Expressions Term Project",
        description: "Prepare a detailed model and formula chart on algebraic identities.",
        maxMarks: 20,
        dueDate: "2024-06-15",
        status: "Active",
        submittedCount: 30,
        totalStudents: 36,
        createdAt: "2024-05-15T09:00:00.000Z"
      }
    ]
  });
});

export const createTeacherAssignment = asyncHandler(async (req: Request, res: Response) => {
  const { classId = "class_8", sectionId = "sec_a", subjectId = "sub_math", title, description, maxMarks = 20, dueDate } = req.body;

  if (!title || !dueDate) {
    return ApiResponse.error(res, 400, "Title and due date are required for project assignment");
  }

  emitParentSyncEvent("PARENT_ASSIGNMENT_CREATED", {
    title: `New Assignment Available: ${title} 📄`,
    message: `New assignment ${title} announced for Class 8 - Section A. Max Marks: ${maxMarks}. Due Date: ${dueDate}.`,
    classId,
    sectionId,
    maxMarks,
    dueDate
  });

  return ApiResponse.created(res, "Assignment created and synced to Parent App in real-time!", {
    assignment: {
      id: `asg_${Date.now()}`,
      schoolId: "sch_101",
      teacherId: "tch_65a88203921",
      classId,
      sectionId,
      subjectId,
      title,
      description: description || "",
      maxMarks,
      dueDate,
      status: "Active",
      syncedToParentApp: true,
      createdAt: new Date().toISOString()
    }
  });
});

export const getTeacherAssignmentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  return ApiResponse.success(res, 200, `Assignment ${id} details retrieved`, {
    assignment: {
      id: id || "asg_201",
      schoolId: "sch_101",
      teacherId: "tch_65a88203921",
      classId: "class_8",
      className: "Class 8 - Section A",
      subjectId: "sub_math",
      subjectName: "Mathematics",
      title: "Algebraic Expressions Term Project",
      description: "Prepare a detailed model and formula chart on algebraic identities.",
      maxMarks: 20,
      dueDate: "2024-06-15",
      status: "Active",
      submissionStats: { total: 36, submitted: 30, graded: 22, pending: 6 }
    }
  });
});

export const updateTeacherAssignmentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, maxMarks, dueDate } = req.body;

  return ApiResponse.success(res, 200, `Assignment ${id} updated successfully!`, {
    assignment: {
      id,
      title: title || "Updated Assignment Title",
      description: description || "Updated details",
      maxMarks: maxMarks || 20,
      dueDate: dueDate || "2024-06-18",
      updatedAt: new Date().toISOString()
    }
  });
});

export const deleteTeacherAssignmentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  return ApiResponse.success(res, 200, `Assignment ${id} deleted successfully.`);
});

export const getAssignmentSubmissions = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  return ApiResponse.success(res, 200, `Student submissions for assignment ${id} retrieved`, {
    assignmentId: id || "asg_201",
    assignmentTitle: "Algebraic Expressions Term Project",
    maxMarks: 20,
    totalSubmissions: 4,
    submissions: [
      {
        submissionId: "sub_1",
        studentId: "st_101",
        studentRollNo: "01",
        studentName: "Aarav Sharma",
        submittedAt: "2024-05-22T14:30:00.000Z",
        fileUrl: "https://schoolmitra.s3.amazonaws.com/submissions/Aarav_Algebra_Project.pdf",
        fileName: "Aarav_Algebra_Project.pdf",
        marksObtained: 19,
        feedback: "Excellent presentation!",
        status: "Graded"
      }
    ]
  });
});
