"use client";

import React from "react";
import { 
  WifiOff, 
  RotateCw, 
  ArrowLeft 
} from "lucide-react";

interface OfflinePageProps {
  language?: "en" | "hi";
  onNavigate?: (tab: string) => void;
}

export default function OfflinePage({ language = "en", onNavigate }: OfflinePageProps) {
  const isHi = language === "hi";

  const handleRetry = () => {
    alert("Checking network connection...");
  };

  return (
    <div style={{
      padding: "2.2rem 1rem 2.2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      alignItems: "center",
      justifyContent: "center",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%",
      width: "100%",
      textAlign: "center"
    }}>

      {/* Header with back button */}
      <div style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0.2rem 0.1rem 0.4rem 0.1rem",
        position: "absolute",
        top: "2.2rem",
        left: "1rem"
      }}>
        <button
          type="button"
          onClick={() => onNavigate ? onNavigate("home") : window.history.back()}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0"
          }}
        >
          <ArrowLeft size={22} color="#0f172a" strokeWidth={2.2} />
        </button>
      </div>

      {/* Illustration Area */}
      <div style={{
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background: "#ffe4e6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "4rem"
      }}>
        <WifiOff size={54} color="#e11d48" strokeWidth={1.8} />
      </div>

      {/* Info labels */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "80%" }}>
        <h1 style={{
          fontSize: "1.4rem",
          fontWeight: 800,
          color: "#0f172a",
          margin: 0,
          fontFamily: "'Outfit', sans-serif"
        }}>
          {isHi ? "कोई इंटरनेट कनेक्शन नहीं" : "No Internet Connection"}
        </h1>
        <p style={{
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "#64748b",
          lineHeight: 1.45,
          margin: 0
        }}>
          {isHi 
            ? "कृपया अपने वाई-फाई या मोबाइल नेटवर्क की जांच करें और पुनः प्रयास करें।"
            : "Please check your Wi-Fi or mobile network connection and try again."
          }
        </p>
      </div>

      {/* Try again buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%", maxWidth: "300px" }}>
        <button
          onClick={handleRetry}
          style={{
            width: "100%",
            padding: "0.85rem",
            background: "#1d4ed8",
            color: "#ffffff",
            border: "none",
            borderRadius: "14px",
            fontSize: "0.9rem",
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            boxShadow: "0 4px 14px rgba(29, 78, 216, 0.25)"
          }}
        >
          <RotateCw size={16} />
          <span>{isHi ? "पुनः प्रयास करें" : "Try Again"}</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate("home")}
          style={{
            width: "100%",
            padding: "0.85rem",
            background: "#f1f5f9",
            color: "#334155",
            border: "none",
            borderRadius: "14px",
            fontSize: "0.9rem",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          {isHi ? "होम पर जाएं" : "Go to Home"}
        </button>
      </div>

    </div>
  );
}
