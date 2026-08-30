import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { ENV } from "../config/env.js";
import { relations } from "./schema/relations.js";

export const client = postgres(ENV.DATABASE_URL);

export const db = drizzle({
  client,
  relations,
});