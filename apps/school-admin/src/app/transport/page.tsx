"use client";

import React, { useState, useEffect } from "react";
import { 
  Bus, MapPin, Phone, AlertTriangle, ShieldCheck, Navigation, Users, 
  Plus, X, Search, Filter, Fuel, Wrench, CheckCircle2, Clock, 
  UserCheck, ArrowRight, Radio, Shield, Download, ChevronRight, Eye, Trash2, Settings, Compass, Edit3, Save, Power
} from "lucide-react";
import { MOCK_STUDENTS } from "@/lib/mockData";
import { createSocketConnection } from "@/lib/socketClient";

interface BusRecord {
  id?: string;
  _id?: string;
  busNumber: string;
  registrationNo?: string;
  busType?: string;
  capacity: number;
  gpsDeviceId?: string;
  driverId?: any;
  driverName?: string;
  routeName?: string;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "Active" | "Maintenance" | "Inactive";
}

interface DriverRecord {
  id?: string;
  _id?: string;
  name: string;
  empId?: string;
  phone: string;
  licenseNo: string;
  licenseExpiry?: string;
  photo?: string;
  assignedBusId?: any;
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
  stops?: any[];
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

  // Fleet command center states
  const [selectedBusId, setSelectedBusId] = useState<string>("Bus 01");
  const [fleet, setFleet] = useState([
    {
      id: "Bus 01",
      busNumber: "Bus 01",
      registrationNo: "DL 01 SM 1001",
      status: "ACTIVE",
      tripStatus: "IN_PROGRESS",
      driver: { name: "Amit Kumar", phone: "+91 98765 43210", empId: "DRV-101", license: "DL142021008765" },
      route: { name: "Route 01 - Dwarka Belt", stops: ["Main Market", "Maple Park", "City Center", "Sector 52", "School"] },
      latitude: 28.5833,
      longitude: 77.0667,
      speed: 35,
      heading: 90,
      lastUpdated: "Just now",
      students: [
        { name: "Rahul Kumar", class: "8-A", stop: "Main Market" },
        { name: "Aarav Sharma", class: "5-A", stop: "Maple Park" },
        { name: "Siya Patel", class: "5-A", stop: "City Center" }
      ]
    },
    {
      id: "Bus 02",
      busNumber: "Bus 02",
      registrationNo: "DL 01 SM 1002",
      status: "ACTIVE",
      tripStatus: "STARTED",
      driver: { name: "Rajesh Kumar", phone: "+91 87654 32109", empId: "DRV-102", license: "DL142021008766" },
      route: { name: "Route 02 - Vasant Kunj", stops: ["Vasant Kunj Sector 4", "Munirka", "School"] },
      latitude: 28.5700,
      longitude: 77.1200,
      speed: 40,
      heading: 180,
      lastUpdated: "1 minute ago",
      students: [
        { name: "Ananya Verma", class: "5-B", stop: "Vasant Kunj Sector 4" }
      ]
    },
    {
      id: "Bus 03",
      busNumber: "Bus 03",
      registrationNo: "DL 01 SM 1003",
      status: "ACTIVE",
      tripStatus: "SCHEDULED",
      driver: { name: "Ram Singh", phone: "+91 76543 21098", empId: "DRV-103", license: "DL142021008767" },
      route: { name: "Route 03 - Rohini Belt", stops: ["Rohini Sector 9", "School"] },
      latitude: 28.7041,
      longitude: 77.1025,
      speed: 0,
      heading: 0,
      lastUpdated: "5 minutes ago",
      students: [
        { name: "Rohan Mehta", class: "5-B", stop: "Rohini Sector 9" }
      ]
    },
    {
      id: "Bus 04",
      busNumber: "Bus 04",
      registrationNo: "DL 01 SM 1004",
      status: "MAINTENANCE",
      tripStatus: "COMPLETED",
      driver: { name: "Suresh Pal", phone: "+91 65432 10987", empId: "DRV-104", license: "DL142021008768" },
      route: { name: "Route 04 - Karol Bagh", stops: ["Karol Bagh Metro", "School"] },
      latitude: 28.6448,
      longitude: 77.1878,
      speed: 0,
      heading: 0,
      lastUpdated: "Offline",
      students: []
    }
  ]);

