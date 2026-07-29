// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Real-Time Telemetry & Socket.IO Engine
// ═══════════════════════════════════════════════════════════

import { Server as SocketIOServer, Socket } from "socket.io";
import logger from "../utils/logger";

export interface GPSLocationUpdatePayload {
  busId: string;
  routeId: string;
  latitude: number;
  longitude: number;
  speed: number; // in km/h
  currentStop?: string;
  nextStop?: string;
  distanceToNextStopMeters?: number;
  etaMinutes?: number;
  status?: "ON_ROUTE" | "ARRIVED" | "DELAYED" | "IDLE";
}

// ──────────── Dynamic ETA Calculation Helper ────────────
export function calculateDynamicETA(speedKmH: number, distanceMeters: number): string {
  if (!distanceMeters || distanceMeters <= 50) return "Arriving now";
  if (speedKmH <= 3) {
    const mins = Math.ceil((distanceMeters / 1000) / 0.1); // slow crawl calculation
    return `${Math.min(mins, 15)} mins (traffic)`;
  }
  const hours = (distanceMeters / 1000) / speedKmH;
  const minutes = Math.max(1, Math.round(hours * 60));
  return `${minutes} min${minutes > 1 ? "s" : ""}`;
}

export const initSocketServer = (io: SocketIOServer) => {
  logger.info("[Socket.IO] Real-Time Telemetry & Notification Engine initialized.");

  io.on("connection", (socket: Socket) => {
    logger.info(`[Socket.IO] Client connected: ${socket.id}`);

    // ──────────── 1. ROOM SUBSCRIPTIONS ────────────
    socket.on("bus:join_room", (data: { routeId?: string; busId?: string }) => {
      const room = data.routeId ? `route:${data.routeId}` : `bus:${data.busId}`;
      socket.join(room);
      logger.info(`[Socket.IO] Socket ${socket.id} subscribed to room ${room}`);
    });

    socket.on("parent:subscribe", (data: { parentId: string }) => {
      const room = `parent:${data.parentId}`;
      socket.join(room);
      logger.info(`[Socket.IO] Parent Socket ${socket.id} subscribed to ${room}`);
    });

    // ──────────── 2. DRIVER LIVE GPS LOCATION BROADCAST ────────────
    socket.on("driver:location_update", (data: GPSLocationUpdatePayload) => {
      const calculatedEta = data.etaMinutes
        ? `${data.etaMinutes} mins`
        : calculateDynamicETA(data.speed || 35, data.distanceToNextStopMeters || 1800);

      const enrichedPayload = {
        ...data,
        eta: calculatedEta,
        timestamp: new Date().toISOString(),
      };

      // Broadcast to parents subscribed to this route or bus
      if (data.routeId) {
        io.to(`route:${data.routeId}`).emit("bus:location_changed", enrichedPayload);
      }
      if (data.busId) {
        io.to(`bus:${data.busId}`).emit("bus:location_changed", enrichedPayload);
      }

      // Broadcast to School Admin & Super Admin telemetry dashboards
      io.emit("admin:bus_location_update", enrichedPayload);
    });

    // ──────────── 3. BUS STATUS UPDATES (ON_ROUTE, ARRIVED, DELAYED) ────────────
    socket.on("driver:status_changed", (data: { busId: string; status: string; stopName?: string; delayMins?: number }) => {
      logger.info(`[Socket.IO] Bus ${data.busId} status changed to ${data.status}`);
      
      const payload = {
        ...data,
        timestamp: new Date().toISOString(),
        message: data.status === "DELAYED"
          ? `Bus ${data.busId} delayed by ${data.delayMins || 10} mins due to traffic.`
          : `Bus ${data.busId} status is now ${data.status}.`
      };

      io.emit("bus:status_changed", payload);
      io.emit("admin:bus_status_changed", payload);
    });

    // ──────────── 4. EMERGENCY SOS BROADCAST ────────────
    socket.on("driver:sos_alert", (data: { busId: string; driverName: string; location: string }) => {
      logger.error(`[SOS ALERT] Emergency broadcast from Bus ${data.busId} by ${data.driverName}`);
      
      const sosPayload = {
        ...data,
        timestamp: new Date().toISOString(),
        message: `🚨 EMERGENCY SOS ALERT: Bus ${data.busId} reported an emergency at ${data.location || "Route Location"}. Control room notified.`
      };

      io.emit("alert:emergency_sos", sosPayload);
      io.emit("parent:live_notification", sosPayload);
    });

    // ──────────── 5. STUDENT RFID BOARDING / DROP NOTIFICATIONS ────────────
    socket.on("driver:student_status_changed", (data: { studentId: string; studentName: string; parentId?: string; status: string; timestamp: string }) => {
      const payload = {
        ...data,
        timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        notificationText: `🚌 ${data.studentName} was marked as ${data.status.toUpperCase()} at ${data.timestamp || "now"}.`
      };

      if (data.parentId) {
        io.to(`parent:${data.parentId}`).emit("parent:student_status_update", payload);
      }

      // Broadcast globally for live parent feeds
      io.emit("parent:student_status_update", payload);
      io.emit("parent:live_notification", {
        title: "Student Transport Update",
        body: payload.notificationText,
        ...payload
      });
    });

    socket.on("disconnect", () => {
      logger.info(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
};
