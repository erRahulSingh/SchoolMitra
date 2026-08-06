"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, Building2, Mail, Phone, MapPin, Users, ShieldCheck, Sparkles } from "lucide-react";

interface SchoolRegistrationModalProps {
  onClose: () => void;
}

export default function SchoolRegistrationModal({ onClose }: SchoolRegistrationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: "",
    adminName: "",
    adminEmail: "",
    phone: "",
    city: "",
    studentCount: "500-1500"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(15, 23, 42, 0.8)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 99999,
      padding: "1.2rem",
      animation: "fadeIn 0.25s ease-out"
    }}>
      {/* Modal Card */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
        borderRadius: 24,
        padding: "2.2rem 2rem",
        maxWidth: 500,
        width: "100%",
        position: "relative",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 25px 70px rgba(0, 0, 0, 0.6), 0 0 50px rgba(67, 56, 202, 0.25)",
        color: "#ffffff",
        overflow: "hidden"
      }}>
        {/* Ambient Top Glow Blob */}
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none"
        }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#cbd5e1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.2)";
            (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.08)";
            (e.currentTarget as HTMLButtonElement).style.color = "#cbd5e1";
          }}
        >
          <X size={18} />
        </button>

        {submitted ? (
          /* Success Screen */
          <div style={{ textAlign: "center", padding: "1.5rem 0.5rem" }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.4) 100%)",
              border: "2px solid #10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem auto",
              boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)"
            }}>
              <CheckCircle2 size={40} color="#10b981" />
            </div>

            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.5rem" }}>
              Campus Registered! 🎉
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.6, marginBottom: "1.8rem" }}>
              Thank you for registering <strong style={{ color: "#ffffff" }}>{formData.schoolName || "your school"}</strong>. Our dedicated onboarding team will call you within <strong style={{ color: "#38bdf8" }}>2 hours</strong> to activate your live workspace.
            </p>

            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 16,
              padding: "1rem",
              marginBottom: "1.8rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.55rem",
              textAlign: "left",
              fontSize: "0.82rem",
              color: "#cbd5e1"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={16} color="#10b981" /> <span>Free 14-Day Full Suite Enterprise Trial</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={16} color="#10b981" /> <span>Dedicated Onboarding Assistant Assigned</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={16} color="#10b981" /> <span>Zero Credit Card Required</span>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "0.85rem",
                borderRadius: 14,
                background: "linear-gradient(135deg, #4338ca 0%, #3b82f6 100%)",
                color: "#ffffff",
                border: "none",
                fontWeight: 800,
                fontSize: "0.95rem",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(67, 56, 202, 0.4)"
              }}
            >
              Done &amp; Return to Website
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {/* Top Pill Badge */}
            <div>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.35rem 0.85rem",
                borderRadius: 99,
                background: "rgba(59, 130, 246, 0.12)",
                color: "#60a5fa",
                fontSize: "0.78rem",
                fontWeight: 800,
                border: "1px solid rgba(59, 130, 246, 0.25)",
                marginBottom: "0.75rem"
              }}>
                <Sparkles size={14} color="#60a5fa" /> FREE 14-DAY FULL CAMPUS TRIAL
              </span>

              <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.2, marginBottom: "0.35rem" }}>
                Register Your School
              </h2>
              <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>
                Get instant access to SchoolMitra ERP, Parent App &amp; Fleet GPS.
              </p>
            </div>

            {/* School Name */}
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "0.35rem" }}>
                School Name *
              </label>
              <div style={{ position: "relative" }}>
                <Building2 size={18} color="#64748b" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  required
                  placeholder="e.g. DPS International School"
                  value={formData.schoolName}
                  onChange={e => setFormData({ ...formData, schoolName: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem 0.75rem 2.6rem",
                    borderRadius: 12,
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    background: "rgba(255, 255, 255, 0.06)",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    fontFamily: "inherit",
                    outline: "none"
                  }}
                />
              </div>
            </div>

            {/* Admin Name & Email Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              {/* Admin Name */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "0.35rem" }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Principal / Admin"
                  value={formData.adminName}
                  onChange={e => setFormData({ ...formData, adminName: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.9rem",
                    borderRadius: 12,
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    background: "rgba(255, 255, 255, 0.06)",
                    color: "#ffffff",
                    fontSize: "0.88rem",
                    fontFamily: "inherit",
                    outline: "none"
                  }}
                />
              </div>

              {/* Work Email */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "0.35rem" }}>
                  Work Email *
                </label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} color="#64748b" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    type="email"
                    required
                    placeholder="admin@school.com"
                    value={formData.adminEmail}
                    onChange={e => setFormData({ ...formData, adminEmail: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.75rem 0.75rem 2.3rem",
                      borderRadius: 12,
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      background: "rgba(255, 255, 255, 0.06)",
                      color: "#ffffff",
                      fontSize: "0.88rem",
                      fontFamily: "inherit",
                      outline: "none"
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Phone Number & City Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              {/* Phone */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "0.35rem" }}>
                  Phone Number *
                </label>
                <div style={{ position: "relative" }}>
                  <Phone size={16} color="#64748b" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.75rem 0.75rem 2.3rem",
                      borderRadius: 12,
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      background: "rgba(255, 255, 255, 0.06)",
                      color: "#ffffff",
                      fontSize: "0.88rem",
                      fontFamily: "inherit",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "0.35rem" }}>
                  City / State *
                </label>
                <div style={{ position: "relative" }}>
                  <MapPin size={16} color="#64748b" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Delhi"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.75rem 0.75rem 2.3rem",
                      borderRadius: 12,
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      background: "rgba(255, 255, 255, 0.06)",
                      color: "#ffffff",
                      fontSize: "0.88rem",
                      fontFamily: "inherit",
                      outline: "none"
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Student Count Selection */}
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "0.35rem" }}>
                Total Active Students
              </label>
              <div style={{ position: "relative" }}>
                <Users size={16} color="#64748b" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <select
                  value={formData.studentCount}
                  onChange={e => setFormData({ ...formData, studentCount: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.75rem 0.75rem 2.3rem",
                    borderRadius: 12,
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    background: "#1e1b4b",
                    color: "#ffffff",
                    fontSize: "0.88rem",
                    fontFamily: "inherit",
                    outline: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="under-500">Under 500 Students</option>
                  <option value="500-1500">500 - 1,500 Students</option>
                  <option value="1500-3500">1,500 - 3,500 Students</option>
                  <option value="3500+">3,500+ Students (Enterprise)</option>
                </select>
              </div>
            </div>

            {/* Trust Footer Notice */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.74rem", color: "#94a3b8", marginTop: "0.2rem" }}>
              <ShieldCheck size={14} color="#10b981" />
              <span>ISO 27001 Certified • Bank-grade 256-bit Encryption</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.9rem",
                borderRadius: 14,
                border: "none",
                background: "linear-gradient(135deg, #4338ca 0%, #3b82f6 100%)",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "0.98rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.55rem",
                boxShadow: "0 10px 25px rgba(67, 56, 202, 0.45)",
                marginTop: "0.3rem",
                transition: "all 0.2s ease"
              }}
            >
              Submit &amp; Launch Trial Workspace <Send size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
