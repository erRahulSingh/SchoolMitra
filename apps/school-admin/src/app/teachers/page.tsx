import { UserCheck, BookOpen, DollarSign, CalendarCheck } from "lucide-react";

export default function TeachersPage() {
  const teachers = [
    { id: "TCH-01", name: "Sunita Mehta", subject: "Physics & Science", classTeacher: "Class 10-A", phone: "+91 98999 11223", salary: "₹ 55,000", attendance: "98.5%" },
    { id: "TCH-02", name: "Vikram Malhotra", subject: "Mathematics", classTeacher: "Class 9-B", phone: "+91 98888 22334", salary: "₹ 58,000", attendance: "100%" }
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Teachers & Faculty Directory</h1>
          <p>Teacher profiles, subject allocation, timetable, salary payroll, and performance records.</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Teacher</th>
              <th>Subject</th>
              <th>Class Teacher Of</th>
              <th>Phone</th>
              <th>Attendance</th>
              <th>Monthly Salary</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(t => (
              <tr key={t.id}>
                <td style={{ fontWeight: 700 }}>{t.name}</td>
                <td><span className="badge badge-info">{t.subject}</span></td>
                <td>{t.classTeacher}</td>
                <td>{t.phone}</td>
                <td style={{ fontWeight: 700, color: 'var(--success)' }}>{t.attendance}</td>
                <td style={{ fontWeight: 700 }}>{t.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
