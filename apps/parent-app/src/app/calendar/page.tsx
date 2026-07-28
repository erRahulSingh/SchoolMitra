import { Calendar, Clock, Award } from "lucide-react";

export default function CalendarPage() {
  const events = [
    { date: "14 Aug 2026", title: "Mid-Term Science Exam Begins", type: "Exam" },
    { date: "15 Aug 2026", title: "Independence Day Celebration (Holiday)", type: "Holiday" },
    { date: "22 Aug 2026", title: "Parent-Teacher Meeting (PTM)", type: "PTM" }
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>School Calendar & Events</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {events.map((e, idx) => (
          <div key={idx} style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{e.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{e.date}</div>
            </div>
            <span className="badge badge-info">{e.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
