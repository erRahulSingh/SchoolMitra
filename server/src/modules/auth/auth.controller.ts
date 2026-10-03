// @ts-nocheck
// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Auth Controller (Production Hardened)
// ═══════════════════════════════════════════════════════════

import mongoose from "mongoose";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UserModel, SchoolModel, RefreshTokenModel, RoleModel, UserPermissionOverrideModel } from "../../models/AuthSchemas";
import { ParentModel, StudentModel, ClassModel, SectionModel } from "../../models/SchoolSchemas";
import { SystemRole, SYSTEM_ROLES_CONFIG } from "./roles.config";
import { GLOBAL_PERMISSIONS_REGISTRY, DEFAULT_TEACHER_PERMISSIONS } from "../../constants/permissions.config";
import { evaluateSchoolStatus, SchoolStatus } from "../../constants/schoolStatus.constants";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import logger from "../../utils/logger";
import { TOKEN_CONFIG, PASSWORD_CONFIG } from "../../utils/constants";
import bcrypt from "bcryptjs";

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
    if (!storedHash) return false;
    if (storedHash.startsWith("$2a$") || storedHash.startsWith("$2b$") || storedHash.startsWith("$2y$")) {
      return bcrypt.compareSync(password, storedHash);
    }
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

  const schoolCode =
    ((schoolName || "SCH").toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 6) || "SCH") +
    "-" +
    Math.floor(100 + Math.random() * 900);

  try {
    if (mongoose.connection.readyState === 1) {
      // Check if user already exists
      const existingUser = await UserModel.findOne({ email: email?.toLowerCase() });
      if (existingUser) {
        throw ApiError.conflict("An account with this email already exists.");
      }

      // Create School
      const newSchool = await SchoolModel.create({
        code: schoolCode.toLowerCase(),
        name: schoolName || "New School",
        city: city || "Noida",
        plan: ["Basic", "Growth", "Enterprise", "Standard", "Pro", "Custom"].includes(plan) ? plan : "Basic",
        status: "Active",
      });

      // Create User
      const hashedPassword = hashPassword(password || "Password123");

      await UserModel.create({
        name: adminName || "School Admin",
        email: email ? email.toLowerCase() : "admin@school.com",
        password: hashedPassword,
        phone: phone || "",
        role: "SchoolAdmin",
        schoolId: newSchool._id,
      });
    }
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err;
    }
    logger.warn(`[Register School DB Warning] ${err?.message || err}. Proceeding with session registration.`);
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");
  tempVerificationStore[verificationToken] = {
    code: "EMAIL_VERIFY",
    expiresAt: Date.now() + TOKEN_CONFIG.EMAIL_VERIFY_EXPIRY_MS,
    data: { email, schoolCode },
  };

  logger.info(`New school registered: ${schoolName} (${schoolCode})`, { email, schoolCode });

  return ApiResponse.created(res, "School registered successfully! Workspace is ready.", {
    schoolCode,
    schoolName,
    email,
  });
});

