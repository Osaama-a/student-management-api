import { pgTable, text, date, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { academicYears } from "./academicYears.js";



export const semesters = pgTable("semester", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),
    
    academicYearId: uuid("accadamic_year_id")
        .notNull()
        .references(() => academicYears.id),

    termName: text("term_name")
        .notNull(),

    startDate: date("start_date")
        .notNull(),

    endDate: date("end_date")
        .notNull(),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
},
(table) => [
    unique("accadmicYear_termName")
    .on(
        table.academicYearId,
        table.termName,
    ),
],

); 

export type Semester = typeof semesters.$inferSelect;
export type NewSemester = typeof semesters.$inferInsert;