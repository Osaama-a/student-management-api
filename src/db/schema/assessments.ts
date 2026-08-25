import { pgTable, integer, text, date, timestamp, uuid, numeric,  } from "drizzle-orm/pg-core";
import { classSections } from "./classSections.js";
import { ALL_ASSESMENT_TYPE } from "../../constants/assessmentTypes.js";


export const assessmentType = pgTable("assessment_type", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),

    sectionId: uuid("section_id")    
        .notNull()
        .references(() => classSections.id),

    name: text("name")
        .notNull(),

    type: text("type", { enum: ALL_ASSESMENT_TYPE})
        .notNull(),

    description: text("description").notNull(),
        
    maxScore: numeric("max_score")
        .notNull(),
    
    weight: numeric("wight"),

    assessmentDate: date("assessment_date"),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
});

export type Assessment = typeof assessmentType.$inferSelect;
export type NewAssessment = typeof assessmentType.$inferInsert; 