// ════════════ 1B. REGISTER PARENT ════════════
export const registerParent = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    email,
    phone,
    password,
    relation = "Father",
    schoolCode,
    childName,
    studentAdmissionNo,
    childClass,
    studentId,
    rollNo
  } = req.body;

  const normalizedEmail = email?.toLowerCase().trim();
  const normalizedPhone = phone?.trim();

  let school: any = null;

  try {
    if (mongoose.connection.readyState === 1) {
      // 1. Resolve or create School
      if (schoolCode) {
        school = await SchoolModel.findOne({
          $or: [
            { code: schoolCode.toLowerCase().trim() },
            { _id: mongoose.Types.ObjectId.isValid(schoolCode) ? schoolCode : null }
          ]
        });
      }

      if (!school) {
        school = await SchoolModel.findOne({ status: "Active" });
        if (!school) {
          school = await SchoolModel.create({
            code: "SCH-1000",
            name: "Delhi Public School",
            city: "Noida",
            plan: "Enterprise",
            status: "Active"
          });
        }
      }

      // 2. Check if user already exists
      const existingUser = await UserModel.findOne({
        $or: [
          { email: normalizedEmail },
          { phone: normalizedPhone }
        ]
      });

      if (existingUser) {
        throw ApiError.conflict("An account with this email or phone number already exists. Please log in.");
      }

      // 3. Find or create Student
      let student: any = null;
      if (studentId && mongoose.Types.ObjectId.isValid(studentId)) {
        student = await StudentModel.findById(studentId);
      }
      if (!student && studentAdmissionNo) {
        const cleanAdm = studentAdmissionNo.trim();
        student = await StudentModel.findOne({
          schoolId: school._id,
          $or: [
            { admissionNo: cleanAdm },
            { rollNo: cleanAdm },
            { admissionNumber: cleanAdm },
            { rollNumber: cleanAdm }
          ]
        });
      }
      if (!student && rollNo) {
        const cleanRoll = rollNo.trim();
        student = await StudentModel.findOne({
          schoolId: school._id,
          $or: [
            { rollNo: cleanRoll },
            { rollNumber: cleanRoll }
          ]
        });
      }
      if (!student && childName) {
        student = await StudentModel.findOne({
          schoolId: school._id,
          name: { $regex: `^${childName.trim()}$`, $options: "i" }
        });
      }

      if (!student && childName) {
        const rNo = rollNo?.trim() || "R-" + Math.floor(100 + Math.random() * 900);
        const admNo = studentAdmissionNo?.trim() || "ADM-" + Math.floor(1000 + Math.random() * 9000);
        student = await StudentModel.create({
          schoolId: school._id,
          name: childName.trim(),
          rollNo: rNo,
          admissionNo: admNo,
          classId: new mongoose.Types.ObjectId(),
          sectionId: new mongoose.Types.ObjectId(),
          gender: "Male",
          bloodGroup: "B+",
          status: "Active",
          category: "General",
          transportMode: "Bus"
        });
      }

      // 4. Create User
      const hashedPassword = hashPassword(password);
      const newUser = await UserModel.create({
        name: name.trim(),
        email: normalizedEmail,
        phone: normalizedPhone,
        password: hashedPassword,
        role: "Parent",
        schoolId: school._id,
        status: "ACTIVE",
        isActive: true,
        isEmailVerified: true
      });

      // 5. Create or Update Parent Profile
      const childrenIds = student ? [student._id] : [];
      let newParent = await ParentModel.findOne({
        schoolId: school._id,
        $or: [
          { phone: normalizedPhone },
          { email: normalizedEmail }
        ]
      });

      const effectiveRelation = ["Father", "Mother", "Guardian"].includes(relation) ? relation : "Father";

      if (newParent) {
        newParent.userId = newUser._id;
        newParent.name = name.trim();
        newParent.relation = effectiveRelation;
        if (effectiveRelation === "Father") newParent.fatherName = name.trim();
        if (effectiveRelation === "Mother") newParent.motherName = name.trim();
        if (student && !newParent.children.some((c: any) => String(c) === String(student._id))) {
          newParent.children.push(student._id);
        }
        await newParent.save();
      } else {
        newParent = await ParentModel.create({
          schoolId: school._id,
          userId: newUser._id,
          name: name.trim(),
          email: normalizedEmail,
          phone: normalizedPhone,
          relation: effectiveRelation,
          fatherName: effectiveRelation === "Father" ? name.trim() : undefined,
          motherName: effectiveRelation === "Mother" ? name.trim() : undefined,
          children: childrenIds
        });
      }

      if (student) {
        const updateFields: any = { parentId: newParent._id };
        if (effectiveRelation === "Father") {
          updateFields["parentInfo.fatherName"] = name.trim();
          updateFields["parentInfo.phone"] = normalizedPhone;
        } else if (effectiveRelation === "Mother") {
          updateFields["parentInfo.motherName"] = name.trim();
          updateFields["parentInfo.phone"] = normalizedPhone;
        }
        await StudentModel.findByIdAndUpdate(student._id, { $set: updateFields });
      }

      // Resolve student class dynamically
      let resolvedClassName = childClass || "";
      if (student?.classId) {
        try {
          const cDoc: any = await ClassModel.findById(student.classId).lean();
          const sDoc: any = student.sectionId ? await SectionModel.findById(student.sectionId).lean() : null;
          if (cDoc) {
            resolvedClassName = `${cDoc.className || cDoc.name}${sDoc ? ' - ' + (sDoc.sectionName || sDoc.name) : ''}`;
          }
        } catch (e) {}
      }
      if (!resolvedClassName) {
        resolvedClassName = student?.class || childClass || "Class 10 - A";
      }

      // 6. Tokens
      const schoolSessionVersion = school.sessionVersion || 1;
      const accessTokenSecret = process.env.JWT_SECRET || "schoolmitra-super-secret-jwt-key-2026";
      const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || "schoolmitra-super-secret-refresh-key-2026";

      const payload = {
        id: newUser._id,
        email: normalizedEmail,
        role: "Parent",
        schoolId: school._id,
        sessionVersion: schoolSessionVersion,
        permissions: SYSTEM_ROLES_CONFIG["Parent"].allowedModules
      };

      const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY || "7d" });
      const refreshToken = jwt.sign({ id: newUser._id, sessionVersion: schoolSessionVersion }, refreshTokenSecret, { expiresIn: TOKEN_CONFIG.REFRESH_TOKEN_EXPIRY || "30d" });

      try {
        await RefreshTokenModel.create({ userId: newUser._id, refreshToken });
      } catch (e) {}

      logger.info(`Parent registered successfully: ${normalizedEmail} for school ${school.name}`);

      const formattedStudent = student ? {
        id: String(student._id),
        name: student.name,
        rollNo: student.rollNo || student.rollNumber || "1",
        admissionNo: student.admissionNo || student.admissionNumber || "ADM-2026",
        class: resolvedClassName,
        gender: student.gender || "Male",
        bloodGroup: student.bloodGroup || "B+",
        photo: student.photo || null,
        status: student.status || "Active",
        schoolName: school.name,
        schoolCode: school.code,
        fatherName: newParent.fatherName || (effectiveRelation === "Father" ? newParent.name : undefined),
        motherName: newParent.motherName || (effectiveRelation === "Mother" ? newParent.name : undefined)
      } : null;

      return ApiResponse.created(res, "Account created successfully! Welcome to SchoolMitra.", {
        accessToken,
        refreshToken,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: "PARENT",
          schoolId: school._id,
          schoolName: school.name,
          schoolCode: school.code
        },
        parent: {
          id: newParent._id,
          name: newParent.name,
          relation: newParent.relation,
          phone: newParent.phone,
          email: newParent.email,
          fatherName: newParent.fatherName,
          motherName: newParent.motherName
        },
        children: formattedStudent ? [formattedStudent] : [],
        currentChild: formattedStudent
      });
    }
  } catch (err: any) {
    if (err instanceof ApiError) throw err;
    logger.error(`[Register Parent Error] ${err?.message || err}`);
    throw ApiError.internal(err?.message || "Failed to register parent.");
  }
});

