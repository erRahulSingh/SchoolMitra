"use client";

import React, { useState } from "react";
import { 
  Building2, ShieldCheck, Mail, Phone, MapPin, 
  Award, Globe, Calendar, CheckCircle2, User, Key, Save 
} from "lucide-react";

export default function SchoolProfilePage() {
  const [isSaved, setIsSaved] = useState(false);

  const [profile, setProfile] = useState({
    schoolName: "Delhi Public School (Main Campus)",
    affiliation: "CBSE Affiliation #1130982 (Senior Secondary)",
    principalName: "Dr. Rameshwar Sharma",
    email: "admin@dpscampus.edu.in",
    phone: "+91 11 2789 0011",
    website: "https://dpscampus.edu.in",
    address: "Sector 12, Dwarka, New Delhi - 110075",
    academicSession: "2026 - 2027",
    establishmentYear: "1994",
    totalCapacity: "3,200 Students"
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>School Profile & Institution Settings</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2 }}>Manage official institution records, CBSE affiliations, and administrative contacts.</p>
        </div>
      </div>

      {/* HERO INSTITUTION BANNER */}
      <div className="glass-card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem" }}>
        <div style={{
          width: 72, height: 72, borderRadius: "var(--radius-md)",
          background: "linear-gradient(135deg, var(--primary), var(--primary-hover))",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: "1.8rem", fontWeight: 900,
          boxShadow: "var(--shadow-glow)"
        }}>
          DPS
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff" }}>{profile.schoolName}</h2>
            <ShieldCheck size={20} color="var(--success)" />
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 600, marginTop: 2 }}>{profile.affiliation}</p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Established: {profile.establishmentYear} • Capacity: {profile.totalCapacity}</p>
        </div>
      </div>

      {/* INSTITUTION DETAILS FORM */}
      <div className="glass-card" style={{ padding: "1.75rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem", color: "#fff" }}>Official Institution Records</h3>

        {isSaved && (
          <div style={{ padding: "0.85rem", background: "var(--success-bg)", border: "1px solid var(--success)", borderRadius: "var(--radius-md)", color: "var(--success)", fontSize: "0.85rem", fontWeight: 700, marginBottom: "1.25rem", textAlign: "center" }}>
            ✅ Institution profile and settings updated successfully!
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>SCHOOL NAME</label>
            <input 
              type="text" 
              value={profile.schoolName}
              onChange={(e) => setProfile({ ...profile, schoolName: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.9rem" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>BOARD AFFILIATION</label>
            <input 
              type="text" 
              value={profile.affiliation}
              onChange={(e) => setProfile({ ...profile, affiliation: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.9rem" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>PRINCIPAL / HEAD OF SCHOOL</label>
            <input 
              type="text" 
              value={profile.principalName}
              onChange={(e) => setProfile({ ...profile, principalName: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.9rem" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>OFFICIAL EMAIL</label>
            <input 
              type="email" 
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.9rem" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>TELEPHONE / HELPLINE</label>
            <input 
              type="text" 
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.9rem" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>OFFICIAL WEBSITE</label>
            <input 
              type="text" 
              value={profile.website}
              onChange={(e) => setProfile({ ...profile, website: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.9rem" }}
            />
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>CAMPUS ADDRESS</label>
            <input 
              type="text" 
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.9rem" }}
            />
          </div>

          <div style={{ gridColumn: "span 2", display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
            <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 1.5rem" }}>
              <Save size={18} />
              <span>Save Institution Changes</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
