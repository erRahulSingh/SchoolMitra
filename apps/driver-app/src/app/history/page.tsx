"use client";

import React from "react";
import { 
  Clock, Navigation, Users, Calendar, MapPin, 
  CheckCircle2, ArrowRight, ShieldCheck, FileText 
} from "lucide-react";

export default function TripHistoryPage() {
  const pastTrips = [
    {
      id: "t1",
      date: "28 July 2026",
      type: "Morning Pickup",
      route: "Route 1 - Dwarka Sector 12 Express",
      distance: "14.2 km",
      students: 42,
      startTime: "07:10 AM",
      endTime: "07:55 AM",
      status: "Completed ✅"
    },
    {
      id: "t2",
      date: "28 July 2026",
      type: "Afternoon Return",
      route: "Route 1 - Dwarka Sector 12 Express",
      distance: "14.8 km",
      students: 40,
      startTime: "02:15 PM",
      endTime: "03:02 PM",
      status: "Completed ✅"
    },
    {
      id: "t3",
      date: "27 July 2026",
      type: "Morning Pickup",
      route: "Route 1 - Dwarka Sector 12 Express",
      distance: "14.2 km",
      students: 41,
      startTime: "07:12 AM",
      endTime: "07:52 AM",
      status: "Completed ✅"
    },
    {
      id: "t4",
      date: "27 July 2026",
      type: "Afternoon Return",
      route: "Route 1 - Dwarka Sector 12 Express",
      distance: "14.5 km",
      students: 42,
      startTime: "02:10 PM",
      endTime: "02:58 PM",
      status: "Completed ✅"
    }
  ];

  return (
    <div style={{
      padding: "1.25rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem",
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900 }} className="text-title">Trip History Log</h2>
          <p style={{ fontSize: "0.75rem", marginTop: 2 }} className="text-muted-custom">Past Completed Routes & Kilometers Logged</p>
        </div>

        <span style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", color: "#059669", padding: "0.3rem 0.65rem", borderRadius: 99, fontSize: "0.72rem", fontWeight: 800 }}>
          4 Trips Logged
        </span>
      </div>

      {/* PAST TRIPS LIST CARDS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {pastTrips.map((trip) => (
          <div key={trip.id} className="card-ui" style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem"
          }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.78rem", color: "#059669", fontWeight: 800 }}>
                <Calendar size={14} /> {trip.date} • {trip.type}
              </div>

              <span style={{ background: "rgba(16, 185, 129, 0.15)", color: "#059669", padding: "0.2rem 0.55rem", borderRadius: 8, fontSize: "0.68rem", fontWeight: 800 }}>
                {trip.status}
              </span>
            </div>

            <div style={{ fontSize: "0.92rem", fontWeight: 900 }} className="text-title">
              {trip.route}
            </div>

            <div className="subbox-ui" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", padding: "0.65rem" }}>
              <div>
                <div style={{ fontSize: "0.65rem" }} className="text-muted-custom">DISTANCE</div>
                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0284c7", marginTop: 1 }}>{trip.distance}</div>
              </div>

              <div>
                <div style={{ fontSize: "0.65rem" }} className="text-muted-custom">STUDENTS</div>
                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#8b5cf6", marginTop: 1 }}>{trip.students} Boarded</div>
              </div>

              <div>
                <div style={{ fontSize: "0.65rem" }} className="text-muted-custom">DURATION</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#d97706", marginTop: 1 }}>{trip.startTime} - {trip.endTime}</div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
