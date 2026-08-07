"use client";

import React from "react";
import { 
  CalendarCheck, Bus, CreditCard, Award, Bell, BookOpen, 
  FileText, Calendar, ChevronRight, User, Megaphone, 
  CheckCircle2, Building, Wallet, MapPin, Clock, Trophy, Sparkles
} from "lucide-react";
import { Language, translations } from "../i18n";

interface ParentHomePageProps {
  language?: Language;
  onNavigate?: (tab: string) => void;
}

export default function ParentHomePage({ language = "en", onNavigate }: ParentHomePageProps) {
  const t = translations[language] || {};
  const isHi = language === "hi";

  return (
    <div style={{
      padding: "0.9rem 0.9rem 2.2rem 0.9rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      color: "#0f172a",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      background: "#f8fafc",
      minHeight: "100%"
    }}>

      {/* ════════════ 1. GREETING BANNER WITH VIBRANT INDIGO GRADIENT ════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #a855f7 100%)",
        borderRadius: "20px",
        padding: "1.25rem 1.15rem 1.15rem 1.15rem",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(99, 102, 241, 0.25)"
      }}>
        {/* Decorative background vectors */}
        <div style={{
          position: "absolute", top: "10%", left: "45%", width: "8px", height: "8px",
          background: "rgba(255,255,255,0.25)", transform: "rotate(45deg)", borderRadius: "2px"
        }} />
        <div style={{
          position: "absolute", bottom: "15%", left: "55%", width: "10px", height: "10px",
          background: "rgba(255,255,255,0.15)", borderRadius: "50%"
        }} />

        {/* Left Greeting Text */}
        <div style={{ maxWidth: "60%", zIndex: 2, position: "relative" }}>
          <div style={{ fontSize: "0.78rem", color: "#e0e7ff", fontWeight: 600, opacity: 0.9 }}>
            Good Morning,
          </div>
          <div style={{
            fontSize: "1.35rem",
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "'Outfit', sans-serif",
            marginTop: "3px",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            letterSpacing: "-0.015em"
          }}>
            Anjali Sharma <span style={{ fontSize: "1.15rem" }}>👋</span>
          </div>
          <div style={{
            fontSize: "0.74rem",
            color: "#e0e7ff",
            marginTop: "6px",
            lineHeight: 1.4,
            fontWeight: 500,
            opacity: 0.95
          }}>
            Stay updated with your child's activities and school updates
          </div>
        </div>

        {/* Right High-Quality Vector SVG Illustration (Mother and Child reading together) */}
        <div style={{
          position: "absolute",
          right: "-5px",
          bottom: "-5px",
          width: "140px",
          height: "120px",
          pointerEvents: "none",
          zIndex: 1
        }}>
          <svg width="140" height="120" viewBox="0 0 142 122" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 58C8 72 3 98 23 112C43 126 122 122 136 102C150 82 136 42 112 42C88 42 52 48 18 58Z" fill="#ffffff" fillOpacity="0.15"/>
            <circle cx="104" cy="34" r="15" fill="#e11d48"/>
            <circle cx="104" cy="34" r="12" fill="#fde047"/>
            <path d="M98 34C98 34 101 40 110 36" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M88 52C88 44 120 44 120 52L124 93H84L88 52Z" fill="#f43f5e"/>
            <path d="M82 62C82 62 68 68 62 80" stroke="#fcd34d" strokeWidth="6" strokeLinecap="round"/>
            <circle cx="68" cy="56" r="11" fill="#1e3a8a"/>
            <circle cx="68" cy="58" r="9.5" fill="#fde047"/>
            <path d="M58 70C58 66 78 66 78 70L80 100H56L58 70Z" fill="#1d4ed8"/>
            <path d="M68 70L68 84" stroke="#ffffff" strokeWidth="2.5"/>
            <path d="M46 82L62 88L78 82L78 98L62 104L46 98Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5"/>
            <path d="M62 88L62 104" stroke="#ca8a04" strokeWidth="1.5"/>
            <path d="M126 100L128 114H138L140 100H126Z" fill="#d97706"/>
            <path d="M133 100C133 92 126 88 126 88C126 88 136 90 138 100" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* ════════════ 2. STUDENT PROFILE CARD (WHITE BACKGROUND MATCHING SCREENSHOT) ════════════ */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "1.2rem 1.15rem",
        border: "1px solid #cbd5e1",
        boxShadow: "0 6px 20px rgba(15, 23, 42, 0.03)",
        color: "#0f172a",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        {/* Top Info Layout */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
            {/* Student Avatar */}
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=300"
              alt="Rohan Sharma"
              onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150"; }}
              style={{
                width: "54px",
                height: "54px",
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />
            <div>
              <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#1e3a8a", letterSpacing: "-0.015em", fontFamily: "'Outfit', sans-serif" }}>
                Rohan Sharma
              </div>
              <div style={{ fontSize: "0.85rem", color: "#2563eb", fontWeight: 700, marginTop: "1px" }}>
                Class 5th – A
              </div>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px", fontWeight: 600 }}>
                Green Valley Public School
              </div>
            </div>
          </div>

          {/* View Profile Capsule Button */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("child")}
            style={{
              background: "#1e3a8a",
              color: "#ffffff",
              border: "none",
              borderRadius: "99px",
              padding: "0.45rem 0.95rem",
              fontSize: "0.75rem",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: "4px",
              cursor: "pointer",
              boxShadow: "0 3px 10px rgba(30, 58, 138, 0.15)",
              whiteSpace: "nowrap"
            }}
          >
            <span>View Profile</span>
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Divider Line */}
        <div style={{ height: "1px", background: "#f1f5f9", width: "100%" }} />

        {/* Bottom 4 Mini Stats Row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0.3rem",
          alignItems: "center"
        }}>
          {/* Stat 1: Roll No */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <div style={{
              width: "24px", height: "24px", borderRadius: "6px", flexShrink: 0,
              background: "#ffe4e6", display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Calendar size={13} color="#e11d48" strokeWidth={2.2} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.55rem", color: "#64748b", fontWeight: 700, letterSpacing: "0.02em" }}>ROLL NO.</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#0f172a" }}>12</span>
            </div>
          </div>

          {/* Stat 2: Academic Year */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <div style={{
              width: "24px", height: "24px", borderRadius: "6px", flexShrink: 0,
              background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Building size={13} color="#16a34a" strokeWidth={2.2} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.55rem", color: "#64748b", fontWeight: 700, letterSpacing: "0.02em" }}>SESSION</span>
              <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap" }}>2024–25</span>
            </div>
          </div>

          {/* Stat 3: Class Teacher */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <div style={{
              width: "24px", height: "24px", borderRadius: "6px", flexShrink: 0,
              background: "#f3e8ff", display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <User size={13} color="#9333ea" strokeWidth={2.2} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.55rem", color: "#64748b", fontWeight: 700, letterSpacing: "0.02em" }}>TEACHER</span>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap" }}>Mrs. Priya</span>
            </div>
          </div>

          {/* Stat 4: Bus No */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <div style={{
              width: "24px", height: "24px", borderRadius: "6px", flexShrink: 0,
              background: "#fffbeb", display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Bus size={13} color="#d97706" strokeWidth={2.2} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.55rem", color: "#64748b", fontWeight: 700, letterSpacing: "0.02em" }}>BUS NO.</span>
              <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap" }}>UP32-1234</span>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ 3. QUICK ACTIONS GRID ════════════ */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
          <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.015em" }}>
            Quick Actions
          </div>
          <button 
            type="button" 
            onClick={() => onNavigate && onNavigate("more")}
            style={{ background: "none", border: "none", color: "#1d4ed8", fontSize: "0.74rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "2px", cursor: "pointer" }}
          >
            <span>View All</span>
            <ChevronRight size={13} strokeWidth={2.5} />
          </button>
        </div>

        {/* 5 Squircle Action Items Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.45rem" }}>
          {/* Action 1: Attendance */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("attendance")}
            style={{
              background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "18px", padding: "0.65rem 0.2rem",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.45rem", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)"
            }}
          >
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#faf5ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b21a8"
            }}>
              <CalendarCheck size={18} strokeWidth={2.2} />
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#334155" }}>Attendance</span>
          </button>

          {/* Action 2: Report Card */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("reportCard")}
            style={{
              background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "18px", padding: "0.65rem 0.2rem",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.45rem", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)"
            }}
          >
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a"
            }}>
              <FileText size={18} strokeWidth={2.2} />
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#334155" }}>Report Card</span>
          </button>

          {/* Action 3: Fee Payments */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("fees")}
            style={{
              background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "18px", padding: "0.65rem 0.2rem",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.45rem", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)"
            }}
          >
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#fffbeb", display: "flex", alignItems: "center", justifyContent: "center", color: "#d97706"
            }}>
              <Wallet size={18} strokeWidth={2.2} />
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#334155" }}>Fee Payments</span>
          </button>

          {/* Action 4: Bus Tracking */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("bus")}
            style={{
              background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "18px", padding: "0.65rem 0.2rem",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.45rem", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)"
            }}
          >
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb"
            }}>
              <Bus size={18} strokeWidth={2.2} />
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#334155" }}>Bus Tracking</span>
          </button>

          {/* Action 5: Time Table */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("timeTable")}
            style={{
              background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "18px", padding: "0.65rem 0.2rem",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.45rem", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)"
            }}
          >
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#faf5ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#9333ea"
            }}>
              <Calendar size={18} strokeWidth={2.2} />
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#334155" }}>Time Table</span>
          </button>
        </div>
      </div>

      {/* ════════════ 4. TODAY'S OVERVIEW (MATCHING SCREENSHOT) ════════════ */}
      <div>
        <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", marginBottom: "0.65rem", fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.015em" }}>
          Today's Overview
        </div>

        {/* 4 Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.45rem" }}>
          {/* Card 1: Attendance */}
          <div 
            onClick={() => onNavigate && onNavigate("attendance")}
            style={{
              background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "16px",
              padding: "0.85rem 0.35rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "pointer"
            }}
          >
            <div style={{
              width: "34px", height: "34px", borderRadius: "50%", background: "#dcfce7",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a", marginBottom: "0.4rem"
            }}>
              <CheckCircle2 size={19} strokeWidth={2.5} />
            </div>
            <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#16a34a" }}>Present</div>
            <div style={{ fontSize: "0.62rem", color: "#475569", fontWeight: 700, marginTop: "3px" }}>Attendance Today</div>
          </div>

          {/* Card 2: Assignments Pending */}
          <div 
            onClick={() => onNavigate && onNavigate("homework")}
            style={{
              background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "16px",
              padding: "0.85rem 0.35rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "pointer"
            }}
          >
            <div style={{
              width: "34px", height: "34px", borderRadius: "50%", background: "#e0f2fe",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#0284c7", marginBottom: "0.4rem"
            }}>
              <Calendar size={19} strokeWidth={2.5} />
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0369a1" }}>2</div>
            <div style={{ fontSize: "0.62rem", color: "#475569", fontWeight: 700, marginTop: "3px" }}>Pending Tasks</div>
          </div>

          {/* Card 3: New Notification */}
          <div 
            onClick={() => onNavigate && onNavigate("notifications")}
            style={{
              background: "#fefbeb", border: "1px solid #fef08a", borderRadius: "16px",
              padding: "0.85rem 0.35rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "pointer"
            }}
          >
            <div style={{
              width: "34px", height: "34px", borderRadius: "50%", background: "#fef3c7",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#d97706", marginBottom: "0.4rem"
            }}>
              <Bell size={19} strokeWidth={2.5} />
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#b45309" }}>1</div>
            <div style={{ fontSize: "0.62rem", color: "#475569", fontWeight: 700, marginTop: "3px" }}>Notifications</div>
          </div>

          {/* Card 4: Due Fee */}
          <div 
            onClick={() => onNavigate && onNavigate("fees")}
            style={{
              background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: "16px",
              padding: "0.85rem 0.35rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "pointer"
            }}
          >
            <div style={{
              width: "34px", height: "34px", borderRadius: "50%", background: "#f3e8ff",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#9333ea", marginBottom: "0.4rem"
            }}>
              <Wallet size={19} strokeWidth={2.5} />
            </div>
            <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "#6b21a8" }}>₹1,250</div>
            <div style={{ fontSize: "0.62rem", color: "#475569", fontWeight: 700, marginTop: "3px" }}>Due This Month</div>
          </div>
        </div>
      </div>

      {/* ════════════ 5. RECENT UPDATES ════════════ */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
          <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1e3a8a", fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.015em" }}>
            Recent Updates
          </div>
          <button 
            type="button" 
            onClick={() => onNavigate && onNavigate("notifications")}
            style={{ background: "none", border: "none", color: "#1d4ed8", fontSize: "0.74rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "2px", cursor: "pointer" }}
          >
            <span>View All</span>
            <ChevronRight size={13} strokeWidth={2.5} />
          </button>
        </div>

        {/* Updates Card Container */}
        <div style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #cbd5e1",
          boxShadow: "0 6px 20px rgba(15, 23, 42, 0.03)",
          overflow: "hidden"
        }}>
          {/* Update Item 1 */}
          <div style={{ padding: "0.95rem 1.15rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%", background: "#dcfce7", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a"
              }}>
                <Megaphone size={18} strokeWidth={2.2} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a" }}>Holiday Notice</span>
                <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500 }}>School will remain closed on 15th May 2025</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", flexShrink: 0 }}>
              <span style={{ fontSize: "0.74rem", color: "#94a3b8", fontWeight: 600 }}>2h ago</span>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444" }} />
              <ChevronRight size={16} color="#94a3b8" />
            </div>
          </div>

          {/* Update Item 2 */}
          <div style={{ padding: "0.95rem 1.15rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%", background: "#e0f2fe", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center", color: "#0284c7"
              }}>
                <Trophy size={18} strokeWidth={2.2} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a" }}>Annual Sports Day</span>
                <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500 }}>Annual Sports Day will be held on 25th May 2025</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", flexShrink: 0 }}>
              <span style={{ fontSize: "0.74rem", color: "#94a3b8", fontWeight: 600 }}>1d ago</span>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444" }} />
              <ChevronRight size={16} color="#94a3b8" />
            </div>
          </div>

          {/* Update Item 3 */}
          <div style={{ padding: "0.95rem 1.15rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%", background: "#f3e8ff", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center", color: "#9333ea"
              }}>
                <FileText size={18} strokeWidth={2.2} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#0f172a" }}>PTM Schedule</span>
                <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500 }}>Parent Teacher Meeting on 20th May 2025</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", flexShrink: 0 }}>
              <span style={{ fontSize: "0.74rem", color: "#94a3b8", fontWeight: 600 }}>2d ago</span>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ef4444" }} />
              <ChevronRight size={16} color="#94a3b8" />
            </div>
        </div>
      </div>
    </div>

  </div>
  );
}
