"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Building2, 
  DollarSign, 
  Users, 
  HardDrive, 
  Activity, 
  Plus, 
  ToggleLeft, 
  ToggleRight, 
  Search,
  Server,
  FileText,
  Key
} from "lucide-react";

export default function SuperAdminPage() {
  const [schools, setSchools] = useState([
    { id: "sch-101", name: "Delhi Public School", city: "New Delhi", code: "DPS-DEL", plan: "Enterprise", status: "Active", mrr: 185000, gpsEnabled: true, feesEnabled: true },
    { id: "sch-102", name: "GD Goenka Public School", city: "Gurugram", code: "GDS-GUG", plan: "Pro", status: "Active", mrr: 120000, gpsEnabled: true, feesEnabled: true },
    { id: "sch-103", name: "Ryan International", city: "Noida", plan: "Pro", status: "Active", mrr: 145000, gpsEnabled: false, feesEnabled: true },
    { id: "sch-104", name: "St. Xavier Academy", city: "Faridabad", code: "SXA-FAR", plan: "Starter", status: "Active", mrr: 9999, gpsEnabled: true, feesEnabled: false },
  ]);

  const toggleGps = (id: string) => {
    setSchools(schools.map(s => s.id === id ? { ...s, gpsEnabled: !s.gpsEnabled } : s));
  };

  const totalMRR = schools.reduce((acc, s) => acc + s.mrr, 0);

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShieldCheck size={28} color="var(--primary)" />
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Super Admin SaaS Console</h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Internal platform for multi-tenant governance, revenue billing, feature flags, and server telemetry.
          </p>
        </div>
        <button style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          padding: '0.6rem 1.2rem', 
          borderRadius: '8px', 
          background: 'var(--primary)', 
          color: '#fff', 
          fontWeight: 700, 
          border: 'none', 
          cursor: 'pointer' 
        }}>
          <Plus size={16} />
          <span>Onboard New School</span>
        </button>
      </div>

      {/* Top Level SaaS Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Monthly Recurring Revenue (MRR)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: '#fff' }}>
            ₹ {(totalMRR / 100000).toFixed(2)} Lakhs
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.2rem' }}>+14.2% growth this month</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Onboarded Schools</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: '#fff' }}>
            {schools.length} Schools
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>across 4 cities</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Server Health & API Latency</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: 'var(--success)' }}>
            99.98% Uptime
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>24ms avg response time</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Database Storage Usage</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: '#fff' }}>
            14.2 GB / 100 GB
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>MongoDB Cluster Alpha</div>
        </div>
      </div>

      {/* Onboarded Schools Management Table */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Multi-Tenant Onboarded Schools & Feature Toggles</h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.75rem' }}>School Name</th>
              <th style={{ padding: '0.75rem' }}>Tenant Code</th>
              <th style={{ padding: '0.75rem' }}>Location</th>
              <th style={{ padding: '0.75rem' }}>Subscription Plan</th>
              <th style={{ padding: '0.75rem' }}>Monthly Bill</th>
              <th style={{ padding: '0.75rem' }}>Live GPS Feature</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1 style', fontWeight: 600 }}>{s.name}</td>
                <td style={{ padding: '1rem', fontFamily: 'monospace', color: 'var(--primary)' }}>{s.code}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{s.city}</td>
                <td style={{ padding: '1rem' }}>
                  <span className="badge badge-warning">{s.plan}</span>
                </td>
                <td style={{ padding: '1rem', fontWeight: 700 }}>₹ {s.mrr.toLocaleString('en-IN')}</td>
                <td style={{ padding: '1rem' }}>
                  <button 
                    onClick={() => toggleGps(s.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: s.gpsEnabled ? 'var(--success)' : 'var(--text-muted)' }}
                  >
                    {s.gpsEnabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                  </button>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span className="badge badge-success">{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
