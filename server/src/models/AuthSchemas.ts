import { Schema, model } from "mongoose";

// 1. Authentication Collections
export const SchoolModel = model("schools", new Schema({ code: String, name: String, city: String, plan: String, status: String }, { timestamps: true }));
export const BranchModel = model("branches", new Schema({ schoolId: Schema.Types.ObjectId, branchName: String, city: String }, { timestamps: true }));
export const UserModel = model("users", new Schema({ name: String, email: { type: String, unique: true }, password: String, phone: String, role: String, schoolId: Schema.Types.ObjectId }, { timestamps: true }));
export const RoleModel = model("roles", new Schema({ roleName: String, permissions: [String] }, { timestamps: true }));
export const PermissionModel = model("permissions", new Schema({ module: String, action: String }, { timestamps: true }));
export const SessionModel = model("sessions", new Schema({ userId: Schema.Types.ObjectId, token: String, expiresAt: Date }, { timestamps: true }));
export const RefreshTokenModel = model("refreshTokens", new Schema({ userId: Schema.Types.ObjectId, refreshToken: String }, { timestamps: true }));
