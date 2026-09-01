// @ts-nocheck
import { Router } from "express";
import { scheduleClass, getUpcomingClasses, joinClass, endClass } from "./live-classes.controller";
import { authenticate, requireRole } from "../../middleware/authenticates";

const router = Router();

// All routes require authentication
router.use(authenticate);

// Teacher routes
router.post("/schedule", requireRole("Teacher", "SchoolAdmin"), scheduleClass);
router.patch("/:liveClassId/end", requireRole("Teacher"), endClass);

// Student/Parent/Teacher shared route
router.get("/upcoming", getUpcomingClasses);

// Student specific route
router.post("/:liveClassId/join", requireRole("Student", "Parent"), joinClass);

export default router;
