"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  className = "",
  style
}) => {
  return (
    <div
      className={`glass-card ${className}`}
      style={{
        padding: "1.5rem",
        ...style
      }}
    >
      {(title || headerAction) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.25rem"
          }}
        >
          <div>
            {title && (
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)" }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
