import {Request, Response, NextFunction} from 'express';
import {AppError} from '../../../shared/errors/AppError';
import {ResponseDto, ErrorResponseDto} from "../../../shared/dto/responseDto";
import {CustomValidationError} from "../../../shared/errors/CustomValidationError";

const errorHandlerMiddleware = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    let statusCode = 500;
    let errorMessages: ErrorResponseDto[];

    if (err instanceof AppError) {
        statusCode = err.statusCode;

        if (err instanceof CustomValidationError) {
            errorMessages = err.errors.map(e => ({
                errorCode: 'VALIDATION_ERROR',
                errorMessage: e.message,
                field: e.path,
            }));
        } else {
            errorMessages = [
                {
                    errorCode: err.errorCode,
                    errorMessage: err.message,
                },
            ];
        }
    } else if (err.errors && Array.isArray(err.errors)) {
        errorMessages = err.errors.map((e: any) => ({
            errorCode: 'VALIDATION_ERROR',
            errorMessage: e.message,
            field: e.path || undefined,
        }));
    } else {
        errorMessages = [
            {
                errorCode: 'INTERNAL_SERVER_ERROR',
                errorMessage: err.message || 'An unexpected error occurred.',
            },
        ];
    }

    const response: ResponseDto<any> = {
        data: [],
        success: false,
        metadata: {
            message: errorMessages,
        },
    };

    res.status(statusCode).json(response);
};

export default errorHandlerMiddleware;
