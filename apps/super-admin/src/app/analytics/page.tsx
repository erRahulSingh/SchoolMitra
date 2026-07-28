import { BarChart3, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>SaaS Cohort & Growth Analytics</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Track MRR expansion, churn rate, active school retention, and ARR forecast.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Net Revenue Retention (NRR)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: 'var(--success)' }}>112.4%</div>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Monthly Churn Rate</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: 'var(--success)' }}>0.4%</div>
        </div>
      </div>
    </div>
  );
}
