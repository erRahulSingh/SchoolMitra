import { Router } from "express";
import { authenticate } from "../../middleware/authGuards";
import { requireActiveSchool } from "../../middleware/tenantMiddleware";
import { getHomeworkList } from "./homework.controller";

const router = Router();

// ─── STEP 19: CENTRAL HOMEWORK AUTH & TENANT STATUS GUARDS ───
router.use(authenticate);
router.use(requireActiveSchool);

router.get("/", getHomeworkList);

export default router;
