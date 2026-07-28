"use client";

import { useState } from "react";
import TripPage from "./trip/page";
import RoutePage from "./route/page";
import PickupDropPage from "./pickup-drop/page";
import SosPage from "./sos/page";
import DriverReportsPage from "./reports/page";
import { Bus, Navigation, CheckSquare, AlertTriangle, FileText } from "lucide-react";

export default function DriverCockpitShell() {
  const [tab, setTab] = useState<"trip" | "route" | "pickup" | "sos" | "reports">("trip");

  return (
    <div className="driver-frame">
      {/* Top Header */}
      <div style={{ padding: '2.5rem 1.25rem 0.85rem 1.25rem', background: '#020617', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>DRIVER COCKPIT</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>Ram Singh</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)' }}>Bus #DL 01 AB 4321</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Route 1 Express</div>
        </div>
      </div>

      {/* Dynamic Tab Render */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '70px' }}>
        {tab === "trip" && <TripPage />}
        {tab === "route" && <RoutePage />}
        {tab === "pickup" && <PickupDropPage />}
        {tab === "sos" && <SosPage />}
        {tab === "reports" && <DriverReportsPage />}
      </div>

      {/* Driver Bottom Navigation */}
      <div style={{ height: '65px', background: '#020617', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 90 }}>
        <button onClick={() => setTab("trip")} style={{ background: 'none', border: 'none', color: tab === 'trip' ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', cursor: 'pointer' }}>
          <Navigation size={18} /> <span>Trip</span>
        </button>
        <button onClick={() => setTab("route")} style={{ background: 'none', border: 'none', color: tab === 'route' ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', cursor: 'pointer' }}>
          <Bus size={18} /> <span>Route</span>
        </button>
        <button onClick={() => setTab("pickup")} style={{ background: 'none', border: 'none', color: tab === 'pickup' ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', cursor: 'pointer' }}>
          <CheckSquare size={18} /> <span>Students</span>
        </button>
        <button onClick={() => setTab("sos")} style={{ background: 'none', border: 'none', color: tab === 'sos' ? 'var(--danger)' : 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', cursor: 'pointer' }}>
          <AlertTriangle size={18} /> <span>SOS</span>
        </button>
        <button onClick={() => setTab("reports")} style={{ background: 'none', border: 'none', color: tab === 'reports' ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', cursor: 'pointer' }}>
          <FileText size={18} /> <span>Logs</span>
        </button>
      </div>
    </div>
  );
}
