import { Router } from "express";
import { generateReport } from "./report.controller";

const router = Router();
router.get("/generate", generateReport);
export default router;
