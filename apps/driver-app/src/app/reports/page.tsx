"use client";

import { useState } from "react";
import { Fuel, Wrench, AlertCircle, FileText } from "lucide-react";

export default function DriverReportsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ padding: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Fuel Entry, Maintenance & Incident Reports</h3>

      <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '16px', marginBottom: '1rem' }}>
        <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>⛽ Fuel Refill Entry</div>
        {submitted ? (
          <div style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 700 }}>Fuel receipt logged successfully!</div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input type="number" required placeholder="Liters Refilled (e.g. 45L)" style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
            <input type="number" required placeholder="Total Bill Amount (₹)" style={{ width: '100%', padding: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
            <button type="submit" style={{ padding: '0.6rem', background: 'var(--primary)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Submit Fuel Entry</button>
          </form>
        )}
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '16px' }}>
        <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>📋 Trip Summary</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Morning Trip: 42 Students Boarded • 0 Incidents • 28 km Distance Covered</div>
      </div>
    </div>
  );
}
