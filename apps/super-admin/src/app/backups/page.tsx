import { Database, Download, Plus } from "lucide-react";

export default function BackupsPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Database Backups & Snapshots</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Automated daily MongoDB Atlas backup snapshots.</p>
        </div>
        <button style={{ padding: '0.6rem 1.2rem', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} /> Create Manual Backup
        </button>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <th style={{ padding: '0.75rem' }}>Backup ID</th>
              <th style={{ padding: '0.75rem' }}>Timestamp</th>
              <th style={{ padding: '0.75rem' }}>Size</th>
              <th style={{ padding: '0.75rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', fontFamily: 'monospace' }}>BKP-2026-07-28-01</td>
              <td style={{ padding: '1rem' }}>2026-07-28 00:00:00</td>
              <td style={{ padding: '1rem' }}>14.2 MB</td>
              <td style={{ padding: '1rem' }}>
                <button style={{ padding: '0.35rem 0.65rem', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.75rem', cursor: 'pointer' }}>
                  Download MongoDump
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
