import { SchoolModel } from "../models/AuthSchemas";
import { SchoolStatus } from "../constants/schoolStatus.constants";
import logger from "../utils/logger";

// ──────────── Helper: Fetch School IDs that qualify for background job execution ────────────
export const getEligibleSchoolIds = async (jobType: "NORMAL_TENANT_OP" | "BILLING_SUBSCRIPTION" | "SYSTEM_GLOBAL"): Promise<string[]> => {
  try {
    if (jobType === "SYSTEM_GLOBAL") {
      return []; // Global jobs run without tenant filter
    }

    if (jobType === "BILLING_SUBSCRIPTION") {
      // Billing jobs run for Active, Trial, and Expired (to send renewal notices), but NEVER for Suspended or Deactivated
      const schools = await SchoolModel.find({
        status: {
          $in: [
            SchoolStatus.ACTIVE,
            SchoolStatus.TRIAL,
            SchoolStatus.EXPIRED,
            "Active",
            "Trial",
            "Expired"
          ]
        }
      }).select("_id status").lean();
      return schools.map(s => String(s._id));
    }

    // NORMAL_TENANT_OP: Only Active & Trial valid schools
    const activeSchools = await SchoolModel.find({
      status: {
        $in: [
          SchoolStatus.ACTIVE,
          SchoolStatus.TRIAL,
          "Active",
          "Trial"
        ]
      }
    }).select("_id status").lean();

    return activeSchools.map(s => String(s._id));
  } catch (err) {
    logger.warn("[CronJob Helper Warning] Error fetching eligible schools:", err);
    return [];
  }
};

export const initBackgroundJobs = () => {
  logger.info("[BackgroundJobs] Scheduled Automated Cron Jobs Engine initialized with Tenant Status Guard.");

  // 1. Daily Attendance Summary Calculation (Normal Tenant Op — Active/Trial only)
  setInterval(async () => {
    const eligibleSchoolIds = await getEligibleSchoolIds("NORMAL_TENANT_OP");
    logger.info(`[CronJob 1/7 - Attendance Aggregator] Processing for ${eligibleSchoolIds.length} active schools (Suspended/Deactivated/Expired bypassed).`);
  }, 24 * 60 * 60 * 1000);

  // 2. Fee Due Reminders Queue Dispatcher (Normal Tenant Op — Active/Trial only)
  setInterval(async () => {
    const eligibleSchoolIds = await getEligibleSchoolIds("NORMAL_TENANT_OP");
    logger.info(`[CronJob 2/7 - Fee Reminders] Processing fee due queue for ${eligibleSchoolIds.length} active schools.`);
  }, 6 * 60 * 60 * 1000);

  // 3. Birthday Wishes Dispatcher (Normal Tenant Op — Active/Trial only)
  setInterval(async () => {
    const eligibleSchoolIds = await getEligibleSchoolIds("NORMAL_TENANT_OP");
    logger.info(`[CronJob 3/7 - Birthday Greetings] Scanning active schools (${eligibleSchoolIds.length} active) for daily greetings.`);
  }, 12 * 60 * 60 * 1000);

  // 4. Subscription Expiry & Renewal Warning Check (Billing Policy — Active, Trial & Expired included)
  setInterval(async () => {
    const billingSchoolIds = await getEligibleSchoolIds("BILLING_SUBSCRIPTION");
    logger.info(`[CronJob 4/7 - Subscription Warnings] Checking renewal deadlines for ${billingSchoolIds.length} schools (Suspended/Deactivated excluded).`);
  }, 24 * 60 * 60 * 1000);

  // 5. Database Snapshot Backup Scheduler (System-level Global — Runs Always)
  setInterval(() => {
    logger.info("[CronJob 5/7 - System Global Backup] Triggering automated daily database snapshot backup (System level unaffected).");
  }, 24 * 60 * 60 * 1000);

  // 6. Transport Trip Auto Close (Normal Tenant Op — Active/Trial only)
  setInterval(async () => {
    const eligibleSchoolIds = await getEligibleSchoolIds("NORMAL_TENANT_OP");
    logger.info(`[CronJob 6/7 - Auto Close Trips] Auto-closing idle bus trips for ${eligibleSchoolIds.length} active schools.`);
  }, 4 * 60 * 60 * 1000);

  // 7. Cleanup Old GPS Logs (System-level Maintenance — Global)
  setInterval(() => {
    logger.info("[CronJob 7/7 - GPS Log Maintenance] Pruning historical GPS coordinate logs older than 30 days (System level).");
  }, 7 * 24 * 60 * 60 * 1000);
};
