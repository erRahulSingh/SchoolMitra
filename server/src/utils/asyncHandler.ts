// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Async Handler Wrapper
// ═══════════════════════════════════════════════════════════
// Wraps async route handlers so that any rejected promise
// is automatically forwarded to Express's next(err) — the
// global error handler. Eliminates try-catch boilerplate.

import { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler = (fn: AsyncRouteHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
