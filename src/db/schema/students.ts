import { date, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { users } from "./users.js";
import { departments } from "./departments.js";
import { ALL_GENDER } from "../../constants/genders.js";

export const students = pgTable("students", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),
        
    userId: uuid("user_id")
        .notNull()
        .unique()
        .references(() => users.id),

    firstName: text("first_name")
        .notNull(),

    lastName: text("last_name")
        .notNull(),

    studentNumber: text("student_number")
        .notNull()
        .unique(),

    dateOfBirth: date("date_of_birth"),

    gender: text("gender", 
        { enum: ALL_GENDER})
        .notNull(),

    phone: text("phone"),

    address: text("address"),

    departmentId: uuid("department_id")
        .notNull()
        .references(() => departments.id),

    intakeYear: integer("intake_year")
        .notNull(),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
});

export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;