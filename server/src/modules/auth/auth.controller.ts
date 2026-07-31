// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Auth Controller (Production Hardened)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UserModel, SchoolModel, RefreshTokenModel } from "../../models/AuthSchemas";
import { SystemRole, SYSTEM_ROLES_CONFIG } from "./roles.config";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import logger from "../../utils/logger";
import { TOKEN_CONFIG, PASSWORD_CONFIG } from "../../utils/constants";

// ──────────── Password Hashing (Native Node.js Crypto) ────────────
export const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(PASSWORD_CONFIG.SALT_BYTES).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, PASSWORD_CONFIG.ITERATIONS, PASSWORD_CONFIG.KEY_LENGTH, PASSWORD_CONFIG.DIGEST)
    .toString("hex");
  return `${salt}:${hash}`;
};

export const verifyPassword = (password: string, storedHash: string): boolean => {
  try {
    const [salt, hash] = storedHash.split(":");
    if (!salt || !hash) return false;
    const testHash = crypto
      .pbkdf2Sync(password, salt, PASSWORD_CONFIG.ITERATIONS, PASSWORD_CONFIG.KEY_LENGTH, PASSWORD_CONFIG.DIGEST)
      .toString("hex");
    return hash === testHash;
  } catch (err) {
    return false;
  }
};

// ──────────── OTP / Verification Session Store (In-Memory) ────────────
const tempVerificationStore: Record<string, { code: string; expiresAt: number; data?: any }> = {};

// ════════════ 1. REGISTER SCHOOL & ADMIN ════════════
export const registerSchool = asyncHandler(async (req: Request, res: Response) => {
  const { schoolName, city, plan, adminName, email, password, phone } = req.body;

  // Check if user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw ApiError.conflict("An account with this email already exists.");
  }

  // Create School
  const schoolCode =
    schoolName.toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 8) +
    Math.floor(100 + Math.random() * 900);

  const newSchool = await SchoolModel.create({
    code: schoolCode,
    name: schoolName,
    city: city || "Noida",
    plan: plan || "Basic",
    status: "PendingEmailVerification",
  });

  // Create User
  const hashedPassword = hashPassword(password);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  await UserModel.create({
    name: adminName,
    email,
    password: hashedPassword,
    phone: phone || "",
    role: "SchoolAdmin",
    schoolId: newSchool._id,
  });

  // Store verification token
  tempVerificationStore[verificationToken] = {
    code: "EMAIL_VERIFY",
    expiresAt: Date.now() + TOKEN_CONFIG.EMAIL_VERIFY_EXPIRY_MS,
    data: { schoolId: newSchool._id },
  };

  logger.info(`New school registered: ${schoolName} (${schoolCode})`, { email, schoolCode });

  // In production, this would dispatch a real email via SMTP
  logger.info(`[EMAIL DISPATCH] Verification link: http://localhost:3000/verify-email?token=${verificationToken}`);

  return ApiResponse.created(res, "School registered successfully! Please check your email to verify your account.", {
    schoolCode,
  });
});

// ════════════ 2. LOGIN USER & GENERATE TOKENS ════════════
export const loginUserRole = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw ApiError.unauthorized("Invalid email or password.");
  }

  // Verify Password — NO dev bypass
  const isValid = verifyPassword(password, user.password as string);
  if (!isValid) {
    throw ApiError.unauthorized("Invalid email or password.");
  }

  const userRole: SystemRole = (role || user.role || "SchoolAdmin") as SystemRole;
  const roleConfig = SYSTEM_ROLES_CONFIG[userRole] || SYSTEM_ROLES_CONFIG["SchoolAdmin"];

  const accessTokenSecret = process.env.JWT_SECRET;
  const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

  if (!accessTokenSecret || !refreshTokenSecret) {
    throw ApiError.internal("JWT secrets are not configured in environment variables.");
  }

  const payload = {
    id: user._id,
    email: user.email,
    role: userRole,
    schoolId: user.schoolId || undefined,
  };

  // Generate JWT Access Token & Refresh Token
  const accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY,
  });
  const refreshToken = jwt.sign({ id: user._id }, refreshTokenSecret, {
    expiresIn: TOKEN_CONFIG.REFRESH_TOKEN_EXPIRY,
  });

  // Save Refresh Token
  await RefreshTokenModel.create({ userId: user._id, refreshToken });

  logger.info(`User logged in: ${email} as ${userRole}`, { userId: user._id });

  return ApiResponse.success(res, 200, "Authentication successful", {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: userRole,
      portal: roleConfig.portal,
      allowedModulesCount: roleConfig.allowedModules.length,
    },
  });
});

