import { Bus, Phone, Navigation, Clock, CheckCircle } from "lucide-react";

export default function TransportPage() {
  return (
    <div style={{ padding: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Live Bus GPS Telemetry & Child Location</h3>

      {/* Live Map Mock */}
      <div style={{ height: '220px', background: '#020617', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
        <Navigation size={32} color="var(--primary)" />
        <div style={{ position: 'absolute', bottom: '12px', background: 'rgba(0,0,0,0.85)', padding: '0.3rem 0.8rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700 }}>
          Bus #DL 01 AB 4321 • Speed: 34 km/h
        </div>
      </div>

      {/* Timeline Status */}
      <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>Today's Trip Timeline</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem' }}>
          <div style={{ color: 'var(--success)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <CheckCircle size={14} /> <span>07:20 AM - Student Boarded Bus at Home Stop</span>
          </div>
          <div style={{ color: 'var(--primary)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <CheckCircle size={14} /> <span>07:42 AM - Bus Reached School Gate #1</span>
          </div>
        </div>
      </div>

      {/* Driver Contact */}
      <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px' }}>
        <div style={{ fontWeight: 700 }}>Driver: Ram Singh</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Route 1 - Dwarka Sector 12</div>
        <button style={{ width: '100%', marginTop: '0.75rem', padding: '0.6rem', background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <Phone size={14} /> Call Driver (+91 98111 22334)
        </button>
      </div>
    </div>
  );
}
