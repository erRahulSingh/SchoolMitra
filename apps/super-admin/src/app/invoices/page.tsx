import { FileText, Download } from "lucide-react";

export default function InvoicesPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Generated SaaS Invoices</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>GST tax invoices issued to subscriber schools.</p>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <th style={{ padding: '0.75rem' }}>Invoice #</th>
              <th style={{ padding: '0.75rem' }}>Billed School</th>
              <th style={{ padding: '0.75rem' }}>Total GST Amount</th>
              <th style={{ padding: '0.75rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', fontFamily: 'monospace' }}>INV-SAAS-2026-01</td>
              <td style={{ padding: '1rem', fontWeight: 700 }}>Delhi Public School</td>
              <td style={{ padding: '1rem', fontWeight: 700 }}>₹ 2,18,300 (incl. GST)</td>
              <td style={{ padding: '1rem' }}>
                <button style={{ padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.75rem', cursor: 'pointer' }}>
                  Download PDF
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
