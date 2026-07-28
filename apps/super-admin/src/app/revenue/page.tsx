import { TrendingUp, DollarSign } from "lucide-react";

export default function RevenuePage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Revenue Breakdown (MRR / ARR)</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Comprehensive revenue analytics across subscription plans.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Annual Run Rate (ARR)</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.2rem', color: 'var(--primary)' }}>₹ 55.08 Lakhs</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Average Revenue Per School (ARPU)</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.2rem', color: 'var(--success)' }}>₹ 1,14,750 / yr</div>
        </div>
      </div>
    </div>
  );
}
