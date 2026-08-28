import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const envSchema = z.object({
  // App
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().default(8000),

  APP_NAME: z
    .string()
    .default("Student Management API"),

  API_PREFIX: z
    .string()
    .default("/api/v1"),

  // Database
  DATABASE_URL: z
    .string()
    .url("DATABASE_URL must be a valid connection string"),

  // Authentication
  JWT_ACCESS_TOKEN_SECRET: z
    .string()
    .min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),

  JWT_ACCESS_TOKEN_EXPIRES_IN: z
    .string()
    .default("15m"),

  JWT_REFRESH_TOKEN_SECRET: z
    .string()
    .min(32, "JWT_REFRESH_TOKEN_SECRET must be at least 32 characters"),

  JWT_REFRESH_TOKEN_EXPIRES_IN: z
    .string()
    .default("7d"),

  // Security
  SALT_ROUNDS: z
    .coerce
    .number()
    .int()
    .min(10)
    .default(12),
});

const parseEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("❌ Invalid environment variables:");

    console.error(
      JSON.stringify(
        result.error.flatten().fieldErrors,
        null,
        2
      )
    );

    process.exit(1);
  }

  return result.data;
};

export const ENV = Object.freeze(parseEnv());

export type EnvConfig = z.infer<typeof envSchema>;