import { LifeBuoy } from "lucide-react";

export default function SupportTicketsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Customer Support Tickets</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Help desk support requests submitted by School Admins.</p>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <th style={{ padding: '0.75rem' }}>Ticket ID</th>
              <th style={{ padding: '0.75rem' }}>School</th>
              <th style={{ padding: '0.75rem' }}>Subject</th>
              <th style={{ padding: '0.75rem' }}>Priority</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', fontFamily: 'monospace' }}>TCK-1092</td>
              <td style={{ padding: '1rem', fontWeight: 700 }}>GD Goenka School</td>
              <td style={{ padding: '1rem' }}>Request custom SMS gateway configuration</td>
              <td style={{ padding: '1rem' }}><span className="badge badge-warning">Medium</span></td>
              <td style={{ padding: '1rem' }}><span className="badge badge-success">Open</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
