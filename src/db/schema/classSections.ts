import { pgTable, text, integer, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { courses } from "./courses.js";
import { semesters } from "./semesters.js";
import { teachers } from "./teachers.js";



export const classSections = pgTable("class_sections", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),
    
    courseId: uuid("course_id")
        .notNull()
        .references(() => courses.id),

    semesterId: uuid("semester_id")
        .notNull()
        .references(() => semesters.id),

    teacherId: uuid("teacher_id")
        .notNull()
        .references(() => teachers.id),

    sectionName: text("section_name")
        .notNull(),

    capacity: integer("capacity"),

    room: text("room"),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
},
(table) => [
    unique("course_semester_section")
    .on(
        table.courseId,
        table.semesterId,
        table.sectionName
    ),
],

);

export type ClassSection = typeof classSections.$inferSelect;
export type NewClassSection = typeof classSections.$inferInsert; 
