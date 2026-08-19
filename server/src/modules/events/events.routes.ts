// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Events Management Routes (Phase 10)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  publishEvent,
  getUpcomingEvents,
  syncEventsToCalendar
} from "./events.controller";

const router = Router();

// Events CRUD
router.get("/", getEvents);
router.post("/", createEvent);
router.get("/upcoming", getUpcomingEvents);
router.post("/sync-calendar", syncEventsToCalendar);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.patch("/:id/publish", publishEvent);

export default router;
