import { Router } from "express";
import { authenticate } from "../../middleware/authGuards";
import { requireActiveSchool } from "../../middleware/tenantMiddleware";
import { getResults } from "./result.controller";

const router = Router();

// ─── STEP 20: CENTRAL RESULTS AUTH & TENANT STATUS GUARDS ───
router.use(authenticate);
router.use(requireActiveSchool);

router.get("/", getResults);
export default router;
