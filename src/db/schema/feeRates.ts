import { pgTable, integer, text, timestamp, uuid, numeric } from "drizzle-orm/pg-core";
import { semester } from "./semesters.js";

export const feeRate = pgTable("fee_rate", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),

    semesterId: uuid("semester_id")
        .notNull()
        .unique()
        .references(() => semester.id),

    amountPerCredit: numeric("amount_per_credit")
        .notNull(),

    currency: text("currency")
        .notNull(),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),


});

export type FeeRate = typeof feeRate.$inferSelect;
export type NewFeeRate = typeof feeRate.$inferInsert;