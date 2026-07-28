import { Ticket, Plus } from "lucide-react";

export default function CouponsPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Discount Coupons</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Promotional discount codes for onboarding sales campaigns.</p>
        </div>
        <button style={{ padding: '0.6rem 1.2rem', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
          Create Coupon
        </button>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <th style={{ padding: '0.75rem' }}>Coupon Code</th>
              <th style={{ padding: '0.75rem' }}>Discount %</th>
              <th style={{ padding: '0.75rem' }}>Expiry Date</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--primary)' }}>SCHOOL2026</td>
              <td style={{ padding: '1rem', fontWeight: 700 }}>20% OFF</td>
              <td style={{ padding: '1rem' }}>2026-12-31</td>
              <td style={{ padding: '1rem' }}><span className="badge badge-success">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
