// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Parent Management Routes
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getParents,
  createParent,
  getParentById,
  updateParent,
  getParentChildren,
  toggleParentAlerts
} from "./parents.controller";

const router = Router();

router.get("/", getParents);
router.post("/", createParent);
router.get("/:id", getParentById);
router.put("/:id", updateParent);
router.get("/:id/children", getParentChildren);
router.patch("/:id/alerts", toggleParentAlerts);

export default router;
