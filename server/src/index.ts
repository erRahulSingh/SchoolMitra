import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { initSocketServer } from "./socket";
import apiRoutes from "./routes";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO Server
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Connect Database
connectDB();

// Mount Socket Handlers
initSocketServer(io);

// Mount HTTP API Routes
app.use("/api/v1", apiRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("🚀 SchoolMitra Backend API & Socket.IO Telemetry Server Active");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 SchoolMitra Backend API running on port ${PORT}`);
  console.log(`📡 Socket.IO Realtime Telemetry Server Listening`);
  console.log(`===================================================`);
});
