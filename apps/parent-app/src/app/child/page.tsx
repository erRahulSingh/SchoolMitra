"use client";

import { useState } from "react";
import { User, Award, Calendar, FileText, Heart, Clock } from "lucide-react";

export default function MyChildPage() {
  const [activeSubTab, setActiveSubTab] = useState<"profile" | "attendance" | "marks" | "medical">("profile");

  return (
    <div style={{ padding: '1rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>My Child Dashboard</h3>

      {/* Sub tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', overflowX: 'auto' }}>
        <button onClick={() => setActiveSubTab("profile")} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: 'none', background: activeSubTab === 'profile' ? 'var(--primary)' : 'var(--bg-card)', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>Profile</button>
        <button onClick={() => setActiveSubTab("attendance")} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: 'none', background: activeSubTab === 'attendance' ? 'var(--primary)' : 'var(--bg-card)', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>Attendance</button>
        <button onClick={() => setActiveSubTab("marks")} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: 'none', background: activeSubTab === 'marks' ? 'var(--primary)' : 'var(--bg-card)', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>Exams & Cards</button>
        <button onClick={() => setActiveSubTab("medical")} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: 'none', background: activeSubTab === 'medical' ? 'var(--primary)' : 'var(--bg-card)', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>Medical</button>
      </div>

      {activeSubTab === "profile" && (
        <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Student Name</div>
            <div style={{ fontWeight: 700 }}>Aarav Sharma</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Class & Section</div>
            <div style={{ fontWeight: 700 }}>Class 10 - Section A (Roll #01)</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Admission ID</div>
            <div style={{ fontWeight: 700, fontFamily: 'monospace', color: 'var(--primary)' }}>STU-1001-2026</div>
          </div>
        </div>
      )}

      {activeSubTab === "attendance" && (
        <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--success)' }}>96% Attendance Rate</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>144 Days Present / 150 School Days</div>
        </div>
      )}

      {activeSubTab === "marks" && (
        <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px' }}>
          <div style={{ fontWeight: 700 }}>Mid-Term Exam Results</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.3rem' }}>Grade: A+ (94.2%)</div>
        </div>
      )}

      {activeSubTab === "medical" && (
        <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px' }}>
          <div style={{ fontWeight: 700 }}>Blood Group: O+ Positive</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Allergies: None Reported • Emergency Contact: +91 98765 43210</div>
        </div>
      )}
    </div>
  );
}
