"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, X, Edit3, Trash2,
  Sun, Star, Flag, MapPin, Clock, Filter, Eye, Download, Search,
  Sparkles, BookOpen, Award, AlertCircle, CheckCircle2
} from "lucide-react";

interface Holiday {
  id: string;
  name: string;
  date: string;
  endDate?: string;
  holidayType: string;
  description: string;
  isRecurringAnnually: boolean;
  applicableTo: string;
}

interface CalendarDay {
  date: string;
  day: number;
  dayOfWeek: number;
  isSunday: boolean;
  isHoliday: boolean;
  holidays: { id: string; name: string; type: string }[];
  events: { id: string; title: string; type: string; status: string }[];
  exams: { id: string; name: string; class: string }[];
}

interface SchoolCalendar {
  id: string;
  calendarName: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const HOLIDAY_TYPE_COLORS: Record<string, string> = {
  National: "#ef4444",
  State: "#f97316",
  School: "#3b82f6",
  Religious: "#a855f7",
  Custom: "#6b7280",
};

const HOLIDAY_TYPE_ICONS: Record<string, React.ReactNode> = {
  National: <Flag size={14} />,
  State: <MapPin size={14} />,
  School: <BookOpen size={14} />,
  Religious: <Star size={14} />,
  Custom: <Award size={14} />,
};

export default function CalendarPage() {
  const { resolvedTheme } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [calendars, setCalendars] = useState<SchoolCalendar[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"calendar" | "holidays" | "manage">("calendar");
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);
  const [typeFilter, setTypeFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [holidayForm, setHolidayForm] = useState({
    name: "", date: "", endDate: "", holidayType: "School",
    description: "", isRecurringAnnually: false, applicableTo: "All",
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // Fetch monthly calendar view
  const fetchMonthlyCalendar = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/calendar/monthly/${year}/${month}`);
      const json = await res.json();
      if (json.success) {
        setCalendarDays(json.data.days);
      }
    } catch (err) {
      console.error("Calendar fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch holidays
  const fetchHolidays = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/calendar/holidays`);
      const json = await res.json();
      if (json.success) setHolidays(json.data.holidays);
    } catch (err) {
      console.error("Holidays fetch error:", err);
    }
  };

  // Fetch calendars
  const fetchCalendars = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/calendar`);
      const json = await res.json();
      if (json.success) setCalendars(json.data.calendars);
    } catch (err) {
      console.error("Calendars fetch error:", err);
    }
  };

  useEffect(() => {
    fetchMonthlyCalendar();
    fetchHolidays();
    fetchCalendars();
  }, [year, month]);

  // Navigate months
  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 2, 1));
    setSelectedDay(null);
  };
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month, 1));
    setSelectedDay(null);
  };
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDay(null);
  };

  // Add/Edit Holiday
  const handleHolidaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!holidayForm.name || !holidayForm.date) return;

    try {
      const isEdit = !!editingHoliday;
      const url = isEdit
        ? `http://localhost:5000/api/v1/calendar/holidays/${editingHoliday!.id}`
        : `http://localhost:5000/api/v1/calendar/holidays`;

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(holidayForm),
      });
      const json = await res.json();
      if (json.success) {
        alert(isEdit ? "Holiday updated!" : "Holiday added successfully!");
        setIsHolidayModalOpen(false);
        setEditingHoliday(null);
        setHolidayForm({ name: "", date: "", endDate: "", holidayType: "School", description: "", isRecurringAnnually: false, applicableTo: "All" });
        fetchHolidays();
        fetchMonthlyCalendar();
      }
    } catch (err) {
      alert("Error saving holiday");
    }
  };

  // Delete Holiday
  const handleDeleteHoliday = async (id: string, name: string) => {
    if (!confirm(`Delete holiday "${name}"?`)) return;
    try {
      const res = await fetch(`http://localhost:5000/api/v1/calendar/holidays/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        alert("Holiday deleted");
        fetchHolidays();
        fetchMonthlyCalendar();
      }
    } catch (err) {
      alert("Error deleting holiday");
    }
  };

  // Build calendar grid with leading empty cells for first day offset
  const firstDayOfWeek = calendarDays.length > 0 ? calendarDays[0].dayOfWeek : 0;
  const emptyCells = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  // Filtered holidays for list view
  const filteredHolidays = holidays.filter(h => {
    const matchType = typeFilter === "All" || h.holidayType === typeFilter;
    const matchSearch = !searchQuery || h.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  // Stats
  const totalHolidays = holidays.length;
  const nationalHolidays = holidays.filter(h => h.holidayType === "National").length;
  const schoolHolidays = holidays.filter(h => h.holidayType === "School").length;
  const religiousHolidays = holidays.filter(h => h.holidayType === "Religious").length;

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "var(--bg-dark)", transition: "background 0.3s ease" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "12px" }}>
            <CalendarIcon size={32} color="var(--primary)" />
            School Calendar
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: "4px", fontSize: "14px" }}>
            Manage academic calendar, holidays, and school events
          </p>
        </div>
        <button
          onClick={() => {
            setEditingHoliday(null);
            setHolidayForm({ name: "", date: "", endDate: "", holidayType: "School", description: "", isRecurringAnnually: false, applicableTo: "All" });
            setIsHolidayModalOpen(true);
          }}
          style={{
            display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px",
            background: "linear-gradient(135deg, var(--primary), var(--primary-hover))", color: "#fff",
            borderRadius: "12px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "14px",
          }}
        >
          <Plus size={18} /> Add Holiday
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Holidays", value: totalHolidays, icon: <CalendarIcon size={22} />, color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
          { label: "National Holidays", value: nationalHolidays, icon: <Flag size={22} />, color: "#ef4444", bg: "rgba(239,68,68,0.15)" },
          { label: "School Holidays", value: schoolHolidays, icon: <BookOpen size={22} />, color: "#10b981", bg: "rgba(16,185,129,0.15)" },
          { label: "Religious Holidays", value: religiousHolidays, icon: <Star size={22} />, color: "#a855f7", bg: "rgba(168,85,247,0.15)" },
        ].map((stat, i) => (
          <div key={i} style={{
            background: "var(--bg-card)", borderRadius: "16px", padding: "20px",
            border: "1px solid var(--border-color)", transition: "all 0.3s ease",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "4px" }}>{stat.label}</p>
                <p style={{ color: "var(--text-heading)", fontSize: "28px", fontWeight: 800 }}>{stat.value}</p>
              </div>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {[
          { key: "calendar", label: "Calendar View", icon: <CalendarIcon size={16} /> },
          { key: "holidays", label: "Holidays List", icon: <Sun size={16} /> },
          { key: "manage", label: "Manage Calendar", icon: <Sparkles size={16} /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px",
              borderRadius: "10px", border: activeTab === tab.key ? "none" : "1px solid var(--border-color)", cursor: "pointer", fontWeight: 600, fontSize: "13px",
              background: activeTab === tab.key ? "linear-gradient(135deg, var(--primary), var(--primary-hover))" : "var(--bg-card)",
              color: activeTab === tab.key ? "#fff" : "var(--text-muted)",
              transition: "all 0.2s ease",
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ═══ CALENDAR VIEW TAB ═══ */}
      {activeTab === "calendar" && (
        <div style={{ background: "var(--bg-card)", borderRadius: "20px", padding: "24px", border: "1px solid var(--border-color)" }}>
          {/* Month Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <button onClick={goToPrevMonth} style={{ background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "8px 12px", cursor: "pointer", color: "var(--primary)" }}>
              <ChevronLeft size={20} />
            </button>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-heading)" }}>
                {MONTH_NAMES[month - 1]} {year}
              </h2>
              <button onClick={goToToday} style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer", fontSize: "12px", fontWeight: 600, marginTop: "4px" }}>
                Go to Today
              </button>
            </div>
            <button onClick={goToNextMonth} style={{ background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: "10px", padding: "8px 12px", cursor: "pointer", color: "var(--primary)" }}>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Day Headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "8px" }}>
            {DAY_NAMES.map((day) => (
              <div key={day} style={{
                textAlign: "center", padding: "8px", fontWeight: 700, fontSize: "13px",
                color: day === "Sun" ? "#ef4444" : "var(--text-muted)",
              }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
              <CalendarIcon size={40} style={{ opacity: 0.3, marginBottom: "12px" }} />
              <p>Loading calendar...</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
              {/* Empty cells for offset */}
              {emptyCells.map((_, i) => (
                <div key={`empty-${i}`} style={{ minHeight: "90px" }} />
              ))}

              {/* Actual day cells */}
              {calendarDays.map((day) => {
                const isToday = day.date === todayStr;
                const hasContent = day.isHoliday || day.events.length > 0 || day.exams.length > 0;
                const isSelected = selectedDay?.date === day.date;

                return (
                  <div
                    key={day.date}
                    onClick={() => setSelectedDay(day)}
                    style={{
                      minHeight: "90px", borderRadius: "10px", padding: "8px", cursor: "pointer",
                      background: isSelected ? "var(--primary-glow)" : isToday ? "rgba(99, 102, 241, 0.08)" : "var(--bg-card-hover)",
                      border: isToday ? "2px solid var(--primary)" : isSelected ? "2px solid var(--primary)" : "1px solid var(--border-color)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{
                      fontSize: "14px", fontWeight: isToday ? 800 : 600,
                      color: day.isSunday ? "#ef4444" : day.isHoliday ? "#f97316" : isToday ? "var(--primary)" : "var(--text-heading)",
                      marginBottom: "4px",
                    }}>
                      {day.day}
                    </div>

                    {/* Holiday indicators */}
                    {day.holidays.map((h, i) => (
                      <div key={i} style={{
                        fontSize: "10px", padding: "2px 6px", borderRadius: "4px", marginBottom: "2px",
                        background: HOLIDAY_TYPE_COLORS[h.type] || "#6b7280", color: "#fff",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {h.name}
                      </div>
                    ))}

                    {/* Event indicators */}
                    {day.events.slice(0, 2).map((e, i) => (
                      <div key={i} style={{
                        fontSize: "10px", padding: "2px 6px", borderRadius: "4px", marginBottom: "2px",
                        background: "var(--success-bg)", color: "var(--success)",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {e.title}
                      </div>
                    ))}

                    {/* Exam indicators */}
                    {day.exams.slice(0, 1).map((ex, i) => (
                      <div key={i} style={{
                        fontSize: "10px", padding: "2px 6px", borderRadius: "4px",
                        background: "var(--warning-bg)", color: "var(--warning)",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        📝 {ex.name}
                      </div>
                    ))}

                    {/* More indicator */}
                    {(day.events.length > 2 || day.exams.length > 1) && (
                      <div style={{ fontSize: "9px", color: "var(--text-muted)", marginTop: "2px" }}>
                        +{(day.events.length - 2) + (day.exams.length - 1)} more
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Selected Day Details */}
          {selectedDay && (
            <div style={{
              marginTop: "20px", padding: "20px", borderRadius: "14px",
              background: "var(--bg-input)", border: "1px solid var(--border-color)",
            }}>
              <h3 style={{ color: "var(--text-heading)", fontWeight: 700, fontSize: "16px", marginBottom: "12px" }}>
                📅 {new Date(selectedDay.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </h3>

              {selectedDay.holidays.length === 0 && selectedDay.events.length === 0 && selectedDay.exams.length === 0 && (
                <p style={{ color: "var(--text-dim)", fontSize: "13px" }}>No holidays, events, or exams on this day</p>
              )}

              {selectedDay.holidays.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", padding: "10px 14px", borderRadius: "10px", background: "var(--danger-bg)" }}>
                  <Flag size={16} color="var(--danger)" />
                  <span style={{ color: "var(--danger)", fontWeight: 600, fontSize: "14px" }}>{h.name}</span>
                  <span style={{ color: "#fff", fontSize: "12px", marginLeft: "auto", padding: "2px 8px", borderRadius: "6px", background: HOLIDAY_TYPE_COLORS[h.type], opacity: 0.8 }}>{h.type}</span>
                </div>
              ))}

              {selectedDay.events.map((e, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", padding: "10px 14px", borderRadius: "10px", background: "var(--success-bg)" }}>
                  <Star size={16} color="var(--success)" />
                  <span style={{ color: "var(--success)", fontWeight: 600, fontSize: "14px" }}>{e.title}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "12px", marginLeft: "auto" }}>{e.type.replace(/_/g, " ")}</span>
                </div>
              ))}

              {selectedDay.exams.map((ex, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", padding: "10px 14px", borderRadius: "10px", background: "var(--warning-bg)" }}>
                  <BookOpen size={16} color="var(--warning)" />
                  <span style={{ color: "var(--warning)", fontWeight: 600, fontSize: "14px" }}>{ex.name}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "12px", marginLeft: "auto" }}>{ex.class}</span>
                </div>
              ))}
            </div>
          )}

          {/* Legend */}
          <div style={{ display: "flex", gap: "20px", marginTop: "16px", flexWrap: "wrap" }}>
            {Object.entries(HOLIDAY_TYPE_COLORS).map(([type, color]) => (
              <div key={type} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: color }} />
                {type}
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "var(--success)" }} />
              Events
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-muted)" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "var(--warning)" }} />
              Exams
            </div>
          </div>
        </div>
      )}

      {/* ═══ HOLIDAYS LIST TAB ═══ */}
      {activeTab === "holidays" && (
        <div style={{ background: "var(--bg-card)", borderRadius: "20px", padding: "24px", border: "1px solid var(--border-color)" }}>
          {/* Search & Filter */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "200px", position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                placeholder="Search holidays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%", padding: "10px 14px 10px 38px", borderRadius: "10px",
                  background: "var(--bg-input)", border: "1px solid var(--border-color)",
                  color: "var(--text-main)", fontSize: "13px", outline: "none",
                }}
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{
                padding: "10px 14px", borderRadius: "10px",
                background: "var(--bg-input)", border: "1px solid var(--border-color)",
                color: "var(--text-main)", fontSize: "13px", cursor: "pointer", outline: "none",
              }}
            >
              <option value="All">All Types</option>
              <option value="National">National</option>
              <option value="State">State</option>
              <option value="School">School</option>
              <option value="Religious">Religious</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          {/* Holidays Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Holiday", "Date", "Type", "Applicable To", "Recurring", "Actions"].map((h) => (
                    <th key={h} style={{
                      textAlign: "left", padding: "12px 16px", borderBottom: "1px solid var(--border-color)",
                      color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredHolidays.map((h) => (
                  <tr key={h.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "36px", height: "36px", borderRadius: "10px",
                          background: `${HOLIDAY_TYPE_COLORS[h.holidayType]}20`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: HOLIDAY_TYPE_COLORS[h.holidayType],
                        }}>
                          {HOLIDAY_TYPE_ICONS[h.holidayType]}
                        </div>
                        <div>
                          <p style={{ color: "var(--text-heading)", fontWeight: 600, fontSize: "14px" }}>{h.name}</p>
                          {h.description && <p style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "2px" }}>{h.description}</p>}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", color: "var(--text-main)", fontSize: "13px" }}>
                      {new Date(h.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      {h.endDate && ` — ${new Date(h.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{
                        padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 600,
                        background: `${HOLIDAY_TYPE_COLORS[h.holidayType]}20`,
                        color: HOLIDAY_TYPE_COLORS[h.holidayType],
                      }}>
                        {h.holidayType}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", color: "var(--text-muted)", fontSize: "13px" }}>{h.applicableTo}</td>
                    <td style={{ padding: "14px 16px" }}>
                      {h.isRecurringAnnually ? (
                        <CheckCircle2 size={16} color="var(--success)" />
                      ) : (
                        <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => {
                            setEditingHoliday(h);
                            setHolidayForm({
                              name: h.name, date: h.date.split("T")[0], endDate: h.endDate?.split("T")[0] || "",
                              holidayType: h.holidayType, description: h.description,
                              isRecurringAnnually: h.isRecurringAnnually, applicableTo: h.applicableTo,
                            });
                            setIsHolidayModalOpen(true);
                          }}
                          style={{ background: "rgba(59,130,246,0.15)", border: "none", borderRadius: "8px", padding: "6px 10px", cursor: "pointer", color: "#60a5fa" }}
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteHoliday(h.id, h.name)}
                          style={{ background: "rgba(239,68,68,0.15)", border: "none", borderRadius: "8px", padding: "6px 10px", cursor: "pointer", color: "#ef4444" }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredHolidays.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              <Sun size={40} style={{ opacity: 0.3, marginBottom: "12px" }} />
              <p>No holidays found</p>
            </div>
          )}
        </div>
      )}

      {/* ═══ MANAGE CALENDAR TAB ═══ */}
      {activeTab === "manage" && (
        <div style={{ background: "var(--bg-card)", borderRadius: "20px", padding: "24px", border: "1px solid var(--border-color)" }}>
          <h3 style={{ color: "var(--text-heading)", fontWeight: 700, fontSize: "18px", marginBottom: "16px" }}>Academic Calendars</h3>
          {calendars.map((cal) => (
            <div key={cal.id} style={{
              padding: "20px", borderRadius: "14px", marginBottom: "12px",
              background: "var(--bg-input)", border: cal.isActive ? "1px solid var(--primary-glow)" : "1px solid var(--border-color)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ color: "var(--text-heading)", fontWeight: 700, fontSize: "16px" }}>{cal.calendarName}</h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "4px" }}>{cal.description}</p>
                  <p style={{ color: "var(--text-dim)", fontSize: "12px", marginTop: "6px" }}>
                    {new Date(cal.startDate).toLocaleDateString("en-IN")} → {new Date(cal.endDate).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <span style={{
                  padding: "4px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 600,
                  background: cal.isActive ? "var(--success-bg)" : "var(--btn-secondary-bg)",
                  color: cal.isActive ? "var(--success)" : "var(--text-muted)",
                }}>
                  {cal.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          ))}
          {calendars.length === 0 && (
            <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "40px" }}>No calendars found. Create one to get started.</p>
          )}
        </div>
      )}

      {/* ═══ ADD/EDIT HOLIDAY MODAL ═══ */}
      {isHolidayModalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
        }}>
          <div style={{
            background: "var(--bg-modal)", borderRadius: "20px", padding: "28px",
            width: "480px", maxWidth: "90vw", border: "1px solid var(--border-color)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ color: "var(--text-heading)", fontWeight: 700, fontSize: "18px" }}>
                {editingHoliday ? "Edit Holiday" : "Add New Holiday"}
              </h3>
              <button onClick={() => { setIsHolidayModalOpen(false); setEditingHoliday(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleHolidaySubmit}>
              {[
                { label: "Holiday Name", key: "name", type: "text", required: true },
                { label: "Start Date", key: "date", type: "date", required: true },
                { label: "End Date (for multi-day)", key: "endDate", type: "date", required: false },
                { label: "Description", key: "description", type: "text", required: false },
              ].map((field) => (
                <div key={field.key} style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
                    {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
                  </label>
                  <input
                    type={field.type}
                    value={(holidayForm as any)[field.key]}
                    onChange={(e) => setHolidayForm({ ...holidayForm, [field.key]: e.target.value })}
                    required={field.required}
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: "10px",
                      background: "var(--bg-input)", border: "1px solid var(--border-color)",
                      color: "var(--text-main)", fontSize: "13px", outline: "none",
                    }}
                  />
                </div>
              ))}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Holiday Type</label>
                  <select
                    value={holidayForm.holidayType}
                    onChange={(e) => setHolidayForm({ ...holidayForm, holidayType: e.target.value })}
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: "10px",
                      background: "var(--bg-input)", border: "1px solid var(--border-color)",
                      color: "var(--text-main)", fontSize: "13px", cursor: "pointer", outline: "none",
                    }}
                  >
                    {["National", "State", "School", "Religious", "Custom"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Applicable To</label>
                  <select
                    value={holidayForm.applicableTo}
                    onChange={(e) => setHolidayForm({ ...holidayForm, applicableTo: e.target.value })}
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: "10px",
                      background: "var(--bg-input)", border: "1px solid var(--border-color)",
                      color: "var(--text-main)", fontSize: "13px", cursor: "pointer", outline: "none",
                    }}
                  >
                    {["All", "Students", "Teachers", "Staff"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "13px", marginBottom: "20px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={holidayForm.isRecurringAnnually}
                  onChange={(e) => setHolidayForm({ ...holidayForm, isRecurringAnnually: e.target.checked })}
                  style={{ accentColor: "var(--primary)" }}
                />
                Repeats every year
              </label>

              <button
                type="submit"
                style={{
                  width: "100%", padding: "12px", borderRadius: "12px", border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, var(--primary), var(--primary-hover))", color: "#fff",
                  fontWeight: 700, fontSize: "14px",
                }}
              >
                {editingHoliday ? "Update Holiday" : "Add Holiday"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
