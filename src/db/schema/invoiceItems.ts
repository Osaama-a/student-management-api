import { pgTable, integer, text, timestamp, uuid, numeric } from "drizzle-orm/pg-core";
import { studentInvoices } from "./studentInvoices.js";


export const invoiceItems = pgTable("invoice_items", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),

    invoiceId: uuid("invoice_id")
        .notNull()
        .references(() => studentInvoices.id),

    description: text("description"),

    quantity: integer("quantity")
        .notNull(),

    unitPrice: numeric("unit_price")
        .notNull(),

    amount: numeric("amount")
        .notNull(),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
    
});

export type InvoiceItems = typeof invoiceItems.$inferSelect;
export type NewInvoiceItems = typeof invoiceItems.$inferInsert;