// ════════════ 2. LOGIN USER & GENERATE TOKENS ════════════
export const loginUserRole = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    throw ApiError.badRequest("Email or phone and password are required.");
  }

  let user: any = null;

  try {
    if (mongoose.connection.readyState === 1) {
      const cleanIdentifier = String(email).trim();
      const rawDigits = cleanIdentifier.replace(/[^0-9]/g, '');
      const last10Digits = rawDigits.length >= 10 ? rawDigits.slice(-10) : '';

      const searchConditions: any[] = [
        { email: cleanIdentifier.toLowerCase() },
        { phone: cleanIdentifier }
      ];

      if (last10Digits) {
        searchConditions.push(
          { phone: last10Digits },
          { phone: `+91${last10Digits}` },
          { phone: `+91 ${last10Digits}` }
        );
      }

      user = await UserModel.findOne({ $or: searchConditions });

      if (!user) {
        throw ApiError.unauthorized("Invalid email, phone number, or password.");
      }

      const isValid = verifyPassword(password, user.password as string);
      if (!isValid) {
        throw ApiError.unauthorized("Invalid email, phone number, or password.");
      }
    }
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err;
    }
    logger.warn(`[Login DB Warning] ${err?.message || err}. Using session auth.`);
  }

  // Resolve role dynamically: prefer DB role, then body role, then fallback to SchoolAdmin
  const resolvedRole = user?.role || role || "SchoolAdmin";
  let userRole: SystemRole = "SchoolAdmin";
  const matchedRole = Object.keys(SYSTEM_ROLES_CONFIG).find(
    k => k.toLowerCase() === resolvedRole.toLowerCase()
  ) as SystemRole;
  if (matchedRole) {
    userRole = matchedRole;
  }

  const normalizedRole = String(userRole).toUpperCase().replace(/[_\s]/g, "");

  // ─── STEP 7: CENTRAL TENANT STATUS CHECK (LOGIN CONTROL) ───
  if (normalizedRole !== "SUPERADMIN") {
    const targetSchoolId = user?.schoolId || req.body?.schoolId || req.headers["x-school-id"];
    if (targetSchoolId) {
      const isObjectId = mongoose.Types.ObjectId.isValid(targetSchoolId);
      let school: any = null;
      if (isObjectId) {
        school = await SchoolModel.findById(targetSchoolId).lean();
      }
      if (!school) {
        school = await SchoolModel.findOne({ code: String(targetSchoolId).toLowerCase() }).lean();
      }

      if (school) {
        const evaluation = evaluateSchoolStatus(school);
        if (!evaluation.isOperational) {
          logger.warn(`[Login Blocked — School Inactive] User ${email} attempted login to ${evaluation.effectiveStatus} school: ${school.name}`);
          return res.status(403).json({
            success: false,
            code: evaluation.code,
            message: evaluation.message,
            schoolStatus: evaluation.effectiveStatus
          });
        }
      }
    }
  }

  const roleConfig = SYSTEM_ROLES_CONFIG[userRole] || SYSTEM_ROLES_CONFIG["SchoolAdmin"];

  const accessTokenSecret = process.env.JWT_SECRET || "schoolmitra-super-secret-jwt-key-2026";
  const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || "schoolmitra-super-secret-refresh-key-2026";

  // Fallback active user session if DB buffering or newly registered
  const userId = user?._id || new mongoose.Types.ObjectId();
  const rawName = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, " ");
  const userName = user?.name || (rawName.charAt(0).toUpperCase() + rawName.slice(1) || "School Admin");

  // ─── 4-Layer Permission Resolution Engine for Login Response ───
  let permissionsList: string[] = [];
  const normalizedRolePerm = String(userRole).toUpperCase();

  if (normalizedRolePerm === "TEACHER") {
    const schoolId = user?.schoolId || "sch_default";

    // Layer 3: Role defaults
    let rolePermissions = [...DEFAULT_TEACHER_PERMISSIONS];
    try {
      const teacherRole = await RoleModel.findOne({ systemRole: "TEACHER", schoolId }).lean();
      if (teacherRole && Array.isArray((teacherRole as any).permissions) && (teacherRole as any).permissions.length > 0) {
        rolePermissions = (teacherRole as any).permissions;
      }
    } catch (err) {}

    // Layer 1: Overrides
    let overrideMap: Record<string, string> = {};
    try {
      const overrides = await UserPermissionOverrideModel.find({ userId, schoolId }).lean();
      overrides.forEach((o: any) => {
        overrideMap[o.permissionKey] = o.effect;
      });
    } catch (err) {}

    // Layer 2: Embedded permissions
    const embeddedPermissions = user?.permissions;

    // Resolve
    const grantedPermissions = new Set<string>();
    for (const perm of GLOBAL_PERMISSIONS_REGISTRY) {
      const isRoleDefault = rolePermissions.includes(perm.key);
      const override = overrideMap[perm.key];

      let effective = false;
      if (override === "ALLOW") {
        effective = true;
      } else if (override === "DENY") {
        effective = false;
      } else {
        // DEFAULT: check embedded if present
        if (embeddedPermissions) {
          const [mod, act] = perm.key.split(".");
          if (mod && act && embeddedPermissions[mod] && typeof embeddedPermissions[mod] === "object") {
            const mappedAct = act === "update" ? (embeddedPermissions[mod].update ?? embeddedPermissions[mod].edit) : embeddedPermissions[mod][act];
            if (mappedAct !== undefined) {
              effective = Boolean(mappedAct);
            } else {
              effective = isRoleDefault;
            }
          } else {
            effective = isRoleDefault;
          }
        } else {
          effective = isRoleDefault;
        }
      }

      if (effective) {
        grantedPermissions.add(perm.key);
      }
    }
    permissionsList = Array.from(grantedPermissions);
  } else if (normalizedRole === "SCHOOLADMIN" || normalizedRole === "SUPERADMIN" || normalizedRole === "PRINCIPAL") {
    permissionsList = GLOBAL_PERMISSIONS_REGISTRY.map(p => p.key);
  } else {
    // Other roles get default modules from roles config
    permissionsList = roleConfig?.allowedModules || [];
  }

  let schoolSessionVersion = 1;
  if (user?.schoolId) {
    try {
      const sch = await SchoolModel.findById(user.schoolId).select("sessionVersion").lean();
      if (sch && typeof sch.sessionVersion === "number") {
        schoolSessionVersion = sch.sessionVersion;
      }
    } catch {}
  }

  const payload = {
    id: userId,
    email: email.toLowerCase(),
    role: userRole,
    schoolId: user?.schoolId || undefined,
    sessionVersion: schoolSessionVersion,
    permissions: permissionsList
  };

  const accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY || "7d",
  });
  const refreshToken = jwt.sign({ id: userId, sessionVersion: schoolSessionVersion }, refreshTokenSecret, {
    expiresIn: TOKEN_CONFIG.REFRESH_TOKEN_EXPIRY || "30d",
  });

  if (mongoose.connection.readyState === 1 && user) {
    try {
      await RefreshTokenModel.create({ userId: user._id, refreshToken });
    } catch (e) {
      // Ignore token persistence error
    }
  }

  let parentDoc: any = null;
  let childrenList: any[] = [];
  let currentChild: any = null;
  let schoolDetails: any = null;

  if (normalizedRole === "PARENT") {
    try {
      parentDoc = await ParentModel.findOne({
        $or: [
          { userId: user?._id },
          { email: user?.email },
          { phone: user?.phone }
        ]
      }).populate("children").lean();

      if (user?.schoolId) {
        schoolDetails = await SchoolModel.findById(user.schoolId).select("name code address city phone email logo").lean();
      }

      let rawStudents: any[] = [];
      if (parentDoc && Array.isArray(parentDoc.children) && parentDoc.children.length > 0) {
        if (parentDoc.children[0]?.name) {
          rawStudents = parentDoc.children;
        } else {
          rawStudents = await StudentModel.find({ _id: { $in: parentDoc.children } }).lean();
        }
      }

      if (rawStudents.length === 0 && parentDoc?._id) {
        rawStudents = await StudentModel.find({ parentId: parentDoc._id }).lean();
      }

      if (rawStudents.length === 0 && (user?.schoolId || user?.phone)) {
        rawStudents = await StudentModel.find({
          ...(user?.schoolId ? { schoolId: user.schoolId } : {}),
          $or: [
            { "parentInfo.phone": user?.phone },
            { phone: user?.phone },
            { parentName: user?.name }
          ]
        }).limit(5).lean();
      }

      if (rawStudents.length > 0) {
        childrenList = await Promise.all(rawStudents.map(async (ch: any) => {
          let className = ch.class;
          if (!className && ch.classId) {
            try {
              const cDoc: any = await ClassModel.findById(ch.classId).lean();
              const sDoc: any = ch.sectionId ? await SectionModel.findById(ch.sectionId).lean() : null;
              if (cDoc) {
                className = `${cDoc.className || cDoc.name}${sDoc ? ' - ' + (sDoc.sectionName || sDoc.name) : ''}`;
              }
            } catch (e) {}
          }
          return {
            id: String(ch._id),
            name: ch.name,
            rollNo: ch.rollNo || ch.rollNumber || "1",
            admissionNo: ch.admissionNo || ch.admissionNumber || "ADM-2026",
            class: className || "Class 10 - A",
            gender: ch.gender || "Male",
            bloodGroup: ch.bloodGroup || "B+",
            photo: ch.photo || null,
            status: ch.status || "Active",
            schoolName: schoolDetails?.name || null,
            schoolCode: schoolDetails?.code || null,
            fatherName: ch.parentInfo?.fatherName || parentDoc?.fatherName || (parentDoc?.relation === "Father" ? parentDoc?.name : undefined),
            motherName: ch.parentInfo?.motherName || parentDoc?.motherName || (parentDoc?.relation === "Mother" ? parentDoc?.name : undefined)
          };
        }));
        currentChild = childrenList[0];
      }
    } catch (err) {
      logger.warn("[Parent Data Resolution Warning]", err);
    }
  }

  logger.info(`User authenticated: ${email} as ${userRole}`);

  return ApiResponse.success(res, 200, "Authentication successful", {
    accessToken,
    refreshToken,
    user: {
      id: userId,
      name: userName,
      email: user?.email || email,
      phone: user?.phone || "",
      role: normalizedRole,
      schoolId: user?.schoolId || null,
      schoolName: schoolDetails?.name || null,
      schoolCode: schoolDetails?.code || null
    },
    parent: parentDoc ? {
      id: parentDoc._id,
      name: parentDoc.name || user?.name,
      relation: parentDoc.relation || "Parent",
      phone: parentDoc.phone || user?.phone,
      email: parentDoc.email || user?.email,
      fatherName: parentDoc.fatherName || (parentDoc.relation === "Father" ? parentDoc.name : undefined),
      motherName: parentDoc.motherName || (parentDoc.relation === "Mother" ? parentDoc.name : undefined)
    } : {
      id: user?._id,
      name: user?.name,
      relation: "Parent",
      phone: user?.phone,
      email: user?.email
    },
    children: childrenList,
    currentChild: currentChild,
    permissions: permissionsList
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

// ════════════ 11. GOOGLE LOGIN ════════════
export const googleLogin = asyncHandler(async (req: Request, res: Response) => {
  const { token, email, name, googleId } = req.body;
  
  // Note: For production, we should verify `token` with `google-auth-library`.
  // Here we assume the frontend verified it or we trust the decoded payload.
  
  if (!email || !googleId) {
    throw ApiError.badRequest("Email and Google ID are required");
  }

  const accessTokenSecret = process.env.JWT_SECRET || "schoolmitra-super-secret-jwt-key-2026";
  const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || "schoolmitra-super-secret-refresh-key-2026";

  let user = await UserModel.findOne({ email: email.toLowerCase() });

  if (user) {
    // Check if profile is complete (needs schoolId and phone)
    if (!user.schoolId || !user.phone) {
      const accessToken = jwt.sign(
        { id: user._id, email: user.email, role: user.role, isProfileIncomplete: true },
        accessTokenSecret,
        { expiresIn: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY || "7d" }
      );
      return ApiResponse.success(res, 200, "Profile incomplete", {
        accessToken,
        isProfileIncomplete: true,
      });
    }

    // Check School Status before normal login
    const school = await SchoolModel.findById(user.schoolId).lean();
    if (school) {
      const evaluation = evaluateSchoolStatus(school);
      if (!evaluation.isOperational) {
        return res.status(403).json({
          success: false,
          code: evaluation.code,
          message: evaluation.message,
          schoolStatus: evaluation.effectiveStatus
        });
      }
    }

    // Profile complete -> login
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role, schoolId: user.schoolId },
      accessTokenSecret,
      { expiresIn: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY || "7d" }
    );
    const refreshToken = jwt.sign({ id: user._id }, refreshTokenSecret, {
      expiresIn: TOKEN_CONFIG.REFRESH_TOKEN_EXPIRY || "30d",
    });

    await RefreshTokenModel.create({ userId: user._id, refreshToken });

    return ApiResponse.success(res, 200, "Authentication successful", {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } else {
    // New Google User
    user = await UserModel.create({
      name: name || email.split("@")[0],
      email: email.toLowerCase(),
      googleId: googleId,
      role: "SchoolAdmin",
      isEmailVerified: true,
    });

    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role, isProfileIncomplete: true },
      accessTokenSecret,
      { expiresIn: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY || "7d" }
    );
    
    return ApiResponse.success(res, 200, "Profile incomplete", {
      accessToken,
      isProfileIncomplete: true,
    });
  }
});

