import { BookOpen, Calendar, Clock } from "lucide-react";

export default function AcademicsPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Academics, Class & Timetable Setup</h1>
          <p>Manage classes, sections, subjects, periods, and weekly master timetable schedules.</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Class 10-A Timetable Grid</h3>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Time</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Period 1</td>
              <td>08:00 AM - 08:45 AM</td>
              <td>Mathematics (Vikram)</td>
              <td>Physics (Sunita)</td>
              <td>English (Anil)</td>
            </tr>
            <tr>
              <td>Period 2</td>
              <td>08:45 AM - 09:30 AM</td>
              <td>Physics (Sunita)</td>
              <td>Chemistry (Rekha)</td>
              <td>Mathematics (Vikram)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
