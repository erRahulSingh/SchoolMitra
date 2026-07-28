import { ClipboardList, Plus } from "lucide-react";

export default function AssignmentsPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Subject Assignments & Grading</h1>
          <p>Evaluate term assignments, record marks, and publish teacher remarks.</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Assignment Title</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Max Marks</th>
              <th>Average Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 700 }}>Algebra & Quadratic Equations</td>
              <td>Mathematics</td>
              <td>Class 10-A</td>
              <td>50</td>
              <td><span className="badge badge-success">44.2 / 50</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
