export const ROLES = {
    ADMIN: "admin",
    STUDENT: "student",
    TEACHER: "teacher"
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
export const ALL_ROLES = [
    ROLES.ADMIN, 
    ROLES.STUDENT, 
    ROLES.TEACHER,
] as const;