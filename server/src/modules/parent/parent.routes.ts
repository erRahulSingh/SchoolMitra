import { Router } from "express";
import { getParentProfile } from "./parent.controller";

const router = Router();

router.get("/profile", getParentProfile);

export default router;
