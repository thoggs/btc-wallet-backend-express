import {AppError} from "./AppError";

export class CustomValidationError extends AppError {
    public errors: { message: string; path: string }[];

    constructor(errors: { field: string; message: string }[]) {
        super("Validation failed", 400, "VALIDATION_ERROR");
        this.errors = errors.map(err => ({
            message: err.message,
            path: err.field,
        }));
    }
}
