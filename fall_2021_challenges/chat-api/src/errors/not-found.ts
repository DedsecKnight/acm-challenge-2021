import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    readonly statusCode = 404;
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serialize() {
        return {
            statusCode: this.statusCode,
            errors: [
                {
                    msg: this.message,
                },
            ],
        };
    }
}
