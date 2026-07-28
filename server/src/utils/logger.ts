// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Winston Structured Logger
// ═══════════════════════════════════════════════════════════

import winston from "winston";
import path from "path";

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Custom log format for console
const devFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
  return `${timestamp} [${level}]: ${stack || message}${metaStr}`;
});

// Custom log format for file (JSON)
const fileFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  winston.format.json()
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  defaultMeta: { service: "schoolmitra-api" },
  transports: [
    // Console — always active, colorized in development
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: "HH:mm:ss" }),
        errors({ stack: true }),
        devFormat
      ),
    }),
  ],
});

// File transports — only in production / staging
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
  const logsDir = path.join(process.cwd(), "logs");

  logger.add(
    new winston.transports.File({
      filename: path.join(logsDir, "error.log"),
      level: "error",
      format: fileFormat,
      maxsize: 5 * 1024 * 1024, // 5 MB
      maxFiles: 5,
    })
  );

  logger.add(
    new winston.transports.File({
      filename: path.join(logsDir, "combined.log"),
      format: fileFormat,
      maxsize: 10 * 1024 * 1024, // 10 MB
      maxFiles: 5,
    })
  );
}

// Morgan HTTP stream integration
export const morganStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

export default logger;
