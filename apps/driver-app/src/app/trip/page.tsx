"use client";

import { useState } from "react";
import { Play, Square, Radio, Wifi, Navigation, RefreshCw, QrCode } from "lucide-react";

export default function TripPage() {
  const [isTripActive, setIsTripActive] = useState(false);
  const [offlineSync, setOfflineSync] = useState(false);

  return (
    <div style={{ padding: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Live GPS Navigation & Trip Cockpit</h3>

      {/* Big Start / End Button */}
      <div style={{ marginBottom: '1.25rem' }}>
        {isTripActive ? (
          <button onClick={() => setIsTripActive(false)} style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', background: '#dc2626', color: '#fff', border: 'none', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer' }}>
            <Square size={20} style={{ display: 'inline', marginRight: '0.5rem' }} /> END MORNING TRIP
          </button>
        ) : (
          <button onClick={() => setIsTripActive(true)} style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(16,185,129,0.3)' }}>
            <Play size={20} style={{ display: 'inline', marginRight: '0.5rem' }} /> START MORNING PICKUP TRIP
          </button>
        )}
      </div>

      {/* GPS Telemetry Stream Status */}
      <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Radio size={18} color={isTripActive ? "var(--primary)" : "var(--text-muted)"} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Live Telemetry Stream</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: isTripActive ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 700 }}>
            {isTripActive ? 'TRANSMITTING 34 KM/H' : 'IDLE'}
          </span>
        </div>
      </div>

      {/* Offline Sync Controls */}
      <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Offline Buffer Sync</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cache telemetry if mobile network drops</div>
        </div>
        <button onClick={() => setOfflineSync(!offlineSync)} style={{ padding: '0.4rem 0.8rem', background: offlineSync ? 'var(--primary)' : 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
          {offlineSync ? 'ENABLED' : 'DISABLED'}
        </button>
      </div>
    </div>
  );
}
