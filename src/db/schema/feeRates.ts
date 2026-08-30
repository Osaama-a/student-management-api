import { pgTable, text, timestamp, uuid, numeric } from "drizzle-orm/pg-core";
import { semesters } from "./semesters.js";

export const feeRates = pgTable("fee_rate", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),

    semesterId: uuid("semester_id")
        .notNull()
        .unique()
        .references(() => semesters.id),

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

export type FeeRate = typeof feeRates.$inferSelect;
export type NewFeeRate = typeof feeRates.$inferInsert;