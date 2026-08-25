import { studentInvoices } from "./studentInvoices.js";
import { pgTable,  text, date, timestamp, uuid, numeric } from "drizzle-orm/pg-core";
import { PAYMENT_STATUS ,ALL_PAYMENT_STATUS } from "../../constants/paymentStatus.js";
import { ALL_PAYMENT_METHODS } from "../../constants/paymentMethods.js";

export const payments = pgTable("payments", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),

    invoiceId: uuid("invoice_id")
        .notNull()
        .references(() => studentInvoices.id),

    amount: numeric("amount")
        .notNull(),

    currency: text("currency")
        .notNull(),

    paymentMethod: text("payment_method", { enum: ALL_PAYMENT_METHODS})
        .notNull(),

    transactionReference: text("transaction_reference"),

    paymentDate: date("payment_date")
        .notNull(),

    status: text("status", { enum: ALL_PAYMENT_STATUS})
        .notNull()
        .default(PAYMENT_STATUS.PENDING),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
}); 

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
