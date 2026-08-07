"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, ChevronRight, FileText, CheckCircle2 } from "lucide-react";
import TeacherBottomNav from "@/components/TeacherBottomNav";

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", maxHeight: "100vh", overflow: "hidden", background: "var(--bg-shell)" }}>
      
      {/* 1. TOP HEADER */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.2rem 1.1rem 0.6rem 1.1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <Link href="/academics" style={{ color: "var(--card-text)" }}>
            <ArrowLeft size={22} strokeWidth={2.4} />
          </Link>
          <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
            Assignments
          </h1>
        </div>

        <Link href="/homework/create" style={{
          width: 38,
          height: 38,
          borderRadius: "12px",
          background: "#7c3aed",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          boxShadow: "0 4px 14px rgba(124, 58, 237, 0.35)"
        }}>
          <Plus size={22} strokeWidth={2.5} />
        </Link>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="mobile-content" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem", padding: "0.5rem 1.1rem 2rem 1.1rem" }}>
        
        {/* 2. FILTER PILLS */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["All", "Active", "Submitted", "Draft"].map((tab) => {
            const isSel = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "99px",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  border: "none",
                  background: isSel ? "#7c3aed" : "var(--card-bg)",
                  color: isSel ? "#ffffff" : "var(--card-subtext)",
                  boxShadow: isSel ? "0 4px 14px rgba(124, 58, 237, 0.3)" : "0 2px 8px rgba(0,0,0,0.03)",
                  cursor: "pointer"
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 3. ACTIVE ASSIGNMENTS SECTION */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 900, color: "var(--card-text)", marginBottom: "0.85rem" }}>
            Active Assignments
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Card 1 */}
            <div className="card-white" style={{
              padding: "1.1rem 1.2rem",
              borderRadius: "22px",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: "14px",
                    background: "#dcfce7",
                    color: "#15803d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <FileText size={22} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
                      Science Assignment - 1
                    </h4>
                    <div style={{ fontSize: "0.75rem", color: "var(--card-subtext)", fontWeight: 600, marginTop: 2 }}>
                      Class 8 - A
                    </div>
                  </div>
                </div>

                <span style={{ padding: "0.25rem 0.65rem", borderRadius: "99px", background: "#dcfce7", color: "#15803d", fontSize: "0.68rem", fontWeight: 900 }}>
                  Active
                </span>
              </div>

              <p style={{ fontSize: "0.82rem", color: "var(--card-text)", fontWeight: 500, lineHeight: 1.4, margin: 0 }}>
                Write short notes on &lsquo;Conservation of Plants and Animals&rsquo;.
              </p>

              <div style={{ fontSize: "0.75rem", color: "var(--card-subtext)", fontWeight: 600 }}>
                Due Date: <span style={{ fontWeight: 800, color: "var(--card-text)" }}>25 May 2024, 11:59 PM</span>
              </div>

              {/* Stats Bar */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "0.6rem",
                borderTop: "1px solid var(--card-border)"
              }}>
                <div style={{ display: "flex", gap: "1.5rem" }}>
                  <div>
                    <div style={{ fontSize: "0.68rem", color: "var(--card-subtext)", fontWeight: 700 }}>Submitted</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 900, color: "var(--card-text)" }}>18/42</div>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.68rem", color: "var(--card-subtext)", fontWeight: 700 }}>Pending</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 900, color: "#ef4444" }}>24</div>
                  </div>
                </div>

                <ChevronRight size={20} color="var(--card-subtext)" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="card-white" style={{
              padding: "1.1rem 1.2rem",
              borderRadius: "22px",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: "14px",
                    background: "#dcfce7",
                    color: "#15803d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <FileText size={22} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
                      Maths Assignment - 2
                    </h4>
                    <div style={{ fontSize: "0.75rem", color: "var(--card-subtext)", fontWeight: 600, marginTop: 2 }}>
                      Class 8 - A
                    </div>
                  </div>
                </div>

                <span style={{ padding: "0.25rem 0.65rem", borderRadius: "99px", background: "#dcfce7", color: "#15803d", fontSize: "0.68rem", fontWeight: 900 }}>
                  Active
                </span>
              </div>

              <p style={{ fontSize: "0.82rem", color: "var(--card-text)", fontWeight: 500, lineHeight: 1.4, margin: 0 }}>
                Solve questions from Chapter 4 - Data Handling.
              </p>

              <div style={{ fontSize: "0.75rem", color: "var(--card-subtext)", fontWeight: 600 }}>
                Due Date: <span style={{ fontWeight: 800, color: "var(--card-text)" }}>28 May 2024, 11:59 PM</span>
              </div>

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "0.6rem",
                borderTop: "1px solid var(--card-border)"
              }}>
                <div style={{ display: "flex", gap: "1.5rem" }}>
                  <div>
                    <div style={{ fontSize: "0.68rem", color: "var(--card-subtext)", fontWeight: 700 }}>Submitted</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 900, color: "var(--card-text)" }}>22/42</div>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.68rem", color: "var(--card-subtext)", fontWeight: 700 }}>Pending</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 900, color: "#ef4444" }}>20</div>
                  </div>
                </div>

                <ChevronRight size={20} color="var(--card-subtext)" />
              </div>
            </div>

          </div>
        </div>

        {/* 4. COMPLETED ASSIGNMENTS SECTION */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 900, color: "var(--card-text)", marginBottom: "0.85rem" }}>
            Completed Assignments
          </h3>

          <div className="card-white" style={{
            padding: "1.1rem 1.2rem",
            borderRadius: "22px",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: "14px",
                  background: "#dbeafe",
                  color: "#1d4ed8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <CheckCircle2 size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 900, color: "var(--card-text)", margin: 0 }}>
                    English Assignment - 1
                  </h4>
                  <div style={{ fontSize: "0.75rem", color: "var(--card-subtext)", fontWeight: 600, marginTop: 2 }}>
                    Class 8 - A
                  </div>
                </div>
              </div>

              <span style={{ padding: "0.25rem 0.65rem", borderRadius: "99px", background: "#dbeafe", color: "#1d4ed8", fontSize: "0.68rem", fontWeight: 900 }}>
                Completed
              </span>
            </div>

            <p style={{ fontSize: "0.82rem", color: "var(--card-text)", fontWeight: 500, margin: 0 }}>
              Essay Writing on &lsquo;My Best Friend&rsquo;.
            </p>

            <div style={{ fontSize: "0.72rem", color: "var(--card-subtext)", fontWeight: 600 }}>
              Completed on 15 May 2024
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM TABBAR */}
      <TeacherBottomNav />
    </div>
  );
}
