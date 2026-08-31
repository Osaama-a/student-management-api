import jwt,{ type SignOptions} from "jsonwebtoken"
import crypto, { type SigningOptions } from "crypto";
import { ENV } from "../config/env.js"
import { type JwtPayload, type TokenPair } from "../types/auth.types.js";

export function GenerateTokenPair (
    payload: JwtPayload
): TokenPair {
    const accessToken = jwt.sign(payload, ENV.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: ENV.JWT_ACCESS_TOKEN_EXPIRES_IN
    } as SignOptions);

    const refreshToken = jwt.sign(payload, ENV.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: ENV.JWT_REFRESH_TOKEN_EXPIRES_IN
    } as SignOptions);

    return { accessToken, refreshToken}
}

export function verifyAccessToken (
    token: string
): JwtPayload {
    return jwt.verify(
        token,
        ENV.JWT_ACCESS_TOKEN_SECRET
    ) as JwtPayload;
}

export function verifyRefreshToken (
    token: string
): JwtPayload {
    return jwt.verify(
        token,
        ENV.JWT_REFRESH_TOKEN_SECRET
    ) as JwtPayload;
}

export function hashToken(token: string): string {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
}