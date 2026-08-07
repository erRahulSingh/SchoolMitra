// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — API Rate Limiter & Abuse Protection Middleware
// Prevents DDoS, brute-force & spam attacks across Teacher APIs
// ═══════════════════════════════════════════════════════════

import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/ApiResponse";

interface RateLimitStore {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitStore>();

/**
 * Custom Rate Limiter Middleware Factory
 * @param maxRequests Maximum allowed requests per window
 * @param windowMs Time window in milliseconds (default 1 minute)
 * @param message Custom rate limit exceeded message
 */
export const createRateLimiter = (maxRequests: number, windowMs: number = 60000, message: string = "Too many requests. Please try again later.") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";
    const key = `${req.originalUrl.split("?")[0]}_${ip}`;
    const now = Date.now();

    const record = rateLimitMap.get(key);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return next();
    }

    if (record.count >= maxRequests) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader("Retry-After", retryAfterSeconds);
      return ApiResponse.error(res, 429, `${message} (Retry after ${retryAfterSeconds} seconds)`);
    }

    record.count += 1;
    next();
  };
};

// Specialized Pre-Configured Rate Limiters for Teacher App APIs:
export const authRateLimiter = createRateLimiter(5, 60000, "Too many login/OTP attempts. Rate limit exceeded.");
export const fileUploadRateLimiter = createRateLimiter(10, 60000, "File upload rate limit exceeded.");
export const attendanceRateLimiter = createRateLimiter(30, 60000, "Attendance submission rate limit exceeded.");
export const messageRateLimiter = createRateLimiter(20, 60000, "Parent messaging rate limit exceeded.");
export const generalApiRateLimiter = createRateLimiter(100, 60000, "General API rate limit exceeded.");
