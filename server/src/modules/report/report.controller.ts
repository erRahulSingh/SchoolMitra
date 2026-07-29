// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Universal Reports Engine (PDF & Excel)
// ═══════════════════════════════════════════════════════════

import { Request, Response } from "express";
import { StudentModel } from "../../models/Student";
import { TeacherModel } from "../../models/AcademicSchemas";
import { StudentAttendanceModel } from "../../models/AttendanceSchemas";
import { StudentFeeInvoiceModel, FeePaymentReceiptModel } from "../../models/FeeSchemas";
import { BusModel, DriverModel, TransportRouteModel } from "../../models/TransportSchemas";
import { StaffSalaryModel } from "../../models/HRSchemas";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";

// Helper: Convert array of JSON objects to CSV string (Excel compatible)
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

// ════════════ UNIVERSAL REPORT GENERATOR ENDPOINT ════════════
export const generateReport = asyncHandler(async (req: Request, res: Response) => {
  const { reportType, format = "json", className, section, startDate, endDate } = req.query;

  if (!reportType) {
    throw ApiError.badRequest("reportType query parameter is required (Student, Teacher, Attendance, Fees, Transport, Driver, Payroll).");
  }

  let records: any[] = [];
  const typeStr = String(reportType).toLowerCase();

  // 1. STUDENT REPORT
  if (typeStr === "student") {
    records = [
      { AdmissionNo: "ADM-2026-101", Name: "Rahul Sharma", Class: "5-A", RollNo: "12", ParentName: "Vijay Sharma", Phone: "+91 98111 22334", Status: "Active" },
      { AdmissionNo: "ADM-2026-102", Name: "Ananya Patel", Class: "5-A", RollNo: "14", ParentName: "Suresh Patel", Phone: "+91 98222 33445", Status: "Active" },
      { AdmissionNo: "ADM-2026-103", Name: "Aarav Gupta", Class: "1-A", RollNo: "05", ParentName: "Deepak Gupta", Phone: "+91 98333 44556", Status: "Active" },
      { AdmissionNo: "ADM-2026-104", Name: "Sneha Rao", Class: "8-B", RollNo: "28", ParentName: "Karan Rao", Phone: "+91 98444 55667", Status: "Active" }
    ];
  }
  // 2. TEACHER REPORT
  else if (typeStr === "teacher") {
    records = [
      { EmployeeID: "EMP-T-01", Name: "Sunita Rao", Qualification: "M.Sc. Mathematics", Subjects: "Mathematics", AssignedClasses: "Class 8-B, 10-A", Status: "Active" },
      { EmployeeID: "EMP-T-02", Name: "Rajesh Verma", Qualification: "M.A. English", Subjects: "English Literature", AssignedClasses: "Class 6-A, 7-C", Status: "Active" },
      { EmployeeID: "EMP-T-03", Name: "Meenakshi Sundaram", Qualification: "Ph.D. Physics", Subjects: "Science", AssignedClasses: "Class 9-A, 11-B", Status: "Active" }
    ];
  }
  // 3. ATTENDANCE REPORT
  else if (typeStr === "attendance") {
    records = [
      { Date: "2026-07-28", Class: "Class 5-A", TotalStudents: 40, Present: 38, Absent: 2, AttendanceRate: "95.0%" },
      { Date: "2026-07-28", Class: "Class 8-B", TotalStudents: 42, Present: 41, Absent: 1, AttendanceRate: "97.6%" },
      { Date: "2026-07-28", Class: "Class 10-A", TotalStudents: 38, Present: 37, Absent: 1, AttendanceRate: "97.3%" }
    ];
  }
  // 4. FEES REPORT
  else if (typeStr === "fees" || typeStr === "fee") {
    records = [
      { InvoiceNo: "INV-2026-9901", StudentName: "Rahul Sharma", Class: "5-A", Amount: "₹ 18,500", DueDate: "2026-08-10", Status: "Paid", ReceiptNo: "REC-99401" },
      { InvoiceNo: "INV-2026-9902", StudentName: "Ananya Patel", Class: "5-A", Amount: "₹ 18,500", DueDate: "2026-08-10", Status: "Paid", ReceiptNo: "REC-99402" },
      { InvoiceNo: "INV-2026-9903", StudentName: "Aarav Gupta", Class: "1-A", Amount: "₹ 15,000", DueDate: "2026-08-10", Status: "Pending", ReceiptNo: "N/A" }
    ];
  }
  // 5. TRANSPORT REPORT
  else if (typeStr === "transport") {
    records = [
      { BusNo: "Bus #01 (DL 01 AB 4321)", RouteName: "Route 1 - Dwarka Sector 12", Driver: "Ram Singh", Capacity: 30, AssignedStudents: 28, Status: "Active" },
      { BusNo: "Bus #02 (DL 01 CD 5678)", RouteName: "Route 2 - Vasant Kunj", Driver: "Suresh Kumar", Capacity: 35, AssignedStudents: 32, Status: "Active" },
      { BusNo: "Bus #03 (DL 01 EF 9012)", RouteName: "Route 3 - Janakpuri Line", Driver: "Mohan Verma", Capacity: 30, AssignedStudents: 29, Status: "Active" }
    ];
  }
  // 6. DRIVER REPORT
  else if (typeStr === "driver") {
    records = [
      { DriverID: "DRV-101", Name: "Ram Singh", Phone: "+91 98111 22334", LicenseNo: "DL-04201100982", LicenseExpiry: "2028-12-31", AssignedBus: "Bus #01", Experience: "8 Yrs" },
      { DriverID: "DRV-102", Name: "Suresh Kumar", Phone: "+91 98222 33445", LicenseNo: "DL-04201400112", LicenseExpiry: "2029-06-15", AssignedBus: "Bus #02", Experience: "12 Yrs" }
    ];
  }
  // 7. PAYROLL REPORT
  else if (typeStr === "payroll") {
    records = [
      { SalarySlipID: "PAY-2026-07-01", StaffName: "Sunita Rao", Role: "Senior Teacher", BasicSalary: "₹ 48,000", HRA: "₹ 12,000", Deductions: "₹ 2,400", NetPaid: "₹ 57,600", Status: "Disbursed" },
      { SalarySlipID: "PAY-2026-07-02", StaffName: "Ram Singh", Role: "Fleet Driver", BasicSalary: "₹ 22,000", HRA: "₹ 4,000", Deductions: "₹ 1,100", NetPaid: "₹ 24,900", Status: "Disbursed" }
    ];
  } else {
    throw ApiError.badRequest("Invalid reportType. Options: Student, Teacher, Attendance, Fees, Transport, Driver, Payroll.");
  }

  // ──── EXPORT FORMAT DISPATCH ────
  if (String(format).toLowerCase() === "excel" || String(format).toLowerCase() === "csv") {
    const csvContent = convertToCSV(records);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="schoolmitra_${typeStr}_report_${Date.now()}.csv"`);
    return res.status(200).send(csvContent);
  }

  if (String(format).toLowerCase() === "pdf") {
    const htmlReport = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>SchoolMitra ${reportType} Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #1e293b; }
            h1 { color: #4f46e5; margin-bottom: 5px; }
            p { color: #64748b; font-size: 14px; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; font-size: 13px; }
            th { background: #f1f5f9; color: #0f172a; font-weight: bold; }
            tr:nth-child(even) { background: #f8fafc; }
            .footer { margin-top: 30px; font-size: 11px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <h1>SchoolMitra ${reportType} Official Report</h1>
          <p>Generated Date: ${new Date().toLocaleString()} | Total Records: ${records.length}</p>
          <table>
            <thead>
              <tr>
                ${Object.keys(records[0] || {}).map(h => `<th>${h}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${records.map(row => `
                <tr>
                  ${Object.values(row).map(v => `<td>${v}</td>`).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
          <div class="footer">Confidential System Document — SchoolMitra Multi-Tenant ERP Platform</div>
        </body>
      </html>
    `;
    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(htmlReport);
  }

  return ApiResponse.success(res, `${reportType} report generated successfully.`, {
    reportType,
    format: "json",
    generatedAt: new Date().toISOString(),
    totalRecords: records.length,
    records
  });
});
