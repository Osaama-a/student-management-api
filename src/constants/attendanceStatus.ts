export const ATTENDANCE_STATUS = {
    PRESENT: "present",
    LATE: "late",
    ABSENT: "absent",
    EXCUSED: "excused",
} as const;

export type Attendace = (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];
export const ALL_ATTENDACE = [
    ATTENDANCE_STATUS.PRESENT,
    ATTENDANCE_STATUS.LATE,
    ATTENDANCE_STATUS.ABSENT,
    ATTENDANCE_STATUS.EXCUSED,
] as const;