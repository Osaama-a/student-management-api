import { pgTable, text, timestamp, date, unique, uuid} from "drizzle-orm/pg-core";
import { classSections } from "./classSections.js";
import { students } from "./students.js";
import { ENROLLMENT, ALL_ENROLLMENT } from "../../constants/enrollmentStatus.js";

export const enrollments = pgTable("enrollments", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),

    studentId: uuid("student_id")
        .notNull()
        .references(() => students.id),

    sectionId: uuid("section_id")
        .notNull()
        .references(() => classSections.id),

    enrollmentDate: date("enrollment_date")
        .notNull(),

    status: text("status", { enum: ALL_ENROLLMENT })
        .notNull()
        .default(ENROLLMENT.ENROLLED),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
},
(table) => [
    unique("student_section_")
    .on(
        table.studentId,
        table.sectionId,
    ),
]
);

export type Enrollment = typeof enrollments.$inferSelect;
export type NewEnrollment = typeof enrollments.$inferInsert;