import { type Response } from "express";
import { type PaginationMeta } from "../types/common.types.js";

export function sendSuccess<T> (
    res: Response,
    statusCode: number,
    message: string,
    data: T,
    meta?: PaginationMeta,
) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        ...(meta ? { meta }: {}),

    });
}