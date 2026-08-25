import { pgTable, integer, text, date, timestamp, uuid, unique } from "drizzle-orm/pg-core";
import { students } from "./students.js";
import { semester } from "./semesters.js";
import  { INVOICE_STATUS, ALL_INVOICE_STATUS} from "../../constants/invoiceStatus.js"

export const studentInvoices = pgTable("student_invoices", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),

    studentId: uuid("student_id")
        .notNull()
        .references(() => students.id),

    semesterId: uuid("semester_id")
        .notNull()
        .references(() => semester.id),

    currency: text("currency")
        .notNull(),

    issuedAt: date("issued_at")
        .notNull(),

    dueDate: date("due_date")
        .notNull(),

    status: text("status", { enum: ALL_INVOICE_STATUS})
        .notNull()
        .default(INVOICE_STATUS.PENDING),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow(),
},
(table) => [
    unique("student_semester_invoice_unique")
    .on(
        table.studentId,
        table.semesterId
)
]
);

export type StudentInvoice = typeof studentInvoices.$inferSelect;
export type NewStudentIncvoice = typeof studentInvoices.$inferInsert;

