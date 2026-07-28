import { HardDrive } from "lucide-react";

export default function StorageUsagePage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>MongoDB Atlas & Storage Telemetry</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Atlas cluster collection metrics, index sizes, and file attachment storage.</p>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>Cluster: schoolmitra.qztpv50.mongodb.net</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Database: schoolmitra (14.2 MB / 512 MB Free Tier)</div>
      </div>
    </div>
  );
}