  useEffect(() => {
    const socket = createSocketConnection("http://localhost:5000");
    if (socket) {
      socket.on("bus:location_changed", (data: any) => {
        if (data && data.busId === "BUS-01") {
          setFleet(prev => prev.map(bus => {
            if (bus.id === "Bus 01") {
              return {
                ...bus,
                latitude: data.latitude,
                longitude: data.longitude,
                speed: data.speed,
                heading: data.heading || bus.heading,
                lastUpdated: "Just now"
              };
            }
            return bus;
          }));
        }
      });
    }
    return () => {
      if (socket && typeof socket.disconnect === 'function') {
        socket.disconnect();
      }
    };
  }, []);

  // ════════════ 1. STATE ARRAYS ════════════
  const [buses, setBuses] = useState<BusRecord[]>([]);
  const [isBusModalOpen, setIsBusModalOpen] = useState(false);
  const [editingBusId, setEditingBusId] = useState<string | null>(null);
  const [busForm, setBusForm] = useState({
    busNumber: "",
    registrationNo: "",
    busType: "School Bus",
    capacity: 40,
    gpsDeviceId: "",
    driverId: "",
    routeId: "",
    routeName: "",
    status: "ACTIVE" as const
  });

  const [drivers, setDrivers] = useState<DriverRecord[]>([]);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [editingDriverId, setEditingDriverId] = useState<string | null>(null);
  const [driverForm, setDriverForm] = useState({ name: "", empId: "", phone: "", licenseNo: "", licenseExpiry: "", photo: "", assignedBusId: "", status: "Active" });

  const [routes, setRoutes] = useState<RouteRecord[]>([]);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [editingRouteId, setEditingRouteId] = useState<string | null>(null);
  const [routeForm, setRouteForm] = useState({ routeName: "", startPoint: "", endPoint: "", distanceKm: 15 });

  const [studentAssignments, setStudentAssignments] = useState<any[]>([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState({
    studentId: "",
    busId: "",
    routeId: "",
    pickupStopId: "",
    dropStopId: "",
    status: "Active"
  });

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
    fetchStudentAssignments();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/transport/buses");
      const data = await res.json();
      if (data.success && data.data.buses) setBuses(data.data.buses);
    } catch (e) {
      setBuses([
        { _id: "BUS-01", busNumber: "DL 01 AB 4321", capacity: 42, driverName: "Ram Singh", routeName: "Route 1 Dwarka", status: "ACTIVE" },
        { _id: "BUS-02", busNumber: "DL 01 CD 8765", capacity: 38, driverName: "Vikram Jeet", routeName: "Route 2 Vasant Kunj", status: "ACTIVE" }
      ]);
    }
  };

