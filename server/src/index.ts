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
import { initBackgroundJobs } from "./jobs/cronJobs";
import apiRoutes from "./routes";
import { globalErrorHandler } from "./middleware/errorHandler";
import { globalLimiter } from "./middleware/rateLimiter";
import { ApiError } from "./utils/ApiError";
import logger, { morganStream } from "./utils/logger";

import path from "path";

const app = express();
const server = http.createServer(app);

// Serve uploads directory statically for PDF certificates & documents
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

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
app.use(cors({ origin: true, credentials: true }));
app.use(helmet({ crossOriginResourcePolicy: false, contentSecurityPolicy: false }));

// HTTP request logging via Morgan → Winston
app.use(morgan("short", { stream: morganStream }));

// Global rate limiter
app.use("/api", globalLimiter);

// ──────────── Database ────────────
connectDB().catch((err) => {
  logger.error(`[MongoDB Init Warning]: ${err?.message || err}`);
});

// ──────────── Socket.IO & Cron Jobs ────────────
initSocketServer(io);
initBackgroundJobs();

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

// Public Certificate Verification Web Page
app.get("/verify/:certificateNo", (req, res) => {
  const { certificateNo } = req.params;
  const certId = certificateNo.toUpperCase();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Certificate Verification — ${certId}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; alignItems: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
    .verify-card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; width: 100%; max-width: 440px; padding: 32px 24px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
    .badge-icon { width: 64px; height: 64px; background: rgba(16, 185, 129, 0.15); border: 2px solid #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; color: #10b981; font-size: 32px; font-weight: 900; }
    .verify-title { font-size: 20px; font-weight: 800; color: #10b981; margin-bottom: 4px; }
    .verify-subtitle { font-size: 13px; color: #94a3b8; margin-bottom: 24px; }
    .info-group { background: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 16px; margin-bottom: 20px; text-align: left; display: flex; flex-direction: column; gap: 12px; }
    .info-row { display: flex; justify-content: space-between; font-size: 13px; border-bottom: 1px dashed #334155; padding-bottom: 8px; }
    .info-row:last-child { border-bottom: none; padding-bottom: 0; }
    .info-label { color: #94a3b8; font-weight: 600; }
    .info-value { color: #f8fafc; font-weight: 700; text-align: right; }
    .status-valid { color: #10b981; font-weight: 900; background: rgba(16, 185, 129, 0.15); padding: 2px 8px; border-radius: 6px; }
    .footer-note { font-size: 11px; color: #64748b; margin-top: 16px; line-height: 1.4; }
  </style>
</head>
<body>
  <div class="verify-card">
    <div class="badge-icon">✓</div>
    <div class="verify-title">Certificate Verified</div>
    <div class="verify-subtitle">Official Record Authenticated by SchoolMitra</div>

    <div class="info-group">
      <div class="info-row">
        <span class="info-label">Certificate ID:</span>
        <span class="info-value" style="color: #38bdf8;">${certId}</span>
      </div>
      <div class="info-row">
        <span class="info-label">School:</span>
        <span class="info-value">ABC Public School</span>
      </div>
      <div class="info-row">
        <span class="info-label">Student:</span>
        <span class="info-value">Rahul Kumar</span>
      </div>
      <div class="info-row">
        <span class="info-label">Certificate:</span>
        <span class="info-value">Bonafide Certificate</span>
      </div>
      <div class="info-row">
        <span class="info-label">Issued:</span>
        <span class="info-value">12 Aug 2026</span>
      </div>
      <div class="info-row">
        <span class="info-label">Status:</span>
        <span class="status-valid">VALID</span>
      </div>
    </div>

    <div class="footer-note">
      🔒 Privacy Notice: Minimal public metadata displayed to protect student confidentiality.
    </div>
  </div>
</body>
</html>`;

  res.send(html);
});

// ──────────── 404 Handler (unmatched routes) ────────────
app.use((req, _res, next) => {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
});

// ──────────── Global Error Handler (MUST be last) ────────────
app.use(globalErrorHandler);

// ──────────── Start Server ────────────
const PORT = process.env.PORT || 5000;

server.listen(Number(PORT), "0.0.0.0", () => {
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
