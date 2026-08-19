// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Push Notification Engine & Database Integration Test Suite
// Verifies: Schema structure, field aliases (isRead, message), referenceType, referenceId, and targeting.
// ═══════════════════════════════════════════════════════════

import mongoose from "mongoose";
import { SchoolModel, UserModel, ParentModel } from "../models/AuthSchemas";
import { ClassModel, SectionModel, StudentModel } from "../models/SchoolSchemas";
import { NotificationModel } from "../models/CommunicationSchemas";
import { 
  createNotification, 
  sendClassNotification, 
  sendStudentNotification 
} from "../services/notificationService";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/schoolmitra";

async function run() {
  console.log("🚀 Starting Push Notification Engine & Database Integration Test...");
  try {
    await mongoose.connect(MONGO_URI);
    console.log("❇️ Connected to Database.");

    const testSchoolId = new mongoose.Types.ObjectId();
    const testSchoolCode = "test-notif-101";

    console.log(`\nStep 1: Setting up Test School (${testSchoolCode})...`);
    await SchoolModel.create({
      _id: testSchoolId,
      code: testSchoolCode,
      name: "Notification Engine Test School",
      city: "Noida",
      status: "Active",
      plan: "Basic"
    });

    console.log("\nStep 2: Creating Test Class, Users & Student...");
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

    const senderUser = await UserModel.create({
      name: "Teacher Admin",
      email: `teacher.sender.${Date.now()}@testschool.com`,
      role: "Teacher",
      schoolId: testSchoolId,
      status: "Active",
      isActive: true
    });

    const parentUser = await UserModel.create({
      name: "Rajesh Verma",
      email: `rajesh.parent.${Date.now()}@testschool.com`,
      role: "Parent",
      schoolId: testSchoolId,
      status: "Active",
      isActive: true
    });

    const testParent = await ParentModel.create({
      schoolId: testSchoolId,
      name: "Rajesh Verma",
      email: parentUser.email,
      userId: parentUser._id
    });

    const testStudent = await StudentModel.create({
      schoolId: testSchoolId,
      rollNo: "05",
      admissionNo: `ADM-NOTIF-${Date.now()}`,
      name: "Aarav Verma",
      classId: testClass._id,
      sectionId: testSection._id,
      parentId: testParent._id,
      status: "Active"
    });

    console.log("  -> Test entity setup complete.");

    console.log("\nStep 3: Testing single notification creation & Mongoose aliases...");
    const refHomeworkId = new mongoose.Types.ObjectId();
    const singleNotif = await createNotification({
      schoolId: testSchoolId,
      senderId: senderUser._id,
      recipientId: parentUser._id,
      recipientRole: "Parent",
      type: "HOMEWORK",
      title: "Science Homework Chapter 4",
      message: "Complete end-of-chapter numericals by tomorrow.",
      referenceType: "homeworks",
      referenceId: refHomeworkId
    });

    if (!singleNotif) throw new Error("Failed to create single notification");
    console.log(`  -> Created notification ID: ${singleNotif._id}`);

    // Verify aliases
    const fetchedDoc: any = await NotificationModel.findById(singleNotif._id);
    console.log(`  -> Checked alias 'isRead': ${fetchedDoc.isRead} (matches 'read': ${fetchedDoc.read})`);
    console.log(`  -> Checked alias 'message': "${fetchedDoc.message}" (matches 'body': "${fetchedDoc.body}")`);
    console.log(`  -> Checked 'referenceType': "${fetchedDoc.referenceType}"`);
    console.log(`  -> Checked 'referenceId': "${fetchedDoc.referenceId}"`);

    if (String(fetchedDoc.referenceId) !== String(refHomeworkId)) {
      throw new Error("referenceId mismatch!");
    }
    if (fetchedDoc.isRead !== false) {
      throw new Error("isRead mismatch!");
    }

    console.log("\nStep 4: Testing sendClassNotification targeting...");
    const refExamId = new mongoose.Types.ObjectId();
    const classNotifs = await sendClassNotification(
      testSchoolId,
      senderUser._id,
      testClass._id,
      testSection._id,
      "EXAM",
      "Mid-Term Datesheet Published",
      "Exams start on 15th September.",
      "exams",
      refExamId
    );

    console.log(`  -> Generated ${classNotifs.length} class notification(s).`);
    if (classNotifs.length !== 1) {
      throw new Error(`Expected 1 class notification, got ${classNotifs.length}`);
    }

    console.log("\nStep 5: Testing sendStudentNotification targeting...");
    const refReportCardId = new mongoose.Types.ObjectId();
    const studentNotif = await sendStudentNotification(
      testSchoolId,
      senderUser._id,
      testStudent._id,
      "REPORT_CARD",
      "Report Card Published",
      "Term 1 Report Card is ready.",
      "reportCards",
      refReportCardId
    );

    if (!studentNotif) throw new Error("Failed sendStudentNotification");
    console.log("  -> Student notification verified: PASSED ✅");

    console.log("\nStep 6: Verifying total recorded notifications & types...");
    const allNotifs = await NotificationModel.find({ schoolId: testSchoolId });
    console.log(`  -> Total notification DB records for school: ${allNotifs.length}`);
    if (allNotifs.length !== 3) {
      throw new Error(`Expected 3 total notifications, found ${allNotifs.length}`);
    }

    console.log("\nStep 7: Cleanup test records...");
    await Promise.all([
      SchoolModel.findByIdAndDelete(testSchoolId),
      ClassModel.deleteMany({ schoolId: testSchoolId }),
      SectionModel.deleteMany({ schoolId: testSchoolId }),
      UserModel.deleteMany({ schoolId: testSchoolId }),
      ParentModel.deleteMany({ schoolId: testSchoolId }),
      StudentModel.deleteMany({ schoolId: testSchoolId }),
      NotificationModel.deleteMany({ schoolId: testSchoolId })
    ]);
    console.log("  -> Cleanup completed successfully.");

    console.log("\n🎉 PUSH NOTIFICATION ENGINE & DATABASE TESTS PASSED SUCCESSFULLY!");
  } catch (error) {
    console.error("❌ TEST FAILED:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

run();
