import { Router } from "express";
import { getTeacherAuditLogs } from "./audit.controller";
import { enforceTeacherPermissions } from "../../middlewares/teacherPermissions";

const router = Router();

router.use(enforceTeacherPermissions);

router.get("/teacher", getTeacherAuditLogs);
router.get("/", getTeacherAuditLogs);

export default router;
