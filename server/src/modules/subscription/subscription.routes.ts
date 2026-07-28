import { Router } from "express";
import { getSubscriptionPlans } from "./subscription.controller";

const router = Router();

router.get("/plans", getSubscriptionPlans);

export default router;
