// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Circulars & Notices Routes (Phase 10)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  createCircular,
  getAdminCirculars,
  getParentCirculars,
  getCircularById,
  markCircularAsRead,
  updateCircular,
  deleteCircular,
  publishCircularHandler
} from "./circular.controller";

const router = Router();

// Admin endpoints
router.post("/admin/circulars", createCircular);
router.get("/admin/circulars", getAdminCirculars);
router.put("/admin/circulars/:id", updateCircular);
router.delete("/admin/circulars/:id", deleteCircular);
router.post("/admin/circulars/:id/publish", publishCircularHandler);

// Direct admin path aliases
router.post("/circulars", createCircular);
router.get("/circulars", getAdminCirculars);
router.put("/circulars/:id", updateCircular);
router.delete("/circulars/:id", deleteCircular);
router.post("/circulars/:id/publish", publishCircularHandler);

// Parent endpoints
router.get("/parents/circulars", getParentCirculars);
router.get("/parents/circulars/:id", getCircularById);
router.patch("/parents/circulars/:id/read", markCircularAsRead);

// Direct detail endpoint
router.get("/circulars/:id", getCircularById);

export default router;
