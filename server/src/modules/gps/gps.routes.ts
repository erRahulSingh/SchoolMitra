import { Router } from "express";
import { getLiveGpsTelemetry } from "./gps.controller";

const router = Router();
router.get("/telemetry", getLiveGpsTelemetry);
export default router;
