// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Global Permission Registry & System Roles Seeder
// ═══════════════════════════════════════════════════════════

import { PermissionModel, RoleModel, RolePermissionModel } from "../models/AuthSchemas";
import { GLOBAL_PERMISSIONS_REGISTRY, DEFAULT_TEACHER_PERMISSIONS } from "../constants/permissions.config";
import logger from "../utils/logger";

export const seedGlobalPermissions = async (): Promise<void> => {
  try {
    // 1. Seed Global Permission Registry Definitions
    for (const perm of GLOBAL_PERMISSIONS_REGISTRY) {
      await PermissionModel.updateOne(
        { key: perm.key },
        {
          $set: {
            key: perm.key,
            module: perm.module,
            action: perm.action,
            description: perm.description,
            schoolId: null, // Centrally maintained definition
          },
        },
        { upsert: true }
      );
    }

    // 2. Seed Default Teacher System Role in roles collection
    let teacherRole = await RoleModel.findOne({ schoolId: null, systemRole: "TEACHER" });
    if (!teacherRole) {
      teacherRole = await RoleModel.create({
        schoolId: null,
        roleName: "Teacher",
        systemRole: "TEACHER",
        description: "Default System Teacher Role with baseline classroom capabilities",
        isSystem: true,
        permissions: DEFAULT_TEACHER_PERMISSIONS,
      });
    }

    // 3. Seed Default rolePermissions mapping
    for (const permKey of DEFAULT_TEACHER_PERMISSIONS) {
      const permDoc = await PermissionModel.findOne({ key: permKey });
      await RolePermissionModel.updateOne(
        { roleId: teacherRole._id, permissionKey: permKey },
        {
          $set: {
            roleId: teacherRole._id,
            permissionId: permDoc?._id || null,
            permissionKey: permKey,
          },
        },
        { upsert: true }
      );
    }

    logger.info(`✅ Global permissions & System Roles successfully synchronized.`);
  } catch (error: any) {
    logger.error(`Failed to sync global permissions: ${error.message}`);
  }
};
