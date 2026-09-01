import { Router } from "express";
import { authenticate, requireRole } from "../../middleware/authGuards";
import {
  getStudentMedicalProfile,
  updateStudentMedicalProfile,
  reportMedicalIncident,
  getMedicalIncidents
} from "./medical.controller";

const router = Router();

router.use(authenticate);

// Profile
router.get("/profile/:studentId", getStudentMedicalProfile);
// Only Admin and Parent should update medical profile
router.put("/profile/:studentId", requireRole("SchoolAdmin", "Parent"), updateStudentMedicalProfile);

// Incidents
// Only Admin and Teacher should report an incident
router.post("/incidents", requireRole("SchoolAdmin", "Teacher"), reportMedicalIncident);
router.get("/incidents/:studentId", getMedicalIncidents);

export default router;
