import { Server, Activity } from "lucide-react";

export default function ServerHealthPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Server Health & API Latency</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Node.js Express process CPU, memory usage, and Socket.IO heartbeat.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>API Status</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.2rem' }}>HTTP 200 Healthy</div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Process Memory</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>142 MB RAM</div>
        </div>
      </div>
    </div>
  );
}
