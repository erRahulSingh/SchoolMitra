import { Award, Plus, Download } from "lucide-react";

export default function ExamsPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Examinations & Report Cards</h1>
          <p>Exam schedules, marks entry, automated grade calculation, and report card generation.</p>
        </div>
        <button className="btn btn-primary"><Plus size={16} /> Schedule New Exam</button>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Academic Term</th>
              <th>Class</th>
              <th>Start Date</th>
              <th>Result Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 700 }}>Mid-Term Science Exam 2026</td>
              <td>Term 1</td>
              <td>Class 10-A</td>
              <td>2026-08-14</td>
              <td><span className="badge badge-warning">Marks Entry Pending</span></td>
              <td><button className="btn btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>Marks Entry</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
