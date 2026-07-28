"use client";

import { Search, Bell, Shield, Activity, User } from "lucide-react";

export default function SuperAdminHeader() {
  return (
    <header style={{
      height: '70px',
      background: 'rgba(10, 13, 20, 0.8)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      display: 'flex',
      alignItems: 'center',
      justify-content: 'space-between',
      padding: '0 2rem'
    }}>
      <div style={{ position: 'relative', width: '320px' }}>
        <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
        <input 
          type="text" 
          placeholder="Search schools, subscriptions, servers..." 
          style={{ width: '100%', padding: '0.55rem 1rem 0.55rem 2.4rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }} 
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem', borderRadius: '99px', background: 'rgba(16,185,129,0.15)', color: 'var(--success)', fontSize: '0.75rem', fontWeight: 700 }}>
          <Activity size={14} />
          <span>Cluster Alpha Online</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
            SA
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Company HQ Admin</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Super Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}
