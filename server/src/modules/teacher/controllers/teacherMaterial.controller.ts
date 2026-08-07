import { Request, Response } from "express";
import { ApiResponse } from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asyncHandler";

function emitParentSyncEvent(eventName: string, payload: any) {
  try {
    const io = (global as any).io;
    const now = new Date().toISOString();
    if (io) {
      io.emit("teacher:announcement_created", { eventName: "teacher:announcement_created", ...payload, timestamp: now });
      io.emit("parent:notification_update", { eventName: "parent:notification_update", title: payload.title, body: payload.message, ...payload, timestamp: now });
    }
  } catch (err) {}
}

export const getTeacherMaterials = asyncHandler(async (req: Request, res: Response) => {
  const { classId = "class_8", sectionId = "sec_a" } = req.query;

  return ApiResponse.success(res, 200, "Study material library retrieved", {
    classId,
    sectionId,
    totalMaterials: 3,
    materials: [
      {
        id: "mat_301",
        schoolId: "sch_101",
        teacherId: "tch_65a88203921",
        classId: "class_8",
        sectionId: "sec_a",
        subjectId: "sub_math",
        subjectName: "Mathematics",
        title: "Linear Equations Quick Formula & Mind Map",
        description: "Chapter 3 summary chart with key algebraic identities and shortcuts.",
        fileType: "PDF",
        fileUrl: "https://schoolmitra.s3.amazonaws.com/study-material/Math_Mindmap.pdf",
        fileName: "Math_Mindmap.pdf",
        fileSize: "3.2 MB",
        downloadsCount: 142,
        uploadedAt: "2024-05-18T10:00:00.000Z"
      }
    ]
  });
});

export const uploadTeacherMaterial = asyncHandler(async (req: Request, res: Response) => {
  const { classId = "class_8", sectionId = "sec_a", subjectId = "sub_math", title, description, fileType = "PDF", fileUrl, fileName, fileSize = "2.5 MB" } = req.body;

  if (!title || !fileUrl) {
    return ApiResponse.error(res, 400, "Title and file URL/Video URL are required for study material");
  }

  emitParentSyncEvent("PARENT_MATERIAL_UPLOADED", {
    title: `New Study Material Shared: ${title} 📚`,
    message: `New ${fileType} study material "${title}" uploaded for Class 8 - Section A. Check student portal to view/download.`,
    classId,
    sectionId,
    fileType,
    fileUrl
  });

  return ApiResponse.created(res, "Study material metadata uploaded and synced to Parent App!", {
    material: {
      id: `mat_${Date.now()}`,
      schoolId: "sch_101",
      teacherId: "tch_65a88203921",
      classId,
      sectionId,
      subjectId,
      title,
      description: description || "",
      fileType,
      fileUrl,
      fileName: fileName || title,
      fileSize,
      downloadsCount: 0,
      syncedToParentApp: true,
      uploadedAt: new Date().toISOString()
    }
  });
});

export const getTeacherMaterialById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  return ApiResponse.success(res, 200, `Study material ${id} details retrieved`, {
    material: {
      id: id || "mat_301",
      title: "Linear Equations Quick Formula & Mind Map",
      fileType: "PDF",
      fileUrl: "https://schoolmitra.s3.amazonaws.com/study-material/Math_Mindmap.pdf",
      downloadsCount: 142
    }
  });
});

export const updateTeacherMaterialById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, fileType, fileUrl } = req.body;

  return ApiResponse.success(res, 200, `Study material ${id} updated successfully!`, {
    material: { id, title, fileType, fileUrl, updatedAt: new Date().toISOString() }
  });
});

export const deleteTeacherMaterialById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  return ApiResponse.success(res, 200, `Study material ${id} deleted successfully.`);
});
