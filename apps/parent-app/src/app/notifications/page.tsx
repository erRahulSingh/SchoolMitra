import { Bell, CheckCircle, Bus } from "lucide-react";

export default function NotificationsPage() {
  const alerts = [
    { title: "Attendance Marked: PRESENT", time: "07:42 AM", desc: "Aarav Sharma entered school gate 1." },
    { title: "Bus Picked Up Student", time: "07:20 AM", desc: "Bus #DL01AB4321 picked up student at Home Stop." }
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Push Notifications & Alerts</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {alerts.map((a, idx) => (
          <div key={idx} style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px' }}>
            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{a.title}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{a.desc}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--primary)', marginTop: '0.3rem' }}>{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
