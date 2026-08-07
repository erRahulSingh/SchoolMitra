import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { UserModel, SchoolModel } from "../models/AuthSchemas";
import mongoose from "mongoose";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || "dummy_client_id");

// Helper to generate JWT
const generateToken = (userId: string, role: string) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "7d",
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, mobileNumber, schoolName, address } = req.body;

    if (!email || !password || !mobileNumber || !schoolName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // 1. Create School
      const schoolCode = `SCH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const newSchool = new SchoolModel({
        code: schoolCode,
        name: schoolName,
        phone: mobileNumber,
        email: email,
        address: address || "",
      });
      await newSchool.save({ session });

      // 2. Create User
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new UserModel({
        name: email.split("@")[0], // Default name
        email,
        password: hashedPassword,
        phone: mobileNumber,
        role: "SchoolAdmin",
        schoolId: newSchool._id,
      });
      await newUser.save({ session });

      await session.commitTransaction();
      session.endSession();

      const token = generateToken(newUser._id.toString(), newUser.role);
      return res.status(201).json({
        message: "Registration successful",
        token,
        user: { id: newUser._id, email: newUser.email, role: newUser.role },
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString(), user.role);
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, role: user.role, schoolId: user.schoolId },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { token } = req.body; // Token from Google
    // In a real app, verify token with googleClient
    // For demo/simulated payload:
    // const ticket = await googleClient.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });
    // const payload = ticket.getPayload();
    // For now we'll decode loosely if mock
    const payload = jwt.decode(token) as any;
    if (!payload || !payload.email) {
      return res.status(400).json({ message: "Invalid Google Token" });
    }

    const email = payload.email;
    const name = payload.name;
    const googleId = payload.sub;

    let user = await UserModel.findOne({ email });
    
    if (user) {
      // User exists, but is profile complete?
      if (!user.schoolId || !user.phone) {
        // Needs completion
        const appToken = generateToken(user._id.toString(), user.role);
        return res.status(200).json({
          message: "Profile incomplete",
          isProfileIncomplete: true,
          token: appToken,
        });
      }
      
      const appToken = generateToken(user._id.toString(), user.role);
      return res.status(200).json({
        message: "Login successful",
        isProfileIncomplete: false,
        token: appToken,
        user: { id: user._id, email: user.email, role: user.role },
      });
    } else {
      // New Google User
      user = new UserModel({
        name,
        email,
        googleId,
        role: "SchoolAdmin", // Default until completion
        isEmailVerified: true,
      });
      await user.save();
      const appToken = generateToken(user._id.toString(), user.role);
      return res.status(200).json({
        message: "Profile incomplete",
        isProfileIncomplete: true,
        token: appToken,
      });
    }
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const completeProfile = async (req: Request, res: Response) => {
  try {
    // Requires a valid JWT token in headers (usually done via middleware)
    // For simplicity we will assume userId is passed or decoded
    // In production, use authenticateToken middleware and req.user
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret") as any;
    
    const { mobileNumber, schoolName, address } = req.body;
    
    if (!mobileNumber || !schoolName) {
      return res.status(400).json({ message: "Mobile number and School name are required" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const user = await UserModel.findById(decoded.id).session(session);
      if (!user) throw new Error("User not found");

      const schoolCode = `SCH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const newSchool = new SchoolModel({
        code: schoolCode,
        name: schoolName,
        phone: mobileNumber,
        email: user.email,
        address: address || "",
      });
      await newSchool.save({ session });

      user.schoolId = newSchool._id;
      user.phone = mobileNumber;
      await user.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({
        message: "Profile completed successfully",
        user: { id: user._id, email: user.email, role: user.role, schoolId: user.schoolId },
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("Complete Profile Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
