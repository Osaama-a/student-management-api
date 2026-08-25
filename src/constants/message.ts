export const MESSAGE = {
    AUTH: {
        INVALID_CREDENTIALS: "Invalid email or password",
        EMAIL_EXISTS: "Email is already registered",
        UNAUTHORIZED: "Authenthication token is missin or invalid",
        FORBIDDEN: "You do not have permission to perform this",
        LOGIN_SUCCESS: "Login Successful",
        REGISTER_SUCCESS: "Registration Successful",
        TOKEN_REFRESHED: "Token refreshed successfully",
        LOGOUT_SUCCESS: "Logged out seccessfully",
    },
    GENERIC: {
        NOT_FOUND: (entity: string) => `${entity} not found`,
        CREATED:  (entity: string) => `${entity} created successfully`,
        UPDATED:  (entity: string) => `${entity} updated successfully`,
        DELETED:  (entity: string) => `${entity} deleted successfully`,
        FETCHED:  (entity: string) => `${entity} fetched successfully`,
        SERVER_ERROR: "Something went wrong, please try again later",
        VALIDATION_ERROR: "Validation faild",
    },
};