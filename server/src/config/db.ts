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

// Mongoose command buffering enabled for smooth query handling
mongoose.set("bufferCommands", true);

export const connectDB = async (): Promise<void> => {
  const mainConnStr = process.env.MONGODB_URI || process.env.MONGODB_ATLAS_URI || "mongodb+srv://rahulkahin_db_user:Schoolmitra_db@cluster0.mxb46ol.mongodb.net/schoolmitra?retryWrites=true&w=majority";

  // ──── Connection Event Listeners ────
  mongoose.connection.on("connected", () => {
    logger.info(`[MongoDB Atlas] Connected to host: ${mongoose.connection.host} / database: ${mongoose.connection.name}`);
    import("../services/permissionSeeder").then(({ seedGlobalPermissions }) => {
      seedGlobalPermissions().catch(() => {});
    });
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("[MongoDB] Disconnected from database.");
  });

  mongoose.connection.on("error", (err) => {
    logger.error(`[MongoDB] Connection error: ${err.message}`);
  });

  // ──── Initial Connection ────
  try {
    logger.info(`[MongoDB] Connecting to database cluster...`);
    await mongoose.connect(mainConnStr, {
      serverSelectionTimeoutMS: 8000,
    });
  } catch (err) {
    logger.error(`[MongoDB Atlas] Connection failed: ${(err as Error).message}`);
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
