"use client";

import { useState } from "react";
import { CheckCircle2, Smartphone, Bus } from "lucide-react";

export default function PickupDropPage() {
  const [gpsCase, setGpsCase] = useState<"case1" | "case2">("case2");
  const [students, setStudents] = useState([
    { id: "1", name: "Aarav Sharma", stop: "Sector 10 Metro", status: "Boarded" },
    { id: "2", name: "Ananya Patel", stop: "Sector 10 Metro", status: "Pending" },
    { id: "3", name: "Rohan Verma", stop: "Dwarka Sector 12", status: "Pending" }
  ]);

  const toggleStudent = (id: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: s.status === 'Boarded' ? 'Pending' : 'Boarded' } : s));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Student Pickup & Drop Checklist</h3>

      {/* GPS Case Selector */}
      <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '0.3rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
        <button onClick={() => setGpsCase("case2")} style={{ flex: 1, padding: '0.5rem', border: 'none', borderRadius: '8px', background: gpsCase === 'case2' ? 'var(--primary)' : 'none', color: '#fff', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
          Case 2: Driver Bus GPS
        </button>
        <button onClick={() => setGpsCase("case1")} style={{ flex: 1, padding: '0.5rem', border: 'none', borderRadius: '8px', background: gpsCase === 'case1' ? 'var(--primary)' : 'none', color: '#fff', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
          Case 1: Student Mobile GPS
        </button>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {gpsCase === 'case2' ? 'Case 2 Mode: Driver GPS → Bus GPS → Pickup → Drop → Parent Notifications' : 'Case 1 Mode: Student Has Mobile → Live Child Location Sync'}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {students.map((s) => (
          <div key={s.id} onClick={() => toggleStudent(s.id)} style={{ padding: '0.85rem', borderRadius: '12px', background: s.status === 'Boarded' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.03)', border: s.status === 'Boarded' ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Stop: {s.stop}</div>
            </div>
            <span className={`badge ${s.status === 'Boarded' ? 'badge-success' : 'badge-warning'}`}>{s.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
