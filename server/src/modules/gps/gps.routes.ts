import { Router } from "express";
import { authenticate } from "../../middleware/authGuards";
import { requireActiveSchool } from "../../middleware/tenantMiddleware";
import { updateGpsLocation, getLiveMapFleet } from "./gps.controller";

const router = Router();

// ─── STEP 23: CENTRAL GPS AUTH & TENANT STATUS GUARDS ───
router.use(authenticate);
router.use(requireActiveSchool);

router.post("/location-update", updateGpsLocation);
router.get("/live-map", getLiveMapFleet);

export default router;
