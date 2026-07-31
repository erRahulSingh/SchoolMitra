// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Enterprise Reports & Analytics Engine (Phase 12)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

const convertToCSV = (data: any[]): string => {
  if (!data || data.length === 0) return "";
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","),
    ...data.map(row =>
      headers
        .map(fieldName => {
          const val = row[fieldName] !== undefined && row[fieldName] !== null ? String(row[fieldName]) : "";
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(",")
    )
  ];
  return csvRows.join("\n");
};

// ════════════ 1. ATTENDANCE MASTER REPORT ════════════
export const getAttendanceReportMaster = asyncHandler(async (req: Request, res: Response) => {
  const { format = "json", month = "July 2026", classId = "Class 10" } = req.query;

  const data = [
    { Date: "2026-07-01", Class: "10-A", Enrolled: 40, Present: 38, Absent: 2, Rate: "95.0%" },
    { Date: "2026-07-02", Class: "10-A", Enrolled: 40, Present: 39, Absent: 1, Rate: "97.5%" },
    { Date: "2026-07-03", Class: "10-A", Enrolled: 40, Present: 37, Absent: 3, Rate: "92.5%" }
  ];

  if (format === "csv") {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=attendance_report_${Date.now()}.csv`);
    return res.status(200).send(convertToCSV(data));
  }

  return ApiResponse.success(res, 200, "Attendance master report generated", { month, classId, records: data });
});

// ════════════ 2. EXAM MARKSHEET REPORT ════════════
export const getExamReportMaster = asyncHandler(async (req: Request, res: Response) => {
  const { format = "json", examId = "EXM-2026-MID", classId = "Class 10" } = req.query;

  const data = [
    { RollNo: "10-A-01", StudentName: "Aarav Sharma", Class: "10-A", Maths: 98, Physics: 92, English: 95, Total: 469, Rank: 2, Grade: "A+" },
    { RollNo: "10-A-02", StudentName: "Ananya Patel", Class: "10-A", Maths: 95, Physics: 88, English: 92, Total: 450, Rank: 5, Grade: "A+" }
  ];

  if (format === "csv") {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=exam_report_${Date.now()}.csv`);
    return res.status(200).send(convertToCSV(data));
  }

  return ApiResponse.success(res, 200, "Exam performance report generated", { examId, classId, records: data });
});

// ════════════ 3. FEES FINANCIAL REPORT ════════════
export const getFeesReportMaster = asyncHandler(async (req: Request, res: Response) => {
  const { format = "json" } = req.query;

  const data = [
    { ReceiptNo: "REC-99401", StudentName: "Aarav Sharma", Class: "10-A", AmountPaid: "₹ 22,500", BaseAmount: "₹ 19,068", GST: "₹ 3,432", PaymentMode: "UPI", Status: "Paid" },
    { ReceiptNo: "REC-99402", StudentName: "Ananya Patel", Class: "10-A", AmountPaid: "₹ 22,500", BaseAmount: "₹ 19,068", GST: "₹ 3,432", PaymentMode: "NetBanking", Status: "Paid" }
  ];

  if (format === "csv") {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=fees_report_${Date.now()}.csv`);
    return res.status(200).send(convertToCSV(data));
  }

  return ApiResponse.success(res, 200, "Fees financial ledger report generated", { records: data });
});

// ════════════ 4. TRANSPORT FLEET REPORT ════════════
export const getTransportReportMaster = asyncHandler(async (req: Request, res: Response) => {
  const { format = "json" } = req.query;

  const data = [
    { BusNo: "Bus #01", Registration: "DL 01 AB 4321", Route: "Route 1 - Dwarka", Driver: "Ram Singh", Capacity: 42, Occupancy: "28 Students", Status: "Operational" },
    { BusNo: "Bus #02", Registration: "DL 01 CD 5678", Route: "Route 2 - Vasant Kunj", Driver: "Suresh Kumar", Capacity: 42, Occupancy: "32 Students", Status: "Operational" }
  ];

  if (format === "csv") {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=transport_report_${Date.now()}.csv`);
    return res.status(200).send(convertToCSV(data));
  }

  return ApiResponse.success(res, 200, "Transport fleet report generated", { records: data });
});

// ════════════ 5. STUDENT MASTER DIRECTORY REPORT ════════════
export const getStudentsReportMaster = asyncHandler(async (req: Request, res: Response) => {
  const { format = "json" } = req.query;

  const data = [
    { AdmissionNo: "ADM-2026-101", Name: "Aarav Sharma", Class: "10-A", RollNo: "10-A-01", ParentName: "Rajesh Sharma", Phone: "+91 98765 43210", Status: "Active" },
    { AdmissionNo: "ADM-2026-102", Name: "Ananya Patel", Class: "10-A", RollNo: "10-A-02", ParentName: "Suresh Patel", Phone: "+91 98123 45678", Status: "Active" }
  ];

  if (format === "csv") {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=student_master_${Date.now()}.csv`);
    return res.status(200).send(convertToCSV(data));
  }

  return ApiResponse.success(res, 200, "Student master directory report generated", { records: data });
});

// ════════════ 6. TEACHER MASTER DIRECTORY REPORT ════════════
export const getTeachersReportMaster = asyncHandler(async (req: Request, res: Response) => {
  const { format = "json" } = req.query;

  const data = [
    { TeacherID: "TCH-01", Name: "Sunita Mehta", Subject: "Physics", Phone: "+91 98111 22334", Classes: "10-A, 12-B", Salary: "₹ 55,000", Status: "Active" },
    { TeacherID: "TCH-02", Name: "Vikram Malhotra", Subject: "Mathematics", Phone: "+91 98222 33445", Classes: "9-A, 10-B", Salary: "₹ 58,000", Status: "Active" }
  ];

  if (format === "csv") {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=teacher_master_${Date.now()}.csv`);
    return res.status(200).send(convertToCSV(data));
  }

  return ApiResponse.success(res, 200, "Teacher master directory report generated", { records: data });
});

export const generateReport = asyncHandler(async (req: Request, res: Response) => {
  return ApiResponse.success(res, 200, "Universal report engine active.", { query: req.query });
});
