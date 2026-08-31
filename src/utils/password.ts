import bcrypt from "bcrypt";
import { ENV } from "../config/env.js";

// const SALT_ROUNDS = 10;

export async function hashPassword(
    plain: string 
): Promise<string> {
    return bcrypt.hash(plain, ENV.SALT_ROUNDS);
};

export async function comparePassword(
    plain: string,
    hash: string
): Promise<boolean> {
    return bcrypt.compare(plain, hash);
    
}