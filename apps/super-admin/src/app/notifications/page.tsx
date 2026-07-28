import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Super Admin System Alerts</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>System notifications for payment receipts, ticket updates, and cluster health.</p>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1rem', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--success)' }}>MongoDB Atlas Cluster Connected</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Connected to cluster schoolmitra.qztpv50.mongodb.net</div>
          </div>
        </div>
      </div>
    </div>
  );
}
