import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",

  dialect: "postgresql",

  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },

  schemaFilter: ["public"],

  migrations: {
    schema: "drizzle",
    table: "__drizzle_migrations",
  },

  breakpoints: true,
  verbose: true,
});