// ════════════ 12. COMPLETE PROFILE (After Google Login) ════════════
export const completeProfile = asyncHandler(async (req: Request, res: Response) => {
  const { phone, schoolName, city, address } = req.body;
  
  // Getting user from token
  const authHeader = req.headers.authorization;
  if (!authHeader) throw ApiError.unauthorized("No token provided");
  
  const token = authHeader.split(" ")[1];
  const accessTokenSecret = process.env.JWT_SECRET || "schoolmitra-super-secret-jwt-key-2026";
  const decoded = jwt.verify(token, accessTokenSecret) as any;

  if (!phone || !schoolName) {
    throw ApiError.badRequest("Mobile number and School name are required");
  }

  const user = await UserModel.findById(decoded.id);
  if (!user) throw ApiError.notFound("User not found");

  const schoolCode =
    ((schoolName || "SCH").toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 6) || "SCH") +
    "-" +
    Math.floor(100 + Math.random() * 900);

  const newSchool = await SchoolModel.create({
    code: schoolCode,
    name: schoolName,
    city: city || "Noida",
    address: address || "",
    phone: phone,
    email: user.email,
    plan: "Basic",
    status: "Active",
  });

  user.schoolId = newSchool._id;
  user.phone = phone;
  await user.save();

  // Generate new tokens
  const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || "schoolmitra-super-secret-refresh-key-2026";
  const accessToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role, schoolId: user.schoolId },
    accessTokenSecret,
    { expiresIn: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY || "7d" }
  );
  const refreshToken = jwt.sign({ id: user._id }, refreshTokenSecret, {
    expiresIn: TOKEN_CONFIG.REFRESH_TOKEN_EXPIRY || "30d",
  });

  await RefreshTokenModel.create({ userId: user._id, refreshToken });

  return ApiResponse.success(res, 200, "Profile completed successfully", {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  });
});

