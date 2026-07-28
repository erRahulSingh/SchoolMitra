"use client";

import { useState } from "react";
import { AlertTriangle, ShieldAlert } from "lucide-react";

export default function SosPage() {
  const [triggered, setTriggered] = useState(false);

  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem' }}>Emergency SOS Dispatch</h3>

      <button 
        onClick={() => setTriggered(!triggered)}
        style={{ 
          width: '200px', 
          height: '200px', 
          borderRadius: '50%', 
          background: triggered ? '#dc2626' : 'linear-gradient(135deg, #ef4444, #b91c1c)', 
          border: '8px solid rgba(239,68,68,0.3)', 
          color: '#fff', 
          fontWeight: 800, 
          fontSize: '1.25rem', 
          cursor: 'pointer',
          boxShadow: '0 0 40px rgba(239,68,68,0.5)',
          margin: '0 auto 1.5rem auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justify-content: 'center',
          gap: '0.5rem'
        }}
      >
        <AlertTriangle size={48} />
        <span>{triggered ? "EMERGENCY ACTIVE" : "PRESS FOR SOS"}</span>
      </button>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        {triggered ? "🚨 SOS alert broadcasted to School Admin & 42 Parents on Route 1!" : "Pressing this button will trigger instant high-priority emergency alerts to school control room."}
      </p>
    </div>
  );
}
