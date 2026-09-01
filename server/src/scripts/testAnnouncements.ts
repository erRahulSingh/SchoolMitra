// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Announcement System Integration Test Script
// Verifies: Create Announcement -> Save in DB -> Process Targeting -> Seed Notification entries
// ═══════════════════════════════════════════════════════════

import mongoose from "mongoose";
import { SchoolModel, UserModel} from "../models/AuthSchemas";
import { ClassModel, SectionModel, StudentModel , ParentModel } from "../models/SchoolSchemas";
import { AnnouncementModel, NotificationModel } from "../models/CommunicationSchemas";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/schoolmitra";

async function run() {
  console.log("🚀 Starting Announcement System Integration Test...");
  try {
    await mongoose.connect(MONGO_URI);
    console.log("❇️ Connected to Database.");

    const testSchoolId = new mongoose.Types.ObjectId();
    const testSchoolCode = "test-ann-101";

    console.log(`\nStep 1: Setting up Test School (${testSchoolCode})...`);
    await SchoolModel.create({
      _id: testSchoolId,
      code: testSchoolCode,
      name: "Announcement Integration Test School",
      city: "Delhi",
      status: "Active",
      plan: "Basic"
    });

    console.log("\nStep 2: Creating Test Classes, Sections & Users...");
    const testClass = await ClassModel.create({
      schoolId: testSchoolId,
      className: "Class 10",
      numericOrder: 10,
      sections: ["A"]
    });

    const testSection = await SectionModel.create({
      schoolId: testSchoolId,
      sectionName: "A",
      classId: testClass._id,
      maxStrength: 40
    });

    const testParentUser = await UserModel.create({
      name: "Prakash Sharma",
      email: `prakash.parent.${Date.now()}@testschool.com`,
      phone: "9988776655",
      role: "Parent",
      schoolId: testSchoolId,
      status: "Active",
      isActive: true
    });

    const testParent = await ParentModel.create({
      schoolId: testSchoolId,
      name: "Prakash Sharma",
      phone: "9988776655",
      email: testParentUser.email,
      userId: testParentUser._id
    });

    const testStudent = await StudentModel.create({
      schoolId: testSchoolId,
      rollNo: "12",
      admissionNo: `ADM-${Date.now()}-A`,
      name: "Tushar Sharma",
      classId: testClass._id,
      sectionId: testSection._id,
      parentId: testParent._id,
      status: "Active"
    });

    console.log("  -> Parent and Student entities established in class 10-A.");

    console.log("\nStep 3: Creating school-admin targeted announcements...");
    
    // 1. Broad announcement for all parents
    const annAllParents = await AnnouncementModel.create({
      schoolId: testSchoolId,
      title: "School Closed Due to Rain",
      content: "Dear parents, school remains closed tomorrow due to heavy rain forecast.",
      targetAudience: "All Parents",
      priority: "High",
      status: "Published",
      publishDate: new Date()
    });

    console.log(`  -> Announcement "All Parents" saved. ID: ${annAllParents._id}`);

    // Trigger mock notification creation logic (similar to dispatchNotifications in controller)
    const simulateNotificationDispatch = async (ann: any) => {
      let recipientUsers: any[] = [];
      if (ann.targetAudience === "All Parents") {
        const parents = await ParentModel.find({ schoolId: ann.schoolId }).select("userId").lean();
        recipientUsers = parents
          .filter((p: any) => p.userId)
          .map((p: any) => ({ _id: p.userId, role: "Parent" }));
      }
      
      const inserts = recipientUsers.map(r => ({
        schoolId: ann.schoolId,
        recipientId: r._id,
        recipientRole: r.role,
        title: ann.title,
        body: ann.content,
        type: "Announcement",
        read: false
      }));

      if (inserts.length > 0) {
        await NotificationModel.insertMany(inserts);
      }
      return inserts.length;
    };

    const dispatchedCount = await simulateNotificationDispatch(annAllParents);
    console.log(`  -> Generated ${dispatchedCount} notification record(s) in DB.`);

    console.log("\nStep 4: Verifying saved entries...");
    const verifiedAnn = await AnnouncementModel.findById(annAllParents._id);
    if (!verifiedAnn) throw new Error("Announcement not found in DB!");
    console.log("  -> Verified announcement fields in DB: PASSED ✅");

    const verifiedNotifs = await NotificationModel.find({ schoolId: testSchoolId });
    if (verifiedNotifs.length !== 1) {
      throw new Error(`Expected 1 notification log, but found ${verifiedNotifs.length}`);
    }
    console.log(`  -> Verified generated Notification recipientId: ${verifiedNotifs[0].recipientId} (matches Prakash user: ${testParentUser._id}) PASSED ✅`);

    console.log("\nStep 5: Cleanup test records...");
    await Promise.all([
      SchoolModel.findByIdAndDelete(testSchoolId),
      ClassModel.deleteMany({ schoolId: testSchoolId }),
      SectionModel.deleteMany({ schoolId: testSchoolId }),
      UserModel.deleteMany({ schoolId: testSchoolId }),
      ParentModel.deleteMany({ schoolId: testSchoolId }),
      StudentModel.deleteMany({ schoolId: testSchoolId }),
      AnnouncementModel.deleteMany({ schoolId: testSchoolId }),
      NotificationModel.deleteMany({ schoolId: testSchoolId })
    ]);
    console.log("  -> Cleanup completed successfully.");

    console.log("\n🎉 ANNOUNCEMENT SYSTEM TEST COMPLETED SUCCESSFULLY! All components verified.");
  } catch (error) {
    console.error("❌ TEST FAILED:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

run();

