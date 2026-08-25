import { pgTable, integer, timestamp, text, uuid } from "drizzle-orm/pg-core";
import { departments } from "./departments.js";
import { users } from "./users.js";
import { ALL_GENDER } from "../../constants/gender.js";

export const teachers = pgTable("teachers", {
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
    
    teacherNumber: text("teacher_number")
        .unique()
        .notNull(),

    gender: text("gender", 
            { enum: ALL_GENDER})
            .notNull(),
    
    phone: text("phone"),
    
    address: text("address"),

    departmentId: uuid("department_id")
        .notNull()
        .references(() => departments.id),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
});

export type Teacher = typeof teachers.$inferSelect;
export type NewTeacher = typeof teachers.$inferInsert;