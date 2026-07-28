import { Router } from "express";
import { loginUserRole, getRolesConfig } from "./auth.controller";

const router = Router();

router.post("/login", loginUserRole);
router.get("/roles", getRolesConfig);

export default router;
