import { pgTable, text, timestamp, date, unique, uuid} from "drizzle-orm/pg-core";
import { ALL_ATTENDACE } from "../../constants/attendanceStatus.js";
import { enrollments } from "./enrollments.js";

export const attendances = pgTable("attendances", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),

    enrollmentId: uuid("enrollment_id")
        .notNull()
        .references(() => enrollments.id),

    attendanceDate: date("attendance_date")
        .notNull(),

    status: text("status", {
        enum: ALL_ATTENDACE
    }).notNull(),

    notes: text("notes"),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
},
(table) => [
    unique("enrollment_date_unique")
    .on(
        table.enrollmentId,
        table.attendanceDate,
    ),
],

);

export type Attendance = typeof attendances.$inferSelect;
export type NewAttendance = typeof attendances.$inferInsert; 


