"use client";

import React, { useState, useEffect } from "react";
import { 
  Bus, MapPin, Phone, AlertTriangle, ShieldCheck, Navigation, Users, 
  Plus, X, Search, Filter, Fuel, Wrench, CheckCircle2, Clock, 
  UserCheck, ArrowRight, Radio, Shield, Download, ChevronRight, Eye, Trash2, Settings, Compass, Edit3, Save, Power
} from "lucide-react";
import { MOCK_STUDENTS } from "@/lib/mockData";

interface BusRecord {
  id?: string;
  _id?: string;
  busNumber: string;
  registrationNo?: string;
  capacity: number;
  driverName?: string;
  routeName?: string;
  status: "Active" | "Maintenance" | "Inactive";
}

interface DriverRecord {
  id?: string;
  _id?: string;
  name: string;
  phone: string;
  licenseNo: string;
  assignedBus?: string;
  status: string;
}

interface RouteRecord {
  id?: string;
  _id?: string;
  routeName: string;
  startPoint: string;
  endPoint: string;
  distanceKm?: number;
  bus?: string;
}

interface StopRecord {
  id: string;
  name: string;
  order: number;
  time: string;
  coordinates: string;
}

interface StudentMapping {
  id: string;
  studentName: string;
  class: string;
  route: string;
  bus: string;
  stop: string;
}

interface MaintenanceRecord {
  id: string;
  bus: string;
  type: string;
  cost: string;
  date: string;
  nextDue: string;
  status: string;
}

