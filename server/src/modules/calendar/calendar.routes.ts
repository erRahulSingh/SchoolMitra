// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — School Calendar & Holidays Routes (Phase 10)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  getSchoolCalendar,
  createSchoolCalendar,
  updateSchoolCalendar,
  getHolidays,
  addHoliday,
  updateHoliday,
  deleteHoliday,
  getMonthlyCalendarView
} from "./calendar.controller";

const router = Router();

// School Calendar CRUD
router.get("/", getSchoolCalendar);
router.post("/", createSchoolCalendar);
router.put("/:id", updateSchoolCalendar);

// Holidays CRUD
router.get("/holidays", getHolidays);
router.post("/holidays", addHoliday);
router.put("/holidays/:id", updateHoliday);
router.delete("/holidays/:id", deleteHoliday);

// Combined Monthly Calendar View (holidays + events + exams)
router.get("/monthly/:year/:month", getMonthlyCalendarView);

export default router;
