const { oAuth2Client } = require("../google/auth");

const validateApiKey = async (req, res, next) => {
    if (req.session.tokens) return next();
    else {
        oAuth2Client
            .getToken(req.body.api_key)
            .then(({ tokens }) => {
                req.session = {
                    tokens: JSON.stringify(tokens),
                };
                next();
            })
            .catch((err) => {
                return res.status(401).send({
                    statusCode: 401,
                    errors: [
                        {
                            msg: "Invalid credentials",
                        },
                    ],
                });
            });
    }
};

module.exports = { validateApiKey };
