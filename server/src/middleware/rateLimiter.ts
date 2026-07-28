// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Rate Limiter Middleware
// ═══════════════════════════════════════════════════════════

import rateLimit from "express-rate-limit";
import { RATE_LIMIT } from "../utils/constants";

/**
 * Global API rate limiter — 100 requests per minute per IP.
 */
export const globalLimiter = rateLimit({
  windowMs: RATE_LIMIT.GLOBAL_WINDOW_MS,
  max: RATE_LIMIT.GLOBAL_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: "Too many requests from this IP. Please try again after a minute.",
  },
});

/**
 * Strict auth rate limiter — 10 requests per minute per IP.
 * Protects login, register, OTP, and password reset endpoints.
 */
export const authLimiter = rateLimit({
  windowMs: RATE_LIMIT.AUTH_WINDOW_MS,
  max: RATE_LIMIT.AUTH_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: "Too many authentication attempts. Please try again after a minute.",
  },
});
