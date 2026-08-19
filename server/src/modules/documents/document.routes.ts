import { Router } from "express";
import {
  getStudentDocuments,
  uploadStudentDocument,
  replaceStudentDocument,
  deleteStudentDocument,
  getTeacherDocuments,
  uploadTeacherDocument,
  replaceTeacherDocument,
  deleteTeacherDocument,
  getExpiringDocumentsAlerts
} from "./document.controller";

const router = Router();

// Expiring Documents Alert Endpoint
router.get("/expiring", getExpiringDocumentsAlerts);

// Student Document Management Endpoints
router.get("/students/:studentId", getStudentDocuments);
router.post("/students/:studentId", uploadStudentDocument);
router.put("/students/doc/:docId", replaceStudentDocument);
router.delete("/students/doc/:docId", deleteStudentDocument);

// Teacher Document Management Endpoints
router.get("/teachers/:teacherId", getTeacherDocuments);
router.post("/teachers/:teacherId", uploadTeacherDocument);
router.put("/teachers/doc/:docId", replaceTeacherDocument);
router.delete("/teachers/doc/:docId", deleteTeacherDocument);

// Aliased Admin Paths Mapping
router.get("/:studentId/documents", getStudentDocuments);
router.post("/:studentId/documents", uploadStudentDocument);
router.delete("/:id", deleteStudentDocument);

export default router;
