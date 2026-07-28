"use client";

import React from "react";
import { 
  Bus, ShieldCheck, Fuel, Calendar, Wrench, PhoneCall, 
  Award, AlertTriangle, FileText, CheckCircle2, Phone 
} from "lucide-react";

export default function MyBusPage() {
  const busDetails = {
    busNumber: "Bus #01",
    vehicleNumber: "DL 01 AB 4321",
    busModel: "Tata Starbus Ultra (2024 BS6 Diesel)",
    capacity: "42 Passengers + 2 Staff",
    insurancePolicy: "HDFC ERGO #POL-99401221",
    insuranceExpiry: "15 Nov 2027 (Active ✅)",
    fitnessExpiry: "28 March 2028 (RTO Certified ✅)",
    fuelLevel: 78,
    fuelLiters: "93.6 L / 120 L Tank",
    emergencyContact: "+91 11 2345 6789",
    safetyOfficer: "+91 98111 00099"
  };

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* HEADER BANNER */}
      <div className="banner-card" style={{
        padding: "1.1rem 1.25rem",
        display: "flex",
        justify: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div style={{
            width: 48, height: 48, borderRadius: 16,
            background: "linear-gradient(135deg, #10b981, #059669)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)"
          }}>
            <Bus size={26} />
          </div>
          <div>
            <div style={{ fontSize: "1.15rem", fontWeight: 900 }} className="text-title">{busDetails.busNumber}</div>
            <div style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 800, marginTop: 1 }}>{busDetails.vehicleNumber}</div>
          </div>
        </div>

        <span style={{
          background: "rgba(16, 185, 129, 0.2)", border: "1px solid rgba(16, 185, 129, 0.4)",
          color: "#059669", padding: "0.3rem 0.65rem", borderRadius: 99,
          fontSize: "0.72rem", fontWeight: 800
        }}>
          RTO PASSED
        </span>
      </div>

      {/* SECTION 1: SPECIFICATIONS GRID */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        <div style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }} className="text-muted-custom">
          Vehicle Specifications
        </div>

        <div className="card-ui" style={{ padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.78rem" }} className="text-muted-custom">Bus Model</span>
          <strong style={{ fontSize: "0.85rem" }} className="text-title">{busDetails.busModel}</strong>
        </div>

        <div className="card-ui" style={{ padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.78rem" }} className="text-muted-custom">Seating Capacity</span>
          <strong style={{ fontSize: "0.85rem", color: "#0284c7" }}>{busDetails.capacity}</strong>
        </div>
      </div>

      {/* SECTION 2: FUEL STATUS METER */}
      <div className="card-ui" style={{ padding: "1.1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Fuel size={18} color="#d97706" />
            <span style={{ fontSize: "0.85rem", fontWeight: 800 }} className="text-title">Fuel Level Status</span>
          </div>
          <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "#d97706" }}>{busDetails.fuelLevel}%</span>
        </div>

        {/* Meter Progress Bar */}
        <div style={{ width: "100%", height: 10, background: "rgba(100, 116, 139, 0.12)", borderRadius: 99, overflow: "hidden", marginBottom: "0.45rem" }}>
          <div style={{ width: `${busDetails.fuelLevel}%`, height: "100%", background: "linear-gradient(90deg, #f59e0b, #10b981)", borderRadius: 99 }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", fontWeight: 700 }} className="text-muted-custom">
          <span>Tank Capacity: 120 L</span>
          <span style={{ color: "#059669" }}>Available: {busDetails.fuelLiters}</span>
        </div>
      </div>

      {/* SECTION 3: LEGAL COMPLIANCE & EXPIRIES */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        <div style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }} className="text-muted-custom">
          Insurance & RTO Fitness
        </div>

        <div className="card-ui" style={{ padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.72rem" }} className="text-muted-custom">Commercial Insurance</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 800, marginTop: 2 }} className="text-title">{busDetails.insurancePolicy}</div>
          </div>
          <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 800 }}>{busDetails.insuranceExpiry}</span>
        </div>

        <div className="card-ui" style={{ padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.72rem" }} className="text-muted-custom">RTO Fitness Certificate</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 800, marginTop: 2 }} className="text-title">Delhi RTO Approved</div>
          </div>
          <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 800 }}>{busDetails.fitnessExpiry}</span>
        </div>
      </div>

      {/* SECTION 4: EMERGENCY CONTACTS */}
      <div style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.25)", borderRadius: 18, padding: "1.1rem" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#dc2626", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <PhoneCall size={18} /> Emergency Control Hotlines
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem" }}>
            <span className="text-muted-custom">Transport Control Room:</span>
            <strong style={{ color: "#0284c7" }}>{busDetails.emergencyContact}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem" }}>
            <span className="text-muted-custom">School Safety Officer:</span>
            <strong style={{ color: "#0284c7" }}>{busDetails.safetyOfficer}</strong>
          </div>
        </div>
      </div>

    </div>
  );
}
