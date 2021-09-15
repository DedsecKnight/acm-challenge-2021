const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            statusCode: 400,
            errors: errors.array().map((error) => ({ msg: error.msg })),
        });
    } else next();
};

module.exports = { validateRequest };
