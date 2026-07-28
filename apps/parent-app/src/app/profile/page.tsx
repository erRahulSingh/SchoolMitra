"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Globe, LogOut, Check } from "lucide-react";

export default function ProfilePage() {
  const [lang, setLang] = useState<"en" | "hi">("en");

  return (
    <div style={{ padding: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Parent Profile & Language Settings</h3>

      {/* Parent Details */}
      <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Parent Name</div>
          <div style={{ fontWeight: 700 }}>Rajesh Sharma</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Registered Phone</div>
          <div style={{ fontWeight: 700 }}>+91 98765 43210</div>
        </div>
      </div>

      {/* Dynamic Language Switcher */}
      <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Globe size={16} color="var(--primary)" /> <span>App Language / भाषा चुनें</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setLang('en')} style={{ flex: 1, padding: '0.6rem', borderRadius: '10px', border: 'none', background: lang === 'en' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>
            English {lang === 'en' && '✓'}
          </button>
          <button onClick={() => setLang('hi')} style={{ flex: 1, padding: '0.6rem', borderRadius: '10px', border: 'none', background: lang === 'hi' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>
            हिन्दी (Hindi) {lang === 'hi' && '✓'}
          </button>
        </div>
      </div>

      <Link href="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', color: 'var(--danger)', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>
        <LogOut size={16} /> Logout Parent App
      </Link>
    </div>
  );
}
