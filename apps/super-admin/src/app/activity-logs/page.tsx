import { Activity } from "lucide-react";

export default function ActivityLogsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Real-time System Activity Logs</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Socket.IO real-time stream of all system events.</p>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>[SOCKET.IO]</span> Driver Ram Singh started morning trip for Bus #DL 01 AB 4321 • <span style={{ color: 'var(--text-muted)' }}>2 mins ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
