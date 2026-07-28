// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Global Error Handler Middleware
// ═══════════════════════════════════════════════════════════
// Mounted LAST in the Express middleware chain. Catches all
// errors thrown or forwarded via next(err) and renders a
// uniform JSON error response.

import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import logger from "../utils/logger";

export const globalErrorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Default values
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: string[] = [];
  let isOperational = false;

  // ──── 1. ApiError (our custom class) ────
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
    isOperational = err.isOperational;
  }

  // ──── 2. Mongoose ValidationError ────
  else if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    const mongooseErr = err as any;
    errors = Object.values(mongooseErr.errors || {}).map(
      (e: any) => e.message || String(e)
    );
    isOperational = true;
  }

  // ──── 3. Mongoose CastError (invalid ObjectId) ────
  else if (err.name === "CastError") {
    const castErr = err as any;
    statusCode = 400;
    message = `Invalid value for ${castErr.path}: ${castErr.value}`;
    isOperational = true;
  }

  // ──── 4. MongoDB Duplicate Key (code 11000) ────
  else if ((err as any).code === 11000) {
    statusCode = 409;
    const keyValue = (err as any).keyValue || {};
    const field = Object.keys(keyValue).join(", ");
    message = `Duplicate value for field: ${field}. This ${field} already exists.`;
    isOperational = true;
  }

  // ──── 5. JWT TokenExpiredError ────
  else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Authentication token has expired. Please log in again.";
    isOperational = true;
  }

  // ──── 6. JWT JsonWebTokenError ────
  else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid authentication token.";
    isOperational = true;
  }

  // ──── 7. SyntaxError (malformed JSON body) ────
  else if (err instanceof SyntaxError && (err as any).status === 400) {
    statusCode = 400;
    message = "Malformed JSON in request body.";
    isOperational = true;
  }

  // ──── Log ────
  if (!isOperational) {
    // Unexpected / programming errors — log full stack
    logger.error(`[UNHANDLED ERROR] ${err.message}`, {
      stack: err.stack,
      path: req.originalUrl,
      method: req.method,
      ip: req.ip,
    });
  } else {
    // Operational errors — log at warn level
    logger.warn(`[${statusCode}] ${message}`, {
      path: req.originalUrl,
      method: req.method,
    });
  }

  // ──── Response ────
  const response: Record<string, any> = {
    success: false,
    statusCode,
    message,
  };

  if (errors.length > 0) {
    response.errors = errors;
  }

  // Include stack trace in development
  if (process.env.NODE_ENV === "development" && err.stack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
