import { Router } from "express";
import { getEvents, createEvent } from "./events.controller";
import { authenticate, requireRole } from "../../middleware/authGuards";

const router = Router();

router.get("/", getEvents);
router.post("/", authenticate, requireRole("SchoolAdmin", "SuperAdmin"), createEvent);

export default router;
