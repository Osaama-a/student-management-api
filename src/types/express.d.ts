import { type Role } from "../constants/role.js";

export interface AuthUser {
    id: string;
    email: string;
    role: Role;
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}

export {};