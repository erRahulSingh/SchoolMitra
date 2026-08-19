// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Message Socket Handler
// ═══════════════════════════════════════════════════════════

import { Socket, Server as SocketIOServer } from "socket.io";
import logger from "../../utils/logger";

export const registerMessageSocketHandlers = (io: SocketIOServer, socket: Socket) => {
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
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      });
    }
  });
};
