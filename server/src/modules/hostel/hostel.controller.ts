// @ts-nocheck
import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { Hostel, HostelRoom, HostelAllocation, GatePass } from "../../models/HostelSchemas";

// ──────────── HOSTEL ADMIN / WARDEN ────────────

export const createHostel = asyncHandler(async (req: any, res: any) => {
  const schoolId = req.user?.schoolId;
  const hostel = await Hostel.create({ ...req.body, schoolId });
  res.status(201).json(new ApiResponse(201, hostel, "Hostel created successfully."));
});

export const getHostels = asyncHandler(async (req: any, res: any) => {
  const schoolId = req.user?.schoolId;
  const hostels = await Hostel.find({ schoolId }).populate("wardenId", "name email");
  res.status(200).json(new ApiResponse(200, hostels, "Hostels fetched successfully."));
});

export const addRoom = asyncHandler(async (req: any, res: any) => {
  const schoolId = req.user?.schoolId;
  const room = await HostelRoom.create({ ...req.body, schoolId });
  res.status(201).json(new ApiResponse(201, room, "Room added successfully."));
});

export const getRooms = asyncHandler(async (req: any, res: any) => {
  const { hostelId } = req.params;
  const schoolId = req.user?.schoolId;
  const rooms = await HostelRoom.find({ schoolId, hostelId });
  res.status(200).json(new ApiResponse(200, rooms, "Rooms fetched successfully."));
});

export const allocateRoom = asyncHandler(async (req: any, res: any) => {
  const { studentId, hostelId, roomId } = req.body;
  const schoolId = req.user?.schoolId;

  const room = await HostelRoom.findOne({ _id: roomId, schoolId, hostelId });
  if (!room) throw ApiError.notFound("Room not found.");

  if (room.occupiedBeds >= room.bedCapacity) {
    throw ApiError.badRequest("Room is already full.");
  }

  // Check if student already has an active allocation
  const existing = await HostelAllocation.findOne({ studentId, schoolId, status: "Active" });
  if (existing) throw ApiError.badRequest("Student is already allocated to a room.");

  const allocation = await HostelAllocation.create({ schoolId, studentId, hostelId, roomId });
  
  room.occupiedBeds += 1;
  await room.save();

  res.status(201).json(new ApiResponse(201, allocation, "Room allocated successfully."));
});

// ──────────── STUDENT / PARENT ────────────

export const requestGatePass = asyncHandler(async (req: any, res: any) => {
  const { reason, outTime, expectedInTime } = req.body;
  const schoolId = req.user?.schoolId;
  
  // If user is parent, they should provide studentId, otherwise extract from student auth
  const studentId = req.user?.role === "Student" ? req.user.userId : req.body.studentId;

  if (!studentId) throw ApiError.badRequest("Student ID is required.");

  const gatePass = await GatePass.create({
    schoolId,
    studentId,
    reason,
    outTime: new Date(outTime),
    expectedInTime: new Date(expectedInTime)
  });

  res.status(201).json(new ApiResponse(201, gatePass, "Gate pass requested successfully."));
});

export const getGatePasses = asyncHandler(async (req: any, res: any) => {
  const schoolId = req.user?.schoolId;
  const role = req.user?.role;
  let query: any = { schoolId };

  if (role === "Student") {
    query.studentId = req.user?.userId;
  } else if (role === "Parent") {
    query.studentId = req.query.studentId; 
  }

  const passes = await GatePass.find(query).sort({ createdAt: -1 }).populate("studentId", "name admissionNo");
  res.status(200).json(new ApiResponse(200, passes, "Gate passes fetched."));
});

// ──────────── WARDEN ────────────

export const approveGatePass = asyncHandler(async (req: any, res: any) => {
  const { passId } = req.params;
  const { status } = req.body; // Approved or Rejected
  const schoolId = req.user?.schoolId;
  const wardenId = req.user?.userId;

  if (!["Approved", "Rejected", "Returned"].includes(status)) {
    throw ApiError.badRequest("Invalid status update.");
  }

  const pass = await GatePass.findOneAndUpdate(
    { _id: passId, schoolId },
    { status, approvedBy: wardenId, ...(status === "Returned" ? { actualInTime: new Date() } : {}) },
    { new: true }
  );

  if (!pass) throw ApiError.notFound("Gate pass not found.");

  res.status(200).json(new ApiResponse(200, pass, `Gate pass marked as ${status}.`));
});
