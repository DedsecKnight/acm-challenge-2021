const { CustomError } = require("./custom-error");

class BadRequestError extends CustomError {
    statusCode = 400;
    errors = [];
    constructor(errList) {
        super("Bad Request Error");
        this.errors = errList;
    }
    serialize() {
        return {
            statusCode: this.statusCode,
            errors: this.errors,
        };
    }
}

module.exports = { BadRequestError };
