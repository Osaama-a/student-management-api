import { boolean, integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { ROLES, ALL_ROLES,  } from "../../constants/roles.js";

// export const userRoleEnum = pgEnum("user_role", ["admin", "student", "teacher"]);

export const users = pgTable("users", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),

    email: text("email")
        .notNull()
        .unique(),

    passwordHash: text("password_hash")
        .notNull(),

    // role: userRoleEnum("role")
    //     .notNull()
    //     .default("student"),
    role: text("role", { enum: ALL_ROLES, })
        .notNull()
        .default(ROLES.STUDENT),

    isActive: boolean("is_active")
        .notNull()
        .default(true),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),
        
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;