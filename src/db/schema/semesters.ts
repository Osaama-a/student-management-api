import { pgTable, integer, text, date, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { academicYears } from "./academicYears.js";



export const semester = pgTable("semester", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),
    
    acadamicYearId: uuid("accadamic_year_id")
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
        table.acadamicYearId,
        table.termName,
    ),
],

); 

export type Semester = typeof semester.$inferSelect;
export type NewSemester = typeof semester.$inferInsert;