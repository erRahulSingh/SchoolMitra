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
  return `${minutes} mins`;
}

// ──────────── Global Socket Instance & Status Dispatcher ────────────
let globalIO: SocketIOServer | null = null;
const suspendedSchoolsSet = new Set<string>();

export const emitSchoolStatusChanged = (
  schoolId: string,
  status: string,
  reason: string,
  schoolCode?: string
) => {
  if (!globalIO) return;

  const normalizedId = String(schoolId);
  const normalizedCode = schoolCode?.toLowerCase() || "";

  if (status === "SUSPENDED" || status === "EXPIRED" || status === "DEACTIVATED") {
    suspendedSchoolsSet.add(normalizedId);
    if (normalizedCode) suspendedSchoolsSet.add(normalizedCode);
  } else if (status === "ACTIVE" || status === "TRIAL") {
    suspendedSchoolsSet.delete(normalizedId);
    if (normalizedCode) suspendedSchoolsSet.delete(normalizedCode);
  }

  const payload = {
    schoolId: normalizedId,
    schoolCode: schoolCode || "",
    status,
    reason: reason || `School account status changed to ${status}`,
    timestamp: new Date().toISOString()
  };

  logger.warn(`[Socket.IO] Emitting school:status_changed for school ${schoolId} [${status}]`);

  // 1. Emit to tenant-specific room
  globalIO.to(`school:${normalizedId}`).emit("school:status_changed", payload);
  if (normalizedCode) {
    globalIO.to(`school:${normalizedCode}`).emit("school:status_changed", payload);
  }

  // 2. Global broadcast so all clients can filter by schoolId
  globalIO.emit("school:status_changed", payload);

  // 3. STEP 16: For suspended schools, disconnect & evict all connected client sockets
  if (status === "SUSPENDED" || status === "EXPIRED" || status === "DEACTIVATED") {
    try {
      const roomSockets = globalIO.sockets.adapter.rooms.get(`school:${normalizedId}`);
      if (roomSockets) {
        for (const socketId of roomSockets) {
          const clientSocket = globalIO.sockets.sockets.get(socketId);
          if (clientSocket) {
            logger.info(`[Socket.IO Eviction] Disconnecting suspended tenant socket ${clientSocket.id}`);
            clientSocket.emit("school:status_changed", payload);
            clientSocket.disconnect(true);
          }
        }
      }
    } catch (e) {
      logger.warn("[Socket.IO Eviction Error]:", e);
    }
  }
};

