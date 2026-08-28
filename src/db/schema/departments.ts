import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const departments = pgTable("departments", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),

    departmentName: text("department_name")
        .notNull()
        .unique(),

    departmentCode: text("department_code")
        .unique()
        .notNull(),

    officeLocation: text("office_location"),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),
        
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
})

export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;