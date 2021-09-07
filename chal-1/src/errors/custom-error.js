class CustomError extends Error {
    statusCode = 500;
    constructor(message) {
        super(message || "Server Error");
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

module.exports = { CustomError };
