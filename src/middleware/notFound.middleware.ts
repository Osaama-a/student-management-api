import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export function notFound(req: Request, _res: Response, next: NextFunction): void {
  const message = `Resource not found: [${req.method}] ${req.originalUrl}`;
  return next(ApiError.notFound(message));
}