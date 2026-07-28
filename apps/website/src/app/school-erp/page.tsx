import { GraduationCap, Users, Calendar, Award, CreditCard, BookOpen } from "lucide-react";

export default function SchoolErpPage() {
  return (
    <div style={{ padding: '160px 2rem 100px 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>School ERP Admin Panel</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto' }}>
          The heart of school administration. Manage admissions, student records, fee collection, examinations, staff payroll, and daily attendance in one platform.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <GraduationCap size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Admissions & Student Management</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Digital admission forms, document upload, student transfer certificates, medical history, and roll number generation.</p>
        </div>

        <div className="feature-card">
          <Calendar size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Daily Class Attendance</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Instant morning attendance marking for students and teachers with automated absent SMS dispatch to parents.</p>
        </div>

        <div className="feature-card">
          <CreditCard size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Fee Invoicing & Accounting</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Flexible fee structures, automatic quarterly invoice generation, Razorpay/UPI gateway integration, and due reports.</p>
        </div>

        <div className="feature-card">
          <Award size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Exams & Report Cards</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Exam schedules, marks entry, automated CBSE grade calculation, and downloadable PDF report cards.</p>
        </div>
      </div>
    </div>
  );
}
