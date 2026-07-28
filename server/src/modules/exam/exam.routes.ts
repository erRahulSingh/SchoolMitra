import { Router } from "express";
import { getExamSchedules } from "./exam.controller";

const router = Router();

router.get("/schedules", getExamSchedules);

export default router;
