"use client";

import { useState } from "react";
import { Settings, Save, Palette, Globe, Shield, Building2 } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "branding" | "i18n">("branding");
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [schoolName, setSchoolName] = useState("Delhi Public School");
  const [subdomain, setSubdomain] = useState("dps.schoolmitra.com");
  const [selectedLang, setSelectedLang] = useState<"en" | "hi">("en");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>School ERP Settings & White-Label Branding</h1>
          <p>Configure custom school logos, primary theme colors, subdomains, and multi-language support.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card" style={{ padding: '0.75rem', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', maxWidth: '700px' }}>
        <button onClick={() => setActiveTab("branding")} className={`btn ${activeTab === 'branding' ? 'btn-primary' : 'btn-secondary'}`}>
          <Palette size={16} /> White-Label Branding
        </button>
        <button onClick={() => setActiveTab("i18n")} className={`btn ${activeTab === 'i18n' ? 'btn-primary' : 'btn-secondary'}`}>
          <Globe size={16} /> Multi-Language (i18n)
        </button>
        <button onClick={() => setActiveTab("general")} className={`btn ${activeTab === 'general' ? 'btn-primary' : 'btn-secondary'}`}>
          <Building2 size={16} /> School Profile
        </button>
      </div>

      <div className="glass-card" style={{ padding: '2rem', maxWidth: '700px' }}>
        {saved && (
          <div style={{ background: 'rgba(16,185,129,0.15)', color: 'var(--success)', padding: '0.75rem', borderRadius: '10px', fontWeight: 700, marginBottom: '1.25rem' }}>
            ✓ White-label branding and language configuration saved successfully!
          </div>
        )}

        {activeTab === "branding" && (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>🎨 Custom School White-Label Theme</h3>
            
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Custom School Name</label>
              <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="search-input" style={{ width: '100%' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Custom Tenant Subdomain</label>
              <input type="text" value={subdomain} onChange={(e) => setSubdomain(e.target.value)} className="search-input" style={{ width: '100%' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Primary Theme Color</label>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ width: '50px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'none' }} />
                <span style={{ fontWeight: 700, fontFamily: 'monospace' }}>{primaryColor}</span>
              </div>
            </div>

            <button type="button" onClick={handleSave} className="btn btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
              <Save size={16} /> Save White-Label Theme
            </button>
          </form>
        )}

        {activeTab === "i18n" && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>🌐 Default App Language</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="lang" checked={selectedLang === 'en'} onChange={() => setSelectedLang('en')} />
                <span style={{ fontWeight: 700 }}>English (Default)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="lang" checked={selectedLang === 'hi'} onChange={() => setSelectedLang('hi')} />
                <span style={{ fontWeight: 700 }}>हिन्दी (Hindi)</span>
              </label>
            </div>

            <button type="button" onClick={handleSave} className="btn btn-primary" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
              <Save size={16} /> Update Language Preference
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
