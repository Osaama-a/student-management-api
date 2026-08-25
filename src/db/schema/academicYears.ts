import { pgTable, text, date, timestamp, uuid } from "drizzle-orm/pg-core";

export const academicYears = pgTable("academic_years", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),

    year_label: text("year_label")
        .unique()
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
});

export type AcademicYear = typeof academicYears.$inferSelect;
export type NewAcademicYear = typeof academicYears.$inferInsert;