export const ATTENDANCE_STATUS = {
    PRESENT: "present",
    LATE: "late",
    ABSENT: "absent",
    EXCUSED: "excused",
} as const;

export type AttendanceStatuse = (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];
export const ALL_ATTENDANCE_STATUSES = [
    ATTENDANCE_STATUS.PRESENT,
    ATTENDANCE_STATUS.LATE,
    ATTENDANCE_STATUS.ABSENT,
    ATTENDANCE_STATUS.EXCUSED,
] as const;