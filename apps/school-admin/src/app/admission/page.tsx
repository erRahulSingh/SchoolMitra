"use client";

import { useState } from "react";
import { UserPlus, Upload, CreditCard, FileCheck, BadgeCheck, ArrowRight, UserCheck } from "lucide-react";

export default function AdmissionPage() {
  const [activeTab, setActiveTab] = useState<"reg" | "parent" | "docs" | "id">("reg");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Student Admission & Onboarding Portal</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2 }}>Register new students, link parent details, upload documents, and generate student ID cards.</p>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
        <button onClick={() => setActiveTab("reg")} className={`btn ${activeTab === 'reg' ? 'btn-primary' : 'btn-secondary'}`}>
          <UserPlus size={16} /> Student Registration
        </button>
        <button onClick={() => setActiveTab("parent")} className={`btn ${activeTab === 'parent' ? 'btn-primary' : 'btn-secondary'}`}>
          <UserCheck size={16} /> Parent Linkage
        </button>
        <button onClick={() => setActiveTab("docs")} className={`btn ${activeTab === 'docs' ? 'btn-primary' : 'btn-secondary'}`}>
          <Upload size={16} /> Document Upload
        </button>
        <button onClick={() => setActiveTab("id")} className={`btn ${activeTab === 'id' ? 'btn-primary' : 'btn-secondary'}`}>
          <BadgeCheck size={16} /> ID Generation
        </button>
      </div>

      {/* Tab Content */}
      <div className="glass-card" style={{ padding: "2rem", maxWidth: "800px" }}>
        {activeTab === "reg" && (
          <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff" }}>New Student Registration Form</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <input type="text" placeholder="First Name" style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.9rem" }} />
              <input type="text" placeholder="Last Name" style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.9rem" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <select style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.9rem" }}>
                <option style={{ background: "#0b0f19" }}>Select Class (e.g. Class 10)</option>
              </select>
              <select style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.9rem" }}>
                <option style={{ background: "#0b0f19" }}>Select Section (e.g. Section A)</option>
              </select>
            </div>
            <button type="button" className="btn btn-primary" style={{ justifyContent: "center", marginTop: "0.5rem" }}>Save Admission Registration</button>
          </form>
        )}

        {activeTab === "parent" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff" }}>Parent & Guardian Linkage</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <input type="text" placeholder="Father's Name" style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.9rem" }} />
              <input type="text" placeholder="Parent Contact (+91)" style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.9rem" }} />
            </div>
            <button type="button" className="btn btn-primary" style={{ justifyContent: "center" }}>Link Parent Account</button>
          </div>
        )}

        {activeTab === "docs" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff" }}>Document Uploads (Aadhaar / Birth Certificate)</h3>
            <div style={{ border: "2px dashed var(--border-color)", padding: "2rem", borderRadius: "var(--radius-md)", textAlign: "center", color: "var(--text-muted)" }}>
              <Upload size={32} style={{ margin: "0 auto 0.5rem auto", color: "var(--primary)" }} />
              <p>Drag and drop birth certificate or Aadhaar PDF here</p>
            </div>
          </div>
        )}

        {activeTab === "id" && (
          <div style={{ textAlign: "center", padding: "1rem" }}>
            <div style={{ width: "320px", padding: "1.5rem", background: "rgba(18, 26, 44, 0.9)", border: "1px solid var(--border-color)", borderRadius: "16px", margin: "0 auto", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
              <div style={{ fontWeight: 800, color: "var(--primary)", fontSize: "1.1rem" }}>DELHI PUBLIC SCHOOL</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>STUDENT IDENTITY CARD</div>
              <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--secondary))", margin: "1rem auto", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "1.3rem" }}>AS</div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#fff" }}>Aarav Sharma</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>Class 10-A • Roll #01</div>
              <div style={{ fontSize: "0.75rem", marginTop: "0.75rem", color: "var(--primary)", fontFamily: "monospace", fontWeight: 700 }}>STU-1001-2026</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
