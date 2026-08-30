import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/message.js";

export class ApiError extends Error {

    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly errors?: Record<string, unknown> | unknown[] | null;

    constructor(
        statusCode: number, 
        message: string, 
        errors: Record<string, unknown> | unknown[] | null =  null,
        isOperational = true
    ) {
       super(message) ;
       this.name = "ApiError";

       this.statusCode = statusCode;
       this.errors = errors;
       this.isOperational = isOperational;

       Object.setPrototypeOf (
        this,
        ApiError.prototype
       );
       
       Error.captureStackTrace(
        this,
        this.constructor
       );

    }

    static badRequest (
        message: string = MESSAGES.GENERIC.BAD_REQUEST,
        errors: Record<string, unknown> | unknown[] | null = null,
    ){
        return new ApiError(
            HTTP_STATUS.BAD_REQUEST, 
            message,
            errors
        );
    }

    static unauthorized (
        message = MESSAGES.AUTH.UNAUTHORIZED
    ) {
        return new ApiError(
            HTTP_STATUS.UNAUTHORIZED, 
            message
        );
    }

    static forbidden (
        message = MESSAGES.AUTH.FORBIDDEN
    ) {
        return new ApiError(
            HTTP_STATUS.FORBIDDEN, 
            message
        );
    }

    static notFound (
        entity: string
    ) {
        return new ApiError(
            HTTP_STATUS.NOT_FOUND,
            MESSAGES.FORMAT.NOT_FOUND(entity)
        );
    }

    static conflict ( 
        message: string
    ) {
        return new ApiError(
            HTTP_STATUS.CONFLICT,
            message
        );
    }

    static internal (
        message = MESSAGES.GENERIC.SERVER_ERROR
    ) {
        return new ApiError(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message,
            null,
            false,
        );
    }

    

}