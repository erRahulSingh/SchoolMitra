import { Router } from "express";
import { 
  getDashboardOverview, 
  getDashboardCards, 
  getDashboardCharts, 
  getDashboardRecent, 
  getDashboardCalendar,
  getDashboardStats, 
  getPaymentsList, 
  getSupportTickets 
} from "./admin.controller";

const router = Router();

// Phase 3 Dashboard Endpoints
router.get("/dashboard/overview", getDashboardOverview);
router.get("/dashboard/cards", getDashboardCards);
router.get("/dashboard/charts", getDashboardCharts);
router.get("/dashboard/recent", getDashboardRecent);
router.get("/dashboard/activity", getDashboardRecent);
router.get("/dashboard/calendar", getDashboardCalendar);

// Legacy/System Endpoints
router.get("/stats", getDashboardStats);
router.get("/payments", getPaymentsList);
router.get("/support", getSupportTickets);

export default router;
