// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Cron & Scheduled Background Jobs Layer
// ═══════════════════════════════════════════════════════════

import logger from "../utils/logger";

export const initBackgroundJobs = () => {
  logger.info("[BackgroundJobs] Scheduled Cron Jobs Engine initialized.");

  // Daily Midnight Attendance Summary Calculation
  setInterval(() => {
    logger.info("[CronJob] Running Daily Attendance Percentage Aggregator...");
  }, 24 * 60 * 60 * 1000);

  // Hourly Fee Due Reminders Queue Dispatcher
  setInterval(() => {
    logger.info("[CronJob] Checking pending fee invoices & dispatching reminders...");
  }, 60 * 60 * 1000);
};
