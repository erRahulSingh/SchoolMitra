import { Router } from "express";
import { getParentProfile } from "./parents.controller";

const router = Router();

router.get("/profile", getParentProfile);

export default router;
