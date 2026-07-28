"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ padding: '160px 2rem 100px 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Contact Us</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Have questions about onboarding your school? Speak with our team.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Get in Touch</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Mail color="var(--primary)" />
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Email Support</div>
                <div style={{ fontWeight: 600 }}>support@schoolmitra.com</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Phone color="var(--primary)" />
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Phone Helpline</div>
                <div style={{ fontWeight: 600 }}>+91 1800 123 4567</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <MapPin color="var(--primary)" />
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Headquarters</div>
                <div style={{ fontWeight: 600 }}>Tech Hub, Cyber City, Gurugram, India</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <CheckCircle size={48} color="var(--primary)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Message Sent!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>We will respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" required placeholder="Your Name" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff' }} />
              <input type="email" required placeholder="Email Address" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff' }} />
              <textarea required rows={4} placeholder="Your Message" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff' }} />
              <button type="submit" className="btn-hero-primary" style={{ borderRadius: '8px' }}>Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