export const initSocketServer = (io: SocketIOServer) => {
  globalIO = io;
  logger.info("[Socket.IO] Real-Time Telemetry & Notification Engine initialized.");

  io.on("connection", (socket: Socket) => {
    logger.info(`[Socket.IO] Client connected: ${socket.id}`);

    // Identify socket tenant
    const schoolId =
      (socket.handshake.auth as any)?.schoolId ||
      (socket.handshake.query as any)?.schoolId;

    if (schoolId) {
      socket.data.schoolId = String(schoolId);
      socket.join(`school:${schoolId}`);
      logger.info(`[Socket.IO] Socket ${socket.id} auto-joined tenant room school:${schoolId}`);

      // If already suspended, immediately emit blocked status and reject operations
      if (suspendedSchoolsSet.has(String(schoolId))) {
        socket.emit("school:status_changed", {
          schoolId: String(schoolId),
          status: "SUSPENDED",
          reason: "School account is suspended. Real-time operations are disabled."
        });
      }
    }

    // Tenant check helper
    const isBlocked = (data?: any): boolean => {
      const currentSchoolId = socket.data?.schoolId || data?.schoolId || (socket.handshake.auth as any)?.schoolId;
      if (currentSchoolId && suspendedSchoolsSet.has(String(currentSchoolId))) {
        logger.warn(`[Socket.IO Barrier] Suppressed event from suspended tenant socket ${socket.id} (School: ${currentSchoolId})`);
        return true;
      }
      return false;
    };

    // Explicit tenant room join
    socket.on("school:join", (data: { schoolId: string }) => {
      if (data?.schoolId) {
        socket.data.schoolId = String(data.schoolId);
        socket.join(`school:${data.schoolId}`);
        logger.info(`[Socket.IO] Socket ${socket.id} subscribed to school:${data.schoolId}`);

        if (suspendedSchoolsSet.has(String(data.schoolId))) {
          socket.emit("school:status_changed", {
            schoolId: String(data.schoolId),
            status: "SUSPENDED",
            reason: "School account is suspended."
          });
        }
      }
    });

    socket.on("bus:join_room", (data: { routeId?: string; busId?: string; parentId?: string; schoolId?: string }) => {
      if (isBlocked(data)) return;

      if (data.parentId && data.busId) {
        if (data.busId.toUpperCase() !== "BUS-01" && data.busId.toUpperCase() !== "BUS #01") {
          logger.warn(`[Socket.IO] Security DENIED: Parent ${data.parentId} unauthorized tracking attempt for Bus ${data.busId}`);
          return;
        }
      }

      const room = data.routeId ? `route:${data.routeId}` : `bus:${data.busId}`;
      socket.join(room);
      logger.info(`[Socket.IO] Socket ${socket.id} subscribed to room ${room}`);
    });

    socket.on("parent:subscribe", (data: { parentId: string; schoolId?: string }) => {
      if (isBlocked(data)) return;
      const room = `parent:${data.parentId}`;
      socket.join(room);
      logger.info(`[Socket.IO] Parent Socket ${socket.id} subscribed to ${room}`);
    });

    socket.on("chat:join_room", (data: { roomId: string; schoolId?: string }) => {
      if (isBlocked(data)) return;
      if (data.roomId) {
        const room = `room:${data.roomId}`;
        socket.join(room);
        logger.info(`[Socket.IO] Socket ${socket.id} joined Chat Room ${room}`);
      }
    });

    socket.on("chat:send_message", (data: { roomId: string; text: string; senderId?: string; schoolId?: string }) => {
      if (isBlocked(data)) return;
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
      if (isBlocked(data)) return;
      if (data.roomId || data.conversationId) {
        const room = `room:${data.roomId || data.conversationId}`;
        io.to(room).emit("message:new", data);
      }
    });

    socket.on("message:read", (data: { messageId?: string; roomId?: string; userId?: string; schoolId?: string }) => {
      if (isBlocked(data)) return;
      const room = data.roomId ? `room:${data.roomId}` : undefined;
      if (room) {
        io.to(room).emit("message:read", data);
      }
    });

    socket.on("message:typing", (data: { roomId: string; userId: string; isTyping: boolean; schoolId?: string }) => {
      if (isBlocked(data)) return;
      if (data.roomId) {
        socket.to(`room:${data.roomId}`).emit("message:typing", data);
      }
    });

    socket.on("notification:new", (data: any) => {
      if (isBlocked(data)) return;
      if (data.recipientId) {
        io.to(`user:${data.recipientId}`).to(`parent:${data.recipientId}`).emit("notification:new", data);
      }
    });

    socket.on("announcement:published", (data: any) => {
      if (isBlocked(data)) return;
      logger.info(`[Socket.IO] Announcement published: ${data.title || 'Announcement'}`);
      if (data.schoolId) {
        io.to(`school:${data.schoolId}`).emit("announcement:published", data);
      }
    });

    // ──────────── 2. DRIVER LIVE GPS LOCATION BROADCAST ────────────
    socket.on("driver:location_update", (data: GPSLocationUpdatePayload & { schoolId?: string }) => {
      if (isBlocked(data)) return;

      const calculatedEta = data.etaMinutes
        ? `${data.etaMinutes} mins`
        : calculateDynamicETA(data.speed || 35, data.distanceToNextStopMeters || 1800);

      const enrichedPayload = {
        ...data,
        eta: calculatedEta,
        timestamp: new Date().toISOString(),
      };

      if (data.routeId) {
        io.to(`route:${data.routeId}`).emit("bus:location_changed", enrichedPayload);
      }
      if (data.busId) {
        io.to(`bus:${data.busId}`).emit("bus:location_changed", enrichedPayload);
      }
    });

    socket.on("bus:location_changed", (data: { busId: string; tripId?: string; latitude: number; longitude: number; speed: number; heading?: number; timestamp?: string; schoolId?: string }) => {
      if (isBlocked(data)) return;
      
      const payload = {
        ...data,
        timestamp: data.timestamp || new Date().toISOString()
      };

      io.to(`bus:${data.busId}`).emit("bus:location_changed", payload);
    });

    // ──────────── 3. BUS STATUS UPDATES ────────────
    socket.on("driver:status_changed", (data: { busId: string; status: string; stopName?: string; delayMins?: number; schoolId?: string }) => {
      if (isBlocked(data)) return;
      
      const payload = {
        ...data,
        timestamp: new Date().toISOString(),
        message: data.status === "DELAYED"
          ? `Bus ${data.busId} delayed by ${data.delayMins || 10} mins due to traffic.`
          : `Bus ${data.busId} status is now ${data.status}.`
      };

      io.to(`bus:${data.busId}`).emit("bus:status_changed", payload);
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
      logger.error(`[SOS ALERT] Emergency from Bus ${data.busId} by Driver ${data.driverId}. Location: ${data.latitude}, ${data.longitude}`);
      
      const sosPayload = {
        ...data,
        timestamp: data.timestamp || new Date().toISOString(),
        message: `🚨 EMERGENCY SOS ALERT: Bus ${data.busId} reported an emergency: ${data.status}.`
      };

      if (data.schoolId) {
        io.to(`school:${data.schoolId}`).emit("alert:emergency_sos", sosPayload);
      }
    });

    // ──────────── 5. STUDENT RFID BOARDING / DROP NOTIFICATIONS ────────────
    socket.on("driver:student_status_changed", (data: { studentId: string; studentName: string; parentId?: string; status: string; timestamp: string; schoolId?: string }) => {
      if (isBlocked(data)) return;

      const payload = {
        ...data,
        timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        notificationText: `🚌 ${data.studentName} was marked as ${data.status.toUpperCase()} at ${data.timestamp || "now"}.`
      };

      if (data.parentId) {
        io.to(`parent:${data.parentId}`).emit("parent:student_status_update", payload);
      }
    });

    // ──────────── 6. TEACHER REAL-TIME PARENT DATA SYNCHRONIZATION ────────────
    // Attendance Sync
    socket.on("teacher:attendance_updated", (data: any) => {
      if (isBlocked(data)) return;
      logger.info(`[Socket.IO] Teacher updated Attendance for ${data.className || 'Class'}`);
      const syncPayload = {
        type: "ATTENDANCE",
        title: "Attendance Updated",
        body: `Attendance marked for ${data.className || 'Class'} on ${data.date || 'today'}.`,
        timestamp: new Date().toISOString(),
        data
      };
      if (data.schoolId) {
        io.to(`school:${data.schoolId}`).emit("parent:attendance_update", syncPayload);
        io.to(`school:${data.schoolId}`).emit("parent:live_notification", syncPayload);
      }
    });

    // Homework Sync
    socket.on("teacher:homework_published", (data: any) => {
      if (isBlocked(data)) return;
      logger.info(`[Socket.IO] Teacher published Homework: ${data.title || 'New Homework'}`);
      const syncPayload = {
        type: "HOMEWORK",
        title: `📚 New Homework: ${data.title}`,
        body: `${data.subject || 'Subject'} homework assigned to ${data.className || 'Class'}. Due: ${data.dueDate || 'Soon'}.`,
        timestamp: new Date().toISOString(),
        data
      };
      if (data.schoolId) {
        io.to(`school:${data.schoolId}`).emit("parent:homework_update", syncPayload);
        io.to(`school:${data.schoolId}`).emit("parent:live_notification", syncPayload);
      }
    });

    // Assignments Sync
    socket.on("teacher:assignment_published", (data: any) => {
      if (isBlocked(data)) return;
      logger.info(`[Socket.IO] Teacher published Assignment: ${data.title || 'New Assignment'}`);
      const syncPayload = {
        type: "ASSIGNMENT",
        title: `🏆 New Assignment: ${data.title}`,
        body: `${data.subject || 'Subject'} project assigned (Max Marks: ${data.marks || 50}).`,
        timestamp: new Date().toISOString(),
        data
      };
      if (data.schoolId) {
        io.to(`school:${data.schoolId}`).emit("parent:homework_update", syncPayload);
        io.to(`school:${data.schoolId}`).emit("parent:live_notification", syncPayload);
      }
    });

    // Weekly Test Sync
    socket.on("teacher:test_published", (data: any) => {
      if (isBlocked(data)) return;
      logger.info(`[Socket.IO] Teacher published Weekly Test: ${data.title || 'Weekly Test'}`);
      const syncPayload = {
        type: "WEEKLY_TEST",
        title: `📝 Weekly Test Update: ${data.title}`,
        body: `Weekly Test scheduled for ${data.className || 'Class'}. Total Marks: ${data.totalMarks || 25}.`,
        timestamp: new Date().toISOString(),
        data
      };
      if (data.schoolId) {
        io.to(`school:${data.schoolId}`).emit("parent:test_update", syncPayload);
        io.to(`school:${data.schoolId}`).emit("parent:live_notification", syncPayload);
      }
    });

    // Marks Entry Sync
    socket.on("teacher:marks_submitted", (data: any) => {
      if (isBlocked(data)) return;
      logger.info(`[Socket.IO] Teacher submitted Exam Marks for ${data.examTitle || 'Exam'}`);
      const syncPayload = {
        type: "MARKS",
        title: `📊 Exam Marks Published: ${data.examTitle || 'Exam'}`,
        body: `Official exam scores for ${data.className || 'Class'} are now available on Parent App.`,
        timestamp: new Date().toISOString(),
        data
      };
      if (data.schoolId) {
        io.to(`school:${data.schoolId}`).emit("parent:result_update", syncPayload);
        io.to(`school:${data.schoolId}`).emit("parent:live_notification", syncPayload);
      }
    });

    // Report Card Sync
    socket.on("teacher:report_card_published", (data: any) => {
      if (isBlocked(data)) return;
      logger.info(`[Socket.IO] Teacher published Report Cards for ${data.className || 'Class'}`);
      const syncPayload = {
        type: "REPORT_CARD",
        title: `📄 Report Cards Released!`,
        body: `Official Report Cards for ${data.className || 'Class'} are now downloadable on Parent Portal.`,
        timestamp: new Date().toISOString(),
        data
      };
      if (data.schoolId) {
        io.to(`school:${data.schoolId}`).emit("parent:report_card_update", syncPayload);
        io.to(`school:${data.schoolId}`).emit("parent:live_notification", syncPayload);
      }
    });

    // Class Announcement Sync
    socket.on("teacher:announcement_created", (data: any) => {
      if (isBlocked(data)) return;
      logger.info(`[Socket.IO] Teacher broadcasted Announcement: ${data.title}`);
      const syncPayload = {
        type: "ANNOUNCEMENT",
        title: `📢 Class Announcement: ${data.title}`,
        body: data.body || 'Important notice from class teacher.',
        timestamp: new Date().toISOString(),
        data
      };
      if (data.schoolId) {
        io.to(`school:${data.schoolId}`).emit("parent:notification_update", syncPayload);
        io.to(`school:${data.schoolId}`).emit("parent:live_notification", syncPayload);
      }
    });

    socket.on("disconnect", () => {
      logger.info(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
};
