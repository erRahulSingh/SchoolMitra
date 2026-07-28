import { Briefcase, DollarSign, Calendar } from "lucide-react";

export default function HrPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>HR, Staff & Payroll Management</h1>
          <p>Staff records, salary slips, leave requests, attendance, and official documents.</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Role / Designation</th>
              <th>Department</th>
              <th>Monthly Net Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 700 }}>Sunita Mehta</td>
              <td>Senior Physics Faculty</td>
              <td>Academics</td>
              <td style={{ fontWeight: 700 }}>₹ 55,000</td>
              <td><button className="btn btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>Generate Payslip</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
