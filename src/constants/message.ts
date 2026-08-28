export const MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: "Invalid email or password.",
    EMAIL_EXISTS: "Email is already registered.",
    UNAUTHORIZED: "Authentication token is missing or invalid.",
    FORBIDDEN: "You do not have permission to perform this action.",
    LOGIN_SUCCESS: "Login successful.",
    REGISTER_SUCCESS: "Registration successful.",
    TOKEN_REFRESHED: "Token refreshed successfully.",
    TOKEN_EXPIRED: "Session expired. Please log in again.",
    LOGOUT_SUCCESS: "Logged out successfully.",
  },

  GENERIC: {
    NOT_FOUND: (entity: string) => `${entity} not found.`,
    CREATED: (entity: string) => `${entity} created successfully.`,
    UPDATED: (entity: string) => `${entity} updated successfully.`,
    DELETED: (entity: string) => `${entity} deleted successfully.`,
    FETCHED: (entity: string) => `${entity} fetched successfully.`,

    SERVER_ERROR: "Something went wrong. Please try again later.",
    VALIDATION_ERROR: "Validation failed.",
  },

  ENROLLMENT: {
    ALREADY_ENROLLED: "Student is already enrolled in this section.",
    DROPPED: "Enrollment dropped successfully.",
    WITHDRAWN: "Enrollment withdrawn successfully.",
    CANCELLED: "Enrollment cancelled successfully.",
    COMPLETED: "Enrollment completed successfully.",
    CAPACITY_REACHED: "Cannot enroll: section capacity reached.",
  },

  INVOICE: {
    GENERATED: "Invoice generated successfully.",
    OVERDUE: "Invoice is overdue. Please settle the remaining balance.",
  },
} as const;

export type MessageCategory = keyof typeof MESSAGES;