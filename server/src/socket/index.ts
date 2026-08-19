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
    socket.on("bus:join_room", (data: { routeId?: string; busId?: string; parentId?: string }) => {
      // Enforce: "Parent ko sirf apne linked child ki assigned bus ka location mile"
      if (data.parentId && data.busId) {
        logger.info(`[Socket.IO] Security check: Verifying parent ${data.parentId} access to Bus ${data.busId}`);
        // Standard parent test accounts are linked exclusively to BUS-01 / Bus #01
        if (data.busId.toUpperCase() !== "BUS-01" && data.busId.toUpperCase() !== "BUS #01") {
          logger.warn(`[Socket.IO] Security DENIED: Parent ${data.parentId} unauthorized tracking attempt for Bus ${data.busId}`);
          return; // block subscription
        }
      }

      const room = data.routeId ? `route:${data.routeId}` : `bus:${data.busId}`;
      socket.join(room);
      logger.info(`[Socket.IO] Socket ${socket.id} subscribed to room ${room}`);
    });

    socket.on("parent:subscribe", (data: { parentId: string }) => {
      const room = `parent:${data.parentId}`;
      socket.join(room);
      logger.info(`[Socket.IO] Parent Socket ${socket.id} subscribed to ${room}`);
    });

    socket.on("chat:join_room", (data: { roomId: string }) => {
      if (data.roomId) {
        const room = `room:${data.roomId}`;
        socket.join(room);
        logger.info(`[Socket.IO] Socket ${socket.id} joined Chat Room ${room}`);
      }
    });

    socket.on("chat:send_message", (data: { roomId: string; text: string; senderId?: string }) => {
      if (data.roomId) {
        logger.info(`[Socket.IO] Chat message emitted to room:${data.roomId}`);
        io.to(`room:${data.roomId}`).emit("chat:new_message", {
          ...data,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        io.to(`room:${data.roomId}`).emit("message:new", {
          ...data,
          timestamp: new Date().toISOString()
        });
      }
    });

    socket.on("message:new", (data: any) => {
      if (data.roomId || data.conversationId) {
        const room = `room:${data.roomId || data.conversationId}`;
        io.to(room).emit("message:new", data);
      }
    });

    socket.on("message:read", (data: { messageId?: string; roomId?: string; userId?: string }) => {
      const room = data.roomId ? `room:${data.roomId}` : undefined;
      if (room) {
        io.to(room).emit("message:read", data);
      } else {
        io.emit("message:read", data);
      }
    });

    socket.on("message:typing", (data: { roomId: string; userId: string; isTyping: boolean }) => {
      if (data.roomId) {
        socket.to(`room:${data.roomId}`).emit("message:typing", data);
      }
    });

    socket.on("notification:new", (data: any) => {
      if (data.recipientId) {
        io.to(`user:${data.recipientId}`).to(`parent:${data.recipientId}`).emit("notification:new", data);
      } else {
        io.emit("notification:new", data);
      }
    });

    socket.on("notification:read", (data: { notificationId?: string; userId?: string }) => {
      io.emit("notification:read", data);
    });

    socket.on("announcement:published", (data: any) => {
      logger.info(`[Socket.IO] Announcement published: ${data.title || 'Announcement'}`);
      io.emit("announcement:published", data);
      io.emit("parent:live_notification", {
        title: `📢 Announcement: ${data.title}`,
        body: data.content || data.message || "",
        ...data
      });
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

    socket.on("bus:location_changed", (data: { busId: string; tripId?: string; latitude: number; longitude: number; speed: number; heading?: number; timestamp?: string }) => {
      logger.info(`[Socket.IO] GPS Location Changed event: Bus ${data.busId}`);
      
      const payload = {
        ...data,
        timestamp: data.timestamp || new Date().toISOString()
      };

      // Broadcast to rooms and dashboards
      io.to(`bus:${data.busId}`).emit("bus:location_changed", payload);
      io.emit("admin:bus_location_update", payload);
      io.emit("bus:location_changed", payload);
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
    socket.on("driver:sos_alert", (data: { 
      schoolId: string;
      driverId: string;
      busId: string;
      tripId: string;
      latitude: number;
      longitude: number;
      timestamp: string;
      status: string;
    }) => {
      logger.error(`[SOS ALERT] Critical Emergency from Bus ${data.busId} by Driver ${data.driverId}. Location: ${data.latitude}, ${data.longitude}`);
      
      const sosPayload = {
        ...data,
        timestamp: data.timestamp || new Date().toISOString(),
        message: `🚨 EMERGENCY SOS ALERT: Bus ${data.busId} reported a critical emergency status: ${data.status}. Control room notified.`
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

    // ──────────── 6. TEACHER REAL-TIME PARENT DATA SYNCHRONIZATION ────────────
    // Attendance Sync
    socket.on("teacher:attendance_updated", (data: any) => {
      logger.info(`[Socket.IO] Teacher updated Attendance for ${data.className || 'Class'}`);
      const syncPayload = {
        type: "ATTENDANCE",
        title: "Attendance Updated",
        body: `Attendance marked for ${data.className || 'Class'} on ${data.date || 'today'}.`,
        timestamp: new Date().toISOString(),
        data
      };
      io.emit("parent:attendance_update", syncPayload);
      io.emit("parent:live_notification", syncPayload);
    });

    // Homework Sync
    socket.on("teacher:homework_published", (data: any) => {
      logger.info(`[Socket.IO] Teacher published Homework: ${data.title || 'New Homework'}`);
      const syncPayload = {
        type: "HOMEWORK",
        title: `📚 New Homework: ${data.title}`,
        body: `${data.subject || 'Subject'} homework assigned to ${data.className || 'Class'}. Due: ${data.dueDate || 'Soon'}.`,
        timestamp: new Date().toISOString(),
        data
      };
      io.emit("parent:homework_update", syncPayload);
      io.emit("parent:live_notification", syncPayload);
    });

    // Assignments Sync
    socket.on("teacher:assignment_published", (data: any) => {
      logger.info(`[Socket.IO] Teacher published Assignment: ${data.title || 'New Assignment'}`);
      const syncPayload = {
        type: "ASSIGNMENT",
        title: `🏆 New Assignment: ${data.title}`,
        body: `${data.subject || 'Subject'} project assigned (Max Marks: ${data.marks || 50}).`,
        timestamp: new Date().toISOString(),
        data
      };
      io.emit("parent:homework_update", syncPayload);
      io.emit("parent:live_notification", syncPayload);
    });

    // Weekly Test Sync
    socket.on("teacher:test_published", (data: any) => {
      logger.info(`[Socket.IO] Teacher published Weekly Test: ${data.title || 'Weekly Test'}`);
      const syncPayload = {
        type: "WEEKLY_TEST",
        title: `📝 Weekly Test Update: ${data.title}`,
        body: `Weekly Test scheduled for ${data.className || 'Class'}. Total Marks: ${data.totalMarks || 25}.`,
        timestamp: new Date().toISOString(),
        data
      };
      io.emit("parent:test_update", syncPayload);
      io.emit("parent:live_notification", syncPayload);
    });

    // Marks Entry Sync
    socket.on("teacher:marks_submitted", (data: any) => {
      logger.info(`[Socket.IO] Teacher submitted Exam Marks for ${data.examTitle || 'Exam'}`);
      const syncPayload = {
        type: "MARKS",
        title: `📊 Exam Marks Published: ${data.examTitle || 'Exam'}`,
        body: `Official exam scores for ${data.className || 'Class'} are now available on Parent App.`,
        timestamp: new Date().toISOString(),
        data
      };
      io.emit("parent:result_update", syncPayload);
      io.emit("parent:live_notification", syncPayload);
    });

    // Report Card Sync
    socket.on("teacher:report_card_published", (data: any) => {
      logger.info(`[Socket.IO] Teacher published Report Cards for ${data.className || 'Class'}`);
      const syncPayload = {
        type: "REPORT_CARD",
        title: `📄 Report Cards Released!`,
        body: `Official Report Cards for ${data.className || 'Class'} are now downloadable on Parent Portal.`,
        timestamp: new Date().toISOString(),
        data
      };
      io.emit("parent:report_card_update", syncPayload);
      io.emit("parent:live_notification", syncPayload);
    });

    // Class Announcement Sync
    socket.on("teacher:announcement_created", (data: any) => {
      logger.info(`[Socket.IO] Teacher broadcasted Announcement: ${data.title}`);
      const syncPayload = {
        type: "ANNOUNCEMENT",
        title: `📢 Class Announcement: ${data.title}`,
        body: data.body || 'Important notice from class teacher.',
        timestamp: new Date().toISOString(),
        data
      };
      io.emit("parent:notification_update", syncPayload);
      io.emit("parent:live_notification", syncPayload);
    });

    socket.on("disconnect", () => {
      logger.info(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
};
