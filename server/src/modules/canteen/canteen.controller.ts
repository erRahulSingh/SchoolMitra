import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { StudentWallet, WalletTransaction, CanteenItem, CanteenOrder } from "../../models/CanteenSchemas";
import { createNotification } from "../../services/notificationService";

// ──────────── WALLET MANAGEMENT (Parents/Students) ────────────

export const getWalletBalance = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user.schoolId;
  const studentId = user.role === "Student" ? user.id : req.query.studentId;

  if (!studentId) {
    throw ApiError.badRequest("Student ID is required.");
  }

  let wallet = await StudentWallet.findOne({ studentId, schoolId });
  if (!wallet) {
    wallet = await StudentWallet.create({ studentId, schoolId, balance: 0 });
  }

  return ApiResponse.success(res, 200, "Wallet details fetched successfully.", wallet);
});

export const rechargeWallet = asyncHandler(async (req: Request, res: Response) => {
  const { amount, referenceId } = req.body;
  const user = (req as any).user;
  const schoolId = user.schoolId;
  const studentId = user.role === "Student" ? user.id : req.body.studentId;

  if (!amount || amount <= 0) {
    throw ApiError.badRequest("Invalid recharge amount.");
  }
  if (!studentId) {
    throw ApiError.badRequest("Student ID is required.");
  }

  let wallet = await StudentWallet.findOne({ studentId, schoolId });
  if (!wallet) {
    wallet = await StudentWallet.create({ studentId, schoolId, balance: 0 });
  }

  wallet.balance += Number(amount);
  await wallet.save();

  await WalletTransaction.create({
    schoolId,
    walletId: wallet._id,
    amount,
    type: "Credit",
    description: "Online Recharge",
    referenceId
  });

  // Push Notification: Recharge successful
  await createNotification({
    schoolId: schoolId.toString(),
    senderId: user.id.toString(),
    recipientId: studentId.toString(),
    recipientRole: "Parent",
    type: "FEE",
    title: "Wallet Recharged 💳",
    message: `₹${amount} has been successfully credited to your child's canteen wallet.`
  }).catch(() => {});

  return ApiResponse.success(res, 200, "Wallet recharged successfully.", { balance: wallet.balance });
});

// ──────────── CANTEEN INVENTORY (Admin) ────────────

export const addCanteenItem = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user.schoolId;
  const item = await CanteenItem.create({ ...req.body, schoolId });
  return ApiResponse.created(res, "Canteen item added.", item);
});

export const getCanteenItems = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const schoolId = user.schoolId;
  const items = await CanteenItem.find({ schoolId, isAvailable: true });
  return ApiResponse.success(res, 200, "Canteen inventory fetched.", items);
});

// ──────────── POS / ORDERING (Canteen Staff / RFID tap) ────────────

export const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  const { studentId, items } = req.body; // items: [{ itemId, quantity }]
  const user = (req as any).user;
  const schoolId = user.schoolId;
  const servedBy = user.id;

  if (!studentId || !items || items.length === 0) {
    throw ApiError.badRequest("Student ID and items are required.");
  }

  const wallet = await StudentWallet.findOne({ studentId, schoolId });
  if (!wallet || wallet.status === "Frozen") {
    throw ApiError.badRequest("Wallet is inactive or frozen.");
  }

  let totalAmount = 0;
  const orderItems = [];

  for (let i of items) {
    const canteenItem = await CanteenItem.findOne({ _id: i.itemId, schoolId, isAvailable: true });
    if (!canteenItem) throw ApiError.badRequest(`Item ${i.itemId} is unavailable.`);
    if (canteenItem.stockCount < i.quantity) throw ApiError.badRequest(`Not enough stock for ${canteenItem.name}.`);

    const price = canteenItem.price * i.quantity;
    totalAmount += price;
    
    orderItems.push({ itemId: canteenItem._id, quantity: i.quantity, price });
    
    canteenItem.stockCount -= i.quantity;
    await canteenItem.save();
  }

  if (wallet.balance < totalAmount) {
    throw ApiError.badRequest("Insufficient wallet balance.");
  }

  // Deduct from wallet
  wallet.balance -= totalAmount;
  await wallet.save();

  // Create Order
  const order = await CanteenOrder.create({
    schoolId,
    studentId,
    items: orderItems,
    totalAmount,
    servedBy
  });

  // Log Transaction
  await WalletTransaction.create({
    schoolId,
    walletId: wallet._id,
    amount: totalAmount,
    type: "Debit",
    description: `Canteen Purchase (Order ${order._id})`
  });

  // Push Notification: Order placed
  await createNotification({
    schoolId: schoolId.toString(),
    senderId: user.id.toString(),
    recipientId: studentId.toString(),
    recipientRole: "Parent",
    type: "FEE",
    title: "Canteen Purchase 🍔",
    message: `₹${totalAmount} has been deducted from the canteen wallet for a recent purchase.`
  }).catch(() => {});

  // Low Balance Alert
  if (wallet.balance < 100) {
    await createNotification({
      schoolId: schoolId.toString(),
      senderId: user.id.toString(),
      recipientId: studentId.toString(),
      recipientRole: "Parent",
      type: "FEE",
      title: "⚠️ Low Wallet Balance",
      message: `Your child's canteen wallet balance is running low (₹${wallet.balance}). Please recharge soon.`,
      priority: "HIGH"
    }).catch(() => {});
  }

  return ApiResponse.created(res, "Order placed successfully. Amount deducted.", order);
});
