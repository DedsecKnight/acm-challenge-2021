const express = require("express");
const { oAuth2Client } = require("./google/auth");
const { google } = require("googleapis");
const { validateApiKey } = require("./middlewares/validate-key");
const { validateRequest } = require("./middlewares/check-validation");
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");

const dayjs = require("dayjs");
dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));

const cookieSession = require("cookie-session");
const { TIME_FORMAT, TIMEZONE } = require("./constants/time-format");
const { Event } = require("./models/Event");

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: false,
        maxAge: 3 * 60 * 1000,
    })
);

app.get("/signin", (req, res) => {
    res.redirect(process.env.AUTH_URL);
});

app.get("/auth/redirect", async (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.send({
            statusCode: 400,
            msg: "No code found",
        });
    }
    const tokens = await oAuth2Client.getToken(code);
    res.json({
        api_key: jwt.sign(tokens.tokens, process.env.JWT_SECRET),
    });
});

app.post(
    "/create-event",
    [
        body("api_key").not().isEmpty().withMessage("API key is required"),
        body("event_name")
            .not()
            .isEmpty()
            .withMessage("Event name is required"),
        body("start_date")
            .custom((input) => {
                return dayjs(input, TIME_FORMAT, true).isValid();
            })
            .withMessage("Invalid start date format"),
        body("end_date")
            .custom((input) => {
                return dayjs(input, TIME_FORMAT, true).isValid();
            })
            .withMessage("Invalid end date format"),
    ],
    validateRequest,
    validateApiKey,
    (req, res) => {
        const { event_name, start_date, end_date } = req.body;
        oAuth2Client.setCredentials(JSON.parse(req.session.tokens));

        const calendar = google.calendar({
            version: "v3",
            auth: oAuth2Client,
        });

        const newEvent = {
            summary: event_name,
            start: {
                dateTime: dayjs.tz(start_date, TIMEZONE).format(),
                timeZone: TIMEZONE,
            },
            end: {
                dateTime: dayjs.tz(end_date, TIMEZONE).format(),
                timeZone: TIMEZONE,
            },
        };

        calendar.events.insert(
            {
                auth: oAuth2Client,
                calendarId: "primary",
                resource: newEvent,
            },
            async function (err, newEvent) {
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        statusCode: 500,
                        errors: [
                            {
                                msg: "Error creating new event",
                            },
                        ],
                    });
                }

                const eventObj = new Event({
                    event_id: newEvent.data.id,
                    name: newEvent.data.summary,
                    start_date: dayjs.tz(start_date, TIMEZONE),
                    end_date: dayjs.tz(end_date, TIMEZONE),
                    participants: [],
                });

                await eventObj.save();

                return res.send({
                    ...eventObj,
                    eventLink: newEvent.data.htmlLink,
                });
            }
        );
    }
);

app.post(
    "/rsvp-event",
    [
        body("api_key").not().isEmpty().withMessage("API key is required"),
        body("event_id").not().isEmpty().withMessage("Event ID is required"),
        body("attendee_name")
            .not()
            .isEmpty()
            .withMessage("Attendee name is required"),
    ],
    validateRequest,
    validateApiKey,
    async (req, res) => {
        oAuth2Client.setCredentials(JSON.parse(req.session.tokens));

        const { event_id, attendee_name } = req.body;
        const event = await Event.findOne({
            event_id,
        });

        if (!event) {
            return res.status(400).send({
                statusCode: 400,
                errors: [
                    {
                        msg: "Event not found",
                    },
                ],
            });
        }

        const eventOnGoogleCalendar = {
            summary: event.name,
            start: {
                dateTime: dayjs.tz(event.start_date, TIMEZONE).format(),
                timeZone: TIMEZONE,
            },
            end: {
                dateTime: dayjs.tz(event.end_date, TIMEZONE).format(),
                timeZone: TIMEZONE,
            },
        };

        const calendar = google.calendar({
            version: "v3",
            auth: oAuth2Client,
        });

        calendar.events.insert(
            {
                auth: oAuth2Client,
                calendarId: "primary",
                resource: eventOnGoogleCalendar,
            },
            async function (err, newEvent) {
                if (err) {
                    console.error(err);
                    return res.status(500).send({
                        statusCode: 500,
                        errors: [
                            {
                                msg: "Error creating new event",
                            },
                        ],
                    });
                }

                event.participants.push({
                    name: attendee_name,
                });
                await event.save();

                res.send({
                    statusCode: 200,
                    msg: "RSVP successful",
                });
            }
        );
    }
);

app.post("/signout", (req, res) => {
    req.session = null;
    res.end();
});

app.post(
    "/get-participants",
    [
        body("api_key").not().isEmpty().withMessage("API key is required"),
        body("event_id").not().isEmpty().withMessage("Event ID is required"),
    ],
    validateRequest,
    validateApiKey,
    async (req, res) => {
        const { event_id } = req.body;
        const event = await Event.findOne({
            event_id,
        });

        if (!event) {
            return res.status(400).send({
                statusCode: 400,
                errors: [
                    {
                        msg: "Event not found",
                    },
                ],
            });
        }

        res.send(
            event.participants.sort((a, b) => a.name.localeCompare(b.name))
        );
    }
);

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send({
        statusCode: 500,
        msg: "Server Error",
    });
});

module.exports = { app };
