import { Building2, ShieldCheck, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div style={{ padding: '160px 2rem 100px 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>About SchoolMitra</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto' }}>
          Empowering schools worldwide with seamless ERP operations, transparent fee accounting, and real-time student safety telemetry.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>500+</div>
          <div style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Schools Trusting SchoolMitra</div>
        </div>
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--secondary)' }}>2.5 Lakhs+</div>
          <div style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Active Students Managed</div>
        </div>
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)' }}>1,800+</div>
          <div style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>School Buses Tracked Live</div>
        </div>
      </div>
    </div>
  );
}
