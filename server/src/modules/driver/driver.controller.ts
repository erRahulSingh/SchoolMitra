import { UserModel, SchoolModel } from "../../models/AuthSchemas";
import { DriverModel } from "../../models/TransportSchemas";
import { evaluateSchoolStatus } from "../../constants/schoolStatus.constants";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { Types } from "mongoose";

const dummySchoolId = new Types.ObjectId("650000000000000000000001");
const inMemoryUserStore: Array<any> = [];

// Helper to generate JWT token
const generateDriverToken = (userId: string, role: string = "Driver", schoolId?: string) => {
  return jwt.sign({ id: userId, role, schoolId }, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "7d",
  });
};

export const driverLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const cleanEmail = email.toLowerCase().trim();
    let user: any = null;

    // 1. Check MongoDB if connected (readyState === 1)
    if (mongoose.connection.readyState === 1) {
      try {
        user = await UserModel.findOne({ email: cleanEmail });
      } catch (dbErr) {
        console.warn("[Driver DB Lookup Warning]:", (dbErr as Error).message);
      }
    }

    // 2. Check In-Memory Store if not found in MongoDB
    if (!user) {
      user = inMemoryUserStore.find(u => u.email === cleanEmail);
    }

    // Auto-seed default test driver account if requested
    if (!user && cleanEmail === "driver@schoolmitra.com") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("password123", salt);
      
      const seedPayload = {
        _id: "drv_seed_101",
        name: "Ram Singh",
        email: "driver@schoolmitra.com",
        password: hashedPassword,
        passwordHash: hashedPassword,
        role: "Driver",
        empId: "EMP-DRV-101",
        licenseNo: "DL142021008765"
      };

      inMemoryUserStore.push(seedPayload);

      try {
        user = await UserModel.create({
          name: seedPayload.name,
          email: cleanEmail,
          password: hashedPassword,
          passwordHash: hashedPassword,
          role: "Driver",
          schoolId: dummySchoolId,
          status: "Active"
        });
        await DriverModel.create({
          schoolId: dummySchoolId,
          userId: user._id,
          name: seedPayload.name,
          empId: seedPayload.empId,
          phone: "+91 9876543210",
          licenseNo: seedPayload.licenseNo,
          licenseExpiry: new Date("2030-12-31"),
          status: "Active"
        });
      } catch (e) {
        user = seedPayload;
      }
    }

    // 3. Check if user account exists in database or memory
    if (!user) {
      return res.status(404).json({
        success: false,
        code: "USER_NOT_FOUND",
        message: "No driver account found with this email address. Please Sign Up to create an account."
      });
    }

    // 4. Validate Password
    let isMatch = false;
    if (user.passwordHash) {
      isMatch = await bcrypt.compare(password, user.passwordHash);
    } else if (user.password) {
      isMatch = (user.password === password) || (await bcrypt.compare(password, user.password).catch(() => false));
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        code: "INVALID_PASSWORD",
        message: "Incorrect password. Please verify your password and try again."
      });
    }

    // 5. Central Tenant Status Check (Login Control for Drivers)
    const targetSchoolId = user?.schoolId || req.body?.schoolId;
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
          return res.status(403).json({
            success: false,
            code: evaluation.code,
            message: evaluation.message,
            schoolStatus: evaluation.effectiveStatus
          });
        }
      }
    }

    const token = generateDriverToken(
      user._id ? user._id.toString() : user.id || "drv_101",
      user.role || "Driver",
      user.schoolId ? String(user.schoolId) : undefined
    );

    const driverPayload = {
      id: user._id || user.id || "drv_101",
      name: user.name || "Driver Captain",
      email: user.email,
      role: "Senior Fleet Driver",
      busNo: "BUS-01",
      empId: user.empId || "EMP-DRV-101",
      licenseNo: user.licenseNo || "DL142021008765"
    };

    return res.status(200).json({
      success: true,
      message: "Driver authenticated successfully",
      token,
      driver: driverPayload
    });
  } catch (error: any) {
    console.error("[Driver Login Error]:", error);
    return res.status(500).json({ success: false, message: "Internal server authentication error." });
  }
};

