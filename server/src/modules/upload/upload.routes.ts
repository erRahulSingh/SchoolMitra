import { Router } from "express";
import { authenticate } from "../../middleware/authGuards";
import { requireActiveSchool } from "../../middleware/tenantMiddleware";
import { uploadTeacherDocument, uploadBulkDocuments } from "./upload.controller";
import { enforceTeacherPermissions } from "../../middlewares/teacherPermissions";

const router = Router();

// ─── STEP 24: CENTRAL UPLOAD AUTH & TENANT STATUS GUARDS ───
router.use(authenticate);
router.use(requireActiveSchool);
router.use(enforceTeacherPermissions);

router.post("/single", uploadTeacherDocument);
router.post("/bulk", uploadBulkDocuments);
router.post("/", uploadTeacherDocument);

export default router;
