// ═══════════════════════════════════════════════════════════
// SchoolMitra SaaS — Central School Account Status Model & Error Codes (Step 36)
// ═══════════════════════════════════════════════════════════

export enum SchoolStatus {
  ACTIVE = "ACTIVE",
  TRIAL = "TRIAL",
  SUSPENDED = "SUSPENDED",
  EXPIRED = "EXPIRED",
  DEACTIVATED = "DEACTIVATED",
  PENDING_APPROVAL = "PENDING_APPROVAL"
}

// ─── STEP 36: STANDARDIZED SAAS ERROR CODES ───
export enum SchoolErrorCode {
  SCHOOL_ACCESS_SUSPENDED = "SCHOOL_ACCESS_SUSPENDED",
  SCHOOL_ACCOUNT_EXPIRED = "SCHOOL_ACCOUNT_EXPIRED",
  SCHOOL_ACCOUNT_DEACTIVATED = "SCHOOL_ACCOUNT_DEACTIVATED",
  SCHOOL_PENDING_APPROVAL = "SCHOOL_PENDING_APPROVAL",
  SCHOOL_TRIAL_EXPIRED = "SCHOOL_TRIAL_EXPIRED",
  SCHOOL_ACCESS_REVOKED = "SCHOOL_ACCESS_REVOKED"
}

export const ALL_SCHOOL_STATUSES = [
  SchoolStatus.ACTIVE,
  SchoolStatus.TRIAL,
  SchoolStatus.SUSPENDED,
  SchoolStatus.EXPIRED,
  SchoolStatus.DEACTIVATED,
  SchoolStatus.PENDING_APPROVAL,
  // Case-insensitive legacy aliases support
  "Active",
  "Trial",
  "Suspended",
  "Expired",
  "Deactivated",
  "PendingEmailVerification"
];

export interface SchoolStatusEvaluation {
  effectiveStatus: SchoolStatus;
  isOperational: boolean;
  code: SchoolErrorCode | string;
  message: string;
  reason?: string;
  statusCode: number;
}

export const SCHOOL_STATUS_BEHAVIORS: Record<
  SchoolStatus,
  {
    allowsAccess: boolean;
    code: SchoolErrorCode | string;
    message: string;
    httpStatusCode: number;
  }
> = {
  [SchoolStatus.ACTIVE]: {
    allowsAccess: true,
    code: "SCHOOL_ACTIVE",
    message: "School account is active.",
    httpStatusCode: 200
  },
  [SchoolStatus.TRIAL]: {
    allowsAccess: true,
    code: "SCHOOL_TRIAL_ACTIVE",
    message: "School account is currently in active trial.",
    httpStatusCode: 200
  },
  [SchoolStatus.SUSPENDED]: {
    allowsAccess: false,
    code: SchoolErrorCode.SCHOOL_ACCESS_SUSPENDED,
    message: "Your school account is currently suspended. Please contact the Super Admin.",
    httpStatusCode: 403
  },
  [SchoolStatus.EXPIRED]: {
    allowsAccess: false,
    code: SchoolErrorCode.SCHOOL_ACCOUNT_EXPIRED,
    message: "Your school account subscription has expired. Please contact the Super Admin.",
    httpStatusCode: 403
  },
  [SchoolStatus.DEACTIVATED]: {
    allowsAccess: false,
    code: SchoolErrorCode.SCHOOL_ACCOUNT_DEACTIVATED,
    message: "Your school account is deactivated. Please contact the Super Admin.",
    httpStatusCode: 403
  },
  [SchoolStatus.PENDING_APPROVAL]: {
    allowsAccess: false,
    code: SchoolErrorCode.SCHOOL_PENDING_APPROVAL,
    message: "Your school account is pending approval. Please contact the Super Admin.",
    httpStatusCode: 403
  }
};

/**
 * Evaluates the live effective status of a school tenant, checking expiry dates.
 */
export function evaluateSchoolStatus(school: {
  status?: string;
  statusExpiresAt?: Date | string | null;
  trialEndsAt?: Date | string | null;
  expiresAt?: Date | string | null;
  statusReason?: string | null;
}): SchoolStatusEvaluation {
  if (!school) {
    return {
      effectiveStatus: SchoolStatus.DEACTIVATED,
      isOperational: false,
      code: SchoolErrorCode.SCHOOL_ACCESS_REVOKED,
      message: "School tenant record not found. Please contact the Super Admin.",
      statusCode: 404
    };
  }

  // Normalize status string to uppercase
  let rawStatus = (school.status || SchoolStatus.ACTIVE).toUpperCase();
  if (rawStatus === "PENDINGEMAILVERIFICATION") {
    rawStatus = SchoolStatus.PENDING_APPROVAL;
  }

  let normalizedStatus: SchoolStatus = SchoolStatus.ACTIVE;
  if (Object.values(SchoolStatus).includes(rawStatus as SchoolStatus)) {
    normalizedStatus = rawStatus as SchoolStatus;
  }

  // 1. Check if TRIAL has expired
  if (normalizedStatus === SchoolStatus.TRIAL) {
    const trialEnd = school.trialEndsAt || school.statusExpiresAt;
    if (trialEnd && new Date(trialEnd) < new Date()) {
      return {
        effectiveStatus: SchoolStatus.EXPIRED,
        isOperational: false,
        code: SchoolErrorCode.SCHOOL_TRIAL_EXPIRED,
        message: "Your school trial period has expired. Please contact the Super Admin to upgrade.",
        statusCode: 403
      };
    }
  }

  // 2. Check general statusExpiresAt / expiresAt
  const expiry = school.statusExpiresAt || school.expiresAt;
  if (expiry && new Date(expiry) < new Date()) {
    if (normalizedStatus === SchoolStatus.ACTIVE || normalizedStatus === SchoolStatus.TRIAL) {
      return {
        effectiveStatus: SchoolStatus.EXPIRED,
        isOperational: false,
        code: SchoolErrorCode.SCHOOL_ACCOUNT_EXPIRED,
        message: "Your school subscription has expired. Please contact the Super Admin to renew.",
        statusCode: 403
      };
    }
  }

  const behavior = SCHOOL_STATUS_BEHAVIORS[normalizedStatus] || SCHOOL_STATUS_BEHAVIORS[SchoolStatus.SUSPENDED];

  return {
    effectiveStatus: normalizedStatus,
    isOperational: behavior.allowsAccess,
    code: behavior.code,
    message: behavior.message,
    reason: school.statusReason || behavior.message,
    statusCode: behavior.httpStatusCode
  };
}
