import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";
import { ErrorObj } from "./error-obj";

export class BadRequestError extends CustomError {
    readonly statusCode = 400;
    errors: ErrorObj[] = [];
    constructor(errorList: ValidationError[]) {
        super("Bad Request Error");
        this.errors = errorList.map((error) => ({
            msg: error.msg,
        }));
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serialize() {
        return {
            statusCode: this.statusCode,
            errors: this.errors,
        };
    }
}
