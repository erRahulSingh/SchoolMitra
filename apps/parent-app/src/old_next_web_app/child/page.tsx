"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  SquarePen, 
  Calendar, 
  Droplet, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  X
} from "lucide-react";

interface MyChildPageProps {
  language?: string;
  onNavigate?: (tab: string) => void;
}

export default function MyChildPage({ language = "en", onNavigate }: MyChildPageProps) {
  
  const [studentInfo, setStudentInfo] = useState({
    name: "Rohan Sharma",
    classSec: "Class 5th – A",
    rollNo: "Roll No. 12",
    admissionNo: "Admission No. GVP/2020/S12",
    dob: "12 Aug 2014",
    bloodGroup: "B+",
    address: "123, Green Park, Lucknow, Uttar Pradesh – 226001",
    fatherName: "Amit Sharma",
    motherName: "Anjali Sharma",
    phone: "+91 98765 43210",
    email: "anjali.sharma@email.com"
  });

  const [showEditModal, setShowEditModal] = useState(false);
  
  // Temporary form states
  const [editForm, setEditForm] = useState({
    bloodGroup: studentInfo.bloodGroup,
    address: studentInfo.address,
    phone: studentInfo.phone,
    email: studentInfo.email
  });

  const handleEditClick = () => {
    setEditForm({
      bloodGroup: studentInfo.bloodGroup,
      address: studentInfo.address,
      phone: studentInfo.phone,
      email: studentInfo.email
    });
    setShowEditModal(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentInfo(prev => ({
      ...prev,
      bloodGroup: editForm.bloodGroup,
      address: editForm.address,
      phone: editForm.phone,
      email: editForm.email
    }));
    setShowEditModal(false);
    alert("Student profile details updated successfully!");
  };

  const detailRows = [
    { id: "dob", label: "Date of Birth", value: studentInfo.dob, icon: Calendar },
    { id: "blood", label: "Blood Group", value: studentInfo.bloodGroup, icon: Droplet },
    { id: "address", label: "Address", value: studentInfo.address, icon: MapPin },
    { id: "father", label: "Father Name", value: studentInfo.fatherName, icon: User },
    { id: "mother", label: "Mother Name", value: studentInfo.motherName, icon: User },
    { id: "phone", label: "Phone", value: studentInfo.phone, icon: Phone },
    { id: "email", label: "Email", value: studentInfo.email, icon: Mail }
  ];

  return (
    <div style={{
      padding: "2.2rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%",
      width: "100%"
    }}>

      {/* ════════════ TOP HEADER BAR ════════════ */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem",
        borderBottom: "1px solid #f1f5f9"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            type="button"
            onClick={() => onNavigate ? onNavigate("profile") : window.history.back()}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "0",
              color: "#0f172a"
            }}
          >
            <ArrowLeft size={22} color="#0f172a" strokeWidth={2.2} />
          </button>

          <h1 style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#0f172a",
            fontFamily: "'Outfit', sans-serif"
          }}>
            Student Profile
          </h1>
        </div>

        <button
          type="button"
          onClick={handleEditClick}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0.2rem",
            color: "#0f172a"
          }}
        >
          <SquarePen size={22} color="#0f172a" strokeWidth={2} />
        </button>
      </div>

      {/* ════════════ STUDENT PROFILE HERO CARD ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
        borderRadius: "22px",
        padding: "1.25rem 1.2rem",
        color: "#ffffff",
        boxShadow: "0 10px 25px rgba(29, 78, 216, 0.25)",
        display: "flex",
        alignItems: "center",
        gap: "1.1rem"
      }}>
        {/* Avatar Circular Frame */}
        <div style={{
          width: "75px",
          height: "75px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "3px solid rgba(255, 255, 255, 0.9)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          flexShrink: 0,
          background: "#fef3c7"
        }}>
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=300"
            alt={studentInfo.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Details Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <h2 style={{
            fontSize: "1.2rem",
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "'Outfit', sans-serif",
            margin: 0
          }}>
            {studentInfo.name}
          </h2>

          <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#bfdbfe" }}>
            {studentInfo.classSec}
          </div>

          <div style={{ fontSize: "0.78rem", fontWeight: 500, color: "#93c5fd" }}>
            {studentInfo.rollNo}
          </div>

          <div style={{ fontSize: "0.78rem", fontWeight: 500, color: "#93c5fd" }}>
            {studentInfo.admissionNo}
          </div>
        </div>
      </div>

      {/* ════════════ STUDENT DETAILS LIST ════════════ */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.02)",
        overflow: "hidden"
      }}>
        {detailRows.map((row, idx) => {
          const IconComp = row.icon;
          const isLast = idx === detailRows.length - 1;
          return (
            <div
              key={row.id}
              style={{
                padding: "1rem 1.15rem",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                borderBottom: isLast ? "none" : "1px solid #f1f5f9",
                gap: "1.5rem"
              }}
            >
              {/* Left Side: Icon & Label */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexShrink: 0 }}>
                <IconComp size={20} color="#64748b" strokeWidth={2} />
                <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#475569" }}>
                  {row.label}
                </span>
              </div>

              {/* Right Side: Value */}
              <span style={{
                fontSize: "0.88rem",
                fontWeight: 800,
                color: "#0f172a",
                textAlign: "right",
                lineHeight: 1.4
              }}>
                {row.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* ════════════ EDIT STUDENT PROFILE DETAILS MODAL ════════════ */}
      {showEditModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(5px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem"
        }}>
          <div style={{
            width: "100%",
            maxWidth: "420px",
            background: "#ffffff",
            borderRadius: "24px",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.1rem",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
          }}>
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                Edit Student Profile
              </h3>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "50%",
                  padding: "0.4rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <X size={18} color="#64748b" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "0.95rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569" }}>
                  Blood Group
                </label>
                <input
                  type="text"
                  required
                  value={editForm.bloodGroup}
                  onChange={(e) => setEditForm({ ...editForm, bloodGroup: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.9rem",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    marginTop: "4px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    outline: "none"
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569" }}>
                  Address
                </label>
                <textarea
                  required
                  rows={2}
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.9rem",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    marginTop: "4px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    outline: "none",
                    resize: "none"
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569" }}>
                  Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.9rem",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    marginTop: "4px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    outline: "none"
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.9rem",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    marginTop: "4px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    outline: "none"
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    background: "#1d4ed8",
                    border: "none",
                    borderRadius: "14px",
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(29, 78, 216, 0.2)"
                  }}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  style={{
                    padding: "0.75rem 1.1rem",
                    background: "#f1f5f9",
                    border: "none",
                    borderRadius: "14px",
                    color: "#475569",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
