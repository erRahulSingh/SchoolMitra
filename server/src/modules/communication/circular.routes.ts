import { Router } from "express";
import {
  createCircular,
  getCirculars
} from "./circular.controller";

import { adminGuards } from "../../middlewares/auth.middleware";

const router = Router();

// Admin endpoints
router.post("/admin/circulars", adminGuards, createCircular);
router.get("/admin/circulars", adminGuards, getCirculars);

// Parent/General endpoints
router.get("/parents/circulars", getCirculars);
router.get("/circulars", getCirculars);

export default router;
