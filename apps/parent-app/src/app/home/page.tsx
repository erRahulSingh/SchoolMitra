import { CalendarCheck, Bus, CreditCard, Award, Bell } from "lucide-react";

export default function ParentHomePage() {
  return (
    <div style={{ padding: '1rem' }}>
      {/* Attendance & Today's Status */}
      <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.15))', border: '1px solid rgba(99,102,241,0.3)', padding: '1rem', borderRadius: '16px', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase' }}>TODAY'S ATTENDANCE</span>
          <span style={{ background: 'rgba(16,185,129,0.2)', color: 'var(--success)', padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700 }}>PRESENT</span>
        </div>
        <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.4rem' }}>Marked at 07:42 AM</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Classroom 10-A RFID Gate Entry</div>
      </div>

      {/* Today's Homework */}
      <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px', marginBottom: '1rem' }}>
        <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>📖 Today's Homework</div>
        <div style={{ fontSize: '0.8rem', color: '#fff' }}>Physics Lab Experiment #4 - Reflection & Refraction</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Due Date: Tomorrow • Assigned by Sunita Mehta</div>
      </div>

      {/* Bus Status */}
      <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>🚌 Morning Bus Route 1</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700 }}>ON ROUTE</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, marginTop: '0.35rem' }}>
          ETA to Home Stop: 07:45 AM (8 mins away)
        </div>
      </div>
    </div>
  );
}
