import { Server as SocketIOServer, Socket } from "socket.io";

export const initSocketServer = (io: SocketIOServer) => {
  console.log("[Socket.IO] Real-Time Telemetry & Chat Server initialized.");

  io.on("connection", (socket: Socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    // Join Bus Route Room
    socket.on("bus:join_room", (data: { routeId: string }) => {
      socket.join(`route:${data.routeId}`);
      console.log(`[Socket.IO] Socket ${socket.id} joined route:${data.routeId}`);
    });

    // Driver Telemetry Location Update Broadcast
    socket.on("driver:location_update", (data: {
      busId: string;
      routeId: string;
      latitude: number;
      longitude: number;
      speed: number;
      currentStop: string;
      eta: string;
    }) => {
      // Broadcast location to parent app listeners in route room
      io.to(`route:${data.routeId}`).emit("bus:location_changed", data);
      io.emit("admin:bus_location_update", data);
    });

    // Emergency SOS Trigger from Driver App
    socket.on("driver:sos_alert", (data: { busId: string; driverName: string; location: string }) => {
      console.warn(`[SOS ALERT] Emergency broadcast from Bus ${data.busId} by ${data.driverName}`);
      io.emit("alert:emergency_sos", {
        ...data,
        timestamp: new Date().toISOString(),
        message: `EMERGENCY SOS: Bus ${data.busId} reported an emergency at ${data.location}.`
      });
    });

    socket.on("disconnect", () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
};
