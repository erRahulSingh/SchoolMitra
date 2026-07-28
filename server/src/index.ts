// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Server Entry Point (Production)
// ═══════════════════════════════════════════════════════════

import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

// Load environment variables FIRST
dotenv.config();

import { connectDB, disconnectDB } from "./config/db";
import { initSocketServer } from "./socket";
import apiRoutes from "./routes";
import { globalErrorHandler } from "./middleware/errorHandler";
import { globalLimiter } from "./middleware/rateLimiter";
import { ApiError } from "./utils/ApiError";
import logger, { morganStream } from "./utils/logger";

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO Server
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ──────────── Core Middleware ────────────
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors());
app.use(helmet());

// HTTP request logging via Morgan → Winston
app.use(morgan("short", { stream: morganStream }));

// Global rate limiter
app.use("/api", globalLimiter);

// ──────────── Database ────────────
connectDB();

// ──────────── Socket.IO ────────────
initSocketServer(io);

// ──────────── API Routes ────────────
app.use("/api/v1", apiRoutes);

// Root Endpoint
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "🚀 SchoolMitra Backend API & Socket.IO Telemetry Server Active",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

// ──────────── 404 Handler (unmatched routes) ────────────
app.use((req, _res, next) => {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
});

// ──────────── Global Error Handler (MUST be last) ────────────
app.use(globalErrorHandler);

// ──────────── Start Server ────────────
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  logger.info(`═══════════════════════════════════════════════════`);
  logger.info(`🚀 SchoolMitra Backend API running on port ${PORT}`);
  logger.info(`📡 Socket.IO Realtime Telemetry Server Listening`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  logger.info(`═══════════════════════════════════════════════════`);
});

// ──────────── Graceful Shutdown ────────────
const gracefulShutdown = async (signal: string) => {
  logger.info(`${signal} received. Starting graceful shutdown...`);

  // 1. Stop accepting new connections
  server.close(() => {
    logger.info("HTTP server closed.");
  });

  // 2. Close Socket.IO connections
  io.close(() => {
    logger.info("Socket.IO server closed.");
  });

  // 3. Close database connection
  await disconnectDB();

  logger.info("Graceful shutdown complete. Exiting.");
  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// ──────────── Unhandled Errors Safety Net ────────────
process.on("unhandledRejection", (reason: any) => {
  logger.error(`[UNHANDLED REJECTION] ${reason?.message || reason}`, {
    stack: reason?.stack,
  });
  // Don't crash — but log for investigation
});

process.on("uncaughtException", (error: Error) => {
  logger.error(`[UNCAUGHT EXCEPTION] ${error.message}`, {
    stack: error.stack,
  });
  // Crash after logging — uncaught exceptions leave the process in an undefined state
  process.exit(1);
});
