"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  style,
  ...props
}) => {
  const getPadding = () => {
    switch (size) {
      case "sm": return "0.35rem 0.75rem";
      case "lg": return "0.85rem 1.75rem";
      default: return "0.6rem 1.25rem";
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "sm": return "0.75rem";
      case "lg": return "0.95rem";
      default: return "0.85rem";
    }
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case "secondary":
        return {
          background: "var(--btn-secondary-bg)",
          color: "var(--text-main)",
          border: "1px solid var(--border-color)"
        };
      case "danger":
        return {
          background: "rgba(239, 68, 68, 0.15)",
          color: "#ef4444",
          border: "1px solid rgba(239, 68, 68, 0.3)"
        };
      case "outline":
        return {
          background: "transparent",
          color: "var(--primary)",
          border: "1px solid var(--primary)"
        };
      case "ghost":
        return {
          background: "transparent",
          color: "var(--text-main)",
          border: "none"
        };
      default:
        return {
          background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
          color: "#ffffff",
          border: "none",
          boxShadow: "var(--shadow-glow)"
        };
    }
  };

  return (
    <button
      disabled={disabled || isLoading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.45rem",
        fontWeight: 650,
        borderRadius: "var(--radius-sm)",
        cursor: disabled || isLoading ? "not-allowed" : "pointer",
        opacity: disabled || isLoading ? 0.65 : 1,
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        padding: getPadding(),
        fontSize: getFontSize(),
        fontFamily: "inherit",
        ...getVariantStyles(),
        ...style
      }}
      className={`btn ${className}`}
      {...props}
    >
      {isLoading ? <Loader2 size={16} className="animate-spin" /> : leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
