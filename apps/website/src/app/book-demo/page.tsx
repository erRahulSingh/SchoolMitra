"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Sparkles, User, Mail, Building, CheckCircle, GraduationCap } from "lucide-react";

export default function BookDemoPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const timeSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, var(--bg-page) 0%, var(--bg-subtle) 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      color: "var(--text-main)",
      padding: "2.5rem 2rem",
      position: "relative"
    }}>
      <div style={{
        maxWidth: 550,
        width: "100%",
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: 24,
        padding: "2.5rem",
        boxShadow: "0 12px 40px rgba(0,0,0,0.03)"
      }}>
        {/* Brand Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #4338ca 0%, #3b82f6 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", boxShadow: "0 4px 12px rgba(67, 56, 202, 0.25)"
            }}><GraduationCap size={20} /></div>
            <span style={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
              <span style={{ color: "var(--text-main)" }}>School</span>
              <span style={{ color: "#3b82f6" }}>Mitra</span>
            </span>
          </Link>
        </div>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <CheckCircle size={56} color="#10b981" style={{ marginBottom: "1.25rem" }} />
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.65rem" }}>Demo Booked!</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Thank you, <strong style={{ color: "var(--text-main)" }}>{fullName}</strong>. We have reserved your interactive demo session for:
            </p>
            <div style={{
              background: "var(--bg-subtle)", border: "1px solid var(--border-color)",
              padding: "1rem", borderRadius: 16, display: "inline-flex", flexDirection: "column",
              gap: "0.35rem", minWidth: 240, marginBottom: "2rem"
            }}>
              <span style={{ fontSize: "0.82rem", color: "var(--text-light)", fontWeight: 700 }}>SCHEDULED FOR</span>
              <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#4f46e5" }}>📅 {selectedDate}</span>
              <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-main)" }}>⏰ {selectedTime} (IST)</span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "2rem" }}>
              A calendar invitation along with the Google Meet session link has been dispatched to your email.
            </p>
            <Link href="/" style={{
              display: "block", width: "100%", padding: "0.8rem", borderRadius: 12,
              background: "#4f46e5", color: "#fff", fontWeight: 700, fontSize: "0.9rem",
              textDecoration: "none", boxShadow: "0 4px 14px rgba(79, 70, 229, 0.2)"
            }}>Back to Home</Link>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.3rem 0.8rem", borderRadius: 9999, background: "#fef3c7",
                color: "#d97706", fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.55rem"
              }}>
                <Sparkles size={12} /> Book an Interactive Session
              </div>
              <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--text-main)" }}>Experience SchoolMitra</h2>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Select a preferred slot to review features with our expert engineers</p>
            </div>

            <form onSubmit={handleBooking} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {/* Full Name */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Full Name</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "0.95rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    style={{
                      width: "100%", padding: "0.75rem 1rem 0.75rem 2.6rem", borderRadius: 10,
                      border: "1px solid var(--border-color)", background: "var(--bg-page)",
                      color: "var(--text-main)", fontSize: "0.88rem", outline: "none"
                    }}
                  />
                </div>
              </div>

              {/* Work Email */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Work Email</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "0.95rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    placeholder="Enter work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: "100%", padding: "0.75rem 1rem 0.75rem 2.6rem", borderRadius: 10,
                      border: "1px solid var(--border-color)", background: "var(--bg-page)",
                      color: "var(--text-main)", fontSize: "0.88rem", outline: "none"
                    }}
                  />
                </div>
              </div>

              {/* School Name */}
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>School Name</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "0.95rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                    <Building size={16} />
                  </span>
                  <input
                    type="text"
                    placeholder="Enter school name"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    required
                    style={{
                      width: "100%", padding: "0.75rem 1rem 0.75rem 2.6rem", borderRadius: 10,
                      border: "1px solid var(--border-color)", background: "var(--bg-page)",
                      color: "var(--text-main)", fontSize: "0.88rem", outline: "none"
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "1rem" }}>
                {/* Date slot */}
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Preferred Date</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                      <Calendar size={15} />
                    </span>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                      style={{
                        width: "100%", padding: "0.75rem 0.85rem 0.75rem 2.4rem", borderRadius: 10,
                        border: "1px solid var(--border-color)", background: "var(--bg-page)",
                        color: "var(--text-main)", fontSize: "0.82rem", outline: "none", cursor: "pointer"
                      }}
                    />
                  </div>
                </div>

                {/* Time slot */}
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Available Time</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                      <Clock size={15} />
                    </span>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      required
                      style={{
                        width: "100%", padding: "0.75rem 0.85rem 0.75rem 2.4rem", borderRadius: 10,
                        border: "1px solid var(--border-color)", background: "var(--bg-page)",
                        color: "var(--text-main)", fontSize: "0.82rem", outline: "none", cursor: "pointer"
                      }}
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((slot, k) => (
                        <option key={k} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%", padding: "0.8rem", borderRadius: 12, border: "none",
                  background: "#4f46e5", color: "#fff", fontWeight: 700, fontSize: "0.92rem",
                  cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  boxShadow: "0 4px 14px rgba(79,70,229,0.2)", marginTop: "0.5rem"
                }}
              >
                {loading ? "Scheduling..." : "Confirm Slot"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
