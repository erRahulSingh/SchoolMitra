import { Router } from "express";
import { 
  getWalletBalance, rechargeWallet, 
  addCanteenItem, getCanteenItems, placeOrder 
} from "./canteen.controller";
import { authenticate, requireRole } from "../../middleware/authGuards";

const router = Router();

// Protect all routes
router.use(authenticate);

// ──────────── WALLET MANAGEMENT ────────────
router.get("/wallet", requireRole("Student", "Parent"), getWalletBalance);
router.post("/wallet/recharge", requireRole("Parent", "Student"), rechargeWallet);

// ──────────── INVENTORY MANAGEMENT ────────────
router.get("/items", getCanteenItems);
router.post("/items", requireRole("SchoolAdmin"), addCanteenItem);

// ──────────── CANTEEN POS ────────────
router.post("/order", requireRole("SchoolAdmin", "Teacher"), placeOrder);

export default router;
