// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Custom API Error Class
// ═══════════════════════════════════════════════════════════

import { HTTP_STATUS } from "./constants";

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly errors: string[];
  public readonly isOperational: boolean;

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    code: string = "INTERNAL_SERVER_ERROR",
    errors: string[] = [],
    isOperational: boolean = true,
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.errors = errors;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // ──────────── Factory Methods ────────────

  static badRequest(message: string = "Bad request", code: string = "BAD_REQUEST", errors: string[] = []) {
    return new ApiError(HTTP_STATUS.BAD_REQUEST, message, code, errors);
  }

  static unauthorized(message: string = "Authentication required", code: string = "UNAUTHORIZED_ACCESS") {
    return new ApiError(HTTP_STATUS.UNAUTHORIZED, message, code);
  }

  static forbidden(message: string = "Access denied", code: string = "FORBIDDEN_SCOPE") {
    return new ApiError(HTTP_STATUS.FORBIDDEN, message, code);
  }

  static notFound(message: string = "Resource not found", code: string = "RESOURCE_NOT_FOUND") {
    return new ApiError(HTTP_STATUS.NOT_FOUND, message, code);
  }

  static conflict(message: string = "Resource already exists", code: string = "DUPLICATE_RESOURCE") {
    return new ApiError(HTTP_STATUS.CONFLICT, message, code);
  }

  static paymentRequired(message: string = "Payment required", code: string = "PAYMENT_REQUIRED") {
    return new ApiError(HTTP_STATUS.PAYMENT_REQUIRED, message, code);
  }

  static tooManyRequests(message: string = "Too many requests, please try again later", code: string = "RATE_LIMIT_EXCEEDED") {
    return new ApiError(HTTP_STATUS.TOO_MANY_REQUESTS, message, code);
  }

  static internal(message: string = "Internal server error", code: string = "INTERNAL_SERVER_ERROR") {
    return new ApiError(HTTP_STATUS.INTERNAL_SERVER, message, code, [], false);
  }
}
