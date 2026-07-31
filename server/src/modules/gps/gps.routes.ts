// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — GPS Live Telemetry Routes (Phase 10)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import { updateGpsLocation, getLiveMapFleet } from "./gps.controller";

const router = Router();

router.post("/location-update", updateGpsLocation);
router.get("/live-map", getLiveMapFleet);

export default router;
