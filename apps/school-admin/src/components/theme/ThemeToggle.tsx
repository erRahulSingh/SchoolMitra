"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";
import { useTheme, Theme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options: { label: string; value: Theme; icon: React.ElementType }[] = [
    { label: "Light", value: "light", icon: Sun },
    { label: "Dark", value: "dark", icon: Moon },
    { label: "System", value: "system", icon: Monitor },
  ];

  const CurrentIcon = resolvedTheme === "light" ? Sun : Moon;

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        title={`Current Theme: ${theme.toUpperCase()}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.45rem",
          padding: "0.4rem 0.75rem",
          background: "var(--bg-input)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-sm)",
          color: "var(--text-main)",
          cursor: "pointer",
          fontSize: "0.8rem",
          fontWeight: 700,
          transition: "all 0.2s ease"
        }}
      >
        <CurrentIcon size={16} color="var(--primary)" />
        <span style={{ textTransform: "capitalize" }}>{theme}</span>
        <ChevronDown size={14} style={{ opacity: 0.6, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 6px)",
            width: "140px",
            background: "var(--bg-card)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "var(--shadow-md)",
            padding: "0.35rem",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            gap: "2px"
          }}
        >
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  setTheme(opt.value);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  width: "100%",
                  padding: "0.45rem 0.65rem",
                  borderRadius: "var(--radius-sm)",
                  border: "none",
                  background: isSelected ? "var(--btn-secondary-bg)" : "transparent",
                  color: isSelected ? "var(--primary)" : "var(--text-main)",
                  fontSize: "0.8rem",
                  fontWeight: isSelected ? 800 : 500,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s ease"
                }}
              >
                <Icon size={15} color={isSelected ? "var(--primary)" : "var(--text-muted)"} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
