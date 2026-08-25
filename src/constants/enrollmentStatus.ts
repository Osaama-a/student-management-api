export const ENROLLMENT = {
    ENROLLED: "enrolled",
    DROPPED: "dropped",
    WITHDRAWN: "withdrawn",
    COMPLETED: "completed",
    EXEMPTED: "exempted",
    TRANSFERRED: "transferred",
} as const; 

export type Enrollment = (typeof ENROLLMENT)[keyof typeof ENROLLMENT];
export const ALL_ENROLLMENT = [
    ENROLLMENT.ENROLLED,
    ENROLLMENT.DROPPED,
    ENROLLMENT.WITHDRAWN,
    ENROLLMENT.COMPLETED,
    ENROLLMENT.EXEMPTED,
    ENROLLMENT.TRANSFERRED,
] as const;