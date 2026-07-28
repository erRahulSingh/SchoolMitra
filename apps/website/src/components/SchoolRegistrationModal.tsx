"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle } from "lucide-react";

interface SchoolRegistrationModalProps {
  onClose: () => void;
}

export default function SchoolRegistrationModal({ onClose }: SchoolRegistrationModalProps) {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, backdropFilter: 'blur(4px)' }}>
      <div style={{ background: '#0c1029', borderRadius: '16px', padding: '2rem', width: '420px', position: 'relative', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
        
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#8892b0' }}>
          <X size={20} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Registration Submitted!</h3>
            <p style={{ fontSize: '0.85rem', color: '#8892b0', marginTop: '0.5rem' }}>Our team will onboard your school and send admin panel login details shortly.</p>
            <button onClick={onClose} className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>Register Your School</h3>
            
            <input type="text" required placeholder="School Name (e.g. DPS Delhi)" style={{ width: '100%', padding: '0.65rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '0.85rem', background: 'rgba(255,255,255,0.05)', color: '#fff' }} />
            <input type="email" required placeholder="Administrator Email" style={{ width: '100%', padding: '0.65rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '0.85rem', background: 'rgba(255,255,255,0.05)', color: '#fff' }} />
            <input type="tel" required placeholder="Contact Number" style={{ width: '100%', padding: '0.65rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '0.85rem', background: 'rgba(255,255,255,0.05)', color: '#fff' }} />
            
            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Send size={16} /> Submit Registration
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
