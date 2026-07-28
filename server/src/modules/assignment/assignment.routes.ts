import { Router } from "express";
import { getAssignments } from "./assignment.controller";

const router = Router();
router.get("/", getAssignments);
export default router;
