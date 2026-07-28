import { Router } from "express";
import { resolveWorkspace, seedPlans, updateTenantSubscription } from "./tenant.controller";

const router = Router();

// Public Workspace resolution
router.get("/resolve", resolveWorkspace);

// Admin-facing multi-tenant managers
router.post("/seed-plans", seedPlans);
router.post("/update-subscription", updateTenantSubscription);

export default router;
