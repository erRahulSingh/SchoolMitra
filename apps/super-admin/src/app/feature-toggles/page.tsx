import { Sliders, ToggleRight } from "lucide-react";

export default function FeatureTogglesPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Feature Toggle Matrix</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Enable or disable modules dynamically per school tenant.</p>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <th style={{ padding: '0.75rem' }}>School Tenant</th>
              <th style={{ padding: '0.75rem' }}>Live GPS Telemetry</th>
              <th style={{ padding: '0.75rem' }}>Razorpay Online Fees</th>
              <th style={{ padding: '0.75rem' }}>WhatsApp Alerts</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', fontWeight: 700 }}>Delhi Public School</td>
              <td style={{ padding: '1rem', color: 'var(--success)' }}><ToggleRight size={28} /></td>
              <td style={{ padding: '1rem', color: 'var(--success)' }}><ToggleRight size={28} /></td>
              <td style={{ padding: '1rem', color: 'var(--success)' }}><ToggleRight size={28} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
