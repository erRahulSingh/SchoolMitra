import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import { UserModel as User, SchoolModel as School } from "../models/AuthSchemas";
import { StudentModel as Student, TeacherModel as Teacher } from "../models/SchoolSchemas";
import { connectDB, disconnectDB } from "../config/db";
import bcrypt from "bcryptjs";
import logger from "../utils/logger";

dotenv.config();

const seedDatabase = async () => {
  try {
    logger.info("🌱 Starting Database Seeding Process...");
    await connectDB();

    // 1. Clear Existing Data
    logger.info("🗑️ Clearing existing collections...");
    await User.deleteMany({});
    await School.deleteMany({});
    await Student.deleteMany({});
    await Teacher.deleteMany({});

    // 2. Create Super Admin
    logger.info("👑 Creating Super Admin...");
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const superAdmin = await User.create({
      name: "System Super Admin",
      email: "super@schoolmitra.com",
      password: hashedPassword,
      phone: "9999999999",
      role: "SuperAdmin",
      status: "Active",
    });

    // 3. Create Dummy Schools
    logger.info("🏫 Creating Schools...");
    const schoolsData = [];
    for (let i = 1; i <= 2; i++) {
      schoolsData.push({
        code: `SCH-${i}000`,
        name: `${faker.location.city()} Public School`,
        email: `contact@sch${i}.com`,
        phone: faker.phone.number(),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: "India",
        },
        plan: i === 1 ? "Enterprise" : "Basic",
        status: "Active",
        settings: { timezone: "Asia/Kolkata", currency: "INR" }
      });
    }
    const schools = await School.insertMany(schoolsData);

    // 4. Create School Admins, Teachers & Students per School
    logger.info("👨‍🏫 Generating Tenants Data (Users, Teachers, Students)...");
    
    for (const school of schools) {
      // School Admin
      await User.create({
        schoolId: school._id,
        name: `${school.name} Admin`,
        email: `admin@${school.code.toLowerCase()}.com`,
        password: hashedPassword,
        phone: faker.phone.number(),
        role: "SchoolAdmin",
        status: "Active",
      });

      // Teachers
      const teacherIds = [];
      for (let i = 0; i < 5; i++) {
        const teacher = await Teacher.create({
          schoolId: school._id,
          employeeId: `EMP-${faker.number.int({ min: 1000, max: 9999 })}`,
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          department: faker.helpers.arrayElement(["Science", "Maths", "English", "Sports"]),
          designation: "Senior Teacher",
          dateOfJoining: faker.date.past(),
          status: "Active",
        });
        
        await User.create({
          schoolId: school._id,
          name: teacher.name,
          email: teacher.email,
          password: hashedPassword,
          phone: teacher.phone,
          role: "Teacher",
          status: "Active",
        });
        teacherIds.push(teacher._id);
      }

      // Students
      for (let i = 0; i < 20; i++) {
        await Student.create({
          schoolId: school._id,
          admissionNo: `ADM-${faker.number.int({ min: 10000, max: 99999 })}`,
          rollNo: `${i + 1}`,
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          classId: faker.helpers.arrayElement(["10", "11", "12"]),
          sectionId: faker.helpers.arrayElement(["A", "B", "C"]),
          gender: faker.helpers.arrayElement(["Male", "Female"]),
          dob: faker.date.birthdate({ min: 14, max: 18, mode: 'age' }),
          parentDetails: {
            fatherName: faker.person.fullName({ sex: 'male' }),
            motherName: faker.person.fullName({ sex: 'female' }),
            primaryContact: faker.phone.number(),
            primaryEmail: faker.internet.email(),
          },
          status: "Active"
        });
      }
    }

    logger.info("✅ Database Seeding Completed Successfully!");
    console.log("==================================================");
    console.log("Super Admin : super@schoolmitra.com / admin123");
    console.log(`School Admin: admin@${schools[0].code.toLowerCase()}.com / admin123`);
    console.log("==================================================");

  } catch (error) {
    logger.error("❌ Seeding Failed:", error);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
};

seedDatabase();
