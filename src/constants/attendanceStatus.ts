export const ATTENDANCE_STATUSES = {
    PRESENT: "present",
    LATE: "late",
    ABSENT: "absent",
    EXCUSED: "excused",
} as const;

export type AttendanceStatus = (typeof ATTENDANCE_STATUSES)[keyof typeof ATTENDANCE_STATUSES];
export const ALL_ATTENDANCE_STATUSES = [
    ATTENDANCE_STATUSES.PRESENT,
    ATTENDANCE_STATUSES.LATE,
    ATTENDANCE_STATUSES.ABSENT,
    ATTENDANCE_STATUSES.EXCUSED,
] as const;