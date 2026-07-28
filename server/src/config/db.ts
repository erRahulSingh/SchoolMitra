import mongoose from "mongoose";
import dns from "dns";

// Fix Windows / ISP SRV DNS lookup (querySrv ECONNREFUSED) for MongoDB Atlas
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  // Fallback if setServers is restricted
}

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || "mongodb+srv://rahulengineer492_db_user:mrx3zFPgAttlcFrk@schoolmitra.qztpv50.mongodb.net/schoolmitra?retryWrites=true&w=majority";
    await mongoose.connect(connStr);
    console.log(`[MongoDB Atlas] Connected successfully to cluster: ${mongoose.connection.host} / database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Atlas Error] Could not connect to database: ${(error as Error).message}`);
  }
};
