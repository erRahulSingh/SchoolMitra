"use client";

import Link from "next/link";
import { Building2, ShieldCheck, Smartphone, Bus } from "lucide-react";

export default function LoginPage() {
  return (
    <div style={{ padding: '160px 2rem 100px 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.75rem', fontWeight: 800, marginBottom: '1rem' }}>Centralized Portal Gateway</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Select your portal to log into SchoolMitra ecosystem.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        <a href="http://localhost:3000" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', cursor: 'pointer' }}>
            <Building2 size={40} color="var(--primary)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>School ERP Admin</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>For Principals, Admins, Teachers & Accountants</p>
          </div>
        </a>

        <a href="http://localhost:3001" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', cursor: 'pointer' }}>
            <ShieldCheck size={40} color="var(--secondary)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Super Admin Console</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>For Company SaaS Operations & Billing</p>
          </div>
        </a>

        <a href="http://localhost:3002" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', cursor: 'pointer' }}>
            <Smartphone size={40} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Parent Mobile Portal</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>For Parents to check attendance, fees & live bus</p>
          </div>
        </a>
      </div>
    </div>
  );
}
