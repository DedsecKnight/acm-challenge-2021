import { ErrorObj } from "./error-obj";

export abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor(message: string) {
        super(message);
    }
    abstract serialize(): {
        statusCode: number;
        errors: ErrorObj[];
    };
}
