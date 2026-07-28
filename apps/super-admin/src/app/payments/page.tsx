import { DollarSign } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>SaaS Payment Transactions</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Razorpay and bank transfer payment logs from onboarded schools.</p>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <th style={{ padding: '0.75rem' }}>Transaction ID</th>
              <th style={{ padding: '0.75rem' }}>School</th>
              <th style={{ padding: '0.75rem' }}>Amount</th>
              <th style={{ padding: '0.75rem' }}>Gateway</th>
              <th style={{ padding: '0.75rem' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', fontFamily: 'monospace' }}>TXN-990182</td>
              <td style={{ padding: '1rem', fontWeight: 700 }}>Delhi Public School</td>
              <td style={{ padding: '1rem', fontWeight: 700 }}>₹ 1,85,000</td>
              <td style={{ padding: '1rem' }}>Razorpay UPI</td>
              <td style={{ padding: '1rem' }}>2026-07-24</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
