// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Uniform API Response Wrapper
// ═══════════════════════════════════════════════════════════

import { Response } from "express";
import { HTTP_STATUS } from "./constants";

interface SuccessResponsePayload {
  success: true;
  statusCode: number;
  message: string;
  data?: any;
}

interface PaginatedResponsePayload extends SuccessResponsePayload {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export class ApiResponse {
  /**
   * Standard success response
   */
  static success(
    res: Response,
    statusCode: number = HTTP_STATUS.OK,
    message: string = "Success",
    data?: any
  ): Response {
    const payload: SuccessResponsePayload = {
      success: true,
      statusCode,
      message,
    };

    if (data !== undefined) {
      payload.data = data;
    }

    return res.status(statusCode).json(payload);
  }

  /**
   * Paginated list response
   */
  static paginated(
    res: Response,
    data: any[],
    page: number,
    limit: number,
    total: number,
    message: string = "Data fetched successfully"
  ): Response {
    const totalPages = Math.ceil(total / limit);
    const payload: PaginatedResponsePayload = {
      success: true,
      statusCode: HTTP_STATUS.OK,
      message,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };

    return res.status(HTTP_STATUS.OK).json(payload);
  }

  /**
   * Standardized Global Error response
   */
  static error(res: Response, statusCode: number = HTTP_STATUS.BAD_REQUEST, message: string = "Error", code?: string, errorDetails?: any): Response {
    const errorCode = code || (
      statusCode === 400 ? "BAD_REQUEST" :
      statusCode === 401 ? "UNAUTHORIZED_ACCESS" :
      statusCode === 403 ? "FORBIDDEN_SCOPE" :
      statusCode === 404 ? "RESOURCE_NOT_FOUND" :
      statusCode === 422 ? "VALIDATION_ERROR" :
      statusCode === 429 ? "RATE_LIMIT_EXCEEDED" : "INTERNAL_SERVER_ERROR"
    );

    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      code: errorCode,
      errorDetails,
      timestamp: new Date().toISOString()
    });
  }


  /**
   * Created response (201)
   */
  static created(res: Response, message: string = "Resource created successfully", data?: any): Response {
    return ApiResponse.success(res, HTTP_STATUS.CREATED, message, data);
  }

  /**
   * No content response (204)
   */
  static noContent(res: Response): Response {
    return res.status(HTTP_STATUS.NO_CONTENT).send();
  }
}
