"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Users, 
  GraduationCap
} from "lucide-react";

type AuthStep = 
  | "register" 
  | "role_selection" 
  | "complete_profile" 
  | "login" 
  | "forgot_password" 
  | "verify_otp";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const [authStep, setAuthStep] = useState<AuthStep>("login");

  useEffect(() => {
    if (searchParams?.get("mode") === "signup") {
      setAuthStep("register");
    }
  }, [searchParams]);

  // Global loading & error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Password Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ──── Form States ────
  // Step 1: Register Form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Step 2: Role Selection
  const [userRole, setUserRole] = useState<"teacher" | "student">("student");

  // Step 3: Complete Profile Form
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("India");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [schoolName, setSchoolName] = useState("");

  // Step 4: Login Form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Step 5: Forgot Password & OTP
  const [forgotEmail, setForgotEmail] = useState("");
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // Clear messages when step changes
  const changeStep = (step: AuthStep) => {
    setError("");
    setSuccessMsg("");
    setAuthStep(step);
  };

  // Resend code timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  // ──── Handlers ────

  // Step 1: Register Submit -> Proceeds to Role Selection
  const handleRegisterNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agreeTerms) {
      setError("Please accept the Terms of Service & Privacy Policy to proceed.");
      return;
    }
    if (!firstName || !regEmail || !regPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!username) {
      setUsername(`${firstName.toLowerCase()}${lastName.toLowerCase()}`);
    }

    changeStep("role_selection");
  };

  // Step 2: Role Selection Submit -> Proceeds to Complete Profile
  const handleRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changeStep("complete_profile");
  };

  // Step 3: Complete Profile Submit -> Registers User & Redirects to Login Screen
  const handleCompleteProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        firstName,
        lastName,
        email: regEmail,
        password: regPassword,
        role: userRole,
        username,
        country,
        phone: phoneNumber,
        address,
        state,
        zipCode,
        city,
        schoolName,
      };

      const res = await fetch("http://127.0.0.1:5000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccessMsg("Account created successfully! Please login with your credentials.");
      setLoginEmail(regEmail);
      changeStep("login");
    } catch (err: any) {
      setError(err.message || "Failed to complete registration");
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      if (data.data?.accessToken) {
        localStorage.setItem("token", data.data.accessToken);
      }
      window.location.href = "http://localhost:3000";
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Step 5a: Forgot Password Submit -> Sends Reset Code & Navigates to Verify Screen
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset link");
      }

      setResendTimer(60);
      changeStep("verify_otp");
    } catch (err: any) {
      setError(err.message || "Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  // Step 5b: Verify OTP & Password Reset Submit
  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const code = otpCode.join("");
    if (code.length < 6) {
      setError("Please enter the complete 6-digit verification code.");
      setLoading(false);
      return;
    }

    if (newPassword && newPassword !== confirmNewPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/api/v1/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: forgotEmail,
          code,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Invalid verification code");
      }

      setSuccessMsg("Password reset successfully! Please login with your new password.");
      setLoginEmail(forgotEmail);
      changeStep("login");
    } catch (err: any) {
      setError(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Resend Code Handler
  const handleResendCode = async () => {
    if (resendTimer > 0) return;
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to resend code");
      }

      setSuccessMsg("Verification code has been resent to your email.");
      setResendTimer(60);
    } catch (err: any) {
      setError(err.message || "Could not resend code");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:5000/api/v1/auth/google";
  };

  // Handle OTP digit box changes
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --brand-yellow: #f59e0b;
          --brand-yellow-hover: #d97706;
          --brand-yellow-light: #fffbeb;
          --brand-yellow-border: #fde68a;
          --brand-blue: #2563eb;
          --auth-text: #0f172a;
          --auth-text-muted: #64748b;
          --auth-border: #e2e8f0;
          --auth-input-bg: #ffffff;
        }

        .auth-container {
          display: flex;
          height: 100vh;
          width: 100%;
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          background-color: #ffffff;
          align-items: stretch;
          justify-content: center;
          padding: 0;
          margin: 0;
          overflow: hidden;
        }

        @media (max-width: 900px) {
          .auth-container {
            height: auto;
            min-height: 100vh;
            overflow-y: auto;
          }
        }

        .auth-card-container {
          display: flex;
          width: 100%;
          height: 100vh;
          background: #ffffff;
          overflow: hidden;
        }

        @media (max-width: 900px) {
          .auth-card-container {
            height: auto;
            min-height: 100vh;
          }
        }

        /* ──── Left Image Side ──── */
        .auth-image-side {
          flex: 1.1;
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
        }

        .auth-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(6,11,25,0.25) 0%, rgba(6,11,25,0.1) 40%, rgba(6,11,25,0.85) 100%);
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
          font-size: 1.35rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .auth-overlay-text h2 {
          color: #ffffff;
          font-size: clamp(2rem, 2.8vw, 2.5rem);
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
          color: #fbbf24;
        }

        /* ──── Right Form Side ──── */
        .auth-form-side {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 3rem;
          background: #ffffff;
          position: relative;
          overflow-y: auto;
        }

        @media (max-width: 600px) {
          .auth-form-side {
            padding: 2rem 1.5rem;
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
          height: 46px;
          width: auto;
          max-width: 220px;
          object-fit: contain;
          margin-bottom: 1rem;
        }

        .auth-subtitle-text {
          color: var(--auth-text-muted);
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.2rem;
          text-align: center;
        }

        .auth-title {
          font-size: 1.65rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          text-align: center;
          margin-bottom: 1.5rem;
          color: var(--auth-text);
        }

        /* Social Buttons */
        .auth-social-group {
          display: flex;
          flex-direction: row;
          gap: 0.75rem;
          width: 100%;
          margin-bottom: 1.25rem;
        }

        .auth-social-btn {
          flex: 1;
          padding: 0.65rem 0.5rem;
          border-radius: 10px;
          border: 1px solid var(--auth-border);
          background: #ffffff;
          font-weight: 600;
          font-size: 0.85rem;
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
          border-color: #cbd5e1;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 0.5rem 0 1.25rem 0;
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

        /* Inputs & Grid */
        .auth-form {
          width: 100%;
        }

        .auth-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        @media (max-width: 500px) {
          .auth-grid-2 {
            grid-template-columns: 1fr;
          }
        }

        .auth-input-group {
          position: relative;
          margin-bottom: 0.9rem;
          width: 100%;
        }

        .auth-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          border: 1px solid var(--auth-border);
          background: var(--auth-input-bg);
          font-family: inherit;
          font-size: 0.88rem;
          color: var(--auth-text);
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .auth-input-with-icon {
          padding-right: 2.5rem;
        }

        .auth-input::placeholder {
          color: #94a3b8;
        }

        .auth-input:focus {
          outline: none;
          border-color: var(--brand-yellow);
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
        }

        .auth-password-toggle {
          position: absolute;
          right: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
        }

        .auth-password-toggle:hover {
          color: var(--auth-text);
        }

        /* Terms & Remember */
        .auth-checkbox-group {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          margin: 0.75rem 0 1.25rem 0;
          font-size: 0.82rem;
          color: var(--auth-text-muted);
          line-height: 1.4;
        }

        .auth-checkbox-group input[type="checkbox"] {
          margin-top: 0.15rem;
          accent-color: var(--brand-yellow);
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .auth-terms-link {
          color: #ef4444;
          font-weight: 700;
          text-decoration: underline;
        }

        /* Primary Yellow Button */
        .auth-submit-btn {
          width: 100%;
          padding: 0.85rem;
          border-radius: 10px;
          border: none;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffc107;
          color: #1e293b;
          box-shadow: 0 2px 4px rgba(245, 158, 11, 0.2);
        }

        .auth-submit-btn:hover {
          background: #ffb300;
        }

        .auth-submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* Secondary Back Button */
        .auth-back-btn {
          width: 100%;
          padding: 0.8rem;
          border-radius: 10px;
          border: 1px solid var(--auth-border);
          background: #ffffff;
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--brand-yellow);
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .auth-back-btn:hover {
          background: #f8fafc;
        }

        /* Error / Success Banners */
        .auth-error {
          background: #fef2f2;
          color: #ef4444;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          border: 1px solid #fca5a5;
          font-size: 0.85rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1.25rem;
          width: 100%;
        }

        .auth-success {
          background: #f0fdf4;
          color: #16a34a;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          border: 1px solid #bbf7d0;
          font-size: 0.85rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1.25rem;
          width: 100%;
        }

        /* Role Selection Cards */
        .role-cards-container {
          display: flex;
          gap: 1rem;
          width: 100%;
          margin-bottom: 1.75rem;
        }

        .role-card {
          flex: 1;
          padding: 1.5rem 1rem;
          border-radius: 14px;
          border: 2px solid var(--auth-border);
          background: #ffffff;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          transition: all 0.2s ease;
        }

        .role-card:hover {
          border-color: #fde68a;
          background: #fffdf5;
        }

        .role-card.selected {
          border-color: #ffc107;
          background: #fffdf0;
        }

        .role-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.85rem;
          color: #475569;
        }

        .role-card.selected .role-card-icon {
          background: #fff3c4;
          color: #b45309;
        }

        .role-card-title {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--auth-text);
        }

        .role-card-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
        }

        .role-card.selected .role-card-badge {
          border-color: #ffc107;
          background: #ffc107;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* OTP Input Boxes */
        .otp-inputs-container {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          width: 100%;
          margin: 1.25rem 0 1.5rem 0;
        }

        .otp-box {
          width: 48px;
          height: 52px;
          text-align: center;
          font-size: 1.4rem;
          font-weight: 800;
          border-radius: 10px;
          border: 1.5px solid var(--auth-border);
          background: #ffffff;
          transition: all 0.2s ease;
        }

        .otp-box:focus {
          outline: none;
          border-color: var(--brand-yellow);
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animated-step {
          animation: fadeIn 0.25s ease-out forwards;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}} />

      <div className="auth-container">
        <div className="auth-card-container">

          {/* LEFT SIDE: BRAND COVER IMAGE */}
          <div className="auth-image-side">
            <img 
              src="/images/gps-telemetry-bus-3d.png" 
              alt="SchoolMitra Campus" 
              className="auth-cover-image" 
              onError={(e) => { e.currentTarget.src = "/images/erp-live-tracking.png"; }}
            />
            <div className="auth-image-overlay">
              <div className="auth-top-text">
                SCHOOLMITRA DIGITAL CAMPUS
              </div>
              
              <div className="auth-overlay-text">
                <h2>Your Entire Campus, <br/><span className="auth-highlight-text">Fully Digital.</span></h2>
                <p>Join SchoolMitra to move every aspect of your school online and access Bus Live Tracking. Experience the future of School ERP: Manage student records, fee collections, tracking, and communications seamlessly.</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: AUTHENTICATION FORMS */}
          <div className="auth-form-side">
            <div className="auth-form-wrapper">

              {/* COMPANY LOGO */}
              <img 
                src="/images/resources/logo.png" 
                alt="SchoolMitra Logo" 
                className="auth-logo" 
              />

              {/* GLOBAL ALERTS */}
              {error && <div className="auth-error">{error}</div>}
              {successMsg && <div className="auth-success">{successMsg}</div>}

              {/* STEP 1: REGISTER ACCOUNT */}
              {authStep === "register" && (
                <div className="animated-step">
                  <p className="auth-subtitle-text">Welcome</p>
                  <h2 className="auth-title">Register Account</h2>

                  <div className="auth-social-group">
                    <button type="button" onClick={handleGoogleLogin} className="auth-social-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Google
                    </button>
                    <button type="button" className="auth-social-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                      Email
                    </button>
                  </div>

                  <div className="auth-divider">
                    <span>Or</span>
                  </div>

                  <form onSubmit={handleRegisterNext} className="auth-form">
                    <div className="auth-grid-2">
                      <div className="auth-input-group">
                        <input
                          type="text"
                          required
                          className="auth-input"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="auth-input-group">
                        <input
                          type="text"
                          required
                          className="auth-input"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="auth-input-group">
                      <input
                        type="email"
                        required
                        className="auth-input"
                        placeholder="Email Address"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                      />
                    </div>

                    <div className="auth-input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        className="auth-input auth-input-with-icon"
                        placeholder="Password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="auth-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    <div className="auth-checkbox-group">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />
                      <label htmlFor="terms">
                        Yes, I understand and agree to the{" "}
                        <span className="auth-terms-link">Terms of Service</span>, including the{" "}
                        <span className="auth-terms-link">User Agreement and Privacy Policy</span>.
                      </label>
                    </div>

                    <button type="submit" className="auth-submit-btn">
                      Join SchoolMitra
                    </button>
                  </form>

                  <div style={{ marginTop: "1.75rem", fontSize: "0.88rem", color: "var(--auth-text-muted)", textAlign: "center" }}>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => changeStep("login")}
                      style={{ background: "none", border: "none", color: "var(--brand-yellow)", fontWeight: 700, cursor: "pointer", padding: 0 }}
                    >
                      Login
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: ROLE SELECTION */}
              {authStep === "role_selection" && (
                <div className="animated-step">
                  <p className="auth-subtitle-text">
                    Welcome, <span style={{ color: "var(--brand-yellow)", fontWeight: 700 }}>{firstName || "User"}</span>
                  </p>
                  <h2 className="auth-title">Join as a</h2>

                  <form onSubmit={handleRoleSubmit} className="auth-form">
                    <div className="role-cards-container">
                      <div
                        className={`role-card ${userRole === "teacher" ? "selected" : ""}`}
                        onClick={() => setUserRole("teacher")}
                      >
                        <div className="role-card-badge">
                          {userRole === "teacher" && <CheckCircle2 size={12} color="#ffffff" />}
                        </div>
                        <div className="role-card-icon">
                          <Users size={24} />
                        </div>
                        <div className="role-card-title">Join as a Teachers</div>
                      </div>

                      <div
                        className={`role-card ${userRole === "student" ? "selected" : ""}`}
                        onClick={() => setUserRole("student")}
                      >
                        <div className="role-card-badge">
                          {userRole === "student" && <CheckCircle2 size={12} color="#ffffff" />}
                        </div>
                        <div className="role-card-icon">
                          <GraduationCap size={24} />
                        </div>
                        <div className="role-card-title">Join as a Students</div>
                      </div>
                    </div>

                    <button type="submit" className="auth-submit-btn">
                      Submit
                    </button>

                    <button
                      type="button"
                      onClick={() => changeStep("register")}
                      className="auth-back-btn"
                    >
                      Back
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 3: COMPLETE YOUR PROFILE */}
              {authStep === "complete_profile" && (
                <div className="animated-step">
                  <p className="auth-subtitle-text">Welcome</p>
                  <h2 className="auth-title">Complete Your Profile</h2>

                  <form onSubmit={handleCompleteProfileSubmit} className="auth-form">
                    <div className="auth-input-group">
                      <input
                        type="text"
                        required
                        className="auth-input"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div className="auth-grid-2">
                      <div className="auth-input-group">
                        <input
                          type="text"
                          className="auth-input"
                          placeholder="Country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>
                      <div className="auth-input-group">
                        <input
                          type="tel"
                          required
                          className="auth-input"
                          placeholder="+91 Phone Number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="auth-grid-2">
                      <div className="auth-input-group">
                        <input
                          type="text"
                          className="auth-input"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div className="auth-input-group">
                        <input
                          type="text"
                          className="auth-input"
                          placeholder="State"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="auth-grid-2">
                      <div className="auth-input-group">
                        <input
                          type="text"
                          className="auth-input"
                          placeholder="Zip Code"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                        />
                      </div>
                      <div className="auth-input-group">
                        <input
                          type="text"
                          className="auth-input"
                          placeholder="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="auth-input-group">
                      <input
                        type="text"
                        required
                        className="auth-input"
                        placeholder="School Name"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                      />
                    </div>

                    <button type="submit" disabled={loading} className="auth-submit-btn">
                      {loading ? "Submitting..." : "Submit"}
                    </button>

                    <button
                      type="button"
                      onClick={() => changeStep("role_selection")}
                      className="auth-back-btn"
                    >
                      Back
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 4: LOGIN ACCOUNT */}
              {authStep === "login" && (
                <div className="animated-step">
                  <p className="auth-subtitle-text">Welcome Back</p>
                  <h2 className="auth-title">Login Account</h2>

                  <div className="auth-social-group">
                    <button type="button" onClick={handleGoogleLogin} className="auth-social-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Google
                    </button>
                    <button type="button" className="auth-social-btn">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                      Email
                    </button>
                  </div>

                  <div className="auth-divider">
                    <span>Or</span>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="auth-form">
                    <div className="auth-input-group">
                      <input
                        type="text"
                        required
                        className="auth-input"
                        placeholder="Username or Email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>

                    <div className="auth-input-group" style={{ marginBottom: "0.5rem" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        className="auth-input auth-input-with-icon"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="auth-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "1.25rem" }}>
                      <div className="auth-checkbox-group" style={{ margin: 0 }}>
                        <input
                          type="checkbox"
                          id="remember"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember">Remember Me</label>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (loginEmail) setForgotEmail(loginEmail);
                          changeStep("forgot_password");
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ef4444",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <button type="submit" disabled={loading} className="auth-submit-btn">
                      {loading ? "Logging in..." : "Login SchoolMitra"}
                    </button>
                  </form>

                  <div style={{ marginTop: "1.75rem", fontSize: "0.88rem", color: "var(--auth-text-muted)", textAlign: "center" }}>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => changeStep("register")}
                      style={{ background: "none", border: "none", color: "var(--brand-yellow)", fontWeight: 700, cursor: "pointer", padding: 0 }}
                    >
                      Register
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5a: FORGOT PASSWORD */}
              {authStep === "forgot_password" && (
                <div className="animated-step">
                  <h2 className="auth-title" style={{ marginBottom: "0.5rem" }}>Forgot Password</h2>
                  <p className="auth-subtitle-text" style={{ marginBottom: "1.75rem", maxWidth: "340px" }}>
                    Provide your account email for which you want reset your password
                  </p>

                  <form onSubmit={handleForgotSubmit} className="auth-form">
                    <div className="auth-input-group" style={{ marginBottom: "1.5rem" }}>
                      <input
                        type="email"
                        required
                        className="auth-input"
                        placeholder="Enter register email address"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                      />
                    </div>

                    <button type="submit" disabled={loading} className="auth-submit-btn">
                      {loading ? "Sending..." : "Submit"}
                    </button>

                    <button
                      type="button"
                      onClick={() => changeStep("login")}
                      className="auth-back-btn"
                    >
                      Back
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 5b: OTP VERIFICATION */}
              {authStep === "verify_otp" && (
                <div className="animated-step">
                  <h2 className="auth-title" style={{ marginBottom: "0.5rem" }}>Verify Reset Code</h2>
                  <p className="auth-subtitle-text" style={{ marginBottom: "1.25rem", maxWidth: "360px" }}>
                    We sent a reset link/code to{" "}
                    <span style={{ color: "var(--brand-yellow)", fontWeight: 700 }}>
                      {forgotEmail || "your email"}
                    </span>
                  </p>

                  <form onSubmit={handleVerifyOtpSubmit} className="auth-form">
                    <div className="otp-inputs-container">
                      {otpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-input-${idx}`}
                          type="text"
                          maxLength={1}
                          className="otp-box"
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                        />
                      ))}
                    </div>

                    <div className="auth-input-group" style={{ marginTop: "1rem" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="auth-input auth-input-with-icon"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="auth-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    <div className="auth-input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="auth-input auth-input-with-icon"
                        placeholder="Confirm New Password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="auth-password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    <button type="submit" disabled={loading} className="auth-submit-btn">
                      {loading ? "Verifying..." : "Verify & Reset"}
                    </button>

                    <button
                      type="button"
                      onClick={() => changeStep("forgot_password")}
                      className="auth-back-btn"
                    >
                      Back
                    </button>
                  </form>

                  <div style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--auth-text-muted)", textAlign: "center" }}>
                    Didn't receive code?{" "}
                    <button
                      type="button"
                      disabled={resendTimer > 0 || loading}
                      onClick={handleResendCode}
                      style={{
                        background: "none",
                        border: "none",
                        color: resendTimer > 0 ? "#94a3b8" : "var(--brand-yellow)",
                        fontWeight: 700,
                        cursor: resendTimer > 0 ? "not-allowed" : "pointer",
                        padding: 0,
                      }}
                    >
                      {resendTimer > 0 ? `Resend Code in (${resendTimer}s)` : "Resend Code"}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </>
  );
}