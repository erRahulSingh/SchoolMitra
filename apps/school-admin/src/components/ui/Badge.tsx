"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "secondary";
  size?: "sm" | "md";
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "info",
  size = "md",
  className = "",
  style
}) => {
  return (
    <span
      className={`badge badge-${variant} ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        fontWeight: 700,
        borderRadius: "99px",
        padding: size === "sm" ? "0.2rem 0.5rem" : "0.35rem 0.75rem",
        fontSize: size === "sm" ? "0.68rem" : "0.75rem",
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        ...style
      }}
    >
      {children}
    </span>
  );
};
