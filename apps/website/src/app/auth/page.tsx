"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Lock, Building, Phone, MapPin, X } from "lucide-react";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (searchParams.get("mode") === "signup") {
      setIsLogin(false);
    }
  }, [searchParams]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form Fields (Main Form)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");

  // Google Incomplete Profile Modal
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tempGoogleToken, setTempGoogleToken] = useState("");

  // Email Modal Form State (Email Button Click)
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailFormEmail, setEmailFormEmail] = useState("");
  const [emailFormPassword, setEmailFormPassword] = useState("");
  const [emailFormConfirmPassword, setEmailFormConfirmPassword] = useState("");
  const [emailFormError, setEmailFormError] = useState("");
  const [emailFormLoading, setEmailFormLoading] = useState(false);

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin
        ? { email, password }
        : { email, password, schoolName, phone: mobileNumber, address };

      const res = await fetch(`http://127.0.0.1:5000/api/v1${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      localStorage.setItem("token", data.data.accessToken);
      window.location.href = "http://localhost:3000";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Login: Initiates Google OAuth screen to select device Google accounts
  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:5000/api/v1/auth/google";
  };

  // Email Modal Submit (Only Email, Password & Confirm Password)
  const handleEmailFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailFormError("");

    if (emailFormPassword !== emailFormConfirmPassword) {
      setEmailFormError("Passwords do not match!");
      return;
    }

    try {
      setEmailFormLoading(true);

      const res = await fetch("http://127.0.0.1:5000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailFormEmail,
          password: emailFormPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (data.data?.accessToken) {
        localStorage.setItem("token", data.data.accessToken);
      }
      window.location.href = "http://localhost:3000";
    } catch (err: any) {
      setEmailFormError(err.message);
    } finally {
      setEmailFormLoading(false);
    }
  };

  // Forgot Password Submit Handler
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError("");
    setForgotSuccess("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to process request");
      }

      setForgotSuccess("Password reset instructions have been sent to your email.");
    } catch (err: any) {
      setForgotError(err.message);
    } finally {
      setForgotLoading(false);
    }
  };

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://127.0.0.1:5000/api/v1/auth/complete-profile", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tempGoogleToken}`
        },
        body: JSON.stringify({ phone: mobileNumber, schoolName, address }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Profile completion failed");
      }

      localStorage.setItem("token", data.data.accessToken);
      window.location.href = "http://localhost:3000";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --auth-blue: #2563eb;
          --auth-yellow: #fbbf24;
          --auth-text: #0f172a;
          --auth-text-muted: #64748b;
          --auth-border: #e2e8f0;
          --auth-input-bg: #f8fafc;
        }

        .auth-container {
          display: flex;
          height: 100vh;
          width: 100%;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: #ffffff;
          align-items: stretch;
          justify-content: center;
          padding: 0;
          margin: 0;
          overflow: hidden;
        }

        @media (max-width: 600px) {
          .auth-container {
            height: auto;
            min-height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
          }
        }

        .auth-card-container {
          display: flex;
          width: 100%;
          max-width: none;
          height: 100vh;
          background: #ffffff;
          border-radius: 0;
          box-shadow: none;
          overflow: hidden;
        }

        @media (max-width: 600px) {
          .auth-card-container {
            height: auto;
            min-height: 100vh;
            overflow: visible;
          }
        }

        /* ──── Image Side (Left) ──── */
        .auth-image-side {
          flex: 1;
          display: none;
          position: relative;
          background: #0f1629;
        }

        @media (min-width: 900px) {
          .auth-image-side {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        }

        .auth-cover-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 1;
        }

        .auth-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(6,11,25,0.2) 0%, rgba(6,11,25,0.05) 40%, rgba(6,11,25,0.8) 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 4rem 3.5rem;
          z-index: 2;
        }

        .auth-top-text {
          text-align: center;
          color: #ffffff;
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .auth-overlay-text {
          margin-top: auto;
        }

        .auth-overlay-text h2 {
          color: #ffffff;
          font-size: clamp(2rem, 3vw, 2.5rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .auth-overlay-text p {
          color: #e2e8f0;
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 480px;
        }

        .auth-highlight-text {
          color: var(--auth-yellow);
        }

        /* ──── Form Side (Right) ──── */
        .auth-form-side {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 4rem;
          background: #ffffff;
          position: relative;
          overflow-y: auto;
        }

        @media (max-width: 600px) {
          .auth-form-side {
            padding: 2.5rem 1.5rem;
            height: auto;
            overflow: visible;
            justify-content: flex-start;
          }
        }

        .auth-form-wrapper {
          width: 100%;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .auth-logo {
          height: 48px;
          width: auto;
          max-width: 220px;
          object-fit: contain;
          margin-bottom: 1.25rem;
        }

        .auth-title {
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          text-align: center;
          margin-bottom: 0.3rem;
          color: var(--auth-text);
        }
        
        .auth-subtitle {
          text-align: center;
          color: var(--auth-text-muted);
          font-size: 0.85rem;
          line-height: 1.4;
          margin-bottom: 1.5rem;
          max-width: 380px;
        }

        @media (max-width: 600px) {
          .auth-title {
            font-size: 1.4rem;
          }
          .auth-subtitle {
            font-size: 0.8rem;
            margin-bottom: 1.2rem;
          }
        }

        .auth-form {
          width: 100%;
        }

        .auth-input-group {
          position: relative;
          margin-bottom: 1rem;
        }

        .auth-input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
        }

        .auth-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.8rem;
          border-radius: 12px;
          border: 1px solid var(--auth-border);
          background: #ffffff;
          font-family: inherit;
          font-size: 0.85rem;
          color: var(--auth-text);
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        
        .auth-input::placeholder {
          color: #94a3b8;
        }

        .auth-input:focus {
          outline: none;
          border-color: var(--auth-blue);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .auth-submit-btn {
          width: 100%;
          padding: 0.9rem;
          border-radius: 8px;
          border: none;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1rem;
          background: var(--auth-blue);
          color: #ffffff;
        }

        .auth-submit-btn:hover {
          background: #1d4ed8;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 1.5rem 0;
          color: var(--auth-text-muted);
          font-size: 0.8rem;
          font-weight: 500;
          width: 100%;
        }
        
        .auth-divider::before, .auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid var(--auth-border);
        }
        .auth-divider span {
          padding: 0 1rem;
        }

        .auth-social-group {
          display: flex;
          flex-direction: row !important;
          gap: 0.85rem;
          width: 100%;
        }

        @media (max-width: 600px) {
          .auth-social-group {
            flex-direction: row !important;
            gap: 0.5rem;
          }
          .auth-social-btn {
            padding: 0.65rem 0.4rem !important;
            font-size: 0.82rem !important;
          }
        }

        .auth-social-btn {
          flex: 1;
          padding: 0.7rem;
          border-radius: 8px;
          border: 1px solid var(--auth-border);
          background: #ffffff;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--auth-text);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }
        
        .auth-social-btn:hover {
          background: #f8fafc;
        }

        .auth-error {
          background: #fef2f2;
          color: #ef4444;
          padding: 0.8rem;
          border-radius: 8px;
          border: 1px solid #fca5a5;
          font-size: 0.85rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1rem;
          width: 100%;
        }

        .auth-success {
          background: #f0fdf4;
          color: #16a34a;
          padding: 0.8rem;
          border-radius: 8px;
          border: 1px solid #bbf7d0;
          font-size: 0.85rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1rem;
          width: 100%;
        }

        /* ──── Modal ──── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 1rem;
        }

        .modal-content {
          background: #ffffff;
          width: 100%;
          max-width: 450px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: slideUp 0.3s ease-out forwards;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modal-header {
          background: #f8fafc;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e2e8f0;
          position: relative;
        }

        .modal-body {
          padding: 2rem;
        }
      `}} />

      <div className="auth-container">
        <div className="auth-card-container">
          
          {/* LEFT SIDE: IMAGE SPLIT */}
          <div className="auth-image-side">
            <img 
              src="/images/gps-telemetry-bus-3d.png" 
              alt="SchoolMitra Modern Campus" 
              className="auth-cover-image" 
              onError={(e) => { e.currentTarget.src = "/images/erp-live-tracking.png" }}
            />
            <div className="auth-image-overlay">
              <div className="auth-top-text">
                SCHOOLMITRA DIGITAL CAMPUS
              </div>
              
              <div className="auth-overlay-text">
                <h2>Your Entire Campus, <br/><span className="auth-highlight-text">Fully Digital.</span></h2>
                <p>Join SchoolMitra to move every aspect of your school online and access Bus Live Tracking. Experience the future of School ERP: Manage student records, fee collections, tracking, and communications through our seamless Digitize Every School Workflow Today.</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: FORM */}
          <div className="auth-form-side">
            <div className="auth-form-wrapper">
              
              <img src="/images/resources/logo.png" alt="SchoolMitra" className="auth-logo" />

              <h2 className="auth-title">
                {isLogin ? "Welcome back" : "Create account"}
              </h2>
              <p className="auth-subtitle">
                {isLogin ? (
                  <>Enter your details to <span style={{ color: "#f97316", fontWeight: 600 }}>access your dashboard.</span></>
                ) : (
                  <>Join SchoolMitra today to digitize your campus and access powerful features like <span style={{ color: "#f97316", fontWeight: 600 }}>Bus Live Tracking.</span></>
                )}
              </p>

              {error && <div className="auth-error">{error}</div>}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-input-group">
                  <Mail className="auth-input-icon" size={16} strokeWidth={2.5} />
                  <input
                    type="email"
                    required
                    className="auth-input"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="auth-input-group">
                  <Lock className="auth-input-icon" size={16} strokeWidth={2.5} />
                  <input
                    type="password"
                    required
                    className="auth-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {!isLogin && (
                  <div style={{ animation: "slideUp 0.3s ease-out" }}>
                    <div className="auth-input-group">
                      <Building className="auth-input-icon" size={16} strokeWidth={2.5} />
                      <input
                        type="text"
                        required
                        className="auth-input"
                        placeholder="School Name (Required)"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                      />
                    </div>

                    <div className="auth-input-group">
                      <Phone className="auth-input-icon" size={16} strokeWidth={2.5} />
                      <input
                        type="tel"
                        required
                        className="auth-input"
                        placeholder="Mobile Number (Required)"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </div>

                    <div className="auth-input-group">
                      <MapPin className="auth-input-icon" size={16} strokeWidth={2.5} />
                      <input
                        type="text"
                        className="auth-input"
                        placeholder="Address (Optional)"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* LOGIN FAIL / ERROR HONE PAR LOGIN BUTTON KE JUST UPER LEFT SIDE ME RED COLOR FORGOT PASSWORD */}
                {isLogin && error && (
                  <div style={{ display: "flex", justifyContent: "flex-start", width: "100%", marginTop: "0.25rem" }}>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotEmail(email);
                        setShowForgotModal(true);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        padding: 0,
                        textAlign: "left",
                        textDecoration: "underline"
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="auth-submit-btn"
                >
                  {loading ? "Processing..." : (isLogin ? "Login" : "Create Account")}
                </button>
              </form>

              <div className="auth-divider">
                <span>Or continue with</span>
              </div>

              <div className="auth-social-group">
                <button type="button" onClick={handleGoogleLogin} disabled={loading} className="auth-social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </button>
                <button 
                  type="button" 
                  className="auth-social-btn" 
                  onClick={() => setShowEmailModal(true)}
                  disabled={loading}
                >
                  <Mail size={18} strokeWidth={2.2} />
                  Email
                </button>
              </div>

              <div style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#64748b", textAlign: "center", width: "100%" }}>
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <button type="button" onClick={() => setIsLogin(false)} style={{ background: "none", border: "none", color: "#2563eb", fontWeight: 700, cursor: "pointer", padding: 0, fontSize: "0.9rem" }}>
                      Signup
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button type="button" onClick={() => setIsLogin(true)} style={{ background: "none", border: "none", color: "#2563eb", fontWeight: 700, cursor: "pointer", padding: 0, fontSize: "0.9rem" }}>
                      Login here
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FORGOT PASSWORD MODAL */}
        {showForgotModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <button 
                  onClick={() => setShowForgotModal(false)}
                  style={{ position: "absolute", top: "1rem", right: "1rem", background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }}
                >
                  <X size={24} />
                </button>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.25rem" }}>
                  Reset Your Password
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
                  Enter your email address to receive password reset instructions.
                </p>
              </div>
              
              <form onSubmit={handleForgotSubmit} className="modal-body">
                {forgotError && <div className="auth-error">{forgotError}</div>}
                {forgotSuccess && <div className="auth-success">{forgotSuccess}</div>}
                
                <div className="auth-input-group" style={{ marginBottom: "1.5rem" }}>
                  <Mail className="auth-input-icon" size={16} strokeWidth={2.5} />
                  <input
                    type="email"
                    required
                    className="auth-input"
                    placeholder="Registered Email Address"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="auth-submit-btn"
                  style={{ marginTop: 0 }}
                >
                  {forgotLoading ? "Sending Link..." : "Send Reset Link"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* EMAIL REGISTRATION MODAL (Email, Password & Confirm Password only) */}
        {showEmailModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <button 
                  onClick={() => setShowEmailModal(false)}
                  style={{ position: "absolute", top: "1rem", right: "1rem", background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }}
                >
                  <X size={24} />
                </button>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.25rem" }}>
                  Email Registration
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
                  Enter your email and set a password to create an account.
                </p>
              </div>
              
              <form onSubmit={handleEmailFormSubmit} className="modal-body">
                {emailFormError && <div className="auth-error">{emailFormError}</div>}
                
                <div className="auth-input-group">
                  <Mail className="auth-input-icon" size={16} strokeWidth={2.5} />
                  <input
                    type="email"
                    required
                    className="auth-input"
                    placeholder="Email Address"
                    value={emailFormEmail}
                    onChange={(e) => setEmailFormEmail(e.target.value)}
                  />
                </div>

                <div className="auth-input-group">
                  <Lock className="auth-input-icon" size={16} strokeWidth={2.5} />
                  <input
                    type="password"
                    required
                    className="auth-input"
                    placeholder="Password"
                    value={emailFormPassword}
                    onChange={(e) => setEmailFormPassword(e.target.value)}
                  />
                </div>

                <div className="auth-input-group" style={{ marginBottom: "1.5rem" }}>
                  <Lock className="auth-input-icon" size={16} strokeWidth={2.5} />
                  <input
                    type="password"
                    required
                    className="auth-input"
                    placeholder="Confirm Password"
                    value={emailFormConfirmPassword}
                    onChange={(e) => setEmailFormConfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={emailFormLoading}
                  className="auth-submit-btn"
                  style={{ marginTop: 0 }}
                >
                  {emailFormLoading ? "Submitting..." : "Submit & Register"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* PROFILE COMPLETION MODAL */}
        {showProfileModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <button 
                  onClick={() => setShowProfileModal(false)}
                  style={{ position: "absolute", top: "1rem", right: "1rem", background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }}
                >
                  <X size={24} />
                </button>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e1b4b", marginBottom: "0.25rem" }}>
                  Complete Your Profile
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#475569", margin: 0 }}>
                  Just a few more details to set up your SchoolMitra workspace.
                </p>
              </div>
              
              <form onSubmit={handleCompleteProfile} className="modal-body">
                {error && <div className="auth-error">{error}</div>}
                
                <div className="auth-input-group">
                  <Building className="auth-input-icon" size={16} />
                  <input
                    type="text"
                    required
                    className="auth-input"
                    placeholder="School Name"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                </div>

                <div className="auth-input-group">
                  <Phone className="auth-input-icon" size={16} />
                  <input
                    type="tel"
                    required
                    className="auth-input"
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>

                <div className="auth-input-group" style={{ marginBottom: "2rem" }}>
                  <MapPin className="auth-input-icon" size={16} />
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="Address (Optional)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="auth-submit-btn"
                  style={{ marginTop: 0 }}
                >
                  {loading ? "Saving..." : "Finish Setup"}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}