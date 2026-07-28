// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Custom API Error Class
// ═══════════════════════════════════════════════════════════

import { HTTP_STATUS } from "./constants";

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors: string[];
  public readonly isOperational: boolean;

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: string[] = [],
    isOperational: boolean = true,
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // ──────────── Factory Methods ────────────

  static badRequest(message: string = "Bad request", errors: string[] = []) {
    return new ApiError(HTTP_STATUS.BAD_REQUEST, message, errors);
  }

  static unauthorized(message: string = "Authentication required") {
    return new ApiError(HTTP_STATUS.UNAUTHORIZED, message);
  }

  static forbidden(message: string = "Access denied") {
    return new ApiError(HTTP_STATUS.FORBIDDEN, message);
  }

  static notFound(message: string = "Resource not found") {
    return new ApiError(HTTP_STATUS.NOT_FOUND, message);
  }

  static conflict(message: string = "Resource already exists") {
    return new ApiError(HTTP_STATUS.CONFLICT, message);
  }

  static paymentRequired(message: string = "Payment required") {
    return new ApiError(HTTP_STATUS.PAYMENT_REQUIRED, message);
  }

  static tooManyRequests(message: string = "Too many requests, please try again later") {
    return new ApiError(HTTP_STATUS.TOO_MANY_REQUESTS, message);
  }

  static internal(message: string = "Internal server error") {
    return new ApiError(HTTP_STATUS.INTERNAL_SERVER, message, [], false);
  }
}