// ════════════ 3. REFRESH TOKEN ACCESS ════════════
export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw ApiError.badRequest("Refresh token is required.");
  }

  // Verify refresh token in DB
  const tokenDoc = await RefreshTokenModel.findOne({ refreshToken });
  if (!tokenDoc) {
    throw ApiError.unauthorized("Invalid or expired refresh token.");
  }

  const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
  if (!refreshTokenSecret) {
    throw ApiError.internal("JWT_REFRESH_SECRET is not configured.");
  }

  const decoded = jwt.verify(refreshToken, refreshTokenSecret) as { id: string };

  const user = await UserModel.findById(decoded.id);
  if (!user) {
    throw ApiError.unauthorized("User associated with this token no longer exists.");
  }

  const accessTokenSecret = process.env.JWT_SECRET;
  if (!accessTokenSecret) {
    throw ApiError.internal("JWT_SECRET is not configured.");
  }

  const accessToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role, schoolId: user.schoolId },
    accessTokenSecret,
    { expiresIn: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY }
  );

  return ApiResponse.success(res, 200, "Access token refreshed", { accessToken });
});

// ════════════ 4. EMAIL VERIFICATION ════════════
export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  const session = tempVerificationStore[token];

  if (!session || session.code !== "EMAIL_VERIFY" || session.expiresAt < Date.now()) {
    throw ApiError.badRequest("Invalid or expired verification token.");
  }

  const { schoolId } = session.data;
  await SchoolModel.findByIdAndUpdate(schoolId, { status: "Active" });

  delete tempVerificationStore[token];

  logger.info(`Email verified for school`, { schoolId });

  return ApiResponse.success(res, 200, "Email successfully verified! Your SchoolMitra account is now active.");
});

// ════════════ 5. FORGOT PASSWORD ════════════
export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw ApiError.notFound("No account found with this email address.");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  tempVerificationStore[resetToken] = {
    code: "PASSWORD_RESET",
    expiresAt: Date.now() + TOKEN_CONFIG.PASSWORD_RESET_EXPIRY_MS,
    data: { userId: user._id },
  };

  logger.info(`[EMAIL DISPATCH] Password reset link for ${email}: http://localhost:3000/reset-password?token=${resetToken}`);

  return ApiResponse.success(res, 200, "Password reset instructions have been sent to your email address.");
});

// ════════════ 6. RESET PASSWORD ════════════
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  const session = tempVerificationStore[token];

  if (!session || session.code !== "PASSWORD_RESET" || session.expiresAt < Date.now()) {
    throw ApiError.badRequest("Invalid or expired password reset token.");
  }

  const { userId } = session.data;
  const hashedPassword = hashPassword(newPassword);
  await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });

  delete tempVerificationStore[token];

  logger.info(`Password reset completed`, { userId });

  return ApiResponse.success(res, 200, "Your password has been successfully updated. You can now log in.");
});

// ════════════ 7. SEND OTP ════════════
export const sendOTP = asyncHandler(async (req: Request, res: Response) => {
  const { phone, email } = req.body;
  const identifier = phone || email;

  const otpCode = Math.floor(
    Math.pow(10, TOKEN_CONFIG.OTP_LENGTH - 1) +
    Math.random() * (Math.pow(10, TOKEN_CONFIG.OTP_LENGTH) - Math.pow(10, TOKEN_CONFIG.OTP_LENGTH - 1))
  ).toString();

  const sessionToken = crypto.randomBytes(16).toString("hex");

  tempVerificationStore[sessionToken] = {
    code: "OTP_VERIFY",
    expiresAt: Date.now() + TOKEN_CONFIG.OTP_EXPIRY_MS,
    data: { identifier, otpCode },
  };

  // In production, this would dispatch a real SMS/Email via Twilio/SendGrid
  logger.info(`[SMS/EMAIL DISPATCH] OTP code for ${identifier}: ${otpCode} (Valid for 5 mins)`);

  return ApiResponse.success(res, 200, "OTP sent successfully!", { otpSessionToken: sessionToken });
});

// ════════════ 8. VERIFY OTP ════════════
export const verifyOTP = asyncHandler(async (req: Request, res: Response) => {
  const { otpSessionToken, otpCode } = req.body;
  const session = tempVerificationStore[otpSessionToken];

  if (!session || session.code !== "OTP_VERIFY" || session.expiresAt < Date.now()) {
    throw ApiError.badRequest("Invalid or expired OTP session.");
  }

  if (session.data.otpCode !== otpCode) {
    throw ApiError.badRequest("Invalid OTP code.");
  }

  delete tempVerificationStore[otpSessionToken];

  return ApiResponse.success(res, 200, "OTP verified successfully!");
});

// ════════════ 9. GET ROLES CONFIG ════════════
export const getRolesConfig = asyncHandler(async (_req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Roles configuration", {
    totalRoles: Object.keys(SYSTEM_ROLES_CONFIG).length,
    roles: SYSTEM_ROLES_CONFIG,
  });
});

// ════════════ 10. LOGOUT USER ════════════
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (refreshToken) {
    await RefreshTokenModel.deleteOne({ refreshToken }).catch(() => null);
  }
  return ApiResponse.success(res, 200, "User logged out successfully and refresh tokens revoked.");
});

