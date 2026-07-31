// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Auth Service (Business Logic Engine)
// ═══════════════════════════════════════════════════════════

import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UserModel, SchoolModel, RefreshTokenModel } from "../../models/AuthSchemas";
import { SystemRole, SYSTEM_ROLES_CONFIG } from "./roles.config";
import { ApiError } from "../../utils/ApiError";
import { TOKEN_CONFIG, PASSWORD_CONFIG } from "../../utils/constants";
import { redisCache } from "../../config/redis";
import logger from "../../utils/logger";

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

export class AuthService {
  static async registerSchool(data: {
    schoolName: string;
    city?: string;
    plan?: string;
    adminName: string;
    email: string;
    password: string;
    phone?: string;
  }) {
    const existingUser = await UserModel.findOne({ email: data.email });
    if (existingUser) {
      throw ApiError.conflict("An account with this email already exists.");
    }

    const schoolCode =
      data.schoolName.toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 8) +
      Math.floor(100 + Math.random() * 900);

    const newSchool = await SchoolModel.create({
      code: schoolCode,
      name: data.schoolName,
      city: data.city || "Noida",
      plan: data.plan || "Basic",
      status: "Active",
    });

    const hashedPassword = hashPassword(data.password);

    const user = await UserModel.create({
      name: data.adminName,
      email: data.email,
      password: hashedPassword,
      phone: data.phone || "",
      role: "SchoolAdmin",
      schoolId: newSchool._id,
    });

    logger.info(`Registered new School & Admin: ${data.schoolName} (${schoolCode})`, { userId: user._id });

    return { school: newSchool, user };
  }

  static async loginUser(data: { email: string; password: string; role?: string }) {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      throw ApiError.unauthorized("Invalid email or password.");
    }

    const isValid = verifyPassword(data.password, user.password as string);
    if (!isValid) {
      throw ApiError.unauthorized("Invalid email or password.");
    }

    const userRole: SystemRole = (data.role || user.role || "SchoolAdmin") as SystemRole;
    const roleConfig = SYSTEM_ROLES_CONFIG[userRole] || SYSTEM_ROLES_CONFIG["SchoolAdmin"];

    const accessTokenSecret = process.env.JWT_SECRET || "default_jwt_secret_schoolmitra_2026";
    const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || "default_refresh_secret_schoolmitra_2026";

    const payload = {
      id: user._id,
      email: user.email,
      role: userRole,
      schoolId: user.schoolId || undefined,
    };

    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jwt.sign({ id: user._id }, refreshTokenSecret, {
      expiresIn: TOKEN_CONFIG.REFRESH_TOKEN_EXPIRY,
    });

    await RefreshTokenModel.create({ userId: user._id, refreshToken });

    return {
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
    };
  }

  static async refreshTokens(refreshToken: string) {
    const tokenDoc = await RefreshTokenModel.findOne({ refreshToken });
    if (!tokenDoc) {
      throw ApiError.unauthorized("Invalid or expired refresh token.");
    }

    const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || "default_refresh_secret_schoolmitra_2026";
    const decoded = jwt.verify(refreshToken, refreshTokenSecret) as { id: string };

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      throw ApiError.unauthorized("User associated with token no longer exists.");
    }

    const accessTokenSecret = process.env.JWT_SECRET || "default_jwt_secret_schoolmitra_2026";
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role, schoolId: user.schoolId },
      accessTokenSecret,
      { expiresIn: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY }
    );

    return { accessToken };
  }
}
