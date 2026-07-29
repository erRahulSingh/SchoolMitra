import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    fontWeight: 700,
    borderRadius: "10px",
    border: "none",
    cursor: disabled || isLoading ? "not-allowed" : "pointer",
    opacity: disabled || isLoading ? 0.65 : 1,
    transition: "all 0.2s ease"
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: { background: "var(--primary, #6366f1)", color: "#ffffff" },
    secondary: { background: "rgba(99, 102, 241, 0.12)", color: "var(--primary, #6366f1)" },
    danger: { background: "#ef4444", color: "#ffffff" },
    outline: { background: "transparent", border: "1px solid var(--border-color, #cbd5e1)", color: "var(--text-main, #0f172a)" }
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: "0.35rem 0.75rem", fontSize: "0.75rem" },
    md: { padding: "0.55rem 1.1rem", fontSize: "0.85rem" },
    lg: { padding: "0.75rem 1.5rem", fontSize: "0.95rem" }
  };

  return (
    <button
      style={{ ...baseStyles, ...variantStyles[variant], ...sizeStyles[size] }}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span>Loading...</span> : children}
    </button>
  );
};
