const { CustomError } = require("./custom-error");

class NotFoundError extends CustomError {
    statusCode = 404;
    errMessage = "";
    constructor(msg) {
        super("404 Not Found");
        this.errMessage = msg || "Resource Not Found";
    }
    serialize() {
        return {
            statusCode: this.statusCode,
            errors: [
                {
                    msg: this.errMessage,
                },
            ],
        };
    }
}

module.exports = { NotFoundError };
