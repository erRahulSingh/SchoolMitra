import { Router } from "express";
import { uploadTeacherDocument, uploadBulkDocuments } from "./upload.controller";
import { enforceTeacherPermissions } from "../../middlewares/teacherPermissions";

const router = Router();

router.use(enforceTeacherPermissions);

router.post("/single", uploadTeacherDocument);
router.post("/bulk", uploadBulkDocuments);
router.post("/", uploadTeacherDocument);

export default router;