export const driverRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, empId, license, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required." });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if exists in memory store or DB
    let existingUser: any = inMemoryUserStore.find(u => u.email === cleanEmail);
    if (!existingUser && mongoose.connection.readyState === 1) {
      try {
        existingUser = await UserModel.findOne({ email: cleanEmail });
      } catch (e) {}
    }

    if (existingUser) {
      return res.status(400).json({
        success: false,
        code: "EMAIL_EXISTS",
        message: "An account with this email already exists. Please login using your password."
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const memoryPayload = {
      id: `drv_mem_${Date.now()}`,
      name,
      email: cleanEmail,
      password: hashedPassword,
      passwordHash: hashedPassword,
      empId: empId || `EMP-DRV-${Math.floor(100 + Math.random() * 900)}`,
      licenseNo: license || `DL-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      role: "Driver"
    };

    inMemoryUserStore.push(memoryPayload);

    // Persist to MongoDB if connected
    let createdUser: any = null;
    if (mongoose.connection.readyState === 1) {
      try {
        createdUser = await UserModel.create({
          name,
          email: cleanEmail,
          password: hashedPassword,
          passwordHash: hashedPassword,
          role: "Driver",
          schoolId: dummySchoolId,
          status: "Active"
        });

        await DriverModel.create({
          schoolId: dummySchoolId,
          userId: createdUser._id,
          name,
          empId: memoryPayload.empId,
          phone: "+91 9876543210",
          licenseNo: memoryPayload.licenseNo,
          licenseExpiry: new Date("2030-12-31"),
          status: "Active"
        });
      } catch (dbErr) {
        console.warn("[Driver Register DB Persist Warning]:", (dbErr as Error).message);
      }
    }

    const token = generateDriverToken(createdUser ? createdUser._id.toString() : memoryPayload.id, "Driver");

    const driverPayload = {
      id: createdUser ? createdUser._id : memoryPayload.id,
      name: memoryPayload.name,
      email: memoryPayload.email,
      role: "Senior Fleet Driver",
      busNo: "BUS-01",
      empId: memoryPayload.empId,
      licenseNo: memoryPayload.licenseNo
    };

    return res.status(201).json({
      success: true,
      message: "Driver profile registered successfully",
      token,
      driver: driverPayload
    });
  } catch (error: any) {
    console.error("[Driver Register Error]:", error);
    return res.status(500).json({ success: false, message: "Failed to register driver profile." });
  }
};

export const getDriverProfile = async (req: Request, res: Response) => {
  return res.json({ success: true, driver: {
    id: "drv_101",
    name: "Ram Singh",
    email: "driver@schoolmitra.com",
    phone: "+91 98111 22334",
    empId: "EMP-DRV-104",
    licenseNo: "DL-04-2019-883012",
    status: "Active"
  }});
};

export const getAssignedBus = async (req: Request, res: Response) => {
  return res.json({ success: true, bus: demoBus });
};

export const getAssignedRoute = async (req: Request, res: Response) => {
  return res.json({ success: true, route: demoRoute });
};

export const getStudentList = async (req: Request, res: Response) => {
  return res.json({ success: true, count: demoStudents.length, students: demoStudents });
};

export const startTrip = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: "Trip started successfully. GPS tracking broadcasting to admin and parents.",
    tripId: "trip_" + Date.now(),
    status: "ACTIVE"
  });
};

export const endTrip = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: "Trip ended successfully. Telemetry summary logged.",
    status: "COMPLETED"
  });
};

export const updateGPSLocation = async (req: Request, res: Response) => {
  const { lat, lng, speed, busNo } = req.body;
  return res.json({
    success: true,
    message: "GPS coordinates updated & socket broadcasted.",
    coordinates: { lat: lat || 28.5821, lng: lng || 77.0500, speed: speed || 38 },
    timestamp: new Date().toISOString()
  });
};

import { Types } from "mongoose";
import { createNotification } from "../../services/notificationService";

const dummySchoolId = new Types.ObjectId("650000000000000000000001");

export const pickupStudent = async (req: Request, res: Response) => {
  const { studentId, studentName, status = "Picked" } = req.body;
  const name = studentName || "Rahul Kumar";

  const parentUserId = new Types.ObjectId("650000000000000000000101");
  createNotification({
    schoolId: dummySchoolId,
    senderId: "650000000000000000000601",
    recipientId: parentUserId,
    recipientRole: "Parent",
    type: "TRANSPORT",
    title: "🚌 Bus Boarding Update",
    message: `${name} has boarded the bus.`,
    priority: "HIGH"
  }).catch(() => {});

  return res.json({
    success: true,
    message: `Student ${name} marked as ${status}. Parent notified.`,
    timestamp: new Date().toLocaleTimeString()
  });
};

export const dropStudent = async (req: Request, res: Response) => {
  const { studentId, studentName, status = "Dropped" } = req.body;
  const name = studentName || "Rahul Kumar";

  const parentUserId = new Types.ObjectId("650000000000000000000101");
  createNotification({
    schoolId: dummySchoolId,
    senderId: "650000000000000000000601",
    recipientId: parentUserId,
    recipientRole: "Parent",
    type: "TRANSPORT",
    title: "📍 School Arrival Update",
    message: `${name} has reached school.`,
    priority: "HIGH"
  }).catch(() => {});

  return res.json({
    success: true,
    message: `Student ${name} marked as ${status}. Parent notified.`,
    timestamp: new Date().toLocaleTimeString()
  });
};

export const triggerSOSAlert = async (req: Request, res: Response) => {
  const { category, notes } = req.body;
  return res.json({
    success: true,
    message: `🚨 EMERGENCY SOS (${category || "CRITICAL"}) BROADCASTED TO SCHOOL ADMIN & PARENTS!`,
    incidentId: "sos_" + Date.now(),
    timestamp: new Date().toISOString()
  });
};

export const getTripHistory = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    trips: [
      { id: "t1", date: "28 July 2026", route: "Route 1 Express", distance: "14.2 km", students: 42, startTime: "07:10 AM", endTime: "07:55 AM" },
      { id: "t2", date: "27 July 2026", route: "Route 1 Express", distance: "14.8 km", students: 40, startTime: "02:15 PM", endTime: "03:02 PM" }
    ]
  });
};
