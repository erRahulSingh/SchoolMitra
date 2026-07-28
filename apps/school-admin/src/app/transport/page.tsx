"use client";

import React, { useState } from "react";
import { 
  Bus, MapPin, Phone, AlertTriangle, ShieldCheck, Navigation, Users, 
  Plus, X, Search, Filter, Fuel, Wrench, CheckCircle2, Clock, 
  UserCheck, ArrowRight, Radio, Shield, Download, ChevronRight, Eye 
} from "lucide-react";
import { MOCK_BUSES } from "@/lib/mockData";

export default function TransportPage() {
  const [activeTab, setActiveTab] = useState<
    "live" | "buses" | "drivers" | "routes" | "student_map" | "logs" | "maintenance"
  >("live");

  // ── 1. BUSES STATE ──
  const [buses, setBuses] = useState([
    { id: "BUS-01", number: "DL 01 AB 4321", name: "Bus #01", capacity: 42, model: "Tata Starbus 2024", driver: "Ram Singh", route: "Route 1 (Dwarka)", status: "Active", insuranceExpiry: "12 Dec 2026" },
    { id: "BUS-02", number: "DL 01 CD 8765", name: "Bus #02", capacity: 38, model: "Eicher Skyline 2023", driver: "Vikram Jeet", route: "Route 2 (Vasant Kunj)", status: "Active", insuranceExpiry: "15 Oct 2026" },
    { id: "BUS-03", number: "DL 01 EF 2468", name: "Bus #03", capacity: 45, model: "Ashok Leyland Sunshine", driver: "Sanjay Kumar", route: "Route 3 (Janakpuri)", status: "Active", insuranceExpiry: "20 Jan 2027" },
    { id: "BUS-04", number: "DL 01 GH 1357", name: "Bus #04", capacity: 40, model: "Tata Citybus 2025", driver: "Harish Sharma", route: "Route 4 (Green Park)", status: "Maintenance", insuranceExpiry: "05 Nov 2026" }
  ]);
  const [isAddBusOpen, setIsAddBusOpen] = useState(false);
  const [newBus, setNewBus] = useState({ number: "", capacity: "42", driver: "Ram Singh", route: "Route 1 (Dwarka)" });

  // ── 2. DRIVERS STATE ──
  const [drivers, setDrivers] = useState([
    { id: "DRV-101", name: "Ram Singh", license: "DL-14201100987", phone: "+91 98111 22334", assignedBus: "Bus #01 (DL 01 AB 4321)", experience: "12 Yrs", rating: "4.9 ★", status: "ON TRIP" },
    { id: "DRV-102", name: "Vikram Jeet", license: "DL-14201100543", phone: "+91 98222 33445", assignedBus: "Bus #02 (DL 01 CD 8765)", experience: "8 Yrs", rating: "4.8 ★", status: "ON TRIP" },
    { id: "DRV-103", name: "Sanjay Kumar", license: "DL-14201100321", phone: "+91 98333 44556", assignedBus: "Bus #03 (DL 01 EF 2468)", experience: "15 Yrs", rating: "5.0 ★", status: "ON TRIP" },
    { id: "DRV-104", name: "Harish Sharma", license: "DL-14201100876", phone: "+91 98444 55667", assignedBus: "Bus #04 (DL 01 GH 1357)", experience: "6 Yrs", rating: "4.7 ★", status: "OFF DUTY" }
  ]);
  const [isAssignDriverOpen, setIsAssignDriverOpen] = useState(false);

  // ── 3. ROUTES & STOPS STATE ──
  const [routes] = useState([
    { id: "RT-01", name: "Route 1 — Dwarka Sector 12 Express", busAssigned: "Bus #01", totalStops: 6, totalStudents: 38, stops: ["Sector 6 Market", "Sector 10 Metro", "Sector 12 Gate", "Sector 14 Chowk", "Sector 18 Colony", "DPS Main Gate"] },
    { id: "RT-02", name: "Route 2 — Vasant Kunj & Fortis Belt", busAssigned: "Bus #02", totalStops: 5, totalStudents: 32, stops: ["Sector B Pocket 1", "Fortis Hospital Gate", "Vasant Square Mall", "Nelson Mandela Marg", "DPS Main Gate"] },
    { id: "RT-03", name: "Route 3 — Janakpuri West Circular", busAssigned: "Bus #03", totalStops: 7, totalStudents: 41, stops: ["District Centre", "C-4E Block", "B1 Janakpuri", "Tilak Nagar Metro", "Subhash Nagar", "DPS Main Gate"] }
  ]);
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);

  // ── 4. STUDENT MAPPING STATE ──
  const [studentMappings] = useState([
    { stuId: "STU-1001", studentName: "Aarav Sharma", class: "Class 10-A", bus: "Bus #01", route: "Route 1", stop: "Sector 10 Metro", parentPhone: "+91 98765 43210" },
    { stuId: "STU-1002", studentName: "Ananya Patel", class: "Class 10-A", bus: "Bus #02", route: "Route 2", stop: "Fortis Hospital Gate", parentPhone: "+91 98123 45678" },
    { stuId: "STU-1004", studentName: "Diya Gupta", class: "Class 12-C", bus: "Bus #01", route: "Route 1", stop: "Sector 6 Market", parentPhone: "+91 97654 32109" },
    { stuId: "STU-1005", studentName: "Kabir Singh", class: "Class 8-A", bus: "Bus #04", route: "Route 4", stop: "Green Park Metro", parentPhone: "+91 98321 09876" }
  ]);
  const [isMapStudentOpen, setIsMapStudentOpen] = useState(false);

  // ── 5. PICKUP & DROP LOGS ──
  const [logs] = useState([
    { id: "LOG-501", student: "Aarav Sharma", bus: "Bus #01", stop: "Sector 10 Metro", pickupTime: "07:42 AM", dropTime: "02:18 PM", status: "BOARDED & DROPPED ✅" },
    { id: "LOG-502", student: "Ananya Patel", bus: "Bus #02", stop: "Fortis Hospital Gate", pickupTime: "07:50 AM", dropTime: "02:25 PM", status: "BOARDED & DROPPED ✅" },
    { id: "LOG-503", student: "Diya Gupta", bus: "Bus #01", stop: "Sector 6 Market", pickupTime: "07:35 AM", dropTime: "02:10 PM", status: "BOARDED & DROPPED ✅" },
    { id: "LOG-504", student: "Kabir Singh", bus: "Bus #04", stop: "Green Park Metro", pickupTime: "08:05 AM", dropTime: "02:35 PM", status: "ABSENT TODAY ❌" }
  ]);

  // ── 6. FUEL & MAINTENANCE LOGS ──
  const [maintenanceLogs] = useState([
    { id: "MNT-01", bus: "Bus #01", serviceType: "Routine Engine Service & Oil Change", cost: "₹ 14,500", date: "15 July 2026", nextDue: "15 Oct 2026", status: "COMPLETED" },
    { id: "MNT-02", bus: "Bus #04", serviceType: "Brake Pad Replacement & Suspension", cost: "₹ 22,000", date: "28 July 2026", nextDue: "28 Oct 2026", status: "IN PROGRESS" }
  ]);

  const [fuelLogs] = useState([
    { id: "FUL-101", bus: "Bus #01", liters: "65 L", totalCost: "₹ 5,850", odometer: "42,850 KM", date: "27 July 2026", vendor: "Indian Oil Dwarka" },
    { id: "FUL-102", bus: "Bus #02", liters: "58 L", totalCost: "₹ 5,220", odometer: "38,120 KM", date: "26 July 2026", vendor: "HP Petrol Pump" }
  ]);

  const handleCreateBus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBus.number) return;
    const created = {
      id: `BUS-0${buses.length + 1}`,
      number: newBus.number,
      name: `Bus #0${buses.length + 1}`,
      capacity: Number(newBus.capacity),
      model: "Tata Starbus 2025",
      driver: newBus.driver,
      route: newBus.route,
      status: "Active",
      insuranceExpiry: "12 Dec 2027"
    };
    setBuses([...buses, created]);
    setIsAddBusOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{
        background: "linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)",
        border: "1px solid var(--border-glow)",
        borderRadius: "var(--radius-lg)",
        padding: "1.5rem 1.75rem",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Fleet & Transport Central Command (Phase 9) <Bus size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Connects Driver App & Parent App: Manage buses, pilots, routes, stops, student mappings, live telemetry, and fuel logs.
          </p>
        </div>

        <button 
          onClick={() => setIsAddBusOpen(true)}
          className="btn btn-primary" 
          style={{ padding: "0.75rem 1.25rem" }}
        >
          <Plus size={18} />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* 7 TRANSPORT TABS */}
      <div className="glass-card" style={{ padding: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {[
          { id: "live", label: "Live Telemetry Map", icon: Radio },
          { id: "buses", label: "Bus Management", icon: Bus },
          { id: "drivers", label: "Driver Roster", icon: UserCheck },
          { id: "routes", label: "Routes & Stops", icon: MapPin },
          { id: "student_map", label: "Student Mapping", icon: Users },
          { id: "logs", label: "Pickup & Drop Logs", icon: Clock },
          { id: "maintenance", label: "Fuel & Service Logs", icon: Fuel }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ════════════ TAB 1: LIVE TELEMETRY MAP & TRIP MONITORING ════════════ */}
      {activeTab === "live" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "1.5rem" }}>
          
          {/* Live GPS Satellite Panel */}
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", minHeight: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", zIndex: 2 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem", color: "#fff" }}>
                <Navigation size={18} color="var(--primary)" />
                <span>Live Satellite GPS Telemetry View</span>
              </h3>
              <span className="badge badge-success">Socket.IO Real-time Stream Active ✅</span>
            </div>

            {/* Interactive Map Visual */}
            <div style={{ 
              flex: 1, 
              borderRadius: "var(--radius-md)", 
              background: "#0b0f19", 
              border: "1px solid var(--border-color)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justify: "center",
              overflow: "hidden"
            }}>
              {/* Radial Grid Background */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(rgba(99, 102, 241, 0.18) 1px, transparent 0)",
                backgroundSize: "24px 24px"
              }} />

              {/* School Central Marker */}
              <div style={{ position: "absolute", top: "48%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", zIndex: 10 }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--secondary))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", boxShadow: "0 0 30px var(--primary)", fontSize: "1.4rem" }}>
                  🏫
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, background: "rgba(0,0,0,0.85)", padding: "0.2rem 0.6rem", borderRadius: "99px", marginTop: "0.35rem", border: "1px solid var(--border-color)", color: "#fff" }}>
                  Delhi Public School Main Campus
                </div>
              </div>

              {/* Live Bus Pins */}
              {MOCK_BUSES.map((b, idx) => {
                const topPos = ["28%", "68%", "38%", "78%"];
                const leftPos = ["32%", "72%", "22%", "58%"];
                return (
                  <div key={b.id} style={{ position: "absolute", top: topPos[idx] || "50%", left: leftPos[idx] || "50%", zIndex: 5 }}>
                    <div style={{ 
                      padding: "0.35rem 0.6rem", 
                      borderRadius: "var(--radius-sm)", 
                      background: b.status === "Delayed" ? "rgba(239, 68, 68, 0.95)" : "rgba(16, 185, 129, 0.95)",
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
                      cursor: "pointer"
                    }}>
                      <Bus size={12} />
                      <span>{b.busNumber} ({b.speed})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Fleet Monitor Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>Active Fleet Status ({MOCK_BUSES.length})</h3>

            {MOCK_BUSES.map((bus) => (
              <div key={bus.id} className="glass-card" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#fff" }}>{bus.busNumber}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{bus.route}</div>
                  </div>
                  <span className={`badge ${
                    bus.status === "Delayed" ? "badge-danger" : bus.status === "At School" ? "badge-success" : "badge-info"
                  }`}>
                    {bus.status}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>PILOT</div>
                    <div style={{ color: "#fff", fontWeight: 700 }}>{bus.driverName}</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>STUDENTS</div>
                    <div style={{ color: "#fff", fontWeight: 700 }}>{bus.studentsCount} On Board</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>SPEED</div>
                    <div style={{ color: "var(--primary)", fontWeight: 700 }}>{bus.speed}</div>
                  </div>
                </div>

                <div style={{ marginTop: "0.85rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    ETA: <strong style={{ color: "#fff" }}>{bus.eta}</strong>
                  </span>
                  <button className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}>
                    <Phone size={12} />
                    <span>Call Pilot</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ════════════ TAB 2: BUS FLEET MANAGEMENT ════════════ */}
      {activeTab === "buses" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>School Vehicle Fleet Directory ({buses.length} Vehicles)</h3>
            <button onClick={() => setIsAddBusOpen(true)} className="btn btn-primary" style={{ padding: "0.6rem 1rem" }}>
              <Plus size={16} /> Create New Bus Entry
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Vehicle ID & Plate</th>
                  <th>Vehicle Model</th>
                  <th>Capacity</th>
                  <th>Assigned Route</th>
                  <th>Assigned Pilot</th>
                  <th>Insurance Expiry</th>
                  <th>Fleet Status</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div style={{ fontWeight: 800, color: "#fff" }}>{b.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700, fontFamily: "monospace" }}>{b.number}</div>
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>{b.model}</td>
                    <td style={{ fontWeight: 700, color: "#fff" }}>{b.capacity} Seats</td>
                    <td style={{ fontWeight: 600 }}>{b.route}</td>
                    <td style={{ fontWeight: 700, color: "#38bdf8" }}>{b.driver}</td>
                    <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{b.insuranceExpiry}</td>
                    <td>
                      <span className={`badge ${b.status === "Active" ? "badge-success" : "badge-warning"}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 3: DRIVER ROSTER ════════════ */}
      {activeTab === "drivers" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>Verified Bus Pilots & Driver Directory</h3>
            <button onClick={() => setIsAssignDriverOpen(true)} className="btn btn-primary" style={{ padding: "0.6rem 1rem" }}>
              <Plus size={16} /> Assign Driver to Bus
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Pilot Name & ID</th>
                  <th>Driving License No</th>
                  <th>Contact Number</th>
                  <th>Assigned Vehicle</th>
                  <th>Experience</th>
                  <th>Safety Score</th>
                  <th>Duty Status</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <div style={{ fontWeight: 800, color: "#fff" }}>{d.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 600 }}>{d.id}</div>
                    </td>
                    <td style={{ fontFamily: "monospace", color: "var(--text-muted)" }}>{d.license}</td>
                    <td style={{ fontWeight: 600 }}>{d.phone}</td>
                    <td style={{ fontWeight: 700, color: "#fff" }}>{d.assignedBus}</td>
                    <td style={{ color: "var(--text-muted)" }}>{d.experience}</td>
                    <td style={{ fontWeight: 800, color: "#f59e0b" }}>{d.rating}</td>
                    <td>
                      <span className={`badge ${d.status === "ON TRIP" ? "badge-success" : "badge-secondary"}`}>{d.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 4: ROUTES & STOPS MANAGEMENT ════════════ */}
      {activeTab === "routes" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {routes.map((rt) => (
            <div key={rt.id} className="glass-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>{rt.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 600, marginTop: 2 }}>
                    {rt.id} • Assigned to {rt.busAssigned} • {rt.totalStudents} Mapped Students
                  </div>
                </div>
                <span className="badge badge-info">{rt.totalStops} Sequential Stops</span>
              </div>

              {/* Sequential Stops Timeline */}
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap", paddingTop: "0.5rem" }}>
                {rt.stops.map((stop, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <div style={{ padding: "0.4rem 0.75rem", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", fontSize: "0.78rem", fontWeight: 700, color: "#fff" }}>
                      🛑 {sIdx + 1}. {stop}
                    </div>
                    {sIdx < rt.stops.length - 1 && <ArrowRight size={14} color="var(--primary)" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ════════════ TAB 5: STUDENT BUS MAPPING ════════════ */}
      {activeTab === "student_map" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>Student Transport & Bus Stop Allocation Roster</h3>
            <button onClick={() => setIsMapStudentOpen(true)} className="btn btn-primary" style={{ padding: "0.6rem 1rem" }}>
              <Plus size={16} /> Map Student to Bus
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Student & Class</th>
                  <th>Assigned Vehicle</th>
                  <th>Assigned Route</th>
                  <th>Designated Bus Stop</th>
                  <th>Parent Contact</th>
                  <th>Transport Pass Status</th>
                </tr>
              </thead>
              <tbody>
                {studentMappings.map((m, idx) => (
                  <tr key={idx}>
                    <td>
                      <div style={{ fontWeight: 800, color: "#fff" }}>{m.studentName}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--primary)" }}>{m.class} ({m.stuId})</div>
                    </td>
                    <td style={{ fontWeight: 700, color: "#fff" }}>{m.bus}</td>
                    <td style={{ color: "var(--text-muted)" }}>{m.route}</td>
                    <td style={{ fontWeight: 700, color: "#38bdf8" }}>📍 {m.stop}</td>
                    <td style={{ fontSize: "0.82rem" }}>{m.parentPhone}</td>
                    <td>
                      <span className="badge badge-success">ACTIVE PASS ✅</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 6: PICKUP & DROP LOGS ════════════ */}
      {activeTab === "logs" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem" }}>Daily Live Pickup & Drop RFID Boarding Logs</h3>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Log Ref ID</th>
                  <th>Student Name</th>
                  <th>Assigned Bus</th>
                  <th>Designated Stop</th>
                  <th>Morning Pickup Time</th>
                  <th>Afternoon Drop Time</th>
                  <th>Boarding Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((lg) => (
                  <tr key={lg.id}>
                    <td style={{ fontWeight: 600, color: "var(--primary)", fontFamily: "monospace" }}>{lg.id}</td>
                    <td style={{ fontWeight: 800, color: "#fff" }}>{lg.student}</td>
                    <td style={{ fontWeight: 700 }}>{lg.bus}</td>
                    <td style={{ color: "var(--text-muted)" }}>{lg.stop}</td>
                    <td style={{ fontWeight: 700, color: "#10b981" }}>{lg.pickupTime}</td>
                    <td style={{ fontWeight: 700, color: "#38bdf8" }}>{lg.dropTime}</td>
                    <td>
                      <span className={`badge ${lg.status.includes("✅") ? "badge-success" : "badge-danger"}`}>{lg.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════ TAB 7: FUEL & SERVICE LOGS ════════════ */}
      {activeTab === "maintenance" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Fuel Refill Logs */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Diesel & Fuel Refill Registry</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Refill Log ID</th>
                    <th>Bus Entry</th>
                    <th>Fuel Liters</th>
                    <th>Total Cost</th>
                    <th>Odometer Reading</th>
                    <th>Refill Date</th>
                    <th>Vendor / Station</th>
                  </tr>
                </thead>
                <tbody>
                  {fuelLogs.map((fl) => (
                    <tr key={fl.id}>
                      <td style={{ fontWeight: 600, color: "var(--primary)", fontFamily: "monospace" }}>{fl.id}</td>
                      <td style={{ fontWeight: 800, color: "#fff" }}>{fl.bus}</td>
                      <td style={{ fontWeight: 700, color: "#38bdf8" }}>{fl.liters}</td>
                      <td style={{ fontWeight: 800, color: "#10b981" }}>{fl.totalCost}</td>
                      <td style={{ color: "var(--text-muted)" }}>{fl.odometer}</td>
                      <td style={{ color: "var(--text-muted)" }}>{fl.date}</td>
                      <td>{fl.vendor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vehicle Maintenance Logs */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Vehicle Maintenance & Workshop Service Logs</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Service ID</th>
                    <th>Bus</th>
                    <th>Service Work Description</th>
                    <th>Total Cost</th>
                    <th>Service Date</th>
                    <th>Next Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceLogs.map((ml) => (
                    <tr key={ml.id}>
                      <td style={{ fontWeight: 600, color: "var(--primary)", fontFamily: "monospace" }}>{ml.id}</td>
                      <td style={{ fontWeight: 800, color: "#fff" }}>{ml.bus}</td>
                      <td style={{ color: "var(--text-muted)" }}>{ml.serviceType}</td>
                      <td style={{ fontWeight: 800, color: "#10b981" }}>{ml.cost}</td>
                      <td>{ml.date}</td>
                      <td style={{ color: "var(--primary)" }}>{ml.nextDue}</td>
                      <td>
                        <span className={`badge ${ml.status === "COMPLETED" ? "badge-success" : "badge-warning"}`}>{ml.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE NEW BUS */}
      {isAddBusOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)",
          zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem"
        }}>
          <div className="glass-card" style={{ padding: "1.75rem", width: "100%", maxWidth: 500, borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>Add New Vehicle to Fleet</h3>
              <button onClick={() => setIsAddBusOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateBus} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>REGISTRATION PLATE NUMBER</label>
                <input 
                  type="text" 
                  value={newBus.number} 
                  onChange={(e) => setNewBus({ ...newBus, number: e.target.value })} 
                  placeholder="e.g. DL 01 AB 9988" 
                  required 
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }} 
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SEATING CAPACITY</label>
                  <input 
                    type="number" 
                    value={newBus.capacity} 
                    onChange={(e) => setNewBus({ ...newBus, capacity: e.target.value })} 
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ASSIGNED PILOT</label>
                  <input 
                    type="text" 
                    value={newBus.driver} 
                    onChange={(e) => setNewBus({ ...newBus, driver: e.target.value })} 
                    placeholder="e.g. Ram Singh" 
                    style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ASSIGNED ROUTE</label>
                <input 
                  type="text" 
                  value={newBus.route} 
                  onChange={(e) => setNewBus({ ...newBus, route: e.target.value })} 
                  placeholder="e.g. Route 1 (Dwarka)" 
                  style={{ width: "100%", padding: "0.7rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", color: "#fff", fontSize: "0.85rem" }} 
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsAddBusOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Register Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
