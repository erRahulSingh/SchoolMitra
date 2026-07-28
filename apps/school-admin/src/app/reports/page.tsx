import { BarChart3, Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>School Reports & Financial Analytics</h1>
          <p>Export attendance, fee collections, academic performance, transport, and financial reports.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Fee Collection Report</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>Quarterly fee breakdown and outstanding due reports.</p>
          <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}><Download size={14} /> Export Excel / PDF</button>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Attendance Summary</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>Monthly student and teacher attendance percentages.</p>
          <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}><Download size={14} /> Export Excel / PDF</button>
        </div>
      </div>
    </div>
  );
}
