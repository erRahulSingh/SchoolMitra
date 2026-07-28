"use client";

import Link from "next/link";
import { Bus, Key, ShieldCheck } from "lucide-react";

export default function DriverLoginPage() {
  return (
    <div className="driver-frame" style={{ justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', margin: '0 auto 1rem auto' }}>
          <Bus size={32} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>SchoolMitra Driver App</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Driver Cockpit Telemetry Portal</p>
      </div>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="tel" placeholder="Driver Mobile Number (+91 98111 22334)" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff' }} />
        <input type="password" placeholder="Bus Driver PIN" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff' }} />
        <Link href="/" style={{ padding: '0.85rem', background: 'var(--primary)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 800, textAlign: 'center', textDecoration: 'none' }}>
          Sign In to Bus Cockpit
        </Link>
      </form>
    </div>
  );
}
