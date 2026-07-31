"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        maxWidth: 380,
        width: "100%"
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="glass-card"
          style={{
            padding: "1rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
            borderLeft: `4px solid ${
              t.type === "success" ? "var(--success)" : t.type === "error" ? "var(--danger)" : t.type === "warning" ? "var(--warning)" : "var(--info)"
            }`,
            boxShadow: "var(--shadow-md)"
          }}
        >
          {t.type === "success" && <CheckCircle2 size={20} color="var(--success)" style={{ flexShrink: 0, marginTop: 2 }} />}
          {t.type === "error" && <AlertCircle size={20} color="var(--danger)" style={{ flexShrink: 0, marginTop: 2 }} />}
          {t.type === "warning" && <AlertTriangle size={20} color="var(--warning)" style={{ flexShrink: 0, marginTop: 2 }} />}
          {t.type === "info" && <Info size={20} color="var(--info)" style={{ flexShrink: 0, marginTop: 2 }} />}

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text-heading)" }}>{t.title}</div>
            {t.description && <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 2 }}>{t.description}</div>}
          </div>

          <button onClick={() => onDismiss(t.id)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
