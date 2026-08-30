import type { NextFunction, Request, Response } from "express";
import type { Role } from "../constants/role.js";
import { ApiError } from "../utils/ApiError.js";

export function authorize(...allowedRoles: Role[]) {
    return(req: Request, _res: Response, next: NextFunction): void => {

        if(!req.user) {
            return next(ApiError.unauthorized());
        }
        
        if(!allowedRoles.includes(req.user.role)) {
            return next(ApiError.forbidden());
        }
        
        return next();
    };
}
