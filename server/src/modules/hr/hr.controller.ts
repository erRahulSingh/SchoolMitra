import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { SalaryModel, LeaveRequestModel, ExpenseClaimModel } from "../../models/HRSchemas";
import { UserModel } from "../../models/AuthSchemas";
import { Types } from "mongoose";

// Helper to seed dynamic staff payroll if collection is empty
const getOrSeedPayroll = async () => {
  const salaries = await SalaryModel.find().populate("staffId", "name role dept email phone").lean();
  if (salaries.length > 0) {
    return salaries.map((s: any) => ({
      id: s._id.toString(),
      empId: s.staffId?._id?.toString() || "EMP-MOCK",
      name: s.staffId?.name || "Sunita Rao",
      role: s.staffId?.role || "Teacher",
      dept: "Academics",
      base: s.basicPay,
      hra: s.allowances * 0.7, // HRA allowance is 70% of allowances
      ta: s.allowances * 0.3,  // TA allowance is 30% of allowances
      pf: s.deductions,
      net: s.netSalary,
      month: s.month,
      status: s.status
    }));
  }

  // If no salary records exist, query active teachers and seed them
  const teachers = await UserModel.find({ role: { $in: ["Teacher", "Driver", "Accountant"] } }).lean();
  const dummySchoolId = new Types.ObjectId("507f1f77bcf86cd799439011");

  const seededSalaries = [];
  for (const t of teachers) {
    const base = t.role === "Teacher" ? 45000 : t.role === "Driver" ? 25000 : 40000;
    const allowances = t.role === "Teacher" ? 15000 : t.role === "Driver" ? 8000 : 12500;
    const deductions = Math.round(base * 0.12); // 12% PF
    const net = base + allowances - deductions;

    const record = await SalaryModel.create({
      schoolId: t.schoolId || dummySchoolId,
      staffId: t._id,
      month: "2026-07",
      year: 2026,
      basicPay: base,
      allowances,
      deductions,
      netSalary: net,
      status: "Paid",
      paymentMode: "BankTransfer"
    });

    seededSalaries.push({
      id: record._id.toString(),
      empId: t._id.toString(),
      name: t.name,
      role: t.role === "Teacher" ? "Senior Faculty" : t.role === "Driver" ? "Bus Pilot" : "Accountant",
      dept: t.role === "Driver" ? "Transport" : t.role === "Accountant" ? "Finance" : "Academics",
      base,
      hra: allowances * 0.7,
      ta: allowances * 0.3,
      pf: deductions,
      net,
      month: "2026-07",
      status: "Paid"
    });
  }

  // If even no teachers exist, fall back to seed teachers + salary
  if (seededSalaries.length === 0) {
    const mockTeachers = [
      { name: "Sunita Rao", role: "Teacher", email: "sunita@schoolmitra.com", phone: "+91 98111 22334" },
      { name: "Dr. Vikram Malhotra", role: "Teacher", email: "vikram@schoolmitra.com", phone: "+91 98222 33445" },
      { name: "Ramesh Sharma", role: "Accountant", email: "ramesh@schoolmitra.com", phone: "+91 98333 44556" },
      { name: "Ram Singh", role: "Driver", email: "ramsingh@schoolmitra.com", phone: "+91 98444 55667" }
    ];

    for (const mt of mockTeachers) {
      const newUser = await UserModel.create({
        name: mt.name,
        email: mt.email,
        password: "hashed_password",
        phone: mt.phone,
        role: mt.role,
        schoolId: dummySchoolId,
        isActive: true
      });

      const base = mt.role === "Teacher" ? 45000 : mt.role === "Driver" ? 25000 : 40000;
      const allowances = mt.role === "Teacher" ? 15000 : mt.role === "Driver" ? 8000 : 12500;
      const deductions = Math.round(base * 0.12);
      const net = base + allowances - deductions;

      const record = await SalaryModel.create({
        schoolId: dummySchoolId,
        staffId: newUser._id,
        month: "2026-07",
        year: 2026,
        basicPay: base,
        allowances,
        deductions,
        netSalary: net,
        status: "Paid"
      });

      seededSalaries.push({
        id: record._id.toString(),
        empId: newUser._id.toString(),
        name: mt.name,
        role: mt.role === "Teacher" ? "Senior Faculty" : mt.role === "Driver" ? "Bus Pilot" : "Accountant",
        dept: mt.role === "Driver" ? "Transport" : mt.role === "Accountant" ? "Finance" : "Academics",
        base,
        hra: allowances * 0.7,
        ta: allowances * 0.3,
        pf: deductions,
        net,
        month: "2026-07",
        status: "Paid"
      });
    }
  }

  return seededSalaries;
};

// ════════════ 1. GET PAYROLL LEDGER ════════════
export const getPayrollLedger = asyncHandler(async (_req: Request, res: Response) => {
  const payroll = await getOrSeedPayroll();
  return ApiResponse.success(res, 200, "Monthly payroll salary ledger", { payroll });
});

