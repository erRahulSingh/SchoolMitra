import { Bus, Navigation, Phone, ShieldCheck, AlertTriangle } from "lucide-react";

export default function TransportPage() {
  return (
    <div style={{ padding: '160px 2rem 100px 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Live Transport GPS Tracking</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto' }}>
          Eliminate parent anxiety with real-time GPS telemetry from the Driver Mobile App directly to parents and school admins.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <Navigation size={28} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Live Map & Stop ETA</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Live GPS location updates streamed every 3 seconds with accurate estimated arrival times for every bus stop.</p>
        </div>

        <div className="feature-card">
          <AlertTriangle size={28} color="var(--accent)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>One-Tap Emergency SOS</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Drivers can trigger instant emergency SOS alerts in case of breakdown or heavy traffic, notifying school admins immediately.</p>
        </div>

        <div className="feature-card">
          <ShieldCheck size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>Student Boarding Checklist</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Bus attendants and drivers mark student pickup and drop-off, sending instant notifications to parents.</p>
        </div>
      </div>
    </div>
  );
}
