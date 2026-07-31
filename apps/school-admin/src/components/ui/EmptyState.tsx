"use client";

import React from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Data Available",
  description = "There are no records matching your current filter criteria.",
  icon = <FolderOpen size={42} color="var(--primary)" />,
  action
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        textAlign: "center",
        gap: "0.85rem"
      }}
    >
      <div style={{ padding: "1rem", borderRadius: "50%", background: "var(--primary-glow)" }}>
        {icon}
      </div>
      <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)" }}>{title}</h4>
      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: 360 }}>{description}</p>
      {action && <div style={{ marginTop: "0.5rem" }}>{action}</div>}
    </div>
  );
};
