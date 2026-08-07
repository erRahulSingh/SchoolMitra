"use client";

import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useTheme } from "@/context/ThemeContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed } = useTheme();

  return (
    <div className={`app-container ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="page-wrapper">
          {children}
        </main>
      </div>
    </div>
  );
}
