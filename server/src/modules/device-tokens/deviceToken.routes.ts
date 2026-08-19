// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Device Token Routes
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import { registerDeviceToken } from "../notifications/notifications.controller";

const router = Router();

router.post("/", registerDeviceToken);
router.post("/device-token", registerDeviceToken);

export default router;
