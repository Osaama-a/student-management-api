export const ASSESSMENT_TYPES = {
    ASSIGNMENT: "assignment",
    QUIZ: "quiz",
    MID_EXAM: "mid_exam",
    PROJECT: "project",
    FINAL_EXAM: "final_exam",
    OTHER: "other",
} as const; 

export type AssessmentType = (typeof ASSESSMENT_TYPES)[keyof typeof ASSESSMENT_TYPES];
export const ALL_ASSESMENT_TYPEs = [
    ASSESSMENT_TYPES.ASSIGNMENT,
    ASSESSMENT_TYPES.QUIZ,
    ASSESSMENT_TYPES.MID_EXAM,
    ASSESSMENT_TYPES.PROJECT,
    ASSESSMENT_TYPES.FINAL_EXAM,
    ASSESSMENT_TYPES.OTHER,
] as const;