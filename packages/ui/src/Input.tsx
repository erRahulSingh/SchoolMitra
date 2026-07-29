import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, style, ...props }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", width: "100%" }}>
      {label && <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted, #64748b)" }}>{label}</label>}
      <input
        style={{
          padding: "0.6rem 0.85rem",
          borderRadius: "8px",
          border: error ? "1px solid #ef4444" : "1px solid var(--border-color, #cbd5e1)",
          background: "var(--bg-input, #ffffff)",
          color: "var(--text-main, #0f172a)",
          fontSize: "0.88rem",
          outline: "none",
          ...style
        }}
        {...props}
      />
      {error && <span style={{ fontSize: "0.72rem", color: "#ef4444", fontWeight: 600 }}>{error}</span>}
    </div>
  );
};
