const jwt = require("jsonwebtoken");

const validateApiKey = async (req, res, next) => {
    if (req.session.tokens) return next();
    else {
        try {
            const decoded = jwt.verify(
                req.body.api_key,
                process.env.JWT_SECRET
            );
            req.session = {
                tokens: JSON.stringify(decoded),
            };
            next();
        } catch (error) {
            return res.status(401).send({
                statusCode: 401,
                errors: [
                    {
                        msg: "Invalid credentials",
                    },
                ],
            });
        }
    }
};

module.exports = { validateApiKey };
