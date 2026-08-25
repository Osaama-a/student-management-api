export const GENDER = {
    MALE: "male",
    FEMALE: "female",
    OTHER: "other"
} as const;

export type Gender = (typeof GENDER)[keyof typeof GENDER];
export const ALL_GENDER = [
    GENDER.MALE, 
    GENDER.FEMALE, 
    GENDER.OTHER
] as const;