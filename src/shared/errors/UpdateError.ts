import {AppError} from "./AppError";

export class UpdateError extends AppError {
    constructor(message: string) {
        super(message, 500, "UPDATE_ERROR");
    }
}
