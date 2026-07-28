import { Smartphone, Bell, CreditCard, MessageSquare, UserCheck } from "lucide-react";

export default function ParentAppPage() {
  return (
    <div style={{ padding: '160px 2rem 100px 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Parent Mobile App</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto' }}>
          Connect parents directly to their child's school life with real-time notifications, attendance, live bus tracking, and online fee payments.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <UserCheck size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Morning Attendance Notification</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Parents receive instant push notifications as soon as attendance is marked at school entrance or classroom.</p>
        </div>

        <div className="feature-card">
          <CreditCard size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Instant UPI Fee Payment</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Pay quarterly fees via Google Pay, PhonePe, Paytm, or Credit Card with instant downloadable PDF receipts.</p>
        </div>

        <div className="feature-card">
          <MessageSquare size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Direct Teacher Chat</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Communicate directly with class teachers, request leaves, and review homework assignments.</p>
        </div>
      </div>
    </div>
  );
}
