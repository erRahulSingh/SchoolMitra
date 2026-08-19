"use client";

import React from "react";

export interface TimelineItem {
  id: string;
  title: string;
  timestamp: string;
  description?: string;
  badge?: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "relative" }}>
      {items.map((item, idx) => (
        <div key={item.id} style={{ display: "flex", gap: "1rem", position: "relative" }}>
          {idx < items.length - 1 && (
            <div
              style={{
                position: "absolute",
                left: 15,
                top: 30,
                bottom: -15,
                width: 2,
                background: "var(--border-color)"
              }}
            />
          )}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--primary-glow)",
              border: "1.5px solid var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              zIndex: 2
            }}
          >
            {item.icon || <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)" }} />}
          </div>

          <div style={{ flex: 1, paddingTop: 2 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 750, fontSize: "0.875rem", color: "var(--text-heading)" }}>{item.title}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>{item.timestamp}</span>
            </div>
            {item.description && (
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
