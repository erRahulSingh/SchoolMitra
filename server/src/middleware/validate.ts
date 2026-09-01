// @ts-nocheck
// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Zod Validation Middleware Factory
// ═══════════════════════════════════════════════════════════
// Usage in routes:
//   router.post("/register", validate(registerSchema), controller);

import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { ApiError } from "../utils/ApiError";

interface ValidationTarget {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

/**
 * Validates request body, query, and/or params against Zod schemas.
 * Accepts either a single ZodSchema (validates body only) or an
 * object with { body, query, params } keys.
 */
export const validate = (schema: ZodSchema | ValidationTarget) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      // If a single schema is passed, treat it as body validation
      if ("parse" in schema && typeof schema.parse === "function") {
        const zodSchema = schema as ZodSchema;
        req.body = zodSchema.parse(req.body);
      } else {
        const targets = schema as ValidationTarget;

        if (targets.body) {
          req.body = targets.body.parse(req.body);
        }
        if (targets.query) {
          req.query = targets.query.parse(req.query) as any;
        }
        if (targets.params) {
          req.params = targets.params.parse(req.params) as any;
        }
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessages = err.errors.map((e) => {
          const path = e.path.join(".");
          return path ? `${path}: ${e.message}` : e.message;
        });

        throw ApiError.badRequest("Validation failed", errorMessages);
      }
      next(err);
    }
  };
};

