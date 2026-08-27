import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/message.js";

export class ApiError extends Error {

    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(
        statusCode: number, 
        message: string, 
        isOperational = true
    ) {
       super(message) ;
       this.name = "ApiError";

       this.statusCode = statusCode;
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
        message = MESSAGES.GENERIC.BAD_REQUEST
    ){
        return new ApiError(
            HTTP_STATUS.BAD_REQUEST, 
            message
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
            MESSAGES.GENERIC.NOT_FOUND(entity)
        );
    }

    static conflict ( 
        message: string
    ) {
        return new ApiError(
            HTTP_STATUS.CONFILICT,
            message
        );
    }

    static internal (
        message = MESSAGES.GENERIC.SERVER_ERROR
    ) {
        return new ApiError(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message
        );
    }

    

}