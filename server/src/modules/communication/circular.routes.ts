import { Router } from "express";
import {
  createCircular,
  getCirculars
} from "./circular.controller";

import { authenticate, requireRole } from "../../middleware/authGuards";

const router = Router();

// Admin endpoints
router.post("/admin/circulars", authenticate, requireRole("SchoolAdmin", "SuperAdmin"), createCircular);
router.get("/admin/circulars", authenticate, requireRole("SchoolAdmin", "SuperAdmin"), getCirculars);

// Parent/General endpoints
router.get("/parents/circulars", getCirculars);
router.get("/circulars", getCirculars);

export default router;
