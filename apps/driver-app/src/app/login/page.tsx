"use client";

import React, { useState } from "react";
import { 
  Bus, Lock, Phone, UserCheck, Key, Eye, EyeOff, 
  ArrowRight, ShieldCheck, HelpCircle, CheckCircle2, 
  RefreshCw, Sparkles, Smartphone, AlertCircle, ArrowLeft
} from "lucide-react";

export default function DriverLoginPage({ onLoginSuccess }: { onLoginSuccess?: (user: any) => void }) {
  const [loginMethod, setLoginMethod] = useState<"password" | "otp" | "empid">("password");
  const [phoneOrEmpId, setPhoneOrEmpId] = useState("driver@schoolmitra.com");
  const [password, setPassword] = useState("driver123");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    setTimeout(() => {
      setLoading(false);
      const demoUser = {
        name: "Ram Singh",
        email: "driver@schoolmitra.com",
        phone: "+91 98111 22334",
        empId: "EMP-DRV-104",
        busNo: "DL 01 AB 4321",
        routeName: "Route 1 Express"
      };

      if (onLoginSuccess) {
        onLoginSuccess(demoUser);
      } else {
        localStorage.setItem("driverUser", JSON.stringify(demoUser));
        window.location.reload();
      }
    }, 800);
  };

  const handleSendOtp = () => {
    if (!phoneOrEmpId) return;
    setOtpSent(true);
    setOtp("4321");
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSubmitted(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSubmitted(false);
      setForgotPhone("");
    }, 1500);
  };

  const autoFillDemo = () => {
    setPhoneOrEmpId("driver@schoolmitra.com");
    setPassword("driver123");
  };

  return (
    <div className="driver-frame" style={{ background: "#020617", color: "#fff", display: "flex", flexDirection: "column", padding: "2.8rem 1.5rem 1.5rem 1.5rem" }}>
      <div className="mobile-notch" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        
        {/* HEADER BRANDING */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{
            width: 56, height: 56, borderRadius: 18,
            background: "linear-gradient(135deg, #10b981, #059669)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1rem auto",
            boxShadow: "0 8px 24px rgba(16, 185, 129, 0.35)"
          }}>
            <Bus size={32} color="#fff" />
          </div>

          <h2 style={{ fontSize: "1.45rem", fontWeight: 900, letterSpacing: "-0.01em" }}>Driver Cockpit Login</h2>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: 4 }}>
            Enter assigned vehicle driver credentials
          </p>
        </div>

        {/* LOGIN METHOD SELECTOR TABS */}
        <div style={{
          display: "flex", background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)",
          padding: "0.3rem", borderRadius: 14, marginBottom: "1.5rem"
        }}>
          <button
            type="button"
            onClick={() => setLoginMethod("password")}
            style={{
              flex: 1, padding: "0.55rem 0.35rem", border: "none", borderRadius: 10,
              background: loginMethod === "password" ? "linear-gradient(135deg, #10b981, #059669)" : "transparent",
              color: loginMethod === "password" ? "#fff" : "#94a3b8",
              fontSize: "0.74rem", fontWeight: 800, cursor: "pointer"
            }}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod("otp")}
            style={{
              flex: 1, padding: "0.55rem 0.35rem", border: "none", borderRadius: 10,
              background: loginMethod === "otp" ? "linear-gradient(135deg, #10b981, #059669)" : "transparent",
              color: loginMethod === "otp" ? "#fff" : "#94a3b8",
              fontSize: "0.74rem", fontWeight: 800, cursor: "pointer"
            }}
          >
            Mobile OTP
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod("empid")}
            style={{
              flex: 1, padding: "0.55rem 0.35rem", border: "none", borderRadius: 10,
              background: loginMethod === "empid" ? "linear-gradient(135deg, #10b981, #059669)" : "transparent",
              color: loginMethod === "empid" ? "#fff" : "#94a3b8",
              fontSize: "0.74rem", fontWeight: 800, cursor: "pointer"
            }}
          >
            Employee ID
          </button>
        </div>

        {errorMsg && (
          <div style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", padding: "0.75rem", borderRadius: "12px", color: "#f87171", fontSize: "0.78rem", fontWeight: 700, marginBottom: "1rem" }}>
            {errorMsg}
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          {/* FIELD 1: MOBILE NUMBER / EMP ID / EMAIL */}
          <div>
            <label style={{ fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>
              {loginMethod === "empid" ? "Employee ID (e.g. EMP-DRV-104)" : "Mobile Number / Email"}
            </label>
            <div style={{ position: "relative" }}>
              <Smartphone size={16} color="#64748b" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                value={phoneOrEmpId}
                onChange={(e) => setPhoneOrEmpId(e.target.value)}
                placeholder={loginMethod === "empid" ? "EMP-DRV-104" : "+91 98111 22334 or driver@schoolmitra.com"}
                required
                style={{ width: "100%", padding: "0.78rem 0.78rem 0.78rem 2.4rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "0.85rem", outline: "none" }}
              />
            </div>
          </div>

          {/* FIELD 2: PASSWORD OR OTP */}
          {loginMethod !== "otp" ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                <label style={{ fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700 }}>Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  style={{ background: "none", border: "none", color: "#10b981", fontSize: "0.72rem", fontWeight: 800, cursor: "pointer" }}
                >
                  Forgot Password?
                </button>
              </div>

              <div style={{ position: "relative" }}>
                <Lock size={16} color="#64748b" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ width: "100%", padding: "0.78rem 2.5rem 0.78rem 2.4rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#64748b", cursor: "pointer" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label style={{ fontSize: "0.75rem", color: "#cbd5e1", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>SMS OTP Code</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <Key size={16} color="#64748b" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 4-digit OTP"
                    style={{ width: "100%", padding: "0.78rem 0.78rem 0.78rem 2.4rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "0.85rem", outline: "none" }}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  style={{ padding: "0.78rem 0.85rem", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "12px", color: "#10b981", fontSize: "0.75rem", fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  {otpSent ? "Resend OTP" : "Send OTP"}
                </button>
              </div>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "0.85rem",
              background: "linear-gradient(135deg, #10b981, #059669)",
              border: "none", borderRadius: "12px", color: "#fff",
              fontSize: "0.88rem", fontWeight: 800, cursor: "pointer",
              boxShadow: "0 6px 20px rgba(16, 185, 129, 0.35)", marginTop: "0.5rem",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem"
            }}
          >
            <span>{loading ? "Authenticating Cockpit..." : "Sign In to Driver Cockpit"}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* DEMO CREDENTIALS AUTOFILL BADGE */}
        <div style={{ marginTop: "1.25rem", padding: "0.75rem 0.85rem", background: "rgba(16, 185, 129, 0.1)", border: "1px dashed rgba(16, 185, 129, 0.3)", borderRadius: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.72rem", color: "#6ee7b7", fontWeight: 800 }}>Demo Driver Account</div>
            <div style={{ fontSize: "0.68rem", color: "#94a3b8" }}>Email: driver@schoolmitra.com</div>
          </div>
          <button
            type="button"
            onClick={autoFillDemo}
            style={{ background: "#10b981", border: "none", color: "#fff", padding: "0.35rem 0.65rem", borderRadius: 8, fontSize: "0.7rem", fontWeight: 800, cursor: "pointer" }}
          >
            Auto Fill
          </button>
        </div>

      </div>

      {/* ════════════ FORGOT PASSWORD MODAL ════════════ */}
      {showForgotModal && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)",
          zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "1.5rem", width: "100%", maxWidth: 360 }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.35rem" }}>Reset Driver Password</h3>
            <p style={{ fontSize: "0.78rem", color: "#94a3b8", marginBottom: "1.25rem", lineHeight: 1.4 }}>
              Enter your registered mobile number or Employee ID to receive an OTP reset link.
            </p>

            {forgotSubmitted ? (
              <div style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "0.85rem", borderRadius: 12, color: "#34d399", fontSize: "0.82rem", fontWeight: 800, textAlign: "center" }}>
                ✅ Password reset OTP sent to registered mobile!
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                  type="text"
                  value={forgotPhone}
                  onChange={(e) => setForgotPhone(e.target.value)}
                  placeholder="Enter Mobile / Employee ID"
                  required
                  style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff", fontSize: "0.85rem" }}
                />

                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    style={{ flex: 1, padding: "0.7rem", background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ flex: 1, padding: "0.7rem", background: "linear-gradient(135deg, #10b981, #059669)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 800, fontSize: "0.8rem", cursor: "pointer" }}
                  >
                    Send OTP Reset
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
