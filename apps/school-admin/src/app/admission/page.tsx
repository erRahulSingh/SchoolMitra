"use client";

import { useState } from "react";
import { UserPlus, Upload, CreditCard, FileCheck, IdCard, ArrowRight } from "lucide-react";

export default function AdmissionPage() {
  const [activeTab, setActiveTab] = useState<"reg" | "parent" | "docs" | "id">("reg");

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Student Admission & Onboarding Portal</h1>
          <p>Register new students, link parent details, upload documents, and generate student ID cards.</p>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="glass-card" style={{ padding: '0.75rem', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setActiveTab("reg")} className={`btn ${activeTab === 'reg' ? 'btn-primary' : 'btn-secondary'}`}>
          <UserPlus size={16} /> Student Registration
        </button>
        <button onClick={() => setActiveTab("parent")} className={`btn ${activeTab === 'parent' ? 'btn-primary' : 'btn-secondary'}`}>
          Parent Linkage
        </button>
        <button onClick={() => setActiveTab("docs")} className={`btn ${activeTab === 'docs' ? 'btn-primary' : 'btn-secondary'}`}>
          <Upload size={16} /> Document Upload
        </button>
        <button onClick={() => setActiveTab("id")} className={`btn ${activeTab === 'id' ? 'btn-primary' : 'btn-secondary'}`}>
          <IdCard size={16} /> ID Generation
        </button>
      </div>

      {/* Tab Content */}
      <div className="glass-card" style={{ padding: '2rem', maxWidth: '800px' }}>
        {activeTab === "reg" && (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>New Student Registration Form</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="text" placeholder="First Name" className="search-input" />
              <input type="text" placeholder="Last Name" className="search-input" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <select className="search-input"><option>Select Class (e.g. Class 10)</option></select>
              <select className="search-input"><option>Select Section (e.g. Section A)</option></select>
            </div>
            <button type="button" className="btn btn-primary" style={{ justifyContent: 'center' }}>Save Admission Registration</button>
          </form>
        )}

        {activeTab === "id" && (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ width: '320px', padding: '1.5rem', background: '#111827', border: '1px solid var(--border-color)', borderRadius: '16px', margin: '0 auto' }}>
              <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>DELHI PUBLIC SCHOOL</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>STUDENT IDENTITY CARD</div>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', margin: '1rem auto' }} />
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Aarav Sharma</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Class 10-A • Roll #01</div>
              <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--primary)', fontFamily: 'monospace' }}>STU-1001-2026</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
