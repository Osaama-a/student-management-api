import type { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/message.js";
import { ENV } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";


export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  
  let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message: string = MESSAGES.GENERIC.SERVER_ERROR;
  let errors: Record<string, unknown> | unknown[] | null = null;

  
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors ?? null;
  } 
  
  else if (err instanceof SyntaxError && "status" in err && err.status === 400) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = MESSAGES.GENERIC.BAD_REQUEST;
  }

  if (statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    console.error("❌ UNHANDLED INTERNAL ERROR:", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(ENV.NODE_ENV === "development" && { stack: err.stack }),
  });
}