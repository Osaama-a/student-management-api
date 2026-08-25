import { pgTable, integer, text, timestamp, uuid, numeric } from "drizzle-orm/pg-core";
import { studentInvoices } from "./studentInvoices.js";
import { users } from "./users.js";

export const invoiceAdjustment = pgTable("invoice_adjustment", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),

    invoiceId: uuid("invoice_id")
        .notNull()
        .references(() => studentInvoices.id),
    
    amount: numeric("amount")
        .notNull(),

    reason: text("reason")
        .notNull(),

    createdBy: uuid("created_by")
        .notNull()
        .references(() => users.id),

    createdAt: timestamp("created_at")
            .notNull()
            .defaultNow(),
});

export type InvoiceAdjustment = typeof invoiceAdjustment.$inferSelect;
export type NewInvoiceAdjustment = typeof invoiceAdjustment.$inferInsert