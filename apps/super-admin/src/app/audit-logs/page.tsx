import { ShieldCheck } from "lucide-react";

export default function AuditLogsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Security Audit Trail</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Immutable security audit logs of all administrative actions.</p>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <th style={{ padding: '0.75rem' }}>Timestamp</th>
              <th style={{ padding: '0.75rem' }}>Admin User</th>
              <th style={{ padding: '0.75rem' }}>Action</th>
              <th style={{ padding: '0.75rem' }}>IP Address</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>2026-07-28 00:45:12</td>
              <td style={{ padding: '1rem', fontWeight: 700 }}>Rahul Sharma (HQ)</td>
              <td style={{ padding: '1rem' }}>Updated MongoDB Atlas connection URI</td>
              <td style={{ padding: '1rem', fontFamily: 'monospace' }}>103.68.31.131</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
