import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { departments } from "./departments.js";

export const courses = pgTable("courses", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),

    courseName: text("course_name")
        .notNull(),

    courseCode: text("course_code")
        .notNull()
        .unique(),

    creditHours: integer("credit_hours")
        .notNull(),

    departmentId: uuid("department_id")
        .notNull()
        .references(() => departments.id),

    description: text("description"),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
});

export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;