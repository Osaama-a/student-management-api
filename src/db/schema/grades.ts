import { numeric, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { enrollments } from "./enrollments.js";
import { assessments } from "./assessments.js";

export const grades = pgTable("grades", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),

    enrollmentId: uuid("enrollment_id")
        .notNull()
        .references(() => enrollments.id),

    assessmentId: uuid("assessment_id")
        .notNull()
        .references(() => assessments.id),

    score: numeric("score")
        .notNull(),

    feedback: text("feedback"),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),

}, 
(table) => [
    unique("enrollment_assessment_unique")
    .on(
        table.enrollmentId,
        table.assessmentId,
    ),
],

);

export type Grade = typeof grades.$inferSelect;
export type NewGrade = typeof grades.$inferInsert;