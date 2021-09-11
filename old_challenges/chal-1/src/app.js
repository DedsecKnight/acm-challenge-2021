const express = require("express");
const { CustomError } = require("./errors/custom-error");
const { NotFoundError } = require("./errors/not-found");
const app = express();
const tagsRouter = require("./router/tags");

app.use(express.json());

app.use("/tags", tagsRouter);

// 404 route
app.use((req, res) => {
    throw new NotFoundError("Route not found");
});

// Error handler
app.use((err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send(err.serialize());
    }
    console.error(err);
    res.status(500).send({
        statusCode: 500,
        errors: [
            {
                msg: "Server Error",
            },
        ],
    });
});

module.exports = { app };
