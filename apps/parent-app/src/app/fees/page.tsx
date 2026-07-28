"use client";

import { useState } from "react";
import { CreditCard, Download, CheckCircle } from "lucide-react";

export default function FeesPage() {
  const [paid, setPaid] = useState(false);

  return (
    <div style={{ padding: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Fees & Receipts</h3>

      <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quarter 2 Tuition & Bus Fee</div>
        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: paid ? 'var(--success)' : 'var(--warning)', marginTop: '0.2rem' }}>
          ₹ 18,500
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
          {paid ? 'Paid on 28 July 2026 via UPI' : 'Due Date: 10 August 2026'}
        </div>

        {paid ? (
          <button style={{ width: '100%', marginTop: '1rem', padding: '0.6rem', background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Download size={14} /> Download Receipt PDF
          </button>
        ) : (
          <button onClick={() => setPaid(true)} style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
            Pay ₹ 18,500 via UPI / Card
          </button>
        )}
      </div>
    </div>
  );
}
