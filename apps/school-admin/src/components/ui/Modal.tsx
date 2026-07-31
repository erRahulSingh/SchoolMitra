"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      background: "rgba(15, 23, 42, 0.75)",
      backdropFilter: "blur(6px)"
    }}>
      <div 
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "var(--card-bg, #1e293b)",
          border: "1px solid var(--border-color, rgba(255,255,255,0.1))",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
          animation: "modalFadeIn 0.2s ease-out"
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid var(--border-color, rgba(255,255,255,0.08))"
        }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading, #ffffff)", margin: 0 }}>{title}</h3>
          <button 
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted, #94a3b8)",
              cursor: "pointer",
              padding: "0.25rem",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: "1.5rem" }}>
          {children}
        </div>
      </div>
    </div>
  );
};
