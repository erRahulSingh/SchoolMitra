import { Router } from "express";
import { getOverviewAnalytics } from "./analytics.controller";

const router = Router();

router.get("/overview", getOverviewAnalytics);

export default router;