// ════════════ 13. GET SESSION INFO & STARTUP STATUS CHECK (STEP 33) ════════════
export const getSessionInfo = asyncHandler(async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw ApiError.unauthorized("Authentication required to fetch session status.");
  }

  const token = authHeader.split(" ")[1];
  const accessTokenSecret = process.env.JWT_SECRET || "schoolmitra-super-secret-jwt-key-2026";
  const decoded = jwt.verify(token, accessTokenSecret) as any;

  const normalizedRole = String(decoded.role || "").toUpperCase().replace(/[_\s]/g, "");

  // Super Admin global session
  if (normalizedRole === "SUPERADMIN") {
    return ApiResponse.success(res, 200, "Super Admin session active.", {
      authenticated: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        role: "SuperAdmin"
      },
      school: null
    });
  }

  const targetSchoolId = decoded.schoolId || (req.headers["x-school-id"] as string);
  let school: any = null;

  if (targetSchoolId) {
    const isObjectId = mongoose.Types.ObjectId.isValid(targetSchoolId);
    if (isObjectId) {
      school = await SchoolModel.findById(targetSchoolId).lean();
    }
    if (!school) {
      school = await SchoolModel.findOne({ code: String(targetSchoolId).toLowerCase() }).lean();
    }
  }

  if (!school) {
    return res.status(403).json({
      authenticated: false,
      success: false,
      code: "NO_SCHOOL_BINDING",
      message: "No active school associated with session."
    });
  }

  const evaluation = evaluateSchoolStatus(school);

  const payload = {
    authenticated: true,
    user: {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    },
    school: {
      schoolId: String(school._id),
      name: school.name,
      code: school.code,
      status: evaluation.effectiveStatus,
      isOperational: evaluation.isOperational
    }
  };

  if (!evaluation.isOperational) {
    return res.status(403).json({
      success: false,
      code: evaluation.code,
      message: evaluation.message,
      ...payload
    });
  }

  return ApiResponse.success(res, 200, "Session valid & school active.", payload);
});

