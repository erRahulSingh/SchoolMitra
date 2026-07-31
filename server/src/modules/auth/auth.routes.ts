// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Auth Routes (With Validation & Rate Limiting)
// ═══════════════════════════════════════════════════════════

import { Router } from "express";
import {
  loginUserRole,
  getRolesConfig,
  registerSchool,
  refreshAccessToken,
  logoutUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  sendOTP,
  verifyOTP,
} from "./auth.controller";
import { validate } from "../../middleware/validate";
import { authLimiter } from "../../middleware/rateLimiter";
import {
  registerSchema,
  loginSchema,
  sendOtpSchema,
  verifyOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "../../validators/auth.validator";

const router = Router();

// All auth routes get rate limiting
router.use(authLimiter);

// Public auth endpoints with Zod validation
router.post("/register", validate(registerSchema), registerSchool);
router.post("/login", validate(loginSchema), loginUserRole);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);
router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);
router.post("/send-otp", validate(sendOtpSchema), sendOTP);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOTP);
router.get("/roles", getRolesConfig);

export default router;
