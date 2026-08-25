export const PAYMENT_METHODS = {
  CASH: "cash",
  BANK_TRANSFER: "bank_transfer",
  CARD: "card",
  MOBILE_MONEY: "mobile_money",
  OTHER: "other",
} as const;

export type PaymentMethod =
  (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];

export const ALL_PAYMENT_METHODS = [
  PAYMENT_METHODS.CASH,
  PAYMENT_METHODS.BANK_TRANSFER,
  PAYMENT_METHODS.CARD,
  PAYMENT_METHODS.MOBILE_MONEY,
  PAYMENT_METHODS.OTHER,
] as const;