// ════════════ 2. SAVE PAYROLL RECORD ════════════
export const savePayrollRecord = asyncHandler(async (req: Request, res: Response) => {
  const { id, name, base, hra, ta, pf, dept, role } = req.body;
  const dummySchoolId = new Types.ObjectId("507f1f77bcf86cd799439011");

  const basicPay = Number(base) || 45000;
  const allowances = (Number(hra) || 0) + (Number(ta) || 0);
  const deductions = Number(pf) || Math.round(basicPay * 0.12);
  const netSalary = basicPay + allowances - deductions;

  if (id && id.startsWith("EMP-") === false && Types.ObjectId.isValid(id)) {
    // Edit existing record by ObjectId
    const record = await SalaryModel.findByIdAndUpdate(
      id,
      {
        basicPay,
        allowances,
        deductions,
        netSalary,
        status: "Paid"
      },
      { new: true }
    );
    return ApiResponse.success(res, 200, "Salary record updated in database", { record });
  } else {
    // Add new payroll record (Create staff first if name is new)
    let staff = await UserModel.findOne({ name, role: { $in: ["Teacher", "Driver", "Accountant"] } });
    if (!staff) {
      staff = await UserModel.create({
        name,
        email: `${name.toLowerCase().replace(/\s+/g, "")}@schoolmitra.com`,
        password: "hashed_password",
        role: dept === "Transport" ? "Driver" : dept === "Finance" ? "Accountant" : "Teacher",
        schoolId: dummySchoolId,
        isActive: true
      });
    }

    const record = await SalaryModel.create({
      schoolId: dummySchoolId,
      staffId: staff._id,
      month: "2026-07",
      year: 2026,
      basicPay,
      allowances,
      deductions,
      netSalary,
      status: "Paid"
    });

    return ApiResponse.success(res, 201, "New salary record created in database", { record });
  }
});

// ════════════ 3. DELETE PAYROLL RECORD ════════════
export const deletePayrollRecord = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (Types.ObjectId.isValid(id)) {
    await SalaryModel.findByIdAndDelete(id);
  }
  return ApiResponse.success(res, 200, "Salary record deleted successfully");
});

// ════════════ 4. GET LEAVE BALANCE LEDGERS ════════════
export const getLeaveLedgers = asyncHandler(async (_req: Request, res: Response) => {
  // Query teachers to build leave balance lists
  const staffMembers = await UserModel.find({ role: { $in: ["Teacher", "Driver", "Accountant"] } }).lean();
  
  const leaves = staffMembers.map((s, idx) => {
    const taken = idx % 2 === 0 ? 4 : 1;
    return {
      id: s._id.toString(),
      name: s.name,
      dept: s.role === "Driver" ? "Transport" : s.role === "Accountant" ? "Finance" : "Academics",
      casualLeave: `${12 - taken} / 12 Days`,
      sickLeave: `${8 - Math.round(taken/2)} / 8 Days`,
      earnedLeave: `15 / 15 Days`,
      totalTaken: `${taken} Days`
    };
  });

  return ApiResponse.success(res, 200, "Leave entitlement balance log", { leaves });
});

// ════════════ 5. GET EXPENSE CLAIMS ════════════
export const getExpenseClaims = asyncHandler(async (_req: Request, res: Response) => {
  let claims = await ExpenseClaimModel.find().lean();
  const dummySchoolId = new Types.ObjectId("507f1f77bcf86cd799439011");

  if (claims.length === 0) {
    const teachers = await UserModel.find({ role: { $in: ["Teacher", "Driver"] } }).limit(2).lean();
    if (teachers.length >= 2) {
      await ExpenseClaimModel.create([
        { schoolId: dummySchoolId, staffId: teachers[0]._id, name: teachers[0].name, category: "Science Exhibition Supplies", amount: 4500, date: "24 July 2026", status: "PENDING" },
        { schoolId: dummySchoolId, staffId: teachers[1]._id, name: teachers[1].name, category: "Emergency Bus Fuel Fill", amount: 2800, date: "26 July 2026", status: "APPROVED" }
      ]);
      claims = await ExpenseClaimModel.find().lean();
    }
  }

  const formatted = claims.map(c => ({
    id: c._id.toString(),
    name: c.name,
    category: c.category,
    amount: c.amount,
    date: c.date,
    status: c.status
  }));

  return ApiResponse.success(res, 200, "Expense reimbursement list", { claims: formatted });
});

// ════════════ 6. UPDATE CLAIM STATUS ════════════
export const updateExpenseClaimStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (Types.ObjectId.isValid(id)) {
    const claim = await ExpenseClaimModel.findByIdAndUpdate(id, { status }, { new: true });
    return ApiResponse.success(res, 200, "Reimbursement status updated", { claim });
  }
  return ApiResponse.success(res, 200, "Mock processed status updated");
});
