// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Device Token Service
// ═══════════════════════════════════════════════════════════

import { DeviceTokenModel } from "../../models/CommunicationSchemas";
import mongoose from "mongoose";

export const getActiveTokensForUser = async (userId: string | mongoose.Types.ObjectId) => {
  return DeviceTokenModel.find({
    userId: new mongoose.Types.ObjectId(userId),
    isActive: true
  }).select("pushToken platform deviceId").lean();
};

export const registerUserDeviceToken = async (userId: string, deviceId: string, pushToken: string, platform: string = "android", schoolId?: string) => {
  return DeviceTokenModel.findOneAndUpdate(
    { userId: new mongoose.Types.ObjectId(userId), deviceId },
    {
      $set: {
        schoolId: schoolId && mongoose.Types.ObjectId.isValid(schoolId) ? new mongoose.Types.ObjectId(schoolId) : undefined,
        platform,
        pushToken,
        isActive: true
      }
    },
    { upsert: true, new: true }
  );
};
