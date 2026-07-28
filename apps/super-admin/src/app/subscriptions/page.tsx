import { CreditCard, CheckCircle } from "lucide-react";

export default function SubscriptionsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Active SaaS Subscriptions</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Track active renewals, billing cycles, and SaaS plan tier upgrades.</p>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <th style={{ padding: '0.75rem' }}>Tenant</th>
              <th style={{ padding: '0.75rem' }}>Tier Plan</th>
              <th style={{ padding: '0.75rem' }}>Renewal Date</th>
              <th style={{ padding: '0.75rem' }}>Cycle</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', fontWeight: 700 }}>Delhi Public School</td>
              <td style={{ padding: '1rem' }}><span className="badge badge-warning">Enterprise</span></td>
              <td style={{ padding: '1rem' }}>2026-08-30</td>
              <td style={{ padding: '1rem' }}>Annual</td>
              <td style={{ padding: '1rem' }}><span className="badge badge-success">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
