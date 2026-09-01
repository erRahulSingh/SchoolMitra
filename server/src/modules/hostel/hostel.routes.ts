// @ts-nocheck
import { Router } from "express";
import { 
  createHostel, getHostels, 
  addRoom, getRooms, allocateRoom, 
  requestGatePass, getGatePasses, approveGatePass 
} from "./hostel.controller";
import { authenticate, requireRole } from "../../middleware/authenticates";

const router = Router();

// Protect all routes
router.use(authenticate);

// ──────────── HOSTEL / ROOM MANAGEMENT (Admins) ────────────
router.post("/", requireRole("SchoolAdmin"), createHostel);
router.get("/", getHostels);

router.post("/rooms", requireRole("SchoolAdmin", "Teacher"), addRoom);
router.get("/:hostelId/rooms", getRooms);

router.post("/allocate", requireRole("SchoolAdmin", "Teacher"), allocateRoom);

// ──────────── GATE PASS MANAGEMENT ────────────
router.post("/gate-pass", requireRole("Student", "Parent"), requestGatePass);
router.get("/gate-pass", getGatePasses);
router.patch("/gate-pass/:passId/status", requireRole("SchoolAdmin", "Teacher"), approveGatePass);

export default router;
