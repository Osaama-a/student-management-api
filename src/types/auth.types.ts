import { type Role } from "../constants/role.js";
import type { Request as ExpressRequest } from "express";

export interface LoginInput {
    email: string;
    password: string
}

export interface JwtPayload {
    id: number; 
    role: Role;
    jti?: string;

}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}