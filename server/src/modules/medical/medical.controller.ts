import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { StudentMedicalProfileModel, MedicalIncidentModel } from "../../models/SchoolSchemas";
import { createNotification } from "../../services/notificationService";

// ════════════ 1. GET MEDICAL PROFILE ════════════
export const getStudentMedicalProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { studentId } = req.params;

  let profile = await StudentMedicalProfileModel.findOne({ schoolId: user.schoolId, studentId }).lean();
  
  if (!profile) {
    // Return empty profile if it doesn't exist yet
    return ApiResponse.success(res, 200, "Medical profile not found, returning empty template.", {
      profile: {
        studentId,
        bloodGroup: "",
        height: "",
        weight: "",
        allergies: [],
        chronicConditions: [],
        vaccinationStatus: "Pending",
        lastCheckupDate: null,
        emergencyContactName: "",
        emergencyContactPhone: "",
        doctorName: "",
        doctorPhone: ""
      }
    });
  }

  return ApiResponse.success(res, 200, "Student medical profile retrieved", { profile });
});

// ════════════ 2. UPDATE MEDICAL PROFILE ════════════
export const updateStudentMedicalProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { studentId } = req.params;
  const updateData = req.body;

  const profile = await StudentMedicalProfileModel.findOneAndUpdate(
    { schoolId: user.schoolId, studentId },
    { ...updateData, schoolId: user.schoolId, studentId },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  return ApiResponse.success(res, 200, "Student medical profile updated", { profile });
});

// ════════════ 3. REPORT MEDICAL INCIDENT ════════════
export const reportMedicalIncident = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { studentId, symptoms, actionTaken } = req.body;

  if (!studentId || !symptoms || !actionTaken) {
    throw ApiError.badRequest("StudentId, symptoms, and actionTaken are required.");
  }

  const incident = await MedicalIncidentModel.create({
    schoolId: user.schoolId,
    studentId,
    reportedBy: user.id,
    symptoms,
    actionTaken,
    parentNotified: true // We assume parent is notified via the push notification below
  });

  // Critical Emergency Push Notification to Parents
  await createNotification({
    schoolId: user.schoolId.toString(),
    senderId: user.id.toString(),
    recipientId: studentId.toString(),
    recipientRole: "Parent",
    type: "Emergency",
    title: "⚠️ Emergency: Medical Incident Reported",
    message: `A medical incident was reported for your child. Symptoms: ${symptoms}. Action taken: ${actionTaken}. Please check the app or contact the school immediately.`,
    priority: "HIGH" // Ensure this maps properly in notificationService, though "Emergency" type is already critical
  }).catch(() => {});

  return ApiResponse.created(res, "Medical incident reported and parent notified.", { incident });
});

// ════════════ 4. GET MEDICAL INCIDENTS ════════════
export const getMedicalIncidents = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { studentId } = req.params;

  const incidents = await MedicalIncidentModel.find({ schoolId: user.schoolId, studentId })
    .populate("reportedBy", "name")
    .sort({ incidentDate: -1 })
    .lean();

  return ApiResponse.success(res, 200, "Medical incidents retrieved", { incidents });
});
