"use client";

import React, { useState } from "react";
import { 
  Bus, MapPin, Phone, AlertTriangle, ShieldCheck, Navigation, Users, 
  Plus, X, Search, Filter, Fuel, Wrench, CheckCircle2, Clock, 
  UserCheck, ArrowRight, Radio, Shield, Download, ChevronRight, Eye, Trash2, Settings, Compass
} from "lucide-react";
import { MOCK_BUSES } from "@/lib/mockData";

export default function TransportPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "buses" | "drivers" | "routes" | "stops" | "student_map" | "live" | "trips" | "maintenance" | "reports">("dashboard");
  const [sosAlertBanner, setSosAlertBanner] = useState<string | null>("🚨 SOS: Bus #04 reported sudden Tyre Deflation near Dwarka Sector 12!");

  // ── 1. BUS MANAGEMENT STATE (Module 2) ──
  const [buses, setBuses] = useState([
    { id: "BUS-01", number: "DL 01 AB 4321", name: "Bus #01", capacity: 42, model: "Tata Starbus 2024", driver: "Ram Singh", route: "Route 1 (Dwarka)", status: "Active", insurance: "Valid (12 Dec 2026)", fitness: "Passed", pollution: "Valid" },
    { id: "BUS-02", number: "DL 01 CD 8765", name: "Bus #02", capacity: 38, model: "Eicher Skyline 2023", driver: "Vikram Jeet", route: "Route 2 (Vasant Kunj)", status: "Active", insurance: "Valid (15 Oct 2026)", fitness: "Passed", pollution: "Valid" },
    { id: "BUS-03", number: "DL 01 EF 2468", name: "Bus #03", capacity: 45, model: "Ashok Leyland 2025", driver: "Sanjay Kumar", route: "Route 3 (Janakpuri)", status: "Active", insurance: "Expired (Expired)", fitness: "Passed", pollution: "Valid" }
  ]);
  const [isAddBusOpen, setIsAddBusOpen] = useState(false);
  const [newBus, setNewBus] = useState({ number: "", name: "", capacity: "42", driver: "Ram Singh", route: "Route 1" });

  // ── 2. DRIVER MANAGEMENT STATE (Module 3) ──
  const [drivers, setDrivers] = useState([
    { id: "DRV-101", name: "Ram Singh", license: "DL-14201100987", phone: "+91 98111 22334", assignedBus: "Bus #01", experience: "12 Yrs", rating: "4.9 ★", status: "ON TRIP" },
    { id: "DRV-102", name: "Vikram Jeet", license: "DL-14201100543", phone: "+91 98222 33445", assignedBus: "Bus #02", experience: "8 Yrs", rating: "4.8 ★", status: "ON TRIP" },
    { id: "DRV-103", name: "Sanjay Kumar", license: "DL-14201100321", phone: "+91 98333 44556", assignedBus: "Bus #03", experience: "15 Yrs", rating: "5.0 ★", status: "OFF DUTY" }
  ]);

  // ── 3. ROUTE MANAGEMENT STATE (Module 4) ──
  const [routes, setRoutes] = useState([
    { id: "RT-01", name: "Route 1 Dwarka Belt", morningStart: "07:00 AM", eveningStart: "02:00 PM", distance: "18.5 KM", bus: "Bus #01" },
    { id: "RT-02", name: "Route 2 Vasant Kunj Belt", morningStart: "07:15 AM", eveningStart: "02:15 PM", distance: "22.0 KM", bus: "Bus #02" }
  ]);

  // ── 4. BUS STOPS STATE (Module 5) ──
  const [stops, setStops] = useState([
    { id: "STP-01", name: "Dwarka Sector 10 Metro", order: 1, time: "07:10 AM", coordinates: "28.5833, 77.0667" },
    { id: "STP-02", name: "Dwarka Sector 12 Gate", order: 2, time: "07:22 AM", coordinates: "28.5912, 77.0588" },
    { id: "STP-03", name: "Janakpuri West Chowk", order: 3, time: "07:38 AM", coordinates: "28.6210, 77.0780" }
  ]);

  // ── 5. STUDENT TRANSPORT ASSIGNMENT (Module 6) ──
  const [studentMappings, setStudentMappings] = useState([
    { id: "MAP-01", studentName: "Aarav Sharma", class: "10-A", route: "Route 1 Dwarka Belt", bus: "Bus #01", stop: "Dwarka Sector 10 Metro" },
    { id: "MAP-02", studentName: "Ananya Patel", class: "10-A", route: "Route 2 Vasant Kunj Belt", bus: "Bus #02", stop: "Dwarka Sector 12 Gate" }
  ]);

  // ── 6. VEHICLE MAINTENANCE STATE (Module 9) ──
  const [maintenance, setMaintenance] = useState([
    { id: "MNT-01", bus: "Bus #01", type: "Engine oil change & Filter renewal", cost: "₹ 8,500", date: "15 Jul 2026", nextDue: "15 Oct 2026", status: "Completed" },
    { id: "MNT-02", bus: "Bus #02", type: "Tyre Rotation & Brake Alignment", cost: "₹ 12,000", date: "24 Jul 2026", nextDue: "24 Oct 2026", status: "Pending" }
  ]);

  // ── 7. TRIP MANAGEMENT (Module 8) ──
  const [activeTripState, setActiveTripState] = useState<"not_started" | "started" | "pickups" | "arrived" | "completed">("started");

  const handleAddBusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBus.number || !newBus.name) return;
    setBuses([...buses, {
      id: `BUS-${String(buses.length + 1).padStart(2, "0")}`,
      number: newBus.number,
      name: newBus.name,
      capacity: Number(newBus.capacity),
      model: "Tata Starbus 2025",
      driver: newBus.driver,
      route: newBus.route,
      status: "Active",
      insurance: "Valid",
      fitness: "Passed",
      pollution: "Valid"
    }]);
    setIsAddBusOpen(false);
    setNewBus({ number: "", name: "", capacity: "42", driver: "Ram Singh", route: "Route 1" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Fleet Transport Command Center <Bus size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, fontSize: "0.85rem" }}>
            Monitor real-time GPS telemetry tracks, route configurations, driver registries, emergency SOS alerts, and vehicle schedules.
          </p>
        </div>

        <button 
          onClick={() => {
            if (activeTab === "buses") setIsAddBusOpen(true);
            else alert("Configuring emergency backup bus roster...");
          }}
          className="btn btn-primary" 
          style={{ padding: "0.75rem 1.25rem" }}
        >
          <Plus size={18} />
          <span>Quick Fleet Item</span>
        </button>
      </div>

      {/* SOS ALERT BANNER */}
      {sosAlertBanner && (
        <div style={{ 
          background: "rgba(239, 68, 68, 0.15)", 
          border: "1.5px solid rgba(239, 68, 68, 0.4)", 
          padding: "1rem", 
          borderRadius: "var(--radius-md)", 
          color: "#fff",
          display: "flex",
          justify: "space-between",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.50rem", fontSize: "0.85rem", fontWeight: 700 }}>
            <AlertTriangle size={18} color="#ef4444" />
            <span>{sosAlertBanner}</span>
          </div>
          <button onClick={() => setSosAlertBanner(null)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}><X size={18} /></button>
        </div>
      )}

      {/* ════════════ 10 TABS SWITCHER CONSOLE ════════════ */}
      <div className="glass-card" style={{ 
        padding: "0.6rem", 
        display: "flex", 
        gap: "0.5rem", 
        overflowX: "auto", 
        whiteSpace: "nowrap",
        border: "1px solid var(--border-color)",
        background: "var(--bg-card)",
        borderRadius: "var(--radius-md)"
      }}>
        {[
          { id: "dashboard", label: "Transport Dashboard", icon: Radio },
          { id: "buses", label: "Bus Registry", icon: Bus },
          { id: "drivers", label: "Driver Directory", icon: UserCheck },
          { id: "routes", label: "Route Manager", icon: Compass },
          { id: "stops", label: "Bus Stops", icon: MapPin },
          { id: "student_map", label: "Student Assigner", icon: Users },
          { id: "live", label: "Live GPS Dashboard", icon: Navigation },
          { id: "trips", label: "Trip Tracker", icon: Clock },
          { id: "maintenance", label: "Vehicle Maintenance", icon: Wrench },
          { id: "reports", label: "Transport Reports", icon: Download }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`btn ${isActive ? "btn-primary" : "btn-secondary"}`}
              style={{ 
                padding: "0.6rem 1rem", 
                fontSize: "0.82rem", 
                gap: "0.45rem",
                borderRadius: "var(--radius-sm)",
                fontWeight: isActive ? 700 : 500
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ════════════ TAB VIEWS ════════════ */}

      {/* MODULE 1: TRANSPORT DASHBOARD */}
      {activeTab === "dashboard" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Stats Widgets */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1rem" }}>
            {[
              { label: "ACTIVE BUSES", val: 8, color: "var(--success)" },
              { label: "RUNNING TRIPS", val: 3, color: "var(--primary)" },
              { label: "COMPLETED TRIPS", val: 12, color: "var(--text-muted)" },
              { label: "DRIVERS ON DUTY", val: 8, color: "var(--success)" },
              { label: "STUDENTS TRAVELING", val: 245, color: "#fff" },
              { label: "TODAY'S ALERTS", val: 1, color: "#ef4444" }
            ].map((card, idx) => (
              <div key={idx} className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{card.label}</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 850, color: card.color, marginTop: 4 }}>{card.val}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 2: BUS REGISTRY */}
      {activeTab === "buses" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Bus Inventory &amp; Compliance documents</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Bus ID</th>
                <th>Plate Number</th>
                <th>Bus Model</th>
                <th>Capacity</th>
                <th>Insurance Expiry</th>
                <th>Pollution status</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{bus.name}</td>
                  <td><code style={{ fontSize: "0.85rem" }}>{bus.number}</code></td>
                  <td>{bus.model}</td>
                  <td><strong>{bus.capacity} Seats</strong></td>
                  <td style={{ color: bus.insurance.includes("Expired") ? "#ef4444" : "inherit" }}>{bus.insurance}</td>
                  <td><span className="badge badge-success">{bus.pollution}</span></td>
                  <td><span className={`badge ${bus.status === "Active" ? "badge-success" : "badge-warning"}`}>{bus.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 3: DRIVER DIRECTORY */}
      {activeTab === "drivers" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Licensed Transport Staff</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Driver Name</th>
                <th>License Number</th>
                <th>Emergency Contact</th>
                <th>Experience</th>
                <th>Rating</th>
                <th>Assigned Bus</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((drv) => (
                <tr key={drv.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{drv.name}</td>
                  <td><code style={{ fontSize: "0.8rem" }}>{drv.license}</code></td>
                  <td>{drv.phone}</td>
                  <td>{drv.experience}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 700 }}>{drv.rating}</td>
                  <td>{drv.assignedBus}</td>
                  <td>
                    <span className={`badge ${drv.status === "ON TRIP" ? "badge-success" : "badge-secondary"}`}>
                      {drv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 4: ROUTE MANAGER */}
      {activeTab === "routes" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Active Bus Routes</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Route Name</th>
                <th>Morning Shift start</th>
                <th>Evening Shift departure</th>
                <th>Route Distance</th>
                <th>Assigned Bus</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((rt) => (
                <tr key={rt.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{rt.name}</td>
                  <td>{rt.morningStart}</td>
                  <td>{rt.eveningStart}</td>
                  <td style={{ fontWeight: 700 }}>{rt.distance}</td>
                  <td>{rt.bus}</td>
                  <td><span className="badge badge-success">ACTIVE</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 5: BUS STOPS */}
      {activeTab === "stops" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Mapped Boarding Bus Stops</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Stop Order</th>
                <th>Stop Name Description</th>
                <th>Pickup Scheduled Hour</th>
                <th>Geo Coordinates</th>
              </tr>
            </thead>
            <tbody>
              {stops.map((stop) => (
                <tr key={stop.id}>
                  <td><span className="badge badge-info">Stop #{stop.order}</span></td>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{stop.name}</td>
                  <td style={{ fontWeight: 700, color: "var(--primary)" }}>{stop.time}</td>
                  <td><code style={{ fontSize: "0.8rem" }}>{stop.coordinates}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 6: STUDENT TRANSPORT ASSIGNMENT */}
      {activeTab === "student_map" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Student Mapped Transport Matrix</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Assigned Route</th>
                <th>Assigned Vehicle</th>
                <th>Primary Boarding Stop</th>
              </tr>
            </thead>
            <tbody>
              {studentMappings.map((map) => (
                <tr key={map.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{map.studentName}</td>
                  <td>Class {map.class}</td>
                  <td>{map.route}</td>
                  <td style={{ fontWeight: 700 }}>{map.bus}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 700 }}>{map.stop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 7: LIVE GPS DASHBOARD */}
      {activeTab === "live" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          
          {/* SVG Map */}
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Active Fleet Location Tracker</h3>
            
            <div style={{ 
              width: "100%", 
              height: 320, 
              background: "rgba(255,255,255,0.01)", 
              border: "1.5px solid var(--border-color)", 
              borderRadius: "var(--radius-lg)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justify: "center"
            }}>
              {/* Simulated Map Background lines */}
              <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, opacity: 0.1 }}>
                <line x1="10%" y1="0" x2="10%" y2="100%" stroke="#fff" strokeWidth="2" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#fff" strokeWidth="2" />
                <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#fff" strokeWidth="2" />
                <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
              </svg>

              {/* Mapped Bus nodes */}
              <div style={{ position: "absolute", top: "35%", left: "45%", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <Bus size={24} color="var(--primary)" style={{ filter: "drop-shadow(0 0 8px var(--primary))" }} />
                <span style={{ fontSize: "0.65rem", background: "#0b0f19", padding: "0.15rem 0.35rem", borderRadius: 4, border: "1px solid var(--border-color)" }}>Bus #01 (52 km/h)</span>
              </div>

              <div style={{ position: "absolute", top: "65%", left: "20%", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <Bus size={24} color="#f59e0b" style={{ filter: "drop-shadow(0 0 8px #f59e0b)" }} />
                <span style={{ fontSize: "0.65rem", background: "#0b0f19", padding: "0.15rem 0.35rem", borderRadius: 4, border: "1px solid var(--border-color)" }}>Bus #02 (40 km/h)</span>
              </div>
            </div>
          </div>

          {/* Telemetry info */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem" }}>Fleet Telemetry logs</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {buses.map(b => (
                <div key={b.id} style={{ padding: "0.85rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: 8 }}>
                  <div style={{ display: "flex", justify: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: 700, color: "#fff" }}>{b.name} ({b.number})</div>
                    <span className="badge badge-success" style={{ fontSize: "0.65rem" }}>GPS ONLINE</span>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>
                    Speed: <strong>48 km/h</strong> &bull; ETA: <strong>12 Mins</strong>
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: 2 }}>Last Updated: Just Now</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* MODULE 8: TRIP TRACKER TIMELINE */}
      {activeTab === "trips" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Active morning trip status</h3>
          
          <div style={{ display: "flex", justify: "space-between", position: "relative", padding: "1.5rem 0" }}>
            {/* Background line */}
            <div style={{ position: "absolute", top: "50%", left: "5%", right: "5%", height: 3, background: "rgba(255,255,255,0.08)", zIndex: 1 }} />
            
            {[
              { id: "started", label: "Start Trip" },
              { id: "pickups", label: "Pickups En-Route" },
              { id: "arrived", label: "Reach School" },
              { id: "completed", label: "End Trip & Retract" }
            ].map((step, idx) => {
              const isActive = activeTripState === step.id;
              return (
                <div key={idx} style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: "50%", 
                    background: isActive ? "var(--primary)" : "var(--bg-card)",
                    border: `2px solid ${isActive ? "var(--primary)" : "var(--border-color)"}`,
                    display: "flex",
                    alignItems: "center",
                    justify: "center",
                    color: "#fff",
                    fontWeight: 700
                  }}>
                    {idx + 1}
                  </div>
                  <span style={{ fontSize: "0.8rem", fontWeight: isActive ? 700 : 500, color: isActive ? "var(--primary)" : "var(--text-muted)" }}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justify: "center", marginTop: "1.5rem" }}>
            <button 
              onClick={() => {
                if (activeTripState === "started") setActiveTripState("pickups");
                else if (activeTripState === "pickups") setActiveTripState("arrived");
                else if (activeTripState === "arrived") setActiveTripState("completed");
                else setActiveTripState("started");
              }}
              className="btn btn-primary"
            >
              Simulate Next Shift Phase
            </button>
          </div>
        </div>
      )}

      {/* MODULE 9: VEHICLE MAINTENANCE */}
      {activeTab === "maintenance" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Service Logs &amp; Repairs schedules</h3>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Bus ID</th>
                <th>Maintenance Service Type</th>
                <th>Logged Service Date</th>
                <th>Next Scheduled Due</th>
                <th>Repairs Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {maintenance.map((m) => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 700, color: "#fff" }}>{m.bus}</td>
                  <td>{m.type}</td>
                  <td>{m.date}</td>
                  <td style={{ fontWeight: 600 }}>{m.nextDue}</td>
                  <td style={{ fontWeight: 700, color: "var(--success)" }}>{m.cost}</td>
                  <td>
                    <span className={`badge ${m.status === "Completed" ? "badge-success" : "badge-warning"}`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 10: TRANSPORT REPORTS */}
      {activeTab === "reports" && (
        <div className="glass-card" style={{ padding: "1.5rem", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>Fleet Reports Downloader</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>Generate comprehensive summaries of daily route times, driver ratings, and bus passenger capacities.</p>
          
          <div style={{ display: "flex", justify: "center", gap: "1rem" }}>
            <button onClick={() => alert("Downloading Daily Trip reports...")} className="btn btn-primary" style={{ padding: "0.75rem 1.5rem", gap: "0.5rem" }}>
              <Download size={16} /> Download Daily Trip Log (PDF)
            </button>
            <button onClick={() => alert("Downloading Bus Utilization indexes...")} className="btn btn-secondary" style={{ padding: "0.75rem 1.5rem", gap: "0.5rem" }}>
              <Download size={16} /> Export Utilization Stats (Excel)
            </button>
          </div>
        </div>
      )}

      {/* ════════════ QUICK ADD BUS MODAL ════════════ */}
      {isAddBusOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justify: "center" }}>
          <div className="glass-card" style={{ padding: "1.5rem", width: 400 }}>
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Add New Bus</h3>
              <button onClick={() => setIsAddBusOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddBusSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>BUS NAME / CODE</label>
                <input type="text" value={newBus.name} onChange={(e) => setNewBus({ ...newBus, name: e.target.value })} placeholder="e.g. Bus #05" required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>PLATE NUMBER</label>
                <input type="text" value={newBus.number} onChange={(e) => setNewBus({ ...newBus, number: e.target.value })} placeholder="e.g. DL 01 ZX 9999" required style={{ width: "100%", padding: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", borderRadius: 6, color: "#fff" }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.65rem", justifyContent: "center" }}>Create Bus Schedulings</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
