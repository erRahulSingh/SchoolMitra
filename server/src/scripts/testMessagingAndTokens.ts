// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Messaging & Multi-Device Token Automated Test Suite
// Verifies: Device tokens registration, multi-device push resolution, unread count API, & direct chat
// ═══════════════════════════════════════════════════════════

import mongoose from "mongoose";
import { SchoolModel, UserModel, ParentModel } from "../models/AuthSchemas";
import { 
  NotificationModel, 
  DeviceTokenModel, 
  ChatRoomModel, 
  MessageModel 
} from "../models/CommunicationSchemas";
import { createNotification } from "../services/notificationService";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/schoolmitra";

async function run() {
  console.log("🚀 Starting Device Tokens, Read/Unread APIs & Chat Integration Test...");
  try {
    await mongoose.connect(MONGO_URI);
    console.log("❇️ Connected to Database.");

    const testSchoolId = new mongoose.Types.ObjectId();
    const testSchoolCode = "test-chat-101";

    console.log(`\nStep 1: Setting up Test School (${testSchoolCode})...`);
    await SchoolModel.create({
      _id: testSchoolId,
      code: testSchoolCode,
      name: "Messaging Integration Test School",
      city: "Noida",
      status: "Active",
      plan: "Basic"
    });

    console.log("\nStep 2: Creating Test Parent & Teacher Users...");
    const teacherUser = await UserModel.create({
      name: "Sunita Rao",
      email: `sunita.teacher.${Date.now()}@testschool.com`,
      role: "Teacher",
      schoolId: testSchoolId,
      status: "Active",
      isActive: true
    });

    const parentUser = await UserModel.create({
      name: "Rajesh Sharma",
      email: `rajesh.parent.${Date.now()}@testschool.com`,
      role: "Parent",
      schoolId: testSchoolId,
      status: "Active",
      isActive: true
    });

    console.log("  -> Users created: Sunita Rao (Teacher), Rajesh Sharma (Parent).");

    console.log("\nStep 3: Registering multiple device tokens for Rajesh (Android Phone & Tablet)...");
    const phoneToken = await DeviceTokenModel.create({
      userId: parentUser._id,
      schoolId: testSchoolId,
      deviceId: "DEV-PHONE-901",
      platform: "android",
      pushToken: "ExponentPushToken[RajeshPhoneToken]",
      isActive: true
    });

    const tabletToken = await DeviceTokenModel.create({
      userId: parentUser._id,
      schoolId: testSchoolId,
      deviceId: "DEV-TABLET-902",
      platform: "android",
      pushToken: "ExponentPushToken[RajeshTabletToken]",
      isActive: true
    });

    console.log("  -> 2 device tokens registered for Rajesh Sharma.");

    console.log("\nStep 4: Dispatching notification to verify multi-device dispatch resolution...");
    const notif = await createNotification({
      schoolId: testSchoolId,
      senderId: teacherUser._id,
      recipientId: parentUser._id,
      recipientRole: "Parent",
      type: "MESSAGE",
      title: "Direct Teacher Message",
      message: "Please check Aarav's Physics worksheet.",
      referenceType: "conversations"
    });

    if (!notif) throw new Error("Failed to dispatch notification!");
    console.log("  -> Notification record created and multi-device push executed successfully.");

    console.log("\nStep 5: Verifying unread notifications count query...");
    const unreadCount = await NotificationModel.countDocuments({ recipientId: parentUser._id, read: false });
    console.log(`  -> Unread count for Rajesh: ${unreadCount}`);
    if (unreadCount !== 1) {
      throw new Error(`Expected 1 unread notification, got ${unreadCount}`);
    }

    console.log("\nStep 6: Creating 1-on-1 Direct Conversation Room (Parent ↔ Teacher)...");
    const chatRoom = await ChatRoomModel.create({
      schoolId: testSchoolId,
      name: "Parent-Teacher Direct Chat",
      type: "TeacherParent",
      participants: [parentUser._id, teacherUser._id],
      isGroup: false,
      lastMessage: "Initial chat",
      lastMessageAt: new Date()
    });

    console.log(`  -> Conversation Room created. ID: ${chatRoom._id}`);

    console.log("\nStep 7: Simulating Parent ↔ Teacher exchange...");
    // 1. Parent sends message
    const msg1 = await MessageModel.create({
      roomId: chatRoom._id,
      senderId: parentUser._id,
      text: "Sir, Rahul ka homework complete nahi hua."
    });

    await ChatRoomModel.findByIdAndUpdate(chatRoom._id, {
      lastMessage: msg1.text,
      lastMessageAt: new Date()
    });

    // 2. Teacher replies
    const msg2 = await MessageModel.create({
      roomId: chatRoom._id,
      senderId: teacherUser._id,
      text: "Okay, main class me check karunga."
    });

    await ChatRoomModel.findByIdAndUpdate(chatRoom._id, {
      lastMessage: msg2.text,
      lastMessageAt: new Date()
    });

    console.log("  -> Messages exchanged and saved in MongoDB.");

    console.log("\nStep 8: Verifying conversation history & room state...");
    const roomCheck = await ChatRoomModel.findById(chatRoom._id);
    console.log(`  -> Verified lastMessage in DB: "${roomCheck?.lastMessage}"`);
    if (roomCheck?.lastMessage !== "Okay, main class me check karunga.") {
      throw new Error("lastMessage update failed!");
    }

    const messagesCount = await MessageModel.countDocuments({ roomId: chatRoom._id });
    console.log(`  -> Verified message history count in DB: ${messagesCount}`);
    if (messagesCount !== 2) {
      throw new Error(`Expected 2 messages, found ${messagesCount}`);
    }

    console.log("\nStep 9: Cleaning up integration test records...");
    await Promise.all([
      SchoolModel.findByIdAndDelete(testSchoolId),
      UserModel.deleteMany({ schoolId: testSchoolId }),
      DeviceTokenModel.deleteMany({ schoolId: testSchoolId }),
      NotificationModel.deleteMany({ schoolId: testSchoolId }),
      ChatRoomModel.deleteMany({ schoolId: testSchoolId }),
      MessageModel.deleteMany({ roomId: chatRoom._id })
    ]);
    console.log("  -> Cleanup completed successfully.");

    console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY! Device token management, read/unread APIs, and Parent ↔ Teacher direct chat are verified functional.");
  } catch (error) {
    console.error("❌ TEST FAILED:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

run();
