// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — MongoDB Atlas Connection (Production)
// ═══════════════════════════════════════════════════════════

import mongoose from "mongoose";
import dns from "dns";
import logger from "../utils/logger";

// Fix Windows / ISP SRV DNS lookup (querySrv ECONNREFUSED) for MongoDB Atlas
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  // Fallback if setServers is restricted
}

// Disable Mongoose command buffering so queries fail immediately or fallback instead of timing out after 10000ms
mongoose.set("bufferCommands", false);

export const connectDB = async (): Promise<void> => {
  const connStr =
    process.env.MONGODB_URI ||
    "mongodb+srv://rahulengineer492_db_user:Schoolmitra_db@schoolmitra.qztpv50.mongodb.net/schoolmitra?retryWrites=true&w=majority";

  // ──── Connection Event Listeners ────
  mongoose.connection.on("connected", () => {
    logger.info(`[MongoDB Atlas] Connected to cluster: ${mongoose.connection.host} / database: ${mongoose.connection.name}`);
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("[MongoDB Atlas] Disconnected from database. Mongoose will attempt to reconnect...");
  });

  mongoose.connection.on("reconnected", () => {
    logger.info("[MongoDB Atlas] Successfully reconnected to database.");
  });

  mongoose.connection.on("error", (err) => {
    logger.error(`[MongoDB Atlas] Connection error: ${err.message}`, { stack: err.stack });
  });

  // ──── Initial Connection ────
  try {
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 10000,  // 10 seconds timeout
      heartbeatFrequencyMS: 30000,      // 30 seconds heartbeat
    });
  } catch (error) {
    logger.error(`[MongoDB Atlas] Initial connection failed: ${(error as Error).message}`);
    // Don't crash the process — let the reconnect logic handle it
    // In production, you may want to exit: process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info("[MongoDB Atlas] Database connection closed gracefully.");
  } catch (error) {
    logger.error(`[MongoDB Atlas] Error during disconnect: ${(error as Error).message}`);
  }
};
