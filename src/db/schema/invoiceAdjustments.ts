import { pgTable, text, timestamp, uuid, numeric } from "drizzle-orm/pg-core";
import { studentInvoices } from "./studentInvoices.js";
import { users } from "./users.js";

export const invoiceAdjustments = pgTable("invoice_adjustment", {
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

export type InvoiceAdjustment = typeof invoiceAdjustments.$inferSelect;
export type NewInvoiceAdjustment = typeof invoiceAdjustments.$inferInsert