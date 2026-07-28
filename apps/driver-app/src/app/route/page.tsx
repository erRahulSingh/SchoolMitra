import { Bus, MapPin, Users, Phone } from "lucide-react";

export default function RoutePage() {
  const stops = [
    { stopName: "Dwarka Sector 10 Metro Gate", time: "07:15 AM", students: 12 },
    { stopName: "Fortis Hospital Crossing", time: "07:30 AM", students: 18 },
    { stopName: "Delhi Public School Main Gate", time: "07:45 AM", students: 42 }
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Today's Route & Assigned Bus</h3>

      <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px', marginBottom: '1.25rem', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>Bus #DL 01 AB 4321</div>
        <div style={{ fontSize: '0.85rem', color: '#fff', marginTop: '0.2rem' }}>Route 1 - Dwarka Sector 12 Express</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Total Assigned Students: 42 • Driver: Ram Singh</div>
      </div>

      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.75rem' }}>Assigned Bus Stops</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {stops.map((s, idx) => (
          <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{s.stopName}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Scheduled: {s.time}</div>
            </div>
            <span className="badge badge-info">{s.students} Students</span>
          </div>
        ))}
      </div>
    </div>
  );
}
