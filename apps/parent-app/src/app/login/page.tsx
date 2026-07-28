"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Key, Fingerprint, Lock, Phone, ArrowRight } from "lucide-react";

export default function ParentLoginPage() {
  const [loginMethod, setLoginMethod] = useState<"password" | "otp" | "biometric">("password");

  return (
    <div className="mobile-frame" style={{ justifyContent: 'center', padding: '2rem' }}>
      <div className="mobile-notch" />

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', margin: '0 auto 1rem auto' }}>
          <Building2 size={32} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>SchoolMitra Parent App</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Sign in to track attendance, live bus & fees</p>
      </div>

      {/* Login Method Selector */}
      <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '0.3rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
        <button onClick={() => setLoginMethod("password")} style={{ flex: 1, padding: '0.5rem', border: 'none', borderRadius: '8px', background: loginMethod === 'password' ? 'var(--primary)' : 'none', color: '#fff', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Password</button>
        <button onClick={() => setLoginMethod("otp")} style={{ flex: 1, padding: '0.5rem', border: 'none', borderRadius: '8px', background: loginMethod === 'otp' ? 'var(--primary)' : 'none', color: '#fff', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>OTP Login</button>
        <button onClick={() => setLoginMethod("biometric")} style={{ flex: 1, padding: '0.5rem', border: 'none', borderRadius: '8px', background: loginMethod === 'biometric' ? 'var(--primary)' : 'none', color: '#fff', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Biometric</button>
      </div>

      {loginMethod === "password" && (
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="tel" placeholder="Mobile Number (+91 98765 43210)" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff' }} />
          <input type="password" placeholder="Password" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff' }} />
          <Link href="/" style={{ padding: '0.85rem', background: 'var(--primary)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 700, textAlign: 'center', textDecoration: 'none' }}>Login to Parent Portal</Link>
        </form>
      )}

      {loginMethod === "biometric" && (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <Fingerprint size={64} color="var(--primary)" style={{ margin: '0 auto 1rem auto' }} />
          <div style={{ fontWeight: 700, fontSize: '1rem' }}>Touch Fingerprint Sensor</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Scan Face ID or Fingerprint to authenticate</div>
          <Link href="/" style={{ display: 'block', marginTop: '1.5rem', padding: '0.75rem', background: 'var(--primary)', borderRadius: '10px', color: '#fff', fontWeight: 700, textDecoration: 'none' }}>Confirm Biometric Sign-in</Link>
        </div>
      )}
    </div>
  );
}
