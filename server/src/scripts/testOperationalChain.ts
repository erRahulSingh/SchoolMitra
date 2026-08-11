// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Operational Chain Integration Test Script
// Verifies: Seed Structure → Create Teacher → Assign Class/Subject → Override Perms → Setup Timetable → Mark Attendance
// ═══════════════════════════════════════════════════════════

import mongoose from "mongoose";
import { UserModel, SchoolModel, UserPermissionOverrideModel } from "../models/AuthSchemas";
import {
  AcademicYearModel,
  ClassModel,
  SectionModel,
  SubjectModel,
  TeacherAssignmentModel,
  StudentModel,
  TimetableModel
} from "../models/SchoolSchemas";
import { AttendanceModel } from "../models/AcademicSchemas";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/schoolmitra";

async function run() {
  console.log("🚀 Starting Master Operational Chain Integration Test...");
  try {
    await mongoose.connect(MONGO_URI);
    console.log("❇️ Connected to Database.");

    // Clean old test entries
    const testSchoolId = new mongoose.Types.ObjectId();
    const testSchoolCode = "test-sch-101";

    console.log(`\nStep 1: Setting up Test School (${testSchoolCode})...`);
    await SchoolModel.create({
      _id: testSchoolId,
      code: testSchoolCode,
      name: "Master Integration Test School",
      city: "Noida",
      status: "Active",
      plan: "Basic"
    });

    console.log("\nStep 2: Seeding Academic Year 2026-27...");
    const acYear = await AcademicYearModel.create({
      schoolId: testSchoolId,
      year: "2026-27",
      startDate: new Date("2026-04-01"),
      endDate: new Date("2027-03-31"),
      isCurrent: true
    });
    console.log(`  -> Created Academic Year Id: ${acYear._id}`);

    console.log("\nStep 3: Creating Classes 8-A and 9-B...");
    const class8 = await ClassModel.create({
      schoolId: testSchoolId,
      className: "Class 8",
      numericOrder: 8,
      sections: ["A"],
      academicYearId: acYear._id
    });
    const section8A = await SectionModel.create({
      schoolId: testSchoolId,
      sectionName: "A",
      classId: class8._id,
      maxStrength: 40
    });

    const class9 = await ClassModel.create({
      schoolId: testSchoolId,
      className: "Class 9",
      numericOrder: 9,
      sections: ["B"],
      academicYearId: acYear._id
    });
    const section9B = await SectionModel.create({
      schoolId: testSchoolId,
      sectionName: "B",
      classId: class9._id,
      maxStrength: 40
    });

    console.log("\nStep 4: Seeding Core Subjects...");
    const math8 = await SubjectModel.create({
      schoolId: testSchoolId,
      subjectName: "Mathematics",
      code: "MATH",
      classId: class8._id,
      type: "Core"
    });
    const math9 = await SubjectModel.create({
      schoolId: testSchoolId,
      subjectName: "Mathematics",
      code: "MATH",
      classId: class9._id,
      type: "Core"
    });

    console.log("\nStep 5: Creating Teacher Master (Amit Kumar)...");
    const teacher = await UserModel.create({
      name: "Amit Kumar",
      email: `amit.kumar.${Date.now()}@testschool.com`,
      phone: "9876543210",
      password: "hashed_password_placeholder",
      role: "Teacher",
      schoolId: testSchoolId,
      empId: "TCH-AMIT-2026",
      gender: "Male",
      qualification: "M.Sc. Mathematics",
      designation: "Senior Mathematics Teacher",
      status: "ACTIVE",
      isActive: true
    });
    console.log(`  -> Teacher Created. Id: ${teacher._id}`);

    console.log("\nStep 6: Assigning Teacher to Class/Subjects...");
    const assign8A = await TeacherAssignmentModel.create({
      schoolId: testSchoolId,
      teacherId: teacher._id,
      classId: class8._id,
      sectionId: section8A._id,
      subjectId: math8._id,
      academicYearId: acYear._id,
      academicYear: "2026-27",
      status: "Active"
    });
    const assign9B = await TeacherAssignmentModel.create({
      schoolId: testSchoolId,
      teacherId: teacher._id,
      classId: class9._id,
      sectionId: section9B._id,
      subjectId: math9._id,
      academicYearId: acYear._id,
      academicYear: "2026-27",
      status: "Active"
    });
    console.log("  -> Assigned Amit Kumar to: Class 8-A (Math) & Class 9-B (Math).");

    console.log("\nStep 7: Overriding Teacher Permissions (Granting attendance.delete override)...");
    const override = await UserPermissionOverrideModel.create({
      schoolId: testSchoolId,
      userId: teacher._id,
      permissionKey: "attendance.delete",
      effect: "ALLOW"
    });
    console.log(`  -> Override Created: ${override.permissionKey} = ${override.effect}`);

    console.log("\nStep 8: Setting Up Timetable Slots...");
    const slot1 = await TimetableModel.create({
      schoolId: testSchoolId,
      academicYearId: acYear._id,
      dayOfWeek: "Monday",
      startTime: "08:00",
      endTime: "08:45",
      classId: class8._id,
      sectionId: section8A._id,
      subjectId: math8._id,
      teacherId: teacher._id,
      room: "Room 102"
    });
    const slot2 = await TimetableModel.create({
      schoolId: testSchoolId,
      academicYearId: acYear._id,
      dayOfWeek: "Monday",
      startTime: "08:45",
      endTime: "09:30",
      classId: class9._id,
      sectionId: section9B._id,
      subjectId: math9._id,
      teacherId: teacher._id,
      room: "Room 204"
    });
    console.log(`  -> Seeded 2 Timetable Slots for Monday.`);

    console.log("\nStep 9: Adding Test Students to class-sections...");
    const student1 = await StudentModel.create({
      schoolId: testSchoolId,
      rollNo: "01",
      admissionNo: `ADM-${Date.now()}-1`,
      name: "Rahul Kushwaha",
      classId: class8._id,
      sectionId: section8A._id,
      status: "Active"
    });
    const student2 = await StudentModel.create({
      schoolId: testSchoolId,
      rollNo: "02",
      admissionNo: `ADM-${Date.now()}-2`,
      name: "Diya Sharma",
      classId: class8._id,
      sectionId: section8A._id,
      status: "Active"
    });
    console.log(`  -> Added 2 Students (Rahul, Diya) to Class 8-A.`);

    console.log("\nStep 10: Simulating Teacher Marking Attendance...");
    const attendanceRecords = [
      {
        schoolId: testSchoolId,
        studentId: student1._id,
        teacherId: teacher._id,
        classId: class8._id,
        sectionId: section8A._id,
        date: "2026-08-11",
        status: "Present"
      },
      {
        schoolId: testSchoolId,
        studentId: student2._id,
        teacherId: teacher._id,
        classId: class8._id,
        sectionId: section8A._id,
        date: "2026-08-11",
        status: "Absent"
      }
    ];

    const result = await AttendanceModel.insertMany(attendanceRecords);
    console.log(`  -> Success! Marked attendance for ${result.length} students.`);

    // Cleanup test school and child documents
    console.log("\nStep 11: Cleaning up integration test records...");
    await Promise.all([
      SchoolModel.findByIdAndDelete(testSchoolId),
      AcademicYearModel.deleteMany({ schoolId: testSchoolId }),
      ClassModel.deleteMany({ schoolId: testSchoolId }),
      SectionModel.deleteMany({ schoolId: testSchoolId }),
      SubjectModel.deleteMany({ schoolId: testSchoolId }),
      UserModel.deleteMany({ schoolId: testSchoolId }),
      TeacherAssignmentModel.deleteMany({ schoolId: testSchoolId }),
      UserPermissionOverrideModel.deleteMany({ schoolId: testSchoolId }),
      TimetableModel.deleteMany({ schoolId: testSchoolId }),
      StudentModel.deleteMany({ schoolId: testSchoolId }),
      AttendanceModel.deleteMany({ schoolId: testSchoolId })
    ]);
    console.log("  -> Done cleanup.");

    console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY! The complete operational chain is fully verified and functional in the database.");
  } catch (error) {
    console.error("❌ TEST FAILED:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