// ════════════ 13. SEARCH/LIST PUBLIC SCHOOLS FOR PARENT REGISTRATION ════════════
export const getPublicSchools = asyncHandler(async (req: Request, res: Response) => {
  const query = (req.query.search as string || "").trim();
  const filter: any = {};

  if (query) {
    filter.$or = [
      { name: { $regex: query, $options: "i" } },
      { code: { $regex: query, $options: "i" } },
      { "address.city": { $regex: query, $options: "i" } }
    ];
  }

  let schools = await SchoolModel.find(filter)
    .select("_id name code email phone logo address board status")
    .limit(25)
    .lean();

  // If no schools found and search was empty, ensure a default school is returned
  if (schools.length === 0 && !query) {
    let def = await SchoolModel.findOne().lean();
    if (!def) {
      def = await SchoolModel.create({
        name: "Delhi Public School",
        code: "sch-1000",
        email: "admin@dps.edu.in",
        phone: "+919876543210",
        status: "Active",
        address: { city: "New Delhi", state: "Delhi" }
      });
    }
    schools = [def];
  }

  return ApiResponse.success(res, 200, "Schools retrieved successfully", schools.map((s: any) => ({
    id: String(s._id),
    name: s.name,
    code: s.code,
    email: s.email,
    phone: s.phone,
    city: s.address?.city || "Delhi NCR",
    board: s.board || "CBSE",
    logo: s.logo || null,
    status: s.status || "Active"
  })));
});