export default function TransportPage() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "buses" | "drivers" | "routes" | "stops" | "student_map" | "live" | "trips" | "maintenance" | "reports"
  >("dashboard");

  const [sosAlertBanner, setSosAlertBanner] = useState<string | null>("🚨 SOS Alert: Bus #02 reports engine overheating near Vasant Kunj Sector 4.");

  // ════════════ 1. STATE ARRAYS ════════════
  const [buses, setBuses] = useState<BusRecord[]>([]);
  const [isBusModalOpen, setIsBusModalOpen] = useState(false);
  const [editingBusId, setEditingBusId] = useState<string | null>(null);
  const [busForm, setBusForm] = useState({ busNumber: "", capacity: 42, driverName: "Ram Singh", routeName: "Route 1 Dwarka", status: "Active" as const });

  const [drivers, setDrivers] = useState<DriverRecord[]>([]);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [editingDriverId, setEditingDriverId] = useState<string | null>(null);
  const [driverForm, setDriverForm] = useState({ name: "", phone: "", licenseNo: "", assignedBus: "Bus #01", status: "Active" });

  const [routes, setRoutes] = useState<RouteRecord[]>([]);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [editingRouteId, setEditingRouteId] = useState<string | null>(null);
  const [routeForm, setRouteForm] = useState({ routeName: "", startPoint: "", endPoint: "", distanceKm: 15 });

  const [stops, setStops] = useState<StopRecord[]>([
    { id: "STP-01", name: "Dwarka Sector 10 Metro", order: 1, time: "07:10 AM", coordinates: "28.5833, 77.0667" },
    { id: "STP-02", name: "Dwarka Sector 12 Gate", order: 2, time: "07:22 AM", coordinates: "28.5912, 77.0588" },
    { id: "STP-03", name: "Janakpuri West Chowk", order: 3, time: "07:38 AM", coordinates: "28.6210, 77.0780" }
  ]);

  const [studentMappings, setStudentMappings] = useState<StudentMapping[]>([
    { id: "MAP-01", studentName: "Aarav Sharma", class: "10-A", route: "Route 1 Dwarka Belt", bus: "Bus #01", stop: "Dwarka Sector 10 Metro" },
    { id: "MAP-02", studentName: "Ananya Patel", class: "10-A", route: "Route 2 Vasant Kunj Belt", bus: "Bus #02", stop: "Dwarka Sector 12 Gate" }
  ]);

  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>([
    { id: "MNT-01", bus: "Bus #01", type: "Engine oil change & Filter renewal", cost: "₹ 8,500", date: "2026-07-15", nextDue: "2026-10-15", status: "Completed" },
    { id: "MNT-02", bus: "Bus #02", type: "Tyre Rotation & Brake Alignment", cost: "₹ 12,000", date: "2026-07-24", nextDue: "2026-10-24", status: "Pending" }
  ]);

  // Trip Tracker Logs (kab bus nikla kab pahuncha)
  const [tripHistory, setTripHistory] = useState<any[]>([
    { id: "TRIP-101", busNo: "Bus #01", route: "Route 1 Dwarka Belt", startTime: "07:15 AM", endTime: "08:05 AM", status: "Completed" },
    { id: "TRIP-102", busNo: "Bus #02", route: "Route 2 Vasant Kunj Belt", startTime: "07:20 AM", endTime: "08:12 AM", status: "Completed" }
  ]);
  const [activeTrip, setActiveTrip] = useState<any | null>({
    busNo: "Bus #01",
    route: "Route 1 Dwarka Belt",
    startTime: "03:15 PM",
    endTime: null,
    status: "Running"
  });

  // ════════════ BACKEND API SYNC ════════════
  useEffect(() => {
    fetchBuses();
    fetchDrivers();
    fetchRoutes();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/transport/buses");
      const data = await res.json();
      if (data.success && data.data.buses) setBuses(data.data.buses);
    } catch (e) {
      setBuses([
        { _id: "BUS-01", busNumber: "DL 01 AB 4321", capacity: 42, driverName: "Ram Singh", routeName: "Route 1 Dwarka", status: "Active" },
        { _id: "BUS-02", busNumber: "DL 01 CD 8765", capacity: 38, driverName: "Vikram Jeet", routeName: "Route 2 Vasant Kunj", status: "Active" }
      ]);
    }
  };

  const fetchDrivers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/transport/drivers");
      const data = await res.json();
      if (data.success && data.data.drivers) setDrivers(data.data.drivers);
    } catch (e) {
      setDrivers([
        { _id: "DRV-101", name: "Ram Singh", phone: "+91 98111 22334", licenseNo: "DL-14201100987", assignedBus: "Bus #01", status: "Active" },
        { _id: "DRV-102", name: "Vikram Jeet", phone: "+91 98222 33445", licenseNo: "DL-14201100543", assignedBus: "Bus #02", status: "Active" }
      ]);
    }
  };

  const fetchRoutes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/transport/routes");
      const data = await res.json();
      if (data.success && data.data.routes) setRoutes(data.data.routes);
    } catch (e) {
      setRoutes([
        { _id: "RT-01", routeName: "Route 1 Dwarka Belt", startPoint: "Sector 21 Metro", endPoint: "DPS Campus", distanceKm: 18 },
        { _id: "RT-02", routeName: "Route 2 Vasant Kunj Belt", startPoint: "Fortis Gate", endPoint: "DPS Campus", distanceKm: 22 }
      ]);
    }
  };

  // Bus Handlers
  const handleOpenAddBus = () => {
    setEditingBusId(null);
    setBusForm({ busNumber: "", capacity: 42, driverName: "Ram Singh", routeName: "Route 1 Dwarka", status: "Active" });
    setIsBusModalOpen(true);
  };

  const handleOpenEditBus = (bus: BusRecord) => {
    setEditingBusId(bus._id || bus.id || null);
    setBusForm({ busNumber: bus.busNumber, capacity: bus.capacity, driverName: bus.driverName || "Ram Singh", routeName: bus.routeName || "Route 1 Dwarka", status: bus.status });
    setIsBusModalOpen(true);
  };

  const handleSaveBus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBusId) {
      setBuses(buses.map(b => (b._id || b.id) === editingBusId ? { ...b, ...busForm } : b));
      alert("Bus record updated.");
    } else {
      try {
        const res = await fetch("http://localhost:5000/api/v1/transport/buses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(busForm)
        });
        const data = await res.json();
        if (data.success) {
          alert("Bus saved successfully in backend database!");
          fetchBuses();
        }
      } catch (err) {
        const created: BusRecord = { _id: `BUS-${Date.now()}`, ...busForm };
        setBuses([...buses, created]);
      }
    }
    setIsBusModalOpen(false);
  };

  const handleDeleteBus = (id: string) => {
    if (confirm("Are you sure you want to delete this bus registration?")) {
      setBuses(buses.filter(b => (b._id || b.id) !== id));
      alert("Bus removed.");
    }
  };

  // Driver Handlers
  const handleOpenAddDriver = () => {
    setEditingDriverId(null);
    setDriverForm({ name: "", phone: "", licenseNo: "", assignedBus: "Bus #01", status: "Active" });
    setIsDriverModalOpen(true);
  };

  const handleOpenEditDriver = (d: DriverRecord) => {
    setEditingDriverId(d._id || d.id || null);
    setDriverForm({ name: d.name, phone: d.phone, licenseNo: d.licenseNo, assignedBus: d.assignedBus || "Bus #01", status: d.status });
    setIsDriverModalOpen(true);
  };

  const handleSaveDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDriverId) {
      setDrivers(drivers.map(d => (d._id || d.id) === editingDriverId ? { ...d, ...driverForm } : d));
      alert("Driver details updated.");
    } else {
      try {
        const res = await fetch("http://localhost:5000/api/v1/transport/drivers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(driverForm)
        });
        const data = await res.json();
        if (data.success) {
          alert("Driver successfully registered in MongoDB!");
          fetchDrivers();
        }
      } catch (err) {
        const created: DriverRecord = { _id: `DRV-${Date.now()}`, ...driverForm };
        setDrivers([...drivers, created]);
      }
    }
    setIsDriverModalOpen(false);
  };

  const handleDeleteDriver = (id: string) => {
    if (confirm("Delete driver record?")) {
      setDrivers(drivers.filter(d => (d._id || d.id) !== id));
      alert("Driver deleted.");
    }
  };

  // Route Handlers
  const handleOpenAddRoute = () => {
    setEditingRouteId(null);
    setRouteForm({ routeName: "", startPoint: "", endPoint: "", distanceKm: 15 });
    setIsRouteModalOpen(true);
  };

  const handleOpenEditRoute = (r: RouteRecord) => {
    setEditingRouteId(r._id || r.id || null);
    setRouteForm({ routeName: r.routeName, startPoint: r.startPoint, endPoint: r.endPoint, distanceKm: r.distanceKm || 15 });
    setIsRouteModalOpen(true);
  };

  const handleSaveRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRouteId) {
      setRoutes(routes.map(r => (r._id || r.id) === editingRouteId ? { ...r, ...routeForm } : r));
      alert("Route configuration updated.");
    } else {
      try {
        const res = await fetch("http://localhost:5000/api/v1/transport/routes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(routeForm)
        });
        const data = await res.json();
        if (data.success) {
          alert("New route defined successfully!");
          fetchRoutes();
        }
      } catch (err) {
        const created: RouteRecord = { _id: `RT-${Date.now()}`, ...routeForm };
        setRoutes([...routes, created]);
      }
    }
    setIsRouteModalOpen(false);
  };

  // Trip Simulators (kab bus nikla, kab pahuncha)
  const handleStartTrip = () => {
    setActiveTrip({
      busNo: "Bus #01",
      route: "Route 1 Dwarka Belt",
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endTime: null,
      status: "Running"
    });
    alert("Trip started! Bus checked out from school gate.");
  };

  const handleEndTrip = () => {
    if (!activeTrip) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const completedTrip = {
      ...activeTrip,
      endTime: timeStr,
      status: "Completed"
    };
    setTripHistory([completedTrip, ...tripHistory]);
    setActiveTrip(null);
    alert(`Trip completed safely! Bus checked in at ${timeStr}.`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* PAGE HEADER */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "var(--text-heading)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Fleet Transport Command Center <Bus size={24} color="var(--primary)" />
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 2, margin: 0, fontSize: "0.85rem" }}>
            Monitor real-time GPS telemetry tracks, route configurations, driver registries, and active trips logs.
          </p>
        </div>

        <button 
          onClick={() => {
            if (activeTab === "buses") handleOpenAddBus();
            else if (activeTab === "drivers") handleOpenAddDriver();
            else if (activeTab === "routes") handleOpenAddRoute();
            else alert("Please select Buses, Drivers, or Routes tab to quick add fleet items.");
          }}
          className="btn btn-primary" 
          style={{ padding: "0.6rem 1.15rem", fontSize: "0.85rem", gap: "0.45rem" }}
        >
          <Plus size={16} /> Quick Fleet Item
        </button>
      </div>

      {/* SOS ALERT BANNER */}
      {sosAlertBanner && (
        <div style={{ background: "rgba(239, 68, 68, 0.12)", border: "1.5px solid rgba(239, 68, 68, 0.3)", padding: "1rem", borderRadius: 10, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", fontWeight: 700 }}>
            <AlertTriangle size={18} color="#ef4444" />
            <span>{sosAlertBanner}</span>
          </div>
          <button onClick={() => setSosAlertBanner(null)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}><X size={18} /></button>
        </div>
      )}

      {/* SUB-TABS NAVIGATION BAR */}
      <div className="glass-card" style={{ padding: "0.6rem", display: "flex", gap: "0.5rem", overflowX: "auto", whiteSpace: "nowrap" }}>
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
              style={{ padding: "0.55rem 0.95rem", fontSize: "0.82rem", gap: "0.4rem", borderRadius: 8, fontWeight: isActive ? 700 : 500 }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ════════════ 1. TRANSPORT DASHBOARD ════════════ */}
      {activeTab === "dashboard" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1rem" }}>
          {[
            { label: "ACTIVE BUSES", val: buses.length, color: "var(--success)" },
            { label: "RUNNING TRIPS", val: activeTrip ? 1 : 0, color: "var(--primary)" },
            { label: "COMPLETED TRIPS", val: tripHistory.length, color: "var(--text-muted)" },
            { label: "DRIVERS ON DUTY", val: drivers.length, color: "var(--success)" },
            { label: "STUDENTS TRAVELING", val: 245, color: "var(--text-heading)" },
            { label: "TODAY'S ALERTS", val: sosAlertBanner ? 1 : 0, color: "#ef4444" }
          ].map((card, idx) => (
            <div key={idx} className="glass-card" style={{ padding: "1.25rem", textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>{card.label}</span>
              <strong style={{ fontSize: "1.6rem", color: card.color, display: "block", marginTop: 4 }}>{card.val}</strong>
            </div>
          ))}
        </div>
      )}

      {/* ════════════ 2. BUS REGISTRY ════════════ */}
      {activeTab === "buses" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Bus Inventory &amp; Registration Plate Codes</h3>
            <button onClick={handleOpenAddBus} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Add New Bus
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Bus ID/Name</th>
                <th>Plate Registration Number</th>
                <th>Seating Capacity</th>
                <th>Assigned Driver</th>
                <th>Mapped Route</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus._id || bus.id}>
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{bus.busNumber}</td>
                  <td style={{ fontFamily: "monospace", fontWeight: 700 }}>{bus.registrationNo || bus.busNumber}</td>
                  <td style={{ fontWeight: 700 }}>{bus.capacity} Seats</td>
                  <td>{bus.driverName || "Ram Singh"}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 700 }}>{bus.routeName || "Route 1 Dwarka"}</td>
                  <td>
                    <span className={`badge ${bus.status === "Active" ? "badge-success" : "badge-secondary"}`}>
                      {bus.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                      <button onClick={() => handleOpenEditBus(bus)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem" }}><Edit3 size={13} /></button>
                      <button onClick={() => handleDeleteBus(bus._id || bus.id || "")} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 3. DRIVER DIRECTORY ════════════ */}
      {activeTab === "drivers" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Licensed Fleet Drivers</h3>
            <button onClick={handleOpenAddDriver} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Add Driver
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Driver Name</th>
                <th>License Number</th>
                <th>Contact Phone</th>
                <th>Assigned Vehicle</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((drv) => (
                <tr key={drv._id || drv.id}>
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{drv.name}</td>
                  <td style={{ fontFamily: "monospace" }}>{drv.licenseNo}</td>
                  <td style={{ fontWeight: 700 }}>{drv.phone}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 700 }}>{drv.assignedBus}</td>
                  <td><span className="badge badge-success">{drv.status}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                      <button onClick={() => handleOpenEditDriver(drv)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem" }}><Edit3 size={13} /></button>
                      <button onClick={() => handleDeleteDriver(drv._id || drv.id || "")} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 4. ROUTE MANAGER ════════════ */}
      {activeTab === "routes" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Active Bus Routes</h3>
            <button onClick={handleOpenAddRoute} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Add Route
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Route Name</th>
                <th>Start Terminal Point</th>
                <th>End Destination Point</th>
                <th>Total Distance</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((rt) => (
                <tr key={rt._id || rt.id}>
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{rt.routeName}</td>
                  <td>{rt.startPoint}</td>
                  <td>{rt.endPoint}</td>
                  <td style={{ fontWeight: 800 }}>{rt.distanceKm || 18} KM</td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                      <button onClick={() => handleOpenEditRoute(rt)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem" }}><Edit3 size={13} /></button>
                      <button onClick={() => setRoutes(routes.filter(x => (x._id || x.id) !== (rt._id || rt.id)))} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 5. BUS STOPS ════════════ */}
      {activeTab === "stops" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1rem" }}>Mapped Boarding Bus Stops</h3>
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
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{stop.name}</td>
                  <td style={{ fontWeight: 700, color: "var(--primary)" }}>{stop.time}</td>
                  <td><code style={{ fontSize: "0.8rem" }}>{stop.coordinates}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 6. STUDENT ASSIGNMENT ════════════ */}
      {activeTab === "student_map" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1rem" }}>Student Mapped Transport Matrix</h3>
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
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{map.studentName}</td>
                  <td style={{ fontWeight: 600 }}>Class {map.class}</td>
                  <td>{map.route}</td>
                  <td style={{ fontWeight: 700 }}>{map.bus}</td>
                  <td style={{ color: "var(--primary)", fontWeight: 700 }}>{map.stop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 7. LIVE GPS MAP ════════════ */}
      {activeTab === "live" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "1.5rem" }}>
          <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Active Fleet Location Tracker</h3>
            
            <div style={{ width: "100%", height: 320, background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 12, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, opacity: 0.1 }}>
                <line x1="10%" y1="0" x2="10%" y2="100%" stroke="#fff" strokeWidth="2" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#fff" strokeWidth="2" />
                <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#fff" strokeWidth="2" />
                <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#fff" strokeWidth="2" strokeDasharray="5,5" />
              </svg>

              <div style={{ position: "absolute", top: "35%", left: "45%", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <Bus size={24} color="var(--primary)" style={{ filter: "drop-shadow(0 0 8px var(--primary))" }} />
                <span style={{ fontSize: "0.65rem", background: "var(--bg-card)", padding: "0.15rem 0.35rem", borderRadius: 4, border: "1px solid var(--border-color)", color: "var(--text-heading)", fontWeight: 700 }}>Bus #01 (52 km/h)</span>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: "1rem", color: "var(--text-heading)" }}>Fleet Telemetry Status</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {buses.map(b => (
                <div key={b._id || b.id} style={{ padding: "0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ color: "var(--text-heading)" }}>{b.busNumber}</strong>
                    <span className="badge badge-success">GPS ONLINE</span>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>
                    Route: {b.routeName || "Route 1 Dwarka"} &bull; Pilot: {b.driverName || "Ram Singh"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════════════ 8. TRIP TRACKER (KAB NIKLA / KAB PAHUNCHA) ════════════ */}
      {activeTab === "trips" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Active trip console */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1rem" }}>Live Trip Controls (Checkout/Checkin)</h3>
            
            {activeTrip ? (
              <div style={{ padding: "1.25rem", background: "rgba(99, 102, 241, 0.1)", border: "1.5px solid var(--primary)", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 1.5s infinite" }} />
                    <strong style={{ color: "var(--text-heading)", fontSize: "1.05rem" }}>Active Outward Trip: {activeTrip.busNo}</strong>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 4 }}>
                    Route: {activeTrip.route} &bull; Check-out Departure Time: <strong style={{ color: "var(--primary)" }}>{activeTrip.startTime}</strong>
                  </div>
                </div>

                <button onClick={handleEndTrip} className="btn btn-primary" style={{ padding: "0.6rem 1.25rem", background: "#ef4444", border: "none", gap: "0.4rem" }}>
                  <Power size={16} /> Mark Checked-in (Reach destination)
                </button>
              </div>
            ) : (
              <div style={{ padding: "1.25rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <strong style={{ color: "var(--text-heading)", fontSize: "1rem" }}>No active trip currently checked out.</strong>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 4 }}>Dispatched buses can be monitored from here.</div>
                </div>

                <button onClick={handleStartTrip} className="btn btn-primary" style={{ padding: "0.6rem 1.25rem", gap: "0.4rem" }}>
                  <Navigation size={16} /> Trigger Check-out Departure
                </button>
              </div>
            )}
          </div>

          {/* Trip history log */}
          <div className="glass-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", marginBottom: "1rem" }}>Today&apos;s Departure &amp; Arrival Logs</h3>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Vehicle Number</th>
                  <th>Route Belt</th>
                  <th>Departure Time (Checkout)</th>
                  <th>Arrival Time (Checkin)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tripHistory.map((trip, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{trip.busNo}</td>
                    <td style={{ fontWeight: 700 }}>{trip.route}</td>
                    <td style={{ color: "var(--primary)", fontWeight: 800 }}>{trip.startTime}</td>
                    <td style={{ color: "var(--success)", fontWeight: 800 }}>{trip.endTime}</td>
                    <td><span className="badge badge-success">{trip.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ════════════ 9. VEHICLE MAINTENANCE ════════════ */}
      {activeTab === "maintenance" && (
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-heading)" }}>Service Logs &amp; Repairs schedules</h3>
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
                  <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{m.bus}</td>
                  <td>{m.type}</td>
                  <td>{m.date}</td>
                  <td style={{ fontWeight: 700 }}>{m.nextDue}</td>
                  <td style={{ fontWeight: 800, color: "var(--success)" }}>{m.cost}</td>
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

      {/* ════════════ ADD/EDIT BUS MODAL ════════════ */}
      {isBusModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                {editingBusId ? "Edit Bus Details" : "Register New Bus"}
              </h3>
              <button onClick={() => setIsBusModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveBus} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>BUS ID / NAME (e.g. Bus #05)</label>
                <input type="text" value={busForm.busNumber} onChange={(e) => setBusForm({ ...busForm, busNumber: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SEATING CAPACITY</label>
                  <input type="number" value={busForm.capacity} onChange={(e) => setBusForm({ ...busForm, capacity: Number(e.target.value) })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STATUS</label>
                  <select value={busForm.status} onChange={(e) => setBusForm({ ...busForm, status: e.target.value as any })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="Active">Active</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ASSIGN PILOT DRIVER</label>
                <input type="text" value={busForm.driverName} onChange={(e) => setBusForm({ ...busForm, driverName: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>MAPPED ROUTE BELT</label>
                <input type="text" value={busForm.routeName} onChange={(e) => setBusForm({ ...busForm, routeName: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsBusModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Bus Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ ADD/EDIT DRIVER MODAL ════════════ */}
      {isDriverModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                {editingDriverId ? "Edit Driver Details" : "Register Pilot Driver"}
              </h3>
              <button onClick={() => setIsDriverModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveDriver} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DRIVER FULL NAME</label>
                <input type="text" value={driverForm.name} onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PHONE CONTACT</label>
                  <input type="text" value={driverForm.phone} onChange={(e) => setDriverForm({ ...driverForm, phone: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>LICENSE NUMBER</label>
                  <input type="text" value={driverForm.licenseNo} onChange={(e) => setDriverForm({ ...driverForm, licenseNo: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ASSIGNED BUS</label>
                <input type="text" value={driverForm.assignedBus} onChange={(e) => setDriverForm({ ...driverForm, assignedBus: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsDriverModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Driver Details</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════════ ADD/EDIT ROUTE MODAL ════════════ */}
      {isRouteModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                {editingRouteId ? "Edit Route Details" : "Add New Route"}
              </h3>
              <button onClick={() => setIsRouteModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveRoute} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ROUTE NAME / BELT (e.g. Route 3 Belt)</label>
                <input type="text" value={routeForm.routeName} onChange={(e) => setRouteForm({ ...routeForm, routeName: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>START TERMINAL POINT</label>
                  <input type="text" value={routeForm.startPoint} onChange={(e) => setRouteForm({ ...routeForm, startPoint: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>END TERMINAL POINT</label>
                  <input type="text" value={routeForm.endPoint} onChange={(e) => setRouteForm({ ...routeForm, endPoint: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DISTANCE IN KILOMETERS (KM)</label>
                <input type="number" value={routeForm.distanceKm} onChange={(e) => setRouteForm({ ...routeForm, distanceKm: Number(e.target.value) })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsRouteModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Save Route</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
