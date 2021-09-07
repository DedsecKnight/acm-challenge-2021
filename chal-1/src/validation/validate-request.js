const { validationResult } = require("express-validator");
const { BadRequestError } = require("../errors/bad-request");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    // Validation errors found
    if (!errors.isEmpty()) {
        throw new BadRequestError(
            errors.array().map((error) => ({
                msg: error.msg,
            }))
        );
    }
    next();
};

module.exports = { validateRequest };
