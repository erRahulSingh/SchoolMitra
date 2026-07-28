// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Centralized Constants & Configuration
// ═══════════════════════════════════════════════════════════

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const TOKEN_CONFIG = {
  ACCESS_TOKEN_EXPIRY: "15m",
  REFRESH_TOKEN_EXPIRY: "7d",
  EMAIL_VERIFY_EXPIRY_MS: 24 * 60 * 60 * 1000,   // 24 hours
  PASSWORD_RESET_EXPIRY_MS: 1 * 60 * 60 * 1000,   // 1 hour
  OTP_EXPIRY_MS: 5 * 60 * 1000,                    // 5 minutes
  OTP_LENGTH: 4,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const RATE_LIMIT = {
  GLOBAL_WINDOW_MS: 60 * 1000,       // 1 minute
  GLOBAL_MAX: 100,                    // 100 requests per minute
  AUTH_WINDOW_MS: 60 * 1000,          // 1 minute
  AUTH_MAX: 10,                       // 10 auth requests per minute
} as const;

export const PASSWORD_CONFIG = {
  MIN_LENGTH: 8,
  SALT_BYTES: 16,
  KEY_LENGTH: 64,
  ITERATIONS: 10000,
  DIGEST: "sha512",
} as const;
