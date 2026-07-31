// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Socket.IO Realtime Telemetry Config
// ═══════════════════════════════════════════════════════════

import { Server as SocketIOServer } from "socket.io";
import logger from "../utils/logger";

let ioServer: SocketIOServer | null = null;

export const setSocketInstance = (io: SocketIOServer) => {
  ioServer = io;
};

export const getSocketInstance = (): SocketIOServer => {
  if (!ioServer) {
    throw new Error("Socket.IO instance has not been initialized yet.");
  }
  return ioServer;
};

export const emitToSchool = (schoolId: string, event: string, data: any) => {
  if (ioServer) {
    ioServer.to(`school:${schoolId}`).emit(event, data);
  }
};

export const emitToUser = (userId: string, event: string, data: any) => {
  if (ioServer) {
    ioServer.to(`user:${userId}`).emit(event, data);
  }
};
