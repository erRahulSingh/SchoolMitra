import { Router } from "express";
import { markAttendance, getAttendanceReport } from "./attendance.controller";

const router = Router();

router.post("/mark", markAttendance);
router.get("/report", getAttendanceReport);

export default router;
