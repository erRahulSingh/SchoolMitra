"use client";

import { useState } from "react";
import { MessageSquare, Send, FileText } from "lucide-react";

export default function CommunicationPage() {
  const [leaveRequested, setLeaveRequested] = useState(false);

  return (
    <div style={{ padding: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Teacher Chat & Leave Request</h3>

      {/* Teacher Chat */}
      <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px', marginBottom: '1rem' }}>
        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Class Teacher: Sunita Mehta</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
          "Aarav performed exceptionally well in yesterday's Physics lab assignment!"
        </div>
      </div>

      {/* Leave Application */}
      <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px' }}>
        <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Apply for Student Leave</div>
        {leaveRequested ? (
          <div style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 700 }}>Leave request submitted to Class Teacher!</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input type="text" placeholder="Reason for leave" style={{ width: '100%', padding: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
            <button onClick={() => setLeaveRequested(true)} style={{ padding: '0.5rem', background: 'var(--primary)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Submit Leave Request</button>
          </div>
        )}
      </div>
    </div>
  );
}
