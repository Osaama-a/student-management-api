import { type Role } from "../constants/role.js";

export interface LoginInput {
    email: string;
    password: string
}

export interface JwtPayload {
    id: string; 
    email: string;
    role: Role;

}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}