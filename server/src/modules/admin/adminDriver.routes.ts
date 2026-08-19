// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Admin Driver Master Routes (Phase 11.2)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getDrivers,
  createDriver,
  getDriverById,
  updateDriver,
  updateDriverStatus
} from "./adminDriver.controller";

const router = Router();

router.get("/", getDrivers);
router.post("/", createDriver);
router.get("/:id", getDriverById);
router.put("/:id", updateDriver);
router.patch("/:id/status", updateDriverStatus);

export default router;
