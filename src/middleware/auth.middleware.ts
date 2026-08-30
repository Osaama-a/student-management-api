import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";
import type { AuthUser } from "../types/express.d.js";

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(ApiError.unauthorized());
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(ApiError.unauthorized());
  }

  try {
    const payload = verifyAccessToken(token) as AuthUser;

    
    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch {
    next(ApiError.unauthorized());
  }
}