"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, ArrowLeft, Search, Phone, MessageSquare, 
  Sparkles, Award, CheckCircle2, ChevronRight 
} from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function StudentDirectoryPage() {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("Class 10-A");

  const students = [
    { roll: 101, name: "Aarav Sharma", class: "Class 10-A", parent: "Mr. Rajesh Kumar", phone: "+91 98765 43210", attendance: "96.5%", gpa: "92.5%" },
    { roll: 102, name: "Ananya Patel", class: "Class 10-A", parent: "Mrs. Sunita Patel", phone: "+91 98765 43211", attendance: "94.2%", gpa: "95.7%" },
    { roll: 103, name: "Devansh Gupta", class: "Class 10-A", parent: "Mr. Alok Gupta", phone: "+91 98765 43212", attendance: "91.0%", gpa: "80.2%" },
    { roll: 104, name: "Ishaan Verma", class: "Class 10-A", parent: "Mrs. Ritu Verma", phone: "+91 98765 43213", attendance: "95.0%", gpa: "86.0%" },
    { roll: 105, name: "Kavya Singh", class: "Class 10-A", parent: "Mr. Manoj Singh", phone: "+91 98765 43214", attendance: "97.0%", gpa: "94.0%" }
  ];

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.parent.toLowerCase().includes(search.toLowerCase()) ||
    s.roll.toString().includes(search)
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      <div className="mobile-content" style={{ flex: 1, gap: "1.25rem" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.65rem", borderRadius: "99px", background: "rgba(16, 185, 129, 0.15)", color: "var(--primary)", fontSize: "0.72rem", fontWeight: 800 }}>
              <Sparkles size={12} /> Student Roster
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
              Student Directory
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Assigned Class Roster & Parent Contacts
            </p>
          </div>

          <Link href="/dashboard" style={{
            padding: "0.5rem 0.85rem", borderRadius: "var(--radius-md)",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#ffffff", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "0.3rem"
          }}>
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        {/* SEARCH & FILTER */}
        <div className="glass-card" style={{ padding: "0.85rem", display: "flex", gap: "0.5rem" }}>
          <div className="input-box-wrapper" style={{ flex: 1 }}>
            <Search size={15} className="input-icon" />
            <input 
              type="text" 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search by student name or roll #..." 
              className="input-field" 
              style={{ padding: "0.55rem 0.55rem 0.55rem 2.2rem", fontSize: "0.8rem" }}
            />
          </div>

          <select 
            value={selectedClass} 
            onChange={e => setSelectedClass(e.target.value)}
            style={{ padding: "0.55rem 0.65rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#fff", fontSize: "0.78rem", fontWeight: 700 }}
          >
            <option value="Class 10-A">Class 10-A</option>
            <option value="Class 9-B">Class 9-B</option>
          </select>
        </div>

        {/* ════════════ STUDENT ROSTER LIST ════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {filtered.map((s) => (
            <div key={s.roll} className="glass-card" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 900, color: "#ffffff" }}>Roll #{s.roll} — {s.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>Parent: <strong style={{ color: "#fff" }}>{s.parent}</strong></div>
                </div>

                <span style={{ fontSize: "0.75rem", fontWeight: 900, color: "var(--primary)", background: "rgba(16,185,129,0.15)", padding: "0.2rem 0.55rem", borderRadius: 6 }}>
                  GPA: {s.gpa}
                </span>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.6rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--success)", fontWeight: 700 }}>Attendance: {s.attendance}</span>
                
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <a href={`tel:${s.phone}`} style={{ textDecoration: "none", color: "var(--primary)", padding: "0.35rem 0.65rem", borderRadius: 8, background: "rgba(16,185,129,0.15)", fontSize: "0.72rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Phone size={12} /> Call
                  </a>

                  <Link href="/communication/messages" style={{ textDecoration: "none", color: "#fff", padding: "0.35rem 0.65rem", borderRadius: 8, background: "rgba(255,255,255,0.06)", fontSize: "0.72rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <MessageSquare size={12} /> Chat
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <TeacherBottomNav />

    </div>
  );
}