  const fetchDrivers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/admin/drivers");
      const data = await res.json();
      if (data.success && data.data.drivers) setDrivers(data.data.drivers);
    } catch (e) {
      setDrivers([
        { _id: "DRV-101", name: "Ram Singh", empId: "EMP-DRV-101", phone: "+91 98111 22334", licenseNo: "DL-14201100987", licenseExpiry: "2031-12-31", status: "Active" },
        { _id: "DRV-102", name: "Vikram Jeet", empId: "EMP-DRV-102", phone: "+91 98222 33445", licenseNo: "DL-14201100543", licenseExpiry: "2031-12-31", status: "Active" }
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

  const fetchStudentAssignments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/transport/student-assignments");
      const data = await res.json();
      if (data.success && data.data.assignments) {
        setStudentAssignments(data.data.assignments);
      }
    } catch (e) {
      console.error(e);
      setStudentAssignments([]);
    }
  };

  // Bus Handlers
  const handleOpenAddBus = () => {
    setEditingBusId(null);
    setBusForm({
      busNumber: "",
      registrationNo: "",
      busType: "School Bus",
      capacity: 40,
      gpsDeviceId: "",
      driverId: "",
      routeName: "",
      status: "ACTIVE"
    });
    setIsBusModalOpen(true);
  };

  const handleOpenEditBus = (bus: BusRecord) => {
    setEditingBusId(bus._id || bus.id || null);
    setBusForm({
      busNumber: bus.busNumber,
      registrationNo: bus.registrationNo || "",
      busType: bus.busType || "School Bus",
      capacity: bus.capacity,
      gpsDeviceId: bus.gpsDeviceId || "",
      driverId: bus.driverId?._id || bus.driverId || "",
      routeName: bus.routeName || "",
      status: (bus.status?.toUpperCase() || "ACTIVE") as any
    });
    setIsBusModalOpen(true);
  };

  const handleSaveBus = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = !!editingBusId;
      const url = isEdit 
        ? `http://localhost:5000/api/v1/transport/buses/${editingBusId}`
        : "http://localhost:5000/api/v1/transport/buses";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(busForm)
      });
      const data = await res.json();
      if (data.success) {
        alert(isEdit ? "Bus details updated successfully!" : "New bus registered successfully!");
        fetchBuses();
      }
    } catch (err) {
      console.error(err);
      if (editingBusId) {
        setBuses(buses.map(b => (b._id || b.id) === editingBusId ? { ...b, ...busForm } : b));
      } else {
        const created: BusRecord = { _id: `BUS-${Date.now()}`, ...busForm };
        setBuses([...buses, created]);
      }
    }
    setIsBusModalOpen(false);
  };

  const handleDeleteBus = async (id: string) => {
    if (confirm("Are you sure you want to delete this bus registration?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/transport/buses/${id}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (data.success) {
          alert("Bus record removed.");
          fetchBuses();
        }
      } catch (err) {
        setBuses(buses.filter(b => (b._id || b.id) !== id));
        alert("Bus removed.");
      }
    }
  };

  // Driver Handlers
  const handleOpenAddDriver = () => {
    setEditingDriverId(null);
    setDriverForm({
      name: "",
      empId: "",
      phone: "",
      licenseNo: "",
      licenseExpiry: "",
      photo: "",
      assignedBusId: "",
      status: "Active"
    });
    setIsDriverModalOpen(true);
  };

  const handleOpenEditDriver = (d: DriverRecord) => {
    setEditingDriverId(d._id || d.id || null);
    // Format licenseExpiry date properly to YYYY-MM-DD
    const expiryStr = d.licenseExpiry ? new Date(d.licenseExpiry).toISOString().split("T")[0] : "";
    setDriverForm({
      name: d.name,
      empId: d.empId || "",
      phone: d.phone,
      licenseNo: d.licenseNo,
      licenseExpiry: expiryStr,
      photo: d.photo || "",
      assignedBusId: d.assignedBusId?._id || d.assignedBusId || "",
      status: d.status
    });
    setIsDriverModalOpen(true);
  };

  const handleSaveDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = !!editingDriverId;
      const url = isEdit
        ? `http://localhost:5000/api/v1/admin/drivers/${editingDriverId}`
        : "http://localhost:5000/api/v1/admin/drivers";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(driverForm)
      });
      const data = await res.json();
      if (data.success) {
        alert(isEdit ? "Driver details updated!" : "Driver successfully registered!");
        fetchDrivers();
      }
    } catch (err) {
      console.error(err);
      if (editingDriverId) {
        setDrivers(drivers.map(d => (d._id || d.id) === editingDriverId ? { ...d, ...driverForm } : d));
      } else {
        const created: DriverRecord = { _id: `DRV-${Date.now()}`, ...driverForm };
        setDrivers([...drivers, created]);
      }
    }
    setIsDriverModalOpen(false);
  };

  const handleDeleteDriver = async (id: string) => {
    if (confirm("Are you sure you want to resign/remove this pilot driver?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/admin/drivers/${id}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Resigned" })
        });
        const data = await res.json();
        if (data.success) {
          alert("Driver status marked as Resigned.");
          fetchDrivers();
        }
      } catch (err) {
        setDrivers(drivers.filter(d => (d._id || d.id) !== id));
        alert("Driver removed from local state.");
      }
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

  // Student Assignment Handlers
  const handleOpenAssignStudent = () => {
    setAssignmentForm({
      studentId: "",
      busId: "",
      routeId: "",
      pickupStopId: "",
      dropStopId: "",
      status: "Active"
    });
    setIsAssignModalOpen(true);
  };

  const handleSaveStudentAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/v1/transport/student-assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...assignmentForm,
          academicYearId: "650000000000000000000301"
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("Student transport parameters successfully assigned!");
        fetchStudentAssignments();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save student transport mapping.");
    }
    setIsAssignModalOpen(false);
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
                <th>Bus Type</th>
                <th>Seating Capacity</th>
                <th>GPS Device ID</th>
                <th>Assigned Driver</th>
                <th>Mapped Route</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => {
                const driverObj = bus.driverId;
                const driverDispName = driverObj && typeof driverObj === "object" ? driverObj.name : (bus.driverName || "Unassigned Pilot");
                const statusUpper = bus.status?.toUpperCase() || "ACTIVE";
                const badgeClass = statusUpper === "ACTIVE" ? "badge-success" : statusUpper === "MAINTENANCE" ? "badge-warning" : "badge-secondary";

                return (
                  <tr key={bus._id || bus.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{bus.busNumber}</td>
                    <td style={{ fontFamily: "monospace", fontWeight: 700 }}>{bus.registrationNo || bus.busNumber}</td>
                    <td>{bus.busType || "School Bus"}</td>
                    <td style={{ fontWeight: 700 }}>{bus.capacity} Seats</td>
                    <td style={{ fontFamily: "monospace", color: "var(--text-muted)", fontSize: "0.85rem" }}>{bus.gpsDeviceId || "—"}</td>
                    <td>{driverDispName}</td>
                    <td style={{ color: "var(--primary)", fontWeight: 700 }}>{bus.routeName || "Route 1 Dwarka"}</td>
                    <td>
                      <span className={`badge ${badgeClass}`}>
                        {statusUpper}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                        <button onClick={() => handleOpenEditBus(bus)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem" }}><Edit3 size={13} /></button>
                        <button onClick={() => handleDeleteBus(bus._id || bus.id || "")} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
                <th>Employee ID</th>
                <th>License Number</th>
                <th>License Expiry</th>
                <th>Contact Phone</th>
                <th>Assigned Vehicle</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((drv) => {
                const busObj = drv.assignedBusId;
                const busName = busObj && typeof busObj === "object" ? busObj.busNumber : (drv.assignedBus || "—");
                const statusUpper = drv.status?.toUpperCase() || "ACTIVE";
                const badgeClass = statusUpper === "ACTIVE" || statusUpper === "ACTIVE ✅" || statusUpper === "Active" ? "badge-success" : statusUpper === "ONLEAVE" || statusUpper === "OnLeave" ? "badge-warning" : statusUpper === "SUSPENDED" || statusUpper === "Suspended" ? "badge-danger" : "badge-secondary";
                const expiryDisp = drv.licenseExpiry ? new Date(drv.licenseExpiry).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

                return (
                  <tr key={drv._id || drv.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {drv.photo ? (
                          <img src={drv.photo} alt={drv.name} style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: "bold" }}>
                            {drv.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <span>{drv.name}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700 }}>{drv.empId || "—"}</td>
                    <td style={{ fontFamily: "monospace" }}>{drv.licenseNo}</td>
                    <td>{expiryDisp}</td>
                    <td style={{ fontWeight: 700 }}>{drv.phone}</td>
                    <td style={{ color: "var(--primary)", fontWeight: 700 }}>{busName}</td>
                    <td>
                      <span className={`badge ${badgeClass}`}>
                        {drv.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                        <button onClick={() => handleOpenEditDriver(drv)} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem" }}><Edit3 size={13} /></button>
                        <button onClick={() => handleDeleteDriver(drv._id || drv.id || "")} className="btn btn-secondary" style={{ padding: "0.3rem 0.5rem", color: "#ef4444" }}><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
                <th>Route Name &amp; Mapped Stops Order</th>
                <th>Start Terminal Point</th>
                <th>End Destination Point</th>
                <th>Total Distance</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((rt) => (
                <tr key={rt._id || rt.id}>
                  <td style={{ fontWeight: 800, color: "var(--text-heading)", paddingVertical: "1rem" }}>
                    <div style={{ fontSize: "1rem", marginBottom: 6 }}>{rt.routeName}</div>
                    {(rt as any).stops && (rt as any).stops.length > 0 && (
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem", flexWrap: "wrap", marginTop: 4 }}>
                        {(rt as any).stops.map((stop: any, idx: number) => (
                          <React.Fragment key={stop.id || stop._id || idx}>
                            {idx > 0 && <ArrowRight size={11} style={{ color: "var(--text-muted)", opacity: 0.6 }} />}
                            <span style={{ background: "rgba(99,102,241,0.1)", color: "var(--primary)", padding: "2px 8px", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 3, border: "1px solid rgba(99,102,241,0.15)" }}>
                              <span style={{ fontWeight: 800 }}>Stop {stop.sequence || stop.order}</span>: {stop.name || stop.stopName}
                              <span style={{ fontSize: "0.7rem", opacity: 0.75 }}>({stop.pickupTime || stop.scheduledTimeMorning})</span>
                            </span>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </td>
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>Student Mapped Transport Matrix</h3>
            <button onClick={handleOpenAssignStudent} className="btn btn-primary" style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem", gap: "0.35rem" }}>
              <Plus size={15} /> Assign Student Transport
            </button>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class &amp; Section</th>
                <th>Assigned Route</th>
                <th>Assigned Vehicle</th>
                <th>Pickup Stop</th>
                <th>Drop Stop</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {studentAssignments.length > 0 ? (
                studentAssignments.map((map) => {
                  const studentObj = map.studentId;
                  const studentNameDisp = studentObj?.name || "Rahul Kumar";
                  const classDisp = studentObj ? `${studentObj.class || "8"}-${studentObj.section || "A"}` : "8-A";
                  const routeDisp = map.routeId?.routeName || "—";
                  const busDisp = map.busId?.busNumber || "—";
                  const pickupDisp = map.pickupStopId?.stopName || "—";
                  const dropDisp = map.dropStopId?.stopName || "—";
                  const statusLabel = map.status || "Active";
                  const badgeClass = statusLabel === "Active" ? "badge-success" : statusLabel === "Suspended" ? "badge-warning" : "badge-secondary";

                  return (
                    <tr key={map._id || map.id}>
                      <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{studentNameDisp}</td>
                      <td style={{ fontWeight: 600 }}>Class {classDisp}</td>
                      <td>{routeDisp}</td>
                      <td style={{ fontWeight: 700 }}>{busDisp}</td>
                      <td style={{ color: "var(--primary)", fontWeight: 700 }}>{pickupDisp}</td>
                      <td style={{ color: "var(--success)", fontWeight: 700 }}>{dropDisp}</td>
                      <td>
                        <span className={`badge ${badgeClass}`}>
                          {statusLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                studentMappings.map((map) => (
                  <tr key={map.id}>
                    <td style={{ fontWeight: 800, color: "var(--text-heading)" }}>{map.studentName}</td>
                    <td style={{ fontWeight: 600 }}>Class {map.class}</td>
                    <td>{map.route}</td>
                    <td style={{ fontWeight: 700 }}>{map.bus}</td>
                    <td style={{ color: "var(--primary)", fontWeight: 700 }}>{map.stop}</td>
                    <td style={{ color: "var(--success)", fontWeight: 700 }}>{map.stop}</td>
                    <td><span className="badge badge-success">Active</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ════════════ 7. LIVE GPS MAP ════════════ */}
      {activeTab === "live" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Telemetry Stats Panel */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            {[
              { label: "Active Buses", val: 8, color: "#10b981", desc: "Registered fleet on route" },
              { label: "On Trip", val: 5, color: "#3b82f6", desc: "Broadcasting live tracking data" },
              { label: "Idle", val: 2, color: "#f59e0b", desc: "Parked at school yard" },
              { label: "Offline", val: 1, color: "#ef4444", desc: "No signal/Maintenance" }
            ].map((stat, idx) => (
              <div key={idx} className="glass-card" style={{ padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800 }}>{stat.label.toUpperCase()}</span>
                  <strong style={{ fontSize: "1.8rem", color: stat.color, display: "block", marginTop: 2 }}>{stat.val}</strong>
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", maxWidth: "50%", textAlign: "right" }}>{stat.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "1.5rem" }}>
            {/* Interactive Vector Map Grid */}
            <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-heading)", margin: 0 }}>Active Fleet Location Tracker</h3>
              
              <div style={{ width: "100%", height: 380, background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 12, position: "relative", overflow: "hidden" }}>
                {/* Simulated Map Background Grid Lines */}
                <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, opacity: 0.1 }}>
                  <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#fff" strokeWidth="1.5" />
                  <line x1="40%" y1="0" x2="40%" y2="100%" stroke="#fff" strokeWidth="1.5" />
                  <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#fff" strokeWidth="1.5" />
                  <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#fff" strokeWidth="1.5" />
                  <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#fff" strokeWidth="1.5" />
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#fff" strokeWidth="1.5" />
                  <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#fff" strokeWidth="1.5" />
                  <path d="M 50,50 Q 150,200 350,150 T 600,300" fill="none" stroke="var(--primary)" strokeWidth="3" strokeDasharray="6,6" opacity="0.3" />
                </svg>

                {/* Bus 01 Pin - Active (Moving/Live update) */}
                {(() => {
                  const b01 = fleet.find(b => b.id === "Bus 01");
                  const isSelected = selectedBusId === "Bus 01";
                  return (
                    <button
                      onClick={() => setSelectedBusId("Bus 01")}
                      style={{
                        position: "absolute",
                        top: "35%",
                        left: "40%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        zIndex: isSelected ? 10 : 2
                      }}
                    >
                      <div style={{ padding: "0.25rem 0.5rem", background: isSelected ? "var(--primary)" : "var(--bg-card)", border: "1.5px solid var(--success)", borderRadius: 6, color: isSelected ? "#fff" : "var(--text-heading)", fontSize: "0.68rem", fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                        Bus 01 {isSelected && `(${b01?.speed} km/h)`}
                      </div>
                      <Bus size={isSelected ? 28 : 24} color={isSelected ? "var(--primary)" : "#10b981"} style={{ filter: isSelected ? "drop-shadow(0 0 10px var(--primary))" : "none" }} />
                    </button>
                  );
                })()}

                {/* Bus 02 Pin - Active */}
                {(() => {
                  const isSelected = selectedBusId === "Bus 02";
                  return (
                    <button
                      onClick={() => setSelectedBusId("Bus 02")}
                      style={{
                        position: "absolute",
                        top: "58%",
                        left: "22%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        zIndex: isSelected ? 10 : 2
                      }}
                    >
                      <div style={{ padding: "0.25rem 0.5rem", background: isSelected ? "var(--primary)" : "var(--bg-card)", border: "1.5px solid var(--success)", borderRadius: 6, color: isSelected ? "#fff" : "var(--text-heading)", fontSize: "0.68rem", fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                        Bus 02
                      </div>
                      <Bus size={isSelected ? 28 : 24} color={isSelected ? "var(--primary)" : "#10b981"} />
                    </button>
                  );
                })()}

                {/* Bus 03 Pin - Idle */}
                {(() => {
                  const isSelected = selectedBusId === "Bus 03";
                  return (
                    <button
                      onClick={() => setSelectedBusId("Bus 03")}
                      style={{
                        position: "absolute",
                        top: "20%",
                        left: "72%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        zIndex: isSelected ? 10 : 2
                      }}
                    >
                      <div style={{ padding: "0.25rem 0.5rem", background: isSelected ? "var(--primary)" : "var(--bg-card)", border: "1.5px solid var(--warning)", borderRadius: 6, color: isSelected ? "#fff" : "var(--text-heading)", fontSize: "0.68rem", fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
                        Bus 03
                      </div>
                      <Bus size={isSelected ? 28 : 24} color={isSelected ? "var(--primary)" : "#f59e0b"} />
                    </button>
                  );
                })()}

                {/* Bus 04 Pin - Offline */}
                {(() => {
                  const isSelected = selectedBusId === "Bus 04";
                  return (
                    <button
                      onClick={() => setSelectedBusId("Bus 04")}
                      style={{
                        position: "absolute",
                        top: "65%",
                        left: "75%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        zIndex: isSelected ? 10 : 2
                      }}
                    >
                      <div style={{ padding: "0.25rem 0.5rem", background: isSelected ? "var(--primary)" : "var(--bg-card)", border: "1.5px solid var(--danger)", borderRadius: 6, color: isSelected ? "#fff" : "var(--text-heading)", fontSize: "0.68rem", fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                        Bus 04
                      </div>
                      <Bus size={isSelected ? 28 : 24} color={isSelected ? "var(--primary)" : "#ef4444"} />
                    </button>
                  );
                })()}
              </div>
            </div>

            {/* Sidebar detail card of selected bus */}
            {(() => {
              const selectedBus = fleet.find(b => b.id === selectedBusId) || fleet[0];
              const statusColor = selectedBus.status === "ACTIVE" 
                ? (selectedBus.tripStatus === "IN_PROGRESS" || selectedBus.tripStatus === "STARTED" ? "#10b981" : "#f59e0b")
                : "#ef4444";
              const statusLabel = selectedBus.status === "ACTIVE"
                ? (selectedBus.tripStatus === "IN_PROGRESS" || selectedBus.tripStatus === "STARTED" ? "ON TRIP" : "IDLE")
                : "OFFLINE";

              return (
                <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--text-heading)", margin: 0 }}>{selectedBus.busNumber} Details</h3>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "monospace" }}>Plate: {selectedBus.registrationNo}</span>
                    </div>
                    <span className="badge" style={{ backgroundColor: `${statusColor}22`, color: statusColor, border: `1px solid ${statusColor}44`, fontWeight: 800, padding: "0.35rem 0.75rem", borderRadius: 8 }}>
                      {statusLabel}
                    </span>
                  </div>

                  {/* Telemetry metadata */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div style={{ background: "var(--bg-input)", padding: "0.75rem", borderRadius: 8 }}>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700, display: "block" }}>CURRENT LOCATION</span>
                      <strong style={{ fontSize: "0.8rem", color: "var(--text-heading)", marginTop: 2, display: "block" }}>
                        {selectedBus.latitude.toFixed(5)}° N, {selectedBus.longitude.toFixed(5)}° E
                      </strong>
                    </div>

                    <div style={{ background: "var(--bg-input)", padding: "0.75rem", borderRadius: 8 }}>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700, display: "block" }}>LAST GPS UPDATE</span>
                      <strong style={{ fontSize: "0.8rem", color: "var(--text-heading)", marginTop: 2, display: "block" }}>
                        {selectedBus.lastUpdated}
                      </strong>
                    </div>

                    <div style={{ background: "var(--bg-input)", padding: "0.75rem", borderRadius: 8 }}>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700, display: "block" }}>SPEED / HEADING</span>
                      <strong style={{ fontSize: "0.8rem", color: "var(--text-heading)", marginTop: 2, display: "block" }}>
                        {selectedBus.speed} km/h &bull; {selectedBus.heading}°
                      </strong>
                    </div>

                    <div style={{ background: "var(--bg-input)", padding: "0.75rem", borderRadius: 8 }}>
                      <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700, display: "block" }}>TRIP STATUS</span>
                      <strong style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 800, marginTop: 2, display: "block" }}>
                        {selectedBus.tripStatus}
                      </strong>
                    </div>
                  </div>

                  {/* Driver Registry */}
                  <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800, display: "block", marginBottom: 8 }}>PILOT DRIVER</span>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <strong style={{ color: "var(--text-heading)", fontSize: "0.9rem", display: "block" }}>{selectedBus.driver.name}</strong>
                        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>ID: {selectedBus.driver.empId} &bull; Lic: {selectedBus.driver.license}</span>
                      </div>
                      <a href={`tel:${selectedBus.driver.phone}`} style={{ padding: "0.45rem", background: "rgba(16, 185, 129, 0.15)", borderRadius: "50%", color: "#10b981" }}>
                        <Phone size={16} />
                      </a>
                    </div>
                  </div>

                  {/* Mapped Stops Order Route */}
                  <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800, display: "block", marginBottom: 8 }}>ROUTE STOP SEQUENCE</span>
                    <strong style={{ color: "var(--text-heading)", fontSize: "0.85rem", display: "block", marginBottom: 6 }}>{selectedBus.route.name}</strong>
                    <div style={{ display: "flex", gap: "0.35rem", overflowX: "auto", paddingBottom: 4 }}>
                      {selectedBus.route.stops.map((stop, idx) => (
                        <div key={idx} style={{ padding: "0.3rem 0.6rem", background: "var(--bg-input)", borderRadius: 6, border: "1px solid var(--border-color)", fontSize: "0.72rem", whiteSpace: "nowrap", color: "var(--text-heading)" }}>
                          {idx + 1}. {stop}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mapped Student Assignments */}
                  <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 800, display: "block", marginBottom: 8 }}>ASSIGNED STUDENTS ({selectedBus.students.length})</span>
                    {selectedBus.students.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "150px", overflowY: "auto" }}>
                        {selectedBus.students.map((student, idx) => (
                          <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.45rem 0.75rem", background: "var(--bg-input)", borderRadius: 8 }}>
                            <strong style={{ fontSize: "0.8rem", color: "var(--text-heading)" }}>{student.name}</strong>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Class {student.class} &bull; Stop: {student.stop}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>No students assigned to this Karol Bagh route.</span>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}" }}>{b.busNumber}</strong>
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
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>BUS ID / NAME (e.g. Bus #05)</label>
                  <input type="text" value={busForm.busNumber} onChange={(e) => setBusForm({ ...busForm, busNumber: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>REGISTRATION NUMBER</label>
                  <input type="text" value={busForm.registrationNo} onChange={(e) => setBusForm({ ...busForm, registrationNo: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} placeholder="e.g. DL 01 AB 4321" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>BUS TYPE</label>
                  <select value={busForm.busType} onChange={(e) => setBusForm({ ...busForm, busType: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="School Bus">School Bus</option>
                    <option value="Mini Bus">Mini Bus</option>
                    <option value="Van">Van</option>
                    <option value="SUV">SUV</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SEATING CAPACITY</label>
                  <input type="number" value={busForm.capacity} onChange={(e) => setBusForm({ ...busForm, capacity: Number(e.target.value) })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>GPS DEVICE ID</label>
                  <input type="text" value={busForm.gpsDeviceId} onChange={(e) => setBusForm({ ...busForm, gpsDeviceId: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} placeholder="e.g. GPS-TRK-101" />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STATUS</label>
                  <select value={busForm.status} onChange={(e) => setBusForm({ ...busForm, status: e.target.value as any })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ASSIGN PILOT DRIVER</label>
                <select value={busForm.driverId} onChange={(e) => setBusForm({ ...busForm, driverId: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  <option value="">Unassigned Pilot</option>
                  {drivers.map((drv) => (
                    <option key={drv._id || drv.id} value={drv._id || drv.id}>
                      {drv.name} ({drv.phone})
                    </option>
                  ))}
                </select>
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
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DRIVER FULL NAME</label>
                  <input type="text" value={driverForm.name} onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>EMPLOYEE ID</label>
                  <input type="text" value={driverForm.empId} onChange={(e) => setDriverForm({ ...driverForm, empId: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} placeholder="e.g. EMP-DRV-101" />
                </div>
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>LICENSE EXPIRY DATE</label>
                  <input type="date" value={driverForm.licenseExpiry} onChange={(e) => setDriverForm({ ...driverForm, licenseExpiry: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>STATUS</label>
                  <select value={driverForm.status} onChange={(e) => setDriverForm({ ...driverForm, status: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="Active">Active</option>
                    <option value="OnLeave">On Leave</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Resigned">Resigned</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ASSIGNED VEHICLE</label>
                  <select value={driverForm.assignedBusId} onChange={(e) => setDriverForm({ ...driverForm, assignedBusId: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="">Unassigned</option>
                    {buses.map(b => (
                      <option key={b._id || b.id} value={b._id || b.id}>{b.busNumber} ({b.registrationNo || b.busNumber})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PHOTO PATH / URL</label>
                  <input type="text" value={driverForm.photo} onChange={(e) => setDriverForm({ ...driverForm, photo: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }} placeholder="e.g. /images/drv1.jpg" />
                </div>
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
      {/* ════════════ ASSIGN STUDENT TRANSPORT MODAL ════════════ */}
      {isAssignModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass-card" style={{ width: "100%", maxWidth: "480px", padding: "1.75rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-heading)" }}>
                Assign Student Transport
              </h3>
              <button onClick={() => setIsAssignModalOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveStudentAssignment} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SELECT STUDENT</label>
                <select value={assignmentForm.studentId} onChange={(e) => setAssignmentForm({ ...assignmentForm, studentId: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  <option value="">Choose Student...</option>
                  {MOCK_STUDENTS.map(s => (
                    <option key={s.id} value={s.id}>{s.name} (Class {s.class}-{s.section})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SELECT ROUTE</label>
                  <select value={assignmentForm.routeId} onChange={(e) => setAssignmentForm({ ...assignmentForm, routeId: e.target.value })} required style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="">Choose Route...</option>
                    {routes.map(r => (
                      <option key={r._id || r.id} value={r._id || r.id}>{r.routeName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>SELECT VEHICLE</label>
                  <select value={assignmentForm.busId} onChange={(e) => setAssignmentForm({ ...assignmentForm, busId: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="">Choose Vehicle...</option>
                    {buses.map(b => (
                      <option key={b._id || b.id} value={b._id || b.id}>{b.busNumber} ({b.registrationNo || b.busNumber})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>PICKUP STOP</label>
                  <select value={assignmentForm.pickupStopId} onChange={(e) => setAssignmentForm({ ...assignmentForm, pickupStopId: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="">Choose Pickup...</option>
                    {(routes.find(r => (r._id || r.id) === assignmentForm.routeId) as any)?.stops?.map((stop: any) => (
                      <option key={stop.id || stop._id} value={stop.id || stop._id}>{stop.name || stop.stopName} ({stop.pickupTime})</option>
                    )) || stops.map(stop => (
                      <option key={stop.id} value={stop.id}>{stop.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>DROP STOP</label>
                  <select value={assignmentForm.dropStopId} onChange={(e) => setAssignmentForm({ ...assignmentForm, dropStopId: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                    <option value="">Choose Drop...</option>
                    {(routes.find(r => (r._id || r.id) === assignmentForm.routeId) as any)?.stops?.map((stop: any) => (
                      <option key={stop.id || stop._id} value={stop.id || stop._id}>{stop.name || stop.stopName} ({stop.dropTime})</option>
                    )) || stops.map(stop => (
                      <option key={stop.id} value={stop.id}>{stop.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ASSIGNMENT STATUS</label>
                <select value={assignmentForm.status} onChange={(e) => setAssignmentForm({ ...assignmentForm, status: e.target.value })} style={{ width: "100%", padding: "0.65rem 0.85rem", background: "var(--bg-input)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-main)" }}>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setIsAssignModalOpen(false)} className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Assign Transport</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