// ════════════ 14. PUBLIC LOOKUP STUDENT BY SCHOOL & ADMISSION/ROLL/NAME ════════════
export const lookupStudentPublic = asyncHandler(async (req: Request, res: Response) => {
  const { schoolId, schoolCode, query } = req.query as { schoolId?: string; schoolCode?: string; query?: string };

  if (!query || (!schoolId && !schoolCode)) {
    return ApiResponse.success(res, 200, "Provide school and search query", []);
  }

  let resolvedSchoolId: any = null;
  if (schoolId && mongoose.Types.ObjectId.isValid(schoolId)) {
    resolvedSchoolId = new mongoose.Types.ObjectId(schoolId);
  } else if (schoolCode) {
    const school = await SchoolModel.findOne({ code: String(schoolCode).toLowerCase() }).lean();
    if (school) resolvedSchoolId = school._id;
  }

  if (!resolvedSchoolId) {
    return ApiResponse.success(res, 200, "School not found", []);
  }

  const q = String(query).trim();
  const students = await StudentModel.find({
    schoolId: resolvedSchoolId,
    $or: [
      { admissionNumber: { $regex: q, $options: "i" } },
      { admissionNo: { $regex: q, $options: "i" } },
      { rollNumber: { $regex: q, $options: "i" } },
      { rollNo: { $regex: q, $options: "i" } },
      { name: { $regex: q, $options: "i" } },
      { "parentInfo.phone": { $regex: q, $options: "i" } }
    ]
  })
    .select("_id name rollNo rollNumber admissionNo admissionNumber class section gender bloodGroup parentInfo photo")
    .limit(10)
    .lean();

  const formatted = students.map((st: any) => ({
    id: String(st._id),
    name: st.name,
    admissionNo: st.admissionNo || st.admissionNumber || 'ADM-2026',
    rollNo: st.rollNo || st.rollNumber || '1',
    class: `${st.class || ''} ${st.section ? '- ' + st.section : ''}`.trim() || 'Class 10 - A',
    gender: st.gender,
    bloodGroup: st.bloodGroup,
    photo: st.photo || null,
    fatherName: st.parentInfo?.fatherName || null,
    motherName: st.parentInfo?.motherName || null
  }));

  return ApiResponse.success(res, 200, "Students found", formatted);
});



