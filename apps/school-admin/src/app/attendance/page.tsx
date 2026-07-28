import { CalendarCheck, CheckCircle2, XCircle } from "lucide-react";

export default function AttendancePage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Daily Attendance Engine</h1>
          <p>Mark and track daily attendance for Students, Teachers, and Non-Teaching Staff.</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Mark Attendance - Class 10-A (28 July 2026)</h3>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10-A-01</td>
              <td style={{ fontWeight: 700 }}>Aarav Sharma</td>
              <td><span className="badge badge-success">Present</span></td>
              <td><button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>Toggle Status</button></td>
            </tr>
            <tr>
              <td>10-A-02</td>
              <td style={{ fontWeight: 700 }}>Ananya Patel</td>
              <td><span className="badge badge-danger">Absent</span></td>
              <td><button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>Toggle Status</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
