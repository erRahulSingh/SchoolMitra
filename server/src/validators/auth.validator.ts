// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Auth Endpoint Zod Validators
// ═══════════════════════════════════════════════════════════

import { z } from "zod";
import { PASSWORD_CONFIG } from "../utils/constants";

// ──── Register School & Admin ────
export const registerSchema = z.object({
  schoolName: z
    .string({ required_error: "School name is required" })
    .min(2, "School name must be at least 2 characters")
    .max(100, "School name must be under 100 characters")
    .trim(),

  adminName: z
    .string({ required_error: "Admin name is required" })
    .min(2, "Admin name must be at least 2 characters")
    .max(60, "Admin name must be under 60 characters")
    .trim(),

  email: z
    .string({ required_error: "Email is required" })
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim(),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),

  phone: z
    .string()
    .optional()
    .or(z.literal("")),

  city: z
    .string()
    .max(50, "City name must be under 50 characters")
    .trim()
    .optional()
    .or(z.literal("")),

  plan: z
    .string()
    .optional()
    .default("Basic"),
});

// ──── Login ────
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim(),

  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password cannot be empty"),

  role: z
    .enum([
      "SuperAdmin", "SchoolAdmin", "Principal", "Teacher",
      "Driver", "Parent", "TransportManager", "Accountant",
      "Receptionist", "Security"
    ])
    .optional(),
});

// ──── Send OTP ────
export const sendOtpSchema = z.object({
  phone: z
    .string()
    .regex(/^[+]?[0-9]{10,15}$/, "Phone number must be 10-15 digits")
    .optional(),

  email: z
    .string()
    .email("Please provide a valid email address")
    .optional(),
}).refine(
  (data) => data.phone || data.email,
  { message: "Either phone or email is required to send OTP" }
);

// ──── Verify OTP ────
export const verifyOtpSchema = z.object({
  otpSessionToken: z
    .string({ required_error: "OTP session token is required" })
    .min(1, "OTP session token cannot be empty"),

  otpCode: z
    .string({ required_error: "OTP code is required" })
    .length(4, "OTP code must be exactly 4 digits")
    .regex(/^\d{4}$/, "OTP code must contain only digits"),
});

// ──── Forgot Password ────
export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim(),
});

// ──── Reset Password ────
export const resetPasswordSchema = z.object({
  token: z
    .string({ required_error: "Reset token is required" })
    .min(1, "Reset token cannot be empty"),

  newPassword: z
    .string({ required_error: "New password is required" })
    .min(PASSWORD_CONFIG.MIN_LENGTH, `Password must be at least ${PASSWORD_CONFIG.MIN_LENGTH} characters`)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
    ),
});

// ──── Verify Email ────
export const verifyEmailSchema = z.object({
  token: z
    .string({ required_error: "Verification token is required" })
    .min(1, "Verification token cannot be empty"),
});
