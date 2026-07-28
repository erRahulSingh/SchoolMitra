"use client";

import { Bus, MapPin, Phone, AlertTriangle, ShieldCheck, Navigation, Users } from "lucide-react";
import { MOCK_BUSES } from "@/lib/mockData";

export default function TransportPage() {
  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Live Bus & GPS Telemetry Tracking</h1>
          <p>Real-time vehicle location monitoring, student pickup/drop status, and driver dispatch.</p>
        </div>
        <button className="btn btn-primary">
          <Bus size={16} />
          <span>Add New Bus Route</span>
        </button>
      </div>

      {/* Grid: Map & Fleet List */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Mock Live GPS Map Panel */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', minHeight: '480px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', zIndex: 2 }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Navigation size={18} className="text-primary" />
              <span>Live GPS Satellite Map View</span>
            </h3>
            <span className="badge badge-success">Google Maps Telemetry Active</span>
          </div>

          {/* Interactive Map Visual Mock */}
          <div style={{ 
            flex: 1, 
            borderRadius: 'var(--radius-md)', 
            background: '#0d1322', 
            border: '1px solid var(--border-color)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justify-content: 'center',
            overflow: 'hidden'
          }}>
            {/* Grid Map Background Lines */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }} />

            {/* School Central Location Marker */}
            <div style={{ 
              position: 'absolute', 
              top: '48%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 10
            }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justify-content: 'center',
                margin: '0 auto',
                boxShadow: '0 0 30px var(--primary)'
              }}>
                🏫
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                background: 'rgba(0,0,0,0.85)', 
                padding: '0.2rem 0.6rem', 
                borderRadius: '99px',
                marginTop: '0.35rem',
                border: '1px solid var(--border-color)'
              }}>
                Delhi Public School Main Gate
              </div>
            </div>

            {/* Bus Live Markers on Map */}
            {MOCK_BUSES.map((b, idx) => {
              const topPositions = ['30%', '65%', '40%', '75%'];
              const leftPositions = ['35%', '70%', '20%', '55%'];
              return (
                <div key={b.id} style={{ position: 'absolute', top: topPositions[idx], left: leftPositions[idx], zIndex: 5 }}>
                  <div style={{ 
                    padding: '0.35rem 0.6rem', 
                    borderRadius: 'var(--radius-sm)', 
                    background: b.status === 'Delayed' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(16, 185, 129, 0.9)',
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    cursor: 'pointer'
                  }}>
                    <Bus size={12} />
                    <span>{b.busNumber.split(' ')[2] || b.id}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fleet Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Active Bus Fleet ({MOCK_BUSES.length})</h3>

          {MOCK_BUSES.map((bus) => (
            <div key={bus.id} className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{bus.busNumber}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{bus.route}</div>
                </div>
                <span className={`badge ${
                  bus.status === 'Delayed' ? 'badge-danger' : bus.status === 'At School' ? 'badge-success' : 'badge-info'
                }`}>
                  {bus.status}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <div>
                  <div style={{ color: 'var(--text-dim)' }}>Driver</div>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{bus.driverName}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-dim)' }}>Students</div>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{bus.studentsCount} On Board</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-dim)' }}>Speed</div>
                  <div style={{ color: 'var(--primary)', fontWeight: 600 }}>{bus.speed}</div>
                </div>
              </div>

              <div style={{ marginTop: '0.85rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  ETA: <strong>{bus.eta}</strong>
                </span>
                <button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                  <Phone size={12} />
                  <span>Call Driver</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
