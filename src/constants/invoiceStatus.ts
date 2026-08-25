export const INVOICE_STATUS = {
  PARTIALLY_PAID: "partially_paid",
  PAID: "paid",
  OVERDUE: "overdue",
  CANCELLED: "cancelled",
  DRAFT: "draft",
  ISSUED: "issued",
  REFUNDED: "refunded",

} as const;

export type InvoiceStatus =
  (typeof INVOICE_STATUS)[keyof typeof INVOICE_STATUS];


export const ALL_INVOICE_STATUSES = [
  INVOICE_STATUS.DRAFT,
  INVOICE_STATUS.ISSUED,
  INVOICE_STATUS.PARTIALLY_PAID,
  INVOICE_STATUS.PAID,
  INVOICE_STATUS.OVERDUE,
  INVOICE_STATUS.CANCELLED,
  INVOICE_STATUS.REFUNDED,
  
] as const satisfies readonly InvoiceStatus[];

export const COLLECTIBLE_INVOICE_STATUSES = [
  INVOICE_STATUS.ISSUED,
  INVOICE_STATUS.PARTIALLY_PAID,
  INVOICE_STATUS.OVERDUE,
] as const satisfies readonly InvoiceStatus[];