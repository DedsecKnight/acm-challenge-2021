import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { sendMessageController } from "./controllers/send-message";
import { body } from "express-validator";
import { validateRequest } from "./middlewares/validate-request";
import { readMessageController } from "./controllers/read-message";
import { CustomError } from "./errors/custom-error";
import { NotFoundError } from "./errors/not-found";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello there");
});

app.post(
    "/send_message",
    [
        body("chat_id")
            .isAlphanumeric()
            .withMessage("chat_id can only contains numbers or letter"),
        body("chat_id").not().isEmpty().withMessage("chat_id is required"),
        body("sender")
            .isAlphanumeric()
            .withMessage("Sender name can only contains numbers or letter"),
        body("sender").not().isEmpty().withMessage("Sender name is required"),
        body("message")
            .isAscii()
            .withMessage("Message can only contain ASCII characters"),
    ],
    validateRequest,
    sendMessageController
);

app.post(
    "/read_messages",
    [
        body("chat_id")
            .isAlphanumeric()
            .withMessage("chat_id can only contains numbers or letter"),
        body("chat_id").not().isEmpty().withMessage("chat_id is required"),
        body("sender")
            .optional()
            .isAlphanumeric()
            .withMessage("Sender name can only contain numbers / letters"),
    ],
    validateRequest,
    readMessageController
);

app.use((req: Request, res: Response, next: NextFunction) => {
    return next(new NotFoundError("Route not found"));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError)
        return res.status(err.statusCode).send(err.serialize());
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

export { app };
