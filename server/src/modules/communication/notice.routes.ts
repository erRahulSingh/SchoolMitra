import { Router } from "express";
import { createNotice, getNotices } from "./notice.controller";
import { authenticate, requireRole } from "../../middleware/authGuards";

const router = Router();

router.post("/notices", authenticate, requireRole("SchoolAdmin", "SuperAdmin"), createNotice);
router.get("/notices", getNotices);

export default router;
